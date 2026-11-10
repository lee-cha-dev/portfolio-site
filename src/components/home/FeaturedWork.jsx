import { lazy, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import LazyScene from '../../webgl/LazyScene';
import useInView from '../../hooks/useInView';
import useMediaQuery from '../../hooks/useMediaQuery';
import cx from '../../utils/cx';
import { featuredProjects, PROJECT_KINDS } from '../../data/projects';
import './FeaturedWork.css';

const ShowcaseCanvas = lazy(() => import('../../webgl/ShowcaseCanvas'));

const SHOWCASE_IMAGES = featuredProjects.map((project) => project.image);
const formatIndex = (index) => String(index + 1).padStart(2, '0');

/**
 * Selected projects. On wide screens the list drives a single WebGL stage
 * that shader-transitions between screenshots; on narrow screens each row
 * carries its own image instead.
 */
export default function FeaturedWork() {
    const [active, setActive] = useState(0);
    const isWide = useMediaQuery('(min-width: 60em)');
    const [stageRef, stageNearby] = useInView({ rootMargin: '60% 0px' });
    const activeProject = featuredProjects[active];

    return (
        <section id="work" className="section featured">
            <div className="container">
                <SectionHeader index="02" label="Selected work" title="Software people rely on every day.">
                    <p>
                        Internal platforms, analytics tooling, and desktop apps. Each one designed
                        and engineered end to end.
                    </p>
                </SectionHeader>

                <div className="featured__layout">
                    <ol className="featured__list">
                        {featuredProjects.map((project, index) => (
                            <Reveal
                                as="li"
                                key={project.slug}
                                delay={Math.min(index + 1, 5)}
                                className={cx(
                                    'featured__item',
                                    index === active && 'featured__item--active'
                                )}
                            >
                                <Link
                                    to={`/projects/${project.slug}`}
                                    className="featured__link"
                                    onPointerEnter={() => setActive(index)}
                                    onFocus={() => setActive(index)}
                                >
                                    <span className="featured__index label">
                                        {formatIndex(index)}
                                    </span>
                                    <span className="featured__text">
                                        <span className="featured__title">{project.title}</span>
                                        <span className="featured__highlight">
                                            {project.highlight}
                                        </span>
                                    </span>
                                    <span className="featured__arrow">
                                        <Icon name="arrowUpRight" />
                                    </span>
                                    <img
                                        className="featured__thumb"
                                        src={project.image}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </Link>
                            </Reveal>
                        ))}
                    </ol>

                    <Reveal className="featured__stage-wrap" aria-hidden="true">
                        <div ref={stageRef} className="featured__stage">
                            {isWide && stageNearby && (
                                <LazyScene>
                                    <ShowcaseCanvas images={SHOWCASE_IMAGES} active={active} />
                                </LazyScene>
                            )}
                            <div className="featured__caption">
                                <span className="label">
                                    {formatIndex(active)} / {formatIndex(featuredProjects.length - 1)}
                                </span>
                                <span className="label">{PROJECT_KINDS[activeProject.kind]}</span>
                            </div>
                        </div>
                        <ul key={activeProject.slug} className="featured__tags tag-list">
                            {activeProject.tags.map((tag) => (
                                <li key={tag} className="tag">
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>

                <Reveal className="featured__more">
                    <Button to="/projects" variant="outline" icon="arrowRight" magnetic>
                        View all projects
                    </Button>
                </Reveal>
            </div>
        </section>
    );
}
