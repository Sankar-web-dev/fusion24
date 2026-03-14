import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import heroImg from '../assets/images/hero.png';
import interiorImg from '../assets/images/interior.png';
import trainingImg from '../assets/images/training.png';
import equipmentImg from '../assets/images/equipment.png';
import './About.css';

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

function Counter({ end, suffix = '' }) {
    const ref = useRef(null);
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
            { threshold: 0.3 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    useEffect(() => {
        if (!started) return;
        let s = 0;
        const step = (ts) => {
            if (!s) s = ts;
            const p = Math.min((ts - s) / 2000, 1);
            setCount(Math.floor(p * end));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [started, end]);
    return <span ref={ref}>{count}{suffix}</span>;
}

const values = [
    { title: 'Excellence', desc: 'We maintain the highest standards in equipment, training, and customer service.' },
    { title: 'Community', desc: 'Building a supportive fitness family where everyone motivates each other.' },
    { title: 'Innovation', desc: 'Constantly evolving our programs with the latest fitness science and technology.' },
    { title: 'Results', desc: 'We measure success by the transformations and achievements of our members.' },
];

const timeline = [
    { year: '2019', title: 'Founded', desc: 'Fusion 24 Fitness Studio opens its doors in Avadi, Chennai.' },
    { year: '2020', title: 'BB Combat Academy', desc: 'Launched the combat training wing with MMA and kickboxing programs.' },
    { year: '2022', title: '2000+ Members', desc: 'Crossed the milestone of 2000 active members.' },
    { year: '2024', title: 'Expansion', desc: 'Major facility upgrade with new equipment and expanded training areas.' },
];

export default function About() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="about-page">
            {/* Hero Banner */}
            <section className="page-hero">
                <div className="page-hero-bg">
                    <img src={heroImg} alt="About" />
                    <div className="page-hero-overlay" />
                </div>
                <div className="container page-hero-content">
                    <span className="section-label">About Us</span>
                    <h1 className="page-hero-title">OUR STORY</h1>
                    <p className="page-hero-subtitle">The journey behind Avadi's most premium fitness destination.</p>
                </div>
            </section>

            {/* Main About */}
            <section className="section">
                <div className="container">
                    <div className="about-main-grid">
                        <AnimateIn className="about-main-image">
                            <img src={interiorImg} alt="Gym Interior" />
                        </AnimateIn>
                        <div className="about-main-content">
                            <AnimateIn>
                                <span className="section-label">Who We Are</span>
                                <h2 className="section-title" style={{ textAlign: 'left' }}>
                                    Push Your Limits.<br /><span className="text-red">Transform Your Life.</span>
                                </h2>
                            </AnimateIn>
                            <AnimateIn delay={150}>
                                <p className="about-text">
                                    Founded in Avadi, Fusion 24 Fitness Studio is more than just a gym — it's a complete
                                    fitness ecosystem. Combined with BB Combat Academy, we deliver world-class training
                                    in strength, conditioning, and combat sports.
                                </p>
                                <p className="about-text">
                                    Our mission is to empower every individual to achieve their peak physical potential
                                    through expert coaching, cutting-edge equipment, and an unshakeable community spirit.
                                    We believe fitness is not just about the body — it's about building mental toughness,
                                    confidence, and a lifestyle of excellence.
                                </p>
                            </AnimateIn>
                            <AnimateIn delay={300}>
                                <div className="about-checks">
                                    {['24/7 Gym Access', 'Expert Certified Trainers', 'Professional Combat Training', 'Modern Premium Equipment'].map((c) => (
                                        <div key={c} className="about-check"><FiCheck /> <span>{c}</span></div>
                                    ))}
                                </div>
                            </AnimateIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="section section-dark">
                <div className="container">
                    <div className="about-stats-grid">
                        {[
                            { num: 5, suffix: '+', label: 'Years Experience' },
                            { num: 3000, suffix: '+', label: 'Happy Clients' },
                            { num: 35, suffix: '+', label: 'Expert Trainers' },
                            { num: 1000, suffix: '+', label: 'Instagram Followers' },
                        ].map((s, i) => (
                            <AnimateIn key={s.label} delay={i * 100}>
                                <div className="about-stat-card glass-card">
                                    <div className="about-stat-num"><Counter end={s.num} suffix={s.suffix} /></div>
                                    <div className="about-stat-label">{s.label}</div>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <AnimateIn>
                            <span className="section-label">Our Values</span>
                            <h2 className="section-title">WHAT DRIVES US</h2>
                        </AnimateIn>
                    </div>
                    <div className="values-grid">
                        {values.map((v, i) => (
                            <AnimateIn key={v.title} delay={i * 120}>
                                <div className="value-card glass-card">
                                    <div className="value-number">{String(i + 1).padStart(2, '0')}</div>
                                    <h3 className="value-title">{v.title}</h3>
                                    <p className="value-desc">{v.desc}</p>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section section-dark">
                <div className="container">
                    <div className="section-header">
                        <AnimateIn>
                            <span className="section-label">Our Journey</span>
                            <h2 className="section-title">MILESTONES</h2>
                        </AnimateIn>
                    </div>
                    <div className="timeline">
                        {timeline.map((t, i) => (
                            <AnimateIn key={t.year} delay={i * 150}>
                                <div className="timeline-item">
                                    <div className="timeline-year">{t.year}</div>
                                    <div className="timeline-dot" />
                                    <div className="timeline-content glass-card">
                                        <h3>{t.title}</h3>
                                        <p>{t.desc}</p>
                                    </div>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery CTA */}
            <section className="section about-gallery-preview">
                <div className="container">
                    <div className="gallery-preview-grid">
                        {[interiorImg, trainingImg, equipmentImg, heroImg].map((img, i) => (
                            <AnimateIn key={i} delay={i * 100}>
                                <div className="gallery-preview-item">
                                    <img src={img} alt="Gym" />
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 40 }}>
                        <AnimateIn>
                            <Link to="/gallery" className="btn btn-primary">View Full Gallery <FiArrowRight /></Link>
                        </AnimateIn>
                    </div>
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
                        <h2 className="cta-title">READY TO JOIN THE FUSION FAMILY?</h2>
                        <p className="cta-subtitle">Start your fitness journey with Avadi's best gym today.</p>
                        <div className="btn-group" style={{ justifyContent: 'center' }}>
                            <Link to="/contact" className="btn btn-primary">Join Now <FiArrowRight /></Link>
                            <Link to="/contact" className="btn btn-secondary">Book Free Trial</Link>
                        </div>
                    </AnimateIn>
                </div>
            </section>
        </div>
    );
}
