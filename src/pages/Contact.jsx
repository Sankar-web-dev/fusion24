import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight, FiSend } from 'react-icons/fi';
import heroImg from '../assets/images/hero.png';
import trainingImg from '../assets/images/training.png';
import './Contact.css';

function AnimateIn({ children, delay = 0, className = '' }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.1 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return (
        <div ref={ref} className={`animate-in ${visible ? 'visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}>{children}</div>
    );
}

const contactInfo = [
    {
        icon: <FiMapPin />,
        title: 'Our Address',
        lines: ['4445+F7H, Vasantham Nagar Main Rd', 'Ram Nagar, Avadi', 'Tamil Nadu 600054'],
    },
    {
        icon: <FiPhone />,
        title: 'Phone Number',
        lines: ['+91 8870212424'],
        link: 'tel:+918870212424',
    },
    {
        icon: <FiMail />,
        title: 'Email Address',
        lines: ['giridoctor001@gmail.com'],
        link: 'mailto:giridoctor001@gmail.com',
    },
    {
        icon: <FiClock />,
        title: 'Opening Hours',
        lines: ['Monday to Sunday', '5:00 AM – 11:00 PM'],
    },
];

const serviceOptions = [
    'Personal Training',
    'Group Classes',
    'Weight Loss Program',
    'Strength Training',
    'Combat Training',
    'Self Defense Training',
    'Membership Inquiry',
    'Other',
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', service: '', message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="contact-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-bg">
                    <img src={heroImg} alt="Contact" />
                    <div className="page-hero-overlay" />
                </div>
                <div className="container page-hero-content">
                    <span className="section-label">Get In Touch</span>
                    <h1 className="page-hero-title">CONTACT US</h1>
                    <p className="page-hero-subtitle">We'd love to hear from you. Reach out and start your fitness journey.</p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="section">
                <div className="container">
                    <div className="contact-info-grid">
                        {contactInfo.map((c, i) => (
                            <AnimateIn key={c.title} delay={i * 100}>
                                <div className="contact-info-card glass-card">
                                    <div className="contact-info-icon">{c.icon}</div>
                                    <h3 className="contact-info-title">{c.title}</h3>
                                    {c.lines.map((line, j) => (
                                        c.link ? (
                                            <a key={j} href={c.link} className="contact-info-line link">{line}</a>
                                        ) : (
                                            <p key={j} className="contact-info-line">{line}</p>
                                        )
                                    ))}
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form + Image */}
            <section className="section section-dark">
                <div className="container">
                    <div className="contact-form-grid">
                        <AnimateIn>
                            <div className="contact-form-wrap glass-card">
                                <h2 className="contact-form-title">Send Us a Message</h2>
                                <p className="contact-form-subtitle">Fill in the form and we'll get back to you within 24 hours.</p>

                                {submitted && (
                                    <div className="form-success">
                                        ✓ Thank you! Your message has been sent successfully.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name">Your Name</label>
                                            <input
                                                type="text" id="name" name="name" placeholder="John Doe"
                                                value={formData.name} onChange={handleChange} required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Your Email</label>
                                            <input
                                                type="email" id="email" name="email" placeholder="john@example.com"
                                                value={formData.email} onChange={handleChange} required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input
                                                type="tel" id="phone" name="phone" placeholder="+91 XXXXX XXXXX"
                                                value={formData.phone} onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="service">Select Service</label>
                                            <select
                                                id="service" name="service"
                                                value={formData.service} onChange={handleChange}
                                            >
                                                <option value="">Choose a service...</option>
                                                {serviceOptions.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Your Message</label>
                                        <textarea
                                            id="message" name="message" rows="5"
                                            placeholder="Tell us about your fitness goals..."
                                            value={formData.message} onChange={handleChange} required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary form-submit-btn">
                                        <FiSend /> Send Message Now
                                    </button>
                                </form>
                            </div>
                        </AnimateIn>

                        <AnimateIn delay={200} className="contact-form-image">
                            <img src={trainingImg} alt="Fitness Training" />
                        </AnimateIn>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="section map-section">
                <div className="container">
                    <div className="section-header">
                        <AnimateIn>
                            <span className="section-label">Find Us</span>
                            <h2 className="section-title">OUR LOCATION</h2>
                        </AnimateIn>
                    </div>
                    <AnimateIn>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0!2d80.1!3d13.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA2JzAwLjAiTiA4MMKwMDYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                                width="100%"
                                height="450"
                                style={{ border: 0, borderRadius: 'var(--radius-md)' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Fusion 24 Fitness Studio Location"
                            />
                        </div>
                    </AnimateIn>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="cta-bg">
                    <img src={trainingImg} alt="Training" />
                    <div className="cta-overlay" />
                </div>
                <div className="container cta-content">
                    <AnimateIn>
                        <h2 className="cta-title">READY TO TRANSFORM YOUR BODY?</h2>
                        <p className="cta-subtitle">Join Fusion 24 and take the first step towards a stronger you.</p>
                        <div className="btn-group" style={{ justifyContent: 'center' }}>
                            <Link to="/contact" className="btn btn-primary">Join Now <FiArrowRight /></Link>
                            <a href="tel:+918870212424" className="btn btn-secondary">Call Us Now</a>
                        </div>
                    </AnimateIn>
                </div>
            </section>
        </div>
    );
}
