'use client';

import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        body: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
                setFormData({ name: '', email: '', subject: '', body: '' });
            } else {
                setSubmitStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' });
            }
        } catch {
            setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`contact-page ${isVisible ? 'visible' : ''}`} ref={containerRef}>
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
            <header className="contact-hero">
                <div className="hero-badge">GET IN TOUCH</div>
                <h1 className="hero-title">
                    <span className="title-line">Let&apos;s Work</span>
                    <span className="title-line gradient-text">Together</span>
                </h1>
                <p className="hero-description">
                    Have a project in mind or just want to say hello? Fill out the form below and I&apos;ll get back to you as soon as possible.
                </p>
            </header>

            {/* Contact Content */}
            <div className="contact-content">
                {/* Form Section */}
                <section className="form-section">
                    <div className="section-header">
                        <div className="section-indicator" />
                        <h2 className="section-title">Send a Message</h2>
                        <div className="section-line" />
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className={`form-group ${focusedField === 'name' ? 'focused' : ''} ${formData.name ? 'has-value' : ''}`}>
                                <div className="input-glow" />
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Your name"
                                    required
                                />
                            </div>

                            <div className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${formData.email ? 'has-value' : ''}`}>
                                <div className="input-glow" />
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className={`form-group ${focusedField === 'subject' ? 'focused' : ''} ${formData.subject ? 'has-value' : ''}`}>
                            <div className="input-glow" />
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('subject')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="What's this about?"
                                required
                            />
                        </div>

                        <div className={`form-group ${focusedField === 'body' ? 'focused' : ''} ${formData.body ? 'has-value' : ''}`}>
                            <div className="input-glow" />
                            <label htmlFor="body">Message</label>
                            <textarea
                                id="body"
                                name="body"
                                value={formData.body}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('body')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Tell me about your project, idea, or just say hi..."
                                rows={6}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isSubmitting}
                        >
                            <span className="button-text">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                            <span className="button-icon">→</span>
                        </button>

                        {submitStatus && (
                            <div className={`submit-status ${submitStatus.type}`}>
                                {submitStatus.type === 'success' ? '✓' : '✕'} {submitStatus.message}
                            </div>
                        )}
                    </form>
                </section>

                {/* Info Section */}
                <aside className="info-section">
                    <div className="info-card">
                        <div className="card-glow" />
                        <div className="card-border" />

                        <h3 className="info-title">Contact Information</h3>
                        <p className="info-description">
                            Feel free to reach out through any of these channels. I typically respond within 24 hours.
                        </p>

                        <div className="info-items">
                            <div className="info-item">
                                <img
                                    src="https://img.icons8.com/ios-filled/50/ffffff/mail.png"
                                    alt="Email"
                                    className="info-icon-img"
                                    style={{ width: '24px', marginRight: '12px' }}
                                />
                                <div className="info-content">
                                    <span className="info-label">Email</span>
                                    <a href="mailto:rushabhramani16@gmail.com">rushabhramani16@gmail.com</a>
                                </div>
                            </div>

                            <div className="info-item">
                                <img
                                    src="https://img.icons8.com/ios-filled/50/ffffff/phone.png"
                                    alt="Phone"
                                    className="info-icon-img"
                                    style={{ width: '24px', marginRight: '12px' }}
                                />
                                <div className="info-content">
                                    <span className="info-label">Phone</span>
                                    <a href="tel:+919082070031">+91-9082070031</a>
                                </div>
                            </div>
                        </div>
                        <div className="social-section">
                            <span className="social-label">Find me on</span>
                            <div className="social-links">
                                <a href="https://github.com/RushabhRamani123" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <span className="social-icon">GitHub</span>
                                </a>
                                <a href="https://www.linkedin.com/in/rushabh-ramani-16jan2004/" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <span className="social-icon">LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
