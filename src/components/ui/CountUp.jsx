import { useEffect, useState } from 'react';
import useInView from '../../hooks/useInView';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const DURATION_MS = 1600;
const easeOutCubic = (t) => 1 - (1 - t) ** 3;

/**
 * Counts from 0 to `value` the first time it scrolls into view. Screen
 * readers get the final figure straight away.
 */
export default function CountUp({ value, prefix = '', suffix = '', className }) {
    const [ref, inView] = useInView({ threshold: 0.6 });
    const reducedMotion = usePrefersReducedMotion();
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return undefined;
        if (reducedMotion) {
            setDisplay(value);
            return undefined;
        }

        let frameId = 0;
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min((now - start) / DURATION_MS, 1);
            setDisplay(Math.round(easeOutCubic(progress) * value));
            if (progress < 1) frameId = requestAnimationFrame(step);
        };
        frameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frameId);
    }, [inView, reducedMotion, value]);

    return (
        <span ref={ref} className={className}>
            <span aria-hidden="true">
                {prefix}
                {display}
                {suffix}
            </span>
            <span className="sr-only">
                {prefix}
                {value}
                {suffix}
            </span>
        </span>
    );
}
