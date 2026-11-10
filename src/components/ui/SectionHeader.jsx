import Reveal from './Reveal';
import './SectionHeader.css';

/** Numbered eyebrow + large title, with an optional slot on the right. */
export default function SectionHeader({ index, label, title, children }) {
    return (
        <header className="section-header">
            <Reveal className="section-header__eyebrow label">
                <span className="section-header__index">{index}</span>
                <span className="section-header__rule" aria-hidden="true" />
                {label}
            </Reveal>
            <div className="section-header__row">
                <Reveal as="h2" delay={1} className="section-header__title">
                    {title}
                </Reveal>
                {children && (
                    <Reveal delay={2} className="section-header__aside">
                        {children}
                    </Reveal>
                )}
            </div>
        </header>
    );
}
