import { lazy } from 'react';
import Button from '../ui/Button';
import LazyScene from '../../webgl/LazyScene';
import { profile } from '../../data/profile';
import './Hero.css';

const HeroCanvas = lazy(() => import('../../webgl/HeroCanvas'));

const TITLE_LINES = [
    { text: 'Interfaces' },
    { text: 'engineered to' },
    { text: 'feel alive.', accent: true },
];

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero__scene">
                <LazyScene>
                    <HeroCanvas />
                </LazyScene>
            </div>

            <div className="hero__content container">
                <p className="hero__role">{profile.title}</p>

                <h1 className="hero__title">
                    {TITLE_LINES.map(({ text, accent }) => (
                        <span key={text} className="hero__line">
                            <span className={accent ? 'hero__line-text accent' : 'hero__line-text'}>
                                {text}
                            </span>{' '}
                        </span>
                    ))}
                </h1>

                <div className="hero__body">
                    <p className="hero__lead">
                        I’m {profile.name}. I design and build production software end to end:
                        wireframes and design systems, real-time React front ends, Spring Boot
                        services, and the shaders running behind this sentence.
                    </p>
                    <div className="hero__actions">
                        <Button to="/#work" icon="arrowDown" magnetic>
                            See selected work
                        </Button>
                        <Button
                            href={profile.resumeUrl}
                            download={profile.resumeFileName}
                            variant="outline"
                            icon="download"
                        >
                            Download résumé
                        </Button>
                    </div>
                </div>
            </div>

            <dl className="hero__facts container">
                <div className="hero__fact">
                    <dt className="label">Based in</dt>
                    <dd>{profile.location}</dd>
                </div>
                <div className="hero__fact">
                    <dt className="label">Currently</dt>
                    <dd>{profile.currentRole}</dd>
                </div>
            </dl>
        </section>
    );
}
