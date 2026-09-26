import React from 'react';
import { Sparkles, BookOpen, GraduationCap, User, HelpCircle, Mail, Heart } from 'lucide-react';

export default function Footer({ onNavigate, onNavigateToTab }) {
  const handleNav = (target) => {
    if (onNavigate) onNavigate(target);
  };

  const handleTab = (tab) => {
    if (onNavigateToTab) onNavigateToTab(tab);
  };

  const handleAnchor = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">

        {/* Brand column */}
        <div className="footer-col footer-brand-col">
          <div className="footer-brand-row">
            <div className="footer-brand-gem">
              <Sparkles size={16} color="#ffffff" />
            </div>
            <span className="footer-brand-name">
              Create<span>.IT</span>
            </span>
          </div>
          <p className="footer-tagline">
            Multimedia Trends &amp; Design Academy - a prototype for exploring creative courses, learning progression, and a customer experience.
          </p>
          <div className="footer-badge-row">
            <span className="footer-badge">IMY 320</span>
            <span className="footer-badge">2026</span>
            <span className="footer-badge">Prototype</span>
          </div>
        </div>

        {/* Explore column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Explore</h4>
          <ul className="footer-link-list">
            <li>
              <button type="button" onClick={() => handleTab('catalog')}>
                <BookOpen size={14} /> Course Catalog
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleTab('dashboard')}>
                <GraduationCap size={14} /> My Learning
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleTab('customer')}>
                <User size={14} /> Customer Experience
              </button>
            </li>
          </ul>
        </div>

        {/* Support column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Support</h4>
          <ul className="footer-link-list">
            <li>
              <button type="button" onClick={() => handleTab('customer')}>
                <HelpCircle size={14} /> Help &amp; FAQs
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNav('login')}>
                <Mail size={14} /> Sign In
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNav('landing')}>
                <Heart size={14} /> About Create.IT
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom strip: legal + attribution */}
      <div className="site-footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-legal">
            © 2026 Create.IT Academy - IMY 320 prototype. Not an official University of Pretoria service.
          </p>
          <p className="footer-attribution">
            Built with React 19 · Vite · Lucide Icons · Framer Motion · Google Fonts (Plus Jakarta Sans &amp; Outfit).
          </p>
        </div>
      </div>
    </footer>
  );
}