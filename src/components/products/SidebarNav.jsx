import React from 'react';
import { 
  Compass, 
  GraduationCap, 
  ShoppingCart, 
  Heart, 
  Award, 
  Sparkles, 
  Film, 
  Box, 
  Layers, 
  Gamepad2, 
  Volume2, 
  HelpCircle, 
  Zap 
} from 'lucide-react';
import { CATEGORIES } from '../../data/coursesData';

export default function SidebarNav({ 
  activeTab, 
  onSelectTab, 
  selectedCategory, 
  onSelectCategory, 
  cartCount, 
  wishlistCount, 
  enrolledCount, 
  isOpen, 
  onOpenHelpModal 
}) {
  const iconMap = {
    Film: Film,
    Box: Box,
    Layers: Layers,
    Gamepad2: Gamepad2,
    Volume2: Volume2,
    Sparkles: Sparkles
  };

  return (
    <aside className={`products-sidebar-container ${isOpen ? 'open' : 'collapsed'}`}>
      
      {/* Primary Navigation Menu */}
      <div className="sidebar-section">
        <span className="sidebar-section-heading">MAIN MENU</span>
        <nav className="sidebar-nav-list">
          
          <button 
            type="button" 
            className={`sidebar-nav-item ${activeTab === 'catalog' && selectedCategory === 'all' ? 'active' : ''}`} 
            onClick={() => {
              onSelectTab('catalog');
              onSelectCategory('all');
            }}
          >
            <Compass size={17} />
            <span className="nav-label">Explore Catalog</span>
          </button>

          <button 
            type="button" 
            className={`sidebar-nav-item ${activeTab === 'progression' ? 'active' : ''}`} 
            onClick={() => onSelectTab('progression')}
          >
            <GraduationCap size={17} />
            <span className="nav-label">My Learning</span>
            {enrolledCount > 0 && (
              <span className="sidebar-pill-badge">{enrolledCount}</span>
            )}
          </button>

          <button 
            type="button" 
            className={`sidebar-nav-item ${activeTab === 'cart' ? 'active' : ''}`} 
            onClick={() => onSelectTab('cart')}
          >
            <ShoppingCart size={17} />
            <span className="nav-label">Cart & Checkout</span>
            {cartCount > 0 && (
              <span className="sidebar-pill-badge badge-purple">{cartCount}</span>
            )}
          </button>

          <button 
            type="button" 
            className={`sidebar-nav-item ${activeTab === 'wishlist' ? 'active' : ''}`} 
            onClick={() => onSelectTab('wishlist')}
          >
            <Heart size={17} />
            <span className="nav-label">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="sidebar-pill-badge badge-pink">{wishlistCount}</span>
            )}
          </button>

          <button 
            type="button" 
            className={`sidebar-nav-item ${activeTab === 'certificates' ? 'active' : ''}`} 
            onClick={() => onSelectTab('certificates')}
          >
            <Award size={17} />
            <span className="nav-label">Certificates & Awards</span>
          </button>

        </nav>
      </div>

      {/* Categories Department Filter */}
      <div className="sidebar-section">
        <span className="sidebar-section-heading">DEPARTMENTS</span>
        <div className="sidebar-category-list">
          {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
            const IconComp = iconMap[cat.icon] || Sparkles;
            const isCatActive = activeTab === 'catalog' && selectedCategory === cat.id;

            return (
              <button 
                key={cat.id} 
                type="button" 
                className={`sidebar-category-item ${isCatActive ? 'active' : ''}`} 
                onClick={() => {
                  onSelectTab('catalog');
                  onSelectCategory(cat.id);
                }}
              >
                <div className="cat-icon-bullet" style={{ color: cat.color }}>
                  <IconComp size={14} />
                </div>
                <span className="cat-label">{cat.label}</span>
                <span className="cat-count-subtle">{cat.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* IMY 320 UX Evaluation & Guide */}
      <div className="sidebar-section">
        <span className="sidebar-section-heading">ACADEMIC & UX INFO</span>
        <button 
          type="button" 
          className="sidebar-info-banner" 
          onClick={onOpenHelpModal}
        >
          <div className="info-banner-icon">
            <Zap size={15} color="#fbbf24" />
          </div>
          <div className="info-banner-text">
            <h5>IMY 320: Deliverable B</h5>
            <p>Products & Course Experience</p>
          </div>
          <HelpCircle size={14} className="info-banner-arrow" />
        </button>
      </div>

      {/* Bottom User Progression Status Card */}
      <div className="sidebar-bottom-card">
        <div className="progression-mini-header">
          <div className="status-indicator-dot" />
          <span className="progression-tier">Level 4 Creator</span>
          <span className="progression-xp">1,420 XP</span>
        </div>
        <div className="progression-bar-bg">
          <div className="progression-bar-fill" style={{ width: '72%' }} />
        </div>
        <p className="progression-status-note">
          72% to Level 5 • Master Designer
        </p>
      </div>

    </aside>
  );
}
