'use client';

import React from 'react';
import './PortfolioSection.css';

interface PortfolioSectionProps {
    title: string;
    subtitle: string;
    alignment: 'left' | 'center' | 'right';
    visible: boolean;
    accentColor?: string;
    overline?: string;
    children?: React.ReactNode;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
    title,
    subtitle,
    alignment,
    visible,
    overline,
    children
}) => {
    return (
        <section className={`portfolio-section portfolio-align-${alignment} ${visible ? 'visible' : ''}`}>
            <div className="portfolio-content">
                <div className="decorative-glow"></div>

                {/* Tech Accents */}
                <div className="corner-accent top-left"></div>
                <div className="corner-accent top-right"></div>
                <div className="corner-accent bottom-left"></div>
                <div className="corner-accent bottom-right"></div>
                <div className="tech-decoration">SYS_OP: {alignment.toUpperCase()}</div>

                <div className="content-inner">
                    {overline && <span className="portfolio-overline">{overline}</span>}
                    <h2 className="portfolio-title">
                        {title}
                    </h2>
                    <p className="portfolio-subtitle">
                        {subtitle}
                    </p>
                    {children && <div className="portfolio-extra-content">{children}</div>}
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;
