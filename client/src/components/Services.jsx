import React from 'react';

/**
 * Services Component
 * Converts the Services section
 * Pure JSX conversion - no complex logic
 */
const Services = () => {
    const services = [
        {
            icon: 'fas fa-laptop-code',
            title: 'Frontend Architecture',
            description: 'Designing intuitive and highly responsive user interfaces using Modern React.js, JavaScript (ES6+), and CSS frameworks like Bootstrap for a pixel-perfect experience.'
        },
        {
            icon: 'fas fa-server',
            title: 'Backend Development',
            description: 'Building the logic and database structures using Node.js, Express, and MongoDB. Focusing on RESTful APIs and secure data management (Work in Progress).'
        },
        {
            icon: 'fas fa-mobile-alt',
            title: 'Responsive & Adaptive Design',
            description: 'Ensuring your web application looks and performs flawlessly across all devices, from mobile screens to large desktop monitors.'
        }
    ];

    return (
        <section id="services">
            <h2 className="section-title">Professional Expertise</h2>
            <div className="services-grid">
                {services.map((service, index) => (
                    <div className="service-card" key={index}>
                        <div className="service-icon">
                            <i className={service.icon}></i>
                        </div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
