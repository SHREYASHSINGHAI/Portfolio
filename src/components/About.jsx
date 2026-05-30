import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const useCounter = (target, duration = 2000, start = false) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
};

const StatCard = ({ label, value, suffix = '', to = null, href = null }) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    const count = useCounter(value, 1800, inView);

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const content = (
        <>
            <div className="text-4xl font-mono font-bold text-white mb-2">
                {count}{suffix}
            </div>
            <div className="text-sm text-gray-500 font-sans tracking-wide">{label}</div>
        </>
    );

    const baseClass = "text-left p-6 border border-white/10 rounded-2xl bg-white/[0.02]";

    if (to) {
        return (
            <Link ref={ref} to={to} className={`${baseClass} hover:bg-white/[0.04] hover:border-white/30 transition-all duration-300 block group`}>
                {content}
                <div className="mt-2 text-xs text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">View All &rarr;</div>
            </Link>
        );
    }

    if (href) {
        return (
            <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" className={`${baseClass} hover:bg-white/[0.04] hover:border-white/30 transition-all duration-300 block group`}>
                {content}
                <div className="mt-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">View Profile ↗</div>
            </a>
        );
    }

    return (
        <div ref={ref} className={baseClass}>
            {content}
        </div>
    );
};

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const About = () => {
    return (
        <section id="about" className="py-32 bg-transparent border-t border-white/5 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Left Column */}
                    <motion.div
                        className="lg:col-span-5 lg:sticky lg:top-32"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={fadeUp}
                    >
                        <h2 className="text-4xl sm:text-5xl font-sans font-bold text-white tracking-tight mb-6">
                            About <span className="text-gray-500">Me.</span>
                        </h2>
                        <div className="h-1 w-20 bg-white/20 rounded-full mb-10"></div>

                        <div className="flex flex-wrap items-center gap-4 mb-12">
                            <a
                                href="https://www.linkedin.com/in/shreyash-singhai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-300 font-sans font-medium"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.227 24 22.271 24V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/SHREYASHSINGHAI"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-[#333] hover:border-[#333] transition-all duration-300 font-sans font-medium"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                GitHub
                            </a>
                        </div>

                        {/* Certifications List */}
                        <div>
                            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">Certifications</h3>
                            <div className="flex flex-col gap-3">
                                <a href="/oci_genai_certificate.png" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border border-white/5 rounded-lg bg-white/[0.01] hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-300 group cursor-pointer">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform"></div>
                                    <span className="text-gray-300 font-sans text-sm group-hover:text-white transition-colors">Oracle Cloud Gen AI Engineer</span>
                                </a>
                                <a href="/iot_certificate.png" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border border-white/5 rounded-lg bg-white/[0.01] hover:bg-white/[0.04] hover:border-sky-500/30 transition-all duration-300 group cursor-pointer">
                                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400 group-hover:scale-150 transition-transform"></div>
                                    <span className="text-gray-300 font-sans text-sm group-hover:text-white transition-colors">NPTEL Internet of Things (IoT)</span>
                                </a>
                                <a href="/cloud_computing.png" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border border-white/5 rounded-lg bg-white/[0.01] hover:bg-white/[0.04] hover:border-fuchsia-500/30 transition-all duration-300 group cursor-pointer">
                                    <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 group-hover:scale-150 transition-transform"></div>
                                    <span className="text-gray-300 font-sans text-sm group-hover:text-white transition-colors">NPTEL Cloud Computing</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column */}
                    <motion.div
                        className="lg:col-span-7 flex flex-col gap-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 } } }}
                    >
                        <p className="text-xl sm:text-2xl font-sans font-light text-gray-300 leading-relaxed tracking-wide">
                            I specialize in transforming complex data into functional, intelligent applications. From predictive analytics in healthcare to automated business logic, my focus is on building scalable, containerized solutions.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-6">
                            <StatCard label="Projects Deployed" value={3} suffix="+" to="/deployments" />
                            <StatCard label="GitHub Repos" value={19} href="https://github.com/SHREYASHSINGHAI" />
                            <StatCard label="ML Models Built" value={5} suffix="+" />
                            <StatCard label="Certifications" value={3} />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;