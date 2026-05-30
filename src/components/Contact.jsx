import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Mail, TerminalSquare } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Contact = () => {
    const email = 'shreyashsinghai2005@gmail.com';
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-32 bg-[#000000] relative overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={fadeUp}
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <TerminalSquare className="w-5 h-5 text-gray-500" />
                        <p className="text-gray-400 font-mono text-xs uppercase tracking-[0.2em]">System Terminal</p>
                    </div>
                    <h2 className="text-5xl sm:text-7xl font-sans font-bold text-white mb-8 leading-tight tracking-tight">
                        Initiate<br />
                        <span className="text-gray-500">Connection.</span>
                    </h2>
                    <p className="text-lg text-gray-400 font-light font-sans max-w-xl mx-auto mb-16 leading-relaxed">
                        Currently exploring new opportunities in AI infrastructure, ML engineering, and full-stack architecture. My inbox is always open.
                    </p>

                    {/* Email copy button */}
                    <motion.button
                        onClick={copyEmail}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0A0A0A] border border-white/10 hover:border-white/30 rounded-xl text-white font-mono text-sm sm:text-base transition-all duration-300 hover:bg-white/5 mb-8 shadow-2xl"
                    >
                        <Mail className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                        {email}
                        <span className="ml-4 p-1.5 bg-white/5 rounded-md border border-white/10 text-gray-400 group-hover:text-white transition-colors">
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </span>
                    </motion.button>
                    
                    <div className="h-6">
                        {copied && (
                            <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-emerald-400 text-xs font-mono"
                            >
                                Address copied to clipboard
                            </motion.p>
                        )}
                    </div>

                    {/* Social links */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <a
                            href="https://www.linkedin.com/in/shreyash-singhai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 transition-all duration-300 font-sans text-sm font-medium"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.227 24 22.271 24V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/SHREYASHSINGHAI"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 font-sans text-sm font-medium"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                        <a
                            href="https://www.instagram.com/shreyashsinghai?igsh=cGo5eGZieDlid3M4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10 transition-all duration-300 font-sans text-sm font-medium"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.11a1.43 1.43 0 11-2.86 0 1.43 1.43 0 012.86 0z"/>
                            </svg>
                            Instagram
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;