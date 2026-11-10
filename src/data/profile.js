import resumeUrl from './LeeCharlesSoftwareEngineer.pdf';

export const profile = {
    name: 'Lee Charles',
    title: 'Full Stack Software Engineer',
    location: 'Austin, Arkansas',
    currentRole: 'Software Developer, First Electric Cooperative',
    email: 'leecharlesdev.portfolio@gmail.com',
    linkedin: 'https://www.linkedin.com/in/lee-charles-98324910b/',
    github: 'https://github.com/lee-cha-dev',
    resumeUrl,
    resumeFileName: 'LeeCharles-SoftwareEngineer-Resume.pdf',
};

export const stats = [
    {
        value: 4,
        label: 'Databases federated behind a single enterprise portal',
    },
    {
        value: 94,
        prefix: '~',
        label: 'REST endpoints across 16 controllers in one application hub',
    },
    {
        value: 80,
        suffix: '+',
        label: 'Daily reports monitored by the Traffic Light dashboard',
    },
    {
        value: 1,
        prefix: '<',
        suffix: 's',
        label: 'Query time, down from ~5 minutes, across 65,000+ contacts',
    },
];

export const capabilities = [
    {
        title: 'Frontend',
        blurb: 'Component systems that stay fast and readable as they grow.',
        items: [
            'React 19',
            'JavaScript (ES6+)',
            'HTML & CSS',
            'Design-token CSS systems',
            'WebSocket / STOMP',
            'Recharts',
            'SheetJS',
        ],
    },
    {
        title: 'Creative development',
        blurb: 'Real-time graphics that give an interface its pulse.',
        items: ['three.js', 'WebGL', 'GLSL shaders', 'Motion & micro-interactions'],
        accent: true,
    },
    {
        title: 'Backend',
        blurb: 'Concurrent, secure services behind every screen.',
        items: [
            'Java 21',
            'Spring Boot',
            'REST & JPA',
            'Spring Security / SAML2',
            'CompletableFuture & ExecutorService',
            'JUnit',
            'Python',
        ],
    },
    {
        title: 'Data',
        blurb: 'Many sources, one coherent answer.',
        items: [
            'PostgreSQL',
            'Oracle',
            'MariaDB',
            'Native SQL & CTEs',
            'Multi-datasource federation',
        ],
    },
    {
        title: 'Design',
        blurb: 'From blank page to production UI, without a hand-off.',
        items: [
            'Wireframing',
            'Rapid POC prototyping',
            'UI/UX design systems',
            'Dark / light theming',
        ],
    },
    {
        title: 'DevOps & tooling',
        blurb: 'Shipping it, and keeping it shipped.',
        items: ['Docker', 'Nginx', 'Git', 'Swagger / OpenAPI', 'Jasypt', 'Apache PDFBox'],
    },
];

export const marqueeItems = [
    'React',
    'three.js',
    'WebGL',
    'GLSL',
    'Java',
    'Spring Boot',
    'PostgreSQL',
    'Oracle',
    'WebSockets',
    'UI/UX design',
    'Design systems',
    'Docker',
];

export const experience = [
    {
        period: '2025 — Present',
        role: 'Software Developer, Analytics & Data Engineering',
        org: 'First Electric Cooperative Corp',
        points: [
            'Lead UI/UX designer on every project I build — wireframes, POCs, and production UI — without a dedicated design resource.',
            'Built First2Portal, an enterprise-wide application hub with SAML2/Azure AD SSO, federating four databases and pushing live state to clients over WebSocket/STOMP.',
            'Hand-built its entire component library and design-token theming system from scratch, then extracted the infrastructure into a reusable template that cut roughly two sprints of setup from the next build.',
            'Created GridDefinition, a from-scratch React grid engine that replaced Kendo UI and now underpins the AMI Hourly, OMS, and data-quality dashboards.',
        ],
    },
    {
        period: '2024',
        role: 'Frontend Web Developer (Internship)',
        org: 'Pittsburgh Doors & Closets',
        points: ['React UI overhaul, bug fixes, SEO, and documentation for a production website.'],
    },
    {
        period: '2023 — 2024',
        role: 'IT Associate / Software Tool Developer',
        org: 'UAMS',
        points: [
            'Built a Python GUI and automated indexer to query 7,800+ paths and 65,000+ contacts, reducing query time from ~5 minutes to under 1 second.',
        ],
    },
    {
        period: 'Education',
        role: 'B.S., Information Technology',
        org: 'Capella University',
        points: ['Minor in Software Development. 3.85 GPA, Summa Cum Laude.'],
    },
];
