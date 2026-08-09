import React from 'react';
import { motion } from 'framer-motion';
import { 
  Film, 
  Box, 
  Sparkles, 
  Volume2, 
  Gamepad2, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Users, 
  Award,
  ChevronRight,
  LogIn
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  const courses = [
    {
      icon: Film,
      title: 'Motion Design Fundamentals',
      category: 'Motion Graphics',
      color: '#c084fc',
      bgColor: 'rgba(192, 132, 252, 0.15)',
      rating: '4.9',
      students: '12.4k'
    },
    {
      icon: Box,
      title: '3D Visualisation & Rendering',
      category: '3D Art & CGI',
      color: '#38bdf8',
      bgColor: 'rgba(56, 189, 248, 0.15)',
      rating: '4.8',
      students: '9.1k'
    },
    {
      icon: Sparkles,
      title: 'Interactive UX/UI Masterclass',
      category: 'Product Design',
      color: '#fbbf24',
      bgColor: 'rgba(251, 191, 36, 0.15)',
      rating: '4.9',
      students: '21k'
    },
    {
      icon: Gamepad2,
      title: 'Unreal Engine 5 Mechanics',
      category: 'Game Development',
      color: '#f43f5e',
      bgColor: 'rgba(244, 63, 94, 0.15)',
      rating: '4.9',
      students: '15.8k'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Industry Mentorship',
      desc: 'Learn directly from senior studio directors and professional creators.'
    },
    {
      icon: Users,
      title: 'Collaborative Projects',
      desc: 'Work on live creative briefs with global design teams and peers.'
    },
    {
      icon: Award,
      title: 'Certified Diplomas',
      desc: 'Earn industry-recognized credentials to boost your professional portfolio.'
    }
  ];

  return (
    <div className="landing-page-container">
      {/* Background Ambient Glows */}
      <div className="landing-ambient-glow glow-1" />
      <div className="landing-ambient-glow glow-2" />

      {/* Top Navbar */}
      <header className="landing-navbar">
        <div className="landing-nav-brand">
          <h1 className="brand-title">
            Create<span>.IT</span>
          </h1>
        </div>

        <nav className="landing-nav-links">
          <a href="#courses">Courses</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>

        <div className="landing-nav-actions">
          <button 
            type="button" 
            className="btn-nav-login"
            onClick={() => onNavigate('login')}
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>

          <button 
            type="button" 
            className="btn-nav-register"
            onClick={() => onNavigate('register')}
          >
            <span>Get Started Free</span>
            <ChevronRight size={15} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero-section">
        <motion.div 
          className="landing-hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="landing-eyebrow-pill">
            <ShieldCheck size={14} color="#6366f1" />
            <span>Next-Gen Creative Multimedia Academy</span>
          </div>

          <h1 className="landing-hero-title">
            Master the art of <br />
            <span className="gradient-text">digital creation.</span>
          </h1>

          <p className="landing-hero-sub">
            Learn Motion Graphics, 3D CGI, Spatial Audio, and Game Development from world-class industry leaders with hands-on projects.
          </p>

          <div className="landing-hero-cta-group">
            <button 
              type="button" 
              className="btn-primary-glow"
              onClick={() => onNavigate('register')}
            >
              <span>Start Learning Free</span>
              <ArrowRight size={16} />
            </button>

            <button 
              type="button" 
              className="btn-secondary-outline"
              onClick={() => onNavigate('login')}
            >
              <span>Sign In to Portal</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Strip */}
        <div className="landing-stats-strip">
          <div className="landing-stat-card">
            <h3>240+</h3>
            <p>Courses Available</p>
          </div>
          <div className="landing-stat-card">
            <h3>50k+</h3>
            <p>Active Students</p>
          </div>
          <div className="landing-stat-card">
            <h3>98%</h3>
            <p>Satisfaction Rate</p>
          </div>
          <div className="landing-stat-card">
            <h3>4.8 <Star size={15} fill="#fbbf24" stroke="none" style={{ display: 'inline', verticalAlign: 'middle' }} /></h3>
            <p>Average Rating</p>
          </div>
        </div>
      </section>

      {/* Featured Courses Preview */}
      <section id="courses" className="landing-courses-section">
        <div className="section-header-center">
          <span className="section-tag-pill">ACADEMY CATALOG</span>
          <h2 className="section-title">Explore Featured Programs</h2>
          <p className="section-sub">Choose from expert-crafted modules designed for modern creators.</p>
        </div>

        <div className="landing-courses-grid">
          {courses.map((course, idx) => {
            const Icon = course.icon;
            return (
              <motion.div 
                key={idx}
                className="landing-course-card"
                whileHover={{ y: -6, borderColor: 'rgba(99, 102, 241, 0.5)' }}
                onClick={() => onNavigate('login')}
              >
                <div className="card-top">
                  <div className="card-icon-box" style={{ background: course.bgColor, color: course.color }}>
                    <Icon size={22} />
                  </div>
                  <span className="badge-tag" style={{ color: course.color, borderColor: course.color }}>
                    {course.category}
                  </span>
                </div>

                <h3 className="course-card-title">{course.title}</h3>
                
                <div className="course-card-meta">
                  <span className="rating"><Star size={13} fill="#fbbf24" stroke="none" /> {course.rating}</span>
                  <span>•</span>
                  <span>{course.students} students</span>
                </div>

                <div className="card-hover-action">
                  <span>Enroll in Course</span>
                  <ArrowRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="landing-features-section">
        <div className="landing-features-grid">
          {features.map((feat, i) => {
            const FeatIcon = feat.icon;
            return (
              <div key={i} className="landing-feature-card">
                <div className="feat-icon-circle">
                  <FeatIcon size={24} color="#6366f1" />
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="brand-title">Create<span>.IT</span></div>
          <p>© 2026 Create.IT Multimedia Academy. All rights reserved.</p>
          <div className="footer-links">
            <button type="button" onClick={() => onNavigate('login')}>Sign In</button>
            <button type="button" onClick={() => onNavigate('register')}>Register</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
