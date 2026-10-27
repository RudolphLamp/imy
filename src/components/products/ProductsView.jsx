import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Compass,
  GraduationCap,
  Heart,
  HelpCircle,
  LayoutGrid,
  LogOut,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  User,
  X,
} from "lucide-react";
import { loadCourses } from "../../utils/csvLoader";
import { completeModule, completedModules } from "../../utils/learning";
import useDialog from "../../hooks/useDialog";
import CustomerExperience from "./CustomerExperience";
import CoursePlayerModal from "./CoursePlayerModal";
import EnrollmentCelebration from "./EnrollmentCelebration";
import CertificateModal from "./CertificateModal";
import {
  sampleOrders,
  sampleTickets,
  sampleReviews,
} from "../../data/customerMockData";
import fallbackImage from "../../assets/hero.png";

const money = (amount) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(amount);
const DEMO_EMAIL = "jane.smith@createit.academy";
const read = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
};
const imageFallback = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = fallbackImage;
};
const categoryColors = {
  "Motion Graphics": "#c3a5ff",
  "3D & CGI": "#9fc5ff",
  "UX/UI Design": "#e2c48e",
  "Game Development": "#c0d4a8",
  "Spatial Audio": "#9bd9ca",
  "Digital Art": "#e5a9c5",
};

function CourseImage({ course, className = "" }) {
  return (
    <img
      src={course.image}
      alt=""
      loading="lazy"
      className={className}
      onError={imageFallback}
    />
  );
}
function EmptyState({ icon: Icon = BookOpen, title, text, action, onAction }) {
  return (
    <div className="fd-empty">
      <span>
        <Icon size={30} />
      </span>
      <h2>{title}</h2>
      <p>{text}</p>
      {action && (
        <button className="fd-primary" onClick={onAction}>
          {action} <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}

function Checkout({ cart, total, onClose, onConfirm }) {
  const ref = useRef(null);
  useDialog(true, onClose, ref);
  return (
    <div
      className="fd-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className="fd-checkout"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        ref={ref}
        tabIndex={-1}
      >
        <button
          className="fd-close"
          aria-label="Close checkout"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <span className="fd-kicker">ONE STEP CLOSER</span>
        <h2 id="checkout-title">Ready to make something?</h2>
        <p className="fd-muted">Review your courses, then make it official.</p>
        <ol className="fd-checkout-steps">
          <li>
            <CheckCircle2 size={16} /> Your cart
          </li>
          <li aria-current="step">2. Review & confirm</li>
          <li>3. Start learning</li>
        </ol>
        <div className="fd-demo-note">
          <ShieldCheck size={22} />
          <div>
            <strong>This is a demonstration. No payment is required.</strong>
            <p>
              No payment details are collected. Confirming saves a demo receipt
              and adds these courses to My Learning.
            </p>
          </div>
        </div>
        <div className="fd-order-items">
          {cart.map((c) => (
            <div key={c.id}>
              <span>{c.title}</span>
              <strong>{money(c.price)}</strong>
            </div>
          ))}
        </div>
        <div className="fd-total">
          <span>Order total</span>
          <strong>{money(total)}</strong>
        </div>
        <p className="fd-muted fd-small">
          Simulated total · You will not be charged.
        </p>
        <button className="fd-primary fd-wide" onClick={onConfirm}>
          Confirm demo order <ArrowRight size={17} />
        </button>
        <button className="fd-text-button fd-wide" onClick={onClose}>
          Back to cart
        </button>
      </section>
    </div>
  );
}

export default function ProductsView({
  user,
  onUpdateUser,
  onLogout,
  onShowToast,
  onNavigateView,
}) {
  const prefix = `createit_${encodeURIComponent((user.id || user.email).toLowerCase())}_`;
  const demo = user.email === DEMO_EMAIL;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(() =>
    new URLSearchParams(location.search).get("view") === "customer"
      ? "customer"
      : "catalog",
  );
  const [section, setSection] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [level, setLevel] = useState("all");
  const [price, setPrice] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [cart, setCart] = useState(() => read(`${prefix}cart`, []));
  const [wishlist, setWishlist] = useState(() => read(`${prefix}wishlist`, []));
  const [enrolled, setEnrolled] = useState(() =>
    read(
      `${prefix}enrolled`,
      demo
        ? [
            { courseId: "1", progress: 50 },
            { courseId: "2", progress: 25 },
          ]
        : [],
    ),
  );
  const [orders, setOrders] = useState(() =>
    read(`${prefix}orders`, demo ? sampleOrders : []),
  );
  const [tickets, setTickets] = useState(() =>
    read(`${prefix}tickets`, demo ? sampleTickets : []),
  );
  const [reviews, setReviews] = useState(() =>
    read(`${prefix}reviews`, demo ? sampleReviews : []),
  );
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`${prefix}notes`)) || {};
    } catch {
      return {};
    }
  });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [celebration, setCelebration] = useState(null);
  const [certificateId, setCertificateId] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [newOrderId, setNewOrderId] = useState(null);
  const mainRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    loadCourses().then((data) => {
      if (mounted) {
        setCourses(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    try {
      Object.entries({
        cart,
        wishlist,
        enrolled,
        orders,
        tickets,
        reviews,
        notes,
      }).forEach(([key, value]) =>
        localStorage.setItem(`${prefix}${key}`, JSON.stringify(value)),
      );
    } catch {
      onShowToast(
        "Browser storage is unavailable. Keep this tab open to retain your changes.",
        "error",
      );
    }
  }, [
    cart,
    wishlist,
    enrolled,
    orders,
    tickets,
    reviews,
    notes,
    prefix,
    onShowToast,
  ]);

  const navigate = (target, accountSection = "overview") => {
    setTab(target);
    setSection(accountSection);
    setSelectedId(null);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const openCourse = (id) => {
    setSelectedId(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const reset = () => {
    setQuery("");
    setCategory("All");
    setLevel("all");
    setPrice("all");
    setSort("popular");
  };
  const categories = ["All", ...new Set(courses.map((c) => c.category))];
  const activeFilters =
    category !== "All" || level !== "all" || price !== "all" || query.trim();
  const filtered = useMemo(
    () =>
      courses
        .filter((c) => {
          const searchable = [
            c.title,
            c.description,
            c.category,
            c.instructor,
            ...c.tools,
          ]
            .join(" ")
            .toLowerCase();
          return (
            (!query.trim() ||
              searchable.includes(query.trim().toLowerCase())) &&
            (category === "All" || c.category === category) &&
            (level === "all" ||
              c.level.toLowerCase().includes(level) ||
              c.level === "All Levels") &&
            (price === "all" ||
              (price === "under600"
                ? c.price < 600
                : price === "600-750"
                  ? c.price >= 600 && c.price <= 750
                  : c.price > 750))
          );
        })
        .sort((a, b) =>
          sort === "price-asc"
            ? a.price - b.price
            : sort === "price-desc"
              ? b.price - a.price
              : sort === "title"
                ? a.title.localeCompare(b.title)
                : sort === "rating"
                  ? b.rating - a.rating
                  : parseFloat(b.students) - parseFloat(a.students),
        ),
    [courses, query, category, level, price, sort],
  );
  const course = courses.find((c) => c.id === selectedId);
  const player = courses.find((c) => c.id === playerId);
  const total = cart.reduce((sum, c) => sum + c.price, 0);
  const completed = enrolled.filter((e) => e.progress >= 100);
  const next = enrolled.find((e) => e.progress < 100);
  const nextCourse = courses.find((c) => c.id === next?.courseId);
  const isEnrolled = (id) => enrolled.some((e) => e.courseId === id);
  const inCart = (id) => cart.some((c) => c.id === id);

  const addCart = (c) => {
    if (isEnrolled(c.id)) {
      navigate("dashboard");
      return;
    }
    if (inCart(c.id)) {
      navigate("cart");
      return;
    }
    setCart((prev) => [...prev, c]);
    onShowToast(`Added to your cart: ${c.title}`, "success");
  };
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };
  const confirmOrder = () => {
    if (!cart.length) return;
    const order = {
      id: `CIT-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      items: cart.map(({ id, title, price: cost }) => ({
        id,
        title,
        price: cost,
      })),
      total,
    };
    setOrders((prev) => [order, ...prev]);
    setEnrolled((prev) => [
      ...prev,
      ...cart
        .filter((c) => !prev.some((e) => e.courseId === c.id))
        .map((c) => ({
          courseId: c.id,
          progress: 0,
          completedModules: [],
          currentModule: 0,
        })),
    ]);
    setNewOrderId(order.id);
    setCelebration({ courses: [...cart], orderId: order.id });
    setCart([]);
    setCheckoutOpen(false);
    navigate("dashboard");
  };
  const finishModule = (id, index) => {
    const c = courses.find((item) => item.id === id);
    const entry = enrolled.find((e) => e.courseId === id);
    if (!c || !entry) return;
    const updated = completeModule(entry, index, c.lessons.length);
    if (updated === entry) return;
    setEnrolled((prev) => prev.map((e) => (e.courseId === id ? updated : e)));
    if (updated.progress === 100 && entry.progress < 100) {
      setPlayerId(null);
      setCertificateId(id);
      onShowToast("Course complete! Your certificate is ready.", "success");
    } else {
      const message =
        updated.progress === 25
          ? "Your first milestone! 25% complete."
          : updated.progress === 50
            ? "Halfway there! 50% complete."
            : updated.progress === 75
              ? "Almost there! 75% complete."
              : `Module complete. ${updated.progress}% of your course finished.`;
      onShowToast(message, "success");
    }
  };
  const closeCheckout = useCallback(() => setCheckoutOpen(false), []);
  const closePlayer = useCallback(() => setPlayerId(null), []);
  const closeCertificate = useCallback(() => setCertificateId(null), []);
  const closeCelebration = useCallback(() => {
    setCelebration(null);
    setTab("customer");
    setSection("orders");
  }, []);
  const startLearning = useCallback(() => {
    setCelebration(null);
    setTab("dashboard");
  }, []);
  const renderCard = (c) => (
    <article className="fd-course-card" key={c.id}>
      <div className="fd-course-cover">
        <button
          className="fd-image-link"
          aria-label={`View ${c.title}`}
          onClick={() => openCourse(c.id)}
        >
          <CourseImage course={c} />
        </button>
        {c.badge && (
          <span className="fd-cover-badge">
            {c.badge === "Popular" || c.badge === "Bestseller" ? (
              <Sparkles size={12} />
            ) : null}
            {c.badge}
          </span>
        )}
        <button
          className={`fd-heart ${wishlist.includes(c.id) ? "saved" : ""}`}
          aria-label={`${wishlist.includes(c.id) ? "Remove from" : "Save to"} wishlist: ${c.title}`}
          aria-pressed={wishlist.includes(c.id)}
          onClick={() => toggleWishlist(c.id)}
        >
          <Heart
            size={17}
            fill={wishlist.includes(c.id) ? "currentColor" : "none"}
          />
        </button>
      </div>
      <div className="fd-course-body">
        <div className="fd-course-topline">
          <span style={{ color: categoryColors[c.category] || "#c2b5eb" }}>
            {c.category}
          </span>
          <span className="fd-rating">
            <Star size={12} fill="currentColor" /> {c.rating.toFixed(1)}
          </span>
        </div>
        <h3>
          <button onClick={() => openCourse(c.id)}>{c.title}</button>
        </h3>
        <p className="fd-instructor">with {c.instructor}</p>
        <div className="fd-course-meta">
          <span>
            <Clock3 size={13} />
            {c.duration}
          </span>
          <span>
            <BookOpen size={13} />
            {c.lessons.length} modules
          </span>
          <span>{c.level === "Beginner to Pro" ? "Beginner" : c.level}</span>
        </div>
        <div className="fd-course-bottom">
          <div>
            <strong>{money(c.price)}</strong>
            <small>One-time purchase</small>
          </div>
          <button
            className={`fd-add ${inCart(c.id) || isEnrolled(c.id) ? "added" : ""}`}
            onClick={() => addCart(c)}
          >
            {isEnrolled(c.id)
              ? "Start learning"
              : inCart(c.id)
                ? "View cart"
                : "Add to cart"}{" "}
            {isEnrolled(c.id) ? (
              <ArrowRight size={14} />
            ) : inCart(c.id) ? (
              <Check size={14} />
            ) : (
              <ShoppingBag size={14} />
            )}
          </button>
        </div>
      </div>
    </article>
  );

  return (
    <div className="fd-app">
      <a className="fd-skip" href="#main-content">
        Skip to content
      </a>
      <header className="fd-header">
        <button
          className="fd-menu-toggle fd-icon-button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="main-navigation"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <button
          className="fd-brand"
          onClick={() => navigate("catalog")}
          aria-label="Create.IT home"
        >
          <span className="fd-brand-symbol">
            <Sparkles size={21} />
          </span>
          Create<span className="fd-brand-dot">.IT</span>
        </button>
        <span className="fd-header-divider" />
        <span className="fd-header-caption">
          A little curiosity. A lot of possibility.
        </span>
        <div className="fd-header-right">
          <span className="fd-demo-label">
            <span /> DEMO WORKSPACE
          </span>
          <button
            className="fd-header-cart"
            aria-label={`Shopping cart, ${cart.length} courses`}
            onClick={() => navigate("cart")}
          >
            <ShoppingBag size={19} />
            <span className="fd-cart-label">Cart</span>
            {cart.length > 0 && <b>{cart.length}</b>}
          </button>
          <button
            className="fd-avatar"
            aria-label="Open my profile"
            onClick={() => navigate("customer", "profile")}
          >
            {user.name
              .split(" ")
              .map((s) => s[0])
              .slice(0, 2)
              .join("")}
          </button>
        </div>
      </header>
      {mobileOpen && (
        <button
          className="fd-nav-scrim"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fd-sidebar ${mobileOpen ? "is-open" : ""}`}
        id="main-navigation"
      >
        <span className="fd-sidebar-label">YOUR CREATIVE SPACE</span>
        <nav aria-label="Main navigation">
          {[
            [Compass, "catalog", "Explore courses"],
            [GraduationCap, "dashboard", "My Learning"],
            [Heart, "wishlist", "Wishlist"],
            [Award, "certificates", "Certificates"],
          ].map(([Icon, id, label]) => (
            <button
              key={id}
              className={tab === id ? "active" : ""}
              aria-current={tab === id ? "page" : undefined}
              onClick={() => navigate(id)}
            >
              <Icon size={18} />
              <span>{label}</span>
              {id === "dashboard" && enrolled.length > 0 && (
                <b>{enrolled.length}</b>
              )}
              {id === "wishlist" && wishlist.length > 0 && (
                <b>{wishlist.length}</b>
              )}
            </button>
          ))}
        </nav>
        <div className="fd-sidebar-rule" />
        <span className="fd-sidebar-label">HERE TO HELP</span>
        <nav aria-label="Account navigation">
          <button
            className={
              tab === "customer" && section === "orders" ? "active" : ""
            }
            onClick={() => navigate("customer", "orders")}
          >
            <ShoppingBag size={18} />
            Purchase history
          </button>
          <button
            className={
              tab === "customer" && section === "support" ? "active" : ""
            }
            onClick={() => navigate("customer", "support")}
          >
            <HelpCircle size={18} />
            Help & support
          </button>
          <button
            className={
              tab === "customer" && section === "profile" ? "active" : ""
            }
            onClick={() => navigate("customer", "profile")}
          >
            <User size={18} />
            My account
          </button>
        </nav>
        <div className="fd-sidebar-bottom">
          <div className="fd-creative-note">
            <span>
              <Sparkles size={17} /> A NOTE TO THE CREATOR
            </span>
            <p>Your next big idea starts with a small first step.</p>
            <button onClick={() => navigate("dashboard")}>
              Keep creating <ArrowRight size={15} />
            </button>
          </div>
          <button className="fd-sidebar-user" onClick={onLogout}>
            <span className="fd-avatar">{user.name[0]}</span>
            <span>
              <strong>{user.name}</strong>
              <small>Sign out of workspace</small>
            </span>
            <LogOut size={16} />
          </button>
        </div>
      </aside>
      <main id="main-content" className="fd-main" ref={mainRef} tabIndex={-1}>
        {loading ? (
          <div className="fd-loading" role="status">
            <Sparkles className="fd-spin" size={28} /> Finding your next
            creative spark...
          </div>
        ) : course ? (
          <div className="fd-detail">
            <button
              className="fd-text-button"
              onClick={() => setSelectedId(null)}
            >
              <ArrowLeft size={16} /> Back to{" "}
              {tab === "wishlist" ? "wishlist" : "courses"}
            </button>
            <div className="fd-detail-grid">
              <div className="fd-detail-copy">
                <span className="fd-kicker">{course.category}</span>
                <h1>{course.title}</h1>
                <p>{course.description}</p>
                <div className="fd-detail-meta">
                  <span className="fd-rating">
                    <Star size={15} fill="currentColor" />
                    {course.rating} course rating
                  </span>
                  <span>With {course.instructor}</span>
                </div>
                <div className="fd-detail-facts">
                  <span>
                    <Clock3 />
                    {course.duration}
                  </span>
                  <span>
                    <BookOpen />
                    {course.lessons.length} modules
                  </span>
                  <span>
                    <GraduationCap />
                    {course.level}
                  </span>
                </div>
                <h2>What you'll create</h2>
                <p>
                  A practical project that brings together{" "}
                  {course.tools.join(", ")}. Build your skills step by step and
                  finish with something you can make your own.
                </p>
                <h2>Course curriculum</h2>
                <p className="fd-muted">
                  {course.lessons.length} modules · Expand a module to see the
                  focus.
                </p>
                <div className="fd-curriculum">
                  {course.lessons.map((lesson, i) => (
                    <details key={lesson}>
                      <summary>
                        <span>
                          <small>0{i + 1}</small>
                          {lesson.replace(/^Module \d+:\s*/, "")}
                        </span>
                        <ChevronDown size={18} />
                      </summary>
                      <p>
                        Explore{" "}
                        {lesson.replace(/^Module \d+:\s*/, "").toLowerCase()}{" "}
                        through a guided practice brief. Use {course.tools[0]}{" "}
                        to experiment, then capture your learning in your course
                        notes.
                      </p>
                    </details>
                  ))}
                </div>
                <h2>Meet your instructor</h2>
                <div className="fd-instructor-profile">
                  <span className="fd-avatar">
                    {course.instructor
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <h3>{course.instructor}</h3>
                    <p className="fd-muted">
                      Your guide to {course.category.toLowerCase()} in the
                      Create.IT course collection.
                    </p>
                  </div>
                </div>
              </div>
              <aside className="fd-detail-buy">
                <CourseImage course={course} />
                <div>
                  <span className="fd-kicker">
                    MAKE ROOM FOR YOUR NEXT SKILL
                  </span>
                  <strong className="fd-detail-price">
                    {money(course.price)}
                  </strong>
                  <p className="fd-muted">
                    One-time purchase · Learn at your pace
                  </p>
                  <button
                    className="fd-primary fd-wide"
                    onClick={() =>
                      isEnrolled(course.id)
                        ? setPlayerId(course.id)
                        : addCart(course)
                    }
                  >
                    {isEnrolled(course.id)
                      ? "Continue learning"
                      : inCart(course.id)
                        ? "View cart"
                        : "Add to cart"}
                    <ArrowRight size={16} />
                  </button>
                  <button
                    className="fd-secondary fd-wide"
                    onClick={() => toggleWishlist(course.id)}
                  >
                    <Heart
                      size={15}
                      fill={
                        wishlist.includes(course.id) ? "currentColor" : "none"
                      }
                    />
                    {wishlist.includes(course.id)
                      ? "Saved to wishlist"
                      : "Save for later"}
                  </button>
                  <ul>
                    <li>
                      <Check size={15} /> {course.lessons.length} structured
                      modules
                    </li>
                    <li>
                      <Check size={15} /> Saved progress & personal notes
                    </li>
                    <li>
                      <Check size={15} /> Certificate of completion
                    </li>
                  </ul>
                  <p className="fd-small fd-muted">
                    Demo purchase. No payment required.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        ) : tab === "catalog" ? (
          <>
            <div className="fd-breadcrumb">
              Your creative journey <span>/</span>{" "}
              <strong>Explore courses</strong>
            </div>
            <section className="fd-hero">
              <div className="fd-hero-copy">
                <span className="fd-kicker">
                  <span className="fd-live-dot" /> FOR THE ENDLESSLY CURIOUS
                </span>
                <h1>
                  Big ideas.
                  <br />
                  Start <em>here.</em>
                </h1>
                <p>
                  Turn your “what if” into something real.
                  <br className="fd-desktop-break" /> Practical courses for your
                  next creative chapter.
                </p>
                <button
                  className="fd-primary"
                  onClick={() => {
                    reset();
                    document.getElementById("course-search").focus();
                    document
                      .getElementById("course-collection")
                      .scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Find your next course <ArrowDown size={16} />
                </button>
                <div className="fd-hero-foot">
                  <span>
                    <CheckCircle2 size={14} /> Learn at your own pace
                  </span>
                  <span>
                    <Award size={14} /> Celebrate every milestone
                  </span>
                </div>
              </div>
              <div className="fd-hero-art" aria-hidden="true">
                <div className="fd-orbit orbit-one" />
                <div className="fd-orbit orbit-two" />
                <div className="fd-orb" />
                <span className="fd-art-star star-one">✦</span>
                <span className="fd-art-star star-two">✧</span>
                <div className="fd-art-label">
                  <span className="fd-art-swatch" />
                  <div>
                    IDEAS INTO REALITY<small>Your creativity, in motion.</small>
                  </div>
                  <ArrowRight size={17} />
                </div>
                <span className="fd-art-caption">IMAGINE / MAKE / REPEAT</span>
              </div>
            </section>
            {nextCourse && (
              <button
                className="fd-resume"
                onClick={() => {
                  navigate("dashboard");
                  setPlayerId(nextCourse.id);
                }}
              >
                <span className="fd-resume-icon">
                  <BookOpen size={18} />
                </span>
                <span>
                  <strong>A little progress goes a long way.</strong>
                  <small>
                    Pick up {nextCourse.title} · {next.progress}% complete
                  </small>
                </span>
                <span className="fd-resume-link">
                  Continue learning <ArrowRight size={16} />
                </span>
              </button>
            )}
            <section id="course-collection" className="fd-collection">
              <div className="fd-section-heading">
                <div>
                  <span className="fd-kicker">FIND YOUR NEXT SPARK</span>
                  <h2>
                    A world of things to create<span>.</span>
                  </h2>
                </div>
                <span className="fd-collection-count">
                  {courses.length} curated courses
                </span>
              </div>
              <div className="fd-discovery">
                <label className="fd-search" htmlFor="course-search">
                  <Search size={18} />
                  <input
                    id="course-search"
                    type="search"
                    placeholder="What would you like to create?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search courses"
                  />
                  {query && (
                    <button
                      aria-label="Clear search"
                      onClick={() => setQuery("")}
                    >
                      <X size={16} />
                    </button>
                  )}
                  <span className="fd-search-hint">
                    Try “motion” or “Figma”
                  </span>
                </label>
                <button
                  className={`fd-secondary ${filtersOpen ? "selected" : ""}`}
                  aria-expanded={filtersOpen}
                  aria-controls="course-filters"
                  onClick={() => setFiltersOpen((v) => !v)}
                >
                  <SlidersHorizontal size={16} />
                  Filters
                  {(level !== "all" || price !== "all") && (
                    <span className="fd-filter-dot" />
                  )}
                </button>
              </div>
              <div
                className="fd-categories"
                role="group"
                aria-label="Course category"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    aria-pressed={category === cat}
                    onClick={() => setCategory(cat)}
                  >
                    {cat === "All" && <LayoutGrid size={13} />}
                    {cat === "All" ? "All courses" : cat}
                  </button>
                ))}
              </div>
              {filtersOpen && (
                <div className="fd-filters" id="course-filters">
                  <label>
                    Skill level
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                    >
                      <option value="all">All levels</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </label>
                  <label>
                    Price range
                    <select
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    >
                      <option value="all">All prices</option>
                      <option value="under600">Under R600</option>
                      <option value="600-750">R600 - R750</option>
                      <option value="above750">Above R750</option>
                    </select>
                  </label>
                  <button className="fd-text-button" onClick={reset}>
                    Reset filters <X size={14} />
                  </button>
                </div>
              )}
              <div className="fd-results-bar">
                <p role="status">
                  {activeFilters
                    ? `${filtered.length} matching ${filtered.length === 1 ? "course" : "courses"}`
                    : "A new skill is closer than you think."}
                  {activeFilters && <button onClick={reset}>Clear all</button>}
                </p>
                <label>
                  Sort by{" "}
                  <select
                    aria-label="Sort courses"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="popular">Most popular</option>
                    <option value="rating">Highest rated</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="title">Title: A - Z</option>
                  </select>
                </label>
              </div>
              {filtered.length ? (
                <div className="fd-course-grid">{filtered.map(renderCard)}</div>
              ) : (
                <EmptyState
                  icon={Search}
                  title="No courses found. Yet."
                  text="Try a different keyword or give your filters a fresh start."
                  action="Clear search & filters"
                  onAction={reset}
                />
              )}
            </section>
          </>
        ) : tab === "dashboard" ? (
          <>
            <div className="fd-page-heading">
              <span className="fd-kicker">YOUR NEXT CHAPTER</span>
              <h1>
                Keep your curiosity going<span>.</span>
              </h1>
              <p>Your courses, your pace. Every small step counts.</p>
            </div>
            <div className="fd-stats">
              <div>
                <BookOpen />
                <strong>{enrolled.length}</strong>
                <span>Enrolled courses</span>
              </div>
              <div>
                <Clock3 />
                <strong>{enrolled.length - completed.length}</strong>
                <span>In progress</span>
              </div>
              <div>
                <Award />
                <strong>{completed.length}</strong>
                <span>Completed courses</span>
              </div>
            </div>
            <div className="fd-section-heading">
              <h2>My Learning</h2>
              <button
                className="fd-text-button"
                onClick={() => navigate("catalog")}
              >
                Explore courses <ArrowRight size={16} />
              </button>
            </div>
            {!enrolled.length ? (
              <EmptyState
                title="Your first chapter is waiting."
                text="Choose a course and start making something you love."
                action="Find a course"
                onAction={() => navigate("catalog")}
              />
            ) : (
              <div className="fd-learning-list">
                {enrolled.map((entry) => {
                  const c = courses.find((item) => item.id === entry.courseId);
                  if (!c) return null;
                  const done = completedModules(entry, c.lessons.length);
                  const index =
                    entry.currentModule ??
                    c.lessons.findIndex((_, i) => !done.includes(i));
                  return (
                    <article
                      key={c.id}
                      className={`fd-learning-card ${entry.progress === 100 ? "complete" : ""}`}
                    >
                      <CourseImage course={c} />
                      <div>
                        <span className="fd-kicker">{c.category}</span>
                        <h3>{c.title}</h3>
                        <p className="fd-muted">
                          {entry.progress >= 100
                            ? "All modules complete. You made it!"
                            : `Up next: ${c.lessons[Math.max(0, index)].replace(/^Module \d+:\s*/, "")}`}
                        </p>
                        <div className="fd-progress-label">
                          <span>
                            {done.length} of {c.lessons.length} modules
                          </span>
                          <strong>{entry.progress}%</strong>
                        </div>
                        <progress
                          max="100"
                          value={entry.progress}
                          aria-label={`${c.title} progress`}
                        />
                        <div className="fd-learning-actions">
                          <button
                            className={
                              entry.progress >= 100
                                ? "fd-secondary"
                                : "fd-primary"
                            }
                            onClick={() => setPlayerId(c.id)}
                          >
                            {entry.progress >= 100
                              ? "Review course"
                              : entry.progress > 0
                                ? "Continue learning"
                                : "Start learning"}{" "}
                            <ArrowRight size={15} />
                          </button>
                          {entry.progress >= 100 && (
                            <button
                              className="fd-primary fd-cert-ready"
                              onClick={() => setCertificateId(c.id)}
                            >
                              <Award size={16} /> Your certificate is ready
                            </button>
                          )}
                          <button
                            className="fd-text-button"
                            onClick={() => openCourse(c.id)}
                          >
                            Course details
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        ) : tab === "wishlist" ? (
          <>
            <div className="fd-page-heading">
              <span className="fd-kicker">SAVE A LITTLE INSPIRATION</span>
              <h1>
                Your someday starts here<span>.</span>
              </h1>
              <p>All the courses you want to come back to.</p>
            </div>
            {wishlist.length ? (
              <div className="fd-course-grid">
                {courses.filter((c) => wishlist.includes(c.id)).map(renderCard)}
              </div>
            ) : (
              <EmptyState
                icon={Heart}
                title="Room for your next big idea."
                text="Tap the heart on a course to save it for later."
                action="Explore courses"
                onAction={() => navigate("catalog")}
              />
            )}
          </>
        ) : tab === "certificates" ? (
          <>
            <div className="fd-page-heading">
              <span className="fd-kicker">LOOK WHAT YOU MADE POSSIBLE</span>
              <h1>
                Proof of your progress<span>.</span>
              </h1>
              <p>A little reminder of the work you put in.</p>
            </div>
            {completed.length ? (
              <div className="fd-achievement-grid">
                {completed.map((entry) => {
                  const c = courses.find((item) => item.id === entry.courseId);
                  return (
                    c && (
                      <article className="fd-achievement" key={c.id}>
                        <Award size={40} />
                        <span className="fd-kicker">COURSE COMPLETE</span>
                        <h2>{c.title}</h2>
                        <p>{user.name}</p>
                        <button
                          className="fd-primary"
                          onClick={() => setCertificateId(c.id)}
                        >
                          View certificate <ArrowRight size={15} />
                        </button>
                      </article>
                    )
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={Award}
                title="Your achievements will live here."
                text="Complete all modules in a course to celebrate and download your certificate."
                action="Go to My Learning"
                onAction={() => navigate("dashboard")}
              />
            )}
          </>
        ) : tab === "cart" ? (
          <>
            <div className="fd-page-heading">
              <span className="fd-kicker">INVEST IN YOUR CURIOSITY</span>
              <h1>
                Good things in the bag<span>.</span>
              </h1>
              <p>
                {cart.length
                  ? `${cart.length} ${cart.length === 1 ? "course" : "courses"} for your next creative chapter.`
                  : "A new skill is just a course away."}
              </p>
            </div>
            {cart.length ? (
              <div className="fd-cart-grid">
                <div className="fd-cart-items">
                  {cart.map((c) => (
                    <article className="fd-cart-item" key={c.id}>
                      <CourseImage course={c} />
                      <div>
                        <span className="fd-kicker">{c.category}</span>
                        <h3>
                          <button onClick={() => openCourse(c.id)}>
                            {c.title}
                          </button>
                        </h3>
                        <p className="fd-muted">
                          {c.duration} · {c.lessons.length} modules
                        </p>
                        <button
                          className="fd-text-button"
                          onClick={() => {
                            setCart((prev) =>
                              prev.filter((item) => item.id !== c.id),
                            );
                            onShowToast("Course removed from cart.");
                          }}
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                      <strong>{money(c.price)}</strong>
                    </article>
                  ))}
                  <button
                    className="fd-text-button"
                    onClick={() => navigate("catalog")}
                  >
                    <ArrowLeft size={15} /> Keep exploring
                  </button>
                </div>
                <aside className="fd-cart-summary">
                  <span className="fd-kicker">YOUR NEXT CHAPTER</span>
                  <h2>Order summary</h2>
                  <div className="fd-total">
                    <span>
                      {cart.length} {cart.length === 1 ? "course" : "courses"}
                    </span>
                    <strong>{money(total)}</strong>
                  </div>
                  <p className="fd-muted">
                    One-time purchase. Your courses stay in your learning space.
                  </p>
                  <button
                    className="fd-primary fd-wide"
                    onClick={() => setCheckoutOpen(true)}
                  >
                    Review demo checkout <ArrowRight size={16} />
                  </button>
                  <div className="fd-cart-note">
                    <ShieldCheck size={17} />
                    <span>Demo checkout. No payment required.</span>
                  </div>
                </aside>
              </div>
            ) : (
              <EmptyState
                icon={ShoppingBag}
                title="Your bag is full of possibility."
                text="Find a course that sparks your curiosity and add it to your cart."
                action="Explore courses"
                onAction={() => navigate("catalog")}
              />
            )}
          </>
        ) : (
          <CustomerExperience
            key={section}
            user={user}
            onUpdateUser={onUpdateUser}
            orders={orders}
            tickets={tickets}
            reviews={reviews}
            courses={courses}
            enrolled={enrolled}
            initialSection={section}
            onAddTicket={(t) => setTickets((prev) => [t, ...prev])}
            onAddReview={(r) =>
              setReviews((prev) => [
                r,
                ...prev.filter((item) => item.courseId !== r.courseId),
              ])
            }
            onOpenCourse={openCourse}
            onOpenLearning={() => navigate("dashboard")}
            onExploreCatalog={() => navigate("catalog")}
            onLoadDemoData={() => {
              setOrders((prev) => [
                ...prev,
                ...sampleOrders.filter((o) => !prev.some((p) => p.id === o.id)),
              ]);
              setTickets((prev) => [
                ...prev,
                ...sampleTickets.filter(
                  (t) => !prev.some((p) => p.id === t.id),
                ),
              ]);
              setReviews((prev) => [
                ...prev,
                ...sampleReviews.filter(
                  (r) => !prev.some((p) => p.courseId === r.courseId),
                ),
              ]);
              onShowToast("Clearly labelled sample activity added.", "success");
            }}
            onShowToast={onShowToast}
            newOrderId={newOrderId}
            onDismissOrder={() => setNewOrderId(null)}
          />
        )}
        <footer className="fd-footer">
          <div>
            <button className="fd-brand" onClick={() => navigate("catalog")}>
              Create<span className="fd-brand-dot">.IT</span>
            </button>
            <span>Stay curious. Keep creating.</span>
          </div>
          <p>
            © 2026 Create.IT · IMY 320 final design · University of Pretoria
            student project.
          </p>
          <div>
            <button onClick={() => navigate("customer", "support")}>
              Help & support
            </button>
            <button onClick={() => navigate("customer", "profile")}>
              Your data
            </button>
            <button onClick={() => onNavigateView("landing")}>
              About Create.IT
            </button>
          </div>
          <small>
            Built with React · Vite · Lucide · html2canvas · Google Fonts. Local
            browser prototype; no real payments or emails.
          </small>
        </footer>
      </main>
      {checkoutOpen && (
        <Checkout
          cart={cart}
          total={total}
          onClose={closeCheckout}
          onConfirm={confirmOrder}
        />
      )}
      {player && (
        <CoursePlayerModal
          key={player.id}
          course={player}
          enrolledInfo={enrolled.find((e) => e.courseId === player.id)}
          onClose={closePlayer}
          onCompleteModule={finishModule}
          onSaveModule={(id, i) =>
            setEnrolled((prev) =>
              prev.map((e) =>
                e.courseId === id ? { ...e, currentModule: i } : e,
              ),
            )
          }
          notes={notes[player.id]}
          onSaveNotes={(id, value) =>
            setNotes((prev) => ({ ...prev, [id]: value }))
          }
        />
      )}
      <EnrollmentCelebration
        isOpen={!!celebration}
        enrolledCourses={celebration?.courses}
        orderId={celebration?.orderId}
        onStartLearning={startLearning}
        onClose={closeCelebration}
      />
      <CertificateModal
        isOpen={!!certificateId}
        course={courses.find((c) => c.id === certificateId)}
        completedAt={
          enrolled.find((e) => e.courseId === certificateId)?.completedAt
        }
        user={user}
        onClose={closeCertificate}
        onShowToast={onShowToast}
      />
    </div>
  );
}
