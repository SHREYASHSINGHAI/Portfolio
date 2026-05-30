import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Rocket } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.1 },
  }),
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState('prototype'); // 'prototype' or 'engineered'

  const filteredProjects = projects.filter(p => p.type === activeTab);

  return (
    <section id="projects" className="py-32 bg-[#000000] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-white/20 w-12"></div>
            <p className="text-gray-400 font-mono text-xs uppercase tracking-[0.2em]">Featured Systems</p>
          </div>
          <h2 className="text-4xl sm:text-5xl font-sans font-bold text-white mb-6 tracking-tight">
            Engineering <span className="text-gray-500">Portfolio.</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl text-base font-light">
            My work is divided into two distinct philosophies. Select a category below to explore the architecture, source code, and live demos.
          </p>
        </motion.div>

        {/* Vercel-style Segmented Control */}
        <motion.div 
            className="flex p-1 bg-white/[0.02] border border-white/10 rounded-xl mb-12 w-fit mx-auto sm:mx-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
        >
            <button 
                onClick={() => setActiveTab('prototype')}
                className={`relative px-6 py-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${activeTab === 'prototype' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
                {activeTab === 'prototype' && (
                    <motion.div layoutId="activeTab" className="absolute inset-0 bg-white/10 rounded-lg shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                )}
                <Rocket className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Rapid Prototypes</span>
            </button>
            <button 
                onClick={() => setActiveTab('engineered')}
                className={`relative px-6 py-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${activeTab === 'engineered' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
                {activeTab === 'engineered' && (
                    <motion.div layoutId="activeTab" className="absolute inset-0 bg-white/10 rounded-lg shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                )}
                <Layers className="w-4 h-4 relative z-10" />
                <span className="relative z-10">End-to-End Engineered Builds</span>
            </button>
        </motion.div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {filteredProjects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Projects;
