import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';
import { Navbar } from './Navbar';
import paramoreAudio from '../sound/Paramore - (One Of Those) Crazy Girls [Official Audio] (320).mp3';

// ── Launcher physics constants ──────────────────────────────────────────────
const FRAME_RATE = 60;
const TRACK_LENGTH = 160; // px width of the launcher track
const MAX_T = 1; // seconds until bullet lands at max range
const MAX_ANGLE = Math.PI / 4;
const O_LAUNCHER = -MAX_ANGLE / (1.0 * FRAME_RATE); // angle step per frame
const V_0 = TRACK_LENGTH / Math.cos(MAX_ANGLE) / (MAX_T * FRAME_RATE);
const MAX_H = 28 * Math.sin(MAX_ANGLE); // max arc height ~20px
const GRAVITY =
    (MAX_H + V_0 * Math.sin(MAX_ANGLE) * (MAX_T * FRAME_RATE)) * 2 /
    ((MAX_T * FRAME_RATE) ** 2);

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
    const { t } = useTranslation();
    const [volume, setVolume] = useState(0.4);
    const volumeRef = useRef(0.4); // keep in sync for stable closures
    const audioRef = useRef(null);

    // ── Launcher easter-egg state ───────────────────────────────────────────
    const [isPowering, setIsPowering] = useState(false);
    const [bulletVisible, setBulletVisible] = useState(false);
    const [bulletFading, setBulletFading] = useState(false); // fade-out before hide
    const [bulletPos, setBulletPos] = useState({ x: 0, y: 0 });
    const [iconAngle, setIconAngle] = useState(0);

    const angleRef = useRef(0);
    const powerTimerRef = useRef(null);
    const bulletTimerRef = useRef(null);
    const holdTimerRef = useRef(null);
    const fadeTimerRef = useRef(null);
    const wasLauncherRef = useRef(false); // true if mouseup should fire instead of toggle mute
    const prevVolumeRef = useRef(0.4); // for mute/unmute toggle

    // Audio setup on mount
    React.useEffect(() => {
        window.scrollTo(0, 0);

        audioRef.current = new Audio(paramoreAudio);
        audioRef.current.volume = volume;
        audioRef.current.loop = true;

        audioRef.current.play().catch(error => {
            console.error("Error playing Paramore audio on NanaPage mount:", error);
        });

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        };
    }, []);

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        console.log('[Launcher DEBUG] Slider change:', newVolume);
        setVolume(newVolume);
        volumeRef.current = newVolume;
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    // ── Launcher helpers ────────────────────────────────────────────────────
    const stopBullet = useCallback(() => {
        if (bulletTimerRef.current) {
            console.log('[Launcher DEBUG] stopBullet: clearing bullet interval');
            clearInterval(bulletTimerRef.current);
            bulletTimerRef.current = null;
        }
    }, []);

    const stopPower = useCallback(() => {
        if (powerTimerRef.current) {
            console.log('[Launcher DEBUG] stopPower: clearing power interval');
            clearInterval(powerTimerRef.current);
            powerTimerRef.current = null;
        }
    }, []);

    const launchBullet = useCallback((currentVolume) => {
        const a = angleRef.current;
        console.log('[Launcher DEBUG] launchBullet called | angle:', a, '| volume:', currentVolume);
        if (a >= 0) {
            console.log('[Launcher DEBUG] launchBullet SKIPPED: angle >= 0, no charge');
            return;
        }
        // Always start from the icon end (x=0) — bullet flies across the track
        let x = 0;
        let y = a / MAX_ANGLE * MAX_H;
        let vx = V_0 * Math.cos(a);
        let vy = V_0 * Math.sin(a);

        // Clear any previous fade timer
        if (fadeTimerRef.current) {
            clearTimeout(fadeTimerRef.current);
            fadeTimerRef.current = null;
        }

        setBulletFading(false);
        setBulletVisible(true);
        stopBullet();

        console.log('[Launcher DEBUG] Bullet launched | startX:', x, '| vx:', vx, '| vy:', vy);

        bulletTimerRef.current = setInterval(() => {
            vy += GRAVITY;
            y += vy;
            x += vx;

            if (y >= 0) {
                // Clamp landing position strictly within [0, TRACK_LENGTH]
                const landX = Math.min(Math.max(x, 0), TRACK_LENGTH);
                console.log('[Launcher DEBUG] Bullet LANDED at x:', landX, '/', TRACK_LENGTH);
                setBulletPos({ x: landX, y: 0 });
                const newVol = Math.round((landX / TRACK_LENGTH) * 100) / 100;
                console.log('[Launcher DEBUG] Setting volume from bullet:', newVol);
                setVolume(newVol);
                volumeRef.current = newVol;
                if (audioRef.current) audioRef.current.volume = newVol;
                stopBullet();
                // Fade out then fully hide
                setBulletFading(true);
                fadeTimerRef.current = setTimeout(() => {
                    console.log('[Launcher DEBUG] Bullet fade complete, hiding');
                    setBulletVisible(false);
                    setBulletFading(false);
                    fadeTimerRef.current = null;
                }, 500);
            } else {
                // Clamp x to track bounds even mid-flight
                const clampedX = Math.min(Math.max(x, 0), TRACK_LENGTH);
                setBulletPos({ x: clampedX, y });
            }
        }, 1000 / FRAME_RATE);
    }, [stopBullet]);

    const onIconMouseDown = useCallback(() => {
        console.log('[Launcher DEBUG] onIconMouseDown');
        wasLauncherRef.current = false;
        // Start a hold timer — after 300ms, enter launcher charging
        holdTimerRef.current = setTimeout(() => {
            console.log('[Launcher DEBUG] Hold threshold reached → entering POWER mode');
            wasLauncherRef.current = true;
            setIsPowering(true);
            angleRef.current = 0;
            stopPower();
            powerTimerRef.current = setInterval(() => {
                angleRef.current = Math.max(angleRef.current + O_LAUNCHER, -MAX_ANGLE);
                setIconAngle(angleRef.current);
            }, 1000 / FRAME_RATE);
        }, 300);
    }, [stopPower]);

    const onIconMouseUp = useCallback(() => {
        console.log('[Launcher DEBUG] onIconMouseUp | wasLauncher:', wasLauncherRef.current, '| volume:', volumeRef.current);
        // Clear hold timer if it hasn't fired yet
        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
        }

        if (wasLauncherRef.current) {
            // Was charging launcher → fire!
            console.log('[Launcher DEBUG] FIRING! angle:', angleRef.current);
            setIsPowering(false);
            stopPower();
            launchBullet(volumeRef.current);
            setIconAngle(0);
            angleRef.current = 0;
            wasLauncherRef.current = false;
        } else {
            // Quick click → mute/unmute
            const currentVol = volumeRef.current;
            if (currentVol > 0) {
                console.log('[Launcher DEBUG] Quick click → MUTE (was:', currentVol, ')');
                prevVolumeRef.current = currentVol;
                setVolume(0);
                volumeRef.current = 0;
                if (audioRef.current) audioRef.current.volume = 0;
            } else {
                const restored = prevVolumeRef.current || 0.4;
                console.log('[Launcher DEBUG] Quick click → UNMUTE to:', restored);
                setVolume(restored);
                volumeRef.current = restored;
                if (audioRef.current) audioRef.current.volume = restored;
            }
        }
    }, [stopPower, launchBullet]);

    // Separate handler for mouse leave — only cancel charging, NEVER toggle mute
    const onIconMouseLeave = useCallback(() => {
        // Clear hold timer if it hasn't fired yet
        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
        }

        if (wasLauncherRef.current) {
            // Was charging → cancel and fire
            console.log('[Launcher DEBUG] onMouseLeave during charge → FIRING');
            setIsPowering(false);
            stopPower();
            launchBullet(volumeRef.current);
            setIconAngle(0);
            angleRef.current = 0;
            wasLauncherRef.current = false;
        }
        // If NOT charging (wasLauncher=false), do NOTHING — no mute toggle
    }, [stopPower, launchBullet]);

    // cleanup on unmount
    useEffect(() => {
        return () => {
            stopPower();
            stopBullet();
            if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
        };
    }, [stopPower, stopBullet]);

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

    const VolumeIcon = volume === 0 ? VolumeX : Volume2;


    return (
        <div className="nana-page relative">
            <Navbar />
            <div className="nana-bg-mesh" />

            {/* Floating Audio Volume Control */}
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-[0_8px_32px_0_rgba(185,84,96,0.37)] transition-all duration-300">
                {/* Volume icon — quick click = mute/unmute, hold = launcher! */}
                <button
                    className="launcher-icon-btn"
                    style={{
                        transform: `rotate(${iconAngle * 180 / Math.PI}deg)`,
                        transition: isPowering ? 'none' : 'transform 0.2s ease-out',
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        lineHeight: 0,
                    }}
                    onMouseDown={onIconMouseDown}
                    onMouseUp={onIconMouseUp}
                    onMouseLeave={onIconMouseLeave}
                    title="Clique = mute · Segure = 🎯"
                    aria-label="Volume control"
                >
                    <VolumeIcon className={volume === 0 ? 'text-white/60' : 'text-white'} size={20} />
                </button>

                {/* Slider — always visible */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className={`w-24 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full ${bulletVisible ? 'launcher-slider-hidden' : ''}`}
                        aria-label="Volume Control"
                    />
                    {/* Bullet flies over the slider track */}
                    {bulletVisible && (
                        <div className={`launcher-bullet${bulletFading ? ' launcher-bullet-fading' : ''}`} style={{
                            position: 'absolute',
                            left: `${Math.min(Math.max((bulletPos.x / TRACK_LENGTH) * 100, 0), 100)}%`,
                            top: `calc(50% + ${bulletPos.y}px)`,
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                        }} />
                    )}
                </div>
            </div>


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
                    <p className="nana-greeting">
                        <Trans i18nKey="nanaPage.greeting" components={{ 1: <span className="nana-highlight" /> }} />
                    </p>
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
                    {t('nanaPage.motivosTitle')}
                    <span className="nana-updated">{t('nanaPage.updated')}</span>
                </motion.h2>

                {/* Motivos List */}
                <motion.ul
                    className="nana-motivos-list"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {t('nanaPage.motivos', { returnObjects: true }).map((text, index) => (
                        <motion.li
                            key={index}
                            className="nana-motivo-item"
                            variants={itemVariants}
                        >
                            <span className="nana-motivo-text">{text}</span>
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
