import gridDefinitionImage from '../images/GridDefinition.png';
import trafficLightImage from '../images/TrafficLight.png';
import amiHourlyImage from '../images/AMIHourly.png';
import omsUploadImage from '../images/OMSUpload.png';
import depositReviewImage from '../images/DepositFile.png';
import devTrackerImage from '../images/DevTracker.jpg';
import tscImage from '../images/tsc.png';
import ollamaImage from '../images/ollama.png';
import reformatitImage from '../images/reformatit.png';
import portfolioImage from '../images/portfolio.png';

export const PROJECT_KINDS = {
    professional: 'Professional',
    personal: 'Personal',
};

const FECC_COMPLIANCE =
    'Screenshots obfuscate production data. All source code and data are proprietary to FECC.';

export const projects = [
    {
        slug: 'grid-definition',
        title: 'Analytics GridDefinition',
        kind: 'professional',
        org: 'First Electric Cooperative',
        role: 'Design & engineering',
        highlight: 'Replaced Kendo UI platform-wide',
        image: gridDefinitionImage,
        tags: ['React', 'JavaScript', 'CSS3', 'SheetJS'],
        summary:
            "A from-scratch React data grid that serves as the foundational UI for every report across FECC's analytics platform.",
        description: [
            "A comprehensive, custom-built React data grid component serving as the foundational UI for all reports across FECC's analytics platform. Architected with modular React Hooks for maintainability and reusability.",
            'This component replaced KendoUI dependencies and became the standard data presentation layer for Daily Traffic Light, AMI Hourly, and OMS modules. Features responsive design, conditional row coloring, and advanced pagination.',
        ],
        context:
            'Standardize data presentation across FECC analytics to remove Kendo dependency and unify UX.',
        implementation:
            'Custom grid with multi-operator filters, tri-state sort, drag-reorder, inline edit with batch save/cancel, grouping, export, and dark/light theming.',
        impact:
            'Became the shared UI foundation for all dashboards; improved consistency and performance across the suite.',
        features: [
            'Custom React data grid replacing KendoUI across entire platform',
            'Advanced filtering with multiple operators per column',
            'Tri-state sorting and drag-and-drop column reordering',
            'In-line editing with change tracking and batch save/cancel',
            'Hierarchical grouping with group-level calculations',
            'Built-in Excel export using SheetJS',
            'Full light/dark theme support',
        ],
        tech: [
            'React (Hooks: useState, useEffect, useRef)',
            'JavaScript (ES6+)',
            'CSS3 (Custom properties, Flexbox, Grid)',
            'SheetJS (XLSX export)',
        ],
        notes: [
            'Column-level filter operators mirror analyst workflows.',
            'Theme and density preferences persist per user.',
        ],
        compliance: FECC_COMPLIANCE,
        links: [],
    },
    {
        slug: 'ami-hourly',
        title: 'AMI Hourly Meter Data Dashboard',
        kind: 'professional',
        org: 'First Electric Cooperative',
        role: 'Design & full-stack engineering',
        highlight: 'Oracle + Postgres federation',
        image: amiHourlyImage,
        tags: ['React', 'Recharts', 'Spring Boot', 'Oracle', 'PostgreSQL'],
        summary:
            'An engineering analytics interface for hourly energy consumption, with solar capacity enrichment and anomaly visibility.',
        description: [
            'An engineering analytics interface for Aclara AMI data, providing comprehensive analysis of hourly energy consumption with solar capacity enrichment and anomaly visibility.',
            'Features backend federation across Oracle/Postgres, derived KPIs, conversion-ratio logic, and 24-hour CTE aggregations. Visualizes trends with React + Recharts for rapid insights.',
        ],
        context:
            'Deliver hourly consumption analytics with solar enrichment and anomaly visibility across AMI.',
        implementation:
            'Federated reads across Oracle/Postgres; derived KPIs and ratio validation; React + Recharts visualization; 24-hour CTE aggregations.',
        impact:
            'Unified tool for solar analysis and anomaly trends; enabled earlier detection of enrichment and data-quality issues.',
        features: [
            'Multi-source data federation (Oracle Aclara/CIS + PostgreSQL)',
            'Dynamic meter conversion ratio calculation and management',
            'Interactive charts for hourly usage patterns (Recharts)',
            'KPI grid for peak/min hours and solar detection',
            'Data quality metrics and anomaly detection',
            'Advanced SQL with CTEs for 24-hour aggregations',
            'Light/dark theme with full component adaptation',
        ],
        tech: [
            'Frontend: React, Recharts, Lucide React, CSS3',
            'Backend: Java, Spring Boot, Spring Data JPA',
            'Databases: Oracle (Aclara/CIS), PostgreSQL',
            'Security: Spring Security with SAML2',
        ],
        notes: [
            'MeterRatioAnalyzer validates ratios across meter types/models.',
            'Theme and density adapt across components.',
        ],
        compliance: FECC_COMPLIANCE,
        links: [],
    },
    {
        slug: 'daily-traffic-light',
        title: 'Daily Traffic Light Dashboard',
        kind: 'professional',
        org: 'First Electric Cooperative',
        role: 'Design & full-stack engineering',
        highlight: '80+ reports, checked in seconds',
        image: trafficLightImage,
        tags: ['React', 'Spring Boot', 'Oracle', 'SAML2'],
        summary:
            'A centralized operations monitor giving an at-a-glance status for more than 80 daily reports across departments.',
        description: [
            'A centralized operations monitoring dashboard providing at-a-glance status overview for over 80 daily reports across MIS, Member Services, and Tax/CIS auditing departments.',
            'The system uses lightweight backend endpoints that execute COUNT(*) queries rather than fetching full datasets, ensuring sub-second response times. Server-side logic analyzes multiple data points for complex reports.',
        ],
        context:
            'Give leadership and analysts an instant, unified view of report health without loading full datasets.',
        implementation:
            'Ultra-light COUNT(*) endpoints via Spring Boot against Oracle; React grid handles search, filter, thresholds, and drill-through.',
        impact:
            'Replaced manual Excel checks; reduced daily verification from hours to seconds for 80+ reports.',
        features: [
            'Real-time monitoring of 80+ daily reports across departments',
            'Interactive traffic-light status cards (Green/Red indicators)',
            'Dynamic filtering by status and search by report name',
            'Centralized configuration via single config file',
            'High-performance COUNT(*) endpoints for instant status',
            'Click-through navigation to full report data grids',
            'Role-based security via SAML2',
        ],
        tech: [
            'Frontend: React, KendoReact, JavaScript',
            'Backend: Java, Spring Boot, Spring Data JPA',
            'Database: Oracle',
            'Security: Spring Security with SAML2',
        ],
        notes: [
            'Executive traffic-light summary enables rapid triage.',
            'Configuration-driven; new checks added without redeploy.',
        ],
        compliance: FECC_COMPLIANCE,
        links: [],
    },
    {
        slug: 'oms-model-management',
        title: 'OMS Model Management',
        kind: 'professional',
        org: 'First Electric Cooperative',
        role: 'Design & full-stack engineering',
        highlight: 'Async ingestion of massive model files',
        image: omsUploadImage,
        tags: ['React', 'Spring Boot', 'CompletableFuture', 'JPA'],
        summary:
            'A full-stack workflow for uploading, validating, and managing massive Outage Model System files asynchronously.',
        description: [
            'A full-stack workflow for managing complex Outage Model System (OMS) data, enabling engineering staff to upload, validate, and manage massive .std model files asynchronously.',
            'Uses CompletableFuture for non-blocking background processing with detailed error reporting. Handles transactional purges, comprehensive parsing across repositories, and role-gated access.',
        ],
        context: 'Streamline ingestion and maintenance of OMS .std models for Operations.',
        implementation:
            'Asynchronous .std parsing with real-time status; transactional purge-before-ingest; role-gated edits; tabbed views across 10+ repositories.',
        impact:
            'Removed manual upload bottlenecks; enabled auditable, UI-driven model management across multiple repositories.',
        features: [
            'Asynchronous processing of large .std model files',
            'Real-time upload status with elapsed timer',
            'Transactional purge-before-ingestion for data integrity',
            'Parsing into 10+ repositories (Transformers, Sources, etc.)',
            'Role-based edit restriction by user email',
            'Tabbed interface for categorized model components',
            'In-grid editing with save/cancel',
        ],
        tech: [
            'Frontend: React, KendoReact (Dialog, TabStrip, DropDownList)',
            'Backend: Java, Spring Boot, CompletableFuture (async)',
            'Spring Data JPA, SLF4J logging',
        ],
        notes: [
            'CompletableFuture for non-blocking background tasks.',
            'In-grid editing with save/cancel reduces context switching.',
        ],
        compliance: FECC_COMPLIANCE,
        links: [],
    },
    {
        slug: 'deposit-review-automation',
        title: 'MIS Deposit Review Automation',
        kind: 'professional',
        org: 'First Electric Cooperative',
        role: 'Design & full-stack engineering',
        highlight: 'Hours of manual prep, cut to minutes',
        image: depositReviewImage,
        tags: ['React', 'Spring Boot', 'Apache PDFBox', 'Multi-threading'],
        summary:
            'An automation module that converts deposit and warning-letter PDFs to imaging-compliant TIFFs with extracted metadata.',
        description: [
            'An automation module for processing and archiving Additional Deposit and Warning Letter PDFs, converting them to imaging-compliant TIFF format with extracted metadata.',
            'Replaced manual PDF conversion workflows with high-throughput parallel processing. Includes robust error handling, file lifecycle management, and externalized Spring Boot configuration.',
        ],
        context: 'Automate imaging workflows for Additional Deposit and Warning Letter PDFs.',
        implementation:
            'Parallel PDF→TIFF @300 DPI using PDFBox; metadata extraction; dual queues; ZIP packaging; robust error handling and cleanup.',
        impact:
            'Cut manual processing time from hours to minutes; improved consistency and reliability of imaging outputs.',
        features: [
            'Multi-threaded PDF to 300 DPI TIFF conversion (Apache PDFBox)',
            'Automated metadata extraction from PDF text',
            'Dual processing queues (Warning IN / Deposit IN)',
            'Network fileshare scanning and automatic cleanup',
            'ZIP archive creation with TIFFs and metadata',
            'Real-time progress indicators and notifications',
            'ExecutorService with CompletableFuture for parallelism',
        ],
        tech: [
            'Frontend: React, KendoReact (Buttons, Layout, Notification)',
            'Backend: Java, Spring Boot, Apache PDFBox',
            'Multi-threading: ExecutorService, CompletableFuture',
        ],
        notes: [
            'ExecutorService + CompletableFuture for throughput.',
            'Externalized configuration via Spring Boot properties.',
        ],
        compliance: FECC_COMPLIANCE,
        links: [],
    },
    {
        slug: 'devtracker',
        title: 'DevTracker',
        kind: 'personal',
        org: 'Personal project',
        role: 'Design & engineering',
        highlight: 'Local-first desktop app',
        image: devTrackerImage,
        tags: ['Electron', 'React', 'SQLite', 'Vite'],
        summary:
            'A local-first, offline-capable desktop project manager for developers, with full data ownership.',
        description: [
            'DevTracker is a local-first, offline-capable desktop project management application built for developers. It provides a simple, fast, and private way to manage projects, tasks, notes, and files, ensuring full data ownership and offline functionality.',
            'The application runs as a standalone Electron app with a React frontend and local SQLite database. A secure preload bridge connects the frontend to backend logic, allowing full CRUD operations, file management, and statistical aggregation—all stored locally for maximum privacy.',
        ],
        context:
            'Provide a developer-focused project management tool that works completely offline and ensures full data ownership.',
        implementation:
            'Built with Electron and React; uses better-sqlite3 for local persistence, secure contextBridge APIs, and a unified state-driven React UI.',
        impact:
            'Offers a self-contained alternative to online PM tools; allows full local management of projects, tasks, and files without third-party dependencies.',
        features: [
            'Local-first, offline-capable desktop application built with Electron',
            'React-based multi-view interface: Dashboard, Projects list, and Individual Project view',
            'Full CRUD for projects, tasks, and notes (modals for add/edit/delete)',
            'Dynamic filtering and sorting of projects and tasks by status, priority, and creation date',
            'File attachment management with upload, download, delete, and reveal-in-folder',
            'Aggregated project statistics (active, completed, overdue) via SQLite queries',
            'Secure preload bridge exposing window.db and window.files APIs to frontend',
        ],
        tech: [
            'Frontend: React (Hooks), Lucide React, Vite',
            'Backend: Electron (Main Process), Node.js',
            'Database: SQLite (better-sqlite3)',
            'Bridge: Electron contextBridge + ipcMain/ipcRenderer',
            'Build Tool: Vite',
        ],
        notes: [
            'Dashboard aggregates project statistics in real-time from SQLite.',
            'ProjectDashboard.jsx handles all views, modals, and local state.',
            'index.cjs preload script safely exposes backend APIs to React.',
        ],
        compliance:
            'All data and storage are local to the user’s machine. No network connectivity or external APIs are required.',
        links: [{ label: 'GitHub', url: 'https://github.com/lee-cha-dev/dev-tracker' }],
    },
    {
        slug: 'public-folder-index',
        title: 'TSC: Public Folder Index',
        kind: 'personal',
        org: 'Built at UAMS',
        role: 'Design & engineering',
        highlight: '~5 minute queries, now under a second',
        image: tscImage,
        tags: ['Python', 'customtkinter', 'VBA', 'PyInstaller'],
        summary:
            'A desktop GUI that turns slow Exchange public-folder lookups into instantaneous queries.',
        description: [
            'A custom-built GUI application designed to streamline the process of querying over 7,800 paths within public folders and 65,000 contact entries in the Exchange server.',
            'This innovative solution transforms a traditionally time-consuming task into an instantaneous operation, completing queries in less than 1 second.',
        ],
        features: [
            'Instantaneous queries (less than 1-2 seconds)',
            'User-friendly interface built with customtkinter',
            'Enhanced productivity for IT personnel',
            'Automated index updates',
            'Decreases traffic to the Exchange Server',
            'Allows techs to perform tasks without server privileges',
        ],
        tech: [
            'Python',
            'customtkinter (for GUI)',
            'PyInstaller (for executable packaging)',
            'Inno Setup (for installer creation)',
            'VBA (for automated index updates in Outlook)',
        ],
        links: [{ label: 'GitHub', url: 'https://github.com/lee-cha-dev/PublicFoldersIndex' }],
    },
    {
        slug: 'ollama-chat',
        title: 'Ollama Chat App',
        kind: 'personal',
        org: 'Personal project',
        role: 'Design & engineering',
        highlight: 'Local LLM chat client',
        image: ollamaImage,
        tags: ['Python', 'customtkinter', 'Ollama', 'REST'],
        summary: 'A chat interface for Ollama LLMs that can be installed and run locally.',
        description: [
            'A chat interface for Ollama LLMs that can be installed and run locally.',
            'This application provides a user-friendly interface for interacting with locally installed Ollama language models. It was developed in a Windows 10 environment using conda.',
        ],
        features: [
            "Integrates with Ollama's local LLM setup",
            'Runs on http://localhost:11434 for LLM hosting',
            'Uses http://localhost:11434/api/generate for response generation',
            'Customizable model selection (default: llama2:13b)',
            'Requires Ollama installation and a downloaded model',
        ],
        tech: [
            'Python',
            'customtkinter (for GUI)',
            'requests (for API communication)',
            'threading (for asynchronous operations)',
            'JSON (for data parsing)',
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/lee-cha-dev/ollama_chat_app' },
            {
                label: 'About Ollama Windows Preview',
                url: 'https://ollama.com/blog/windows-preview',
            },
        ],
    },
    {
        slug: 'reformatit',
        title: 'ReformatIT',
        kind: 'personal',
        org: 'Personal project',
        role: 'Design & full-stack engineering',
        highlight: '14 image formats supported',
        image: reformatitImage,
        tags: ['React', 'FastAPI', 'Python', 'Pillow'],
        summary:
            'A full-stack web app for image format conversion, with a React front end and a FastAPI back end.',
        description: [
            'A full-stack web application for image format conversion, featuring a React and Chakra UI frontend with a Python and FastAPI backend.',
            'ReformatIT allows users to upload images and convert them to various formats, providing a seamless and user-friendly interface for image processing tasks.',
        ],
        features: [
            'User-friendly image upload interface',
            'Support for multiple image format conversions',
            'Dark mode design for comfortable use',
            'Responsive layout for various device sizes',
        ],
        tech: [
            'Frontend: React, Chakra UI',
            'Backend: Python, FastAPI',
            'Image Processing: Pillow (Python Imaging Library)',
        ],
        supportedFormats: [
            'BMP', 'GIF', 'HEIF', 'ICO', 'IM', 'JPEG', 'JPG', 'PCX',
            'PNG', 'PPM', 'SGI', 'SPIDER', 'TIFF', 'WebP',
        ],
        links: [
            { label: 'Front end on GitHub', url: 'https://github.com/lee-cha-dev/reformatit-frontend' },
            { label: 'Back end on GitHub', url: 'https://github.com/lee-cha-dev/reformatit-backend' },
        ],
    },
    {
        slug: 'portfolio',
        title: 'This Portfolio',
        kind: 'personal',
        org: 'Personal project',
        role: 'Design & engineering',
        highlight: 'Hand-written GLSL, zero UI libraries',
        image: portfolioImage,
        tags: ['React', 'three.js', 'GLSL', 'CSS'],
        summary:
            'The site you are looking at: React, three.js, and custom shaders, styled with a hand-built CSS design-token system.',
        description: [
            'A modern, responsive portfolio website showcasing my projects and skills as a Software Engineer.',
            'Rebuilt without a component library: every layout, interaction, and animation is hand-written React and CSS, with three.js scenes driven by custom GLSL shaders.',
        ],
        features: [
            'Real-time WebGL hero with a noise-displaced, custom-shaded mesh',
            'Shader-driven image transitions in the selected work showcase',
            'Design-token CSS system with fluid type and spacing',
            'Scroll-triggered reveals that respect reduced-motion preferences',
            'Code-split routes and lazily loaded WebGL scenes',
            'Responsive layout, keyboard navigable, with visible focus states',
        ],
        tech: [
            'React with React Router',
            'three.js with hand-written GLSL shaders',
            'Plain CSS (custom properties, Grid, Flexbox)',
            'GitHub Pages for hosting',
        ],
        links: [{ label: 'GitHub', url: 'https://github.com/lee-cha-dev/portfolio-site' }],
    },
];

const FEATURED_SLUGS = [
    'grid-definition',
    'ami-hourly',
    'daily-traffic-light',
    'oms-model-management',
    'devtracker',
];

export const featuredProjects = FEATURED_SLUGS.map((slug) =>
    projects.find((project) => project.slug === slug)
);

export function getProject(slug) {
    return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug) {
    const index = projects.findIndex((project) => project.slug === slug);
    return projects[(index + 1) % projects.length];
}
