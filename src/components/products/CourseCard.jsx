import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Clock, 
  Heart, 
  ShoppingCart, 
  Check, 
  Sparkles,
  Users
} from 'lucide-react';

export default function CourseCard({ 
  course, 
  onSelectCourse, 
  isInCart, 
  isWishlisted, 
  isEnrolled, 
  onToggleCart, 
  onToggleWishlist 
}) {
  const discountPercent = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, borderColor: 'rgba(99, 102, 241, 0.6)' }}
      transition={{ duration: 0.2 }}
      className="course-card-glass"
      onClick={() => onSelectCourse(course.id)}
    >
      {/* Course Thumbnail & Badges */}
      <div className="card-thumb-container">
        <img 
          src={course.image} 
          alt={course.title} 
          className="card-thumb-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="card-thumb-overlay" />

        {/* Top Badges */}
        <div className="thumb-top-badges">
          <span 
            className="thumb-category-tag" 
            style={{ 
              backgroundColor: course.bgColor, 
              color: course.color,
              borderColor: course.color 
            }}
          >
            {course.category}
          </span>

          {course.badge && (
            <span className="thumb-special-tag">
              <Sparkles size={10} style={{ display: 'inline', marginRight: '3px' }} />
              {course.badge}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button (Overlay) */}
        <button 
          type="button" 
          className={`thumb-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(course);
          }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={15} fill={isWishlisted ? "#f43f5e" : "none"} color={isWishlisted ? "#f43f5e" : "#ffffff"} />
        </button>

        {/* Level Tag (Bottom Overlay) */}
        <div className="thumb-bottom-level">
          <span>{course.level}</span>
        </div>
      </div>

      {/* Course Card Body */}
      <div className="card-body-wrapper">
        
        {/* Title */}
        <h3 className="course-title-text" title={course.title}>
          {course.title}
        </h3>

        {/* Tagline / Snippet */}
        <p className="course-tagline-text">
          {course.tagline}
        </p>

        {/* Instructor Info */}
        <div className="card-instructor-row">
          <img 
            src={course.instructor.avatar} 
            alt={course.instructor.name} 
            className="instructor-avatar-small"
          />
          <span className="instructor-name-small">{course.instructor.name}</span>
        </div>

        {/* Meta Stats: Rating, Students, Duration */}
        <div className="card-meta-strip">
          <div className="meta-rating-group">
            <Star size={13} fill="#fbbf24" stroke="none" />
            <span className="rating-score">{course.rating}</span>
            <span className="rating-count">({course.ratingCount})</span>
          </div>

          <div className="meta-dot-separator">•</div>

          <div className="meta-info-item">
            <Clock size={12} />
            <span>{course.duration}</span>
          </div>

          <div className="meta-dot-separator">•</div>

          <div className="meta-info-item">
            <Users size={12} />
            <span>{course.studentsCount}</span>
          </div>
        </div>

        {/* Software / Tools Tags */}
        <div className="card-tools-row">
          {course.tools.slice(0, 3).map((tool, idx) => (
            <span key={idx} className="card-tool-badge">
              {tool}
            </span>
          ))}
          {course.tools.length > 3 && (
            <span className="card-tool-more">+{course.tools.length - 3}</span>
          )}
        </div>

        {/* Bottom Pricing & Action Row */}
        <div className="card-footer-pricing-row">
          <div className="pricing-box">
            <div className="price-primary">
              <span className="currency">$</span>
              <span className="amount">{course.price.toFixed(2)}</span>
            </div>
            <div className="price-discount-meta">
              <span className="original-price">${course.originalPrice.toFixed(2)}</span>
              <span className="discount-pill">-{discountPercent}%</span>
            </div>
          </div>

          {isEnrolled ? (
            <button 
              type="button" 
              className="btn-card-enrolled"
              onClick={(e) => {
                e.stopPropagation();
                onSelectCourse(course.id);
              }}
            >
              <Check size={14} />
              <span>Enrolled</span>
            </button>
          ) : (
            <button 
              type="button" 
              className={`btn-card-cart ${isInCart ? 'in-cart' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleCart(course);
              }}
              title={isInCart ? "Remove from cart" : "Add to cart"}
            >
              {isInCart ? (
                <>
                  <Check size={14} />
                  <span>In Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={14} />
                  <span>Add</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </motion.div>
  );
}
