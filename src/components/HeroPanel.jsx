import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Film, Box, Sparkles, Volume2, Gamepad2, Star, GripVertical, RotateCcw, Shuffle } from 'lucide-react';

const DEFAULT_SKILLS = [
  {
    id: 'motion',
    title: 'Motion Design Fundamentals',
    tag: 'Motion',
    tagColor: '#c084fc',
    bgColor: '#581c87',
    rating: '4.9',
    students: '12.4k',
    icon: Film,
    initialPos: { top: 0, left: 0 }
  },
  {
    id: '3d',
    title: '3D Visualisation & Rendering',
    tag: '3D Art',
    tagColor: '#38bdf8',
    bgColor: '#0c4a6e',
    rating: '4.8',
    students: '9.1k',
    icon: Box,
    initialPos: { top: 20, left: 240 }
  },
  {
    id: 'ux',
    title: 'Interactive Experiences',
    tag: 'UX/UI',
    tagColor: '#fbbf24',
    bgColor: '#451a03',
    rating: '4.9',
    students: '21k',
    icon: Sparkles,
    initialPos: { top: 120, left: 80 }
  },
  {
    id: 'audio',
    title: 'Spatial Audio & Sound FX',
    tag: 'Audio',
    tagColor: '#34d399',
    bgColor: '#064e3b',
    rating: '4.8',
    students: '6.2k',
    icon: Volume2,
    initialPos: { top: 200, left: 230 }
  },
  {
    id: 'game',
    title: 'Unreal Engine 5 Mechanics',
    tag: 'Game Dev',
    tagColor: '#f43f5e',
    bgColor: '#881337',
    rating: '4.9',
    students: '15.8k',
    icon: Gamepad2,
    initialPos: { top: 220, left: 10 }
  }
];

export default function HeroPanel() {
  const constraintsRef = useRef(null);
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [resetKey, setResetKey] = useState(0);

  // Scatter cards to random positions on the canvas
  const handleRandomize = () => {
    setSkills(prev => prev.map(skill => ({
      ...skill,
      initialPos: {
        top: Math.floor(Math.random() * 220),
        left: Math.floor(Math.random() * 260)
      }
    })));
    setResetKey(prev => prev + 1);
  };

  // Reset to original orderly layout
  const handleReset = () => {
    setSkills(DEFAULT_SKILLS);
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="hero-panel">
      {/* Background Ambient Glow */}
      <div className="hero-ambient-glow" />

      {/* Brand Header */}
      <div className="brand-header">
        <h1 className="brand-title">
          Create<span>.IT</span>
        </h1>
        
        {/* Interactive Controls */}
        <div className="drag-hint-pill">
          <span>✨ Drag cards to float anywhere</span>
          <button 
            type="button" 
            className="btn-reset-layout" 
            onClick={handleRandomize} 
            title="Randomize card locations"
            style={{ background: 'rgba(236, 72, 153, 0.2)', borderColor: 'rgba(236, 72, 153, 0.4)', color: '#f472b6' }}
          >
            <Shuffle size={11} style={{ display: 'inline', marginRight: '4px' }} /> Randomize
          </button>
          <button 
            type="button" 
            className="btn-reset-layout" 
            onClick={handleReset} 
            title="Reset to initial layout"
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
          Master motion, 3D, sound, and interactive design — curated by industry professionals.
        </p>

        {/* Draggable & Continuously Floating Cards Canvas */}
        <div className="draggable-canvas-area" ref={constraintsRef} key={resetKey}>
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;

            return (
              <motion.div
                key={skill.id}
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.18}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                // Continuous float animation that runs even after dragging!
                animate={{
                  y: [0, -10, 6, -6, 0],
                  x: [0, 6, -8, 4, 0]
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 5 + index * 1.3,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px rgba(99, 102, 241, 0.4)",
                  borderColor: "rgba(99, 102, 241, 0.6)"
                }}
                whileTap={{ 
                  scale: 1.08, 
                  rotate: index % 2 === 0 ? 4 : -4,
                  boxShadow: "0 30px 60px rgba(99, 102, 241, 0.65)",
                  cursor: "grabbing",
                  zIndex: 100 
                }}
                className="draggable-course-card"
                style={{
                  top: skill.initialPos.top,
                  left: skill.initialPos.left,
                  zIndex: 10 - index
                }}
              >
                <div className="card-icon-box" style={{ background: skill.bgColor, color: skill.tagColor }}>
                  <IconComponent size={20} />
                </div>

                <div className="card-info">
                  <h3 className="card-title">{skill.title}</h3>
                  <span className="card-tag" style={{ color: skill.tagColor }}>{skill.tag}</span>
                  <div className="card-meta">
                    <span className="star-icon-inline"><Star size={12} fill="#fbbf24" stroke="none" /> {skill.rating}</span>
                    <span>•</span>
                    <span>{skill.students} students</span>
                  </div>
                </div>

                <div className="drag-grip-handle" title="Drag to new position">
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
          <p>Courses</p>
        </div>
        <div className="stat-box">
          <h4>50k+</h4>
          <p>Students</p>
        </div>
        <div className="stat-box">
          <h4>98%</h4>
          <p>Satisfaction</p>
        </div>
        <div className="stat-box">
          <h4>4.8 <Star size={14} fill="#fbbf24" stroke="none" style={{ display: 'inline', verticalAlign: 'middle' }} /></h4>
          <p>Avg rating</p>
        </div>
      </div>

    </div>
  );
}
