import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Code2,
  GitBranch,
  Play,
  Layers,
  ChevronRight,
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  X,
  Cpu
} from 'lucide-react';
import { sound } from '../utils/sound';
import { architectureTiers } from '../data/projects';
import GraphicSynthesizer from './GraphicSynthesizer';
import SentinelCodePlayground from './playgrounds/SentinelCodePlayground';
import TerminalRAGPlayground from './playgrounds/TerminalRAGPlayground';
import MeetSummarizerPlayground from './playgrounds/MeetSummarizerPlayground';

export default function CuratedSystemsGrid({ projects }) {
  const [activeTier, setActiveTier] = useState('all'); // 'all', 1, 2, 3
  const [activePlaygroundProject, setActivePlaygroundProject] = useState(null);

  const filteredProjects = projects.filter((p) => {
    if (activeTier === 'all') return true;
    return p.tier === Number(activeTier);
  });

  const handleOpenPlayground = (project) => {
    sound.playClick();
    setActivePlaygroundProject(project);
    sound.playChirp(true);
  };

  const handleClosePlayground = () => {
    sound.playClick();
    setActivePlaygroundProject(null);
  };

  return (
    <section id="systems" className="py-24 bg-[#080C14] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-cyan-400"></span>
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.25em]">
                01 // CURATED SYSTEMS & WORKFLOWS
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-sans font-bold text-white tracking-tight">
              Production AI <span className="text-slate-500">Observatory.</span>
            </h2>
            <div className="flex items-center gap-3 mt-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>OBSERVATION DECK ACTIVE // {projects.length} SYSTEMS DEPLOYED</span>
              </span>
            </div>
            <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              Real open-source engineering systems categorized across deterministic pre-filtering, air-gapped SLM retrieval, and multi-agent workflow automation.
            </p>
          </div>

          {/* Tier Filter Segmented Control */}
          <div className="flex items-center p-1 bg-[#0F172A] border border-white/10 rounded-xl font-mono text-xs overflow-x-auto">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTier('all');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTier === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Tiers ({projects.length})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTier('1');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTier === '1'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tier 1: Flagship
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTier('2');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTier === '2'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tier 2: B2B Agents
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTier('3');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTier === '3'
                  ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tier 3: MLOps
            </button>
          </div>
        </div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
            const isFlagship = project.tier === 1;

            return (
              <motion.div
                key={project.id}
                id={`project-${project.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
                className={`group rounded-2xl bg-[#0F172A]/70 border transition-all duration-300 backdrop-blur-xl flex flex-col overflow-hidden ${
                  isFlagship
                    ? 'border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.06)] hover:border-cyan-500/60'
                    : 'border-white/10 hover:border-white/25 shadow-lg'
                }`}
              >
                {/* 16:9 Banner Graphic (Dynamic Synthesizer or Domain Asset) */}
                <div className="relative">
                  <GraphicSynthesizer
                    project={project}
                    showImageIfAvailable={true}
                    aspectRatio="aspect-[16/9]"
                  />

                  {/* Tier Indicator Tag */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-mono border backdrop-blur-md font-bold uppercase ${
                        project.tier === 1
                          ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
                          : project.tier === 2
                          ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                          : 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300'
                      }`}
                    >
                      Tier {project.tier}: {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between font-mono text-xs">
                  
                  {/* Top Metadata Row */}
                  <div>
                    <div className="flex items-center justify-between text-gray-400 mb-3 text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base font-sans">{project.title}</span>
                        <span className="text-gray-500">[{project.license}]</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-emerald-400 font-bold">{project.status || 'Active'}</span>
                      </div>
                    </div>

                    {/* Architecture Breakdown: Problem ➔ Architecture ➔ Benchmark */}
                    <div className="space-y-3 font-sans text-xs text-slate-300 mb-6 leading-relaxed">
                      {project.specs ? (
                        <>
                          <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                            <span className="font-bold text-cyan-300 font-mono text-[10px] uppercase block mb-1">
                              [Problem Statement]
                            </span>
                            <p className="text-slate-300">{project.specs.problem}</p>
                          </div>

                          <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                            <span className="font-bold text-emerald-300 font-mono text-[10px] uppercase block mb-1">
                              [System Architecture]
                            </span>
                            <p className="text-slate-300">{project.specs.architecture}</p>
                          </div>

                          <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                            <span className="font-bold text-amber-300 font-mono text-[10px] uppercase block mb-1">
                              [Quantitative Benchmark]
                            </span>
                            <p className="text-slate-300">{project.specs.benchmark}</p>
                          </div>
                        </>
                      ) : (
                        <p className="text-slate-400">{project.description}</p>
                      )}
                    </div>

                    {/* Telemetry Metric Badges */}
                    {project.telemetry && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                        {Object.entries(project.telemetry).map(([k, v]) => (
                          <div key={k} className="p-2 rounded bg-black/50 border border-white/5 text-[10px]">
                            <span className="text-gray-500 uppercase block truncate">
                              {k.replace(/([A-Z])/g, ' $1')}
                            </span>
                            <span className="font-bold text-cyan-300 font-mono text-xs">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[10px] bg-white/[0.03] border border-white/10 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playClick()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-colors"
                        >
                          <Code2 className="w-3.5 h-3.5" />
                          <span>Source Code ↗</span>
                        </a>
                      )}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playClick()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 transition-colors font-bold"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo ↗</span>
                        </a>
                      )}
                    </div>

                    {/* Playground Trigger Button (Where applicable) */}
                    {project.hasPlayground && (
                      <button
                        onClick={() => handleOpenPlayground(project)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.25)] ml-auto"
                      >
                        <Play className="w-3 h-3 fill-black" />
                        <span>Interactive Playground</span>
                      </button>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Interactive In-Browser Playground Modal Drawer */}
      <AnimatePresence>
        {activePlaygroundProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#080C14] border border-cyan-500/40 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.2)] flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="p-4 bg-[#0F172A] border-b border-white/10 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="font-bold text-white uppercase text-sm font-sans">
                    {activePlaygroundProject.title} // Interactive Systems Observatory
                  </span>
                </div>
                <button
                  onClick={handleClosePlayground}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body: Specific Playground */}
              <div className="p-6">
                {activePlaygroundProject.playgroundType === 'sentinel' && (
                  <SentinelCodePlayground />
                )}
                {activePlaygroundProject.playgroundType === 'rag' && (
                  <TerminalRAGPlayground />
                )}
                {activePlaygroundProject.playgroundType === 'pipeline' && (
                  <MeetSummarizerPlayground />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
