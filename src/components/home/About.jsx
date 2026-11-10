import CountUp from '../ui/CountUp';
import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import { stats } from '../../data/profile';
import './About.css';

export default function About() {
    return (
        <section id="about" className="section about">
            <div className="container">
                <SectionHeader
                    index="01"
                    label="About"
                    title={
                        <>
                            Design-minded. <span className="accent">Systems-deep.</span>
                        </>
                    }
                />

                <div className="about__grid">
                    <div className="about__copy">
                        <Reveal as="p" className="about__lead">
                            I’m a full-stack software engineer who owns a project from the first
                            wireframe to the shipped UI — schema, concurrent backend processing,
                            and all.
                        </Reveal>
                        <Reveal as="p" delay={1}>
                            At First Electric Cooperative I’ve been the lead UI/UX designer on
                            every project I’ve built, without a dedicated design resource. That
                            means hand-building component libraries and design-token theming
                            systems from scratch, on top of Spring Boot services that federate
                            four databases and push live state over WebSockets.
                        </Reveal>
                        <Reveal as="p" delay={2}>
                            I chase the same polish in three.js and GLSL, because the details
                            people feel but can’t name are usually the ones worth engineering.
                        </Reveal>
                    </div>

                    <dl className="about__stats">
                        {stats.map(({ value, prefix, suffix, label }, index) => (
                            <Reveal key={label} delay={index + 1} className="about__stat">
                                <dt className="about__stat-label">{label}</dt>
                                <dd className="about__stat-value">
                                    <CountUp value={value} prefix={prefix} suffix={suffix} />
                                </dd>
                            </Reveal>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
