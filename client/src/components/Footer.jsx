import React, { useState, useEffect } from "react";
import { fetchPublicProfile } from "../services/apiService";

const Footer = () => {
  const year = new Date().getFullYear();
  const [profile, setProfile] = useState({
    name: "Devraj Solanki",
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/devrajsinh-solanki-514861335/", icon: "fab fa-linkedin" },
      { name: "GitHub", url: "https://github.com/", icon: "fab fa-github" },
      { name: "Twitter", url: "#", icon: "fab fa-twitter" },
    ]
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchPublicProfile();
        const links = [];
        if (data.linkedin) links.push({ name: "LinkedIn", url: data.linkedin.startsWith('http') ? data.linkedin : `https://${data.linkedin}`, icon: "fab fa-linkedin" });
        if (data.github) links.push({ name: "GitHub", url: data.github.startsWith('http') ? data.github : `https://${data.github}`, icon: "fab fa-github" });
        if (data.twitter) links.push({ name: "Twitter", url: data.twitter.startsWith('http') ? data.twitter : `https://${data.twitter}`, icon: "fab fa-twitter" });
        if (data.instagram) links.push({ name: "Instagram", url: data.instagram.startsWith('http') ? data.instagram : `https://${data.instagram}`, icon: "fab fa-instagram" });
        
        setProfile(prev => ({
          ...prev,
          name: data.name || "Devraj Solanki",
          socialLinks: links.length > 0 ? links : prev.socialLinks
        }));
      } catch (err) {
        console.error("Footer profile fetch failed", err);
      }
    };
    getProfile();
  }, []);

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-column brand-col">
                        <h2 className="footer-logo">{profile.name}</h2>
                        <span className="footer-subtitle">Full Stack Developer</span>
                        <p className="footer-description">
                            Engineering robust full-stack solutions with a focus on scalability, performance, and seamless user experiences.
                        </p>
                        <div className="footer-contact-actions">
                            <a href="mailto:sdevraj2122@gmail.com" className="footer-email">
                                <i className="fas fa-paper-plane"></i> Let's Build Something
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column links-col">
                        <h4 className="footer-title">Navigation</h4>
                        <ul className="footer-links">
                            <li><a href="#hero">Genesis</a></li>
                            <li><a href="#about">The Creator</a></li>
                            <li><a href="#services">Specialities</a></li>
                            <li><a href="#portfolio-projects">Showcase</a></li>
                            <li><a href="#contact">Bridge</a></li>
                        </ul>
                    </div>

                    {/* Social Section */}
                    <div className="footer-column social-col">
                        <h4 className="footer-title">Connect</h4>
                        <p className="footer-subtext">Follow my digital footprint across the web.</p>
                        <div className="social-icon-grid">
                            {profile.socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon-box"
                                    aria-label={social.name}
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <p>© {year} <span>{profile.name}</span>. Built with ⚡ in India.</p>
                    </div>
                    <div className="footer-credits">
                        <p>Designed for Excellence</p>
                    </div>
                </div>
            </div>
            
            {/* Ambient Background Blur */}
            <div className="footer-blur"></div>
        </footer>
    );
};

export default Footer;
