import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FiClock, FiAward, FiActivity, FiShield, FiUser, FiUsers,
    FiStar, FiArrowRight, FiChevronLeft, FiChevronRight, FiCheck,
} from 'react-icons/fi';
import { GiBoxingGlove, GiWeightLiftingUp } from 'react-icons/gi';
import heroImg from '../assets/images/hero.png';
import trainingImg from '../assets/images/training.png';
import interiorImg from '../assets/images/interior.png';
import combatImg from '../assets/images/combat.png';
import groupImg from '../assets/images/group-class.png';
import equipmentImg from '../assets/images/equipment.png';
import './Home.css';

/* ─── Counter component ─── */
function Counter({ end, suffix = '' }) {
    const ref = useRef(null);
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setStarted(true); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;
        let start = 0;
        const duration = 2000;
        const step = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            setCount(Math.floor(p * end));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [started, end]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Animate on scroll wrapper ─── */
function AnimateIn({ children, delay = 0, className = '' }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`animate-in ${visible ? 'visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

/* ─── DATA ─── */
const features = [
    { icon: <FiClock />, title: '24/7 Access', desc: 'Train anytime. Our gym never closes, giving you the freedom to work out on your schedule.' },
    { icon: <FiAward />, title: 'Certified Trainers', desc: 'Expert certified trainers guiding you to achieve your fitness goals effectively.' },
    { icon: <FiActivity />, title: 'Modern Equipment', desc: 'State-of-the-art equipment from top global fitness brands for every workout.' },
    { icon: <GiBoxingGlove />, title: 'Combat Academy', desc: 'BB Combat Academy for MMA, kickboxing, and self-defense training programs.' },
    { icon: <FiUser />, title: 'Personal Training', desc: 'One-on-one coaching sessions tailored to your specific fitness objectives.' },
    { icon: <FiUsers />, title: 'Group Classes', desc: 'High-energy group classes that keep you motivated and pushed to your limits.' },
];

const services = [
    { icon: <FiActivity />, title: 'Weight Loss Programs', desc: 'Scientifically structured fat burn programs with diet guidance.' },
    { icon: <GiWeightLiftingUp />, title: 'Strength Training', desc: 'Build raw strength with progressive overload methodology.' },
    { icon: <FiShield />, title: 'Functional Training', desc: 'Improve daily movement patterns and athletic performance.' },
    { icon: <FiActivity />, title: 'Cardio Training', desc: 'Heart-pumping cardio sessions to boost endurance.' },
    { icon: <GiWeightLiftingUp />, title: 'Powerlifting', desc: 'Squat, bench, deadlift — master the big three.' },
    { icon: <GiBoxingGlove />, title: 'Combat Training', desc: 'MMA, kickboxing, and boxing with expert coaches.' },
    { icon: <FiShield />, title: 'Self Defense Training', desc: 'Practical self-defense skills for real-world situations.' },
    { icon: <FiUser />, title: 'Personal Training', desc: 'Custom 1-on-1 coaching for accelerated results.' },
    { icon: <FiUsers />, title: 'Group Fitness Classes', desc: 'Fun, social group workouts for all fitness levels.' },
];

const trainers = [
    { name: 'Arun Kumar', spec: 'Strength & Conditioning', exp: '8+ Years', rating: 4.9, img: trainingImg },
    { name: 'Priya Sharma', spec: 'Yoga & Functional Fitness', exp: '6+ Years', rating: 4.8, img: groupImg },
    { name: 'Vikram Singh', spec: 'Combat & MMA Training', exp: '10+ Years', rating: 5.0, img: combatImg },
    { name: 'Deepa Rao', spec: 'Weight Loss Specialist', exp: '5+ Years', rating: 4.7, img: interiorImg },
];

const classes = [
    { title: 'Weight Loss Bootcamp', trainer: 'Arun Kumar', level: 'Intermediate', time: '6:00 AM - 7:00 AM', img: heroImg },
    { title: 'Gymnastics', trainer: 'Priya Sharma', level: 'Beginner', time: '8:00 AM - 9:00 AM', img: groupImg },
    { title: 'Self Defense for Women', trainer: 'Deepa Rao', level: 'All Levels', time: '5:00 PM - 6:00 PM', img: combatImg },
    { title: 'Strength Conditioning', trainer: 'Vikram Singh', level: 'Advanced', time: '7:00 PM - 8:00 PM', img: equipmentImg },
    { title: 'Combat Training', trainer: 'Vikram Singh', level: 'Intermediate', time: '9:00 PM - 10:00 PM', img: combatImg },
];

const testimonials = [
    { name: 'Ravi Shankar', text: 'Fusion 24 Fitness Studio is one of the best gyms in Avadi. The trainers are very professional and the equipment is modern. I\'ve lost 15kg in 3 months!', rating: 5 },
    { name: 'Meena Kumari', text: 'Amazing atmosphere and world-class trainers. The combat training program is exceptional. I feel stronger and more confident than ever.', rating: 5 },
    { name: 'Karthik V.', text: 'The 24/7 access is a game-changer for my schedule. Clean, well-maintained equipment and supportive community. Highly recommended!', rating: 5 },
    { name: 'Sujatha R.', text: 'Best gym experience in Chennai! The personal training sessions are worth every penny. Incredible results in just 2 months.', rating: 5 },
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

/* ─── HOME PAGE ─── */
export default function Home() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="home-page">
            {/* ─── HERO ─── */}
            <section className="hero">
                <div className="hero-bg">
                    <img src={heroImg} alt="Fusion 24 Gym" />
                    <div className="hero-overlay" />
                </div>
                <div className="hero-shapes">
                    <div className="shape shape-1" />
                    <div className="shape shape-2" />
                    <div className="shape shape-3" />
                </div>
                <div className="container hero-content">
                    <span className="hero-label">PREMIUM FITNESS IN AVADI</span>
                    <h1 className="hero-title">
                        Train. <span className="text-red">Transform.</span> Triumph.
                    </h1>
                    <p className="hero-subtitle">
                        Fusion 24 Fitness Studio is a premium 24/7 gym in Avadi offering advanced equipment,
                        expert trainers, and professional combat training programs.
                    </p>
                    <div className="btn-group">
                        <Link to="/contact" className="btn btn-primary">
                            Join Now <FiArrowRight />
                        </Link>
                        <Link to="/contact" className="btn btn-secondary">Book Free Trial</Link>
                    </div>
                </div>
                <div className="hero-scroll-indicator">
                    <div className="scroll-line" />
                </div>
            </section>

            {/* ─── SOCIAL PROOF ─── */}
            <section className="section social-proof">
                <div className="container">
                    <AnimateIn>
                        <div className="proof-rating">
                            <div className="stars">{'★★★★★'}</div>
                            <span>Rated <strong>4.9</strong> by members</span>
                        </div>
                    </AnimateIn>
                    <div className="proof-stats">
                        {[
                            { num: 3000, suffix: '+', label: 'Active Members' },
                            { num: 35, suffix: '+', label: 'Certified Trainers' },
                            { num: 5, suffix: '+', label: 'Years Experience' },
                        ].map((s, i) => (
                            <AnimateIn key={s.label} delay={i * 150}>
                                <div className="stat-card glass-card">
                                    <div className="stat-number">
                                        <Counter end={s.num} suffix={s.suffix} />
                                    </div>
                                    <div className="stat-label">{s.label}</div>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FEATURES ─── */}
            <section className="section section-dark">
                <div className="container">
                    <div className="section-header">
                        <AnimateIn>
                            <span className="section-label">Why Choose Us</span>
                            <h2 className="section-title">THE FUSION ADVANTAGE</h2>
                            <p className="section-subtitle">Experience world-class fitness training with unmatched facilities and expert guidance.</p>
                        </AnimateIn>
                    </div>
                    <div className="features-grid">
                        {features.map((f, i) => (
                            <AnimateIn key={f.title} delay={i * 100}>
                                <div className="feature-card glass-card">
                                    <div className="feature-icon">{f.icon}</div>
                                    <h3 className="feature-title">{f.title}</h3>
                                    <p className="feature-desc">{f.desc}</p>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── ABOUT PREVIEW ─── */}
            <section className="section about-preview">
                <div className="container">
                    <div className="about-grid">
                        <AnimateIn className="about-image-wrap">
                            <div className="about-image">
                                <img src={interiorImg} alt="Gym Interior" />
                                <div className="about-image-badge">
                                    <span className="badge-number">5+</span>
                                    <span className="badge-text">Years of Excellence</span>
                                </div>
                            </div>
                        </AnimateIn>
                        <div className="about-content">
                            <AnimateIn>
                                <span className="section-label">About Us</span>
                                <h2 className="section-title" style={{ textAlign: 'left' }}>
                                    Push Your Limits.<br /><span className="text-red">Transform Your Life.</span>
                                </h2>
                            </AnimateIn>
                            <AnimateIn delay={150}>
                                <p className="about-text">
                                    Founded in Avadi, Fusion 24 Fitness Studio is more than just a gym — it's a movement.
                                    Combined with BB Combat Academy, we offer a complete fitness ecosystem that blends
                                    modern strength training with combat sports excellence.
                                </p>
                                <p className="about-text">
                                    Our mission is to empower every individual to reach their peak physical potential
                                    through world-class training, expert coaching, and a supportive community.
                                </p>
                            </AnimateIn>
                            <AnimateIn delay={300}>
                                <div className="about-stats">
                                    {[
                                        { num: 5, suffix: '+', label: 'Years Experience' },
                                        { num: 3000, suffix: '+', label: 'Happy Clients' },
                                        { num: 35, suffix: '+', label: 'Expert Trainers' },
                                        { num: 1000, suffix: '+', label: 'Instagram Followers' },
                                    ].map((s) => (
                                        <div key={s.label} className="about-stat">
                                            <span className="about-stat-num"><Counter end={s.num} suffix={s.suffix} /></span>
                                            <span className="about-stat-label">{s.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </AnimateIn>
                            <AnimateIn delay={400}>
                                <Link to="/about" className="btn btn-primary">
                                    Discover More <FiArrowRight />
                                </Link>
                            </AnimateIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SERVICES ─── */}
            <section className="section section-dark services-section">
                <div className="container">
                    <div className="section-header">
                        <AnimateIn>
                            <span className="section-label">Our Programs</span>
                            <h2 className="section-title">WORLD-CLASS TRAINING</h2>
                            <p className="section-subtitle">From weight loss to combat sports, we offer comprehensive fitness programs for every goal.</p>
                        </AnimateIn>
                    </div>
                    <div className="services-grid">
                        {services.map((s, i) => (
                            <AnimateIn key={s.title} delay={i * 80}>
                                <div className="service-card glass-card">
                                    <div className="service-icon">{s.icon}</div>
                                    <h3 className="service-title">{s.title}</h3>
                                    <p className="service-desc">{s.desc}</p>
                                    <div className="service-arrow"><FiArrowRight /></div>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                    <div className="services-cta" style={{ textAlign: 'center', marginTop: 40 }}>
                        <AnimateIn>
                            <Link to="/services" className="btn btn-primary">View All Services <FiArrowRight /></Link>
                        </AnimateIn>
                    </div>
                </div>
            </section>

            {/* ─── TRAINERS ─── */}
            <section className="section trainers-section">
                <div className="container">
                    <div className="section-header">
                        <AnimateIn>
                            <span className="section-label">Our Team</span>
                            <h2 className="section-title">MEET OUR EXPERT TRAINERS</h2>
                            <p className="section-subtitle">Our certified professionals are dedicated to helping you achieve your fitness dreams.</p>
                        </AnimateIn>
                    </div>
                    <div className="trainers-grid">
                        {trainers.map((t, i) => (
                            <AnimateIn key={t.name} delay={i * 120}>
                                <div className="trainer-card">
                                    <div className="trainer-image">
                                        <img src={t.img} alt={t.name} />
                                        <div className="trainer-overlay">
                                            <div className="trainer-rating">
                                                <FiStar /> {t.rating}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="trainer-info">
                                        <h3 className="trainer-name">{t.name}</h3>
                                        <p className="trainer-spec">{t.spec}</p>
                                        <span className="trainer-exp">{t.exp} Experience</span>
                                    </div>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── UPCOMING CLASSES ─── */}
            <section className="section section-dark classes-section">
                <div className="container">
                    <div className="section-header">
                        <AnimateIn>
                            <span className="section-label">Schedule</span>
                            <h2 className="section-title">UPCOMING CLASSES</h2>
                            <p className="section-subtitle">Join our exciting classes led by expert trainers.</p>
                        </AnimateIn>
                    </div>
                    <div className="classes-grid">
                        {classes.map((c, i) => (
                            <AnimateIn key={c.title} delay={i * 100}>
                                <div className="class-card">
                                    <div className="class-image">
                                        <img src={c.img} alt={c.title} />
                                        <div className="class-overlay">
                                            <span className="class-level">{c.level}</span>
                                        </div>
                                    </div>
                                    <div className="class-info">
                                        <h3 className="class-title">{c.title}</h3>
                                        <p className="class-trainer">with {c.trainer}</p>
                                        <p className="class-time"><FiClock /> {c.time}</p>
                                    </div>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TESTIMONIALS ─── */}
            <section className="section testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <AnimateIn>
                            <span className="section-label">Testimonials</span>
                            <h2 className="section-title">WHAT OUR MEMBERS SAY</h2>
                        </AnimateIn>
                    </div>
                    <AnimateIn>
                        <div className="testimonial-slider">
                            <button className="test-nav test-prev" onClick={() => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)}>
                                <FiChevronLeft />
                            </button>
                            <div className="testimonial-card glass-card">
                                <div className="test-stars">
                                    {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                                        <FiStar key={i} className="star-filled" />
                                    ))}
                                </div>
                                <p className="test-text">"{testimonials[currentTestimonial].text}"</p>
                                <div className="test-author">
                                    <div className="test-avatar">
                                        {testimonials[currentTestimonial].name.charAt(0)}
                                    </div>
                                    <span className="test-name">{testimonials[currentTestimonial].name}</span>
                                </div>
                                <div className="test-dots">
                                    {testimonials.map((_, i) => (
                                        <button
                                            key={i}
                                            className={`test-dot ${i === currentTestimonial ? 'active' : ''}`}
                                            onClick={() => setCurrentTestimonial(i)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <button className="test-nav test-next" onClick={() => setCurrentTestimonial((p) => (p + 1) % testimonials.length)}>
                                <FiChevronRight />
                            </button>
                        </div>
                    </AnimateIn>
                </div>
            </section>

            {/* ─── PRICING ─── */}
            <section className="section section-dark pricing-section">
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

            {/* ─── CTA ─── */}
            <section className="cta-section">
                <div className="cta-bg">
                    <img src={trainingImg} alt="Training" />
                    <div className="cta-overlay" />
                </div>
                <div className="container cta-content">
                    <AnimateIn>
                        <h2 className="cta-title">READY TO TRANSFORM YOUR BODY?</h2>
                        <p className="cta-subtitle">Join Avadi's most premium fitness studio and start your transformation today.</p>
                        <div className="btn-group" style={{ justifyContent: 'center' }}>
                            <Link to="/contact" className="btn btn-primary">
                                Join Now <FiArrowRight />
                            </Link>
                            <Link to="/contact" className="btn btn-secondary">Book Free Trial</Link>
                        </div>
                    </AnimateIn>
                </div>
            </section>
        </div>
    );
}
