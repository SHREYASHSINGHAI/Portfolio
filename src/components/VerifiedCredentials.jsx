import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Award,
  TrendingUp,
  Users,
  ExternalLink,
  CheckCircle2,
  FileCheck,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function VerifiedCredentials() {
  const credentials = [
    {
      id: 'oracle_agentic',
      type: 'certification',
      title: 'Oracle Certified Professional: Agentic AI (2026)',
      issuer: 'Oracle University & OCI',
      date: 'Valid 2026',
      badge: 'ORACLE VERIFIED',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      link: '/badge.jpg',
      verificationText: 'Verify via Oracle CertView / Badge',
      metrics: 'Multi-Agent Orchestration · OCI AI Governance · Tool Calling Determinism',
      description:
        'Certified expertise in designing autonomous multi-agent pipelines, deterministic tool execution loops, and OCI Generative AI Agent governance frameworks.',
      highlights: [
        'Multi-agent state machines and supervisory orchestration',
        'Enterprise RAG integration with OCI Vector Search',
        'Guardrails for tool-calling determinism and token bounding',
      ],
    },
    {
      id: 'oracle_genai',
      type: 'certification',
      title: 'Oracle Certified Professional: Generative AI (2025)',
      issuer: 'Oracle Cloud Infrastructure',
      date: 'Certified 2025',
      badge: 'ORACLE VERIFIED',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      link: '/certificate.pdf',
      verificationText: 'Verify via CertView / PDF Document',
      metrics: 'Enterprise RAG · LLM Fine-Tuning · Vector Search Pipelines',
      description:
        'Rigorous technical validation of large language model architectures, embeddings generation, vector indexing, and parameter-efficient fine-tuning on enterprise infrastructure.',
      highlights: [
        'Llama & Cohere foundational model deployment on OCI',
        'Hybrid lexical & semantic search retrieval pipelines',
        'Prompt engineering and structured output serialization',
      ],
    },
    {
      id: 'bain_case',
      type: 'leadership',
      title: 'Bain & Company Case Competition Pre-Finalist',
      issuer: 'Bain Case League',
      date: 'Pre-Finalist',
      badge: 'TOP 5% PLACEMENT',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      link: null,
      verificationText: 'Structured Business Decomposition',
      metrics: 'Unit Economics · Latency vs ROI · Business Unit Decomposition',
      description:
        'Decomposed complex B2B market entry problems through unit economics, break-even sensitivity matrices, and calculating ROI on software infrastructure investments.',
      highlights: [
        'Structured MECE problem decomposition & economic modeling',
        'Token cost vs manual operational overhead ROI analysis',
        'Defended quantitative growth models before executive panels',
      ],
    },
  ];

  return (
    <section id="credentials" className="py-24 bg-[#080C14] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-amber-400"></span>
            <span className="text-amber-400 font-mono text-xs uppercase tracking-[0.25em]">
              03 // VERIFIED CREDENTIALS & ROI LEADERSHIP
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            Proven Engineering <span className="text-slate-500">& Business Acumen.</span>
          </h2>
          <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
            Directly verifiable certifications in agentic and generative AI systems, paired with competitive business case modeling and quantitative analysis.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {credentials.map((cred, idx) => (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#0F172A]/70 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between font-mono text-xs group shadow-lg"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${cred.badgeColor}`}>
                    {cred.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{cred.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-sans font-bold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                  {cred.title}
                </h3>
                <div className="text-slate-400 text-xs mb-4 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{cred.issuer}</span>
                </div>

                {/* Metrics Highlight Pill */}
                <div className="p-2.5 rounded-lg bg-black/50 border border-white/5 mb-5 text-[11px] text-cyan-300 font-semibold">
                  {cred.metrics}
                </div>

                {/* Description */}
                <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed mb-5">
                  {cred.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 mb-6">
                  {cred.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-slate-400 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Verification Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                {cred.link ? (
                  <a
                    href={cred.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold transition-colors text-[11px]"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>{cred.verificationText} ↗</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>{cred.verificationText}</span>
                  </div>
                )}
                <span className="text-[10px] text-slate-500 font-mono">STATUS: VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
