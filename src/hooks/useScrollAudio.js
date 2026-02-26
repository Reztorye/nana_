import { useEffect, useRef } from 'react';
import scrollSound from '../sound/sound_6934742785686.mp3';

export const useScrollAudio = () => {
  const hasPlayed = useRef(false);
  const interactionDone = useRef(false);

  useEffect(() => {
    // Function to run on the first scroll after interaction
    const handleScroll = () => {
      // Must have interacted first to satisfy browser autoplay policies
      if (!hasPlayed.current && interactionDone.current) {
        hasPlayed.current = true;

        try {
          // Initialize AudioContext
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          const audioCtx = new AudioContext();

          // Create HTML Audio Element
          const audio = new Audio(scrollSound);
          audio.crossOrigin = "anonymous";

          // Create Source
          const source = audioCtx.createMediaElementSource(audio);

          // Create Equalizer (BiquadFilter) - boost presence/clarity
          const eqFilter = audioCtx.createBiquadFilter();
          eqFilter.type = "peaking";
          eqFilter.frequency.value = 2500; // ~2.5kHz for presence
          eqFilter.Q.value = 1;
          eqFilter.gain.value = 3; // Slight boost

          // Create Compressor - optimize volume, prevent peaking
          const compressor = audioCtx.createDynamicsCompressor();
          compressor.threshold.value = -30;
          compressor.knee.value = 20;
          compressor.ratio.value = 12; // Moderate compression
          compressor.attack.value = 0.003;
          compressor.release.value = 0.25;

          // Connect the nodes
          source.connect(eqFilter);
          eqFilter.connect(compressor);
          compressor.connect(audioCtx.destination);

          // Resume audio context if it was suspended (browser policy)
          if (audioCtx.state === 'suspended') {
            audioCtx.resume();
          }

          // Play the sound
          audio.play().catch(e => console.error("Error playing audio: ", e));

          // Cleanup scroll listener
          window.removeEventListener('scroll', handleScroll);
        } catch (error) {
          console.error("Audio Web API not supported or error occurred:", error);
        }
      }
    };

    // Unlocks audio when user clicks or taps anywhere
    const unlockAudio = () => {
      if (!interactionDone.current) {
        interactionDone.current = true;
        window.addEventListener('scroll', handleScroll, { passive: true });
        // Clean up interaction listeners since we only need it once
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      }
    }

    // Wait for the user to interact with the page before adding the scroll listener
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);
};
