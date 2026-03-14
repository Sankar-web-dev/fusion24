import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
];

const services = [
    'Personal Training',
    'Group Training',
    'Muscle Building',
    'Combat Training',
    'Weight Training',
];

const socials = [
    { icon: <FaFacebookF />, url: '#', label: 'Facebook' },
    { icon: <FaInstagram />, url: '#', label: 'Instagram' },
    { icon: <FaLinkedinIn />, url: '#', label: 'LinkedIn' },
    { icon: <FaWhatsapp />, url: '#', label: 'WhatsApp' },
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-glow" />
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <span className="logo-text">FUSION</span>
                            <span className="logo-accent">24</span>
                        </Link>
                        <p className="footer-desc">
                            Fusion 24 Fitness Studio is a premium 24/7 gym in Avadi, Chennai
                            offering advanced equipment, expert trainers, and professional
                            combat training programs.
                        </p>
                        <div className="footer-socials">
                            {socials.map((s) => (
                                <a key={s.label} href={s.url} className="social-icon" aria-label={s.label}>
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul>
                            {quickLinks.map((l) => (
                                <li key={l.path}><Link to={l.path}>{l.label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Services</h4>
                        <ul>
                            {services.map((s) => (
                                <li key={s}><span>{s}</span></li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Contact Info</h4>
                        <ul className="footer-contact">
                            <li>
                                <strong>Address:</strong><br />
                                4445+F7H, Vasantham Nagar Main Rd,<br />
                                Ram Nagar, Avadi, TN 600054
                            </li>
                            <li>
                                <strong>Phone:</strong><br />
                                <a href="tel:+918870212424">+91 8870212424</a>
                            </li>
                            <li>
                                <strong>Email:</strong><br />
                                <a href="mailto:giridoctor001@gmail.com">giridoctor001@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Fusion 24 Fitness Studio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
