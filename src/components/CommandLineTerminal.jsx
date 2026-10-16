import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  Mail,
  Copy,
  Check,
  MapPin,
  ExternalLink,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { sound } from '../utils/sound';

export default function CommandLineTerminal({ onOpenStudio }) {
  const email = 'shreyashsinghai2005@gmail.com';
  const [copied, setCopied] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    {
      type: 'system',
      text: 'Inbound Systems Terminal v2.4 initialized. Type "help" for executable telemetry commands.',
    },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(email);
    setCopied(true);
    sound.playChirp(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    sound.playClick();
    const newHistory = [...terminalHistory, { type: 'user', text: `$ ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `Available Commands:
  • email      - Display & copy primary contact address
  • resume     - Open hosted PDF resume
  • github     - Open GitHub profile (@SHREYASHSINGHAI)
  • linkedin   - Open LinkedIn profile
  • studio     - Launch GitHub Project Studio (Ctrl+G)
  • systems    - Scroll to Curated Systems Observatory
  • benchmarks - Jump to Quantitative Evaluation Matrix
  • whoami     - Display engineering biography & credentials
  • clear      - Clear terminal output`,
        });
        break;

      case 'email':
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        newHistory.push({
          type: 'success',
          text: `Contact Address: ${email} [COPIED TO CLIPBOARD]`,
        });
        sound.playChirp(true);
        break;

      case 'resume':
        window.open('/Shreyash_Singhai_Resume.pdf', '_blank');
        newHistory.push({
          type: 'success',
          text: 'Opening hosted resume: /Shreyash_Singhai_Resume.pdf',
        });
        sound.playChirp(true);
        break;

      case 'github':
        window.open('https://github.com/SHREYASHSINGHAI', '_blank');
        newHistory.push({
          type: 'success',
          text: 'Redirecting to GitHub: https://github.com/SHREYASHSINGHAI',
        });
        break;

      case 'linkedin':
        window.open('https://www.linkedin.com/in/shreyash-singhai', '_blank');
        newHistory.push({
          type: 'success',
          text: 'Redirecting to LinkedIn: https://www.linkedin.com/in/shreyash-singhai',
        });
        break;

      case 'studio':
        onOpenStudio();
        newHistory.push({
          type: 'success',
          text: 'Launching GitHub Project Studio Drawer (Ctrl+G)...',
        });
        sound.playChirp(true);
        break;

      case 'systems':
        window.location.hash = '#systems';
        newHistory.push({
          type: 'response',
          text: 'Navigating to [01 : SYSTEMS]...',
        });
        break;

      case 'benchmarks':
        window.location.hash = '#benchmarks';
        newHistory.push({
          type: 'response',
          text: 'Navigating to [02 : BENCHMARKS]...',
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'response',
          text: `Shreyash Singhai // AI & ML Systems Engineer
Education: B.Tech CSE (AI & ML) @ VIT Bhopal University ('27)
Specialization: Token Economics, AST Pre-Filtering, Offline SLM Retrieval (Qwen 2.5), Multi-Agent Loops
Certifications: Oracle Certified Professional: Agentic AI 2026 & Generative AI 2025
Location: Bhopal, India (23°14'N 77°02'E) · Available for global remote / on-site roles.`,
        });
        break;

      case 'clear':
        setTerminalHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`,
        });
        sound.playChirp(false);
        break;
    }

    setTerminalHistory(newHistory);
    setInputVal('');
  };

  return (
    <section id="contact" className="py-24 bg-[#080C14] border-t border-white/10 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#0F172A] border border-white/10">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em]">
              05 // COMMAND-LINE INBOUND TERMINAL
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            Initiate <span className="text-slate-500">Telemetry Connection.</span>
          </h2>
          <p className="text-slate-400 font-sans text-sm sm:text-base mt-3 leading-relaxed">
            Interested in production AI infrastructure, low-latency pre-commit filters, or autonomous agent loops? Let's build together.
          </p>
        </div>

        {/* Direct Quick-Copy Box */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs">
          <button
            onClick={copyEmail}
            className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#0F172A] border border-white/15 hover:border-cyan-500/50 hover:bg-[#1E293B] text-slate-200 transition-all shadow-lg group"
          >
            <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm tracking-wide">{email}</span>
            <span className="p-1.5 rounded bg-black/50 border border-white/10 text-slate-400 group-hover:text-white transition-colors">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </span>
          </button>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/SHREYASHSINGHAI"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-3 rounded-xl bg-[#0F172A] border border-white/15 hover:border-white/30 text-slate-400 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/shreyash-singhai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-3 rounded-xl bg-[#0F172A] border border-white/15 hover:border-white/30 text-slate-400 hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <div className="flex items-center gap-1.5 px-3 py-3 rounded-xl bg-black/40 border border-white/10 text-gray-500 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>India // Open to Remote & Relocation</span>
            </div>
          </div>
        </div>

        {/* Interactive CLI Terminal Window */}
        <div className="rounded-2xl bg-[#05080E] border border-white/10 overflow-hidden shadow-2xl font-mono text-xs flex flex-col h-80 sm:h-96">
          {/* Terminal Window Header */}
          <div className="px-4 py-3 bg-[#0F172A] border-b border-white/10 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="text-gray-400 font-bold ml-2">shreyash@observatory: ~</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-[10px]">
              <span>Type "help"</span>
              <span>•</span>
              <span className="text-cyan-400">bash 5.2</span>
            </div>
          </div>

          {/* Terminal Output Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 select-text leading-relaxed">
            {terminalHistory.map((item, idx) => {
              if (item.type === 'user') {
                return (
                  <div key={idx} className="text-cyan-300 font-bold">
                    {item.text}
                  </div>
                );
              }
              if (item.type === 'success') {
                return (
                  <div key={idx} className="text-emerald-400">
                    {item.text}
                  </div>
                );
              }
              if (item.type === 'error') {
                return (
                  <div key={idx} className="text-amber-400">
                    {item.text}
                  </div>
                );
              }
              return (
                <div key={idx} className="text-slate-300 whitespace-pre-wrap">
                  {item.text}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input Prompt */}
          <form
            onSubmit={handleCommandSubmit}
            className="p-3 bg-[#0A0E17] border-t border-white/10 flex items-center gap-2"
          >
            <span className="text-cyan-400 font-bold">❯</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder='Type a command (e.g. "email", "resume", "benchmarks", "whoami")...'
              className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-gray-600 font-mono text-xs"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-[10px] font-bold"
            >
              RUN
            </button>
          </form>
        </div>

        {/* Telemetry Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            <span>© 2026 Shreyash Singhai. </span>
            <span className="text-slate-400">Engineered with Next.js & Tailwind · Static Site Generated</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>All Systems Nominal</span>
            </span>
            <span>•</span>
            <span className="text-gray-400">Build: obs-rev-2026.10</span>
          </div>
        </div>

      </div>
    </section>
  );
}
