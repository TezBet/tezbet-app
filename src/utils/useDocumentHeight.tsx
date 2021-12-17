import { useState, useEffect } from 'react';

function getDocumentHeight() {
    return document.body.clientHeight;
}

function useDocumentHeight() {
    const [documentHeight, setDocumentHeight] = useState(getDocumentHeight());

    useEffect(() => {
        function handleResize() {
            setDocumentHeight(getDocumentHeight());
        }

        const observer = new ResizeObserver(handleResize);
        const body = document.querySelector('body');
        if (body) {
            observer.observe(body);
        }

        return () => observer.disconnect();
    }, []);

    return documentHeight;
}

export default useDocumentHeight;