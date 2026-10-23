import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ArrowDown, ArrowRight, Radio, Activity, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ObservatoryDome({ onNavigateToProjects }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeTarget, setActiveTarget] = useState(null);

  const constellationNodes = [
    { id: 'sentinel-code', name: 'SENTINEL-CODE', role: 'AST Filter 0.74ms', x: 18, y: 24, color: '#22d3ee' },
    { id: 'terminal-rag', name: 'TERMINAL-RAG', role: 'Offline SLM <4GB', x: 38, y: 15, color: '#38bdf8' },
    { id: 'meet-summarizer', name: 'MEET-SUMM', role: 'Whisper Pipeline', x: 65, y: 17, color: '#34d399' },
    { id: 'stocktalk', name: 'STOCKTALK', role: 'Agentic Tooling', x: 86, y: 26, color: '#a78bfa' },
  ];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playTick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
    setActiveTarget(null);
  };

  const handleClick = (e, targetId = null) => {
    e.stopPropagation();
    sound.playClick();
    sound.playChirp(true);

    if (onNavigateToProjects) {
      onNavigateToProjects(targetId);
      return;
    }

    if (targetId) {
      navigate(`/projects#project-${targetId}`);
    } else {
      navigate('/projects');
    }
  };

  // Parallax offsets
  const tiltX = -mouseOffset.y * 10;
  const tiltY = mouseOffset.x * 12;
  const telescopeOffsetX = mouseOffset.x * 20;
  const telescopeOffsetY = mouseOffset.y * 10;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => handleClick(e)}
      className="group relative w-full max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#0A1120]/95 via-[#060A14]/95 to-[#04060C] border border-cyan-500/35 hover:border-cyan-400/80 shadow-[0_0_50px_rgba(6,182,212,0.15)] hover:shadow-[0_0_80px_rgba(6,182,212,0.32)] transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-xl select-none"
      title="Production AI Observatory // Click to focus on Curated Systems"
    >
      {/* Background Deep Sky Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[220px] bg-emerald-500/8 blur-[90px] rounded-full pointer-events-none" />

      {/* Blueprint Grid Lines Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(34, 211, 238, 0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34, 211, 238, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top Observatory HUD Bar */}
      <div className="relative z-20 px-5 py-3.5 border-b border-white/10 bg-black/40 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="text-cyan-300 font-bold tracking-wider">
            PRODUCTION AI OBSERVATORY
          </span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span className="text-gray-400 hidden sm:inline">
            OPTICAL DECK v2.6 · ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-400">
          <span className="hidden md:inline text-[10px]">
            AZ: <strong className="text-slate-200">{(218.4 + mouseOffset.x * 12).toFixed(1)}°</strong> · EL:{' '}
            <strong className="text-slate-200">{(54.2 - mouseOffset.y * 8).toFixed(1)}°</strong>
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>4 SYSTEMS TRACKED</span>
          </span>
        </div>
      </div>

      {/* Main Observatory Visual Stage */}
      <div className="relative w-full h-[340px] sm:h-[400px] flex items-center justify-center overflow-hidden">
        
        {/* Constellation Project Target Tags Floating in Sky */}
        <div className="absolute inset-0 pointer-events-auto z-10">
          {constellationNodes.map((node) => {
            return (
              <div
                key={node.id}
                onClick={(e) => handleClick(e, node.id)}
                onMouseEnter={() => {
                  setActiveTarget(node.id);
                  sound.playTick();
                }}
                onMouseLeave={() => setActiveTarget(null)}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/node cursor-pointer transition-transform duration-300 hover:scale-110"
              >
                {/* Node Beacon */}
                <div className="relative flex items-center justify-center">
                  <span
                    className="absolute w-6 h-6 rounded-full animate-ping opacity-60"
                    style={{ backgroundColor: node.color }}
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white flex items-center justify-center shadow-md transition-shadow group-hover/node:shadow-[0_0_12px_#22d3ee]"
                    style={{ backgroundColor: node.color }}
                  >
                    <span className="w-1 h-1 rounded-full bg-white" />
                  </span>
                </div>

                {/* Node Monospace Tag */}
                <div className="mt-1.5 px-2 py-0.5 rounded-md bg-[#080E1A]/90 border border-white/10 group-hover/node:border-cyan-400 text-center shadow-lg backdrop-blur-md">
                  <div className="text-[10px] font-mono font-bold text-slate-100 whitespace-nowrap">
                    {node.name}
                  </div>
                  <div className="text-[8px] font-mono text-cyan-300 whitespace-nowrap hidden sm:block">
                    {node.role}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Master Architectural Observatory SVG Canvas */}
        <svg
          viewBox="0 0 600 400"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dome Metallic Gradient */}
            <linearGradient id="domeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="35%" stopColor="#1E293B" />
              <stop offset="70%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#080C14" />
            </linearGradient>

            {/* Dome Highlight Gradient */}
            <linearGradient id="domeRimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#080C14" stopOpacity="0" />
            </linearGradient>

            {/* Telescope Barrel Gradient */}
            <linearGradient id="tubeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="30%" stopColor="#1E293B" />
              <stop offset="70%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Optical Lens Multi-Coating Flare */}
            <radialGradient id="lensFlare" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="1" />
              <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
            </radialGradient>

            {/* Laser Guide Star Gradient */}
            <linearGradient id="laserGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#34d399" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
            </linearGradient>

            {/* Base Drum Wall Gradient */}
            <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="50%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0B1120" />
            </linearGradient>
          </defs>

          {/* Starfield in Upper Half */}
          {[
            { cx: 70, cy: 50, r: 1.2, o: 0.8 },
            { cx: 140, cy: 90, r: 0.9, o: 0.5 },
            { cx: 190, cy: 40, r: 1.5, o: 0.9 },
            { cx: 280, cy: 75, r: 1.1, o: 0.7 },
            { cx: 330, cy: 35, r: 1.4, o: 0.85 },
            { cx: 410, cy: 80, r: 0.9, o: 0.6 },
            { cx: 480, cy: 45, r: 1.3, o: 0.75 },
            { cx: 540, cy: 85, r: 1.0, o: 0.6 },
            { cx: 100, cy: 140, r: 0.8, o: 0.4 },
            { cx: 510, cy: 135, r: 0.9, o: 0.5 },
          ].map((s, idx) => (
            <circle key={idx} cx={s.cx} cy={s.cy} r={s.r} fill="#ffffff" opacity={s.o} />
          ))}

          {/* Constellation Connector Lines between project nodes */}
          <line x1="108" y1="96" x2="228" y2="60" stroke="rgba(34,211,238,0.3)" strokeDasharray="3 3" />
          <line x1="228" y1="60" x2="300" y2="80" stroke="rgba(34,211,238,0.4)" strokeDasharray="2 2" />
          <line x1="390" y1="68" x2="300" y2="80" stroke="rgba(52,211,153,0.4)" strokeDasharray="2 2" />
          <line x1="390" y1="68" x2="516" y2="104" stroke="rgba(167,139,250,0.3)" strokeDasharray="3 3" />

          {/* Zenith Targeting Reticle in Deep Cosmos */}
          <g transform="translate(300, 80)">
            <circle cx="0" cy="0" r="28" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="0" cy="0" r="16" fill="none" stroke="rgba(52,211,153,0.5)" strokeWidth="1" />
            <circle cx="0" cy="0" r="3.5" fill="#22d3ee" />
            <line x1="-36" y1="0" x2="36" y2="0" stroke="rgba(34,211,238,0.3)" strokeWidth="0.8" />
            <line x1="0" y1="-36" x2="0" y2="36" stroke="rgba(34,211,238,0.3)" strokeWidth="0.8" />
          </g>

          {/* Telescopic Laser Guide Star Beam from Telescope to Zenith */}
          <line
            x1={300 + telescopeOffsetX}
            y1={200 + telescopeOffsetY}
            x2="300"
            y2="80"
            stroke="url(#laserGrad)"
            strokeWidth={isHovered ? '2.8' : '2.0'}
            strokeDasharray="6 3"
          />

          {/* Rotating Astronomical Compass Degree Ring (Centered around Dome) */}
          <g transform={`translate(300, 320) rotate(${mouseOffset.x * 20})`}>
            <circle cx="0" cy="0" r="190" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="1" strokeDasharray="3 6" />
            <circle cx="0" cy="0" r="175" fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth="0.8" />
            
            {/* Compass Cardinal Points */}
            <text x="0" y="-196" fill="#22d3ee" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">N 000°</text>
            <text x="188" y="4" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">E 090°</text>
            <text x="-188" y="4" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">W 270°</text>

            {/* Degree Ticks */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="0"
                y1="-190"
                x2="0"
                y2="-182"
                stroke="rgba(34,211,238,0.35)"
                strokeWidth="1.2"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>

          {/* === THE ACTUAL OBSERVATORY DOME ARCHITECTURE === */}
          <g transform={`translate(${tiltY * 0.4}, ${tiltX * 0.2})`}>

            {/* 1. Base Drum Tower Cylinder */}
            <rect
              x="170"
              y="300"
              width="260"
              height="80"
              fill="url(#baseGrad)"
              stroke="rgba(34,211,238,0.4)"
              strokeWidth="1.5"
            />
            {/* Base Vertical Pilasters & Panels */}
            <line x1="210" y1="300" x2="210" y2="380" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line x1="260" y1="300" x2="260" y2="380" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line x1="340" y1="300" x2="340" y2="380" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line x1="390" y1="300" x2="390" y2="380" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            {/* 2. Catwalk Observation Gallery Deck & Railing */}
            <rect x="155" y="294" width="290" height="8" rx="2" fill="#1E293B" stroke="rgba(34,211,238,0.6)" strokeWidth="1" />
            {/* Railing Uprights */}
            {[165, 195, 225, 255, 285, 315, 345, 375, 405, 435].map((rx) => (
              <line key={rx} x1={rx} y1="284" x2={rx} y2="294" stroke="rgba(148,163,184,0.4)" strokeWidth="1.2" />
            ))}
            <line x1="160" y1="284" x2="440" y2="284" stroke="rgba(34,211,238,0.5)" strokeWidth="1.2" />

            {/* 3. Hemispherical Rotating Observatory Dome Roof */}
            {/* Outer Geodesic Dome Cap */}
            <path
              d="M 180,294 A 120,120 0 0,1 420,294 Z"
              fill="url(#domeGrad)"
              stroke="rgba(34,211,238,0.8)"
              strokeWidth="2"
            />
            {/* Dome Top Outer Luminous Rim */}
            <path
              d="M 180,294 A 120,120 0 0,1 420,294"
              fill="none"
              stroke="url(#domeRimGrad)"
              strokeWidth="3.5"
            />

            {/* Dome Geodesic Seam Ribs */}
            <path d="M 210,294 A 115,115 0 0,1 390,294" fill="none" stroke="rgba(34,211,238,0.25)" strokeWidth="1" />
            <path d="M 240,294 A 100,100 0 0,1 360,294" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <path d="M 225,294 C 240,230 270,185 300,174" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="1" strokeDasharray="2 3" />
            <path d="M 375,294 C 360,230 330,185 300,174" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="1" strokeDasharray="2 3" />

            {/* 4. The Great Observation Slit Aperture (Parted Shutter Doors) */}
            <path
              d="M 276,174 L 268,294 L 332,294 L 324,174 Z"
              fill="#050810"
              stroke="rgba(34,211,238,0.7)"
              strokeWidth="1.5"
            />
            {/* Shutter Left Flange Door */}
            <rect x="264" y="174" width="6" height="120" fill="#334155" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            {/* Shutter Right Flange Door */}
            <rect x="330" y="174" width="6" height="120" fill="#334155" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            {/* Interior Aperture Glow */}
            <ellipse cx="300" cy="275" rx="20" ry="12" fill="rgba(34,211,238,0.15)" />

            {/* 5. Precision Optical Astronomical Telescope Assembly */}
            <g transform={`translate(${300 + telescopeOffsetX * 0.6}, ${240 + telescopeOffsetY * 0.4}) rotate(${mouseOffset.x * 12})`}>
              
              {/* Equatorial Mount Pivot Base */}
              <rect x="-18" y="15" width="36" height="14" rx="2" fill="#1E293B" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
              <circle cx="-10" cy="22" r="2.5" fill="#22d3ee" />
              <circle cx="10" cy="22" r="2.5" fill="#22d3ee" />

              {/* Carbon-Fiber Main Telescope Barrel (Protruding Upward at 55°) */}
              <rect
                x="-14"
                y="-45"
                width="28"
                height="62"
                rx="3"
                fill="url(#tubeGrad)"
                stroke="rgba(34,211,238,0.5)"
                strokeWidth="1.2"
              />
              
              {/* Barrel Calibration Rings & Markings */}
              <line x1="-14" y1="-28" x2="14" y2="-28" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="-14" y1="-10" x2="14" y2="-10" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              <line x1="-14" y1="8" x2="14" y2="8" stroke="#34d399" strokeWidth="1.2" />

              {/* Laser Guide Star Emitter Pod */}
              <rect x="11" y="-48" width="4" height="10" rx="1" fill="#34d399" stroke="#ffffff" strokeWidth="0.5" />
              <circle cx="13" cy="-48" r="2" fill="#34d399" className="animate-pulse" />

              {/* Optical Objective Front Lens Cell */}
              <rect
                x="-16"
                y="-53"
                width="32"
                height="9"
                rx="2"
                fill="#0F172A"
                stroke="rgba(34,211,238,0.9)"
                strokeWidth="1.5"
              />

              {/* Massive Multi-Coated Objective Glass Lens */}
              <ellipse
                cx="0"
                cy="-49"
                rx="13"
                ry="3.5"
                fill="url(#lensFlare)"
                stroke="#67e8f9"
                strokeWidth="1"
              />

              {/* Aperture Core Highlight */}
              <circle cx="0" cy="-49" r="2" fill="#ffffff" />
            </g>

            {/* Base Deck Markings and Telemetry Lights */}
            <g transform="translate(180, 312)">
              <circle cx="12" cy="0" r="2.5" fill="#ef4444" className="animate-pulse" />
              <text x="20" y="3" fill="#64748b" fontSize="7" fontFamily="monospace">STATION 01</text>
              <circle cx="218" cy="0" r="2.5" fill="#34d399" className="animate-ping" />
              <text x="140" y="3" fill="#22d3ee" fontSize="7" fontFamily="monospace">AO-9 LOCKED</text>
            </g>
          </g>
        </svg>
      </div>

      {/* Bottom Interactive Callout Strip */}
      <div className="relative z-20 px-4 py-3 bg-[#080D18]/95 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform animate-pulse" />
          <span className="font-semibold text-white">OBSERVATORY TARGET:</span>
          <span className="text-cyan-300 font-bold">
            {activeTarget ? `Targeting ${activeTarget.toUpperCase()}` : '4 Flagship Production Systems Ready'}
          </span>
        </div>

        {/* Pulsing Interactive CTA Button */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/15 group-hover:bg-cyan-500 border border-cyan-500/40 group-hover:border-cyan-300 text-cyan-300 group-hover:text-black font-bold text-[11px] transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]">
          <Eye className="w-3.5 h-3.5" />
          <span>CLICK TO ENTER OBSERVATORY // VIEW SYSTEMS</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
