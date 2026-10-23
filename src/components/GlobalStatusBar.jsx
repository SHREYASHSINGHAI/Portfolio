import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Terminal, FileText, ExternalLink, Menu, X, Clock } from 'lucide-react';
import { sound } from '../utils/sound';

export default function GlobalStatusBar({ onOpenStudio }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMuted, setIsMuted] = useState(() => sound.isMuted());
  const [timeUtc, setTimeUtc] = useState('');
  const [timeIst, setTimeIst] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live dual clock (UTC and IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUtc(
        now.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setTimeIst(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Global hotkey Ctrl+G / ~ for opening studio
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'g') || e.key === '`' || e.key === '~') {
        e.preventDefault();
        onOpenStudio();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenStudio]);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playClick();
    }
  };

  const navAnchors = [
    { label: '[01 : SYSTEMS]', href: '/projects' },
    { label: '[02 : BENCHMARKS]', href: '/#benchmarks' },
    { label: '[03 : CREDENTIALS]', href: '/#credentials' },
    { label: '[04 : CONTACT]', href: '/#contact' },
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    sound.playClick();
    if (item.href.startsWith('/#')) {
      const hash = item.href.replace('/#', '');
      if (location.pathname === '/') {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/#${hash}`);
      }
    } else {
      navigate(item.href);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    sound.playClick();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#080C14]/90 backdrop-blur-xl border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs font-mono">
        
        {/* Left: Monospaced developer tag */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 group hover:text-white transition-colors whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-sm bg-cyan-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_#06b6d4]"></span>
            <span className="font-bold text-slate-100 tracking-wider whitespace-nowrap">SHREYASH SINGHAI</span>
          </a>
        </div>

        {/* Center: Discrete navigation anchors */}
        <nav className="hidden lg:flex items-center gap-1">
          {navAnchors.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="px-2.5 py-1 text-slate-400 hover:text-cyan-300 hover:bg-white/[0.03] rounded transition-colors text-[11px] tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Operational Status, Dual Clock, Sound, Resume & Studio */}
        <div className="flex items-center gap-3">
          {/* Status Dot */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-[#0F172A] border border-white/5 text-[10.5px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-400 font-medium tracking-tight">OPERATIONAL / OPEN TO ROLES</span>
          </div>

          {/* Dual Clock */}
          <div className="hidden md:flex items-center gap-2 text-[10.5px] text-gray-400 font-mono px-2 py-1 bg-black/40 rounded border border-white/5">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>IST: {timeIst || '--:--:--'}</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-500">UTC: {timeUtc || '--:--:--'}</span>
          </div>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Tactile Sound FX' : 'Mute Tactile Sound FX'}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-gray-500" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
          </button>

          {/* View Resume Button */}
          <a
            href="/Shreyash_Singhai_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black font-sans font-bold hover:bg-slate-200 transition-colors shadow-sm text-[11px]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME</span>
          </a>

          {/* Project Studio (Ctrl+G) */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenStudio();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.15)] text-[11px]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">STUDIO</span>
            <kbd className="hidden sm:inline px-1 py-0.2 rounded bg-black/60 border border-cyan-500/30 text-[9px] text-cyan-400 font-mono">
              Ctrl+G
            </kbd>
          </button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#080C14] border-b border-white/10 px-4 py-4 flex flex-col gap-2 font-mono text-xs"
          >
            {navAnchors.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, item);
                }}
                className="py-2 px-3 rounded hover:bg-white/5 text-slate-300 hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
              <span>IST: {timeIst}</span>
              <span className="text-emerald-400">● OPEN TO ROLES</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
