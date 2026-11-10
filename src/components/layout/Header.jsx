import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import useScrollState from '../../hooks/useScrollState';
import cx from '../../utils/cx';
import { profile } from '../../data/profile';
import './Header.css';

const NAV_LINKS = [
    { to: '/projects', label: 'Work' },
    { to: '/#about', label: 'About' },
    { to: '/#experience', label: 'Experience' },
    { to: '/#contact', label: 'Contact' },
];

export default function Header() {
    const { scrolled, hidden } = useScrollState();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Any navigation closes the mobile menu.
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    useEffect(() => {
        if (!menuOpen) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setMenuOpen(false);
        };
        document.documentElement.classList.add('is-scroll-locked');
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.documentElement.classList.remove('is-scroll-locked');
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [menuOpen]);

    return (
        <header
            className={cx(
                'header',
                scrolled && 'header--scrolled',
                hidden && !menuOpen && 'header--hidden',
                menuOpen && 'header--menu-open'
            )}
        >
            <div className="header__progress" aria-hidden="true" />
            <div className="header__bar container">
                <Link to="/" className="header__name" aria-label={`${profile.name}, home`}>
                    {profile.name}
                </Link>

                <nav id="site-nav" className="header__nav" aria-label="Primary">
                    <ul className="header__links">
                        {NAV_LINKS.map(({ to, label }) => (
                            <li key={to} className="header__item">
                                {to.includes('#') ? (
                                    <Link to={to} className="header__link">
                                        {label}
                                    </Link>
                                ) : (
                                    <NavLink to={to} className="header__link">
                                        {label}
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                    <Button
                        href={profile.resumeUrl}
                        download={profile.resumeFileName}
                        variant="outline"
                        icon="download"
                        className="header__resume"
                    >
                        Résumé
                    </Button>
                </nav>

                <button
                    type="button"
                    className="header__toggle"
                    aria-expanded={menuOpen}
                    aria-controls="site-nav"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
                    <span className="header__toggle-bars" aria-hidden="true" />
                </button>
            </div>
        </header>
    );
}
