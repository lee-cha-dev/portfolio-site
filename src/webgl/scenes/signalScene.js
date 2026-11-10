import { Camera, Mesh, PlaneGeometry, Scene, ShaderMaterial, Vector2 } from 'three';
import { fullscreenVertex, hash12, palette, simplexNoise3D } from '../glsl/noise';

/**
 * "Signal" backdrop: a stack of glowing waveforms, like a live oscilloscope.
 * The lines swell under the pointer.
 */
const fragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uPresence;

${palette}
${simplexNoise3D}
${hash12}

const int LINE_COUNT = 9;

float wave(float x, float index) {
    return sin(x * 2.1 + uTime * 0.55 + index * 0.9) * 0.1
        + sin(x * 5.3 - uTime * 0.8 + index * 2.1) * 0.03
        + snoise(vec3(x * 1.2, index * 0.37, uTime * 0.22)) * 0.07;
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 p = vec2((uv.x - 0.5) * uResolution.x / uResolution.y, uv.y - 0.5);
    vec2 pointer = vec2((uPointer.x - 0.5) * uResolution.x / uResolution.y, uPointer.y - 0.5);

    float offset = (p.x - pointer.x) * 2.4;
    float swell = exp(-offset * offset) * uPresence;
    vec3 color = INK;

    for (int i = 0; i < LINE_COUNT; i++) {
        float index = float(i);
        float k = index / float(LINE_COUNT - 1);
        float y = wave(p.x, index) * (1.0 + swell * 1.6) + (k - 0.5) * 0.3;
        float distanceToLine = abs(p.y - y);
        float core = 0.0014 / (distanceToLine + 0.0014);
        float glow = exp(-distanceToLine * 26.0) * 0.07;
        color += mix(VIOLET, VOLT, k) * (core * 0.5 + glow) * (0.55 + swell * 0.6);
    }

    // Dim the middle, where the copy sits.
    color = mix(INK, color, mix(0.5, 1.0, smoothstep(0.08, 0.5, length(p * vec2(0.75, 1.5)))));

    // Fade towards every edge so the canvas has no visible boundary.
    float edge = smoothstep(0.0, 0.14, uv.x) * smoothstep(1.0, 0.86, uv.x)
        * smoothstep(0.0, 0.25, uv.y) * smoothstep(1.0, 0.75, uv.y);
    color = mix(INK, color, edge);

    color += (hash12(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) / 128.0;
    gl_FragColor = vec4(color, 1.0);
}
`;

export default function createSignalScene({ renderer, canvas }) {
    const scene = new Scene();
    const camera = new Camera();
    const material = new ShaderMaterial({
        vertexShader: fullscreenVertex,
        fragmentShader,
        depthTest: false,
        depthWrite: false,
        uniforms: {
            uTime: { value: 0 },
            uResolution: { value: new Vector2(1, 1) },
            uPointer: { value: new Vector2(0.5, 0.5) },
            uPresence: { value: 0 },
        },
    });
    const quad = new Mesh(new PlaneGeometry(2, 2), material);
    quad.frustumCulled = false;
    scene.add(quad);

    const pointerTarget = new Vector2(0.5, 0.5);
    let presenceTarget = 0;

    // The canvas sits behind content, so listen on the window and map into it.
    const handlePointerMove = (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = 1 - (event.clientY - rect.top) / rect.height;
        const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
        presenceTarget = inside ? 1 : 0;
        if (inside) pointerTarget.set(x, y);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return {
        resize(width, height, pixelRatio) {
            material.uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio);
        },

        render(elapsed, delta) {
            const smoothing = 1 - Math.exp(-delta * 4);
            const { uTime, uPointer, uPresence } = material.uniforms;
            uTime.value = elapsed;
            uPointer.value.lerp(pointerTarget, smoothing);
            uPresence.value += (presenceTarget - uPresence.value) * smoothing;
            renderer.render(scene, camera);
        },

        dispose() {
            window.removeEventListener('pointermove', handlePointerMove);
            quad.geometry.dispose();
            material.dispose();
        },
    };
}
