import React from 'react';
import { 
  GraduationCap, 
  Play, 
  Award, 
  Clock, 
  Flame, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  Layers,
  Lock 
} from 'lucide-react';

export default function ProgressionView({ 
  enrolledCourses, 
  allCourses, 
  onStartLearning, 
  onViewCertificate, 
  onExploreCatalog 
}) {
  // Combine mock enrolled data with full course metadata
  const enrolledData = enrolledCourses.map(enc => {
    const full = allCourses.find(c => c.id === enc.courseId);
    return {
      ...full,
      ...enc
    };
  }).filter(c => c.title);

  const completedCount = enrolledData.filter(c => c.progress === 100).length;
  const inProgressCount = enrolledData.filter(c => c.progress < 100).length;
  const totalLessonsDone = enrolledData.reduce((acc, c) => acc + (c.completedLessons || 12), 0);

  return (
    <div className="progression-view-layout">
      
      {/* Top Banner Overview */}
      <div className="progression-hero-header">
        <div className="progression-hero-content">
          <div className="progression-eyebrow">
            <GraduationCap size={15} color="#818cf8" />
            <span>STUDENT LEARNING DASHBOARD</span>
          </div>

          <h2 className="progression-title">
            Track Your Course Progression & <br />
            <span className="gradient-text">Creative Milestone Achievements</span>
          </h2>

          <p className="progression-subtitle">
            Continue where you left off, review your completed project milestones, and download official IMY 320 accredited certificates.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="progression-stats-grid">
          <div className="p-stat-card">
            <div className="p-stat-icon-wrap" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <BookOpen size={18} />
            </div>
            <div className="p-stat-info">
              <h3>{enrolledData.length}</h3>
              <p>Enrolled Programs</p>
            </div>
          </div>

          <div className="p-stat-card">
            <div className="p-stat-icon-wrap" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              <CheckCircle2 size={18} />
            </div>
            <div className="p-stat-info">
              <h3>{totalLessonsDone}</h3>
              <p>Lectures Completed</p>
            </div>
          </div>

          <div className="p-stat-card">
            <div className="p-stat-icon-wrap" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
              <Flame size={18} />
            </div>
            <div className="p-stat-info">
              <h3>12 Days</h3>
              <p>Learning Streak</p>
            </div>
          </div>

          <div className="p-stat-card">
            <div className="p-stat-icon-wrap" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }}>
              <Award size={18} />
            </div>
            <div className="p-stat-info">
              <h3>{completedCount + 1}</h3>
              <p>Certificates Ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses in Progress Section */}
      <div className="progression-section-block">
        <div className="section-title-row">
          <h3 className="progression-section-title">
            <Clock size={18} color="#6366f1" />
            <span>Active Courses in Progress ({inProgressCount})</span>
          </h3>
        </div>

        {enrolledData.length > 0 ? (
          <div className="enrolled-cards-grid">
            {enrolledData.map((course) => (
              <div key={course.id} className="enrolled-course-card">
                <div className="enrolled-card-header">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="enrolled-thumb" 
                  />
                  <div className="enrolled-header-meta">
                    <span className="enrolled-cat" style={{ color: course.color }}>
                      {course.category}
                    </span>
                    <h4 className="enrolled-title">{course.title}</h4>
                    <span className="enrolled-inst">Instructor: {course.instructor?.name}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="enrolled-progress-box">
                  <div className="progress-labels">
                    <span className="progress-pct-label">Progress: <strong>{course.progress}%</strong></span>
                    <span className="progress-lessons-count">
                      {course.completedLessons || Math.round((course.lessonsCount * course.progress) / 100)} / {course.lessonsCount} lessons
                    </span>
                  </div>
                  <div className="progress-track-lg">
                    <div 
                      className="progress-fill-lg" 
                      style={{ 
                        width: `${course.progress}%`,
                        background: course.progress === 100 
                          ? 'linear-gradient(90deg, #10b981, #34d399)' 
                          : 'linear-gradient(90deg, #6366f1, #38bdf8)'
                      }}
                    />
                  </div>
                </div>

                {/* Next Up Lesson */}
                <div className="next-lesson-box">
                  <span className="next-lesson-tag">UP NEXT:</span>
                  <p className="next-lesson-title">
                    {course.lastLesson || 'Module 2: Procedural Geometry Nodes & Shaders'}
                  </p>
                </div>

                {/* Actions */}
                <div className="enrolled-actions-row">
                  <button 
                    type="button" 
                    className="btn-continue-learning" 
                    onClick={() => onStartLearning(course.id)}
                  >
                    <Play size={14} fill="#ffffff" />
                    <span>{course.progress === 100 ? 'Review Course' : 'Continue Lesson'}</span>
                  </button>

                  {course.progress === 100 && (
                    <button 
                      type="button" 
                      className="btn-view-certificate" 
                      onClick={() => onViewCertificate(course)}
                    >
                      <Award size={14} />
                      <span>Certificate</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-enrolled-box">
            <BookOpen size={36} color="#6366f1" />
            <h4>You have not enrolled in any courses yet</h4>
            <p>Explore our catalog of high-impact multimedia courses to begin your journey.</p>
            <button 
              type="button" 
              className="btn-submit-purple" 
              style={{ width: 'auto', padding: '12px 24px', margin: '16px auto 0' }} 
              onClick={onExploreCatalog}
            >
              Browse Catalog
            </button>
          </div>
        )}
      </div>

      {/* Verified Achievements & Badges Strip */}
      <div className="progression-section-block">
        <h3 className="progression-section-title">
          <Award size={18} color="#fbbf24" />
          <span>Skill Badges & Milestones</span>
        </h3>

        <div className="badges-showcase-grid">
          <div className="achievement-badge-card unlocked">
            <div className="badge-icon-box gold">
              <Flame size={24} />
            </div>
            <div className="badge-details">
              <h4>12-Day Streak</h4>
              <p>Maintained consistent daily learning sessions.</p>
              <span className="badge-status-unlocked">✓ Unlocked</span>
            </div>
          </div>

          <div className="achievement-badge-card unlocked">
            <div className="badge-icon-box purple">
              <Layers size={24} />
            </div>
            <div className="badge-details">
              <h4>Motion Alchemist</h4>
              <p>Completed 25 kinetic animation keyframe exercises.</p>
              <span className="badge-status-unlocked">✓ Unlocked</span>
            </div>
          </div>

          <div className="achievement-badge-card unlocked">
            <div className="badge-icon-box cyan">
              <Sparkles size={24} />
            </div>
            <div className="badge-details">
              <h4>UX Heuristic Auditor</h4>
              <p>Scored 95%+ on UEQ questionnaire analysis module.</p>
              <span className="badge-status-unlocked">✓ Unlocked</span>
            </div>
          </div>

          <div className="achievement-badge-card locked">
            <div className="badge-icon-box gray">
              <Award size={24} />
            </div>
            <div className="badge-details">
              <h4>3D CGI Master</h4>
              <p>Render 5 photorealistic Cycles scenes in Blender.</p>
              <span className="badge-status-locked">
                <Lock size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} /> 3/5 Completed
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
