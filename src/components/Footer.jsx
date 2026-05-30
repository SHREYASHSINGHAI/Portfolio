import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-transparent border-t border-white/5 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-lg font-bold text-white">
                    SS<span className="text-electric">.</span>
                </span>
                <p className="text-gray-500 font-sans text-sm text-center">
                    © {new Date().getFullYear()} Shreyash Singhai · Built with React & Tailwind CSS
                </p>
                <div className="flex items-center gap-1 text-gray-600 font-mono text-xs">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
                    <span className="ml-1 text-gray-500">Open to opportunities</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;