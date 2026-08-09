import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Film, 
  Box, 
  Sparkles, 
  Volume2, 
  Gamepad2, 
  Star, 
  GraduationCap, 
  ArrowRight,
  Clock,
  Layers,
  Sparkle
} from 'lucide-react';

const COURSES = [
  {
    id: 'motion',
    title: 'Motion Design Fundamentals',
    category: 'Motion',
    categoryName: 'Motion Graphics',
    tagColor: '#c084fc',
    bgColor: 'rgba(192, 132, 252, 0.15)',
    rating: '4.9',
    students: '12.4k',
    duration: '6 Weeks',
    icon: Film
  },
  {
    id: '3d',
    title: '3D Visualisation & Rendering',
    category: '3D',
    categoryName: '3D & CGI',
    tagColor: '#38bdf8',
    bgColor: 'rgba(56, 189, 248, 0.15)',
    rating: '4.8',
    students: '9.1k',
    duration: '8 Weeks',
    icon: Box
  },
  {
    id: 'ux',
    title: 'Interactive UX/UI Masterclass',
    category: 'UX/UI',
    categoryName: 'Product Design',
    tagColor: '#fbbf24',
    bgColor: 'rgba(251, 191, 36, 0.15)',
    rating: '4.9',
    students: '21k',
    duration: '5 Weeks',
    icon: Sparkles
  },
  {
    id: 'audio',
    title: 'Spatial Audio & Sound Design',
    category: 'Audio',
    categoryName: 'Audio Engineering',
    tagColor: '#34d399',
    bgColor: 'rgba(52, 211, 153, 0.15)',
    rating: '4.8',
    students: '6.2k',
    duration: '4 Weeks',
    icon: Volume2
  },
  {
    id: 'game',
    title: 'Unreal Engine 5 Mechanics',
    category: 'Game Dev',
    categoryName: 'Game Development',
    tagColor: '#f43f5e',
    bgColor: 'rgba(244, 63, 94, 0.15)',
    rating: '4.9',
    students: '15.8k',
    duration: '10 Weeks',
    icon: Gamepad2
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Courses' },
  { id: 'Motion', label: 'Motion' },
  { id: '3D', label: '3D Art' },
  { id: 'UX/UI', label: 'UX/UI' },
  { id: 'Audio', label: 'Audio' },
  { id: 'Game Dev', label: 'Game Dev' }
];

export default function HeroPanel() {
  const [activeTab, setActiveTab] = useState('all');
  const [toastMessage, setToastMessage] = useState(null);

  const handleCourseClick = (courseTitle) => {
    setToastMessage(`Selected course: "${courseTitle}" — Fill out the form to enroll!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredCourses = activeTab === 'all' 
    ? COURSES 
    : COURSES.filter(course => course.category === activeTab);

  return (
    <div className="hero-panel">
      {/* Background Ambient Glow */}
      <div className="hero-ambient-glow" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-msg">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Brand Header */}
      <div className="brand-header">
        <h1 className="brand-title">
          Create<span>.IT</span>
        </h1>
      </div>

      {/* Hero Body Content */}
      <div className="hero-content">
        <h2 className="hero-headline">
          Create without <br />
          <span className="gradient-text">limits.</span>
        </h2>

        <p className="hero-subtitle">
          Master motion, 3D, sound, and interactive design curated by industry professionals.
        </p>

        {/* Course Catalog Filter Tabs Header */}
        <div className="catalog-header-container">
          <div className="catalog-title-row">
            <span className="catalog-section-badge">
              <Sparkle size={14} /> FEATURED COURSES
            </span>
            <span className="catalog-count-badge">
              <strong>{filteredCourses.length}</strong> Programs Available
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="category-filter-bar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`filter-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Structured Grid of Larger Course Cards */}
        <div className="courses-grid">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => {
              const IconComponent = course.icon;

              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -5, borderColor: "rgba(99, 102, 241, 0.6)" }}
                  className="grid-course-card"
                  onClick={() => handleCourseClick(course.title)}
                >
                  {/* Course Top Header */}
                  <div className="card-top-row">
                    <div className="card-icon-box" style={{ background: course.bgColor, color: course.tagColor }}>
                      <IconComponent size={22} />
                    </div>
                    
                    <div className="card-badges-group">
                      <span className="card-course-badge" style={{ color: course.tagColor, borderColor: course.tagColor }}>
                        <Layers size={11} style={{ display: 'inline', marginRight: '3px' }} />
                        Course
                      </span>
                      <span className="card-duration-badge">
                        <Clock size={11} style={{ display: 'inline', marginRight: '3px' }} />
                        {course.duration}
                      </span>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="card-body-content">
                    <h3 className="card-title">{course.title}</h3>
                    <span className="card-category-sub">{course.categoryName}</span>
                    
                    <div className="card-meta-row">
                      <span className="star-icon-inline">
                        <Star size={13} fill="#fbbf24" stroke="none" /> {course.rating}
                      </span>
                      <span>•</span>
                      <span>{course.students} enrolled</span>
                    </div>

                    {/* View Course Action */}
                    <div className="card-action-link">
                      <span>View Course Details</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Bottom Stats Counter Row */}
      <div className="hero-stats-row">
        <div className="stat-box">
          <h4>240+</h4>
          <p>Courses Available</p>
        </div>
        <div className="stat-box">
          <h4>50k+</h4>
          <p>Active Students</p>
        </div>
        <div className="stat-box">
          <h4>98%</h4>
          <p>Satisfaction</p>
        </div>
        <div className="stat-box">
          <h4>4.8 <Star size={14} fill="#fbbf24" stroke="none" style={{ display: 'inline', verticalAlign: 'middle' }} /></h4>
          <p>Avg Course Rating</p>
        </div>
      </div>

    </div>
  );
}


