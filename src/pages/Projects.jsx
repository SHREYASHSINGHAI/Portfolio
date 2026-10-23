import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Terminal } from 'lucide-react';
import GlobalStatusBar from '../components/GlobalStatusBar';
import CuratedSystemsGrid from '../components/CuratedSystemsGrid';
import CommandLineTerminal from '../components/CommandLineTerminal';
import ProjectStudio from '../components/ProjectStudio';
import { getStoredProjects } from '../data/projects';
import { sound } from '../utils/sound';

export default function Projects() {
  const navigate = useNavigate();
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [projects, setProjects] = useState(getStoredProjects);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id) || document.getElementById(`project-${id}`);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 120);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

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

      {/* Main Content */}
      <main className="relative z-10 pt-16 flex flex-col">
        {/* Back to Mission Control Breadcrumb Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 pb-2">
          <button
            onClick={() => {
              sound.playClick();
              navigate('/');
            }}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>← RETURN TO OBSERVATORY // HOME</span>
          </button>
        </div>

        {/* Curated Systems Grid with Integrated Playgrounds */}
        <CuratedSystemsGrid projects={projects} />

        {/* Command-Line Inbound Terminal & Telemetry Footer */}
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
