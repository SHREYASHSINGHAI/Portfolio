import React, { useState } from 'react';
import GlobalStatusBar from '../components/GlobalStatusBar';
import HeroObservatory from '../components/HeroObservatory';
import CuratedSystemsGrid from '../components/CuratedSystemsGrid';
import QuantitativeEvaluation from '../components/QuantitativeEvaluation';
import VerifiedCredentials from '../components/VerifiedCredentials';
import CommandLineTerminal from '../components/CommandLineTerminal';
import ProjectStudio from '../components/ProjectStudio';
import { getStoredProjects } from '../data/projects';
import { Terminal } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Home() {
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [projects, setProjects] = useState(getStoredProjects);

  const handleOpenStudio = () => {
    sound.playClick();
    setIsStudioOpen(true);
  };

  const handleCloseStudio = () => {
    sound.playClick();
    setIsStudioOpen(false);
  };

  const handleProjectsUpdated = (updated) => {
    setProjects(updated);
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-300 relative overflow-x-hidden">
      {/* Blueprint Grid Lines Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Global Status Bar */}
      <GlobalStatusBar onOpenStudio={handleOpenStudio} />

      {/* Main Observatory Content */}
      <main className="relative z-10 flex flex-col">
        {/* Component 2: Hero Section (The Systems Architect Ledger) */}
        <HeroObservatory onOpenStudio={handleOpenStudio} />

        {/* Component 3: Curated Systems Grid with Integrated Playgrounds */}
        <CuratedSystemsGrid projects={projects} />

        {/* Component 4: Quantitative Evaluation & Research Foundations */}
        <QuantitativeEvaluation />

        {/* Component 5: Verified Credentials & ROI Leadership */}
        <VerifiedCredentials />

        {/* Component 6: Command-Line Inbound Terminal & Telemetry Footer */}
        <CommandLineTerminal onOpenStudio={handleOpenStudio} />
      </main>

      {/* Built-in GitHub Project Studio Drawer (Ctrl+G) */}
      <ProjectStudio
        isOpen={isStudioOpen}
        onClose={handleCloseStudio}
        onProjectsUpdated={handleProjectsUpdated}
      />

      {/* Discreet Floating Studio Pill */}
      <div className="fixed bottom-4 right-4 z-30">
        <button
          onClick={handleOpenStudio}
          title="Open Project Studio (Ctrl+G)"
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0F172A]/90 hover:bg-[#1E293B] border border-cyan-500/40 text-cyan-300 font-mono text-xs shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-md transition-all duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform animate-pulse"></span>
          <Terminal className="w-3.5 h-3.5" />
          <span className="font-bold hidden sm:inline">PROJECT STUDIO</span>
          <kbd className="hidden sm:inline px-1.5 py-0.2 rounded bg-black/60 border border-white/10 text-[9px] text-gray-400 font-mono">
            Ctrl+G
          </kbd>
        </button>
      </div>
    </div>
  );
}
