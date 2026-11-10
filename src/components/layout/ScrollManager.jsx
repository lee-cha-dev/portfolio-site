import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restores expected scroll behaviour for client-side navigation: jump to the
 * top on a new page, or to the target element when the URL has a hash.
 * Navigations that pass `state: { keepScroll: true }` are left alone.
 */
export default function ScrollManager() {
    const { pathname, hash, key, state } = useLocation();
    const keepScroll = Boolean(state?.keepScroll);

    useEffect(() => {
        if (keepScroll) return undefined;

        if (!hash) {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            return undefined;
        }

        // Wait a frame so a freshly mounted page has laid out its sections.
        const frameId = requestAnimationFrame(() => {
            document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
        });
        return () => cancelAnimationFrame(frameId);
    }, [pathname, hash, key, keepScroll]);

    return null;
}
