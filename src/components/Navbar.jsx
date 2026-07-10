import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = [
        { label: 'About', href: '/#about' },
        { label: 'Skills', href: '/#skills' },
        { label: 'Systems', href: '/#projects' },
        { label: 'Contact', href: '/#contact' },
    ];

    return (
        <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 flex justify-center ${scrolled ? 'pt-4' : 'pt-6'}`}>
            <div className={`w-full max-w-5xl mx-4 sm:mx-6 lg:mx-8 transition-all duration-500 ${
                scrolled 
                ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] rounded-2xl px-6 py-3' 
                : 'bg-transparent px-2 py-4'
            }`}>
                <div className="flex justify-between items-center">
                    <a href="/#" className="font-sans text-lg font-bold text-white hover:text-gray-300 transition-colors flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-white text-black flex items-center justify-center text-sm">S</span>
                        <span className="hidden sm:block">Shreyash</span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-1 items-center bg-white/[0.03] border border-white/5 p-1 rounded-xl">
                        {links.map(l => (
                            <a 
                                key={l.label} 
                                href={l.href} 
                                className="text-sm text-gray-400 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center">
                        <a
                            href="/Shreyash_Singhai_Resume.pdf"
                            download
                            className="text-sm bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all shadow-sm"
                        >
                            Resume
                        </a>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-20 left-4 right-4 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-2 md:hidden"
                    >
                        {links.map(l => (
                            <a
                                key={l.label}
                                href={l.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors font-medium text-sm"
                            >
                                {l.label}
                            </a>
                        ))}
                        <div className="h-px w-full bg-white/5 my-2"></div>
                        <a
                            href="/Shreyash_Singhai_Resume.pdf"
                            download
                            className="bg-white text-black px-4 py-3 rounded-lg font-medium text-center hover:bg-gray-200 transition-all text-sm"
                        >
                            Download Resume
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;