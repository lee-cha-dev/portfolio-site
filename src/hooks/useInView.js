import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether an element intersects the viewport.
 *
 * @param {object} [options]
 * @param {boolean} [options.once=true] Stop observing after the first hit.
 * @param {string} [options.rootMargin='0px']
 * @param {number} [options.threshold=0]
 * @returns {[React.RefObject, boolean]}
 */
export default function useInView({ once = true, rootMargin = '0px', threshold = 0 } = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return undefined;

        if (typeof IntersectionObserver === 'undefined') {
            setInView(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
                if (entry.isIntersecting && once) observer.disconnect();
            },
            { rootMargin, threshold }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [once, rootMargin, threshold]);

    return [ref, inView];
}
