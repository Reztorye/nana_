import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const languages = [
    { code: 'en', name: 'EN', fullName: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'PT', fullName: 'Português', flag: '🇧🇷' },
    { code: 'es', name: 'ES', fullName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'FR', fullName: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'IT', fullName: 'Italiano', flag: '🇮🇹' },
    { code: 'de', name: 'DE', fullName: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: 'JA', fullName: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: 'KO', fullName: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: 'ZH', fullName: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'AR', fullName: 'العربية', flag: '🇸🇦' },
];

export const Navbar = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (code) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex justify-end pointer-events-none">
            <div className="pointer-events-auto relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:bg-white/20 text-white"
                >
                    <span className="text-xl">{currentLang.flag}</span>
                    <span className="font-medium uppercase tracking-wider text-sm">{currentLang.name}</span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown size={16} className="opacity-70" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full right-0 mt-2 min-w-[160px] bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 origin-top-right"
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleSelect(lang.code)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-200
                                        ${currentLang.code === lang.code ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}
                                    `}
                                >
                                    <span className="text-xl">{lang.flag}</span>
                                    <span className="font-medium text-sm">{lang.fullName}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};
