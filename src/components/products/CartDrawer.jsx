import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveFromCart, 
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
  onSelectCourse
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percent') {
      discountAmount = (subtotal * appliedPromo.value) / 100;
    } else if (appliedPromo.type === 'fixed') {
      discountAmount = Math.min(subtotal, appliedPromo.value);
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();

    if (!code) {
      setPromoError('Please enter a coupon code.');
      return;
    }

    if (code === 'IMY320') {
      onApplyPromo({ code: 'IMY320', label: 'IMY 320 Student Discount (25%)', type: 'percent', value: 25 });
      setPromoInput('');
    } else if (code === 'STUDENT50') {
      onApplyPromo({ code: 'STUDENT50', label: 'Semester Special (50%)', type: 'percent', value: 50 });
      setPromoInput('');
    } else if (code === 'CREATIVE2026') {
      onApplyPromo({ code: 'CREATIVE2026', label: 'Creative Grant ($20 OFF)', type: 'fixed', value: 20 });
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon code. Try "IMY320" for 25% off.');
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title-box">
            <div className="cart-icon-circle">
              <ShoppingCart size={18} color="#818cf8" />
            </div>
            <div>
              <h3 className="cart-title">Your Cart</h3>
              <span className="cart-count-sub">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
            </div>
          </div>

          <button type="button" className="btn-close-drawer" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Cart Body */}
        <div className="cart-drawer-body">
          {cartItems.length > 0 ? (
            <>
              {/* Item List */}
              <div className="cart-items-scroll-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="cart-item-thumb"
                      onClick={() => {
                        onClose();
                        onSelectCourse(item.id);
                      }}
                    />
                    <div className="cart-item-details">
                      <span className="cart-item-cat" style={{ color: item.color }}>
                        {item.category}
                      </span>
                      <h4 
                        className="cart-item-title"
                        onClick={() => {
                          onClose();
                          onSelectCourse(item.id);
                        }}
                      >
                        {item.title}
                      </h4>
                      <span className="cart-item-inst">By {item.instructor.name}</span>
                      
                      <div className="cart-item-bottom">
                        <span className="cart-item-price">${item.price.toFixed(2)}</span>
                        <button 
                          type="button" 
                          className="btn-remove-item"
                          onClick={() => onRemoveFromCart(item.id)}
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Box */}
              <div className="cart-promo-section">
                {appliedPromo ? (
                  <div className="promo-applied-pill">
                    <div className="promo-applied-left">
                      <Tag size={14} color="#34d399" />
                      <div>
                        <strong>{appliedPromo.code}</strong>
                        <span className="promo-applied-desc">{appliedPromo.label}</span>
                      </div>
                    </div>
                    <button type="button" className="btn-remove-promo" onClick={onRemovePromo}>
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="promo-input-form">
                    <div className="promo-input-row">
                      <input 
                        type="text" 
                        placeholder="Coupon code (e.g. IMY320)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="promo-text-input"
                      />
                      <button type="submit" className="btn-apply-promo">
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <span className="promo-err-msg">
                        <AlertCircle size={12} /> {promoError}
                      </span>
                    )}
                    <span className="promo-hint-text">
                      Tip: Use coupon <strong onClick={() => setPromoInput('IMY320')} style={{ cursor: 'pointer', color: '#a5b4fc' }}>IMY320</strong> for 25% off
                    </span>
                  </form>
                )}
              </div>

              {/* Order Summary Math */}
              <div className="cart-summary-box">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="summary-line summary-discount">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-line">
                  <span>Student Tax</span>
                  <span className="tax-free-tag">0% Free</span>
                </div>

                <div className="summary-divider" />

                <div className="summary-line summary-total">
                  <span>Total Amount</span>
                  <span className="total-amount-highlight">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          ) : (
            /* Empty Cart View */
            <div className="empty-cart-state">
              <div className="empty-cart-icon-circle">
                <ShoppingCart size={32} color="#6366f1" />
              </div>
              <h4 className="empty-cart-title">Your shopping cart is empty</h4>
              <p className="empty-cart-sub">
                Explore our multimedia catalog and add cutting-edge courses to start creating!
              </p>
              <button 
                type="button" 
                className="btn-submit-purple"
                style={{ width: 'auto', padding: '12px 24px', margin: '20px auto 0' }}
                onClick={onClose}
              >
                Browse All Courses
              </button>
            </div>
          )}
        </div>

        {/* Footer with Checkout CTA */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <button 
              type="button" 
              className="btn-drawer-checkout"
              onClick={onProceedToCheckout}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div className="checkout-security-tag">
              <ShieldCheck size={13} color="#34d399" />
              <span>Instant Lifetime Access • 30-Day Money-Back</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
