import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Check, 
  Loader2, 
  BookOpen 
} from 'lucide-react';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  items, 
  appliedPromo, 
  user, 
  onCompleteOrder, 
  onShowToast 
}) {
  const [step, setStep] = useState('payment'); // 'payment', 'processing', 'success'
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardName, setCardName] = useState(user?.name || 'Jane Smith');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, it) => acc + it.price, 0);
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percent') {
      discountAmount = (subtotal * appliedPromo.value) / 100;
    } else if (appliedPromo.type === 'fixed') {
      discountAmount = Math.min(subtotal, appliedPromo.value);
    }
  }
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleFillDemoCard = () => {
    setCardName('Jane Smith (Demo Student)');
    setCardNumber('4000 1234 5678 9010');
    setCardExp('08/29');
    setCardCvv('789');
    onShowToast('Demo credit card details populated!', 'info');
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    setStep('processing');

    setTimeout(() => {
      const generatedOrderNum = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNum);
      setStep('success');
      onCompleteOrder(items, generatedOrderNum);
      onShowToast('Payment approved! Courses added to your learning dashboard.', 'success');
    }, 1800);
  };

  return (
    <div className="checkout-modal-overlay" onClick={onClose}>
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="checkout-header">
          <div className="checkout-header-title-box">
            <ShieldCheck size={20} color="#6366f1" />
            <div>
              <h3 className="checkout-title">
                {step === 'success' ? 'Enrollment Confirmed!' : 'Secure Student Checkout'}
              </h3>
              <span className="checkout-subtitle">
                {step === 'success' ? 'Order Complete • Instant Access' : '256-Bit SSL Encrypted Payment'}
              </span>
            </div>
          </div>

          <button type="button" className="btn-close-modal" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Modal Body Based on Step */}
        {step === 'payment' && (
          <form onSubmit={handlePayNow} className="checkout-body">
            
            {/* Items Summary Strip */}
            <div className="checkout-items-summary">
              <span className="checkout-summary-label">ORDER SUMMARY ({items.length} {items.length === 1 ? 'Course' : 'Courses'})</span>
              <div className="checkout-items-list-compact">
                {items.map(item => (
                  <div key={item.id} className="summary-item-pill">
                    <span className="summary-item-name">{item.title}</span>
                    <span className="summary-item-cost">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="checkout-total-row">
                {appliedPromo && (
                  <div className="checkout-discount-applied">
                    <span>Promo: {appliedPromo.label}</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="checkout-final-due">
                  <span>Total Due:</span>
                  <strong className="due-amount">${finalTotal.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="payment-method-selector">
              <button 
                type="button" 
                className={`pay-tab-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={15} />
                <span>Credit / Debit Card</span>
              </button>

              <button 
                type="button" 
                className={`pay-tab-btn ${paymentMethod === 'googlepay' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('googlepay')}
              >
                <Zap size={15} />
                <span>Google Pay / Apple Pay</span>
              </button>
            </div>

            {/* Credit Card Input Form */}
            {paymentMethod === 'card' ? (
              <div className="card-fields-group">
                
                <div className="input-group" style={{ marginBottom: '14px' }}>
                  <div className="input-label-row">
                    <label className="input-label">Cardholder Name</label>
                    <button 
                      type="button" 
                      onClick={handleFillDemoCard} 
                      className="btn-quick-fill-demo"
                    >
                      Fill Demo Card
                    </button>
                  </div>
                  <input 
                    type="text" 
                    className="input-control" 
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group" style={{ marginBottom: '14px' }}>
                  <label className="input-label" style={{ display: 'block', marginBottom: '6px' }}>Card Number</label>
                  <div className="card-input-box">
                    <input 
                      type="text" 
                      className="input-control" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                    />
                    <div className="card-icons-inline">
                      <span className="card-badge-visa">VISA</span>
                      <span className="card-badge-mc">MC</span>
                    </div>
                  </div>
                </div>

                <div className="input-grid-2col">
                  <div className="input-group">
                    <label className="input-label" style={{ display: 'block', marginBottom: '6px' }}>Expiration</label>
                    <input 
                      type="text" 
                      className="input-control" 
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label" style={{ display: 'block', marginBottom: '6px' }}>Security Code (CVV)</label>
                    <input 
                      type="password" 
                      className="input-control" 
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

              </div>
            ) : (
              <div className="express-pay-box">
                <p>Express 1-Click student authorization enabled.</p>
                <div className="express-btn-row">
                  <button type="button" className="btn-express-apple" onClick={handlePayNow}>
                    <span>Apple Pay</span>
                  </button>
                  <button type="button" className="btn-express-gpay" onClick={handlePayNow}>
                    <span>Google Pay</span>
                  </button>
                </div>
              </div>
            )}

            {/* Pay Button */}
            <button type="submit" className="btn-submit-purple" style={{ marginTop: '8px' }}>
              <Lock size={15} style={{ marginRight: '6px' }} />
              <span>Complete Purchase & Enroll (R{finalTotal.toFixed(2)})</span>
            </button>

            <p className="checkout-fine-print">
              By confirming your enrollment, you agree to the Create.IT Academy Terms of Service. All licenses include full accredited certificates.
            </p>
          </form>
        )}

        {/* Processing State */}
        {step === 'processing' && (
          <div className="checkout-processing-state">
            <Loader2 size={44} className="spin-loader-icon" color="#6366f1" />
            <h4 className="processing-title">Authorizing Student Enrollment</h4>
            <p className="processing-sub">
              Connecting with payment gateway and provisioning 4K streaming access...
            </p>
            <div className="processing-progress-bar">
              <div className="progress-bar-glow-fill" />
            </div>
          </div>
        )}

        {/* Success State */}
        {step === 'success' && (
          <div className="checkout-success-state">
            <div className="success-icon-badge">
              <CheckCircle2 size={40} color="#34d399" />
            </div>

            <h3 className="success-title">You're In! Welcome to Class</h3>
            <p className="success-sub">
              Your enrollment has been confirmed. Order receipt number: <strong>{orderNumber}</strong>
            </p>

            {/* Enrolled Courses Summary Box */}
            <div className="enrolled-confirmation-box">
              <h5>Enrolled Programs:</h5>
              {items.map(it => (
                <div key={it.id} className="enrolled-item-row">
                  <Check size={14} color="#34d399" />
                  <span>{it.title}</span>
                </div>
              ))}
            </div>

            <div className="success-actions">
              <button 
                type="button" 
                className="btn-submit-purple"
                onClick={onClose}
              >
                <BookOpen size={16} />
                <span>Go to My Enrolled Courses</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
