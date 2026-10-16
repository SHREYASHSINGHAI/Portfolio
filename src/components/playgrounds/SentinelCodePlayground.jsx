import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, Play, RefreshCw, Zap, Cpu, FileCode2 } from 'lucide-react';
import { sound } from '../../utils/sound';

const SAMPLE_DIFFS = [
  {
    id: 'clean',
    title: 'Clean Formatting & Comments',
    badge: '97.8% Pruned',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    description: '80 lines of auto-formatter indentation, whitespace re-alignment, and updated docstrings.',
    inputTokens: 1420,
    prunedTokens: 32,
    latency: '0.68 ms',
    reductionPercent: '97.75%',
    status: 'CLEARED_LOCAL',
    statusLabel: 'CLEARED (Bypassed LLM API - $0.00 spent)',
    riskLevel: 'LOW',
    lines: [
      { num: 1, type: 'neutral', text: ' def calculate_billing_cycle(user_id: str, plan_tier: str):' },
      { num: 2, type: 'del-trivial', text: '-    """Calculate expiration date based on monthly plan."""', stripped: true },
      { num: 3, type: 'add-trivial', text: '+    """Compute next billing anchor date with timezone normalization."""', stripped: true },
      { num: 4, type: 'neutral', text: '     base_date = datetime.now(timezone.utc)' },
      { num: 5, type: 'del-trivial', text: '-    cycle_days = 30', stripped: true },
      { num: 6, type: 'add-trivial', text: '+    cycle_days = 30  # Standard 30-day billing anchor', stripped: true },
      { num: 7, type: 'del-trivial', text: '-    return base_date + timedelta(days=cycle_days)', stripped: true },
      { num: 8, type: 'add-trivial', text: '+    return base_date + timedelta(days=cycle_days)      ', stripped: true },
      { num: 9, type: 'del-trivial', text: '-    ', stripped: true },
      { num: 10, type: 'add-trivial', text: '+', stripped: true },
      { num: 11, type: 'neutral', text: ' # End of billing module' },
    ]
  },
  {
    id: 'vulnerability',
    title: 'Critical Vulnerability Diff',
    badge: 'P0 Security Alert',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    description: 'Exposed live payment gateway secret key and unescaped raw SQL query concatenation.',
    inputTokens: 890,
    prunedTokens: 215,
    latency: '0.81 ms',
    reductionPercent: '75.84%',
    status: 'BLOCKED_CRITICAL',
    statusLabel: 'BLOCKED BEFORE GIT PUSH (High-Risk Credential & SQL Injection)',
    riskLevel: 'CRITICAL',
    lines: [
      { num: 12, type: 'neutral', text: ' class AccountService:' },
      { num: 13, type: 'del-trivial', text: '-    # Staging credentials placeholder', stripped: true },
      { num: 14, type: 'add-vuln', text: '+    STRIPE_API_KEY = "mock_api_secret_key_example_only"', highRisk: true, reason: 'EXPOSED_API_SECRET' },
      { num: 15, type: 'neutral', text: '     def get_user_records(self, account_id: str):' },
      { num: 16, type: 'del-trivial', text: '-        cursor.execute("SELECT * FROM accounts WHERE id = %s", (account_id,))', stripped: true },
      { num: 17, type: 'add-vuln', text: '+        query = f"SELECT * FROM accounts WHERE id = \'{account_id}\'"', highRisk: true, reason: 'SQL_INJECTION_VECTOR' },
      { num: 18, type: 'add-vuln', text: '+        return cursor.execute(query).fetchall()', highRisk: true, reason: 'RAW_UNSANITIZED_EXECUTION' },
      { num: 19, type: 'neutral', text: '     # Audit trail hook' },
    ]
  },
  {
    id: 'mixed',
    title: 'Mixed Production Diff',
    badge: '48.02% Reduction',
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    description: '50 lines of trailing whitespace and comments + 5 lines of modified JWT refresh rotation.',
    inputTokens: 1420,
    prunedTokens: 738,
    latency: '0.74 ms',
    reductionPercent: '48.02%',
    status: 'BLOCKED_FLASH',
    statusLabel: 'BLOCKED before git push | Routed residual 738 tokens to Gemini 2.5 Flash',
    riskLevel: 'ELEVATED',
    lines: [
      { num: 20, type: 'neutral', text: ' def verify_session_handshake(token: str, secret: str):' },
      { num: 21, type: 'del-trivial', text: '-    # Validate claims and expire in 15 mins', stripped: true },
      { num: 22, type: 'add-trivial', text: '+    # Session handshake verification protocol', stripped: true },
      { num: 23, type: 'del-trivial', text: '-    max_age_seconds = 900', stripped: true },
      { num: 24, type: 'add-vuln', text: '+    max_age_seconds = 86400 * 30  # Extended to 30 days', highRisk: true, reason: 'SESSION_EXPIRATION_VULNERABILITY' },
      { num: 25, type: 'del-trivial', text: '-    verify_signature = True', stripped: true },
      { num: 26, type: 'add-vuln', text: '+    verify_signature = False  # Temporary debug bypass', highRisk: true, reason: 'SIGNATURE_CHECK_DISABLED' },
      { num: 27, type: 'del-trivial', text: '-    return jwt.decode(token, secret, algorithms=["HS256"])', stripped: true },
      { num: 28, type: 'add-neutral', text: '+    return jwt.decode(token, secret, options={"verify_signature": False})' },
      { num: 29, type: 'del-trivial', text: '- ', stripped: true },
      { num: 30, type: 'neutral', text: '     # Refresh token pool dispatch' },
    ]
  }
];

export default function SentinelCodePlayground() {
  const [selectedDiffId, setSelectedDiffId] = useState('mixed');
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterActive, setFilterActive] = useState(true);

  const currentDiff = SAMPLE_DIFFS.find(d => d.id === selectedDiffId) || SAMPLE_DIFFS[0];

  const handleSelectDiff = (id) => {
    sound.playClick();
    setSelectedDiffId(id);
    setIsFiltering(true);
    setTimeout(() => {
      setIsFiltering(false);
      sound.playChirp(true);
    }, 280);
  };

  const handleReRun = () => {
    sound.playClick();
    setIsFiltering(true);
    setTimeout(() => {
      setIsFiltering(false);
      sound.playChirp(true);
    }, 350);
  };

  return (
    <div className="w-full bg-[#080C14] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs">
      {/* Top Telemetry Header */}
      <div className="px-4 py-3 bg-[#0F172A]/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-white font-bold tracking-wider uppercase">Sentinel-Code // Local AST Pre-Filter</span>
          <span className="text-gray-500 hidden sm:inline">| Stage-1 Pre-Commit Gatekeeper</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 border border-white/5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-gray-400">Execution Speed:</span>
            <span className="text-cyan-300 font-bold">{currentDiff.latency}</span>
          </div>
          <button
            onClick={handleReRun}
            disabled={isFiltering}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isFiltering ? 'animate-spin text-cyan-400' : ''}`} />
            <span>Re-Filter</span>
          </button>
        </div>
      </div>

      {/* Diff Selector Bar */}
      <div className="p-3 bg-black/40 border-b border-white/5 flex flex-wrap items-center gap-2">
        <span className="text-gray-500 font-sans text-[11px] uppercase tracking-wider mr-2">Select Diff Sample:</span>
        {SAMPLE_DIFFS.map((diff) => {
          const isActive = diff.id === selectedDiffId;
          return (
            <button
              key={diff.id}
              onClick={() => handleSelectDiff(diff.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-[11px] ${
                isActive
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 font-medium shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>{diff.title}</span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] border ${diff.badgeColor}`}>
                {diff.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Live Token Math Strip */}
      <div className="px-4 py-2.5 bg-[#0A101D] border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-[11px]">
        <div className="flex items-center gap-2 flex-wrap">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-gray-400">Token Math Readout:</span>
          <span className="text-gray-300">Input: <strong className="text-white">{currentDiff.inputTokens}</strong></span>
          <span className="text-cyan-400">➔</span>
          <span className="text-gray-300">Pruned: <strong className="text-emerald-400">{currentDiff.prunedTokens}</strong> tokens</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
            {currentDiff.reductionPercent} reduction
          </span>
        </div>

        <div className="flex items-center gap-2">
          {currentDiff.riskLevel === 'LOW' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3 h-3" /> PRE-COMMIT PASSED
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold">
              <ShieldAlert className="w-3 h-3" /> {currentDiff.riskLevel} ALERT
            </span>
          )}
        </div>
      </div>

      {/* Diff Code Window */}
      <div className="p-4 bg-[#080C14] max-h-72 overflow-y-auto leading-relaxed select-text border-b border-white/5 relative">
        {isFiltering && (
          <div className="absolute inset-0 bg-[#080C14]/80 backdrop-blur-xs flex items-center justify-center z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Parsing Abstract Syntax Tree via Local Regex Engine...</span>
            </div>
          </div>
        )}

        <div className="space-y-1">
          {currentDiff.lines.map((line, idx) => {
            if (line.stripped && filterActive) {
              return (
                <div key={idx} className="flex items-start text-slate-500 line-through opacity-40 hover:opacity-80 transition-opacity">
                  <span className="w-8 select-none text-slate-600 text-right pr-3">{line.num}</span>
                  <span className="flex-1 font-mono">{line.text}</span>
                  <span className="text-[10px] text-slate-500 select-none pl-2">[STRIPPED AST]</span>
                </div>
              );
            }

            if (line.highRisk) {
              return (
                <div key={idx} className="flex items-start bg-amber-500/10 border-l-2 border-amber-400 px-1 py-0.5 text-amber-200">
                  <span className="w-8 select-none text-amber-500/70 text-right pr-3 font-bold">{line.num}</span>
                  <span className="flex-1 font-mono font-medium text-amber-300">{line.text}</span>
                  <span className="text-[10px] text-amber-400 border border-amber-500/40 px-1.5 rounded bg-amber-500/20 select-none ml-2">
                    {line.reason}
                  </span>
                </div>
              );
            }

            if (line.type.startsWith('add')) {
              return (
                <div key={idx} className="flex items-start bg-emerald-500/5 text-emerald-300 px-1">
                  <span className="w-8 select-none text-emerald-600/70 text-right pr-3">{line.num}</span>
                  <span className="flex-1 font-mono">{line.text}</span>
                </div>
              );
            }

            return (
              <div key={idx} className="flex items-start text-slate-400 px-1">
                <span className="w-8 select-none text-slate-600 text-right pr-3">{line.num}</span>
                <span className="flex-1 font-mono">{line.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Footer Status */}
      <div className="px-4 py-3 bg-[#0A0E17] flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-mono">Status:</span>
          <span className="text-slate-200 font-medium">{currentDiff.statusLabel}</span>
        </div>
        <div className="text-gray-500 font-mono text-[10px]">
          Client AST: 0.74 ms · Local Cache: Hit · Cloud API: Gemini 2.5 Flash
        </div>
      </div>
    </div>
  );
}
