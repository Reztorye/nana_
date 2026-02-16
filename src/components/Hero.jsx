import React from 'react';
import { motion } from 'framer-motion';

export const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 px-4 min-h-[80vh] flex items-center justify-center text-center overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-[100px] -z-10" />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary-300 text-sm font-medium mb-6 backdrop-blur-sm">
                        v1.0.0 Public Release
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-outfit mb-8 tracking-tight leading-tight">
                        Build <span className="text-gradient">Faster</span> <br />
                        Scale <span className="text-white">Better.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        A premium template designed for modern web applications.
                        Fast, responsive, and aesthetically pleasing.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="btn-primary w-full sm:w-auto">
                            Start Building
                        </button>
                        <button className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-all w-full sm:w-auto">
                            View Demo
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
