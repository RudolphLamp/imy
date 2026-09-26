import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  LogOut, 
  BookOpen, 
  Check, 
  ArrowLeft, 
  Layers, 
  Clock, 
  Star, 
  Trash2, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles, 
  Award, 
  CreditCard, 
  Plus, 
  SlidersHorizontal, 
  ArrowUpDown, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight,
  Users, 
  Wrench,
  ShieldCheck
} from 'lucide-react';
import { loadCourses } from '../../utils/csvLoader';
import defaultHeroImg from '../../assets/hero.png';
import CustomerExperience from './CustomerExperience';
import EnrollmentCelebration from './EnrollmentCelebration';
import { sampleOrders, sampleTickets, sampleReviews } from '../../data/customerMockData';
import Footer from '../Footer';

// Rich Category color accents
const CATEGORY_COLORS = {
  'Motion Graphics': { bg: 'rgba(192, 132, 252, 0.18)', text: '#c084fc', border: 'rgba(192, 132, 252, 0.4)' },
  '3D & CGI': { bg: 'rgba(56, 189, 248, 0.18)', text: '#38bdf8', border: 'rgba(56, 189, 248, 0.4)' },
  'UX/UI & Product': { bg: 'rgba(251, 191, 36, 0.18)', text: '#fbbf24', border: 'rgba(251, 191, 36, 0.4)' },
  'UX/UI Design': { bg: 'rgba(251, 191, 36, 0.18)', text: '#fbbf24', border: 'rgba(251, 191, 36, 0.4)' },
  'Game Dev & CGI': { bg: 'rgba(244, 63, 94, 0.18)', text: '#fb7185', border: 'rgba(244, 63, 94, 0.4)' },
  'Game Development': { bg: 'rgba(244, 63, 94, 0.18)', text: '#fb7185', border: 'rgba(244, 63, 94, 0.4)' },
  'Spatial Audio': { bg: 'rgba(16, 185, 129, 0.18)', text: '#34d399', border: 'rgba(16, 185, 129, 0.4)' },
  'VFX & Post': { bg: 'rgba(99, 102, 241, 0.18)', text: '#818cf8', border: 'rgba(99, 102, 241, 0.4)' },
  'Digital Art': { bg: 'rgba(244, 114, 182, 0.18)', text: '#f472b6', border: 'rgba(244, 114, 182, 0.4)' },
  'Creative Tech': { bg: 'rgba(167, 139, 250, 0.18)', text: '#a78bfa', border: 'rgba(167, 139, 250, 0.4)' },
  'Post-Production': { bg: 'rgba(251, 146, 60, 0.18)', text: '#fb923c', border: 'rgba(251, 146, 60, 0.4)' },
  '2D Animation': { bg: 'rgba(45, 212, 191, 0.18)', text: '#2dd4bf', border: 'rgba(45, 212, 191, 0.4)' }
};

const readStoredList = (key, fallback = [], legacyKey = null) => {
  try {
    const saved = localStorage.getItem(key) ?? (legacyKey ? localStorage.getItem(legacyKey) : null);
    const value = saved === null ? fallback : JSON.parse(saved);
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
};

export default function ProductsView({ user, onUpdateUser, onLogout, onShowToast, onNavigateView }) {
  const accountId = (user?.id || user?.email || 'demo-jane').toLowerCase();
  const storagePrefix = `createit_${encodeURIComponent(accountId)}_`;
  const legacyKey = (name) => accountId === 'jane.smith@createit.academy' ? `createit_${name}` : null;
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState(() => new URLSearchParams(window.location.search).get('view') === 'customer' ? 'customer' : 'catalog');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [expandedCurriculums, setExpandedCurriculums] = useState({});
  const [orders, setOrders] = useState(() => readStoredList(`${storagePrefix}orders`, sampleOrders, legacyKey('orders')));
  const [tickets, setTickets] = useState(() => readStoredList(`${storagePrefix}tickets`, sampleTickets, legacyKey('tickets')));
  const [reviews, setReviews] = useState(() => readStoredList(`${storagePrefix}reviews`, sampleReviews, legacyKey('reviews')));
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customerSection, setCustomerSection] = useState('overview');
  const [newOrderId, setNewOrderId] = useState(null);
  const [celebrationOpen, setCelebrationOpen] = useState(false);
  const [celebrationCourses, setCelebrationCourses] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem('createit_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('createit_sidebar_collapsed', String(sidebarCollapsed));
    } catch {}
  }, [sidebarCollapsed]);
  
  // Sort, Level & Price filters
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-asc', 'price-desc', 'rating', 'title'
  const [levelFilter, setLevelFilter] = useState('all'); // 'all', 'Beginner', 'Intermediate', 'Advanced'
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'under600', '600-750', 'above750'

  // Cart & Enrolled state with localStorage persistence
  const [cart, setCart] = useState(() => {
    return readStoredList(`${storagePrefix}cart`, [], legacyKey('cart'));
  });

  const [enrolled, setEnrolled] = useState(() => {
    return readStoredList(`${storagePrefix}enrolled`, [
      { courseId: '1', progress: 65 },
      { courseId: '2', progress: 30 }
    ], legacyKey('enrolled'));
  });

  // Load CSV data on mount dynamically from /courses.csv
  useEffect(() => {
    loadCourses().then((data) => {
      setCourses(data);
    });
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(`${storagePrefix}cart`, JSON.stringify(cart));
  }, [cart, storagePrefix]);

  useEffect(() => {
    localStorage.setItem(`${storagePrefix}enrolled`, JSON.stringify(enrolled));
  }, [enrolled, storagePrefix]);

  useEffect(() => { localStorage.setItem(`${storagePrefix}orders`, JSON.stringify(orders)); }, [orders, storagePrefix]);
  useEffect(() => { localStorage.setItem(`${storagePrefix}tickets`, JSON.stringify(tickets)); }, [tickets, storagePrefix]);
  useEffect(() => { localStorage.setItem(`${storagePrefix}reviews`, JSON.stringify(reviews)); }, [reviews, storagePrefix]);

  // Unique categories derived dynamically from loaded courses
  const categories = useMemo(() => {
    const set = new Set(courses.map(c => c.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [courses]);

  // Filtered & Sorted courses for the Searchable List
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      // Category filter
      if (selectedCategory !== 'All' && c.category !== selectedCategory) {
        return false;
      }

      // Level filter
      if (levelFilter !== 'all') {
        const cLevel = (c.level || '').toLowerCase();
        if (levelFilter === 'Beginner' && !cLevel.includes('beginner') && !cLevel.includes('all')) return false;
        if (levelFilter === 'Intermediate' && !cLevel.includes('intermediate') && !cLevel.includes('all')) return false;
        if (levelFilter === 'Advanced' && !cLevel.includes('advanced')) return false;
      }

      // Price range filter (in Rands)
      if (priceFilter === 'under600' && c.price >= 600) return false;
      if (priceFilter === '600-750' && (c.price < 600 || c.price > 750)) return false;
      if (priceFilter === 'above750' && c.price <= 750) return false;

      // Real-time Search Query across title, category, instructor, description, tools, and lessons
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (c.title || '').toLowerCase().includes(q);
        const matchCat = (c.category || '').toLowerCase().includes(q);
        const matchInst = (c.instructor || '').toLowerCase().includes(q);
        const matchDesc = (c.description || '').toLowerCase().includes(q);
        const matchTools = Array.isArray(c.tools) ? c.tools.some(t => t.toLowerCase().includes(q)) : false;
        const matchLessons = Array.isArray(c.lessons) ? c.lessons.some(l => l.toLowerCase().includes(q)) : false;

        if (!matchTitle && !matchCat && !matchInst && !matchDesc && !matchTools && !matchLessons) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '');
      return 0;
    });
  }, [courses, selectedCategory, searchQuery, sortBy, levelFilter, priceFilter]);

  // Selected course object for full description view
  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  // Cart actions
  const handleToggleCart = (course, e) => {
    if (e) e.stopPropagation();
    if (enrolled.some(item => item.courseId === course.id)) {
      onShowToast?.('This course is already in My Learning.', 'info');
      return;
    }
    if (cart.some(item => item.id === course.id)) {
      setCart(cart.filter(item => item.id !== course.id));
      onShowToast?.(`Removed "${course.title}" from cart.`, 'info');
    } else {
      setCart([...cart, course]);
      onShowToast?.(`Added "${course.title}" to cart!`, 'success');
    }
  };

  const handleRemoveFromCart = (courseId) => {
    setCart(cart.filter(item => item.id !== courseId));
    onShowToast?.('Item removed from cart.', 'info');
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Snapshot the cart before clearing it, so the celebration can use it
    const purchasedCourses = [...cart];

    const order = {
      id: `CIT-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      items: cart.map(({ id, title, price }) => ({ id, title, price })),
      total: cart.reduce((sum, item) => sum + item.price, 0)
    };
    const newEnrolled = [...enrolled];
    cart.forEach(item => {
      if (!newEnrolled.some(e => e.courseId === item.id)) {
        newEnrolled.push({ courseId: item.id, progress: 0 });
      }
    });
    setEnrolled(newEnrolled);
    setOrders(prev => [order, ...prev]);
    setNewOrderId(order.id);
    setCart([]);
    setCheckoutOpen(false);

    // Show the celebration overlay instead of jumping straight to the customer hub
    setCelebrationCourses(purchasedCourses);
    setCelebrationOpen(true);
  };

  const handleInstantEnroll = (course, e) => {
    if (e) e.stopPropagation();
    if (enrolled.some(item => item.courseId === course.id)) {
      setActiveTab('dashboard');
      setSelectedCourseId(null);
      return;
    }
    if (!cart.some(item => item.id === course.id)) setCart(prev => [...prev, course]);
    setActiveTab('cart');
    setSelectedCourseId(null);
    onShowToast?.(`"${course.title}" is ready for checkout.`, 'success');
  };

  const handleCelebrationStartLearning = () => {
    setCelebrationOpen(false);
    setCelebrationCourses([]);
    setSelectedCourseId(null);
    setActiveTab('dashboard');
    onShowToast?.('Your learning dashboard is ready.', 'success');
  };

  const handleCelebrationClose = () => {
    setCelebrationOpen(false);
    setCelebrationCourses([]);
    setSelectedCourseId(null);
    setActiveTab('customer');
    onShowToast?.('Your courses are ready. Scroll down to see your receipt.', 'info');
  };

  // Progress actions
  const handleIncreaseProgress = (courseId) => {
    setEnrolled(prev => prev.map(item => {
      if (item.courseId === courseId) {
        const next = Math.min(100, item.progress + 25);
        return { ...item, progress: next };
      }
      return item;
    }));
    onShowToast?.('Lesson completed (+25% progress)!', 'success');
  };

  const toggleCurriculumAccordion = (courseId, e) => {
    if (e) e.stopPropagation();
    setExpandedCurriculums(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSortBy('popular');
    setLevelFilter('all');
    setPriceFilter('all');
    setSearchQuery('');
  };

  const handleTagCategoryClick = (category, e) => {
    if (e) e.stopPropagation();
    setSelectedCourseId(null);
    setSelectedCategory(category);
    setSearchQuery('');
    setActiveTab('catalog');
  };

  const handleTagToolClick = (tool, e) => {
    if (e) e.stopPropagation();
    setSelectedCourseId(null);
    setSelectedCategory('All');
    setSearchQuery(tool);
    setActiveTab('catalog');
  };

  const hasActiveFilters = selectedCategory !== 'All' || sortBy !== 'popular' || levelFilter !== 'all' || priceFilter !== 'all' || searchQuery.trim() !== '';

  const cartTotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const completedCount = enrolled.filter(e => e.progress >= 100).length;
  const inProgressCount = enrolled.filter(e => e.progress < 100).length;
  const totalModules = enrolled.reduce((sum, item) => sum + (courses.find(course => course.id === item.courseId)?.lessons?.length || 0), 0);

  return (
    <div className="sleek-app-root">
      
      {/* Floating Top Navbar */}
      <header className="sleek-floating-top-nav">
        
        {/* Brand + Sidebar toggle */}
        <div className="navbar-left-group">
          <button
            type="button"
            className="sidebar-toggle-btn"
            onClick={() => setSidebarCollapsed(prev => !prev)}
            title={sidebarCollapsed ? 'Open navigation' : 'Collapse navigation'}
            aria-label={sidebarCollapsed ? 'Open navigation' : 'Collapse navigation'}
            aria-expanded={!sidebarCollapsed}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          <div className="navbar-left-brand" onClick={() => { setActiveTab('catalog'); setSelectedCourseId(null); }}>
            <div className="brand-icon-gem">
              <Sparkles size={18} color="#ffffff" />
            </div>
            <h2 className="brand-logo-text">
              Create<span>.IT</span>
            </h2>
          </div>
        </div>

        {/* Global Live Search Bar */}
        <div className="navbar-search-pill">
          <Search size={16} className="search-icon-inside" />
          <input 
            type="text"
            placeholder="Search creative programs, tools, instructors..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (selectedCourseId) setSelectedCourseId(null);
              if (activeTab !== 'catalog') setActiveTab('catalog');
            }}
            className="sleek-search-input"
          />
          {searchQuery && (
            <button 
              type="button" 
              className="btn-clear-search-mini"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Right Actions: Shopping Cart & User Profile */}
        <div className="navbar-right-actions">
          
          <button 
            type="button" 
            className={`sleek-vibrant-cart-btn ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => {
              setSelectedCourseId(null);
              setActiveTab('cart');
            }}
          >
            <div className="cart-btn-icon-box">
              <ShoppingCart size={16} />
              {cart.length > 0 && <span className="cart-btn-badge-dot">{cart.length}</span>}
            </div>
            <div className="cart-btn-text-box">
              <span className="cart-btn-label">Cart ({cart.length})</span>
              <strong className="cart-btn-rands">R{cartTotal.toFixed(2)}</strong>
            </div>
          </button>

          <div className="sleek-user-pill">
            <div className="user-avatar-gradient">
              <User size={15} />
            </div>
            <span className="user-name-label">{user?.name || 'Jane Smith'}</span>
          </div>

          <button 
            type="button" 
            className="sleek-btn-logout"
            onClick={onLogout}
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* App Body with Floating Sidebar and Main Workspace */}
      <div className="sleek-workspace-body">
        
        {/* Floating Side Navigation */}
        <aside className={`sleek-floating-sidebar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          
          {/* Navigation Menu */}
          <div className="sidebar-nav-section">
            <span className="sidebar-heading-label">NAVIGATION</span>
            
            <button 
              type="button" 
              className={`sleek-nav-item ${activeTab === 'catalog' && selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => {
                setSelectedCourseId(null);
                setSelectedCategory('All');
                setActiveTab('catalog');
              }}
            >
              <div className="nav-icon-wrap" style={{ color: '#818cf8' }}>
                <BookOpen size={16} />
              </div>
              <span className="nav-text">Searchable Catalog</span>
            </button>

            <button 
              type="button" 
              className={`sleek-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => {
                setSelectedCourseId(null);
                setActiveTab('dashboard');
              }}
            >
              <div className="nav-icon-wrap" style={{ color: '#38bdf8' }}>
                <GraduationCap size={16} />
              </div>
              <span className="nav-text">My Learning</span>
              {enrolled.length > 0 && (
                <span className="nav-count-pill">{enrolled.length}</span>
              )}
            </button>

            <button
              type="button"
              className={`sleek-nav-item ${activeTab === 'customer' ? 'active' : ''}`}
              onClick={() => { setSelectedCourseId(null); setActiveTab('customer'); }}
            >
              <div className="nav-icon-wrap" style={{ color: '#fbbf24' }}><User size={16} /></div>
              <span className="nav-text">Customer Experience</span>
            </button>

            <button 
              type="button" 
              className={`sleek-nav-item ${activeTab === 'cart' ? 'active' : ''}`}
              onClick={() => {
                setSelectedCourseId(null);
                setActiveTab('cart');
              }}
            >
              <div className="nav-icon-wrap" style={{ color: '#34d399' }}>
                <ShoppingCart size={16} />
              </div>
              <span className="nav-text">Shopping Cart</span>
              {cart.length > 0 && (
                <span className="nav-count-pill badge-emerald">{cart.length}</span>
              )}
            </button>
          </div>

          {activeTab === 'customer' && <div className="cx-sidebar-card">
            <span className="cx-section-kicker">MY WORKSPACE</span>
            <div className="cx-sidebar-avatar"><User size={22} /></div>
            <strong>{user?.name || 'Creator'}</strong>
            <small>{user?.email || 'Local prototype account'}</small>
            <div className="cx-sidebar-rule" />
            <span>{enrolled.length} courses in your learning space</span>
            <button type="button" onClick={() => setActiveTab('dashboard')}>Open My Learning <ArrowLeft size={13} /></button>
            <p>Activity is stored on this device.</p>
          </div>}

          {/* Sort & Filter Controls in Sidebar */}
          {activeTab === 'catalog' && <div className="sidebar-nav-section sidebar-filters-box">
            <div className="sidebar-heading-row">
              <span className="sidebar-heading-label" style={{ paddingLeft: 0, marginBottom: 0 }}>
                <SlidersHorizontal size={12} style={{ display: 'inline', marginRight: '4px' }} />
                SORT & FILTERS
              </span>
              {hasActiveFilters && (
                <button type="button" className="btn-reset-filters-mini" onClick={handleResetFilters} title="Reset all filters">
                  <RotateCcw size={11} /> Reset
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="sidebar-filter-control">
              <label className="filter-field-label">
                <ArrowUpDown size={11} /> Sort by
              </label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sidebar-select-control"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title">Title: A - Z</option>
              </select>
            </div>

            {/* Level Filter */}
            <div className="sidebar-filter-control">
              <label className="filter-field-label">
                <GraduationCap size={11} /> Skill Level
              </label>
              <select 
                value={levelFilter} 
                onChange={(e) => setLevelFilter(e.target.value)}
                className="sidebar-select-control"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="sidebar-filter-control">
              <label className="filter-field-label">
                <CreditCard size={11} /> Price Range
              </label>
              <select 
                value={priceFilter} 
                onChange={(e) => setPriceFilter(e.target.value)}
                className="sidebar-select-control"
              >
                <option value="all">All Prices</option>
                <option value="under600">Under R600</option>
                <option value="600-750">R600 - R750</option>
                <option value="above750">Above R750</option>
              </select>
            </div>
          </div>}

          {/* Department / Category Shortcuts */}
          {activeTab === 'catalog' && <div className="sidebar-nav-section">
            <span className="sidebar-heading-label">CREATIVE CATEGORIES</span>
            {categories.map(cat => {
              const catStyle = CATEGORY_COLORS[cat] || { text: '#a5b4fc' };
              const isSelected = activeTab === 'catalog' && selectedCategory === cat;

              return (
                <button 
                  key={cat}
                  type="button" 
                  className={`sleek-nav-item ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCourseId(null);
                    setSelectedCategory(cat);
                    setActiveTab('catalog');
                  }}
                >
                  <div className="nav-icon-wrap" style={{ color: catStyle.text }}>
                    <Layers size={14} />
                  </div>
                  <span className="nav-text">{cat}</span>
                </button>
              );
            })}
          </div>}

        </aside>

        {/* Main Content Area */}
        <main className="sleek-main-workspace">
          
          {/* 1. Full Course Description & Syllabus View */}
          {selectedCourseId && selectedCourse ? (
            <div className="sleek-description-container">
              
              <button 
                type="button" 
                className="sleek-back-btn"
                onClick={() => setSelectedCourseId(null)}
              >
                <ArrowLeft size={16} />
                <span>Back to Searchable List</span>
              </button>

              <div className="sleek-detail-card">
                
                {/* Hero Banner */}
                <div className="detail-banner-box">
                  <img src={selectedCourse.image || defaultHeroImg} alt={selectedCourse.title} className="detail-banner-img" />
                  <div className="detail-banner-gradient-overlay" />
                  
                  <div className="detail-banner-content">
                    {(() => {
                      const colorDef = CATEGORY_COLORS[selectedCourse.category] || { bg: 'rgba(99, 102, 241, 0.2)', text: '#818cf8', border: '#6366f1' };
                      return (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                          <button
                            type="button"
                            className="detail-cat-pill interactive-tag"
                            style={{ backgroundColor: colorDef.bg, color: colorDef.text, borderColor: colorDef.border }}
                            onClick={(e) => handleTagCategoryClick(selectedCourse.category, e)}
                            title={`Filter by ${selectedCourse.category}`}
                          >
                            {selectedCourse.category}
                          </button>
                          {selectedCourse.badge && (
                            <span className="list-row-badge-pill">
                              <Sparkles size={11} /> {selectedCourse.badge}
                            </span>
                          )}
                          <span className="list-row-level-tag" style={{ color: '#cbd5e1' }}>
                            {selectedCourse.level}
                          </span>
                        </div>
                      );
                    })()}
                    <h1 className="detail-title-text">{selectedCourse.title}</h1>
                    <p className="detail-instructor-line">Lead Instructor: <strong>{selectedCourse.instructor}</strong></p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="detail-body-pane">
                  
                  {/* Top Stats Bar */}
                  <div className="detail-stats-bar">
                    <div className="stat-pill">
                      <Clock size={14} color="#38bdf8" />
                      <span>{selectedCourse.duration}</span>
                    </div>

                    <div className="stat-pill">
                      <Star size={14} fill="#fbbf24" stroke="none" />
                      <span>{selectedCourse.rating} Rating</span>
                    </div>

                    <div className="stat-pill">
                      <Users size={14} color="#a78bfa" />
                      <span>{selectedCourse.students || selectedCourse.studentsCount || '12k'} Enrolled</span>
                    </div>

                    <div className="detail-price-highlight">
                      <span className="price-tag-sub">Tuition:</span>
                      <span className="price-tag-amount">R{selectedCourse.price.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Description Overview */}
                  <div className="detail-text-block">
                    <h3>Course Overview & Studio Objectives</h3>
                    <p>{selectedCourse.description}</p>
                  </div>

                  {/* Industry Tools Covered */}
                  {selectedCourse.tools && selectedCourse.tools.length > 0 && (
                    <div className="detail-text-block">
                      <h3>Software & Technologies Covered</h3>
                      <div className="list-tools-cluster" style={{ marginTop: '8px' }}>
                        {selectedCourse.tools.map((tool, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="list-tool-chip interactive-tag"
                            style={{ fontSize: '12px', padding: '4px 10px' }}
                            onClick={(e) => handleTagToolClick(tool, e)}
                            title={`Search for ${tool}`}
                          >
                            <Wrench size={11} style={{ display: 'inline', marginRight: '4px' }} />
                            {tool}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Modules & Curriculum Accordion */}
                  <div className="detail-modules-block">
                    <h3>Structured Curriculum & Modules</h3>
                    <div className="detail-modules-grid">
                      {selectedCourse.lessons.map((les, idx) => (
                        <div key={idx} className="module-item-pill">
                          <CheckCircle2 size={16} color="#34d399" />
                          <span>{les}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="detail-action-buttons">
                    {!enrolled.some(item => item.courseId === selectedCourse.id) && <button
                      type="button" 
                      className={`btn-vibrant-cart-action ${cart.some(item => item.id === selectedCourse.id) ? 'in-cart' : ''}`}
                      onClick={(e) => handleToggleCart(selectedCourse, e)}
                    >
                      <ShoppingCart size={17} />
                      <span>{cart.some(item => item.id === selectedCourse.id) ? 'In Your Cart ✓' : 'Add to Cart (R' + selectedCourse.price.toFixed(2) + ')'}</span>
                    </button>}

                    <button 
                      type="button" 
                      className="btn-primary-emerald"
                      onClick={(e) => handleInstantEnroll(selectedCourse, e)}
                    >
                      <Check size={17} />
                      <span>{enrolled.some(item => item.courseId === selectedCourse.id) ? 'Go to My Learning' : 'Continue to Checkout'}</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>
          ) : activeTab === 'catalog' ? (
            /* 2. Searchable Course List View (NO CELLS - Dedicated Searchable List) */
            <div className="sleek-catalog-container">
              
              {/* Course Catalogue Header Banner */}
              <div className="sleek-catalog-banner">
                <div className="banner-content-left">
                  <h2 className="banner-title">Creative Course Catalogue</h2>
                  <p className="banner-sub">
                    Filter and search industry-standard masterclasses in motion design, 3D CGI, UX prototyping, spatial audio, and real-time game art.
                  </p>
                </div>
                <div className="banner-count-box">
                  <span className="count-big-num">{filteredCourses.length}</span>
                  <span className="count-sub-label">Courses</span>
                </div>
              </div>

              {/* Category Filter Pills Bar */}
              <div className="catalog-header-bar">
                <div className="sleek-category-pills-row">
                  {categories.map(cat => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button 
                        key={cat}
                        type="button" 
                        className={`sleek-cat-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {hasActiveFilters && (
                  <button 
                    type="button" 
                    className="btn-reset-filters-mini"
                    onClick={handleResetFilters}
                  >
                    <RotateCcw size={12} /> Reset Filters
                  </button>
                )}
              </div>

              {/* Status Header: Showing X Results */}
              <div className="list-search-status-bar">
                <span className="list-status-text">
                  Showing <strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'creative program' : 'creative programs'}
                  {searchQuery ? ` matching "${searchQuery}"` : ''}
                  {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
                </span>
              </div>

              {/* Searchable Vertical List (NO CELLS) */}
              {filteredCourses.length > 0 ? (
                <div className="searchable-course-list">
                  {filteredCourses.map(course => {
                    const colorDef = CATEGORY_COLORS[course.category] || { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8', border: '#6366f1' };
                    const isInCart = cart.some(item => item.id === course.id);
                    const isEnrolled = enrolled.some(e => e.courseId === course.id);
                    const isCurriculumOpen = !!expandedCurriculums[course.id];

                    return (
                      <div 
                        key={course.id} 
                        className={`searchable-list-row-item ${isInCart ? 'selected-in-cart' : ''}`}
                        onClick={() => setSelectedCourseId(course.id)}
                      >
                        {/* 1. Left Thumbnail Box */}
                        <div className="list-row-thumb-box">
                          <img 
                            src={course.image || defaultHeroImg} 
                            alt={course.title} 
                            className="list-row-thumb-img"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = defaultHeroImg;
                            }}
                          />
                          <button
                            type="button"
                            className="list-row-cat-tag interactive-tag"
                            style={{ backgroundColor: colorDef.bg, color: colorDef.text, borderColor: colorDef.border }}
                            onClick={(e) => handleTagCategoryClick(course.category, e)}
                            title={`Filter by ${course.category}`}
                          >
                            {course.category}
                          </button>
                          <span className="list-row-duration-pill">
                            <Clock size={10} /> {course.duration}
                          </span>
                        </div>

                        {/* 2. Middle Content Pane */}
                        <div className="list-row-content-pane">
                          
                          {/* Badges & Level Row */}
                          <div className="list-row-header-tags">
                            {course.badge && (
                              <span className="list-row-badge-pill">
                                <Sparkles size={10} /> {course.badge}
                              </span>
                            )}
                            <span className="list-row-level-tag">
                              {course.level || 'All Levels'}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="list-row-title">{course.title}</h3>

                          {/* Description Snippet */}
                          <p className="list-row-desc">{course.description}</p>

                          {/* Software / Tools Badges */}
                          {course.tools && course.tools.length > 0 && (
                            <div className="list-tools-cluster">
                              {course.tools.map((tool, tIdx) => (
                                <button
                                  key={tIdx}
                                  type="button"
                                  className="list-tool-chip interactive-tag"
                                  onClick={(e) => handleTagToolClick(tool, e)}
                                  title={`Search for ${tool}`}
                                >
                                  {tool}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Meta Row: Rating, Students, Instructor, Quick Curriculum Toggle */}
                          <div className="list-meta-strip">
                            <span className="list-meta-item">
                              <Star size={12} fill="#fbbf24" stroke="none" /> 
                              <strong>{course.rating}</strong>
                            </span>
                            <span>•</span>
                            <span className="list-meta-item">
                              <Users size={12} /> {course.students || course.studentsCount || '10k'} enrolled
                            </span>
                            <span>•</span>
                            <span className="list-meta-item">
                              Lead Instructor: <strong className="list-instructor-highlight">{course.instructor}</strong>
                            </span>
                            <span>•</span>
                            <button 
                              type="button" 
                              className="btn-curriculum-accordion-toggle"
                              onClick={(e) => toggleCurriculumAccordion(course.id, e)}
                            >
                              <span>Curriculum ({course.lessons?.length || 4} modules)</span>
                              {isCurriculumOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>
                          </div>

                          {/* Inline Curriculum Accordion Breakdown */}
                          {isCurriculumOpen && (
                            <div className="list-row-curriculum-accordion" onClick={(e) => e.stopPropagation()}>
                              <div className="list-curriculum-chips-grid">
                                {course.lessons.map((les, lIdx) => (
                                  <div key={lIdx} className="list-curriculum-chip">
                                    <CheckCircle2 size={12} color="#34d399" style={{ display: 'inline', marginRight: '4px' }} />
                                    {les}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>

                        {/* 3. Right Actions & Pricing Column */}
                        <div className="list-row-actions-pane" onClick={(e) => e.stopPropagation()}>
                          
                          <div className="list-row-price-display">
                            <span className="list-row-price-val">R{course.price.toFixed(2)}</span>
                            <span className="list-row-price-tax">Includes Full Diploma</span>
                          </div>

                          {isEnrolled ? (
                            <button 
                              type="button"
                              className="list-btn-cart-toggle in-cart"
                              onClick={() => setActiveTab('dashboard')}
                            >
                              <Check size={13} />
                              <span>Enrolled ✓</span>
                            </button>
                          ) : (
                            <button 
                              type="button"
                              className={`list-btn-cart-toggle ${isInCart ? 'in-cart' : ''}`}
                              onClick={(e) => handleToggleCart(course, e)}
                              title={isInCart ? "Remove from cart" : "Add to cart"}
                            >
                              {isInCart ? <Check size={13} /> : <Plus size={13} />}
                              <span>{isInCart ? 'In Cart ✓' : 'Add to Cart'}</span>
                            </button>
                          )}

                          <button 
                            type="button"
                            className="list-btn-view-details"
                            onClick={() => setSelectedCourseId(course.id)}
                          >
                            <span>Syllabus & Info →</span>
                          </button>

                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty Search / Filter State */
                <div className="catalog-empty-state-list">
                  <div className="empty-icon-circle">
                    <Search size={32} color="#818cf8" />
                  </div>
                  <h3>No creative courses matched your search</h3>
                  <p>Try searching for a different creative discipline (e.g. Cinema 4D, Figma, Blender, Unreal Engine, Audio, VFX) or reset your active filters.</p>
                  <button 
                    type="button" 
                    className="btn-submit-purple"
                    style={{ width: 'auto', padding: '10px 20px', margin: '14px auto 0' }}
                    onClick={handleResetFilters}
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

            </div>
          ) : activeTab === 'dashboard' ? (
            /* 3. Student Dashboard View */
            <div className="sleek-dashboard-container">
              
              <div className="dashboard-hero-strip">
                <div>
                  <h2 className="catalog-main-title">Student Learning Dashboard</h2>
                  <p className="catalog-main-sub">Track your enrolled courses, active progression, and graduation milestones.</p>
                </div>
              </div>

              {/* 4 Stats Cards */}
              <div className="dashboard-stats-row">
                <div className="stat-card-glass stat-card-purple">
                  <div className="stat-icon-circle purple">
                    <BookOpen size={20} />
                  </div>
                  <div className="stat-text-box">
                    <h3>{enrolled.length}</h3>
                    <p>Enrolled Courses</p>
                  </div>
                </div>

                <div className="stat-card-glass stat-card-cyan">
                  <div className="stat-icon-circle cyan">
                    <Clock size={20} />
                  </div>
                  <div className="stat-text-box">
                    <h3>{inProgressCount}</h3>
                    <p>In Progress</p>
                  </div>
                </div>

                <div className="stat-card-glass stat-card-emerald">
                  <div className="stat-icon-circle emerald">
                    <Award size={20} />
                  </div>
                  <div className="stat-text-box">
                    <h3>{completedCount}</h3>
                    <p>Completed</p>
                  </div>
                </div>

                <div className="stat-card-glass stat-card-amber">
                  <div className="stat-icon-circle amber">
                    <Layers size={20} />
                  </div>
                  <div className="stat-text-box">
                    <h3>{totalModules}</h3>
                    <p>Course Modules</p>
                  </div>
                </div>
              </div>

              {/* Enrolled Courses Progression List */}
              <div className="dashboard-enrolled-section">
                <h3 className="section-subtitle">Active Course Progression</h3>

                <div className="dashboard-enrolled-list">
                  {enrolled.map(item => {
                    const course = courses.find(c => c.id === item.courseId);
                    if (!course) return null;
                    const colorDef = CATEGORY_COLORS[course.category] || { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8' };

                    return (
                      <div key={item.courseId} className="enrolled-item-card">
                        <img src={course.image || defaultHeroImg} alt={course.title} className="enrolled-thumb-rounded" />
                        
                        <div className="enrolled-details-pane">
                          <div className="enrolled-title-row">
                            <div>
                              <span className="enrolled-cat-badge" style={{ color: colorDef.text }}>
                                {course.category}
                              </span>
                              <h4 className="enrolled-course-name">{course.title}</h4>
                              <span className="enrolled-instructor-name">Instructor: {course.instructor}</span>
                            </div>

                            <div className="enrolled-progress-pct-box">
                              <span className="pct-num">{item.progress}%</span>
                              <span className="pct-label">{item.progress >= 100 ? 'Completed' : 'Progress'}</span>
                            </div>
                          </div>

                          {/* Progress Bar with Gradient */}
                          <div className="enrolled-progressbar-track">
                            <div 
                              className="enrolled-progressbar-fill" 
                              style={{ 
                                width: `${item.progress}%`,
                                background: item.progress >= 100 
                                  ? 'linear-gradient(90deg, #10b981, #34d399)' 
                                  : 'linear-gradient(90deg, #6366f1, #38bdf8)'
                              }} 
                            />
                          </div>

                          {/* Actions */}
                          <div className="enrolled-action-buttons">
                            <button 
                              type="button" 
                              className="btn-progress-step"
                              onClick={() => handleIncreaseProgress(item.courseId)}
                            >
                              {item.progress >= 100 ? 'Review Course Material ✓' : 'Complete Next Lesson (+25%)'}
                            </button>

                            <button 
                              type="button" 
                              className="btn-progress-view-info"
                              onClick={() => setSelectedCourseId(course.id)}
                            >
                              Course Details
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : activeTab === 'customer' ? (
            <CustomerExperience
              user={user}
              onUpdateUser={onUpdateUser}
              orders={orders}
              tickets={tickets}
              onAddTicket={(ticket) => setTickets(prev => [ticket, ...prev])}
              reviews={reviews}
              onAddReview={(review) => setReviews(prev => [review, ...prev.filter(item => item.courseId !== review.courseId)])}
              enrolled={enrolled}
              courses={courses}
              onOpenCourse={(id) => { setActiveTab('catalog'); setSelectedCourseId(id); }}
              onOpenLearning={() => setActiveTab('dashboard')}
              onExploreCatalog={() => { setSelectedCourseId(null); setActiveTab('catalog'); }}
              onLoadDemoData={() => { setOrders(sampleOrders); setTickets(sampleTickets); setReviews(sampleReviews); onShowToast?.('Sample experience loaded.', 'success'); }}
              onShowToast={onShowToast}
              newOrderId={newOrderId}
              onDismissOrder={() => setNewOrderId(null)}
              initialSection={customerSection}
            />
          ) : activeTab === 'cart' ? (
            /* 4. Cart View */
            <div className="sleek-cart-container">
              
              <div className="catalog-header-bar">
                <div>
                  <h2 className="catalog-main-title">Shopping Cart</h2>
                  <p className="catalog-main-sub">Review your selected creative courses and proceed to checkout.</p>
                </div>
              </div>

              {cart.length > 0 ? (
                <div className="cart-glass-panel">
                  
                  <div className="cart-items-stack">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item-row">
                        <img src={item.image || defaultHeroImg} alt={item.title} className="cart-item-thumb" />
                        
                        <div className="cart-item-info">
                          <h4>{item.title}</h4>
                          <span className="cart-item-meta">{item.category} • {item.instructor}</span>
                        </div>

                        <div className="cart-item-price-tag">
                          R{item.price.toFixed(2)}
                        </div>

                        <button 
                          type="button" 
                          className="cart-btn-remove"
                          onClick={() => handleRemoveFromCart(item.id)}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-checkout-bar">
                    <div className="cart-subtotal-box">
                      <span className="cart-subtotal-label">Total Tuition:</span>
                      <strong className="cart-subtotal-val">R{cartTotal.toFixed(2)}</strong>
                    </div>

                    <button 
                      type="button" 
                      className="btn-primary-emerald"
                      onClick={() => setCheckoutOpen(true)}
                    >
                      <CreditCard size={18} />
                      <span>Review Checkout</span>
                    </button>
                  </div>

                </div>
              ) : (
                <div className="cart-empty-box">
                  <div className="cart-empty-icon-circle">
                    <ShoppingCart size={32} color="#6366f1" />
                  </div>
                  <h3>Your shopping cart is empty</h3>
                  <p>Explore the course catalog to add creative programs to your cart.</p>
                  <button 
                    type="button" 
                    className="btn-vibrant-cart-action"
                    onClick={() => setActiveTab('catalog')}
                    style={{ marginTop: '16px' }}
                  >
                    Browse Course Catalog
                  </button>
                </div>
              )}

            </div>
          ) : null}

        <Footer
          onNavigate={(target) => {
            if (target === 'login' || target === 'landing' || target === 'register') {
              onNavigateView?.(target);
            } else {
              setSelectedCourseId(null);
              setActiveTab('catalog');
            }
          }}
          onNavigateToTab={(tab, section) => {
            setSelectedCourseId(null);
            setActiveTab(tab);
            if (section) setCustomerSection(section);
          }}
        />

        </main>

      </div>

      {checkoutOpen && <div className="cx-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false); }}>
        <div className="cx-checkout-modal" role="dialog" aria-modal="true" aria-labelledby="cx-checkout-title">
          <span className="cx-section-kicker">FINAL STEP</span>
          <h2 id="cx-checkout-title">Review your order</h2>
          <p>Confirm this prototype checkout to add the courses to My Learning and create a receipt.</p>
          <div className="cx-checkout-items">{cart.map(item => <div key={item.id}><span>{item.title}</span><strong>R{item.price.toFixed(2)}</strong></div>)}</div>
          <div className="cx-checkout-total"><span>Total</span><strong>R{cartTotal.toFixed(2)}</strong></div>
          <p className="cx-checkout-note"><ShieldCheck size={16} /> Demo only. No payment details or money are collected.</p>
          <div className="cx-modal-actions"><button type="button" className="cx-secondary" onClick={() => setCheckoutOpen(false)}>Back to cart</button><button type="button" className="cx-primary" onClick={handleCheckout}>Confirm demo order <Check size={16} /></button></div>
        </div>
      </div>}

      <EnrollmentCelebration
        isOpen={celebrationOpen}
        enrolledCourses={celebrationCourses}
        orderId={newOrderId}
        onStartLearning={handleCelebrationStartLearning}
        onClose={handleCelebrationClose}
      />

    </div>
  );
}
