import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { ArrowLeft, Layers, Rocket } from 'lucide-react';
import FlowingBackground from '../components/FlowingBackground';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const ProjectCategory = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    
    const categoryProjects = projects.filter(p => p.type === type);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    if (type !== 'engineered' && type !== 'prototype') {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-charcoal">
                <div className="text-center">
                    <h1 className="text-4xl font-mono mb-4">Category Not Found</h1>
                    <button onClick={() => navigate('/')} className="text-electric hover:underline">
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    const isEngineered = type === 'engineered';
    const title = isEngineered ? "End-to-End Engineered Builds" : "Rapid Prototypes";
    const Icon = isEngineered ? Layers : Rocket;
    const accentColor = isEngineered ? "text-sky-400" : "text-fuchsia-400";
    const gradient = isEngineered ? "from-sky-500 to-blue-400" : "from-fuchsia-500 to-pink-400";

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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-32">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => navigate('/#projects')}
                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 font-mono text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Categories
                    </motion.button>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${accentColor}`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <h1 className="text-3xl sm:text-5xl font-mono font-bold text-white">
                                {title}
                            </h1>
                        </div>
                        <div className={`h-1 w-24 rounded-full bg-gradient-to-r ${gradient}`}></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {categoryProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </motion.div>

                    {categoryProjects.length === 0 && (
                        <div className="text-center py-20 text-gray-500 font-mono">
                            No projects found in this category.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProjectCategory;
