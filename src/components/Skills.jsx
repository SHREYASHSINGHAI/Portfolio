import React from 'react';
import { motion } from 'framer-motion';
import { Code2, BrainCircuit, CloudCog, LineChart } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.1 },
    }),
};

const Skills = () => {
    const toolkits = [
        {
            title: 'Languages',
            icon: <Code2 className="w-5 h-5 text-gray-300" />,
            skills: ['Python', 'C++', 'Java', 'MySQL']
        },
        {
            title: 'AI/ML',
            icon: <BrainCircuit className="w-5 h-5 text-gray-300" />,
            skills: ['Scikit-Learn', 'Pandas', 'NumPy', 'MLflow']
        },
        {
            title: 'Infrastructure',
            icon: <CloudCog className="w-5 h-5 text-gray-300" />,
            skills: ['Docker', 'Git/GitHub', 'AWS', 'n8n', 'Oracle Cloud']
        },
        {
            title: 'Visualization',
            icon: <LineChart className="w-5 h-5 text-gray-300" />,
            skills: ['Seaborn', 'Matplotlib']
        }
    ];

    return (
        <section id="skills" className="py-32 bg-[#000000] border-t border-white/5 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                
                <motion.div
                    className="mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeUp}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px bg-white/20 w-12"></div>
                        <p className="text-gray-400 font-mono text-xs uppercase tracking-[0.2em]">Technical Stack</p>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-sans font-bold text-white mb-6 tracking-tight">
                        Core <span className="text-gray-500">Toolkit.</span>
                    </h2>
                    <p className="text-gray-400 font-sans max-w-2xl text-base font-light">
                        A highly focused technology stack utilized for building intelligent, scalable, and production-grade applications.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {toolkits.map((category, idx) => (
                        <motion.div
                            key={idx}
                            custom={idx}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={fadeUp}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="group bg-[#0A0A0A] rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-3xl group-hover:bg-white/[0.04] transition-colors pointer-events-none"></div>

                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className="p-3 bg-white/5 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors duration-300">
                                    {category.icon}
                                </div>
                                <h3 className="text-lg font-sans font-semibold text-white tracking-wide">{category.title}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                                {category.skills.map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className="px-3 py-1.5 bg-[#121212] border border-white/10 rounded-md text-xs font-mono font-medium text-gray-400 group-hover:border-white/20 group-hover:text-gray-200 transition-colors duration-300"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;