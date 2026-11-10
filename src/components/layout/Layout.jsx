import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollManager from './ScrollManager';

/** Site chrome shared by every route. */
export default function Layout() {
    const { pathname } = useLocation();

    return (
        <>
            <a className="skip-link" href="#main">
                Skip to content
            </a>
            <ScrollManager />
            <Header />
            {/* Keyed by path so each page replays its entrance animation. */}
            <main id="main" key={pathname} className="page" tabIndex={-1}>
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
