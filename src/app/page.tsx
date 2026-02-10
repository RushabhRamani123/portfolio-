'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import Link from 'next/link';
import FrameCanvas from '../components/FrameCanvas';
import PortfolioSection from '../components/PortfolioSection';
import '../styles/index.css';

export default function About() {
  const targetProgressRef = useRef(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
      lerp: 0.075,
    });

    const updateScroll = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(updateScroll);
    };
    requestAnimationFrame(updateScroll);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const rawProgress = scrollTop / docHeight;
      targetProgressRef.current = Math.min(Math.max(rawProgress, 0), 1);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setSmoothProgress(prev => {
        const diff = targetProgressRef.current - prev;
        if (Math.abs(diff) < 0.0001) return targetProgressRef.current;
        return prev + diff * 0.05;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="app-container" ref={containerRef} style={{ height: '500vh', background: '#000000' }}>
      <FrameCanvas scrollProgress={smoothProgress} />

      <main className="content-overlay">

        {/* 0% - 12% Hero: Introduction */}
        <div style={{ position: 'absolute', top: '20vh', width: '100%' }}>
          <PortfolioSection
            overline="Full Stack Developer"
            title="Rushabh Ramani"
            subtitle="I love building things that live on the internet."
            alignment="center"
            visible={smoothProgress < 0.12}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <a href="https://github.com/RushabhRamani123" target="_blank" rel="noopener noreferrer" className="highlight-badge" style={{ textDecoration: 'none', cursor: 'pointer' }}>GitHub</a>
              <a href="https://www.linkedin.com/in/rushabh-ramani-16jan2004/" target="_blank" rel="noopener noreferrer" className="highlight-badge" style={{ textDecoration: 'none', cursor: 'pointer' }}>LinkedIn</a>
            </div>
          </PortfolioSection>
        </div>

        {/* 12% - 25% About Me */}
        <div style={{ position: 'absolute', top: '100vh', width: '100%' }}>
          <PortfolioSection
            overline="About Me"
            title="Problem Solver"
            subtitle="I enjoy turning complex problems into simple, beautiful solutions."
            alignment="left"
            visible={smoothProgress > 0.12 && smoothProgress < 0.25}
          />
        </div>

        {/* 25% - 40% Passion */}
        <div style={{ position: 'absolute', top: '180vh', width: '100%' }}>
          <PortfolioSection
            overline="What I Do"
            title="Full Stack Development"
            subtitle="I love working across the entire stack — from pixels to databases."
            alignment="right"
            visible={smoothProgress > 0.25 && smoothProgress < 0.40}
          />
        </div>

        {/* 40% - 55% Mindset */}
        <div style={{ position: 'absolute', top: '260vh', width: '100%' }}>
          <PortfolioSection
            overline="Mindset"
            title="Always Learning"
            subtitle="Curious by nature. I constantly explore new technologies and ideas."
            alignment="left"
            visible={smoothProgress > 0.40 && smoothProgress < 0.55}
          />
        </div>

        {/* 55% - 70% Approach */}
        <div style={{ position: 'absolute', top: '340vh', width: '100%' }}>
          <PortfolioSection
            overline="Approach"
            title="Clean Code"
            subtitle="I believe in writing code that's readable, maintainable, and scalable."
            alignment="right"
            visible={smoothProgress > 0.55 && smoothProgress < 0.70}
          />
        </div>

        {/* 70% - 80% Collaboration */}
        <div style={{ position: 'absolute', top: '380vh', width: '100%' }}>
          <PortfolioSection
            overline="Team Player"
            title="Collaboration"
            subtitle="I thrive in teams where ideas flow and everyone grows together."
            alignment="left"
            visible={smoothProgress > 0.70 && smoothProgress < 0.80}
          />
        </div>

        {/* 80% - 100% Contact CTA */}
        <div style={{ position: 'absolute', top: '380vh', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <PortfolioSection
            title="Let's Build Something"
            subtitle="Got a project in mind? Let's talk."
            alignment="center"
            visible={smoothProgress > 0.78}
            overline="Contact"
          />
          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            opacity: smoothProgress > 0.78 ? 1 : 0,
            transform: smoothProgress > 0.78 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: smoothProgress > 0.78 ? 'all' : 'none'
          }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                fontSize: '1rem',
                background: '#0050FF',
                color: 'white',
                border: 'none',
                borderRadius: '99px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0, 80, 255, 0.3)',
                textDecoration: 'none'
              }}
            >
              Say Hello
            </Link>
            <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
              <a href="tel:+919082070031" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', cursor: 'pointer' }}>+91-9082070031</a>
              <a href="https://github.com/RushabhRamani123" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', cursor: 'pointer' }}>GitHub</a>
              <a href="https://www.linkedin.com/in/rushabh-ramani-16jan2004/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', cursor: 'pointer' }}>LinkedIn</a>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
