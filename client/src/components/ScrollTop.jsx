import React, { useState, useEffect } from 'react';

/**
 * ScrollTop Component
 * Converts the scroll-to-top button with:
 * - Show/hide based on scroll position using useEffect
 * - Smooth scroll to top functionality
 */
const ScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Handle scroll event to show/hide button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className="scroll-top"
            id="scrollTop"
            onClick={scrollToTop}
            style={{ display: isVisible ? 'block' : 'none' }}
        >
            <i className="fas fa-arrow-up"></i>
        </button>
    );
};

export default ScrollTop;
