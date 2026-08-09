import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Film, 
  Box, 
  Sparkles, 
  Volume2, 
  Gamepad2, 
  Star, 
  GripVertical, 
  RotateCcw, 
  Shuffle, 
  GraduationCap, 
  ArrowRight,
  Clock,
  Layers
} from 'lucide-react';

const DEFAULT_COURSES = [
  {
    id: 'motion',
    title: 'Motion Design Fundamentals',
    category: 'Motion Graphics',
    tag: 'Course',
    tagColor: '#c084fc',
    bgColor: '#581c87',
    rating: '4.9',
    students: '12.4k',
    duration: '6 Weeks',
    icon: Film,
    initialPos: { top: 0, left: 0 }
  },
  {
    id: '3d',
    title: '3D Visualisation & Rendering',
    category: '3D & CGI',
    tag: 'Course',
    tagColor: '#38bdf8',
    bgColor: '#0c4a6e',
    rating: '4.8',
    students: '9.1k',
    duration: '8 Weeks',
    icon: Box,
    initialPos: { top: 15, left: 300 }
  },
  {
    id: 'ux',
    title: 'Interactive UX/UI Masterclass',
    category: 'Product Design',
    tag: 'Course',
    tagColor: '#fbbf24',
    bgColor: '#451a03',
    rating: '4.9',
    students: '21k',
    duration: '5 Weeks',
    icon: Sparkles,
    initialPos: { top: 150, left: 120 }
  },
  {
    id: 'audio',
    title: 'Spatial Audio & Sound Design',
    category: 'Audio Engineering',
    tag: 'Course',
    tagColor: '#34d399',
    bgColor: '#064e3b',
    rating: '4.8',
    students: '6.2k',
    duration: '4 Weeks',
    icon: Volume2,
    initialPos: { top: 270, left: 300 }
  },
  {
    id: 'game',
    title: 'Unreal Engine 5 Mechanics',
    tag: 'Course',
    category: 'Game Development',
    tagColor: '#f43f5e',
    bgColor: '#881337',
    rating: '4.9',
    students: '15.8k',
    duration: '10 Weeks',
    icon: Gamepad2,
    initialPos: { top: 280, left: 0 }
  }
];

const DEFAULT_FLOATING_BUTTONS = [
  { id: 'btn-popular', label: '🔥 Top Rated Courses', color: '#c084fc', initialPos: { top: -15, left: 160 } },
  { id: 'btn-diploma', label: '🎓 Professional Diplomas', color: '#38bdf8', initialPos: { top: 125, left: -10 } },
  { id: 'btn-live', label: '⚡ Live Mentorship', color: '#34d399', initialPos: { top: 220, left: 160 } },
];

export default function HeroPanel() {
  const constraintsRef = useRef(null);
  const [courses, setCourses] = useState(DEFAULT_COURSES);
  const [floatingButtons, setFloatingButtons] = useState(DEFAULT_FLOATING_BUTTONS);
  const [resetKey, setResetKey] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  // Show a notification toast when a user clicks a course or button
  const handleCourseAction = (courseName, e) => {
    e.stopPropagation();
    setToastMessage(`Selected course: "${courseName}" — Fill out the form to get full access!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Scatter cards & floating buttons to random positions on the canvas
  const handleRandomize = () => {
    setCourses(prev => prev.map(course => ({
      ...course,
      initialPos: {
        top: Math.floor(Math.random() * 250),
        left: Math.floor(Math.random() * 280)
      }
    })));
    setFloatingButtons(prev => prev.map(btn => ({
      ...btn,
      initialPos: {
        top: Math.floor(Math.random() * 250),
        left: Math.floor(Math.random() * 280)
      }
    })));
    setResetKey(prev => prev + 1);
  };

  // Reset to original orderly layout
  const handleReset = () => {
    setCourses(DEFAULT_COURSES);
    setFloatingButtons(DEFAULT_FLOATING_BUTTONS);
    setResetKey(prev => prev + 1);
  };

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
        
        {/* Interactive Controls */}
        <div className="drag-hint-pill">
          <span>✨ Drag floating courses & buttons anywhere</span>
          <button 
            type="button" 
            className="btn-reset-layout" 
            onClick={handleRandomize} 
            title="Randomize positions"
            style={{ background: 'rgba(236, 72, 153, 0.2)', borderColor: 'rgba(236, 72, 153, 0.4)', color: '#f472b6' }}
          >
            <Shuffle size={11} style={{ display: 'inline', marginRight: '4px' }} /> Randomize
          </button>
          <button 
            type="button" 
            className="btn-reset-layout" 
            onClick={handleReset} 
            title="Reset layout"
          >
            <RotateCcw size={11} style={{ display: 'inline', marginRight: '4px' }} /> Reset
          </button>
        </div>
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

        {/* Section Clarifier Badge */}
        <div className="courses-header-bar">
          <span className="courses-section-badge">
            <GraduationCap size={14} /> EXPLORE OUR COURSES
          </span>
          <span className="courses-section-sub">
            (Interactive Floating Catalog — Drag cards & buttons)
          </span>
        </div>

        {/* Draggable & Continuously Floating Cards & Buttons Canvas */}
        <div className="draggable-canvas-area" ref={constraintsRef} key={resetKey}>
          
          {/* Floating Action Filter Buttons */}
          {floatingButtons.map((btn, index) => (
            <motion.div
              key={btn.id}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.18}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              animate={{
                y: [0, -8, 5, -5, 0],
                x: [0, 5, -6, 3, 0]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 4.5 + index * 1.1,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.06, zIndex: 90 }}
              whileTap={{ scale: 1.08, cursor: "grabbing", zIndex: 100 }}
              className="draggable-floating-button"
              style={{
                top: btn.initialPos.top,
                left: btn.initialPos.left,
                borderColor: btn.color,
                zIndex: 15 - index
              }}
              onClick={(e) => handleCourseAction(btn.label, e)}
            >
              <span>{btn.label}</span>
              <span className="floating-btn-badge">Explore</span>
              <div className="drag-grip-handle-sm">
                <GripVertical size={13} />
              </div>
            </motion.div>
          ))}

          {/* Draggable Floating Course Cards */}
          {courses.map((course, index) => {
            const IconComponent = course.icon;

            return (
              <motion.div
                key={course.id}
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.18}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                // Continuous float animation
                animate={{
                  y: [0, -10, 6, -6, 0],
                  x: [0, 6, -8, 4, 0]
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 5.2 + index * 1.3,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.04, 
                  boxShadow: "0 25px 50px rgba(99, 102, 241, 0.4)",
                  borderColor: "rgba(99, 102, 241, 0.6)"
                }}
                whileTap={{ 
                  scale: 1.07, 
                  rotate: index % 2 === 0 ? 3 : -3,
                  boxShadow: "0 30px 60px rgba(99, 102, 241, 0.65)",
                  cursor: "grabbing",
                  zIndex: 100 
                }}
                className="draggable-course-card"
                style={{
                  top: course.initialPos.top,
                  left: course.initialPos.left,
                  zIndex: 10 - index
                }}
              >
                {/* Course Icon */}
                <div className="card-icon-box" style={{ background: course.bgColor, color: course.tagColor }}>
                  <IconComponent size={20} />
                </div>

                {/* Course Information */}
                <div className="card-info">
                  <div className="card-header-line">
                    <span className="card-course-badge" style={{ color: course.tagColor, borderColor: course.tagColor }}>
                      <Layers size={10} style={{ display: 'inline', marginRight: '3px' }} />
                      {course.tag}
                    </span>
                    <span className="card-duration-badge">
                      <Clock size={10} style={{ display: 'inline', marginRight: '3px' }} />
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="card-title">{course.title}</h3>
                  <span className="card-category-sub">{course.category}</span>
                  
                  <div className="card-meta">
                    <span className="star-icon-inline"><Star size={12} fill="#fbbf24" stroke="none" /> {course.rating}</span>
                    <span>•</span>
                    <span>{course.students} students</span>
                  </div>

                  {/* Interactive Button inside the Card */}
                  <button 
                    type="button" 
                    className="card-action-btn"
                    onClick={(e) => handleCourseAction(course.title, e)}
                  >
                    <span>View Course</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                {/* Drag Grip Indicator */}
                <div className="drag-grip-handle" title="Drag course card">
                  <GripVertical size={16} />
                </div>
              </motion.div>
            );
          })}
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

