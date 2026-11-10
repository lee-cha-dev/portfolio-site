import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import useSpotlight from '../../hooks/useSpotlight';
import cx from '../../utils/cx';
import { capabilities } from '../../data/profile';
import './Capabilities.css';

export default function Capabilities() {
    const handleSpotlight = useSpotlight();

    return (
        <section id="capabilities" className="section capabilities">
            <div className="container">
                <SectionHeader index="03" label="Capabilities" title="The whole stack, pixel to query.">
                    <p>
                        I’m most useful where disciplines meet: the designer who can write the
                        service, the engineer who cares about the easing curve.
                    </p>
                </SectionHeader>

                <ul className="capabilities__grid">
                    {capabilities.map(({ title, blurb, items, accent }, index) => (
                        <Reveal
                            as="li"
                            key={title}
                            delay={(index % 3) + 1}
                            className={cx('capability', accent && 'capability--accent')}
                            onPointerMove={handleSpotlight}
                        >
                            <span className="capability__index label">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className="capability__title">{title}</h3>
                            <p className="capability__blurb">{blurb}</p>
                            <ul className="capability__items tag-list">
                                {items.map((item) => (
                                    <li key={item} className="tag">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    );
}
