import React from 'react';
import { X, HelpCircle, Layers } from 'lucide-react';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(5, 6, 15, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#0d0f20',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '20px',
          maxWidth: '500px',
          width: '100%',
          padding: '28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          position: 'relative',
          color: '#ffffff'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#94a3b8',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HelpCircle size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>IMY 320 UX Project Architecture</h3>
            <span style={{ fontSize: '12px', color: '#818cf8', fontWeight: 700 }}>Group Design B — Products & Course Platform</span>
          </div>
        </div>

        <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
          <p style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#fff' }}>Create.IT Academy</strong> is an interactive web platform shell for University of Pretoria IMY 320 Multimedia Trends.
          </p>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#38bdf8', fontWeight: 700, marginBottom: '6px' }}>
              <Layers size={14} /> Full Front-End Operational Shell
            </div>
            <ul style={{ paddingLeft: '16px', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li><strong>Catalog & Filtering:</strong> Real-time category pills, price & level filters, live search.</li>
              <li><strong>Product Description:</strong> Interactive video preview, syllabus accordion, verified reviews.</li>
              <li><strong>Cart & Checkout:</strong> Slide-over cart, coupon code logic (<code>IMY320</code> for 25% off), simulated payment gateway.</li>
              <li><strong>Learning Progression:</strong> Student XP tracker, lesson checklist updating live progress bars.</li>
              <li><strong>Credentials:</strong> Accredited certificate generator & PDF export.</li>
            </ul>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="btn-submit-purple"
          style={{ width: '100%', margin: 0, padding: '12px' }}
        >
          Explore Platform
        </button>

      </div>
    </div>
  );
}
