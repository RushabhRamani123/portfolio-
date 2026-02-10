'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [mobileMenuOpen]);

    const navItems = [
        { name: 'About', path: '/' },
        { name: 'Experience', path: '/experience' },
        { name: 'Skills', path: '/skills' },
        { name: 'Projects', path: '/projects' },
        { name: 'Achievements', path: '/achievements' },
    ];

    return (
        <>
            <nav className={`sony-nav ${scrolled ? 'visible' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
                <div className="nav-container">
                    <Link href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
                        <span>RUSHABH</span>
                        <span style={{ fontWeight: 400, opacity: 0.4, margin: '0 8px' }}>|</span>
                        <span style={{ fontWeight: 600 }}>RAMANI</span>
                    </Link>

                    <div className="desktop-links">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`nav-link ${pathname === item.path ? 'active' : ''}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="nav-actions">
                        <Link href="/contact" className="nav-cta-button">
                            Contact Me
                        </Link>

                        <button
                            className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Menu"
                        >
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-nav-links">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={pathname === item.path ? 'active' : ''}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;
