import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import useSpotlight from '../../hooks/useSpotlight';
import { PROJECT_KINDS } from '../../data/projects';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
    const handleSpotlight = useSpotlight();
    const { slug, title, kind, summary, image, tags } = project;

    return (
        <article className="project-card" onPointerMove={handleSpotlight}>
            <div className="project-card__media">
                <img
                    className="project-card__image"
                    src={image}
                    alt={`${title} screenshot`}
                    loading="lazy"
                    decoding="async"
                />
                <span className="project-card__kind label">{PROJECT_KINDS[kind]}</span>
            </div>
            <div className="project-card__body">
                <h2 className="project-card__title">
                    {/* The link's ::after stretches over the whole card. */}
                    <Link to={`/projects/${slug}`} className="project-card__link">
                        {title}
                    </Link>
                </h2>
                <p className="project-card__summary">{summary}</p>
                <div className="project-card__footer">
                    <ul className="tag-list">
                        {tags.slice(0, 3).map((tag) => (
                            <li key={tag} className="tag">
                                {tag}
                            </li>
                        ))}
                    </ul>
                    <span className="project-card__arrow">
                        <Icon name="arrowUpRight" />
                    </span>
                </div>
            </div>
        </article>
    );
}
