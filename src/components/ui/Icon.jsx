const PATHS = {
    arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
    arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
    arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
    arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
    arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
    download: <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />,
    mail: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="m4 7.5 8 6 8-6" />
        </>
    ),
    github: (
        <path d="M9 19c-4.5 1.4-4.5-2.2-6-2.7m12 5.2v-3.4a3 3 0 0 0-.8-2.3c2.8-.3 5.7-1.4 5.7-6.2a4.8 4.8 0 0 0-1.3-3.3 4.5 4.5 0 0 0-.1-3.3s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.4 2.7 5.3 3 5.3 3a4.5 4.5 0 0 0-.1 3.3 4.8 4.8 0 0 0-1.3 3.3c0 4.8 2.9 5.9 5.7 6.2a3 3 0 0 0-.8 2.3v3.4" />
    ),
    linkedin: (
        <>
            <path d="M16 8.5a5 5 0 0 1 5 5V20h-4v-6.5a1 1 0 0 0-2 0V20h-4v-6.5a5 5 0 0 1 5-5Z" />
            <rect x="3" y="9" width="4" height="11" />
            <circle cx="5" cy="5" r="2" />
        </>
    ),
};

/** Stroke icon on a 24px grid. Always decorative; sized by font-size. */
export default function Icon({ name, className }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {PATHS[name]}
        </svg>
    );
}
