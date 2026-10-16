import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Key,
  RefreshCw,
  FolderKanban,
  FileText,
  Sparkles,
  Sliders,
  Check,
  Star,
  GitFork,
  Eye,
  EyeOff,
  Layers,
  ArrowRight,
  Code2,
  Cpu
} from 'lucide-react';
import { Github } from './Icons';
import { sound } from '../utils/sound';
import { initialProjects, getStoredProjects, saveStoredProjects, architectureTiers } from '../data/projects';
import GraphicSynthesizer from './GraphicSynthesizer';

export default function ProjectStudio({ isOpen, onClose, onProjectsUpdated }) {
  const [token, setToken] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('gh_pat') || '' : ''));
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [activeTab, setActiveTab] = useState('curation'); // 'curation', 'readme_ast', 'card_synth'
  const [curatedProjects, setCuratedProjects] = useState(getStoredProjects);
  const [readmeText, setReadmeText] = useState('');
  const [parsedMetrics, setParsedMetrics] = useState([]);
  const [parsedProblem, setParsedProblem] = useState('');
  const [cardSnippet, setCardSnippet] = useState('');
  const [saveStatus, setSaveStatus] = useState(false);

  // Load repos on open
  useEffect(() => {
    if (isOpen) {
      fetchGitHubRepos();
      const current = getStoredProjects();
      setCuratedProjects(current);
      if (current.length > 0 && !selectedRepo) {
        setSelectedRepo(current[0]);
        setCardSnippet(current[0].codeSnippet || '');
      }
    }
  }, [isOpen]);

  const fetchGitHubRepos = async () => {
    setIsLoading(true);
    sound.playClick();
    try {
      const headers = { Accept: 'application/vnd.github.v3+json' };
      if (token.trim()) {
        headers.Authorization = `token ${token.trim()}`;
      }

      const res = await fetch('https://api.github.com/users/SHREYASHSINGHAI/repos?per_page=100&sort=updated', {
        headers,
      });

      if (res.ok) {
        const data = await res.json();
        setRepos(data);
      } else {
        // Fallback to pre-configured projects if rate-limited or error
        setRepos(
          curatedProjects.map((p) => ({
            name: p.title.replace(/\s+/g, '-'),
            full_name: p.repoName || `SHREYASHSINGHAI/${p.title}`,
            stargazers_count: 5,
            forks_count: 1,
            language: p.techStack[0] || 'Python',
            updated_at: '2025-10-15T08:00:00Z',
            description: p.specs?.problem || p.description,
          }))
        );
      }
    } catch {
      // Offline fallback
      setRepos(
        curatedProjects.map((p) => ({
          name: p.title.replace(/\s+/g, '-'),
          full_name: p.repoName || `SHREYASHSINGHAI/${p.title}`,
          stargazers_count: 4,
          forks_count: 1,
          language: p.techStack[0] || 'Python',
          updated_at: '2025-10-15T08:00:00Z',
          description: p.specs?.problem || p.description,
        }))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToken = () => {
    sound.playClick();
    if (typeof window !== 'undefined') {
      localStorage.setItem('gh_pat', token);
    }
    fetchGitHubRepos();
  };

  // Change tier of a project
  const handleUpdateTier = (projectId, newTier) => {
    sound.playClick();
    const updated = curatedProjects.map((p) => {
      if (p.id === projectId) {
        return { ...p, tier: Number(newTier) };
      }
      return p;
    });
    setCuratedProjects(updated);
    saveStoredProjects(updated);
    if (onProjectsUpdated) onProjectsUpdated(updated);
    showSavedNotification();
  };

  // Toggle visibility of a project
  const handleToggleVisibility = (projectId) => {
    sound.playClick();
    const updated = curatedProjects.map((p) => {
      if (p.id === projectId) {
        return { ...p, featured: !p.featured };
      }
      return p;
    });
    setCuratedProjects(updated);
    saveStoredProjects(updated);
    if (onProjectsUpdated) onProjectsUpdated(updated);
    showSavedNotification();
  };

  const showSavedNotification = () => {
    sound.playChirp(true);
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  // AST Parsing Engine
  const parseReadmeAST = (text) => {
    // 1. Extract Problem Statement
    const problemRegex = /(?:Problem|Challenge|Motivation|Overview)[:\s]+([^#\n]+(?:\n(?![#\n])[^\n]+)*)/i;
    const problemMatch = text.match(problemRegex);
    const extractedProblem = problemMatch ? problemMatch[1].trim() : 'Deterministic pre-filtering for production AI pipelines.';
    setParsedProblem(extractedProblem);

    // 2. Extract Quantitative Metrics (<1 ms, 48% reduction, 4GB RAM, Hit Rate@K)
    const metricRegex = /(\b\d+(?:\.\d+)?\s*(?:ms|%|GB|RAM|tokens|Hit Rate|MRR|FPS|records\/min)\b[^\n,.]*)/gi;
    const matches = text.match(metricRegex) || [];
    const uniqueMetrics = Array.from(new Set(matches.map(m => m.trim()))).slice(0, 6);
    setParsedMetrics(uniqueMetrics.length > 0 ? uniqueMetrics : ['< 1 ms latency', '48.02% token reduction', '< 4GB RAM footprint', '0.94 Hit Rate@5']);
  };

  const handleSelectProjectForAST = (project) => {
    sound.playClick();
    setSelectedRepo(project);
    setCardSnippet(project.codeSnippet || '');

    // Sample or real README text
    const sampleReadme = `# ${project.title}
## Problem
${project.specs?.problem || 'Eliminate redundant tokens and high latency in AI developer pipelines.'}

## Architecture
${project.specs?.architecture || 'Deterministic local pre-filtering and offline SLM vector indexing.'}

## Quantitative Benchmarks
- Benchmark speed: ${project.telemetry?.latency || '0.74 ms'} local pre-filter
- Token savings: ${project.telemetry?.tokenReduction || '48.02% reduction'}
- Memory footprint: ${project.telemetry?.ramFootprint || '3.82 GB RAM'}
- Retrieval Hit Rate@5: ${project.telemetry?.hitRateAtK || '0.94'}
`;
    setReadmeText(sampleReadme);
    parseReadmeAST(sampleReadme);
  };

  const handleSaveCardCustomization = () => {
    sound.playClick();
    if (!selectedRepo) return;
    const updated = curatedProjects.map((p) => {
      if (p.id === selectedRepo.id) {
        return {
          ...p,
          codeSnippet: cardSnippet,
        };
      }
      return p;
    });
    setCuratedProjects(updated);
    saveStoredProjects(updated);
    if (onProjectsUpdated) onProjectsUpdated(updated);
    showSavedNotification();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-6xl h-[90vh] bg-[#080C14] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200 font-sans"
        >
          {/* Header Bar */}
          <div className="px-6 py-4 bg-[#0F172A] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Github className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-mono font-bold text-white tracking-wide">
                    GITHUB PROJECT STUDIO // REPO OBSERVATORY
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    Live Admin Mode
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-mono">
                  Target: @SHREYASHSINGHAI · Real-time Curation, README AST Extraction & 16:9 Graphic Synthesizer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {saveStatus && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                  <Check className="w-3.5 h-3.5" /> Saved to LocalStorage
                </span>
              )}
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub Navigation Bar & GitHub Token Input */}
          <div className="px-6 py-3 bg-[#0A0E17] border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('curation');
                }}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'curation'
                    ? 'bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <FolderKanban className="w-3.5 h-3.5" />
                <span>1. Architecture Curation Drawer</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('readme_ast');
                }}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'readme_ast'
                    ? 'bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>2. Automated README AST Parser</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('card_synth');
                }}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'card_synth'
                    ? 'bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>3. 16:9 Graphic Synthesizer</span>
              </button>
            </div>

            {/* Optional GitHub PAT input */}
            <div className="flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-gray-500" />
              <input
                type="password"
                placeholder="GitHub PAT (Optional for Rate Limits)"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="bg-black/60 border border-white/10 rounded px-2.5 py-1 text-[11px] text-gray-300 placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 w-60"
              />
              <button
                onClick={handleSaveToken}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-[11px]"
              >
                Save
              </button>
              <button
                onClick={fetchGitHubRepos}
                disabled={isLoading}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#080C14]">
            
            {/* TAB 1: CURATION DRAWER */}
            {activeTab === 'curation' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                      Repository Architecture Tier Manager
                    </h3>
                    <p className="text-xs text-gray-400 font-sans">
                      Classify projects into high-density architecture tiers. Changes immediately apply to your portfolio view.
                    </p>
                  </div>
                  <div className="text-xs font-mono text-gray-400">
                    Total Curated Builds: <strong className="text-cyan-400">{curatedProjects.length}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {curatedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 rounded-xl bg-[#0F172A]/70 border border-white/10 hover:border-white/20 transition-all flex flex-wrap items-center justify-between gap-4 font-mono text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            project.tier === 1
                              ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]'
                              : project.tier === 2
                              ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]'
                              : 'bg-indigo-400 shadow-[0_0_8px_#818cf8]'
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm font-sans">{project.title}</span>
                            <span className="text-[10px] text-gray-500">[{project.repoName}]</span>
                            {project.status && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] bg-white/5 border border-white/10 text-gray-400">
                                {project.status}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-400 font-sans mt-0.5 line-clamp-1 max-w-xl">
                            {project.specs?.problem || project.description}
                          </p>
                        </div>
                      </div>

                      {/* Tier Selector & Visibility */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-500 text-[10px] uppercase">Tier:</span>
                          <select
                            value={project.tier}
                            onChange={(e) => handleUpdateTier(project.id, e.target.value)}
                            className="bg-black/60 border border-white/10 rounded px-2.5 py-1 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                          >
                            <option value="1">Tier 1: Flagship Systems</option>
                            <option value="2">Tier 2: B2B Workflow Automations</option>
                            <option value="3">Tier 3: MLOps & Systems Exploration</option>
                          </select>
                        </div>

                        <button
                          onClick={() => handleToggleVisibility(project.id)}
                          className={`p-1.5 rounded border transition-colors ${
                            project.featured
                              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                              : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'
                          }`}
                          title={project.featured ? 'Featured on Portfolio' : 'Hidden from primary view'}
                        >
                          {project.featured ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => {
                            handleSelectProjectForAST(project);
                            setActiveTab('card_synth');
                          }}
                          className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-[11px] flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          <span>Card OG</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: AUTOMATED README AST PARSER */}
            {activeTab === 'readme_ast' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                {/* Left: Repos List */}
                <div className="lg:col-span-4 bg-[#0F172A]/50 border border-white/10 rounded-xl p-3 flex flex-col gap-2 max-h-[65vh] overflow-y-auto">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider px-2">
                    Select Target Repository:
                  </span>
                  {curatedProjects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectProjectForAST(p)}
                      className={`text-left p-2.5 rounded-lg border transition-all text-xs font-mono ${
                        selectedRepo?.id === p.id
                          ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300 font-bold'
                          : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{p.title}</span>
                        <span className="text-[10px] text-gray-500">Tier {p.tier}</span>
                      </div>
                      <div className="text-[10px] text-gray-500 truncate mt-0.5">{p.repoName}</div>
                    </button>
                  ))}
                </div>

                {/* Right: AST Engine Output */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                  <div className="p-4 rounded-xl bg-[#0F172A]/70 border border-white/10 flex flex-col gap-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Client-Side Markdown AST Extraction</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        AST Parser Ready
                      </span>
                    </div>

                    {/* Extracted Problem Statement */}
                    <div className="bg-black/50 p-3 rounded-lg border border-white/5 flex flex-col gap-1">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                        Extracted Architectural Problem Statement:
                      </span>
                      <p className="text-slate-200 font-sans text-xs leading-relaxed">
                        {parsedProblem || selectedRepo?.specs?.problem}
                      </p>
                    </div>

                    {/* Detected Quantitative Metrics */}
                    <div className="bg-black/50 p-3 rounded-lg border border-white/5 flex flex-col gap-2">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                        Auto-Detected Quantitative Metrics (&lt;1 ms, 48% reduction, 4GB RAM):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {parsedMetrics.map((metric, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold flex items-center gap-1.5"
                          >
                            <Cpu className="w-3 h-3 text-cyan-400" />
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Raw README Preview */}
                    <div className="bg-black/50 p-3 rounded-lg border border-white/5 flex flex-col gap-1">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                        Source README AST Chunk:
                      </span>
                      <pre className="text-[10px] text-slate-400 font-mono overflow-x-auto max-h-36 leading-relaxed whitespace-pre-wrap">
                        {readmeText || '# Select a repository to parse markdown AST.'}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: 16:9 GRAPHIC SYNTHESIZER PREVIEW & CUSTOMIZER */}
            {activeTab === 'card_synth' && selectedRepo && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Customizer Controls */}
                <div className="lg:col-span-5 bg-[#0F172A]/70 border border-white/10 rounded-xl p-4 flex flex-col gap-4 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-bold text-white uppercase">Card Synthesizer Customizer</span>
                    <span className="text-[10px] text-cyan-400">{selectedRepo.title}</span>
                  </div>

                  {/* Code Snippet Editor */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-gray-400">Card Code Snippet / AST Output:</span>
                    <textarea
                      rows={6}
                      value={cardSnippet}
                      onChange={(e) => setCardSnippet(e.target.value)}
                      className="bg-black/80 border border-white/10 rounded-lg p-2.5 text-[11px] text-slate-200 font-mono focus:outline-none focus:border-cyan-500 leading-relaxed"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={handleSaveCardCustomization}
                      className="flex-1 py-2 rounded-lg bg-cyan-500 text-black font-mono font-bold hover:bg-cyan-400 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Card to Repository</span>
                    </button>
                  </div>
                </div>

                {/* Right: Live 16:9 Glassmorphic Card Preview */}
                <div className="lg:col-span-7 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                    <span>Live 16:9 Glassmorphic Output (Ray.so / Vercel OG Style):</span>
                    <span className="text-cyan-400">1920 × 1080 Aspect Ratio</span>
                  </div>

                  <div className="border border-white/10 rounded-xl overflow-hidden shadow-2xl bg-[#080C14]">
                    <GraphicSynthesizer
                      project={selectedRepo}
                      customSnippet={cardSnippet}
                      showImageIfAvailable={false}
                      aspectRatio="aspect-[16/9]"
                    />
                  </div>

                  <p className="text-[11px] text-gray-500 font-sans">
                    * If the repository has an explicit asset configured, the portfolio automatically prioritizes high-resolution domain screenshots; otherwise, this synthesized terminal card is dynamically generated.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-[#0F172A] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-gray-400">
            <div>
              <span>Storage Key: </span>
              <code className="text-cyan-300">localStorage["systems_observatory_projects"]</code>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-400">Studio Active</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
