import { lazy } from 'react';
import Button from '../components/ui/Button';
import LazyScene from '../webgl/LazyScene';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './NotFound.css';

const SignalCanvas = lazy(() => import('../webgl/SignalCanvas'));

export default function NotFound() {
    useDocumentTitle('Page not found');

    return (
        <section className="not-found">
            <div className="not-found__scene">
                <LazyScene>
                    <SignalCanvas />
                </LazyScene>
            </div>
            <div className="not-found__inner container">
                <p className="label">
                    <span className="accent">Error</span> — Signal lost
                </p>
                <h1 className="not-found__code">404</h1>
                <p className="not-found__lead">
                    That page doesn’t exist. It may have been moved, or the link may be wrong.
                </p>
                <div className="not-found__actions">
                    <Button to="/" icon="arrowRight" magnetic>
                        Back to home
                    </Button>
                    <Button to="/projects" variant="outline">
                        Browse work
                    </Button>
                </div>
            </div>
        </section>
    );
}
