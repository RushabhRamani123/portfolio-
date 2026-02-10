'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { skillCategories } from '../../data/portfolioData';
import './Skills.css';

const Skills: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeSkill, setActiveSkill] = useState<string | null>(null);
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
        <div className={`skills-page ${isVisible ? 'visible' : ''}`} ref={containerRef}>
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
            <header className="skills-hero">
                <div className="hero-badge">TECHNICAL ARSENAL</div>
                <h1 className="hero-title">
                    <span className="title-line">Skills &</span>
                    <span className="title-line gradient-text">Technologies</span>
                </h1>
                <p className="hero-description">
                    Crafting digital experiences with modern tools and battle-tested technologies
                </p>
            </header>

            {/* Skill Constellation */}
            <div className="constellation-wrapper">
                {skillCategories.map((category) => (
                    <section key={category.name} className="skill-section">
                        <div className="section-header">
                            <div 
                                className="section-indicator"
                                style={{ background: category.gradient }}
                            />
                            <h2 className="section-title">{category.name}</h2>
                            <div className="section-line" />
                        </div>
                        
                        <div className="skills-orbit">
                            {category.skills.map((skill, skillIndex) => (
                                <div
                                    key={skill.name}
                                    className={`skill-node ${activeSkill === skill.name ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveSkill(skill.name)}
                                    onMouseLeave={() => setActiveSkill(null)}
                                    style={{
                                        '--delay': `${skillIndex * 0.1}s`,
                                        '--gradient': category.gradient,
                                    } as React.CSSProperties}
                                >
                                    <div className="node-glow" />
                                    <div className="node-content">
                                        <Image 
                                            src={skill.logo} 
                                            alt={skill.name} 
                                            className="node-logo"
                                            width={20}
                                            height={20}
                                            unoptimized
                                        />
                                        <span className="node-name">{skill.name}</span>
                                    </div>
                                    <div className="node-ring" />
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Skills;
