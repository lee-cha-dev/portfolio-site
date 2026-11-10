import { useEffect, useState } from 'react';

const SCROLLED_THRESHOLD = 24;
const HIDE_THRESHOLD = 480;
const DIRECTION_TOLERANCE = 6;

/**
 * Reports coarse scroll state for the header, and writes fine-grained progress
 * (0..1) to --scroll-progress on <html> so the progress bar never re-renders
 * React.
 *
 * @returns {{ scrolled: boolean, hidden: boolean }}
 */
export default function useScrollState() {
    const [state, setState] = useState({ scrolled: false, hidden: false });

    useEffect(() => {
        const root = document.documentElement;
        let lastY = window.scrollY;
        let frameId = 0;

        const update = () => {
            frameId = 0;
            const y = window.scrollY;
            const max = root.scrollHeight - window.innerHeight;
            root.style.setProperty('--scroll-progress', max > 0 ? (y / max).toFixed(4) : '0');

            const scrolled = y > SCROLLED_THRESHOLD;
            const delta = y - lastY;
            setState((previous) => {
                let { hidden } = previous;
                if (y < HIDE_THRESHOLD || delta < -DIRECTION_TOLERANCE) hidden = false;
                else if (delta > DIRECTION_TOLERANCE) hidden = true;
                return previous.scrolled === scrolled && previous.hidden === hidden
                    ? previous
                    : { scrolled, hidden };
            });
            if (Math.abs(delta) > DIRECTION_TOLERANCE) lastY = y;
        };

        const requestUpdate = () => {
            if (!frameId) frameId = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate, { passive: true });
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('scroll', requestUpdate);
            window.removeEventListener('resize', requestUpdate);
            root.style.removeProperty('--scroll-progress');
        };
    }, []);

    return state;
}
