import useMediaQuery from './useMediaQuery';

export default function usePrefersReducedMotion() {
    return useMediaQuery('(prefers-reduced-motion: reduce)');
}
