import React, { useState, useEffect } from 'react';
import { trackResumeDownload, fetchPublicProfile } from '../services/apiService';
import { Link } from 'react-router-dom';

/**
 * Navbar Component
 * Converts the original navbar with:
 * - Mobile menu toggle using useState
 * - Scroll background change using useEffect + window.scroll
 * - Smooth scroll navigation (handled by anchor tags)
 */
const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [navBackground, setNavBackground] = useState('rgba(26,26,26,0.95)');
    const [activeSection, setActiveSection] = useState('home');
    const [resumeUrl, setResumeUrl] = useState('https://drive.google.com/file/d/1mHGBi9JIEqNIgLPf0Q5jpAi6AJKLl11L/view?usp=sharing');

    useEffect(() => {
        const getResume = async () => {
            try {
                const data = await fetchPublicProfile();
                if (data.resumeUrl) setResumeUrl(data.resumeUrl);
            } catch (err) {
                console.error("Resume fetch failed", err);
            }
        };
        getResume();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // Background color logic
            if (window.scrollY > 50) {
                setNavBackground('rgba(26,26,26,0.98)');
            } else {
                setNavBackground('rgba(26,26,26,0.95)');
            }

            // Active section logic
            const sections = ['home', 'about', 'services', 'portfolio-projects', 'contact'];
            const scrollPosition = window.scrollY + 150;

            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    const handleResumeClick = async (e) => {
        handleLinkClick();
        try {
            await trackResumeDownload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <nav id="navbar" style={{ background: navBackground }}>
                <div className="nav-container">
                    <a href="#home" className="logo">Devraj Solanki</a>
                    <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                        <li><a href="#home" onClick={handleLinkClick} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
                        <li><a href="#about" onClick={handleLinkClick} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
                        <li><a href="#services" onClick={handleLinkClick} className={activeSection === 'services' ? 'active' : ''}>Services</a></li>
                        <li><a href="#portfolio-projects" onClick={handleLinkClick} className={activeSection === 'portfolio-projects' ? 'active' : ''}>Projects</a></li>
                        <li>
                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleResumeClick}
                                className="nav-resume-link"
                            >
                                Resume
                            </a>
                        </li>
                        <li><a href="#contact" onClick={handleLinkClick} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
                        <li><Link to="/admin" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick} style={{ color: 'var(--accent-primary)' }}>Admin</Link></li>
                    </ul>
                    <div
                        className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
                        onClick={toggleMobileMenu}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
            {/* Overlay for mobile menu */}
            <div
                className={`nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={handleLinkClick}
            ></div>
        </>
    );
};

export default Navbar;
