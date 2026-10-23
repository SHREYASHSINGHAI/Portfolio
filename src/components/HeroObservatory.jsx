import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, ArrowDown, Sparkles, ShieldCheck, Cpu, Zap, Activity } from 'lucide-react';
import { sound } from '../utils/sound';
import ObservatoryDome from './ObservatoryDome';

export default function HeroObservatory({ onOpenStudio }) {
  const navigate = useNavigate();
  const [activeLogIndex, setActiveLogIndex] = useState(0);

  const handleNavigateToProjects = (targetId) => {
    if (targetId) {
      navigate(`/projects#project-${targetId}`);
    } else {
      navigate('/projects');
    }
  };

  const telemetryLogs = [
    { time: '11:34:02.108', sys: 'SENTINEL', msg: 'AST pre-filter stripped 682 whitespace tokens in 0.74 ms. Git push authorized.' },
    { time: '11:34:04.420', sys: 'TERMINAL-RAG', msg: 'L2 Cosine dot-product executed over 1,420 chunks. Separation Gap: +0.38.' },
    { time: '11:34:07.892', sys: 'MEET-SUMM', msg: 'Whisper ASR stream parsed 42s audio chunk. Dispatched dual Notion & Slack webhook.' },
    { time: '11:34:11.205', sys: 'STOCKTALK', msg: 'Vercel AI SDK function call validated SKU-890 inventory delta with 0 hallucinations.' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % telemetryLogs.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-center pt-24 pb-16 overflow-hidden bg-transparent">
      {/* Blueprint Grid Background with subtle radial fade */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 50%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 50%, transparent 95%)',
        }}
      />

      {/* Atmospheric Phosphor Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/8 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Overline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0F172A] border border-white/10 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.1)]"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-300 font-semibold">
            AI & ML SYSTEMS ENGINEER · CSE (AI & ML) @ VIT
          </span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-sans font-bold tracking-tight text-white leading-[1.08] max-w-5xl mb-6"
        >
          Architecting <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-200">
            Production AI Systems.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-base sm:text-xl text-slate-400 font-normal max-w-3xl leading-relaxed tracking-normal mb-10"
        >
          Bridging experimental notebooks and deterministic production software through{' '}
          <span className="text-slate-200 font-medium">token economics</span>,{' '}
          <span className="text-cyan-300 font-medium">low-latency pre-filtering</span>, and{' '}
          <span className="text-emerald-300 font-medium">offline retrieval benchmarking</span>.
        </motion.p>

        {/* The Production AI Observatory Centerpiece Dome & Optical Array */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="w-full max-w-4xl mb-12"
        >
          <ObservatoryDome onNavigateToProjects={handleNavigateToProjects} />
        </motion.div>

        {/* Key Telemetry Ledger (Horizontal Data Strip) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 text-left font-mono"
        >
          {/* Metric 1 */}
          <div className="p-4 rounded-xl bg-[#0F172A]/70 border border-white/10 hover:border-cyan-500/40 transition-colors backdrop-blur-md flex flex-col justify-between group">
            <div className="flex items-center justify-between text-gray-500 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Pre-Filter Latency</span>
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-cyan-300 mt-2 tracking-tight group-hover:scale-105 transition-transform origin-left">
              0.74 ms
            </div>
            <div className="text-[10px] text-gray-400 mt-1">
              Sentinel-Code local AST hook
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-4 rounded-xl bg-[#0F172A]/70 border border-white/10 hover:border-emerald-500/40 transition-colors backdrop-blur-md flex flex-col justify-between group">
            <div className="flex items-center justify-between text-gray-500 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Token Reduction</span>
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-2 tracking-tight group-hover:scale-105 transition-transform origin-left">
              -48.02%
            </div>
            <div className="text-[10px] text-gray-400 mt-1">
              Pruned Git commit diffs
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-4 rounded-xl bg-[#0F172A]/70 border border-white/10 hover:border-amber-500/40 transition-colors backdrop-blur-md flex flex-col justify-between group">
            <div className="flex items-center justify-between text-gray-500 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">SLM RAM Footprint</span>
              <Activity className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-300 mt-2 tracking-tight group-hover:scale-105 transition-transform origin-left">
              &lt; 4GB RAM
            </div>
            <div className="text-[10px] text-gray-400 mt-1">
              Terminal-RAG offline Qwen 2.5
            </div>
          </div>

          {/* Metric 4 */}
          <div className="p-4 rounded-xl bg-[#0F172A]/70 border border-white/10 hover:border-indigo-500/40 transition-colors backdrop-blur-md flex flex-col justify-between group">
            <div className="flex items-center justify-between text-gray-500 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Oracle Certified</span>
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-indigo-300 mt-2 tracking-tight group-hover:scale-105 transition-transform origin-left">
              2x Pro
            </div>
            <div className="text-[10px] text-gray-400 mt-1">
              Agentic 2026 & GenAI 2025
            </div>
          </div>
        </motion.div>

        {/* Live Systems Telemetry Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-3xl mb-10 bg-[#060910] border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between text-xs font-mono shadow-inner"
        >
          <div className="flex items-center gap-3 overflow-hidden text-left">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0"></span>
            <span className="text-gray-500 hidden sm:inline flex-shrink-0">
              [{telemetryLogs[activeLogIndex].time}]
            </span>
            <span className="text-cyan-300 font-bold flex-shrink-0">
              {telemetryLogs[activeLogIndex].sys}:
            </span>
            <span className="text-slate-300 truncate">
              {telemetryLogs[activeLogIndex].msg}
            </span>
          </div>
          <span className="text-[10px] text-gray-500 uppercase flex-shrink-0 pl-2">
            LIVE TELEMETRY
          </span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono"
        >
          <Link
            to="/projects"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] tracking-wide group"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>EXPLORE CURATED SYSTEMS ❯</span>
          </Link>

          <a
            href="#benchmarks"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F172A] border border-white/15 text-slate-200 font-bold hover:border-cyan-500/50 hover:bg-[#1E293B] transition-all tracking-wide"
          >
            <span>VIEW BENCHMARKS</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={() => {
              sound.playClick();
              onOpenStudio();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F172A] border border-white/15 text-slate-200 font-bold hover:border-cyan-500/50 hover:bg-[#1E293B] transition-all tracking-wide"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>OPEN PROJECT STUDIO</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] text-gray-400">
              Ctrl+G
            </kbd>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
