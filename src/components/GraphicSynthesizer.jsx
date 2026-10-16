import React from 'react';
import { GitBranch, ShieldCheck, Terminal, Cpu } from 'lucide-react';

export default function GraphicSynthesizer({
  project,
  theme = 'obsidian', // 'obsidian', 'cyan', 'graphite', 'emerald'
  customSnippet = null,
  customBadges = null,
  showImageIfAvailable = true,
  aspectRatio = 'aspect-[16/9]',
}) {
  // If explicit image is present and requested
  if (showImageIfAvailable && project?.images && project.images.length > 0 && project.images[0]) {
    return (
      <div className={`w-full ${aspectRatio} relative overflow-hidden rounded-t-xl bg-[#080C14] border-b border-white/10 group`}>
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          onError={(e) => {
            // fallback if local image fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-black/30 pointer-events-none" />
        
        {/* Top telemetry badge overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 backdrop-blur-md border border-white/10 text-cyan-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            {project.repoName || project.title}
          </span>
        </div>

        {/* Branch pill top right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 backdrop-blur-md border border-white/10 text-gray-400 flex items-center gap-1">
            <GitBranch className="w-3 h-3 text-gray-500" />
            {project.branch || 'main'}
          </span>
        </div>
      </div>
    );
  }

  // Synthesized 16:9 Glassmorphic Ray.so/Vercel OG style terminal card
  const snippet = customSnippet || project?.codeSnippet || `// Architecture spec for ${project?.title || 'System'}
pipeline = initialize_pipeline("${project?.title || 'observatory'}")
pipeline.execute(deterministic=True)
# Telemetry: Latency < 1ms, Memory < 4GB`;

  const badges = customBadges || project?.badges || project?.techStack?.slice(0, 4) || ['Python', 'LLM', 'MIT License'];
  const repoName = project?.repoName || `SHREYASHSINGHAI/${project?.title?.replace(/\s+/g, '-') || 'repo'}`;
  const branch = project?.branch || 'main';

  return (
    <div className={`w-full ${aspectRatio} relative overflow-hidden rounded-t-xl bg-[#080C14] border-b border-white/10 flex flex-col justify-between p-4 sm:p-5 select-none font-mono group`}>
      {/* Blueprint Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Subtle Glow Gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Top Window Bar */}
      <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-gray-300 font-bold ml-2 text-[11px] truncate max-w-[200px]">
            {repoName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-gray-400 flex items-center gap-1">
            <GitBranch className="w-3 h-3 text-cyan-400" />
            <span>{branch}</span>
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>
      </div>

      {/* Center Code Diff / Synthesized Terminal Snippet */}
      <div className="relative z-10 my-auto py-2 overflow-hidden">
        <div className="bg-[#05080E]/90 border border-white/10 rounded-lg p-3 text-[10.5px] leading-relaxed shadow-xl backdrop-blur-md">
          <pre className="text-slate-300 font-mono overflow-x-hidden whitespace-pre-wrap">
            {snippet.split('\n').slice(0, 6).map((line, idx) => {
              const isComment = line.trim().startsWith('#') || line.trim().startsWith('//');
              const isDef = line.includes('def ') || line.includes('class ') || line.includes('export ');
              const isReturn = line.includes('return ') || line.includes('await ');

              let color = 'text-slate-300';
              if (isComment) color = 'text-slate-500 italic';
              else if (isDef) color = 'text-cyan-300 font-bold';
              else if (isReturn) color = 'text-emerald-300 font-semibold';

              return (
                <div key={idx} className="flex items-start">
                  <span className="select-none text-slate-600 w-5 text-right pr-2 text-[9px]">
                    {idx + 1}
                  </span>
                  <span className={color}>{line}</span>
                </div>
              );
            })}
          </pre>
        </div>
      </div>

      {/* Bottom Verified Badges Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-white/10 text-[10px]">
        <div className="flex flex-wrap items-center gap-1.5">
          {badges.map((b, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-gray-300 flex items-center gap-1 font-mono text-[9.5px]"
            >
              <ShieldCheck className="w-2.5 h-2.5 text-cyan-400" />
              <span>{b}</span>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-[9.5px] text-gray-400 font-mono">
          <Cpu className="w-3 h-3 text-emerald-400" />
          <span>SYNTHESIZED OG // 16:9</span>
        </div>
      </div>
    </div>
  );
}
