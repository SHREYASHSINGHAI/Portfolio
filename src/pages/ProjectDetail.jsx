import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ArrowLeft, Code, ExternalLink, Calendar, Tag } from 'lucide-react';
import FlowingBackground from '../components/FlowingBackground';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const project = projects.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-charcoal">
                <div className="text-center">
                    <h1 className="text-4xl font-mono mb-4">Project Not Found</h1>
                    <button onClick={() => navigate('/')} className="text-electric hover:underline">
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen text-white relative bg-charcoal overflow-hidden">
                <FlowingBackground />
                {/* Noise overlay */}
                <div
                    className="fixed inset-0 pointer-events-none z-[1]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
                        opacity: 0.25,
                    }}
                />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-32">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 font-mono text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Portfolio
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {/* Tags & Status */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300 uppercase tracking-widest">
                                {project.type === 'engineered' ? 'Engineered Build' : 'Rapid Prototype'}
                            </span>
                            {project.status === "Live" && (
                                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Live
                                </span>
                            )}
                            <span className="flex items-center gap-1.5 text-gray-500 text-xs font-mono ml-auto">
                                <Calendar className="w-3.5 h-3.5" />
                                {project.date}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-6xl font-mono font-bold text-white mb-8 leading-tight">
                            {project.title}
                        </h1>

                        {/* Description */}
                        <div className="prose prose-invert prose-lg max-w-none mb-12">
                            <p className="text-gray-300 font-sans leading-relaxed text-xl font-light">
                                {project.description}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-4 py-8 border-y border-white/5 mb-12">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl text-white text-sm font-medium transition-all duration-300"
                                >
                                    <Code className="w-4 h-4" />
                                    View Source Code
                                </a>
                            )}
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-electric/10 hover:bg-electric/20 border border-electric/30 hover:border-electric/50 rounded-xl text-electric text-sm font-medium transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.15)]"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Launch Live Demo
                                </a>
                            )}
                        </div>

                        {/* Tech Stack & Tags Detail */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-lg font-mono font-bold text-white mb-6 flex items-center gap-2">
                                    <Code className="w-5 h-5 text-electric" />
                                    Technology Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="px-4 py-2 bg-[#121212]/80 border border-white/5 rounded-lg text-sm font-sans text-gray-300 shadow-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-mono font-bold text-white mb-6 flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-electric" />
                                    Capabilities
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="px-4 py-2 bg-white/5 border border-white/5 rounded-lg text-sm font-sans text-gray-400">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetail;
