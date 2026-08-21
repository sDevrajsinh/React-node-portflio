import React, { useEffect, useRef } from 'react';

/**
 * Particles Component
 * Converts the particle animation with:
 * - DOM manipulation using useRef and useEffect
 * - Creates floating particles dynamically
 */
const Particles = () => {
    const particlesRef = useRef(null);

    useEffect(() => {
        // Create particles function (replaces original JS)
        const createParticles = () => {
            const particlesContainer = particlesRef.current;

            if (!particlesContainer) return;

            // Clear existing particles
            particlesContainer.innerHTML = '';

            // Create 50 particles
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particlesContainer.appendChild(particle);
            }
        };

        createParticles();
    }, []); // Run once on mount

    return <div className="particles" id="particles" ref={particlesRef}></div>;
};

export default Particles;
