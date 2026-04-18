import React, { useState, useEffect } from 'react';
import { fetchProjects, likeProjectApi, API_BASE_URL } from '../services/apiService';
import travelimg from '../img/TravelCove.png'
import cssImg from '../img/css coverPage.png'
import bootstrapImg from '../img/Bootstrap coverPage.png'
import jsImg from '../img/jscove1.png'
import expenseImg from '../img/jscover2.png'
import hotelImg from '../img/Hotel coverPage.png'

const imageMap = {
    'TravelCove.png': travelimg,
    'Hotel coverPage.png': hotelImg,
    'css coverPage.png': cssImg,
    'Bootstrap coverPage.png': bootstrapImg,
    'jscove1.png': jsImg,
    'jscover2.png': expenseImg
};

const staticProjects = [
    {
        id: 1,
        title: 'TravelWorld - MERN Stack',
        tech: 'React • Node.js • Express • MongoDB',
        techDisplay: 'MERN Stack • Full Stack',
        description: 'A comprehensive travel platform allowing users to explore destinations, search for packages, and manage bookings. This project demonstrates full-stack capabilities and complex state management.',
        features: [
            'Dynamic Search & Filtering',
            'Secure User Authentication',
            'Responsive Design across all devices',
            'RESTful API Integration',
            'Interactive Destination Gallery'
        ],
        image: travelimg, // Using cssImg as placeholder if TravelWorld img not found
        liveLink: 'https://react-nodejs-travelworld.vercel.app/',
        sourceLink: 'https://github.com/sDevrajsinh/react-nodejs-Travelworld',
        tags: ['react', 'javascript', 'mern'],
        featured: true
    },
    {
        id: 2,
        title: 'Luxury Hotel Booking',
        tech: 'React JS • CSS • Responsive',
        techDisplay: 'React JS • Frontend',
        description: 'A premium hotel reservation interface featuring interactive booking components and high-end aesthetics.',
        features: [
            'Interactive UI Components',
            'Seamless Navigation',
            'Modern Material Design',
            'Optimized Performance'
        ],
        image: hotelImg,
        liveLink: 'https://react-luxury-hotels.vercel.app/',
        sourceLink: 'https://github.com/sDevrajsinh/React-Luxury-Hotels',
        tags: ['react', 'javascript']
    },
    {
        id: 3,
        title: 'Travel Website UI',
        tech: 'HTML • CSS • JavaScript',
        techDisplay: 'HTML • CSS • JS',
        description: 'A responsive travel website built using HTML, CSS, and JavaScript, showcasing destinations, packages, and interactive UI elements.',
        features: [
            'Responsive Layout Design',
            'Interactive Navigation Menu',
            'Image-Based Destination Sections',
            'Basic JavaScript Interactions'
        ],
        image: cssImg,
        liveLink: 'https://css-travel-website-lake.vercel.app/',
        sourceLink: 'https://github.com/sDevrajsinh/CSS_travel_website',
        tags: ['html', 'css', 'javascript']
    },
    {
        id: 4,
        title: 'Bootstrap Multi-Section Website',
        tech: 'Bootstrap 5 • Responsive',
        techDisplay: 'Bootstrap • UI/UX',
        description: 'A modern multi-section website built using Bootstrap 5, featuring clean layout, responsive design, and structured content sections.',
        features: [
            'Bootstrap 5 Grid System',
            'Responsive Layout Design',
            'Reusable UI Components',
            'Clean and Structured Sections'
        ],
        image: bootstrapImg,
        liveLink: 'https://bootstrap-layers-websit.vercel.app/',
        sourceLink: 'https://github.com/sDevrajsinh/Bootstrap-Layers-websit',
        tags: ['bootstrap', 'css']
    },
    {
        id: 5,
        title: 'JavaScript CRUD App',
        tech: 'JavaScript • LocalStorage',
        techDisplay: 'Vanilla JS • Web Storage',
        description: 'A multi-page CRUD application built with Vanilla JavaScript, allowing users to add, edit, and delete records with data stored in LocalStorage.',
        features: [
            'Add, Edit, and Delete Records',
            'LocalStorage Data Persistence',
            'Multi-Page Navigation',
            'Form Input Validation'
        ],
        image: jsImg,
        liveLink: 'https://js-multi-page.vercel.app/',
        sourceLink: 'https://github.com/sDevrajsinh/JS-MultiPage',
        tags: ['javascript']
    },
    {
        id: 6,
        title: 'JavaScript Expense Tracker',
        tech: 'JavaScript • LocalStorage',
        techDisplay: 'Vanilla JS • Web Storage',
        description: 'A simple and responsive expense tracker application built with JavaScript, allowing users to manage daily expenses with data stored in LocalStorage.',
        features: [
            'Add and Delete Expenses',
            'Track Income and Spending',
            'LocalStorage Data Persistence',
            'Simple and Clean UI'
        ],
        image: expenseImg,
        liveLink: 'https://java-script-expense.vercel.app/',
        sourceLink: 'https://github.com/sDevrajsinh/JavaScript-Expense',
        tags: ['javascript', 'expense', 'tracker']
    }
];

/**
 * Portfolio Component
 * Converts the portfolio section with:
 * - Filter functionality using useState
 * - Dynamic project count
 * - Filter buttons with active state
 */
const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [apiProjects, setApiProjects] = useState([]);
    const [, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                setApiProjects(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching projects", error);
            } finally {
                setLoading(false);
            }
        };
        loadProjects();
    }, []);

    // Filter projects based on active filter
    const displayProjects = apiProjects.length > 0 ? apiProjects : staticProjects;
    const filteredProjects = activeFilter === 'all'
        ? displayProjects
        : displayProjects.filter(project => project.tags && project.tags.includes(activeFilter));

    // Handle filter button click
    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    const handleLike = async (projectId) => {
        const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
        if (likedProjects.includes(projectId)) return;

        try {
            const updatedProject = await likeProjectApi(projectId);
            setApiProjects(prev => prev.map(p => p._id === projectId ? updatedProject : p));
            localStorage.setItem('likedProjects', JSON.stringify([...likedProjects, projectId]));
        } catch (error) {
            console.error("Like failed", error);
        }
    };

    const finalProjects = filteredProjects;

    return (
        <section id="portfolio-projects">
            <h2 className="portfolio-section-title">Portfolio & Projects</h2>

            <div className="portfolio-filter-container">
                <button
                    className={`portfolio-filter-btn ${activeFilter === 'all' ? 'portfolio-active' : ''}`}
                    onClick={() => handleFilterClick('all')}
                >
                    All
                </button>
                <button
                    className={`portfolio-filter-btn ${activeFilter === 'mern' ? 'portfolio-active' : ''}`}
                    onClick={() => handleFilterClick('mern')}
                >
                    MERN Stack
                </button>
                <button
                    className={`portfolio-filter-btn ${activeFilter === 'react' ? 'portfolio-active' : ''}`}
                    onClick={() => handleFilterClick('react')}
                >
                    React
                </button>
                <button
                    className={`portfolio-filter-btn ${activeFilter === 'javascript' ? 'portfolio-active' : ''}`}
                    onClick={() => handleFilterClick('javascript')}
                >
                    JavaScript
                </button>
                <button
                    className={`portfolio-filter-btn ${activeFilter === 'bootstrap' ? 'portfolio-active' : ''}`}
                    onClick={() => handleFilterClick('bootstrap')}
                >
                    Bootstrap
                </button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div className="portfolio-project-count">
                    <span>{filteredProjects.length}</span> Projects Found
                </div>
            </div>

            <div className="portfolio-projects-grid">
                {finalProjects.map((project) => (
                    <div
                        className={`portfolio-project-card ${project.featured ? 'featured-project' : ''}`}
                        key={project._id || project.id}
                    >
                        {project.featured && <div className="featured-badge">Highly Recommended</div>}
                        <div className="portfolio-project-image">
                            <img 
                                src={imageMap[project.image] || (project.image && project.image.startsWith('/') ? `${API_BASE_URL}${project.image}` : project.image)} 
                                alt={project.title} 
                            />
                        </div>
                        <div className="portfolio-project-content">
                            <h3 className="portfolio-project-title">{project.title}</h3>
                            <p className="portfolio-project-tech">
                                <i className="fas fa-tools"></i> {project.techDisplay}
                            </p>
                            <p className="portfolio-project-description">
                                {project.description}
                            </p>
                            <div className="project-features">
                                <ul>
                                    {project.features && project.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="portfolio-project-interactions" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                <button 
                                    className={`like-button ${JSON.parse(localStorage.getItem('likedProjects') || '[]').includes(project._id || project.id) ? 'liked' : ''}`}
                                    onClick={() => handleLike(project._id || project.id)}
                                    disabled={JSON.parse(localStorage.getItem('likedProjects') || '[]').includes(project._id || project.id)}
                                    style={{ 
                                        background: JSON.parse(localStorage.getItem('likedProjects') || '[]').includes(project._id || project.id) ? 'rgba(0, 255, 136, 0.1)' : 'transparent', 
                                        border: '1px solid rgba(0, 255, 136, 0.3)', 
                                        color: 'var(--text-secondary)',
                                        padding: '5px 12px',
                                        borderRadius: '20px',
                                        cursor: JSON.parse(localStorage.getItem('likedProjects') || '[]').includes(project._id || project.id) ? 'default' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.3s ease',
                                        opacity: JSON.parse(localStorage.getItem('likedProjects') || '[]').includes(project._id || project.id) ? 1 : 1
                                    }}
                                >
                                    <i className={`${JSON.parse(localStorage.getItem('likedProjects') || '[]').includes(project._id || project.id) ? 'fas' : 'far'} fa-heart`} style={{ color: '#ff4d4d' }}></i>
                                    <span style={{ fontWeight: '700', color: JSON.parse(localStorage.getItem('likedProjects') || '[]').includes(project._id || project.id) ? 'var(--accent-primary)' : 'inherit' }}>{project.likes || 0}</span>
                                </button>
                                <div className="project-tags-mini" style={{ display: 'flex', gap: '5px' }}>
                                    {project.tags && project.tags.slice(0, 3).map((tag, i) => (
                                        <span key={i} style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', opacity: 0.7 }}>#{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="portfolio-project-links">
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="portfolio-project-link portfolio-primary"
                                >
                                    <i className="fas fa-external-link-alt"></i> Live Demo
                                </a>
                                <a
                                    href={project.sourceLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="portfolio-project-link portfolio-secondary"
                                >
                                    <i className="fab fa-github"></i> GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
