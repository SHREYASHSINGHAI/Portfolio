import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            const scrolled = el.scrollTop;
            const total = el.scrollHeight - el.clientHeight;
            setProgress(total > 0 ? (scrolled / total) * 100 : 0);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] bg-white/5">
            <div
                className="h-full bg-gradient-to-r from-electric to-blue-400 shadow-[0_0_8px_rgba(14,165,233,0.8)] transition-all duration-75"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ScrollProgress;