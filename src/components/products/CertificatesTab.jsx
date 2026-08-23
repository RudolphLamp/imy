import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

export default function CertificatesTab({ 
  enrolledCourses, 
  allCourses, 
  onViewCertificate, 
  onExploreCatalog 
}) {
  const completedCourses = enrolledCourses
    .filter(enc => enc.progress >= 60) // Show courses eligible for certification
    .map(enc => {
      const full = allCourses.find(c => c.id === enc.courseId);
      return { ...full, ...enc };
    })
    .filter(c => c.title);

  return (
    <div className="progression-view-layout">
      
      {/* Header */}
      <div className="progression-hero-header">
        <div className="progression-hero-content">
          <div className="progression-eyebrow">
            <Award size={15} color="#fbbf24" />
            <span>OFFICIAL ACADEMIC CREDENTIALS</span>
          </div>

          <h2 className="progression-title">
            Your Accredited Diplomas & <br />
            <span className="gradient-text">Verified Course Certificates</span>
          </h2>

          <p className="progression-subtitle">
            All completed programs earn an official University of Pretoria IMY 320 accredited certificate of completion with digital verification IDs.
          </p>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="progression-section-block">
        <h3 className="progression-section-title">
          <ShieldCheck size={18} color="#34d399" />
          <span>Issued Diplomas ({completedCourses.length})</span>
        </h3>

        {completedCourses.length > 0 ? (
          <div className="certificates-catalog-grid">
            {completedCourses.map(course => (
              <div key={course.id} className="cert-preview-card">
                <div className="cert-card-top-strip">
                  <span className="cert-status-badge">
                    <CheckCircle2 size={12} /> Verified Credential
                  </span>
                  <span className="cert-year-tag">2026</span>
                </div>

                <div className="cert-card-body">
                  <div className="cert-card-icon">
                    <Award size={28} color="#fbbf24" />
                  </div>
                  <h4 className="cert-card-title">{course.title}</h4>
                  <span className="cert-card-inst">Lead Instructor: {course.instructor?.name}</span>
                  <p className="cert-card-desc">
                    Comprehensive mastery in {course.category}. Total accredited training: {course.duration}.
                  </p>
                </div>

                <div className="cert-card-footer">
                  <button 
                    type="button" 
                    className="btn-open-cert-modal" 
                    onClick={() => onViewCertificate(course)}
                  >
                    <span>View & Download Certificate</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-enrolled-box">
            <Award size={36} color="#fbbf24" />
            <h4>No certificates earned yet</h4>
            <p>Enroll in a course and complete your learning milestones to generate official diplomas.</p>
            <button 
              type="button" 
              className="btn-submit-purple" 
              style={{ width: 'auto', padding: '12px 24px', margin: '16px auto 0' }} 
              onClick={onExploreCatalog}
            >
              Browse Courses
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
