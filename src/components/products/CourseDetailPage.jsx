import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  ShieldCheck, 
  Check, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Share2, 
  Heart, 
  ShoppingCart, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Award, 
  Download, 
  FileCode, 
  MessageSquare, 
  Sparkles, 
  Globe, 
  Monitor, 
  CheckCircle2, 
  Lock, 
  ThumbsUp 
} from 'lucide-react';

export default function CourseDetailPage({ 
  course, 
  onBack, 
  isInCart, 
  isWishlisted, 
  isEnrolled, 
  onToggleCart, 
  onToggleWishlist, 
  onBuyNow, 
  onStartLearning, 
  onShowToast, 
  relatedCourses, 
  onSelectCourse 
}) {
  const [expandedModules, setExpandedModules] = useState({ 0: true });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35);
  const [activePreviewLesson, setActivePreviewLesson] = useState(
    course?.syllabus?.[0]?.lessons?.[0]?.title || 'Course Overview & Intro'
  );
  const [helpfulReviews, setHelpfulReviews] = useState({});

  if (!course) return null;

  const discountPercent = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  const toggleModule = (idx) => {
    setExpandedModules(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const expandAllModules = () => {
    const all = {};
    course.syllabus?.forEach((_, i) => { all[i] = true; });
    setExpandedModules(all);
  };

  const collapseAllModules = () => {
    setExpandedModules({});
  };

  const handleLessonPreviewClick = (lesson) => {
    if (lesson.preview) {
      setActivePreviewLesson(lesson.title);
      setIsVideoPlaying(true);
      onShowToast(`Playing preview: "${lesson.title}"`, 'info');
    } else if (isEnrolled) {
      onStartLearning(course.id);
    } else {
      onShowToast('This lesson is locked. Enroll or add to cart to unlock full course access.', 'info');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    onShowToast('Course URL copied to clipboard!', 'success');
  };

  const handleToggleHelpful = (reviewId) => {
    setHelpfulReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
    onShowToast('Feedback recorded. Thank you!', 'info');
  };

  return (
    <div className="course-detail-view-container">
      
      {/* Top Breadcrumb Navigation */}
      <div className="detail-breadcrumb-bar">
        <button type="button" className="btn-detail-back" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </button>
        <div className="breadcrumb-trail">
          <span onClick={onBack} className="trail-link">Courses</span>
          <span className="trail-sep">/</span>
          <span onClick={onBack} className="trail-link">{course.category}</span>
          <span className="trail-sep">/</span>
          <span className="trail-current">{course.title}</span>
        </div>
      </div>

      {/* Main Grid Layout: Left Content & Right Sticky Card */}
      <div className="detail-main-layout">
        
        {/* Left Column: Full Content */}
        <div className="detail-left-column">
          
          {/* Header Banner */}
          <div className="detail-header-block">
            
            <div className="detail-tags-row">
              <span 
                className="detail-cat-badge"
                style={{ 
                  backgroundColor: course.bgColor, 
                  color: course.color,
                  borderColor: course.color 
                }}
              >
                {course.category}
              </span>
              
              {course.badge && (
                <span className="detail-badge-gold">
                  <Sparkles size={12} /> {course.badge}
                </span>
              )}

              <span className="detail-level-pill">{course.level}</span>
            </div>

            <h1 className="detail-title-large">{course.title}</h1>
            <p className="detail-tagline-large">{course.tagline}</p>

            {/* Header Meta Row */}
            <div className="detail-meta-row">
              <div className="detail-rating-pill">
                <span className="detail-score">{course.rating}</span>
                <div className="stars-cluster">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#fbbf24" stroke="none" />
                  ))}
                </div>
                <span className="detail-reviews-num">({course.ratingCount} ratings)</span>
              </div>

              <div className="detail-meta-sep">•</div>

              <div className="detail-students-meta">
                <Users size={14} />
                <span>{course.studentsCount} students enrolled</span>
              </div>

              <div className="detail-meta-sep">•</div>

              <div className="detail-updated-meta">
                <Globe size={14} />
                <span>English [Auto], English CC</span>
              </div>
            </div>

            {/* Instructor Line */}
            <div className="detail-instructor-line">
              <span>Created by</span>
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name}
                className="instructor-avatar-inline" 
              />
              <strong className="instructor-name-highlight">{course.instructor.name}</strong>
              <span className="instructor-role-sub">({course.instructor.role})</span>
            </div>

          </div>

          {/* Video Preview Player Simulation */}
          <div className="video-player-preview-wrapper">
            <div className="player-canvas">
              <img 
                src={course.bannerImage || course.image} 
                alt="Course Preview" 
                className="player-bg-poster"
              />
              <div className="player-dark-scrim" />

              {/* Player Center Control */}
              <div className="player-center-action">
                <button 
                  type="button" 
                  className={`player-play-btn ${isVideoPlaying ? 'playing' : ''}`}
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  title={isVideoPlaying ? "Pause preview" : "Play preview lesson"}
                >
                  {isVideoPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '4px' }} />}
                </button>
                <span className="player-now-playing-label">
                  {isVideoPlaying ? 'Now Playing: ' : 'Preview Lesson: '} <strong>{activePreviewLesson}</strong>
                </span>
              </div>

              {/* Player Top Badges */}
              <div className="player-top-hud">
                <span className="player-hud-tag">
                  <Play size={10} fill="#ffffff" /> 4K PREVIEW MODE
                </span>
                <span className="player-hud-watermark">Create.IT Academy</span>
              </div>

              {/* Player Bottom Control Bar */}
              <div className="player-controls-bar">
                <div 
                  className="player-scrubber-track"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = ((e.clientX - rect.left) / rect.width) * 100;
                    setVideoProgress(Math.max(0, Math.min(100, pos)));
                  }}
                >
                  <div className="player-scrubber-fill" style={{ width: `${videoProgress}%` }} />
                </div>

                <div className="player-controls-row">
                  <div className="controls-left">
                    <button 
                      type="button" 
                      className="ctrl-btn"
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    >
                      {isVideoPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>

                    <button 
                      type="button" 
                      className="ctrl-btn"
                      onClick={() => setIsVideoMuted(!isVideoMuted)}
                    >
                      {isVideoMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>

                    <span className="player-time-text">04:12 / 18:40</span>
                  </div>

                  <div className="controls-right">
                    <span className="player-res-badge">1080p 60fps</span>
                    <button 
                      type="button" 
                      className="ctrl-btn"
                      onClick={() => onShowToast('Fullscreen video player mode enabled', 'info')}
                    >
                      <Maximize size={16} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* What You'll Learn Box */}
          <div className="detail-section-card what-you-learn-card">
            <h3 className="section-card-heading">
              <CheckCircle2 size={18} color="#34d399" />
              <span>What You'll Learn in This Program</span>
            </h3>

            <div className="learn-items-grid">
              {course.whatYouWillLearn?.map((item, idx) => (
                <div key={idx} className="learn-item-row">
                  <div className="learn-check-icon">
                    <Check size={14} />
                  </div>
                  <span className="learn-item-text">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies Covered */}
          <div className="detail-section-card">
            <h3 className="section-card-heading">
              <Layers size={18} color="#818cf8" />
              <span>Industry Tools & Software Covered</span>
            </h3>
            <div className="tools-badges-cluster">
              {course.tools?.map((tool, idx) => (
                <div key={idx} className="tool-pill-lg">
                  <span className="tool-dot" />
                  <span className="tool-name">{tool}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Curriculum / Syllabus Accordion */}
          <div className="detail-section-card">
            <div className="syllabus-header-row">
              <div>
                <h3 className="section-card-heading" style={{ marginBottom: '4px' }}>
                  <BookOpen size={18} color="#38bdf8" />
                  <span>Course Curriculum & Modules</span>
                </h3>
                <p className="syllabus-sub-meta">
                  {course.modulesCount || course.syllabus?.length} modules • {course.lessonsCount} lessons • {course.duration} total length
                </p>
              </div>

              <div className="syllabus-toggle-actions">
                <button type="button" onClick={expandAllModules} className="btn-syllabus-expand">
                  Expand all
                </button>
                <span>/</span>
                <button type="button" onClick={collapseAllModules} className="btn-syllabus-expand">
                  Collapse all
                </button>
              </div>
            </div>

            {/* Modules List */}
            <div className="syllabus-accordion-list">
              {course.syllabus?.map((module, mIdx) => {
                const isExpanded = !!expandedModules[mIdx];

                return (
                  <div key={mIdx} className="accordion-module-card">
                    <button 
                      type="button" 
                      className="module-header-btn"
                      onClick={() => toggleModule(mIdx)}
                    >
                      <div className="module-title-left">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        <span className="module-title-text">
                          Module {module.moduleNumber || mIdx + 1}: {module.title}
                        </span>
                      </div>
                      <div className="module-meta-right">
                        <span>{module.lessons?.length || 4} lectures</span>
                        <span>•</span>
                        <span>{module.duration}</span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="module-lessons-container">
                        {module.lessons?.map((lesson, lIdx) => (
                          <div 
                            key={lIdx} 
                            className={`lesson-row-item ${lesson.preview ? 'previewable' : ''}`}
                            onClick={() => handleLessonPreviewClick(lesson)}
                          >
                            <div className="lesson-left">
                              {lesson.preview ? (
                                <Play size={13} className="lesson-play-icon" />
                              ) : (
                                <Lock size={13} className="lesson-lock-icon" />
                              )}
                              <span className="lesson-title-text">{lesson.title}</span>
                            </div>

                            <div className="lesson-right">
                              {lesson.preview && (
                                <span className="badge-preview-free">Preview</span>
                              )}
                              <span className="lesson-duration-text">{lesson.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prerequisites */}
          <div className="detail-section-card">
            <h3 className="section-card-heading">
              <ShieldCheck size={18} color="#fbbf24" />
              <span>Prerequisites & Requirements</span>
            </h3>
            <ul className="prereq-bullets-list">
              {course.prerequisites?.map((prereq, idx) => (
                <li key={idx}>{prereq}</li>
              ))}
            </ul>
          </div>

          {/* Description Markdown Overview */}
          <div className="detail-section-card">
            <h3 className="section-card-heading">
              <FileCode size={18} color="#c084fc" />
              <span>Description & Studio Learning Outcomes</span>
            </h3>
            <div className="detail-long-desc">
              {course.description.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Instructor Bio Card */}
          <div className="detail-section-card instructor-bio-card">
            <h3 className="section-card-heading">
              <Award size={18} color="#f43f5e" />
              <span>About Your Lead Instructor</span>
            </h3>

            <div className="instructor-card-content">
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name} 
                className="instructor-avatar-profile"
              />
              <div className="instructor-bio-details">
                <h4 className="instructor-profile-name">{course.instructor.name}</h4>
                <p className="instructor-profile-role">{course.instructor.role}</p>

                <div className="instructor-stats-strip">
                  <div className="inst-stat">
                    <Star size={13} fill="#fbbf24" stroke="none" />
                    <strong>{course.rating}</strong> Instructor Rating
                  </div>
                  <div className="inst-stat">
                    <Users size={13} />
                    <strong>48,000+</strong> Students
                  </div>
                  <div className="inst-stat">
                    <BookOpen size={13} />
                    <strong>6</strong> Courses
                  </div>
                </div>

                <p className="instructor-bio-text">{course.instructor.bio}</p>
              </div>
            </div>
          </div>

          {/* Student Reviews Section */}
          <div className="detail-section-card">
            <h3 className="section-card-heading">
              <MessageSquare size={18} color="#38bdf8" />
              <span>Student Feedback & Ratings</span>
            </h3>

            {/* Ratings Breakdown Grid */}
            <div className="reviews-breakdown-box">
              <div className="overall-score-col">
                <span className="big-rating-number">{course.rating}</span>
                <div className="stars-cluster-large">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" stroke="none" />
                  ))}
                </div>
                <span className="overall-label">Course Score</span>
              </div>

              <div className="bars-progress-col">
                {[
                  { star: 5, pct: 88 },
                  { star: 4, pct: 9 },
                  { star: 3, pct: 2 },
                  { star: 2, pct: 1 },
                  { star: 1, pct: 0 }
                ].map((row, idx) => (
                  <div key={idx} className="star-bar-row">
                    <span className="star-label">{row.star} stars</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="bar-pct">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="reviews-list">
              {course.reviews?.map(rev => {
                const isHelpful = !!helpfulReviews[rev.id];

                return (
                  <div key={rev.id} className="student-review-card">
                    <div className="review-top-line">
                      <div className="review-author-group">
                        <img src={rev.avatar} alt={rev.author} className="review-avatar" />
                        <div>
                          <h5 className="review-author-name">{rev.author}</h5>
                          <div className="review-rating-stars">
                            {[...Array(rev.rating)].map((_, s) => (
                              <Star key={s} size={11} fill="#fbbf24" stroke="none" />
                            ))}
                            <span className="review-date-str">{rev.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="review-comment-body">{rev.comment}</p>

                    <div className="review-helpful-action">
                      <button 
                        type="button" 
                        className={`btn-helpful ${isHelpful ? 'active' : ''}`}
                        onClick={() => handleToggleHelpful(rev.id)}
                      >
                        <ThumbsUp size={12} />
                        <span>{isHelpful ? 'Helpful (1)' : 'Helpful'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Related / Recommended Courses */}
          {relatedCourses && relatedCourses.length > 0 && (
            <div className="detail-section-card related-courses-section">
              <h3 className="section-card-heading">
                <Sparkles size={18} color="#c084fc" />
                <span>Related Programs for Multimedia Creators</span>
              </h3>
              <div className="related-courses-grid">
                {relatedCourses.filter(c => c.id !== course.id).slice(0, 2).map(rc => (
                  <div 
                    key={rc.id} 
                    className="related-course-card-mini"
                    onClick={() => onSelectCourse(rc.id)}
                  >
                    <img src={rc.image} alt={rc.title} className="rc-img" />
                    <div className="rc-info">
                      <span className="rc-cat" style={{ color: rc.color }}>{rc.category}</span>
                      <h4 className="rc-title">{rc.title}</h4>
                      <div className="rc-meta">
                        <Star size={11} fill="#fbbf24" stroke="none" />
                        <span>{rc.rating}</span>
                        <span>•</span>
                        <strong>${rc.price.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Sticky Purchase & Enrollment Card */}
        <div className="detail-right-column">
          <div className="sticky-enrollment-card">
            
            {/* Card Thumbnail / Preview trigger */}
            <div className="sticky-thumb-box" onClick={() => setIsVideoPlaying(true)}>
              <img src={course.image} alt={course.title} className="sticky-thumb-img" />
              <div className="sticky-play-overlay">
                <div className="play-pulse-circle">
                  <Play size={20} fill="#ffffff" />
                </div>
                <span>Preview this course</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="sticky-pricing-box">
              <div className="price-row-primary">
                <span className="current-price-lg">${course.price.toFixed(2)}</span>
                <span className="orig-price-lg">${course.originalPrice.toFixed(2)}</span>
                <span className="discount-badge-lg">-{discountPercent}% OFF</span>
              </div>
              <p className="urgency-timer-text">
                <Clock size={12} /> Special pricing ends in <strong>14 hours</strong>
              </p>
            </div>

            {/* Main Action Buttons */}
            <div className="sticky-actions-group">
              
              {isEnrolled ? (
                <button 
                  type="button" 
                  className="btn-sticky-primary btn-enrolled-active"
                  onClick={() => onStartLearning(course.id)}
                >
                  <Play size={16} />
                  <span>Continue Learning</span>
                </button>
              ) : (
                <>
                  <button 
                    type="button" 
                    className={`btn-sticky-primary ${isInCart ? 'in-cart-btn' : ''}`}
                    onClick={() => onToggleCart(course)}
                  >
                    <ShoppingCart size={16} />
                    <span>{isInCart ? 'In Shopping Cart' : 'Add to Cart'}</span>
                  </button>

                  <button 
                    type="button" 
                    className="btn-sticky-secondary"
                    onClick={() => onBuyNow(course)}
                  >
                    <span>Instant Enroll / Buy Now</span>
                  </button>
                </>
              )}

              {/* Wishlist Button */}
              <button 
                type="button" 
                className={`btn-sticky-wishlist ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(course)}
              >
                <Heart size={15} fill={isWishlisted ? "#f43f5e" : "none"} color={isWishlisted ? "#f43f5e" : "#ffffff"} />
                <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

            </div>

            {/* Guarantee Tag */}
            <div className="sticky-guarantee-note">
              <ShieldCheck size={14} color="#34d399" />
              <span>30-Day Money-Back Guarantee</span>
            </div>

            {/* Inclusions Feature List */}
            <div className="sticky-inclusions-list">
              <h5 className="inclusions-title">This course includes:</h5>
              <div className="inclusion-item">
                <Clock size={14} color="#818cf8" />
                <span>{course.duration} on-demand 4K video</span>
              </div>
              <div className="inclusion-item">
                <Download size={14} color="#818cf8" />
                <span>38+ downloadable studio project files</span>
              </div>
              <div className="inclusion-item">
                <Globe size={14} color="#818cf8" />
                <span>Full lifetime access across devices</span>
              </div>
              <div className="inclusion-item">
                <Monitor size={14} color="#818cf8" />
                <span>Access on mobile, tablet & desktop</span>
              </div>
              <div className="inclusion-item">
                <Award size={14} color="#818cf8" />
                <span>Certificate of Completion (IMY 320)</span>
              </div>
              <div className="inclusion-item">
                <MessageSquare size={14} color="#818cf8" />
                <span>1-on-1 instructor capstone feedback</span>
              </div>
            </div>

            {/* Share & Code Info */}
            <div className="sticky-card-footer">
              <button type="button" className="btn-share-course" onClick={handleShare}>
                <Share2 size={13} />
                <span>Share Course</span>
              </button>
              <span className="course-sku-text">ID: {course.id.toUpperCase()}</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
