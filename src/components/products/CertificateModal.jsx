import React, { useEffect, useRef, useState } from 'react';
import { 
  X, 
  Award, 
  Download,
  Sparkles,
  Loader2
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { launchConfetti } from '../../utils/confetti';

export default function CertificateModal({ 
  isOpen, 
  onClose, 
  course, 
  user, 
  onShowToast 
}) {
  const canvasRef = useRef(null);
  const cleanupRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Fire confetti + animate content when the modal opens
  useEffect(() => {
    if (!isOpen || !course) {
      setShowContent(false);
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      return;
    }

    const timer = setTimeout(() => {
      if (canvasRef.current) {
        cleanupRef.current = launchConfetti(canvasRef.current, {
          duration: 2800,
          particleCount: 140,
          startFromTop: true,
        });
      }
      setShowContent(true);
    }, 80);

    return () => {
      clearTimeout(timer);
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [isOpen, course]);

  if (!isOpen || !course) return null;

  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const certId = `UP-IMY320-${course.id.toUpperCase()}-2026`;

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      // Wait a frame for any pending layout/animation to settle
      await new Promise(resolve => setTimeout(resolve, 60));

      const frame = document.querySelector('.cert-inner-frame');
      if (!frame) {
        onShowToast('Certificate not ready. Please try again.', 'error');
        setIsDownloading(false);
        return;
      }

      // Give html2canvas the full node, not the scrolled/clipped viewport version.
      // scale: 2 doubles resolution for a crisp image.
      const canvas = await html2canvas(frame, {
        backgroundColor: '#0e1022',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        windowWidth: frame.scrollWidth,
        windowHeight: frame.scrollHeight,
      });

      await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create image blob'));
            return;
          }
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `CreateIT-Certificate-${course.id.toUpperCase()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          // Delay revoke so the download can start
          setTimeout(() => URL.revokeObjectURL(url), 500);
          resolve();
        }, 'image/png');
      });

      onShowToast('Certificate downloaded as PNG.', 'success');
    } catch (err) {
      console.error('Certificate download failed:', err);
      onShowToast('Could not generate the certificate image. Please try again.', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      {/* Confetti canvas fills the overlay */}
      <canvas ref={canvasRef} className="cert-confetti-canvas" aria-hidden="true" />

      <div className={`cert-modal-dialog ${showContent ? 'is-visible' : ''}`} onClick={(e) => e.stopPropagation()}>
        
        {/* Congratulations ceremony header */}
        <div className="cert-congrats-header">
          <div className="cert-congrats-icon">
            <Sparkles size={28} color="#fbbf24" />
          </div>
          <span className="cert-congrats-eyebrow">ACCREDITED ACHIEVEMENT</span>
          <h2 className="cert-congrats-title">
            Congratulations, <span>{user?.name?.split(' ')[0] || 'Creator'}</span>!
          </h2>
          <p className="cert-congrats-sub">
            You've completed every lesson. Here is your official certificate.
          </p>
        </div>

        {/* Top Control Bar */}
        <div className="cert-modal-topbar">
          <div className="cert-top-title">
            <Award size={18} color="#fbbf24" />
            <span>Accredited Diploma of Completion</span>
          </div>

          <div className="cert-top-actions">
            <button 
              type="button" 
              className="btn-cert-action" 
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <Loader2 size={15} className="cert-download-spinner" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download size={15} />
                  <span>Download</span>
                </>
              )}
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
                Equivalent to {course.duration} of rigorous studio production training under lead industry mentor <strong>{course.instructor?.name || course.instructor || 'Studio Faculty'}</strong>.
              </p>
            </div>

            {/* Bottom Signatures & Verification */}
            <div className="cert-footer-row">
              <div className="cert-signature-box">
                <div className="signature-line-art">{course.instructor?.name || course.instructor || 'Studio Faculty'}</div>
                <div className="signature-rule" />
                <span className="sig-label">Lead Studio Instructor</span>
                <span className="sig-name">{course.instructor?.name || course.instructor || 'Studio Faculty'}</span>
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
