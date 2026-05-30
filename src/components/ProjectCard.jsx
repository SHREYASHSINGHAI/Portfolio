import React from 'react';
import { Code, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1], delay: i * 0.1 },
  }),
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative rounded-xl bg-[#121212]/50 border border-white/10 ${project.border} hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-400 flex flex-col justify-start backdrop-blur-md overflow-hidden min-h-[380px]`}
    >
      {/* Hover Fade-in Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      {/* Domain Image Header */}
      {project.images && project.images.length > 0 && (
        <div className="w-full h-40 relative overflow-hidden border-b border-white/5">
          <img 
            src={project.images[0]} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
        </div>
      )}

      <div className="relative z-10 flex flex-col flex-1 p-6">
        {/* Header (Tags) */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="px-2.5 py-1 text-[10px] font-mono rounded-full border border-white/20 bg-white/5 text-gray-300 uppercase tracking-wider group-hover:border-white/40 transition-colors"
            >
              {tag}
            </span>
          ))}
          {project.status === "Live" && (
            <span className="px-2.5 py-1 text-[10px] font-mono rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live
            </span>
          )}
        </div>

        {/* Content */}
        <h3 className="text-xl font-mono font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 font-sans text-sm leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {/* Footer (Tech Stack & Actions) */}
        <div className="mt-auto flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <span key={i} className="text-xs font-sans text-gray-500 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-lg text-white text-xs font-medium transition-all duration-300"
              >
                <Code className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-electric/10 hover:bg-electric/20 border border-electric/30 hover:border-electric/50 rounded-lg text-electric text-xs font-medium transition-all duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
            <Link
              to={`/project/${project.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 ml-auto text-gray-400 hover:text-white transition-colors text-xs font-mono group/link"
            >
              Details
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
