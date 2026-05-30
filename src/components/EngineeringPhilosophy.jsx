import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Lock, Zap } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.1 },
  }),
};

const pillars = [
  {
    icon: <Cpu className="w-5 h-5 text-sky-400" />,
    title: "Systems Thinking",
    desc: "I approach every problem not just as code, but as an interconnected ecosystem. Robust architecture determines long-term viability."
  },
  {
    icon: <Zap className="w-5 h-5 text-fuchsia-400" />,
    title: "Rapid Iteration",
    desc: "Speed is a feature. I leverage AI tooling and modern prototyping frameworks to validate core hypotheses in days, not months."
  },
  {
    icon: <Database className="w-5 h-5 text-emerald-400" />,
    title: "Data-Driven Logic",
    desc: "From building predictive models to configuring vector databases, data structures are the ultimate source of truth."
  },
  {
    icon: <Lock className="w-5 h-5 text-orange-400" />,
    title: "Production Ready",
    desc: "Clean code is secure code. I enforce strict typing, modular architectures, and containerized deployments by default."
  }
];

const EngineeringPhilosophy = () => {
  return (
    <section id="philosophy" className="py-32 bg-[#000000] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-white/20 w-12"></div>
            <p className="text-gray-400 font-mono text-xs uppercase tracking-[0.2em]">Engineering Philosophy</p>
          </div>
          <h2 className="text-4xl sm:text-5xl font-sans font-bold text-white mb-6 tracking-tight">
            How I <span className="text-gray-500">Build.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="group p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-white/20 transition-colors flex flex-col relative overflow-hidden"
            >
              {/* Subtle spotlight effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-white/[0.04] transition-colors"></div>
              
              <div className="bg-white/5 p-3 rounded-xl w-fit mb-6 border border-white/10">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-sans font-semibold text-white mb-3 tracking-wide">{pillar.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EngineeringPhilosophy;
