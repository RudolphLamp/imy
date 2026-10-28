import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  FileText,
  Download,
  BookOpen,
} from "lucide-react";
import useDialog from "../../hooks/useDialog";
import { completedModules } from "../../utils/learning";

export default function CoursePlayerModal({
  course,
  enrolledInfo,
  onClose,
  onCompleteModule,
  onSaveModule,
  notes,
  onSaveNotes,
}) {
  const done = completedModules(enrolledInfo, course.lessons.length);
  const [active, setActive] = useState(
    enrolledInfo.currentModule ??
      course.lessons.findIndex((_, i) => !done.includes(i)),
  );
  const [tab, setTab] = useState("lesson");
  const ref = useRef(null);
  useDialog(true, onClose, ref);
  const index = active < 0 ? 0 : active;
  const title = course.lessons[index].replace(/^Module \d+:\s*/, "");
  const select = (i) => {
    setActive(i);
    onSaveModule(course.id, i);
  };
  const download = () => {
    const content = `${course.title}\n${title}\n\nPractice brief\n1. Set up a project in ${course.tools[0]}.\n2. Explore ${title.toLowerCase()} and document your process.\n3. Export a small experiment and reflect on what you learned.\n\nYour notes\n${notes || "(No notes yet)"}\n\nCreate.IT - IMY 320 prototype lesson guide.`;
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `CreateIT-${course.id}-module-${index + 1}.txt`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="fd-overlay">
      <section
        className="fd-player"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lesson-title"
        tabIndex={-1}
        ref={ref}
      >
        <header className="fd-player-header">
          <button className="fd-text-button" onClick={onClose}>
            <ArrowLeft size={17} /> My Learning
          </button>
          <span className="fd-tag">LESSON PREVIEW</span>
        </header>
        <div className="fd-player-grid">
          <div className="fd-lesson-main">
            <div
              className="fd-lesson-art"
              style={{
                backgroundImage: `linear-gradient(0deg, #090a18, transparent), url(${course.image})`,
              }}
            >
              <span>
                <BookOpen size={28} />
              </span>
              <p>
                MODULE {index + 1} OF {course.lessons.length}
              </p>
              <h2 id="lesson-title">{title}</h2>
            </div>
            <h3>{course.title}</h3>
            <p className="fd-muted">
              With {course.instructor} · Your place and completed modules are
              saved automatically.
            </p>
            <div className="fd-segmented">
              <button
                aria-pressed={tab === "lesson"}
                onClick={() => setTab("lesson")}
              >
                Lesson guide
              </button>
              <button
                aria-pressed={tab === "notes"}
                onClick={() => setTab("notes")}
              >
                My notes
              </button>
              <button
                aria-pressed={tab === "resources"}
                onClick={() => setTab("resources")}
              >
                Resources
              </button>
            </div>
            {tab === "lesson" && (
              <div className="fd-lesson-copy">
                <span className="fd-kicker">EXPLORE. EXPERIMENT. CREATE.</span>
                <h3>Make the idea your own.</h3>
                <p>
                  This prototype lesson introduces{" "}
                  <strong>{title.toLowerCase()}</strong>. A full teaching system
                  is outside the scope of this project.
                </p>
                <ol>
                  <li>Set up a small practice project in {course.tools[0]}.</li>
                  <li>
                    Explore the module topic and try two different approaches.
                  </li>
                  <li>
                    Save your experiment and write a short reflection in My
                    notes.
                  </li>
                </ol>
                <p className="fd-muted">
                  Mark this module complete when you are ready to continue.
                </p>
              </div>
            )}
            {tab === "notes" && (
              <label className="fd-notes">
                Your course notes{" "}
                <span className="fd-muted">
                  Saved on this device as you type.
                </span>
                <textarea
                  rows={7}
                  placeholder="Ideas, questions, and things to try..."
                  value={notes || ""}
                  onChange={(e) => onSaveNotes(course.id, e.target.value)}
                />
              </label>
            )}
            {tab === "resources" && (
              <div className="fd-resource">
                <FileText size={25} />
                <div>
                  <strong>Module {index + 1} practice guide</strong>
                  <p className="fd-muted">
                    Text file · Includes your course notes
                  </p>
                </div>
                <button className="fd-secondary" onClick={download}>
                  <Download size={16} /> Download guide
                </button>
              </div>
            )}
            <div className="fd-lesson-actions">
              <button
                className="fd-secondary"
                disabled={index === 0}
                onClick={() => select(index - 1)}
              >
                <ArrowLeft size={16} /> Previous
              </button>
              {done.includes(index) ? (
                <button
                  className="fd-primary"
                  disabled={index === course.lessons.length - 1}
                  onClick={() => select(index + 1)}
                >
                  {index === course.lessons.length - 1
                    ? "Module completed"
                    : "Next module"}{" "}
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  className="fd-primary"
                  onClick={() => {
                    onCompleteModule(course.id, index);
                    if (index < course.lessons.length - 1) setActive(index + 1);
                  }}
                >
                  Mark complete & continue <CheckCircle2 size={16} />
                </button>
              )}
            </div>
          </div>
          <aside className="fd-lesson-sidebar">
            <span className="fd-kicker">YOUR LEARNING PATH</span>
            <h3>Course content</h3>
            <p className="fd-muted">
              {done.length} of {course.lessons.length} modules completed
            </p>
            <progress
              value={done.length}
              max={course.lessons.length}
              aria-label="Modules completed"
            />
            {course.lessons.map((lesson, i) => (
              <button
                key={lesson}
                className={`fd-module ${i === index ? "active" : ""}`}
                aria-current={i === index ? "step" : undefined}
                onClick={() => select(i)}
              >
                {done.includes(i) ? (
                  <CheckCircle2 size={19} />
                ) : (
                  <Circle size={19} />
                )}
                <span>
                  <small>
                    MODULE {i + 1}
                    {done.includes(i) ? " · COMPLETE" : ""}
                  </small>
                  {lesson.replace(/^Module \d+:\s*/, "")}
                </span>
              </button>
            ))}
          </aside>
        </div>
      </section>
    </div>
  );
}
