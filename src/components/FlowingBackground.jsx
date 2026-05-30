import React, { useEffect, useRef } from 'react';

const FlowingBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const lines = [];
        const lineCount = 15;

        for (let i = 0; i < lineCount; i++) {
            lines.push({
                y: Math.random() * canvas.height,
                speed: 0.5 + Math.random() * 1.5,
                width: 1 + Math.random() * 2,
                opacity: 0.05 + Math.random() * 0.1,
                offset: Math.random() * Math.PI * 2,
            });
        }

        const animate = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            lines.forEach((line) => {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(14, 165, 233, ${line.opacity})`; // electric blue
                ctx.lineWidth = line.width;

                ctx.moveTo(0, line.y + Math.sin(time * 0.001 * line.speed + line.offset) * 50);

                for (let x = 0; x < canvas.width; x += 10) {
                    const y = line.y + Math.sin((x * 0.002) + (time * 0.001 * line.speed) + line.offset) * 50;
                    ctx.lineTo(x, y);
                }

                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate(0);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-40"
            style={{ background: '#0a0a0a' }}
        />
    );
};

export default FlowingBackground;