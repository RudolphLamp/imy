import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Bell, 
  LogOut, 
  BookOpen, 
  Award, 
  Sparkles, 
  X, 
  ChevronDown, 
  Menu, 
  ShieldCheck, 
  Tag, 
  GraduationCap 
} from 'lucide-react';

export default function TopNavbar({ 
  user, 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenWishlist, 
  onNavigateTab, 
  onLogout, 
  onBackToHome, 
  searchQuery, 
  onSearchChange, 
  isSidebarOpen, 
  onToggleSidebar, 
  notifications, 
  onMarkNotificationsRead 
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications ? notifications.filter(n => n.unread).length : 0;

  return (
    <header className="top-navbar-container">
      {/* Left: Sidebar Toggle & Brand */}
      <div className="top-navbar-left">
        <button 
          type="button" 
          className="sidebar-toggle-btn"
          onClick={onToggleSidebar}
          title={isSidebarOpen ? "Collapse navigation" : "Expand navigation"}
        >
          <Menu size={18} />
        </button>

        <div className="navbar-brand-wrapper" onClick={onBackToHome} style={{ cursor: 'pointer' }}>
          <h1 className="brand-title">
            Create<span>.IT</span>
          </h1>
          <span className="brand-academy-tag">ACADEMY</span>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="top-navbar-center">
        <div className="search-bar-wrapper">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search motion graphics, 3D CGI, UX design, game dev, tools..." 
            value={searchQuery} 
            onChange={(e) => onSearchChange(e.target.value)} 
          />
          {searchQuery ? (
            <button 
              type="button" 
              className="search-clear-btn" 
              onClick={() => onSearchChange('')} 
              title="Clear search"
            >
              <X size={14} />
            </button>
          ) : (
            <span className="search-kbd-hint">⌘K</span>
          )}
        </div>
      </div>

      {/* Right: Actions & User Menu */}
      <div className="top-navbar-right">
        
        {/* Wishlist Button */}
        <button 
          type="button" 
          className="nav-icon-action-btn" 
          onClick={onOpenWishlist} 
          title="Saved Courses / Wishlist"
        >
          <Heart size={18} />
          {wishlistCount > 0 && (
            <span className="badge-counter badge-pink">{wishlistCount}</span>
          )}
        </button>

        {/* Cart Button */}
        <button 
          type="button" 
          className="nav-icon-action-btn nav-cart-btn" 
          onClick={onOpenCart} 
          title="Shopping Cart & Checkout"
        >
          <ShoppingCart size={18} />
          {cartCount > 0 && (
            <span className="badge-counter badge-purple">{cartCount}</span>
          )}
        </button>

        {/* Notifications Dropdown */}
        <div className="dropdown-relative-container" ref={notifRef}>
          <button 
            type="button" 
            className={`nav-icon-action-btn ${isNotificationsOpen ? 'active' : ''}`} 
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              if (!isNotificationsOpen && unreadCount > 0 && onMarkNotificationsRead) {
                onMarkNotificationsRead();
              }
            }} 
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="badge-counter badge-amber">{unreadCount}</span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="notifications-popover-menu">
              <div className="popover-header">
                <div className="popover-title-group">
                  <span className="popover-title">Notifications</span>
                  {unreadCount > 0 && <span className="popover-unread-pill">{unreadCount} new</span>}
                </div>
                <button 
                  type="button" 
                  className="popover-mark-all" 
                  onClick={onMarkNotificationsRead}
                >
                  Mark all read
                </button>
              </div>

              <div className="popover-list">
                {notifications && notifications.length > 0 ? (
                  notifications.map(notif => (
                    <div key={notif.id} className={`notif-item ${notif.unread ? 'unread' : ''}`}>
                      <div className="notif-item-icon">
                        {notif.type === 'promo' ? <Tag size={14} color="#fbbf24" /> : 
                         notif.type === 'achievement' ? <Award size={14} color="#34d399" /> : 
                         <Sparkles size={14} color="#818cf8" />}
                      </div>
                      <div className="notif-item-body">
                        <h4 className="notif-title">{notif.title}</h4>
                        <p className="notif-text">{notif.message}</p>
                        <span className="notif-time">{notif.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="notif-empty">No notifications yet</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="navbar-divider" />

        {/* User Profile Pill & Dropdown */}
        <div className="dropdown-relative-container" ref={profileRef}>
          <button 
            type="button" 
            className="user-profile-trigger" 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="user-avatar-circle">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="user-details-compact">
              <span className="user-display-name">{user?.name || 'Jane Smith'}</span>
              <span className="user-tier-badge">IMY Student</span>
            </div>
            <ChevronDown size={14} className="user-chevron" />
          </button>

          {isProfileOpen && (
            <div className="user-dropdown-menu">
              <div className="dropdown-user-header">
                <div className="dropdown-avatar-lg">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h4 className="dropdown-user-name">{user?.name || 'Jane Smith'}</h4>
                  <p className="dropdown-user-email">{user?.email || 'student@up.ac.za'}</p>
                  <span className="dropdown-pro-badge">
                    <ShieldCheck size={12} /> Verified Creator
                  </span>
                </div>
              </div>

              <div className="dropdown-menu-divider" />

              <div className="dropdown-menu-items">
                <button 
                  type="button" 
                  className="dropdown-item" 
                  onClick={() => {
                    onNavigateTab('catalog');
                    setIsProfileOpen(false);
                  }}
                >
                  <BookOpen size={15} />
                  <span>Browse Catalog</span>
                </button>

                <button 
                  type="button" 
                  className="dropdown-item" 
                  onClick={() => {
                    onNavigateTab('progression');
                    setIsProfileOpen(false);
                  }}
                >
                  <GraduationCap size={15} />
                  <span>My Learning & Progression</span>
                </button>

                <button 
                  type="button" 
                  className="dropdown-item" 
                  onClick={() => {
                    onOpenWishlist();
                    setIsProfileOpen(false);
                  }}
                >
                  <Heart size={15} />
                  <span>Saved Courses ({wishlistCount})</span>
                </button>

                <button 
                  type="button" 
                  className="dropdown-item" 
                  onClick={() => {
                    onOpenCart();
                    setIsProfileOpen(false);
                  }}
                >
                  <ShoppingCart size={15} />
                  <span>Shopping Cart ({cartCount})</span>
                </button>
              </div>

              <div className="dropdown-menu-divider" />

              <div className="dropdown-menu-footer">
                <button 
                  type="button" 
                  className="dropdown-item dropdown-logout-btn" 
                  onClick={() => {
                    setIsProfileOpen(false);
                    onLogout();
                  }}
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
