import { useEffect, useRef, useState } from 'react';
import { WebGLRenderer } from 'three';

const MAX_PIXEL_RATIO = 1.75;
const MAX_DELTA_SECONDS = 1 / 20;
/** Reduced-motion users get one still frame, taken after any intro animation. */
const STILL_FRAME_TIME = 12;

/**
 * Owns the lifecycle of a three.js renderer bound to a <canvas>.
 *
 * `createScene` is called once with `{ renderer, canvas, invalidate,
 * isReducedMotion }` and must return `{ render(elapsed, delta), resize(width,
 * height, pixelRatio), dispose() }`. It must be a stable reference (declare it
 * at module scope).
 *
 * The render loop only runs while the canvas is on screen, the tab is visible,
 * and the user has not asked for reduced motion. Outside of that, scenes can
 * call `invalidate()` to request a single frame.
 *
 * @returns {{ canvasRef, sceneRef, status: 'pending' | 'ready' | 'failed' }}
 */
export default function useThreeCanvas(createScene) {
    const canvasRef = useRef(null);
    const sceneRef = useRef(null);
    const [status, setStatus] = useState('pending');

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        let renderer;
        try {
            renderer = new WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            });
        } catch (error) {
            setStatus('failed');
            return undefined;
        }

        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        let reducedMotion = motionQuery.matches;
        let inView = false;
        let loopId = 0;
        let singleFrameId = 0;
        let lastTime = 0;
        let elapsed = reducedMotion ? STILL_FRAME_TIME : 0;

        const invalidate = () => {
            if (loopId || singleFrameId) return;
            singleFrameId = requestAnimationFrame(() => {
                singleFrameId = 0;
                scene.render(elapsed, 0);
            });
        };

        const scene = createScene({
            renderer,
            canvas,
            invalidate,
            isReducedMotion: () => reducedMotion,
        });
        sceneRef.current = scene;

        const tick = (now) => {
            loopId = requestAnimationFrame(tick);
            const delta = Math.min((now - lastTime) / 1000, MAX_DELTA_SECONDS);
            lastTime = now;
            elapsed += delta;
            scene.render(elapsed, delta);
        };

        const syncLoop = () => {
            const shouldRun = inView && !document.hidden && !reducedMotion;
            if (shouldRun && !loopId) {
                lastTime = performance.now();
                loopId = requestAnimationFrame(tick);
            } else if (!shouldRun && loopId) {
                cancelAnimationFrame(loopId);
                loopId = 0;
            }
        };

        const resize = () => {
            const { clientWidth: width, clientHeight: height } = canvas;
            if (!width || !height) return;
            const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
            renderer.setPixelRatio(pixelRatio);
            renderer.setSize(width, height, false);
            scene.resize(width, height, pixelRatio);
            // Render synchronously so the freshly cleared buffer never flashes.
            scene.render(elapsed, 0);
        };

        const handleMotionChange = (event) => {
            reducedMotion = event.matches;
            if (reducedMotion) elapsed = Math.max(elapsed, STILL_FRAME_TIME);
            syncLoop();
            invalidate();
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);

        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                inView = entry.isIntersecting;
                syncLoop();
            },
            { rootMargin: '120px' }
        );
        intersectionObserver.observe(canvas);

        document.addEventListener('visibilitychange', syncLoop);
        motionQuery.addEventListener('change', handleMotionChange);

        resize();
        setStatus('ready');

        return () => {
            cancelAnimationFrame(loopId);
            cancelAnimationFrame(singleFrameId);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            document.removeEventListener('visibilitychange', syncLoop);
            motionQuery.removeEventListener('change', handleMotionChange);
            scene.dispose();
            renderer.dispose();
            sceneRef.current = null;
        };
    }, [createScene]);

    return { canvasRef, sceneRef, status };
}
