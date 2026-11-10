import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import { experience } from '../../data/profile';
import './Experience.css';

export default function Experience() {
    return (
        <section id="experience" className="section experience">
            <div className="container">
                <SectionHeader index="04" label="Experience" title="Where I’ve been building." />

                <ol className="experience__list">
                    {experience.map(({ period, role, org, points }) => (
                        <Reveal as="li" key={`${org}-${role}`} className="experience__item">
                            <p className="experience__period label">{period}</p>
                            <div className="experience__heading">
                                <h3 className="experience__role">{role}</h3>
                                <p className="experience__org">{org}</p>
                            </div>
                            <ul className="experience__points">
                                {points.map((point) => (
                                    <li key={point} className="experience__point">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    );
}
