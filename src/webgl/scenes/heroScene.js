import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    Group,
    IcosahedronGeometry,
    MathUtils,
    Mesh,
    PerspectiveCamera,
    PlaneGeometry,
    Points,
    Scene,
    ShaderMaterial,
    Vector2,
} from 'three';
import { fbm3D, fullscreenVertex, hash12, palette, simplexNoise3D } from '../glsl/noise';

const CAMERA_FOV = 35;
const CAMERA_DISTANCE = 6;
const PARTICLE_COUNT = 900;
const INTRO_SECONDS = 2.4;

/* ---------- Backdrop: domain-warped noise field ---------- */

const backdropFragment = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform vec2 uFocus;
uniform float uIntro;

${palette}
${simplexNoise3D}
${fbm3D}
${hash12}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
    float t = uTime * 0.035;

    // Two rounds of domain warping give the field its slow, liquid folds.
    vec2 drift = uPointer * 0.06;
    vec2 q = vec2(
        fbm(vec3(p * 1.1 + drift, t)),
        fbm(vec3(p * 1.1 + vec2(5.2, 1.3), t))
    );
    vec2 r = vec2(
        fbm(vec3(p * 1.4 + 1.8 * q + vec2(1.7, 9.2), t * 1.3)),
        fbm(vec3(p * 1.4 + 1.8 * q + vec2(8.3, 2.8), t * 1.3))
    );
    float field = fbm(vec3(p * 1.2 + 2.2 * r, t)) * 0.5 + 0.5;

    vec3 color = INK;
    color = mix(color, vec3(0.15, 0.085, 0.4), smoothstep(0.35, 0.85, field) * 0.8);
    color = mix(color, vec3(0.04, 0.3, 0.4), smoothstep(0.15, 0.7, length(r)) * smoothstep(0.5, 0.9, field) * 0.4);
    color += VOLT * pow(smoothstep(0.62, 0.95, field), 2.0) * 0.09;

    // Soft halo behind the orb so it reads as the light source.
    float halo = length(p - uFocus);
    color += VIOLET * exp(-halo * halo * 2.4) * 0.2 * uIntro;

    // Vignette, then melt into the page background at the bottom edge.
    color *= mix(0.3, 1.0, smoothstep(1.2, 0.3, length(uv - 0.5) * 1.5));
    color = mix(INK, color, smoothstep(0.0, 0.3, uv.y) * uIntro);

    color += (hash12(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) / 128.0;
    gl_FragColor = vec4(color, 1.0);
}
`;

/* ---------- Orb: noise-displaced sphere with analytic normals ---------- */

const orbVertex = /* glsl */ `
uniform float uTime;
uniform float uAmplitude;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;

${simplexNoise3D}

float displacement(vec3 direction) {
    float broad = snoise(direction * 1.15 + vec3(0.0, uTime * 0.22, uTime * 0.12));
    float fine = snoise(direction * 2.7 - vec3(uTime * 0.18, 0.0, uTime * 0.1)) * 0.3;
    return (broad + fine) * uAmplitude;
}

vec3 displaced(vec3 direction) {
    return direction * (1.0 + displacement(direction));
}

void main() {
    vec3 direction = normalize(position);
    float amount = displacement(direction);
    vec3 transformed = direction * (1.0 + amount);

    // Rebuild the normal from two displaced neighbours on the sphere, so the
    // lighting follows the deformed surface rather than the original one.
    vec3 axis = abs(direction.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
    vec3 tangent = normalize(cross(direction, axis));
    vec3 bitangent = cross(direction, tangent);
    float epsilon = 0.012;
    vec3 neighbourA = displaced(normalize(direction + tangent * epsilon));
    vec3 neighbourB = displaced(normalize(direction + bitangent * epsilon));
    vec3 displacedNormal = normalize(cross(neighbourA - transformed, neighbourB - transformed));

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    vNormal = normalize(normalMatrix * displacedNormal);
    vViewPosition = -mvPosition.xyz;
    vDisplacement = amount;
    gl_Position = projectionMatrix * mvPosition;
}
`;

const orbFragment = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uIntro;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;

${palette}

vec3 ramp(float t) {
    t = clamp(t, 0.0, 1.0);
    return t < 0.5 ? mix(VIOLET, ION, t * 2.0) : mix(ION, VOLT, (t - 0.5) * 2.0);
}

void main() {
    vec3 normal = normalize(vNormal);
    vec3 view = normalize(vViewPosition);
    float facing = clamp(dot(normal, view), 0.0, 1.0);
    float fresnel = pow(1.0 - facing, 2.2);

    // Obsidian body with an iridescent rim keyed to the displacement.
    vec3 color = vec3(0.012, 0.012, 0.024);
    color += ramp(fresnel * 0.85 + vDisplacement * 1.6 + 0.2) * fresnel * 1.15;

    // Contour lines that flow across the surface like field lines.
    float contour = vDisplacement * 16.0 + uTime * 0.12;
    float width = fwidth(contour);
    float line = 1.0 - smoothstep(width * 0.5, width * 1.5, abs(fract(contour) - 0.5));
    vec3 lineColor = mix(VIOLET, VOLT, smoothstep(-0.12, 0.2, vDisplacement));
    color += lineColor * line * (0.2 + 0.65 * fresnel);

    // Two speculars stand in for studio lights.
    vec3 keyLight = normalize(vec3(-0.5, 0.8, 0.6));
    vec3 rimLight = normalize(vec3(0.8, -0.5, 0.2));
    color += vec3(0.9, 0.94, 1.0) * pow(max(dot(normal, normalize(keyLight + view)), 0.0), 70.0) * 0.6;
    color += VOLT * pow(max(dot(normal, normalize(rimLight + view)), 0.0), 24.0) * 0.16;

    gl_FragColor = vec4(color * uIntro, 1.0);
}
`;

/* ---------- Particles: drifting motes around the orb ---------- */

const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uSize;

attribute vec3 aSeed;

varying float vAlpha;
varying float vTint;

void main() {
    vec3 p = position;
    float angle = uTime * 0.04 * (0.4 + aSeed.y);
    float c = cos(angle);
    float s = sin(angle);
    p.xz = mat2(c, -s, s, c) * p.xz;
    p.y += sin(uTime * 0.3 * (0.5 + aSeed.y) + aSeed.x * 6.2832) * 0.14;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * (0.4 + aSeed.z) / -mvPosition.z;

    float twinkle = 0.55 + 0.45 * sin(uTime * (0.6 + aSeed.y * 1.6) + aSeed.x * 40.0);
    vAlpha = twinkle * smoothstep(11.0, 4.0, -mvPosition.z);
    vTint = step(0.72, aSeed.x);
}
`;

const particleFragment = /* glsl */ `
precision highp float;

uniform float uIntro;

varying float vAlpha;
varying float vTint;

${palette}

void main() {
    float falloff = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5));
    vec3 color = mix(vec3(0.8, 0.82, 1.0), VOLT, vTint);
    gl_FragColor = vec4(color, falloff * falloff * vAlpha * 0.8 * uIntro);
}
`;

function createParticleGeometry() {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        // Uniform direction, biased towards a flattened shell around the orb.
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 1.5 + Math.random() ** 1.6 * 3.6;
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.cos(phi) * 0.62;
        positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
        seeds[i * 3] = Math.random();
        seeds[i * 3 + 1] = Math.random();
        seeds[i * 3 + 2] = Math.random();
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('aSeed', new BufferAttribute(seeds, 3));
    return geometry;
}

const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

export default function createHeroScene({ renderer }) {
    const scene = new Scene();
    const camera = new PerspectiveCamera(CAMERA_FOV, 1, 0.1, 50);
    camera.position.z = CAMERA_DISTANCE;
    const halfHeight = Math.tan(MathUtils.degToRad(CAMERA_FOV / 2)) * CAMERA_DISTANCE;

    const backdropMaterial = new ShaderMaterial({
        vertexShader: fullscreenVertex,
        fragmentShader: backdropFragment,
        depthTest: false,
        depthWrite: false,
        uniforms: {
            uTime: { value: 0 },
            uResolution: { value: new Vector2(1, 1) },
            uPointer: { value: new Vector2() },
            uFocus: { value: new Vector2() },
            uIntro: { value: 0 },
        },
    });
    const backdrop = new Mesh(new PlaneGeometry(2, 2), backdropMaterial);
    backdrop.frustumCulled = false;
    backdrop.renderOrder = -1;
    scene.add(backdrop);

    const orbMaterial = new ShaderMaterial({
        vertexShader: orbVertex,
        fragmentShader: orbFragment,
        uniforms: {
            uTime: { value: 0 },
            uAmplitude: { value: 0.18 },
            uIntro: { value: 0 },
        },
    });
    const orb = new Mesh(new IcosahedronGeometry(1, 56), orbMaterial);

    const particleMaterial = new ShaderMaterial({
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
            uTime: { value: 0 },
            uSize: { value: 60 },
            uIntro: { value: 0 },
        },
    });
    const particles = new Points(createParticleGeometry(), particleMaterial);
    particles.frustumCulled = false;

    const rig = new Group();
    rig.add(orb, particles);
    scene.add(rig);

    const layout = { x: 0, y: 0, radius: 1, viewportHeight: 1, minDimension: 1 };
    const pointerTarget = new Vector2();
    const pointer = new Vector2();
    let energy = 0;

    const handlePointerMove = (event) => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -((event.clientY / window.innerHeight) * 2 - 1);
        energy = Math.min(1, energy + Math.hypot(x - pointerTarget.x, y - pointerTarget.y) * 0.9);
        pointerTarget.set(x, y);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return {
        resize(width, height, pixelRatio) {
            const aspect = width / height;
            const halfWidth = halfHeight * aspect;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();

            if (aspect >= 1.15) {
                layout.x = halfWidth * 0.58;
                layout.y = halfHeight * 0.14;
                layout.radius = Math.min(1.22, halfWidth * 0.4);
            } else {
                layout.x = halfWidth * 0.42;
                layout.y = halfHeight * 0.6;
                layout.radius = Math.min(1.0, halfWidth * 0.62);
            }
            layout.viewportHeight = height;
            layout.minDimension = Math.min(width, height);

            backdropMaterial.uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio);
            particleMaterial.uniforms.uSize.value = height * pixelRatio * 0.07;
        },

        render(elapsed, delta) {
            const intro = easeOutExpo(Math.min(elapsed / INTRO_SECONDS, 1));
            const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.5);

            pointer.lerp(pointerTarget, 1 - Math.exp(-delta * 3.5));
            energy *= Math.exp(-delta * 1.6);

            const x = layout.x + pointer.x * 0.14;
            const y = layout.y + pointer.y * 0.1 - scroll * halfHeight * 0.55;
            rig.position.set(x, y, 0);
            rig.scale.setScalar(layout.radius * (0.5 + 0.5 * intro));
            orb.rotation.set(-pointer.y * 0.35, elapsed * 0.09 + pointer.x * 0.5, 0);
            particles.rotation.set(-pointer.y * 0.08, pointer.x * 0.12, 0);

            orbMaterial.uniforms.uTime.value = elapsed;
            orbMaterial.uniforms.uAmplitude.value = 0.17 + energy * 0.12 + (1 - intro) * 0.45;
            orbMaterial.uniforms.uIntro.value = intro;
            particleMaterial.uniforms.uTime.value = elapsed;
            particleMaterial.uniforms.uIntro.value = intro;

            // World units to the backdrop's min-dimension-normalised space.
            const toBackdrop = layout.viewportHeight / (2 * halfHeight * layout.minDimension);
            backdropMaterial.uniforms.uTime.value = elapsed;
            backdropMaterial.uniforms.uIntro.value = intro;
            backdropMaterial.uniforms.uPointer.value.copy(pointer);
            backdropMaterial.uniforms.uFocus.value.set(x * toBackdrop, y * toBackdrop);

            renderer.render(scene, camera);
        },

        dispose() {
            window.removeEventListener('pointermove', handlePointerMove);
            backdrop.geometry.dispose();
            backdropMaterial.dispose();
            orb.geometry.dispose();
            orbMaterial.dispose();
            particles.geometry.dispose();
            particleMaterial.dispose();
        },
    };
}
