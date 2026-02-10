'use client';

import React, { useState, useEffect, useRef } from 'react';
import { experiences } from '../../data/portfolioData';
import './Experience.css';

const Experience: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeCard, setActiveCard] = useState<string | null>(null);
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
        <div className={`experience-page ${isVisible ? 'visible' : ''}`} ref={containerRef}>
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
            <header className="experience-hero">
                <div className="hero-badge">PROFESSIONAL JOURNEY</div>
                <h1 className="hero-title">
                    <span className="title-line gradient-text">Experience</span>
                </h1>
                <p className="hero-description">
                    A timeline of my professional growth and the products I&apos;ve built
                </p>
            </header>

            {/* Work Experience Section */}
            <section className="content-section">
                <div className="section-header">
                    <div className="section-indicator" style={{ background: 'linear-gradient(135deg, #00D6FF 0%, #0050FF 100%)' }} />
                    <h2 className="section-title">Work Experience</h2>
                    <div className="section-line" />
                </div>

                <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                        <div 
                            key={exp.company}
                            className={`experience-card ${activeCard === exp.company ? 'active' : ''}`}
                            onMouseEnter={() => setActiveCard(exp.company)}
                            onMouseLeave={() => setActiveCard(null)}
                            style={{ '--gradient': exp.gradient, '--delay': `${index * 0.1}s` } as React.CSSProperties}
                        >
                            <div className="card-glow" />
                            <div className="card-border" />
                            
                            <div className="card-header">
                                <div className="company-info">
                                    <h3 className="company-name">{exp.company}</h3>
                                    <span className="role">{exp.role}</span>
                                </div>
                                <div className="duration-badge">
                                    <span className="duration-dot" />
                                    {exp.duration}
                                </div>
                            </div>

                            <ul className="description-list">
                                {exp.description.map((item, i) => (
                                    <li key={i}>
                                        <span className="list-marker">→</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="tech-stack">
                                {exp.technologies.map((tech, i) => (
                                    <span key={i} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Experience;
