import { lazy } from 'react';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import LazyScene from '../../webgl/LazyScene';
import useInView from '../../hooks/useInView';
import { profile } from '../../data/profile';
import './Contact.css';

const SignalCanvas = lazy(() => import('../../webgl/SignalCanvas'));

export default function Contact() {
    const [sceneRef, sceneNearby] = useInView({ rootMargin: '60% 0px' });

    return (
        <section id="contact" className="section contact">
            <div ref={sceneRef} className="contact__scene">
                {sceneNearby && (
                    <LazyScene>
                        <SignalCanvas />
                    </LazyScene>
                )}
            </div>

            <div className="contact__inner container">
                <Reveal as="p" className="contact__eyebrow label">
                    <span className="accent">05</span> — Contact
                </Reveal>
                <Reveal as="h2" delay={1} className="contact__title">
                    Let’s build something <span className="accent">electric.</span>
                </Reveal>
                <Reveal as="p" delay={2} className="contact__lead">
                    I’m open to software engineering roles where interface craft and solid
                    systems both matter. The fastest way to reach me is email.
                </Reveal>
                <Reveal delay={3} className="contact__actions">
                    <Button href={`mailto:${profile.email}`} icon="mail" magnetic>
                        {profile.email}
                    </Button>
                </Reveal>
                <Reveal as="ul" delay={4} className="contact__links">
                    <li>
                        <Button href={profile.linkedin} variant="ghost" icon="arrowUpRight">
                            LinkedIn
                        </Button>
                    </li>
                    <li>
                        <Button href={profile.github} variant="ghost" icon="arrowUpRight">
                            GitHub
                        </Button>
                    </li>
                    <li>
                        <Button
                            href={profile.resumeUrl}
                            download={profile.resumeFileName}
                            variant="ghost"
                            icon="download"
                        >
                            Résumé
                        </Button>
                    </li>
                </Reveal>
            </div>
        </section>
    );
}
