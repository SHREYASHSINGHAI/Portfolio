import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Sliders } from 'lucide-react';
import TerminalRAGPlayground from './playgrounds/TerminalRAGPlayground';

export default function QuantitativeEvaluation() {

  const benchmarkMatrix = [
    {
      system: 'Sentinel-Code (Hybrid Gatekeeper)',
      tokenCost: '$0.00 (97% pruned local) / $0.075 MTok residual',
      latency: '0.74 ms local AST · < 1.2s cloud verification',
      ram: '< 150 MB (Node/Python hook)',
      offline: 'Deterministic stage passes offline; blocks secrets',
      depth: 'High (AST + Gemini 2.5 Flash semantic judge)',
      highlight: true,
      verdict: 'OPTIMAL PRE-COMMIT',
    },
    {
      system: 'Terminal-RAG (Air-Gapped SLM)',
      tokenCost: '$0.00 (Zero API fees / Local compute)',
      latency: '8.2 ms vector query · ~45 t/s Qwen 2.5 0.5B',
      ram: '3.82 GB (Optimized for 4GB RAM ceiling)',
      offline: '100% Air-Gapped / Fully Local SLM',
      depth: 'Specialized (Domain doc QA + AST code lookup)',
      highlight: true,
      verdict: 'AIR-GAPPED RETRIEVAL',
    },
    {
      system: 'Standard Cloud RAG (Pinecone + GPT-4o)',
      tokenCost: '$2.50 - $10.00 / MTok + Vector DB subscription',
      latency: '650 ms - 2,400 ms cloud round-trip',
      ram: 'Minimal client RAM (Heavy cloud infra)',
      offline: '0% (Hard failure on internet disconnect)',
      depth: 'Very High (Broad world knowledge)',
      highlight: false,
      verdict: 'EXPENSIVE CLOUD DEPENDENCY',
    },
    {
      system: 'Naive Git Hook (Raw LLM Call on All Diffs)',
      tokenCost: 'Excessive ($15+ / 100 developer commits)',
      latency: '4,500 ms (Blocks git commit workflow)',
      ram: 'Minimal',
      offline: '0% (Fails commit if offline)',
      depth: 'Erratic (Hallucinates on raw whitespace diffs)',
      highlight: false,
      verdict: 'ANTI-PATTERN',
    },
  ];



  return (
    <section id="benchmarks" className="py-24 bg-transparent border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-cyan-400"></span>
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.25em]">
              02 // QUANTITATIVE EVALUATION & RESEARCH
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            Systems Benchmark <span className="text-slate-500">Matrix.</span>
          </h2>
          <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
            Deterministic evaluations contrasting local pre-filtering and offline SLMs against standard cloud architectures across latency, unit economics, and memory ceilings.
          </p>
        </div>

        {/* Sub-component A: Benchmark Comparison Matrix Table */}
        <div className="mb-16 rounded-2xl bg-[#0F172A]/70 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="p-4 bg-[#0A0E17] border-b border-white/10 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white uppercase tracking-wider">
                Production AI Architecture Trade-Off Ledger
              </span>
            </div>
            <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Verified Benchmark Runs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/40 text-gray-400 text-[11px] uppercase tracking-wider">
                  <th className="p-4">Architecture Archetype</th>
                  <th className="p-4">Token Cost & Unit Economics</th>
                  <th className="p-4">Latency (P95)</th>
                  <th className="p-4">Memory Footprint</th>
                  <th className="p-4">Air-Gapped / Offline</th>
                  <th className="p-4">Status & Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {benchmarkMatrix.map((row, i) => (
                  <tr
                    key={i}
                    className={`transition-colors ${
                      row.highlight
                        ? 'bg-cyan-500/[0.04] hover:bg-cyan-500/[0.08]'
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <td className="p-4 font-bold text-slate-100 flex items-center gap-2">
                      {row.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      )}
                      <span>{row.system}</span>
                    </td>
                    <td className="p-4 text-slate-300">{row.tokenCost}</td>
                    <td className="p-4 text-cyan-300 font-bold">{row.latency}</td>
                    <td className="p-4 text-slate-300">{row.ram}</td>
                    <td className="p-4 text-slate-400">{row.offline}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          row.highlight
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                            : 'bg-white/5 border-white/10 text-gray-500'
                        }`}
                      >
                        {row.verdict}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sub-component A.2: Integrated Terminal-RAG Separation Gap Interactive Inspector */}
        <div>
          <div className="flex items-center gap-2 mb-4 font-mono text-xs text-gray-400">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="uppercase tracking-wider font-bold text-white">
              Interactive Retrieval Bounds Inspector // Terminal-RAG
            </span>
          </div>
          <TerminalRAGPlayground />
        </div>

      </div>
    </section>
  );
}
