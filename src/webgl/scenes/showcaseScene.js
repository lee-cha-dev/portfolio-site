import {
    Camera,
    Mesh,
    PlaneGeometry,
    Scene,
    ShaderMaterial,
    TextureLoader,
    Vector2,
} from 'three';
import { fullscreenVertex, palette, simplexNoise3D } from '../glsl/noise';

const TRANSITION_SECONDS = 0.95;
/** A queued change makes the in-flight transition finish this much faster. */
const CATCH_UP_FACTOR = 3.5;

/**
 * Cross-dissolves between images with a noise-edged wipe, chromatic
 * aberration, and a pointer ripple. Output is premultiplied alpha so the
 * canvas stays transparent until the first texture has loaded.
 */
const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform vec2 uFromSize;
uniform vec2 uToSize;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uProgress;
uniform float uTime;
uniform float uHover;
uniform float uReveal;

varying vec2 vUv;

${palette}
${simplexNoise3D}

// object-fit: cover, anchored to the top edge where screenshots keep their headers.
vec2 coverUv(vec2 uv, vec2 imageSize) {
    float frameAspect = uResolution.x / uResolution.y;
    float imageAspect = imageSize.x / imageSize.y;
    vec2 scale = frameAspect > imageAspect
        ? vec2(1.0, imageAspect / frameAspect)
        : vec2(frameAspect / imageAspect, 1.0);
    return uv * scale + vec2((1.0 - scale.x) * 0.5, 1.0 - scale.y);
}

vec3 sampleSplit(sampler2D image, vec2 uv, float split) {
    return vec3(
        texture2D(image, uv + vec2(split, 0.0)).r,
        texture2D(image, uv).g,
        texture2D(image, uv - vec2(split, 0.0)).b
    );
}

void main() {
    vec2 uv = vUv;

    vec2 toPointer = uv - uPointer;
    toPointer.x *= uResolution.x / uResolution.y;
    float pointerDistance = length(toPointer);
    float ripple = sin(pointerDistance * 30.0 - uTime * 3.2) * exp(-pointerDistance * 5.5) * uHover;
    uv += normalize(toPointer + 1e-5) * ripple * 0.004;

    float grain = snoise(vec3(uv * vec2(2.4, 3.4), uTime * 0.06)) * 0.5 + 0.5;
    float threshold = uv.x * 0.55 + grain * 0.45;
    float mask = smoothstep(threshold - 0.15, threshold + 0.15, uProgress * 1.3 - 0.15);
    float bell = sin(uProgress * 3.14159265);

    float split = bell * 0.014 + abs(ripple) * 0.004;
    vec2 push = vec2(grain * 0.14, 0.0);
    vec3 from = sampleSplit(uFrom, coverUv(uv - push * mask, uFromSize), split);
    vec3 to = sampleSplit(uTo, coverUv(uv + push * (1.0 - mask), uToSize), split);
    vec3 color = mix(from, to, mask);

    // A volt seam rides the wipe's leading edge.
    float seam = (1.0 - smoothstep(0.0, 0.2, abs(mask - 0.5))) * bell;
    color = mix(color, VOLT, seam * 0.22);

    color *= mix(0.72, 1.0, smoothstep(1.05, 0.35, length(vUv - 0.5) * 1.35));
    gl_FragColor = vec4(color * uReveal, uReveal);
}
`;

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export default function createShowcaseScene({ renderer, canvas, invalidate, isReducedMotion }) {
    const scene = new Scene();
    const camera = new Camera();
    const material = new ShaderMaterial({
        vertexShader: fullscreenVertex,
        fragmentShader,
        depthTest: false,
        depthWrite: false,
        uniforms: {
            uFrom: { value: null },
            uTo: { value: null },
            uFromSize: { value: new Vector2(1, 1) },
            uToSize: { value: new Vector2(1, 1) },
            uResolution: { value: new Vector2(1, 1) },
            uPointer: { value: new Vector2(0.5, 0.5) },
            uProgress: { value: 1 },
            uTime: { value: 0 },
            uHover: { value: 0 },
            uReveal: { value: 0 },
        },
    });
    const { uniforms } = material;
    const quad = new Mesh(new PlaneGeometry(2, 2), material);
    quad.frustumCulled = false;
    scene.add(quad);
    renderer.setClearColor(0x000000, 0);

    const loader = new TextureLoader();
    const maxAnisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    let textures = [];
    let disposed = false;

    let requested = 0;
    let shown = -1;
    let target = -1;
    let progress = 1;

    const pointerTarget = new Vector2(0.5, 0.5);
    let hoverTarget = 0;

    const setSlot = (textureUniform, sizeUniform, texture) => {
        textureUniform.value = texture;
        sizeUniform.value.set(texture.image.width, texture.image.height);
    };

    const settle = (index) => {
        setSlot(uniforms.uFrom, uniforms.uFromSize, textures[index]);
        setSlot(uniforms.uTo, uniforms.uToSize, textures[index]);
        uniforms.uProgress.value = 1;
        progress = 1;
        shown = index;
        target = -1;
    };

    const begin = (index) => {
        if (shown === -1 || isReducedMotion()) {
            settle(index);
            return;
        }
        setSlot(uniforms.uFrom, uniforms.uFromSize, textures[shown]);
        setSlot(uniforms.uTo, uniforms.uToSize, textures[index]);
        uniforms.uProgress.value = 0;
        progress = 0;
        target = index;
    };

    const handlePointerMove = (event) => {
        const rect = canvas.getBoundingClientRect();
        pointerTarget.set(
            (event.clientX - rect.left) / rect.width,
            1 - (event.clientY - rect.top) / rect.height
        );
        hoverTarget = 1;
    };
    const handlePointerLeave = () => {
        hoverTarget = 0;
    };
    canvas.addEventListener('pointermove', handlePointerMove, { passive: true });
    canvas.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return {
        /** Loads one texture per URL. Indices match the order given. */
        setImages(urls) {
            textures.forEach((texture) => texture?.dispose());
            textures = new Array(urls.length).fill(null);
            shown = -1;
            target = -1;
            urls.forEach((url, index) => {
                loader.load(url, (texture) => {
                    if (disposed) {
                        texture.dispose();
                        return;
                    }
                    texture.anisotropy = maxAnisotropy;
                    textures[index] = texture;
                    invalidate();
                });
            });
        },

        setActive(index) {
            requested = index;
            invalidate();
        },

        resize(width, height, pixelRatio) {
            uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio);
        },

        render(elapsed, delta) {
            if (target !== -1) {
                const rate = (requested !== target ? CATCH_UP_FACTOR : 1) / TRANSITION_SECONDS;
                progress = Math.min(1, progress + delta * rate);
                uniforms.uProgress.value = easeInOutCubic(progress);
                if (progress >= 1) settle(target);
            }
            if (target === -1 && requested !== shown && textures[requested]) {
                begin(requested);
            }

            const smoothing = 1 - Math.exp(-delta * 5);
            uniforms.uTime.value = elapsed;
            uniforms.uPointer.value.lerp(pointerTarget, smoothing);
            uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * smoothing;
            if (shown !== -1) {
                uniforms.uReveal.value = isReducedMotion()
                    ? 1
                    : Math.min(1, uniforms.uReveal.value + delta * 2.5);
            }

            renderer.clear();
            if (shown !== -1) renderer.render(scene, camera);
        },

        dispose() {
            disposed = true;
            canvas.removeEventListener('pointermove', handlePointerMove);
            canvas.removeEventListener('pointerleave', handlePointerLeave);
            textures.forEach((texture) => texture?.dispose());
            quad.geometry.dispose();
            material.dispose();
        },
    };
}
