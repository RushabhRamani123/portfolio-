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
                {overline && <span className="portfolio-overline">{overline}</span>}
                <h2 className="portfolio-title">
                    {title}
                </h2>
                <p className="portfolio-subtitle">
                    {subtitle}
                </p>
                {children && <div className="portfolio-extra-content">{children}</div>}
            </div>
        </section>
    );
};

export default PortfolioSection;
