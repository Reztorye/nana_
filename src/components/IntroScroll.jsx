import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import pibbleImg from '../images/pibble.png';
import adaImg from '../images/ada.png';
import leonImg from '../images/leon.png';

const ScrollRevealImage = ({ src, alt, children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const clipPath = useTransform(
        scrollYProgress,
        [0, 1],
        ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
    );

    return (
        <section ref={containerRef} className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-slate-950">
                <motion.div
                    style={{ clipPath }}
                    className="absolute inset-0 w-full h-full"
                >
                    <div className="relative w-full h-full">
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay Gradient for better text visibility if needed */}
                        <div className="absolute inset-0 bg-black/40" />

                        {children && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4">
                                {children}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export const IntroScroll = ({ onStartQuiz }) => {
    const handleContinue = () => {
        if (onStartQuiz) {
            onStartQuiz();
        }
    };

    return (
        <>
            <ScrollRevealImage src={adaImg} alt="Ada" />
            <ScrollRevealImage src={leonImg} alt="Leon" />
            <ScrollRevealImage src={pibbleImg} alt="Pibble">
                <div className="text-center space-y-2 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-2">
                        pibble.
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-300 italic">
                        im pibble.
                    </p>
                    <p className="text-sm md:text-base text-500 tracking-widest uppercase mt-8">
                        wash my belly.
                    </p>

                    <button
                        onClick={handleContinue}
                        className="mt-12 px-8 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{ backgroundColor: '#722F37' }} // Wine color
                    >
                        continuar
                    </button>
                </div>
            </ScrollRevealImage>

            {/* Adding the fade-in animation style temporarily here or it should be in CSS */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 1s ease-out forwards;
                }
            `}</style>
        </>
    );
};
