import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const motivos = [
    { text: 'inteligência + criatividade = dti queen goddess' },
    { text: 'investigadora (não-paranormal, por enquanto!)' },
    { text: 'nerd' },
    { text: 'jogos nath core' },
    { text: 'gosto musical' },
    { text: 'pretty rave girl…' },
    { text: 'mexirica' },
    { text: 'generosidade' },
    { text: 'gatos' },
    { text: 'pibbles' },
    { text: 'jojofag em construção' },
    { text: 'conexão noiz' },
    { text: 'HUG TECH, ELA SABE TODAS AS HUG TECHS E NÃO ERRA UMA' },
    { text: 'all i wanted - paramore' },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 1.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20, filter: 'blur(6px)' },
    visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

export const NanaPage = () => {
    // Forçar scroll para o topo ao carregar a página
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [counterDisplay, setCounterDisplay] = useState('1');
    const [showQuiz, setShowQuiz] = useState(false);
    const targetCounter = '1/1000000000000000000∞';

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            i++;
            if (i >= targetCounter.length) {
                clearInterval(interval);
                return;
            }
            setCounterDisplay(targetCounter.slice(0, i + 1));
        }, 60);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="nana-page">
            <div className="nana-bg-mesh" />

            {/* Floating particles */}
            <div className="nana-particles">
                {[...Array(12)].map((_, i) => (
                    <span
                        key={i}
                        className="nana-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 6}s`,
                            animationDuration: `${8 + Math.random() * 8}s`,
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="nana-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Intro / Bio */}
                <motion.div
                    className="nana-intro"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <p className="nana-greeting">oi, eu sou o <span className="nana-highlight">rullian</span>, top one kate denson saves, e sou fã da nana, ada/becca main top one looping & drawing</p>
                </motion.div>

                {/* Divider */}
                <motion.div
                    className="nana-divider"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                />

                {/* Section Title */}
                <motion.h2
                    className="nana-section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                >
                    motivos oficiais
                    <span className="nana-updated">(atualizado diariamente)</span>
                </motion.h2>

                {/* Motivos List */}
                <motion.ul
                    className="nana-motivos-list"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {motivos.map((motivo, index) => (
                        <motion.li
                            key={index}
                            className="nana-motivo-item"
                            variants={itemVariants}
                        >
                            <span className="nana-motivo-text">{motivo.text}</span>
                        </motion.li>
                    ))}
                </motion.ul>

                {/* Counter */}
                <motion.div
                    className="nana-counter"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3.5 }}
                >
                    <span className="nana-counter-text">{counterDisplay}</span>
                </motion.div>
            </motion.div>
        </div>
    );
};
