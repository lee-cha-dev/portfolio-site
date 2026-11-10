import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Reveal from '../components/ui/Reveal';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { getNextProject, getProject, PROJECT_KINDS } from '../data/projects';
import './ProjectDetail.css';

const CASE_STUDY_SECTIONS = [
    { key: 'context', label: 'Context' },
    { key: 'implementation', label: 'Implementation' },
    { key: 'impact', label: 'Impact' },
];

function DetailList({ title, items }) {
    if (!items?.length) return null;

    return (
        <Reveal as="section" className="detail-list">
            <h2 className="detail-list__title label">{title}</h2>
            <ul className="detail-list__items">
                {items.map((item) => (
                    <li key={item} className="detail-list__item">
                        {item}
                    </li>
                ))}
            </ul>
        </Reveal>
    );
}

export default function ProjectDetail() {
    const { slug } = useParams();
    const project = getProject(slug);

    return project ? <ProjectView project={project} /> : <NotFound />;
}

function ProjectView({ project }) {
    useDocumentTitle(project.title);

    const next = getNextProject(project.slug);
    const caseStudy = CASE_STUDY_SECTIONS.filter(({ key }) => project[key]);

    return (
        <article className="project">
            <header className="project__header container">
                <Link to="/projects" className="project__back label">
                    <Icon name="arrowLeft" />
                    All work
                </Link>
                <p className="project__kind label">
                    <span className="accent">{PROJECT_KINDS[project.kind]}</span> — {project.org}
                </p>
                <h1 className="project__title">{project.title}</h1>
                <p className="project__summary">{project.summary}</p>

                <dl className="project__meta">
                    <div className="project__meta-item">
                        <dt className="label">Role</dt>
                        <dd>{project.role}</dd>
                    </div>
                    <div className="project__meta-item">
                        <dt className="label">Highlight</dt>
                        <dd>{project.highlight}</dd>
                    </div>
                    <div className="project__meta-item project__meta-item--wide">
                        <dt className="label">Stack</dt>
                        <dd>
                            <ul className="tag-list">
                                {project.tags.map((tag) => (
                                    <li key={tag} className="tag">
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                </dl>
            </header>

            <Reveal as="figure" className="project__figure container">
                <div className="project__frame">
                    <div className="project__frame-bar" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </div>
                    <img
                        className="project__image"
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        decoding="async"
                    />
                </div>
                {project.compliance && (
                    <figcaption className="project__compliance">{project.compliance}</figcaption>
                )}
            </Reveal>

            <div className="project__body container">
                <Reveal as="section" className="project__overview">
                    <h2 className="label">Overview</h2>
                    <div className="project__prose">
                        {project.description.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </Reveal>

                {caseStudy.length > 0 && (
                    <section className="project__case" aria-label="Case study">
                        {caseStudy.map(({ key, label }, index) => (
                            <Reveal key={key} delay={index + 1} className="project__case-card">
                                <h2 className="project__case-label label">
                                    <span className="accent">0{index + 1}</span> {label}
                                </h2>
                                <p>{project[key]}</p>
                            </Reveal>
                        ))}
                    </section>
                )}

                <div className="project__lists">
                    <DetailList title="Key features" items={project.features} />
                    <DetailList title="Technologies" items={project.tech} />
                    <DetailList title="Notes" items={project.notes} />
                </div>

                {project.supportedFormats && (
                    <Reveal as="section" className="project__formats">
                        <h2 className="label">Supported formats</h2>
                        <ul className="tag-list">
                            {project.supportedFormats.map((format) => (
                                <li key={format} className="tag">
                                    {format}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                )}

                {project.links.length > 0 && (
                    <Reveal className="project__links">
                        {project.links.map(({ label, url }, index) => (
                            <Button
                                key={url}
                                href={url}
                                variant={index === 0 ? 'primary' : 'outline'}
                                icon="arrowUpRight"
                                magnetic={index === 0}
                            >
                                {label}
                            </Button>
                        ))}
                    </Reveal>
                )}
            </div>

            <Link to={`/projects/${next.slug}`} className="project__next">
                <span className="project__next-inner container">
                    <span className="label">Next project</span>
                    <span className="project__next-title">
                        {next.title}
                        <Icon name="arrowRight" />
                    </span>
                </span>
            </Link>
        </article>
    );
}
