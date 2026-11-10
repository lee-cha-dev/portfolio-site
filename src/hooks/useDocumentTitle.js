import { useEffect } from 'react';

const SITE_NAME = 'Lee Charles';

/** Sets document.title to "<title> — Lee Charles" while mounted. */
export default function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Software Engineer`;
    }, [title]);
}
