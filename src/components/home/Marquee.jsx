import { marqueeItems } from '../../data/profile';
import './Marquee.css';

function MarqueeGroup({ hidden = false }) {
    return (
        <ul className="marquee__group" aria-hidden={hidden || undefined}>
            {marqueeItems.map((item) => (
                <li key={item} className="marquee__item">
                    {item}
                </li>
            ))}
        </ul>
    );
}

/** Infinite ticker. The second group is a visual duplicate that closes the loop. */
export default function Marquee() {
    return (
        <div className="marquee" role="region" aria-label="Core technologies">
            <div className="marquee__track">
                <MarqueeGroup />
                <MarqueeGroup hidden />
            </div>
        </div>
    );
}
