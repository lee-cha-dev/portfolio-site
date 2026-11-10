import { useSearchParams } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import Reveal from '../components/ui/Reveal';
import useDocumentTitle from '../hooks/useDocumentTitle';
import cx from '../utils/cx';
import { PROJECT_KINDS, projects } from '../data/projects';
import './Projects.css';

const FILTERS = [
    { value: 'all', label: 'All' },
    ...Object.entries(PROJECT_KINDS).map(([value, label]) => ({ value, label })),
];

const countFor = (filter) =>
    filter === 'all' ? projects.length : projects.filter(({ kind }) => kind === filter).length;

export default function Projects() {
    useDocumentTitle('Work');

    // The filter lives in the URL so a filtered view can be linked and survives reloads.
    const [searchParams, setSearchParams] = useSearchParams();
    const requested = searchParams.get('type');
    const filter = FILTERS.some(({ value }) => value === requested) ? requested : 'all';
    const visible = filter === 'all' ? projects : projects.filter(({ kind }) => kind === filter);

    const handleFilter = (value) => {
        setSearchParams(value === 'all' ? {} : { type: value }, {
            replace: true,
            state: { keepScroll: true },
        });
    };

    return (
        <div className="projects container">
            <header className="projects__header">
                <p className="projects__eyebrow label">
                    <span className="accent">Index</span> — {projects.length} projects
                </p>
                <h1 className="projects__title">
                    Work<span className="accent">.</span>
                </h1>
                <p className="projects__lead">
                    Production systems built at First Electric Cooperative, alongside the tools and
                    experiments I build on my own time.
                </p>
            </header>

            <div className="projects__filters" role="group" aria-label="Filter projects by type">
                {FILTERS.map(({ value, label }) => (
                    <button
                        key={value}
                        type="button"
                        className={cx('projects__filter', value === filter && 'projects__filter--active')}
                        aria-pressed={value === filter}
                        onClick={() => handleFilter(value)}
                    >
                        {label}
                        <span className="projects__count">{countFor(value)}</span>
                    </button>
                ))}
            </div>

            {/* Keyed by filter so the grid replays its entrance when the set changes. */}
            <ul key={filter} className="projects__grid">
                {visible.map((project, index) => (
                    <Reveal as="li" key={project.slug} delay={(index % 3) + 1}>
                        <ProjectCard project={project} />
                    </Reveal>
                ))}
            </ul>
        </div>
    );
}
