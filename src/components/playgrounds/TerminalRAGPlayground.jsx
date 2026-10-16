import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Database, Cpu, Layers, Sparkles, AlertTriangle } from 'lucide-react';
import { sound } from '../../utils/sound';

export default function TerminalRAGPlayground() {
  const [ambiguity, setAmbiguity] = useState(0.25);
  const [chunkStrategy, setChunkStrategy] = useState('fixed500'); // 'fixed500' or 'lineByLine'

  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value);
    setAmbiguity(val);
    sound.playTick();
  };

  const handleStrategyToggle = (strategy) => {
    sound.playClick();
    setChunkStrategy(strategy);
    sound.playChirp(true);
  };

  // Compute metrics based on slider and strategy
  const metrics = useMemo(() => {
    const isFixed = chunkStrategy === 'fixed500';
    // Baseline separation gap: high with fixed chunks, lower with line-by-line
    const baseGap = isFixed ? 0.42 : 0.28;
    const gap = Math.max(0.08, +(baseGap - ambiguity * 0.28).toFixed(2));
    
    const baseHitRate = isFixed ? 0.96 : 0.85;
    const hitRate = Math.max(0.68, +(baseHitRate - ambiguity * 0.22).toFixed(2));

    const baseMrr = isFixed ? 0.91 : 0.77;
    const mrr = Math.max(0.58, +(baseMrr - ambiguity * 0.25).toFixed(2));

    const latency = isFixed ? '8.2 ms' : '14.6 ms';
    const ram = isFixed ? '3.82 GB' : '3.94 GB';

    return { gap, hitRate, mrr, latency, ram };
  }, [ambiguity, chunkStrategy]);

  // Generate 2D vector coordinates for SVG scatter plot
  const points = useMemo(() => {
    const center = { x: 200, y: 150 };
    const queryPoint = { x: 200, y: 150, label: 'Query [q]' };

    // True positives (clustered near query, spread out as ambiguity increases)
    const tpSpread = 25 + ambiguity * 70;
    const truePositives = [
      { x: center.x + 20 + ambiguity * 35, y: center.y - 15 - ambiguity * 25, id: 'tp1', score: +(0.89 - ambiguity * 0.18).toFixed(2), text: 'Doc-3: Tokenizer memory alignment' },
      { x: center.x - 25 - ambiguity * 40, y: center.y + 20 + ambiguity * 30, id: 'tp2', score: +(0.86 - ambiguity * 0.19).toFixed(2), text: 'Doc-7: Vector store L2 normalization' },
      { x: center.x + 35 + ambiguity * 45, y: center.y + 15 + ambiguity * 35, id: 'tp3', score: +(0.83 - ambiguity * 0.21).toFixed(2), text: 'Doc-1: Cosine similarity BLAS loop' },
    ];

    // Background noise chunks (fixed positions, may overlap if ambiguity is extreme)
    const noise = [
      { x: 70, y: 60, id: 'n1', score: 0.31, text: 'Noise: CSS build configs' },
      { x: 330, y: 70, id: 'n2', score: 0.35, text: 'Noise: Docker compose logs' },
      { x: 90, y: 230, id: 'n3', score: 0.39, text: 'Noise: CI pipeline test matrix' },
      { x: 320, y: 240, id: 'n4', score: 0.42, text: 'Noise: Git hook commit template' },
      { x: 60, y: 140, id: 'n5', score: 0.29, text: 'Noise: README license disclaimer' },
      { x: 340, y: 160, id: 'n6', score: 0.44, text: 'Noise: Python virtualenv scripts' },
    ];

    return { queryPoint, truePositives, noise };
  }, [ambiguity]);

  return (
    <div className="w-full bg-[#080C14] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs">
      {/* Top Header */}
      <div className="px-4 py-3 bg-[#0F172A]/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-white font-bold tracking-wider uppercase">Terminal-RAG // Separation Gap Inspector</span>
          <span className="text-gray-500 hidden sm:inline">| Offline SLM Retrieval Bounds</span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-black/40 border border-white/5">
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-gray-400">RAM Ceiling:</span>
          <span className="text-emerald-300 font-bold">{metrics.ram} / 4.00 GB</span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="p-4 bg-black/40 border-b border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Ambiguity Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-400 flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-cyan-400" />
              <span>Query Semantic Ambiguity:</span>
            </span>
            <span className="text-cyan-300 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              {(ambiguity * 100).toFixed(0)}% Ambiguity
            </span>
          </div>
          <input
            type="range"
            min="0.0"
            max="1.0"
            step="0.05"
            value={ambiguity}
            onChange={handleSliderChange}
            className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-gray-500">
            <span>Deterministic Keyword ("L2 vector normalization")</span>
            <span>Abstract Vague ("How does code speed up?")</span>
          </div>
        </div>

        {/* Chunking Strategy Toggle */}
        <div className="flex flex-col gap-1.5">
          <span className="text-gray-400 text-[11px] flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-emerald-400" />
            <span>Chunking Strategy:</span>
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleStrategyToggle('fixed500')}
              className={`px-3 py-1.5 rounded-lg border text-[11px] transition-all flex items-center justify-center gap-1.5 ${
                chunkStrategy === 'fixed500'
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-bold shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                  : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span>Fixed 500-Token Chunking</span>
              <span className="text-[9px] text-emerald-400">✓ OPTIMAL</span>
            </button>
            <button
              onClick={() => handleStrategyToggle('lineByLine')}
              className={`px-3 py-1.5 rounded-lg border text-[11px] transition-all flex items-center justify-center gap-1.5 ${
                chunkStrategy === 'lineByLine'
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                  : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span>Line-by-Line Chunking</span>
              <span className="text-[9px] text-amber-400">HIGH NOISE</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2D Vector Space Scatter Plot Visualizer */}
      <div className="p-4 bg-[#080C14] flex flex-col items-center justify-center relative border-b border-white/5">
        <div className="w-full max-w-xl h-64 relative bg-[#060910] border border-white/10 rounded-lg overflow-hidden flex items-center justify-center">
          {/* Coordinate Grid Lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ragGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ragGrid)" />

            {/* Separation boundary threshold radius */}
            <circle
              cx="50%"
              cy="50%"
              r={70 - ambiguity * 25}
              fill="rgba(6, 182, 212, 0.04)"
              stroke="rgba(6, 182, 212, 0.3)"
              strokeDasharray="4 4"
            />
            <circle
              cx="50%"
              cy="50%"
              r={120}
              fill="none"
              stroke="rgba(245, 158, 11, 0.15)"
              strokeDasharray="2 4"
            />

            {/* Connector lines from query to true positives */}
            {points.truePositives.map((tp) => (
              <line
                key={tp.id}
                x1="50%"
                y1="50%"
                x2={`${(tp.x / 400) * 100}%`}
                y2={`${(tp.y / 300) * 100}%`}
                stroke="rgba(16, 185, 129, 0.4)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            ))}
          </svg>

          {/* Central Query Vector */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 pointer-events-none">
            <span className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-white shadow-[0_0_15px_#22d3ee] animate-pulse"></span>
            <span className="text-[10px] text-cyan-300 font-bold bg-black/80 px-1.5 rounded border border-cyan-500/30 mt-1 whitespace-nowrap">
              Query Vector [q]
            </span>
          </div>

          {/* True Positive Context Chunks */}
          {points.truePositives.map((tp) => (
            <motion.div
              key={tp.id}
              animate={{
                left: `${(tp.x / 400) * 100}%`,
                top: `${(tp.y / 300) * 100}%`,
              }}
              transition={{ type: 'spring', damping: 15, stiffness: 120 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border border-white/60 shadow-[0_0_10px_#10b981] group-hover:scale-125 transition-transform"></span>
              <span className="text-[9px] text-emerald-300 bg-black/90 px-1.5 py-0.5 rounded border border-emerald-500/40 mt-1 whitespace-nowrap shadow">
                Cos: {tp.score}
              </span>
            </motion.div>
          ))}

          {/* Background Noise Chunks */}
          {points.noise.map((n) => (
            <div
              key={n.id}
              style={{ left: `${(n.x / 400) * 100}%`, top: `${(n.y / 300) * 100}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity"
            >
              <span className="w-2 h-2 rounded-full bg-slate-500 border border-slate-700"></span>
              <span className="text-[8px] text-slate-500 bg-black/70 px-1 rounded mt-0.5 whitespace-nowrap hidden group-hover:block">
                Noise: {n.score}
              </span>
            </div>
          ))}

          {/* Separation Gap Annotation Badge */}
          <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1.5 px-2 py-1 rounded bg-black/80 border border-white/10 text-[10px]">
            <span className="text-gray-400">Separation Delta:</span>
            <span className={`font-bold ${metrics.gap >= 0.25 ? 'text-emerald-400' : 'text-amber-400'}`}>
              +{metrics.gap.toFixed(2)} Cosine Margin
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Telemetry Metric Cards */}
      <div className="p-4 bg-[#0A0E17] grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex flex-col">
          <span className="text-gray-500 text-[10px] uppercase">Hit Rate @ 5:</span>
          <span className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
            {metrics.hitRate}
          </span>
          <span className="text-[9px] text-gray-500">Benchmark pass target &gt; 0.90</span>
        </div>

        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex flex-col">
          <span className="text-gray-500 text-[10px] uppercase">Mean Reciprocal Rank:</span>
          <span className="text-lg font-bold text-cyan-400 font-mono mt-0.5">
            {metrics.mrr}
          </span>
          <span className="text-[9px] text-gray-500">MRR first-rank confidence</span>
        </div>

        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex flex-col">
          <span className="text-gray-500 text-[10px] uppercase">Separation Gap Margin:</span>
          <span className={`text-lg font-bold font-mono mt-0.5 ${metrics.gap >= 0.25 ? 'text-emerald-400' : 'text-amber-400'}`}>
            +{metrics.gap.toFixed(2)}
          </span>
          <span className="text-[9px] text-gray-500">Cosine margin vs noise</span>
        </div>

        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex flex-col">
          <span className="text-gray-500 text-[10px] uppercase">Vector Query Latency:</span>
          <span className="text-lg font-bold text-white font-mono mt-0.5">
            {metrics.latency}
          </span>
          <span className="text-[9px] text-gray-500">Local in-memory NumPy BLAS</span>
        </div>
      </div>
    </div>
  );
}
