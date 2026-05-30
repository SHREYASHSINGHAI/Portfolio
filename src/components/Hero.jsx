import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, FileText, ArrowRight, ChevronRight, Command } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-32 overflow-hidden bg-[#000000]">
            
            {/* Vercel/Linear Style Grid Background */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}
            />

            {/* Subtle Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center">
                
                {/* Status Pill */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-12 shadow-[0_0_15px_rgba(255,255,255,0.02)]"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest font-medium">Available for Engineering Roles</span>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                    className="text-center max-w-4xl mx-auto mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                    <h1 className="text-5xl sm:text-7xl font-sans font-bold text-white tracking-tight leading-[1.1] mb-6">
                        Architecting <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                            Production AI Systems.
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                        Software Engineer specializing in Machine Learning infrastructure, rapid prototyping, and scalable full-stack architectures.
                    </p>
                </motion.div>

                {/* Command Palette / Terminal Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="w-full max-w-2xl mx-auto mb-16 relative group"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500/20 to-fuchsia-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative bg-[#0A0A0A]/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                            <Command className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-xs font-mono text-gray-500">shreyash@system ~ ./capabilities</span>
                        </div>
                        {/* Body */}
                        <div className="p-6 font-mono text-sm sm:text-base h-32 flex items-center">
                            <span className="text-sky-400 mr-2">❯</span>
                            <TypeAnimation
                                sequence={[
                                    'Executing end-to-end ML pipelines...', 2000,
                                    'Building containerized deployment architectures...', 2000,
                                    'Developing interactive AI agent systems...', 2000,
                                    'Designing scalable vector database integrations...', 2000,
                                ]}
                                wrapper="span"
                                speed={60}
                                deletionSpeed={80}
                                repeat={Infinity}
                                className="text-gray-300"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* CTA Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <a
                        href="#projects"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Explore Systems <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                        href="/SHREYASHSINGHAI_RESUME.docx"
                        download
                        className="flex items-center gap-2 px-6 py-3 bg-white/[0.05] border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <FileText className="w-4 h-4" /> View Resume
                    </a>
                    
                    <div className="hidden sm:block w-px h-8 bg-white/10 mx-2"></div>
                    
                    <div className="flex items-center gap-3">
                        <a href="https://github.com/SHREYASHSINGHAI" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/[0.03] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/shreyash-singhai" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/[0.03] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;