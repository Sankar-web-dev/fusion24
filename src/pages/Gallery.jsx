import { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/images/hero.png';
import trainingImg from '../assets/images/training.png';
import interiorImg from '../assets/images/interior.png';
import combatImg from '../assets/images/combat.png';
import groupImg from '../assets/images/group-class.png';
import equipmentImg from '../assets/images/equipment.png';
import './Gallery.css';

function AnimateIn({ children, delay = 0, className = '' }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.05 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return (
        <div ref={ref} className={`animate-in ${visible ? 'visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}>{children}</div>
    );
}

const categories = ['All', 'Gym Interior', 'Workout Sessions', 'Equipment', 'Combat Training', 'Group Classes'];

const galleryItems = [
    { src: heroImg, category: 'Gym Interior', title: 'Main Training Floor' },
    { src: trainingImg, category: 'Workout Sessions', title: 'Personal Training Session' },
    { src: interiorImg, category: 'Gym Interior', title: 'Cardio Zone' },
    { src: combatImg, category: 'Combat Training', title: 'MMA Training' },
    { src: groupImg, category: 'Group Classes', title: 'Group Fitness Class' },
    { src: equipmentImg, category: 'Equipment', title: 'Premium Equipment' },
    { src: trainingImg, category: 'Workout Sessions', title: 'Strength Training' },
    { src: combatImg, category: 'Combat Training', title: 'Kickboxing Session' },
    { src: heroImg, category: 'Gym Interior', title: 'Training Area' },
    { src: groupImg, category: 'Group Classes', title: 'Bootcamp Class' },
    { src: equipmentImg, category: 'Equipment', title: 'Weight Section' },
    { src: interiorImg, category: 'Gym Interior', title: 'Modern Facilities' },
];

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const filtered = activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter((g) => g.category === activeCategory);

    return (
        <div className="gallery-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-bg">
                    <img src={heroImg} alt="Gallery" />
                    <div className="page-hero-overlay" />
                </div>
                <div className="container page-hero-content">
                    <span className="section-label">Our Space</span>
                    <h1 className="page-hero-title">GALLERY</h1>
                    <p className="page-hero-subtitle">Take a visual tour of Fusion 24 Fitness Studio.</p>
                </div>
            </section>

            {/* Gallery */}
            <section className="section">
                <div className="container">
                    <div className="gallery-filters">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`gallery-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="gallery-masonry">
                        {filtered.map((item, i) => (
                            <AnimateIn key={`${item.title}-${i}`} delay={i * 60}>
                                <div
                                    className="gallery-item"
                                    onClick={() => setLightbox(item)}
                                >
                                    <img src={item.src} alt={item.title} />
                                    <div className="gallery-item-overlay">
                                        <span className="gallery-item-category">{item.category}</span>
                                        <h3 className="gallery-item-title">{item.title}</h3>
                                    </div>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox && (
                <div className="lightbox" onClick={() => setLightbox(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
                        <img src={lightbox.src} alt={lightbox.title} />
                        <div className="lightbox-info">
                            <h3>{lightbox.title}</h3>
                            <p>{lightbox.category}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
