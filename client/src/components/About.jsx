import React from 'react';

/**
 * About Component
 * Converts the About section with skills grid
 * No complex logic needed - pure JSX conversion
 */
const About = () => {
    // Skill categories as requested by the user
    const skillCategories = [
        {
            title: 'Frontend Development',
            skills: [
                { icon: 'fab fa-html5', name: 'HTML' },
                { icon: 'fab fa-css3-alt', name: 'CSS' },
                { icon: 'fab fa-js', name: 'JavaScript' },
                { icon: 'fab fa-bootstrap', name: 'Bootstrap' },
                { icon: 'fab fa-react', name: 'React JS' }
            ]
        },
        {
            title: 'Backend (Learning)',
            skills: [
                { icon: 'fab fa-node-js', name: 'Node.js' },
                { icon: 'fas fa-server', name: 'Express.js' },
                { icon: 'fas fa-database', name: 'MongoDB' }
            ]
        },
        {
            title: 'Professional Tools',
            skills: [
                { icon: 'fab fa-git-alt', name: 'Git' },
                { icon: 'fab fa-github', name: 'GitHub' },
                { icon: 'fas fa-code', name: 'VS Code' },
                { icon: 'fas fa-cloud-upload-alt', name: 'Vercel' }
            ]
        }
    ];

    return (
        <section id="about">
            <h2 className="section-title">Professional Profile</h2>
            <div className="about-container">
                <div className="about-text">
                    <h3>My Journey & Passion</h3>
                    <p>
                        I am a dedicated **Full Stack Developer** in the making, currently based in Vadod, Anand.
                        My academic background at MB Patel College, combined with intensive technical training at
                        **Red & White Multimedia Education**, has shaped my disciplined approach to problem-solving.
                    </p>
                    <p>
                        What started as a fascination with web layouts has evolved into a career mission.
                        I have mastered the art of building responsive, user-centric frontends and am now
                        deeply immersed in mastering the MERN stack (**Node.js, Express, and MongoDB**)
                        to build robust, end-to-end applications.
                    </p>
                    <p>
                        I believe in the power of continuous learning. Each project I undertake is an opportunity
                        to refine my architecture choices, improve code readability, and deliver exceptional
                        user experiences.
                    </p>

                    <div className="experience-highlights">
                        <div className="experience-item">
                            <div className="exp-icon">
                                <i className="fas fa-graduation-cap"></i>
                            </div>
                            <div className="exp-info">
                                <h4>Red & White Multimedia Education</h4>
                                <p>Full Stack Web Development Trainee</p>
                            </div>
                        </div>
                        <div className="experience-item">
                            <div className="exp-icon">
                                <i className="fas fa-university"></i>
                            </div>
                            <div className="exp-info">
                                <h4>MB Patel College</h4>
                                <p>Academic Foundation & Problem Solving</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="skills-content">
                    {skillCategories.map((category, catIndex) => (
                        <div className="skill-category" key={catIndex}>
                            <h4>{category.title}</h4>
                            <div className="skills-grid">
                                {category.skills.map((skill, index) => (
                                    <div className="skill-box" key={index}>
                                        <i className={`${skill.icon} skill-icon`}></i>
                                        <span>{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
