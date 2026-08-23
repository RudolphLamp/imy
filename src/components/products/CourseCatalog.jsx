import React, { useState, useMemo } from 'react';
import { 
  Grid, 
  List, 
  X, 
  Flame, 
  BookOpen,
  ArrowRight,
  Tag
} from 'lucide-react';
import { CATEGORIES } from '../../data/coursesData';
import CourseCard from './CourseCard';

export default function CourseCatalog({ 
  courses, 
  selectedCategory, 
  onSelectCategory, 
  searchQuery, 
  onSearchChange,
  onSelectCourse,
  cartItems,
  wishlistItems,
  enrolledCourses,
  onToggleCart,
  onToggleWishlist,
  onQuickPromoApply
}) {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filter & Sort computation
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Category match
      if (selectedCategory !== 'all' && course.categoryId !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = course.title.toLowerCase().includes(q);
        const matchCategory = course.category.toLowerCase().includes(q);
        const matchTagline = course.tagline.toLowerCase().includes(q);
        const matchTools = course.tools.some(t => t.toLowerCase().includes(q));
        const matchInstructor = course.instructor.name.toLowerCase().includes(q);
        if (!matchTitle && !matchCategory && !matchTagline && !matchTools && !matchInstructor) {
          return false;
        }
      }
      // Level filter
      if (selectedLevel !== 'all') {
        if (selectedLevel === 'Beginner' && !course.level.toLowerCase().includes('beginner') && !course.level.toLowerCase().includes('all')) {
          return false;
        }
        if (selectedLevel === 'Intermediate' && !course.level.toLowerCase().includes('intermediate') && !course.level.toLowerCase().includes('all')) {
          return false;
        }
        if (selectedLevel === 'Advanced' && !course.level.toLowerCase().includes('advanced')) {
          return false;
        }
      }
      // Price range
      if (selectedPriceRange !== 'all') {
        if (selectedPriceRange === 'under60' && course.price >= 60) return false;
        if (selectedPriceRange === '60to75' && (course.price < 60 || course.price > 75)) return false;
        if (selectedPriceRange === 'above75' && course.price <= 75) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.studentsNumber - a.studentsNumber;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });
  }, [courses, selectedCategory, searchQuery, selectedLevel, selectedPriceRange, sortBy]);

  const hasActiveFilters = selectedCategory !== 'all' || selectedLevel !== 'all' || selectedPriceRange !== 'all' || searchQuery.trim() !== '';

  const clearAllFilters = () => {
    onSelectCategory('all');
    setSelectedLevel('all');
    setSelectedPriceRange('all');
    onSearchChange('');
  };

  const isCourseInCart = (id) => cartItems.some(item => item.id === id);
  const isCourseWishlisted = (id) => wishlistItems.some(item => item.id === id);
  const isCourseEnrolled = (id) => enrolledCourses.some(item => item.courseId === id);

  return (
    <div className="course-catalog-layout">
      
      {/* Featured Promo Hero Banner */}
      {!searchQuery && selectedCategory === 'all' && (
        <div className="catalog-hero-banner">
          <div className="banner-glow-orb" />
          
          <div className="banner-content">
            <div className="banner-eyebrow">
              <Flame size={14} color="#f43f5e" />
              <span>IMY 320 SEMESTER 2 SPECIAL</span>
            </div>

            <h2 className="banner-headline">
              Elevate Your Creative Portfolio with <br />
              <span className="gradient-text">Studio-Grade Multimedia Modules</span>
            </h2>

            <p className="banner-subtext">
              Unlock access to motion graphics, 3D CGI rendering, and UX prototyping. Use coupon code <strong className="banner-code-highlight" onClick={() => onQuickPromoApply('IMY320')}>IMY320</strong> for an instant 25% discount on all courses.
            </p>

            <div className="banner-actions">
              <button 
                type="button" 
                className="banner-primary-btn"
                onClick={() => onSelectCategory('motion')}
              >
                <span>Explore Motion Graphics</span>
                <ArrowRight size={15} />
              </button>

              <button 
                type="button" 
                className="banner-secondary-btn"
                onClick={() => onQuickPromoApply('IMY320')}
              >
                <Tag size={14} />
                <span>Claim 25% Off Coupon</span>
              </button>
            </div>
          </div>

          <div className="banner-stats-pill-group">
            <div className="banner-stat-box">
              <span className="stat-number">240+</span>
              <span className="stat-label">Hours of Content</span>
            </div>
            <div className="banner-stat-box">
              <span className="stat-number">100%</span>
              <span className="stat-label">IMY Aligned</span>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter Pills Bar */}
      <div className="catalog-category-bar">
        {CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`category-pill-btn ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <span>{cat.label}</span>
              <span className="cat-badge-num">{cat.count}</span>
            </button>
          );
        })}
      </div>

      {/* Filter & Sort Toolbar */}
      <div className="catalog-toolbar">
        
        {/* Left: Results Count & Active Filters */}
        <div className="toolbar-left">
          <span className="results-count-text">
            Showing <strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'course' : 'courses'}
            {selectedCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === selectedCategory)?.label}`}
          </span>

          {hasActiveFilters && (
            <button 
              type="button" 
              className="btn-clear-filters"
              onClick={clearAllFilters}
            >
              <X size={12} />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Right: Dropdowns & View Mode */}
        <div className="toolbar-right">
          
          {/* Level Filter Dropdown */}
          <div className="toolbar-select-wrapper">
            <label className="select-label">Level:</label>
            <select 
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="toolbar-select"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="toolbar-select-wrapper">
            <label className="select-label">Price:</label>
            <select 
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="toolbar-select"
            >
              <option value="all">All Prices</option>
              <option value="under60">Under $60</option>
              <option value="60to75">$60 - $75</option>
              <option value="above75">$75+</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="toolbar-select-wrapper">
            <label className="select-label">Sort by:</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="toolbar-select"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="view-mode-toggle-group">
            <button 
              type="button"
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid size={15} />
            </button>
            <button 
              type="button"
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List size={15} />
            </button>
          </div>

        </div>

      </div>

      {/* Courses Grid / List Area */}
      {filteredCourses.length > 0 ? (
        <div className={viewMode === 'grid' ? 'courses-catalog-grid' : 'courses-catalog-list'}>
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onSelectCourse={onSelectCourse}
              isInCart={isCourseInCart(course.id)}
              isWishlisted={isCourseWishlisted(course.id)}
              isEnrolled={isCourseEnrolled(course.id)}
              onToggleCart={onToggleCart}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="catalog-empty-state">
          <div className="empty-icon-circle">
            <BookOpen size={32} color="#6366f1" />
          </div>
          <h3 className="empty-title">No courses match your criteria</h3>
          <p className="empty-desc">
            Try adjusting your search query or removing active filters to explore more topics.
          </p>
          <button 
            type="button" 
            className="btn-submit-purple" 
            style={{ width: 'auto', padding: '12px 24px', margin: '16px auto 0' }}
            onClick={clearAllFilters}
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
}
