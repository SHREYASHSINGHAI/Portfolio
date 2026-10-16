import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ear, Brain, HandMetal, Play, CheckCircle2, Send, Database, Clock, Sparkles } from 'lucide-react';
import { sound } from '../../utils/sound';

const SCENARIOS = [
  {
    id: 'sprint_blocker',
    title: 'Sprint Retro: Schema Migration Blocker',
    audioName: 'sprint_sync_20251016_chunk3.wav',
    duration: '00:42',
    transcript: 'Team, we need to ship the vector index migration by Thursday; Alex is currently blocked on the postgres schema migration review from the platform team.',
    json: {
      action_item: "Ship vector index migration",
      owner: "Alex Rivera",
      due_date: "2026-10-22",
      critical_blocker: "PostgreSQL schema migration review pending",
      priority: "P0_URGENT"
    },
    slackChannel: "#eng-platform-alerts",
    notionRow: {
      task: "Ship vector index migration",
      assignee: "Alex Rivera",
      status: "In Progress",
      due: "Oct 22, 2026"
    }
  },
  {
    id: 'security_audit',
    title: 'Security Sync: Secret Key Rotation',
    audioName: 'secops_daily_20251016_chunk1.wav',
    duration: '00:28',
    transcript: 'Marcus needs to verify all production Stripe webhook secrets and rotate the staging API tokens before Friday at 5 PM UTC.',
    json: {
      action_item: "Rotate staging API tokens and verify Stripe webhooks",
      owner: "Marcus Vance",
      due_date: "2026-10-24",
      critical_blocker: "None (Awaiting maintenance window)",
      priority: "P1_HIGH"
    },
    slackChannel: "#secops-monitoring",
    notionRow: {
      task: "Rotate staging API tokens",
      assignee: "Marcus Vance",
      status: "Scheduled",
      due: "Oct 24, 2026"
    }
  }
];

export default function MeetSummarizerPlayground() {
  const [activeScenarioId, setActiveScenarioId] = useState('sprint_blocker');
  const [currentStep, setCurrentStep] = useState(1); // 1 = Ear, 2 = Brain, 3 = Hands
  const [isRunning, setIsRunning] = useState(false);
  const [typedJson, setTypedJson] = useState('');

  const scenario = SCENARIOS.find(s => s.id === activeScenarioId) || SCENARIOS[0];

  const handleRunPipeline = (targetStep = 1) => {
    sound.playClick();
    setIsRunning(true);
    setCurrentStep(1);

    // Step 1: Ear (Audio Waveform)
    setTimeout(() => {
      sound.playChirp(true);
      setCurrentStep(2);
      // Step 2: Brain (JSON Stream)
      setTimeout(() => {
        sound.playChirp(true);
        setCurrentStep(3);
        // Step 3: Hands (Notion & Slack Dispatch)
        setTimeout(() => {
          sound.playChirp(true);
          setIsRunning(false);
        }, 1200);
      }, 1400);
    }, 1200);
  };

  const handleSelectScenario = (id) => {
    sound.playClick();
    setActiveScenarioId(id);
    setCurrentStep(1);
    setIsRunning(false);
  };

  return (
    <div className="w-full bg-[#080C14] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs">
      {/* Top Telemetry Header */}
      <div className="px-4 py-3 bg-[#0F172A]/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-white font-bold tracking-wider uppercase">Meet-Summarizer // Event Loop Orchestrator</span>
          <span className="text-gray-500 hidden sm:inline">| Ear-Brain-Hands Architecture</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleRunPipeline()}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.15)]"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Processing Event Loop...' : 'Trigger Pipeline Run'}</span>
          </button>
        </div>
      </div>

      {/* Scenario Selector & Progress Strip */}
      <div className="p-3 bg-black/40 border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-sans text-[11px] uppercase tracking-wider">Audio Scenario:</span>
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc.id)}
              className={`px-2.5 py-1 rounded text-[11px] border transition-colors ${
                sc.id === activeScenarioId
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-medium'
                  : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>

        {/* 3 Steps Pipeline Tracker */}
        <div className="flex items-center gap-2 text-[10px]">
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded ${currentStep >= 1 ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30' : 'text-gray-600'}`}>
            <Ear className="w-3 h-3" />
            <span>1. Ear (ASR)</span>
          </div>
          <span className="text-gray-600">➔</span>
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded ${currentStep >= 2 ? 'text-emerald-300 bg-emerald-950/60 border border-emerald-500/30' : 'text-gray-600'}`}>
            <Brain className="w-3 h-3" />
            <span>2. Brain (LLM)</span>
          </div>
          <span className="text-gray-600">➔</span>
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded ${currentStep >= 3 ? 'text-amber-300 bg-amber-950/60 border border-amber-500/30' : 'text-gray-600'}`}>
            <HandMetal className="w-3 h-3" />
            <span>3. Hands (Dispatched)</span>
          </div>
        </div>
      </div>

      {/* 3 Step Interactive Canvas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5 bg-[#080C14]">
        
        {/* Step 1: EAR (Audio Spectrogram) */}
        <div className={`p-4 flex flex-col gap-3 transition-opacity ${currentStep >= 1 ? 'opacity-100' : 'opacity-40'}`}>
          <div className="flex items-center justify-between">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5 uppercase text-[11px]">
              <Ear className="w-3.5 h-3.5" />
              <span>Step 1: The Ear</span>
            </span>
            <span className="text-[10px] text-gray-500 font-mono">{scenario.duration}</span>
          </div>

          <div className="bg-[#05080E] border border-white/5 rounded-lg p-3 flex flex-col gap-2">
            <div className="text-[10px] text-gray-400 flex items-center justify-between">
              <span>{scenario.audioName}</span>
              <span className="text-cyan-400 font-mono">16kHz Mono</span>
            </div>

            {/* Animated Waveform Visualizer */}
            <div className="h-14 flex items-center justify-between gap-1 px-1 bg-black/60 rounded border border-white/5 overflow-hidden">
              {[40, 65, 85, 45, 95, 30, 70, 80, 50, 90, 60, 75, 85, 35, 60, 90, 45, 70].map((h, i) => (
                <div
                  key={i}
                  style={{ height: isRunning && currentStep === 1 ? `${Math.max(15, (h * Math.random()).toFixed(0))}%` : `${h}%` }}
                  className={`w-1.5 rounded-full transition-all duration-150 ${
                    currentStep >= 1 ? 'bg-cyan-400' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="text-[10px] text-slate-300 font-sans leading-relaxed italic bg-black/30 p-2 rounded border border-white/5">
              "{scenario.transcript}"
            </div>
          </div>
        </div>

        {/* Step 2: BRAIN (Streaming JSON Extraction) */}
        <div className={`p-4 flex flex-col gap-3 transition-opacity ${currentStep >= 2 ? 'opacity-100' : 'opacity-40'}`}>
          <div className="flex items-center justify-between">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5 uppercase text-[11px]">
              <Brain className="w-3.5 h-3.5" />
              <span>Step 2: The Brain</span>
            </span>
            <span className="text-[10px] text-emerald-400/80">LLM Schema Extractor</span>
          </div>

          <div className="bg-[#05080E] border border-white/5 rounded-lg p-3 flex flex-col gap-2 flex-1">
            <div className="text-[10px] text-gray-400 flex items-center justify-between">
              <span>Structured Extraction</span>
              <span className="text-emerald-400 font-mono">Pydantic Schema</span>
            </div>

            <div className="bg-black/60 rounded border border-white/5 p-2 font-mono text-[10px] text-emerald-300 space-y-1 overflow-x-auto leading-relaxed">
              <div>&#123;</div>
              <div className="pl-3 text-slate-300">
                <span className="text-emerald-400">"action"</span>: "{scenario.json.action_item}",
              </div>
              <div className="pl-3 text-slate-300">
                <span className="text-emerald-400">"owner"</span>: <span className="text-cyan-300 font-bold">"{scenario.json.owner}"</span>,
              </div>
              <div className="pl-3 text-slate-300">
                <span className="text-emerald-400">"due_date"</span>: "{scenario.json.due_date}",
              </div>
              <div className="pl-3 text-slate-300">
                <span className="text-amber-400">"blocker"</span>: "{scenario.json.critical_blocker}",
              </div>
              <div className="pl-3 text-slate-300">
                <span className="text-rose-400">"priority"</span>: "{scenario.json.priority}"
              </div>
              <div>&#125;</div>
            </div>
          </div>
        </div>

        {/* Step 3: HANDS (Live Notion & Slack Webhook Dispatch) */}
        <div className={`p-4 flex flex-col gap-3 transition-opacity ${currentStep >= 3 ? 'opacity-100' : 'opacity-40'}`}>
          <div className="flex items-center justify-between">
            <span className="text-amber-400 font-bold flex items-center gap-1.5 uppercase text-[11px]">
              <HandMetal className="w-3.5 h-3.5" />
              <span>Step 3: The Hands</span>
            </span>
            <span className="text-[10px] text-amber-400/80">Dual Webhook API</span>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            {/* Simulated Notion Row */}
            <div className="bg-[#05080E] border border-white/5 rounded-lg p-2.5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-gray-400 flex items-center gap-1 font-sans">
                  <Database className="w-3 h-3 text-gray-300" /> Notion Database
                </span>
                <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  HTTP 200 Created
                </span>
              </div>
              <div className="bg-black/60 rounded p-1.5 border border-white/5 flex items-center justify-between text-[10px]">
                <span className="text-white truncate max-w-[140px]">{scenario.notionRow.task}</span>
                <span className="text-cyan-400 text-[9px]">{scenario.notionRow.assignee}</span>
              </div>
            </div>

            {/* Simulated Slack Message Card */}
            <div className="bg-[#05080E] border border-white/5 rounded-lg p-2.5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-gray-400 flex items-center gap-1 font-sans">
                  <Send className="w-3 h-3 text-amber-400" /> {scenario.slackChannel}
                </span>
                <span className="text-[9px] text-amber-400">Webhook OK</span>
              </div>
              <div className="bg-black/60 rounded p-1.5 border border-white/5 text-[9px] text-slate-300">
                <span className="font-bold text-amber-300">🚨 P0 Action Required:</span> {scenario.json.action_item} assigned to <span className="text-cyan-300">@{scenario.json.owner}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 bg-[#0A0E17] border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[10px] text-gray-500">
        <span>Event Loop: Ear (Whisper ASR) ➔ Brain (Gemini Flash Extraction) ➔ Hands (Notion API & Slack Webhook)</span>
        <span className="text-emerald-400 font-mono">Autonomous Execution: ~4.1s End-to-End</span>
      </div>
    </div>
  );
}
