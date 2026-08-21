import React, { useState, useEffect } from 'react';
import { trackResumeDownload, fetchPublicProfile } from '../services/apiService';

/**
 * Hero Component
 * Converts the original hero section with:
 * - Typing animation using useState and useEffect
 * - Multi-phrase rotation effect
 */

// Phrases array for the typing animation
const phrases = [
    'Full Stack Web Developer',
    'MERN Stack Enthusiast',
    'Frontend Specialist',
    'Backend Learner',
    'Problem Solver'
];

const Hero = () => {
    const [displayText, setDisplayText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [resumeUrl, setResumeUrl] = useState('https://drive.google.com/file/d/1mHGBi9JIEqNIgLPf0Q5jpAi6AJKLl11L/view?usp=sharing');
    const [profile, setProfile] = useState({
        name: 'Devraj Solanki',
        bio: 'I am Devraj Solanki, a passionate Full Stack Web Developer currently learning at Red & White Skill Education. I have hands-on experience in both frontend and backend technologies. I enjoy building responsive, user-friendly, and scalable web applications. I am always eager to learn new technologies and improve my development skills.'
    });

    useEffect(() => {
        const getProfile = async () => {
            try {
                const data = await fetchPublicProfile();
                if (data.resumeUrl) setResumeUrl(data.resumeUrl);
                if (data.name) setProfile(prev => ({ ...prev, name: data.name }));
                if (data.bio) setProfile(prev => ({ ...prev, bio: data.bio }));
            } catch (err) {
                console.error("Profile fetch failed", err);
            }
        };
        getProfile();
    }, []);

    // Typing animation logic
    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        let typingSpeed = isDeleting ? 100 : 150; // Slower typing and deleting

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 3000; // Pause at the end (2 seconds)
            setIsDeleting(true);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setPhraseIndex((phraseIndex + 1) % phrases.length);
            typingSpeed = 500;
        }

        const typeTimeout = setTimeout(() => {
            setCharIndex(prev => prev + (isDeleting ? -1 : 1));
        }, typingSpeed);

        setDisplayText(currentPhrase.substring(0, charIndex));

        return () => clearTimeout(typeTimeout);
    }, [charIndex, isDeleting, phraseIndex]);

    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <span className="hero-greeting">Hello, I'm</span>
                <h1>{profile.name}</h1>
                <p className="hero-subtitle">I'm a <span className="highlight">{displayText}</span><span className="cursor">|</span></p>
                <p className="hero-description">
                    "{profile.bio}"
                </p>
                <div className="cta-buttons">
                    <a href="#portfolio-projects" className="btn btn-primary">
                        <i className="fas fa-rocket"></i>
                        Explore Projects
                    </a>
                    <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        onClick={async () => {
                            try {
                                await trackResumeDownload();
                            } catch (err) {
                                console.error(err);
                            }
                        }}
                    >
                        <i className="fas fa-file-download"></i>
                        Download Resume
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
