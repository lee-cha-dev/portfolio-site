import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { projects } from './data/projects';

const renderAt = (path) => {
    window.history.pushState({}, '', path);
    return render(<App />);
};

test('home page introduces Lee and links to the work', () => {
    renderAt('/');

    expect(
        screen.getByRole('heading', { level: 1, name: /interfaces engineered to feel alive/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view all projects/i })).toHaveAttribute(
        'href',
        '/projects'
    );
});

test('projects page lists every project and filters by type', async () => {
    renderAt('/projects');

    expect(await screen.findByRole('heading', { level: 1, name: /work/i })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(projects.length);

    await userEvent.click(screen.getByRole('button', { name: /personal/i }));

    const personal = projects.filter(({ kind }) => kind === 'personal');
    expect(screen.getAllByRole('article')).toHaveLength(personal.length);
    expect(screen.getByRole('button', { name: /personal/i })).toHaveAttribute(
        'aria-pressed',
        'true'
    );
});

test('project page renders the case study for a known slug', async () => {
    renderAt('/projects/grid-definition');

    expect(
        await screen.findByRole('heading', { level: 1, name: 'Analytics GridDefinition' })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /key features/i })).toBeInTheDocument();
});

test('unknown routes show the not-found page', async () => {
    renderAt('/nope');

    expect(await screen.findByRole('heading', { level: 1, name: '404' })).toBeInTheDocument();
});
