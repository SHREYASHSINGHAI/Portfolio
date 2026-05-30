import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Activity, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
    }),
};

const Deployments = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Filter projects that are deployed/live
    const deployedProjects = projects.filter(p => p.demo || p.status === 'Live');

    return (
        <div className="min-h-screen bg-[#000000] text-white selection:bg-gray-500/30">
            {/* Background Grid */}
            <div className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at top, black 40%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at top, black 40%, transparent 100%)'
                }}
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
                {/* Back Button */}
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-16 group font-mono">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </Link>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <Activity className="w-5 h-5 text-emerald-400" />
                        <p className="text-gray-400 font-mono text-xs uppercase tracking-[0.2em]">Live Environments</p>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-sans font-bold text-white tracking-tight mb-6">
                        Active <span className="text-gray-500">Deployments.</span>
                    </h1>
                    <p className="text-gray-400 font-light text-lg max-w-2xl leading-relaxed">
                        A centralized directory of all currently active web applications, AI models, and backend systems deployed to production environments.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-4">
                    {deployedProjects.map((project, i) => (
                        <motion.a
                            key={project.id}
                            href={project.demo || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="group flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-xl bg-[#0A0A0A] border border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-all duration-300"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-mono font-bold text-white">{project.title}</h3>
                                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-400 uppercase tracking-wider flex items-center gap-1 border border-emerald-500/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                        Live
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400 font-sans line-clamp-2 max-w-2xl">{project.description}</p>
                            </div>

                            <div className="flex items-center gap-6">
                                {/* Tech Stack Preview */}
                                <div className="hidden md:flex flex-wrap gap-2 justify-end max-w-[200px]">
                                    {project.techStack.slice(0, 3).map((tech, tIdx) => (
                                        <span key={tIdx} className="text-[10px] font-mono text-gray-500 bg-[#121212] px-2 py-1 rounded border border-white/5">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.length > 3 && (
                                        <span className="text-[10px] font-mono text-gray-600 px-1 py-1">+{project.techStack.length - 3}</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    {project.github && (
                                        <div 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.open(project.github, '_blank');
                                            }}
                                            className="p-2.5 rounded-lg border border-white/10 text-gray-500 hover:text-white hover:bg-white/5 transition-all"
                                        >
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="p-2.5 rounded-lg border border-white/10 text-white bg-white/5 group-hover:bg-white/10 transition-all">
                                        <ExternalLink className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}

                    {deployedProjects.length === 0 && (
                        <div className="p-8 border border-white/10 rounded-xl bg-[#0A0A0A] text-center">
                            <Server className="w-8 h-8 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 font-mono text-sm">No active deployments found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Deployments;
