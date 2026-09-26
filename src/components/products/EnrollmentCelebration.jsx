import React, { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight, X, Sparkles } from 'lucide-react';
import { launchConfetti } from '../../utils/confetti';

export default function EnrollmentCelebration({ isOpen, enrolledCourses = [], orderId, onStartLearning, onClose }) {
  const canvasRef = useRef(null);
  const cleanupRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const [visibleCourses, setVisibleCourses] = useState(0);

  // Fire confetti and animate content in when the overlay opens
  useEffect(() => {
    if (!isOpen) {
      setShowContent(false);
      setVisibleCourses(0);
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      return;
    }

    // Small delay so the canvas is mounted
    const startTimer = setTimeout(() => {
      if (canvasRef.current) {
        cleanupRef.current = launchConfetti(canvasRef.current, {
          duration: 3400,
          particleCount: 180,
          startFromTop: true,
        });
      }
      setShowContent(true);
    }, 80);

    // Stagger course thumbnails in
    const courseTimer = setInterval(() => {
      setVisibleCourses((prev) => {
        if (prev >= enrolledCourses.length) {
          clearInterval(courseTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 180);

    return () => {
      clearTimeout(startTimer);
      clearInterval(courseTimer);
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [isOpen, enrolledCourses.length]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="enrollment-celebration" role="dialog" aria-modal="true" aria-labelledby="celebration-title">
      {/* Confetti canvas fills the viewport */}
      <canvas ref={canvasRef} className="celebration-canvas" aria-hidden="true" />

      {/* Close button top-right */}
      <button
        type="button"
        className="celebration-close-btn"
        onClick={onClose}
        aria-label="Close celebration"
      >
        <X size={18} />
      </button>

      <div className={`celebration-content ${showContent ? 'is-visible' : ''}`}>
        {/* Animated checkmark */}
        <div className="celebration-checkmark">
          <svg viewBox="0 0 52 52" className="checkmark-svg" aria-hidden="true">
            <circle cx="26" cy="26" r="24" fill="none" strokeWidth="2" className="checkmark-circle" />
            <path
              d="M14 27 L23 35 L38 18"
              fill="none"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="checkmark-tick"
            />
          </svg>
        </div>

        {/* Headline */}
        <h2 id="celebration-title" className="celebration-headline">
          You're in!
        </h2>
        <p className="celebration-subheadline">
          <Sparkles size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          {enrolledCourses.length === 1
            ? 'Your new course is ready in My Learning.'
            : `Your ${enrolledCourses.length} new courses are ready in My Learning.`}
        </p>

        {/* Enrolled course thumbnails */}
        {enrolledCourses.length > 0 && (
          <div className="celebration-course-list">
            {enrolledCourses.map((course, index) => (
              <div
                key={course.id}
                className={`celebration-course-item ${index < visibleCourses ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                <img src={course.image} alt="" className="celebration-course-thumb" />
                <div className="celebration-course-text">
                  <span className="celebration-course-category">{course.category}</span>
                  <span className="celebration-course-title">{course.title}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="celebration-actions">
          <button
            type="button"
            className="celebration-btn-primary"
            onClick={onStartLearning}
          >
            <span>Start Learning</span>
            <ArrowRight size={16} />
          </button>
          <button
            type="button"
            className="celebration-btn-secondary"
            onClick={onClose}
          >
            View Receipt
          </button>
        </div>

        {/* Order reference (subtle) */}
        {orderId && (
          <p className="celebration-order-ref">Order {orderId}</p>
        )}
      </div>
    </div>
  );
}