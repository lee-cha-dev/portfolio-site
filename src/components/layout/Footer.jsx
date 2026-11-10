import { profile } from '../../data/profile';
import Icon from '../ui/Icon';
import './Footer.css';

const handleBackToTop = () => window.scrollTo({ top: 0 });

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner container">
                <p className="footer__copy">
                    © {new Date().getFullYear()} {profile.name}
                </p>
                <p className="footer__colophon label">
                    Built with React, three.js &amp; hand-written GLSL
                </p>
                <button type="button" className="footer__top" onClick={handleBackToTop}>
                    Back to top
                    <Icon name="arrowUp" />
                </button>
            </div>
        </footer>
    );
}
