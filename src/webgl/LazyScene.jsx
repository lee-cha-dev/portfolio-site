import { Component, Suspense } from 'react';

/**
 * WebGL is progressive enhancement: if the chunk fails to load or a scene
 * throws, render nothing and let the CSS fallback show through.
 */
class SceneBoundary extends Component {
    state = { failed: false };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    render() {
        return this.state.failed ? null : this.props.children;
    }
}

/** Wraps a React.lazy WebGL component with Suspense and an error boundary. */
export default function LazyScene({ children }) {
    return (
        <SceneBoundary>
            <Suspense fallback={null}>{children}</Suspense>
        </SceneBoundary>
    );
}
