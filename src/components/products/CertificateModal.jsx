import React from 'react';
import { 
  X, 
  Award, 
  Download, 
  Printer 
} from 'lucide-react';

export default function CertificateModal({ 
  isOpen, 
  onClose, 
  course, 
  user, 
  onShowToast 
}) {
  if (!isOpen || !course) return null;

  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const certId = `UP-IMY320-${course.id.toUpperCase()}-2026`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    onShowToast('Official PDF Certificate downloaded to your downloads folder!', 'success');
  };

  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal-dialog" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Control Bar */}
        <div className="cert-modal-topbar">
          <div className="cert-top-title">
            <Award size={18} color="#fbbf24" />
            <span>Accredited Diploma of Completion</span>
          </div>

          <div className="cert-top-actions">
            <button type="button" className="btn-cert-action" onClick={handleDownload}>
              <Download size={15} />
              <span>Download PDF</span>
            </button>
            <button type="button" className="btn-cert-action" onClick={handlePrint}>
              <Printer size={15} />
              <span>Print</span>
            </button>
            <button type="button" className="btn-cert-close" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Certificate Canvas / Template */}
        <div className="cert-canvas-container">
          <div className="cert-inner-frame">
            <div className="cert-watermark-bg">Create.IT</div>

            {/* University & Academy Header */}
            <div className="cert-header">
              <span className="cert-inst-tag">UNIVERSITY OF PRETORIA • IMY 320</span>
              <h2 className="cert-brand">Create<span>.IT</span> ACADEMY</h2>
              <span className="cert-doc-type">CERTIFICATE OF CREATIVE MASTERY</span>
            </div>

            {/* Recipient */}
            <div className="cert-body">
              <p className="cert-presents-to">This credential is proudly awarded to</p>
              <h3 className="cert-recipient-name">{user?.name || 'Jane Smith'}</h3>
              <p className="cert-description-text">
                For successfully fulfilling all curriculum requirements, portfolio projects, and technical competencies in
              </p>
              <h4 className="cert-course-title">{course.title}</h4>
              <p className="cert-duration-note">
                Equivalent to {course.duration} of rigorous studio production training under lead industry mentor <strong>{course.instructor?.name}</strong>.
              </p>
            </div>

            {/* Bottom Signatures & Verification */}
            <div className="cert-footer-row">
              <div className="cert-signature-box">
                <div className="signature-line-art">{course.instructor?.name}</div>
                <div className="signature-rule" />
                <span className="sig-label">Lead Studio Instructor</span>
                <span className="sig-name">{course.instructor?.name}</span>
              </div>

              <div className="cert-seal-box">
                <div className="seal-gold-badge">
                  <Award size={28} color="#fbbf24" />
                  <span>OFFICIAL SEAL</span>
                </div>
              </div>

              <div className="cert-signature-box">
                <div className="signature-line-art">Prof. IMY Academic Board</div>
                <div className="signature-rule" />
                <span className="sig-label">Academic Dean / IMY 320</span>
                <span className="sig-name">Multimedia Trends 2026</span>
              </div>
            </div>

            {/* Verification Metadata */}
            <div className="cert-meta-bottom">
              <span>Issued on: {issueDate}</span>
              <span>•</span>
              <span>Verification ID: {certId}</span>
              <span>•</span>
              <span>createit.academy/verify/{certId}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
