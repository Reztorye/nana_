import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import skinwalkerImg from '../images/skinwalker.png';
import { supabase } from '../supabaseClient';

const questions = [
    {
        question: 'eles vão botar o chip em quem?',
        image: null,
        options: [
            { letter: 'a', text: 'em nós' },
            { letter: 'b', text: 'noiz' },
            { letter: 'c', text: 'hur hur hur hur hur hur' },
            { letter: 'd', text: 'nos alien' },
            { letter: 'e', text: 'Arthur Morgan' },
            { letter: 'f', text: 'nos emos' },
        ],
    },
    {
        question: 'esse ser da imagem é um skinwalker?',
        image: skinwalkerImg,
        options: [
            { letter: 'a', text: 'sim' },
            { letter: 'b', text: 'não' },
        ],
    },
    {
        question: 'escolha um data:',
        image: null,
        options: [
            { letter: 'a', text: '30 de setembro de 1998' },
            { letter: 'b', text: '24 de setembro de 2025' },
            { letter: 'c', text: '27 de fevereiro de 2026' },
            { letter: 'd', text: '19 de julho de 1995' },
            { letter: 'e', text: '19 de março de 2026' },
        ],
    },
];

export const Quiz = ({ onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState([]);

    const current = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;

    const handleSelect = (letter) => {
        setSelectedOption(letter);
    };

    const getOptionText = (questionIndex, letter) => {
        const opt = questions[questionIndex].options.find(o => o.letter === letter);
        return opt ? `${letter}) ${opt.text}` : letter;
    };

    const handleNext = async () => {
        if (selectedOption === null) return;

        const newAnswers = [...answers, { question: questions[currentIndex].question, answer: selectedOption }];
        setAnswers(newAnswers);

        if (isLast) {
            try {
                // Tenta pegar o IP (pode falhar se tiver adblock/etc, então não travamos o quiz)
                let ip = 'N/A';
                try {
                    const res = await fetch('https://api.ipify.org?format=json');
                    const data = await res.json();
                    ip = data.ip;
                } catch (e) {
                    console.log('Não foi possível pegar o IP');
                }

                // Coleta dados extras
                const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                const connectionType = connection ? connection.effectiveType : 'Desconhecido';

                const payload = {
                    resposta_chip: getOptionText(0, newAnswers[0]?.answer),
                    resposta_skinwalker: getOptionText(1, newAnswers[1]?.answer),
                    resposta_data: getOptionText(2, newAnswers[2]?.answer),

                    // Dados básicos
                    navegador: navigator.userAgent,
                    idioma: navigator.language,
                    resolucao_tela: `${window.screen.width}x${window.screen.height}`,

                    // Dados avançados solicitados
                    fuso_horario: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    memoria_ram: navigator.deviceMemory ? `~${navigator.deviceMemory} GB` : 'N/A',
                    nucleos_cpu: navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} núcleos` : 'N/A',
                    conexao_internet: connectionType,
                    ip_publico: ip,
                    user_agent_detalhado: navigator.userAgent // Redundante mas garante
                };

                const { error } = await supabase
                    .from('quiz_responses')
                    .insert([payload]);

                if (error) throw error;
                onComplete(newAnswers);
            } catch (error) {
                console.error('Error saving quiz:', error.message);
                onComplete(newAnswers);
            }
        } else {
            setCurrentIndex((prev) => prev + 1);
            setSelectedOption(null);
        }
    };

    return (
        <motion.div
            className="quiz-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="quiz-container">
                {/* Progress */}
                <div className="quiz-progress">
                    {questions.map((_, i) => (
                        <div
                            key={i}
                            className={`quiz-progress-dot ${i === currentIndex ? 'active' : ''} ${i < currentIndex ? 'done' : ''}`}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.35 }}
                        className="quiz-question-wrapper"
                    >
                        <p className="quiz-question-number">
                            questão {currentIndex + 1}
                            <span> / {questions.length}</span>
                        </p>

                        <h2 className="quiz-question-text">{current.question}</h2>

                        {current.image && (
                            <div className="quiz-image-wrapper">
                                <img src={current.image} alt="quiz" className="quiz-image" />
                            </div>
                        )}

                        <div className="quiz-options">
                            {current.options.map((opt) => (
                                <button
                                    key={opt.letter}
                                    className={`quiz-option ${selectedOption === opt.letter ? 'selected' : ''}`}
                                    onClick={() => handleSelect(opt.letter)}
                                >
                                    <span className="quiz-option-letter">{opt.letter})</span>
                                    <span className="quiz-option-text">{opt.text}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <button
                    className={`quiz-next-btn ${selectedOption === null ? 'disabled' : ''}`}
                    onClick={handleNext}
                    disabled={selectedOption === null}
                >
                    {isLast ? 'finalizar' : 'próxima'}
                </button>
            </div>
        </motion.div>
    );
};
