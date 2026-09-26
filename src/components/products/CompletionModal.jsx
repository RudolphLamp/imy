import React, { useEffect } from 'react';
import { Award, ArrowRight, X } from 'lucide-react';

export default function CompletionModal({ isOpen, course, onClaimCertificate, onClose }) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  return (
    <div
      className="completion-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="completion-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="completion-modal-card">
        <button
          type="button"
          className="completion-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="completion-icon-wrap">
          <Award size={40} color="#fbbf24" strokeWidth={1.6} />
        </div>

        <span className="completion-eyebrow">COURSE COMPLETE</span>
        <h2 id="completion-modal-title" className="completion-title">
          You finished it.
        </h2>
        <p className="completion-subtitle">
          You've completed every lesson in <strong>{course.title}</strong>.
          Your accredited certificate is ready to claim.
        </p>

        {course.image && (
          <img
            src={course.image}
            alt=""
            className="completion-course-thumb"
          />
        )}

        <div className="completion-actions">
          <button
            type="button"
            className="completion-btn-primary"
            onClick={onClaimCertificate}
          >
            <span>Claim Certificate</span>
            <ArrowRight size={16} />
          </button>
          <button
            type="button"
            className="completion-btn-secondary"
            onClick={onClose}
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
}