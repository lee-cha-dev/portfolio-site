import { useEffect, useRef } from 'react';

const STRENGTH = 0.28;

/**
 * Makes an element lean towards the pointer by writing --magnet-x / --magnet-y
 * (in px). The stylesheet decides what to do with them. Only active for mouse
 * users who have not asked for reduced motion.
 */
export default function useMagnetic(enabled = true) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!enabled || !element) return undefined;

        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!canHover || reducedMotion) return undefined;

        const reset = () => {
            element.style.removeProperty('--magnet-x');
            element.style.removeProperty('--magnet-y');
        };
        const handleMove = (event) => {
            const rect = element.getBoundingClientRect();
            const x = (event.clientX - (rect.left + rect.width / 2)) * STRENGTH;
            const y = (event.clientY - (rect.top + rect.height / 2)) * STRENGTH;
            element.style.setProperty('--magnet-x', `${x.toFixed(1)}px`);
            element.style.setProperty('--magnet-y', `${y.toFixed(1)}px`);
        };

        element.addEventListener('pointermove', handleMove);
        element.addEventListener('pointerleave', reset);
        return () => {
            element.removeEventListener('pointermove', handleMove);
            element.removeEventListener('pointerleave', reset);
            reset();
        };
    }, [enabled]);

    return ref;
}
