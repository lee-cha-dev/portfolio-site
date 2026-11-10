import { useCallback, useSyncExternalStore } from 'react';

/** Subscribes to a CSS media query, e.g. useMediaQuery('(min-width: 60em)'). */
export default function useMediaQuery(query) {
    const subscribe = useCallback(
        (onChange) => {
            const mediaQueryList = window.matchMedia(query);
            mediaQueryList.addEventListener('change', onChange);
            return () => mediaQueryList.removeEventListener('change', onChange);
        },
        [query]
    );
    const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

    return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
