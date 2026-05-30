import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onDone }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setVisible(false);
            setTimeout(onDone, 600);
        }, 1600);
        return () => clearTimeout(t);
    }, [onDone]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[99999] bg-charcoal flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="text-center"
                    >
                        <div className="text-6xl font-mono font-extrabold text-white mb-2">
                            SS<span className="text-electric">.</span>
                        </div>
                        <motion.div
                            className="h-0.5 bg-gradient-to-r from-transparent via-electric to-transparent"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '100%', opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;