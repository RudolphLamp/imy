import React from 'react';
import { 
  X, 
  Heart, 
  Trash2, 
  ShoppingCart, 
  Star 
} from 'lucide-react';

export default function WishlistDrawer({ 
  isOpen, 
  onClose, 
  wishlistItems, 
  onRemoveFromWishlist, 
  onMoveToCart, 
  onSelectCourse 
}) {
  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title-box">
            <div className="cart-icon-circle" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
              <Heart size={18} />
            </div>
            <div>
              <h3 className="cart-title">Your Saved Wishlist</h3>
              <span className="cart-count-sub">{wishlistItems.length} {wishlistItems.length === 1 ? 'course' : 'courses'}</span>
            </div>
          </div>

          <button type="button" className="btn-close-drawer" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="cart-drawer-body">
          {wishlistItems.length > 0 ? (
            <div className="cart-items-scroll-list">
              {wishlistItems.map((item) => (
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
                    
                    <div className="card-meta-row" style={{ margin: '4px 0 8px', fontSize: '11px' }}>
                      <span className="star-icon-inline">
                        <Star size={11} fill="#fbbf24" stroke="none" /> {item.rating}
                      </span>
                      <span>•</span>
                      <span>{item.duration}</span>
                    </div>

                    <div className="cart-item-bottom">
                      <span className="cart-item-price">${item.price.toFixed(2)}</span>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          type="button" 
                          className="btn-move-to-cart"
                          onClick={() => onMoveToCart(item)}
                          title="Move to cart"
                        >
                          <ShoppingCart size={13} />
                          <span>Add to Cart</span>
                        </button>
                        
                        <button 
                          type="button" 
                          className="btn-remove-item"
                          onClick={() => onRemoveFromWishlist(item.id)}
                          title="Remove from wishlist"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-cart-state">
              <div className="empty-cart-icon-circle" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
                <Heart size={32} />
              </div>
              <h4 className="empty-cart-title">No saved courses yet</h4>
              <p className="empty-cart-sub">
                Click the heart icon on any course in the catalog to save it for later review.
              </p>
              <button 
                type="button" 
                className="btn-submit-purple"
                style={{ width: 'auto', padding: '12px 24px', margin: '20px auto 0' }}
                onClick={onClose}
              >
                Explore Courses
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
