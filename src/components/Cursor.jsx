import React, { useEffect, useState } from 'react';

const Cursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      setTrail(prev => ({
        x: lerp(prev.x, pos.x, 0.12),
        y: lerp(prev.y, pos.y, 0.12),
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  useEffect(() => {
    const addHover = () => setIsHovering(true);
    const removeHover = () => setIsHovering(false);
    const els = document.querySelectorAll('a, button, [role="button"]');
    els.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });
    return () => {
      els.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  });

  return (
    <>
      {/* Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)` }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>
      {/* Trail ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-100"
        style={{ transform: `translate(${trail.x - (isHovering ? 24 : 16)}px, ${trail.y - (isHovering ? 24 : 16)}px)` }}
      >
        <div
          className={`rounded-full border border-electric/60 transition-all duration-300 ${isHovering ? 'w-12 h-12 bg-electric/10' : 'w-8 h-8'
            }`}
        />
      </div>
    </>
  );
};

export default Cursor;