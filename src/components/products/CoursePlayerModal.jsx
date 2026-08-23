import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  CheckCircle2, 
  Circle, 
  Download, 
  FileText, 
  ArrowLeft 
} from 'lucide-react';

export default function CoursePlayerModal({ 
  isOpen, 
  onClose, 
  course, 
  enrolledInfo, 
  onUpdateProgress, 
  onShowToast 
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  const [activeTab, setActiveTab] = useState('syllabus'); // 'syllabus', 'notes', 'resources'
  const [completedLessonsMap, setCompletedLessonsMap] = useState({});
  const [currentLesson, setCurrentLesson] = useState(
    course?.syllabus?.[0]?.lessons?.[0]?.title || 'Course Introduction & Pipeline Overview'
  );

  if (!isOpen || !course) return null;

  const handleToggleLessonComplete = (lessonTitle) => {
    const isNowDone = !completedLessonsMap[lessonTitle];
    const newMap = { ...completedLessonsMap, [lessonTitle]: isNowDone };
    setCompletedLessonsMap(newMap);

    const doneCount = Object.values(newMap).filter(Boolean).length;
    const totalLessons = course.lessonsCount || 40;
    const newPct = Math.min(100, Math.round(((enrolledInfo?.completedLessons || 15) + doneCount) / totalLessons * 100));

    onUpdateProgress(course.id, newPct);
    onShowToast(
      isNowDone ? `✓ Completed "${lessonTitle}"! Progress updated to ${newPct}%.` : `Marked "${lessonTitle}" as incomplete.`,
      'success'
    );
  };

  return (
    <div className="player-modal-overlay">
      <div className="player-modal-container">
        
        {/* Top Navbar */}
        <div className="player-modal-topbar">
          <div className="player-topbar-left">
            <button type="button" className="btn-player-back" onClick={onClose}>
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </button>
            <div className="player-course-meta">
              <span className="player-cat-pill" style={{ color: course.color }}>{course.category}</span>
              <h3 className="player-course-title">{course.title}</h3>
            </div>
          </div>

          <div className="player-topbar-right">
            <button 
              type="button" 
              className="btn-mark-active-complete" 
              onClick={() => handleToggleLessonComplete(currentLesson)}
            >
              <CheckCircle2 size={15} />
              <span>{completedLessonsMap[currentLesson] ? 'Completed ✓' : 'Mark Current Lesson Complete'}</span>
            </button>

            <button type="button" className="btn-player-close" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Main Split Layout: Video Screen on Left, Syllabus & Notes on Right */}
        <div className="player-modal-main-split">
          
          {/* Left: Video Player */}
          <div className="player-video-column">
            <div className="active-video-viewport">
              <img 
                src={course.bannerImage || course.image} 
                alt="Course Playback" 
                className="video-poster-img" 
              />
              <div className="video-viewport-scrim" />

              {/* Center Play/Pause Overlay */}
              <button 
                type="button" 
                className="viewport-center-btn" 
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
              </button>

              {/* Bottom Custom Video Bar */}
              <div className="video-bottom-controls-bar">
                <div className="video-timeline-scrub">
                  <div className="timeline-fill" style={{ width: '42%' }} />
                </div>

                <div className="video-controls-action-row">
                  <div className="vc-left">
                    <button type="button" className="vc-btn" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause size={17} /> : <Play size={17} />}
                    </button>
                    <button type="button" className="vc-btn" onClick={() => setIsMuted(!isMuted)}>
                      {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                    </button>
                    <span className="vc-time-display">08:24 / 22:15</span>
                  </div>

                  <div className="vc-center">
                    <span className="vc-current-lesson-label">{currentLesson}</span>
                  </div>

                  <div className="vc-right">
                    <button 
                      type="button" 
                      className="vc-speed-btn" 
                      onClick={() => {
                        const speeds = ['1.0x', '1.25x', '1.5x', '2.0x'];
                        const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                        setPlaybackSpeed(next);
                        onShowToast(`Playback speed set to ${next}`, 'info');
                      }}
                    >
                      {playbackSpeed}
                    </button>

                    <button 
                      type="button" 
                      className="vc-btn" 
                      onClick={() => onShowToast('Fullscreen player mode active', 'info')}
                    >
                      <Maximize size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Lesson Description & Key Highlights */}
            <div className="active-lesson-bottom-desc">
              <h4>{currentLesson}</h4>
              <p>
                In this lecture, {course.instructor.name} explores the core architectural principles, file setup, and practical production shortcuts used in high-end studios.
              </p>
            </div>
          </div>

          {/* Right: Sidebar Tabs (Syllabus, Notes, Resources) */}
          <div className="player-sidebar-column">
            
            {/* Tabs Header */}
            <div className="player-tabs-header">
              <button 
                type="button" 
                className={`player-tab-btn ${activeTab === 'syllabus' ? 'active' : ''}`} 
                onClick={() => setActiveTab('syllabus')}
              >
                <span>Curriculum</span>
              </button>
              <button 
                type="button" 
                className={`player-tab-btn ${activeTab === 'notes' ? 'active' : ''}`} 
                onClick={() => setActiveTab('notes')}
              >
                <span>Notes & Guide</span>
              </button>
              <button 
                type="button" 
                className={`player-tab-btn ${activeTab === 'resources' ? 'active' : ''}`} 
                onClick={() => setActiveTab('resources')}
              >
                <span>Files ({course.tools?.length || 4})</span>
              </button>
            </div>

            {/* Syllabus Tab Content */}
            {activeTab === 'syllabus' && (
              <div className="player-tab-content-scroll">
                {course.syllabus?.map((mod, mIdx) => (
                  <div key={mIdx} className="player-module-group">
                    <h5 className="player-mod-heading">
                      Module {mod.moduleNumber || mIdx + 1}: {mod.title}
                    </h5>
                    <div className="player-lesson-list">
                      {mod.lessons?.map((les, lIdx) => {
                        const isCurrent = currentLesson === les.title;
                        const isDone = !!completedLessonsMap[les.title];

                        return (
                          <div 
                            key={lIdx} 
                            className={`player-lesson-item ${isCurrent ? 'active' : ''}`} 
                            onClick={() => {
                              setCurrentLesson(les.title);
                              setIsPlaying(true);
                            }}
                          >
                            <button 
                              type="button" 
                              className="btn-check-lesson-inline" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleLessonComplete(les.title);
                              }}
                            >
                              {isDone ? (
                                <CheckCircle2 size={16} color="#34d399" />
                              ) : (
                                <Circle size={16} color="#64748b" />
                              )}
                            </button>

                            <div className="player-les-text">
                              <span className="player-les-title">{les.title}</span>
                              <span className="player-les-duration">{les.duration}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Notes Tab Content */}
            {activeTab === 'notes' && (
              <div className="player-tab-content-scroll player-notes-body">
                <h5>Key Concept Summary</h5>
                <p>
                  Remember to maintain non-destructive layer naming and organize your project assets in subfolders (Geometry, Materials, Shaders, Renders).
                </p>
                <div className="notes-highlight-box">
                  <strong>IMY 320 UX Pro Tip:</strong>
                  <span>Always structure interaction feedback within 100ms of user input to ensure perceived instantaneous responsiveness.</span>
                </div>
              </div>
            )}

            {/* Resources Tab Content */}
            {activeTab === 'resources' && (
              <div className="player-tab-content-scroll player-resources-body">
                <h5>Downloadable Project Assets</h5>
                <div className="resource-download-card">
                  <FileText size={16} color="#818cf8" />
                  <div>
                    <h6>{course.title.slice(0, 24)}...Project_Files.zip</h6>
                    <span>420 MB • Full Scene Assets</span>
                  </div>
                  <button 
                    type="button" 
                    className="btn-download-res" 
                    onClick={() => onShowToast('Downloading course project assets bundle...', 'info')}
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
