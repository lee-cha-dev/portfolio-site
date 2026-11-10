import { useCallback } from 'react';

/**
 * Returns a pointermove handler that writes the pointer position, relative to
 * the element, into --spot-x / --spot-y for a CSS radial-gradient to follow.
 */
export default function useSpotlight() {
    return useCallback((event) => {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        element.style.setProperty('--spot-x', `${Math.round(event.clientX - rect.left)}px`);
        element.style.setProperty('--spot-y', `${Math.round(event.clientY - rect.top)}px`);
    }, []);
}
