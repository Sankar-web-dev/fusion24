import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import {
    FiActivity, FiShield, FiUser, FiUsers, FiClock, FiAward, FiStar,
} from 'react-icons/fi';
import { GiBoxingGlove, GiWeightLiftingUp } from 'react-icons/gi';
import heroImg from '../assets/images/hero.png';
import trainingImg from '../assets/images/training.png';
import combatImg from '../assets/images/combat.png';
import equipmentImg from '../assets/images/equipment.png';
import groupImg from '../assets/images/group-class.png';
import interiorImg from '../assets/images/interior.png';
import './Services.css';

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

const services = [
    { icon: <FiActivity />, title: 'Weight Loss Programs', desc: 'Scientifically structured fat burn programs combining HIIT, strength training, and personalized nutrition plans for maximum results.', img: trainingImg },
    { icon: <GiWeightLiftingUp />, title: 'Strength Training', desc: 'Build raw strength with progressive overload methodology, compound lifts, and expert form guidance from certified coaches.', img: equipmentImg },
    { icon: <FiShield />, title: 'Functional Training', desc: 'Improve movement patterns, core stability, and athletic performance with versatile functional exercises.', img: groupImg },
    { icon: <FiActivity />, title: 'Cardio Training', desc: 'Heart-pumping cardio sessions using top-of-the-line treadmills, ellipticals, rowing machines, and cycling equipment.', img: interiorImg },
    { icon: <GiWeightLiftingUp />, title: 'Powerlifting', desc: 'Master the squat, bench press, and deadlift with specialized coaching and competition-grade equipment.', img: equipmentImg },
    { icon: <GiBoxingGlove />, title: 'Combat Training', desc: 'MMA, kickboxing, and boxing training through BB Combat Academy with experienced combat sports coaches.', img: combatImg },
    { icon: <FiShield />, title: 'Self Defense Training', desc: 'Practical self-defense skills for real-world situations, ideal for all ages and fitness levels.', img: combatImg },
    { icon: <FiUser />, title: 'Personal Training', desc: 'Dedicated 1-on-1 coaching sessions with customized programs designed specifically for your body and goals.', img: trainingImg },
    { icon: <FiUsers />, title: 'Group Fitness Classes', desc: 'High-energy, social group workouts including bootcamp, HIIT, yoga, and dance fitness for all levels.', img: groupImg },
];

const pricing = [
    {
        name: 'Basic',
        price: '1,499',
        period: '/month',
        features: ['Full Gym Access', 'Locker Room', 'Free Parking', 'Basic Equipment', 'Open 24/7'],
        popular: false,
    },
    {
        name: 'Premium',
        price: '2,999',
        period: '/month',
        features: ['Everything in Basic', 'Group Classes', 'Diet Consultation', 'Progress Tracking', 'Steam & Sauna', 'Priority Support'],
        popular: true,
    },
    {
        name: 'Elite',
        price: '4,999',
        period: '/month',
        features: ['Everything in Premium', 'Personal Trainer', 'Combat Training', 'Nutrition Plan', 'Recovery Sessions', 'VIP Access', '1-on-1 Coaching'],
        popular: false,
    },
];

export default function Services() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="services-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-bg">
                    <img src={heroImg} alt="Services" />
                    <div className="page-hero-overlay" />
                </div>
                <div className="container page-hero-content">
                    <span className="section-label">What We Offer</span>
                    <h1 className="page-hero-title">OUR SERVICES</h1>
                    <p className="page-hero-subtitle">World-class training programs designed for every fitness goal.</p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section">
                <div className="container">
                    <div className="services-page-grid">
                        {services.map((s, i) => (
                            <AnimateIn key={s.title} delay={i * 80}>
                                <div className="service-page-card">
                                    <div className="spc-image">
                                        <img src={s.img} alt={s.title} />
                                        <div className="spc-image-overlay" />
                                    </div>
                                    <div className="spc-content">
                                        <div className="spc-icon">{s.icon}</div>
                                        <h3 className="spc-title">{s.title}</h3>
                                        <p className="spc-desc">{s.desc}</p>
                                        <Link to="/contact" className="spc-link">
                                            Get Started <FiArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section section-dark">
                <div className="container">
                    <div className="section-header">
                        <AnimateIn>
                            <span className="section-label">Why Choose Us</span>
                            <h2 className="section-title">THE FUSION DIFFERENCE</h2>
                        </AnimateIn>
                    </div>
                    <div className="why-grid">
                        {[
                            { icon: <FiClock />, title: '24/7 Availability', desc: 'Train any time that suits your schedule.' },
                            { icon: <FiAward />, title: 'Certified Experts', desc: 'All trainers are nationally certified professionals.' },
                            { icon: <FiStar />, title: 'Premium Equipment', desc: 'Latest equipment from global fitness brands.' },
                            { icon: <FiShield />, title: 'Safe Environment', desc: 'Sanitized, secure, and welcoming atmosphere.' },
                        ].map((w, i) => (
                            <AnimateIn key={w.title} delay={i * 100}>
                                <div className="why-card glass-card">
                                    <div className="why-icon">{w.icon}</div>
                                    <h3>{w.title}</h3>
                                    <p>{w.desc}</p>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing on Services page */}
            <section className="section pricing-section">
                <div className="container">
                    <div className="section-header">
                        <AnimateIn>
                            <span className="section-label">Membership</span>
                            <h2 className="section-title">CHOOSE YOUR PLAN</h2>
                            <p className="section-subtitle">Flexible plans designed to fit your fitness journey and budget.</p>
                        </AnimateIn>
                    </div>
                    <div className="pricing-grid">
                        {pricing.map((p, i) => (
                            <AnimateIn key={p.name} delay={i * 150}>
                                <div className={`pricing-card glass-card ${p.popular ? 'popular' : ''}`}>
                                    {p.popular && <div className="popular-badge">Most Popular</div>}
                                    <h3 className="pricing-name">{p.name}</h3>
                                    <div className="pricing-price">
                                        <span className="currency">₹</span>
                                        <span className="amount">{p.price}</span>
                                        <span className="period">{p.period}</span>
                                    </div>
                                    <ul className="pricing-features">
                                        {p.features.map((f) => (
                                            <li key={f}><FiCheck /> {f}</li>
                                        ))}
                                    </ul>
                                    <Link to="/contact" className={`btn ${p.popular ? 'btn-primary' : 'btn-secondary'} pricing-btn`}>
                                        Join Now
                                    </Link>
                                </div>
                            </AnimateIn>
                        ))}
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
                        <h2 className="cta-title">START YOUR TRANSFORMATION TODAY</h2>
                        <p className="cta-subtitle">Join Fusion 24 and unlock your full potential.</p>
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
