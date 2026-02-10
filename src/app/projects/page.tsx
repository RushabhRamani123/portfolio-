'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { projects } from '../../data/portfolioData';
import './Projects.css';

const Projects: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeCard, setActiveCard] = useState<string | null>(null);
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        // Trigger entrance animation
        setTimeout(() => setIsVisible(true), 100);
        
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className={`projects-page ${isVisible ? 'visible' : ''}`} ref={containerRef}>
            {/* Dynamic Background Effects */}
            <div className="bg-effects">
                <div 
                    className="ambient-glow"
                    style={{
                        background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 214, 255, 0.12), transparent 40%)`
                    }}
                />
                <div className="grid-overlay" />
                <div className="gradient-orbs">
                    <div className="orb orb-1" />
                    <div className="orb orb-2" />
                    <div className="orb orb-3" />
                </div>
            </div>

            {/* Animated Lines */}
            <div className="animated-lines">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="line" style={{ animationDelay: `${i * 0.5}s` }} />
                ))}
            </div>

            {/* Hero Section */}
            <section className="projects-hero">
                <span className="hero-badge">PORTFOLIO</span>
                <h1 className="hero-title">
                    <span className="title-line">Featured</span>
                    <span className="title-line gradient-text">Projects</span>
                </h1>
                <p className="hero-description">
                    Full-stack applications built with modern technologies, 
                    focusing on scalability, real-time features, and seamless user experiences.
                </p>
            </section>

            {/* Projects Grid */}
            <section className="projects-container">
                {projects.map((project, index) => (
                    <article 
                        key={project.title}
                        className={`project-card ${activeCard === project.title ? 'active' : ''}`}
                        onMouseEnter={() => setActiveCard(project.title)}
                        onMouseLeave={() => setActiveCard(null)}
                        style={{ 
                            animationDelay: `${index * 0.15}s`,
                            '--card-gradient': project.gradient 
                        } as React.CSSProperties}
                    >
                        {/* Card Glow Effect */}
                        <div className="card-glow" style={{ background: project.gradient }} />
                        
                        {/* Project Image */}
                        <div className="project-image-container">
                            <Image 
                                src={project.image} 
                                alt={project.title}
                                className="project-image"
                                width={800}
                                height={500}
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                            <div className="image-overlay" style={{ background: project.gradient }} />
                        </div>

                        {/* Project Content */}
                        <div className="project-content">
                            <div className="project-header">
                                <h2 className="project-title">{project.title}</h2>
                                <a 
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="github-link"
                                >
                                    <svg viewBox="0 0 24 24" className="github-icon">
                                        <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    <span>View Code</span>
                                </a>
                            </div>

                            {/* Description */}
                            <ul className="project-description">
                                {project.description.map((point, i) => (
                                    <li key={i} className="description-point">
                                        <span className="point-bullet" style={{ background: project.gradient }} />
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            {/* Technologies */}
                            <div className="project-technologies">
                                <span className="tech-label">Built with</span>
                                <div className="tech-tags">
                                    {project.technologies.map((tech) => (
                                        <span 
                                            key={tech}
                                            className={`tech-tag ${hoveredTech === tech ? 'active' : ''}`}
                                            onMouseEnter={() => setHoveredTech(tech)}
                                            onMouseLeave={() => setHoveredTech(null)}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="card-border" />
                        <div className="card-shine" />
                    </article>
                ))}
            </section>

        
        </div>
    );
};

export default Projects;
