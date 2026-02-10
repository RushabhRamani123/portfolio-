'use client';

import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Image from 'next/image';
import { achievements } from '../../data/portfolioData';
import './Achievements.css';

const Achievements: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);

    // Initialize Lenis smooth scrolling
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        
        // Trigger entrance animation
        setTimeout(() => setIsVisible(true), 100);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Auto-rotate main image
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveImageIndex((prev) => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

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
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const achievement = achievements[0];

    return (
        <div className={`achievements-page ${isVisible ? 'visible' : ''}`} ref={containerRef}>
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
            <section className="achievements-hero" ref={heroRef}>
                <div className="hero-content">
                    <div className="hero-text">
                        <span className="hero-badge">
                            {achievement.event.toUpperCase()}
                        </span>
                        <h1 className="hero-title">
                            <span className="title-line slide-up">{achievement.title}</span>
                            <span className="title-line slide-up delay-1">
                                <span className="gradient-text">Victory</span>
                            </span>
                        </h1>
                        <p className="hero-description slide-up delay-2">
                            Celebrating excellence in competitive programming 
                            and innovative problem-solving at {achievement.event}.
                        </p>
                        
                        {/* Quick Stats */}
                        <div className="hero-stats slide-up delay-3">
                            {achievement.stats.map((stat, idx) => (
                                <div key={idx} className="hero-stat">
                                    <div className="stat-icon-wrapper">
                                        <Image 
                                            src={stat.icon} 
                                            alt={stat.label}
                                            className="stat-icon-img"
                                            width={24}
                                            height={24}
                                            unoptimized
                                        />
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-value">{stat.value}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hero Image Showcase */}
                    <div className="hero-showcase slide-up delay-2">
                        <div className="showcase-frame">
                            <div className="frame-glow" />
                            <div className="main-image-container">
                                {achievement.images.map((img, idx) => (
                                    <Image 
                                        key={idx}
                                        src={img.src} 
                                        alt={img.alt}
                                        className={`main-image ${idx === activeImageIndex ? 'active' : ''}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                ))}
                                <div className="image-indicators">
                                    {achievement.images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            className={`indicator ${idx === activeImageIndex ? 'active' : ''}`}
                                            onClick={() => setActiveImageIndex(idx)}
                                        />
                                    ))}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>

    
        </div>
    );
};

export default Achievements;
