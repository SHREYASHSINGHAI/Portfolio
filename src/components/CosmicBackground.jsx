import React, { useEffect, useRef } from 'react';

export default function CosmicBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = e.clientY / window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let stars = [];
    let shootingStars = [];
    let lastShootingStarTime = Date.now();

    const starColors = [
      '#ffffff', // Pure white
      '#a5f3fc', // Cyan tint
      '#67e8f9', // Bright cyan
      '#93c5fd', // Electric blue tint
      '#c4b5fd', // Soft violet
      '#fed7aa', // Warm golden
    ];

    const initStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 5500); // Responsive star count (approx 200-300 on desktop)

      for (let i = 0; i < count; i++) {
        const isBright = Math.random() < 0.08;
        const size = isBright
          ? Math.random() * 1.5 + 1.5
          : Math.random() * 1.1 + 0.4;
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        const depth = Math.random() * 0.8 + 0.2; // Parallax depth layer

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          size,
          color,
          alpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          hasSpikes: isBright && Math.random() < 0.65,
          depth,
        });
      }
    };

    initStars();

    const spawnShootingStar = () => {
      const startX = Math.random() * width * 0.8 + width * 0.1;
      const startY = Math.random() * (height * 0.4);
      const angle = (Math.random() * 25 + 30) * (Math.PI / 180); // ~30-55 degrees down-right

      shootingStars.push({
        x: startX,
        y: startY,
        length: Math.random() * 80 + 70,
        speed: Math.random() * 10 + 12,
        angle,
        opacity: 1,
        fadeSpeed: Math.random() * 0.015 + 0.012,
        color: Math.random() < 0.5 ? '#67e8f9' : '#ffffff',
      });
    };

    // Render loop
    const render = () => {
      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const offsetX = (mouseRef.current.x - 0.5) * 35;
      const offsetY = (mouseRef.current.y - 0.5) * 35;

      ctx.clearRect(0, 0, width, height);

      // Draw all stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.twinklePhase += star.twinkleSpeed;
        const currentAlpha =
          star.alpha * (0.65 + 0.35 * Math.sin(star.twinklePhase));

        // Parallax position
        const px = star.baseX - offsetX * star.depth;
        const py = star.baseY - offsetY * star.depth;

        // Wrap around borders
        const renderX = (px + width) % width;
        const renderY = (py + height) % height;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));

        // Star core
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Soft halo on brighter stars
        if (star.size > 1.4) {
          ctx.beginPath();
          ctx.fillStyle = star.color;
          ctx.globalAlpha = currentAlpha * 0.25;
          ctx.arc(renderX, renderY, star.size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Diffraction spikes for flagship observatory stars (Hubble/JWST style)
        if (star.hasSpikes) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.7;
          ctx.globalAlpha = currentAlpha * 0.45;

          const spikeLength = star.size * 5;

          // Horizontal spike
          ctx.beginPath();
          ctx.moveTo(renderX - spikeLength, renderY);
          ctx.lineTo(renderX + spikeLength, renderY);
          ctx.stroke();

          // Vertical spike
          ctx.beginPath();
          ctx.moveTo(renderX, renderY - spikeLength);
          ctx.lineTo(renderX, renderY + spikeLength);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Spawn periodic shooting star (every 7 to 12 seconds)
      const now = Date.now();
      if (now - lastShootingStarTime > 8000 && Math.random() < 0.02) {
        spawnShootingStar();
        lastShootingStarTime = now;
      }

      // Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        ctx.save();
        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(0.7, s.color === '#67e8f9' ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.4)');
        gradient.addColorStop(1, s.color);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = s.opacity;

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Bright head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Move
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= s.fadeSpeed;

        if (s.opacity <= 0 || s.x > width + 100 || s.y > height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#050811]">
      {/* 1. Deep Space Photographic Galaxy Backplate with Ambient Scale & Glow */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-screen transform scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('/cosmos-galaxy.jpg')`,
          filter: 'contrast(115%) brightness(95%)',
        }}
      />

      {/* 2. Ethereal Cosmic Nebulae Gradients (Soft Cyan, Teal, Violet & Indigo Clouds) */}
      {/* Upper-right spiral galaxy glow */}
      <div
        className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-30 blur-[130px] pointer-events-none animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.35) 0%, rgba(99,102,241,0.2) 50%, transparent 70%)',
          animationDuration: '14s',
        }}
      />

      {/* Center-left cosmic dust nebula */}
      <div
        className="absolute top-1/3 -left-40 w-[650px] h-[650px] rounded-full opacity-25 blur-[140px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(14,165,233,0.18) 45%, transparent 70%)',
        }}
      />

      {/* Lower celestial star cluster glow */}
      <div
        className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(52,211,153,0.25) 0%, rgba(34,211,238,0.15) 50%, transparent 70%)',
        }}
      />

      {/* 3. Realtime Twinkling Starfield & Shooting Stars Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 4. Fine Blueprint Architectural Grid Overlay (Synthesizes Observatory Engineering with Deep Sky) */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />

      {/* 5. Deep Space Vignette (Subtly darkens edges to maximize focus on content) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5, 8, 17, 0.6) 80%, rgba(5, 8, 17, 0.95) 100%)',
        }}
      />
    </div>
  );
}
