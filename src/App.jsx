import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import ProductsView from "./components/products/ProductsView";

const demoUser = {
  id: "jane.smith@createit.academy",
  name: "Jane Smith",
  email: "jane.smith@createit.academy",
  isDemo: true,
};
const getUser = () => {
  try {
    const value = JSON.parse(localStorage.getItem("createit_user"));
    return value?.name && value?.email
      ? { ...value, id: value.id || value.email.toLowerCase() }
      : demoUser;
  } catch {
    return demoUser;
  }
};
const getAccounts = () => {
  try {
    return JSON.parse(localStorage.getItem("createit_accounts")) || {};
  } catch {
    return {};
  }
};
async function digest(password, salt) {
  const bytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${salt}:${password}`),
  );
  return [...new Uint8Array(bytes)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
function Brand({ onClick }) {
  return (
    <button className="fd-brand" onClick={onClick}>
      <span className="fd-brand-symbol">
        <Sparkles size={21} />
      </span>
      Create<span className="fd-brand-dot">.IT</span>
    </button>
  );
}

function Auth({ mode, onMode, onSuccess }) {
  const registering = mode === "register";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    const normalizedEmail = email.trim().toLowerCase();
    if (registering && name.trim().length < 2) {
      setError("Enter your full name (at least two characters).");
      return;
    }
    if (password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }
    if (registering && password !== confirm) {
      setError("Your passwords do not match. Please try again.");
      return;
    }
    setBusy(true);
    try {
      const accounts = getAccounts();
      if (registering) {
        if (accounts[normalizedEmail] || normalizedEmail === demoUser.email) {
          setError(
            "This email already has an account. Sign in or use demo access.",
          );
          return;
        }
        const salt = crypto.randomUUID();
        const account = {
          id: normalizedEmail,
          name: name.trim(),
          email: normalizedEmail,
          salt,
          hash: await digest(password, salt),
        };
        localStorage.setItem(
          "createit_accounts",
          JSON.stringify({ ...accounts, [normalizedEmail]: account }),
        );
        onSuccess({ id: account.id, name: account.name, email: account.email });
      } else {
        const account = accounts[normalizedEmail];
        if (
          !account ||
          (await digest(password, account.salt)) !== account.hash
        ) {
          setError(
            "The email or password does not match an account in this browser. Create an account or try demo access.",
          );
          return;
        }
        const saved = (() => {
          try {
            return JSON.parse(
              localStorage.getItem(
                `createit_profile_${encodeURIComponent(account.id)}`,
              ),
            );
          } catch {
            return null;
          }
        })();
        onSuccess({
          id: account.id,
          name: saved?.name || account.name,
          email: saved?.email || account.email,
        });
      }
    } catch {
      setError(
        "We could not save or open your local account. Enable browser storage or use demo access.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="fd-auth">
      <aside className="fd-auth-art">
        <Brand onClick={() => onMode("landing")} />
        <div>
          <span className="fd-kicker">A SPACE FOR YOUR NEXT BIG IDEA</span>
          <h1>
            Stay curious.
            <br />
            Keep <span>creating.</span>
          </h1>
          <p>
            A small step today. A whole new possibility tomorrow. Make room for
            the things you have always wanted to try.
          </p>
        </div>
        <small>IMY 320 · University of Pretoria · Final design 2026</small>
      </aside>
      <main className="fd-auth-form">
        <div className="fd-auth-form-inner">
          <button className="fd-text-button" onClick={() => onMode("landing")}>
            <ArrowLeft size={15} /> Back to Create.IT
          </button>
          <h2>{registering ? "Start your next chapter." : "Welcome back."}</h2>
          <p className="fd-muted">
            {registering
              ? "A little curiosity is all you need to begin."
              : "Your ideas and your courses are waiting."}
          </p>
          <form
            onSubmit={submit}
            aria-label={registering ? "Create account" : "Sign in"}
          >
            {registering && (
              <label>
                Full name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  maxLength={80}
                />
              </label>
            )}
            <label>
              Email address
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                maxLength={160}
              />
            </label>
            <label>
              Password
              <input
                required
                name="password"
                type="password"
                autoComplete={registering ? "new-password" : "current-password"}
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
              />
            </label>
            {registering && (
              <label>
                Confirm password
                <input
                  required
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="One more time"
                />
              </label>
            )}
            {error && (
              <p className="fd-inline-error" role="alert">
                {error}
              </p>
            )}
            <button
              className="fd-primary fd-wide"
              disabled={busy}
              type="submit"
            >
              {busy
                ? "Opening your workspace..."
                : registering
                  ? "Create account"
                  : "Sign in"}{" "}
              <ArrowRight size={16} />
            </button>
          </form>
          <div className="fd-auth-note">
            This student prototype saves accounts and activity on this device.
            Use a sample password. No emails are sent and accounts do not sync
            across devices.
          </div>
          <button
            className="fd-secondary fd-wide"
            onClick={() => onSuccess(demoUser)}
            disabled={busy}
          >
            <Sparkles size={16} /> Explore with demo access
          </button>
          <p className="fd-auth-switch">
            {registering ? "Already have an account?" : "New around here?"}{" "}
            <button onClick={() => onMode(registering ? "login" : "register")}>
              {registering ? "Sign in" : "Create an account"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

function Home({ onNavigate }) {
  return (
    <div className="fd-home">
      <header>
        <Brand onClick={() => onNavigate("products")} />
        <button className="fd-secondary" onClick={() => onNavigate("login")}>
          Sign in <ArrowRight size={15} />
        </button>
      </header>
      <main className="fd-home-main">
        <span className="fd-kicker">THE WORLD NEEDS WHAT YOU WILL CREATE.</span>
        <h1>
          A little curiosity.
          <br />
          Endless <span>possibility.</span>
        </h1>
        <p>
          Make your next idea real with practical multimedia courses in motion,
          design, 3D, sound, and creative technology.
        </p>
        <div className="fd-home-actions">
          <button className="fd-primary" onClick={() => onNavigate("products")}>
            Explore the course collection <ArrowRight size={16} />
          </button>
          <button
            className="fd-secondary"
            onClick={() => onNavigate("register")}
          >
            Create your workspace
          </button>
        </div>
        <div className="fd-home-features">
          {[
            [
              BookOpen,
              "Make space to learn.",
              "Find a course that sparks your curiosity. Explore the curriculum and choose your next creative direction.",
            ],
            [
              CheckCircle2,
              "Find your own pace.",
              "Pick up where you left off. Your module progress, personal notes, and orders stay in your browser.",
            ],
            [
              Award,
              "Celebrate the little wins.",
              "Every milestone deserves a moment. Finish a course and your certificate is ready to celebrate and download.",
            ],
          ].map(([Icon, title, text]) => (
            <div key={title}>
              <Icon size={27} />
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <small>
          Create.IT is a University of Pretoria IMY 320 student prototype. No
          real payments or emails. Built with React, Vite, Lucide, html2canvas,
          and Google Fonts. Not an official university learning service.
        </small>
      </main>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(getUser);
  const [view, setView] = useState(() => {
    try {
      return localStorage.getItem("createit_signed_out") === "true"
        ? "login"
        : "products";
    } catch {
      return "products";
    }
  });
  const [toast, setToast] = useState(null);
  const timer = useRef(null);
  const showToast = useCallback((message, type = "info") => {
    clearTimeout(timer.current);
    setToast({ message, type });
    timer.current = setTimeout(() => setToast(null), 5500);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  const enter = (account) => {
    setUser(account);
    try {
      localStorage.setItem("createit_user", JSON.stringify(account));
      localStorage.removeItem("createit_signed_out");
    } catch {}
    setView("products");
    showToast(
      `Welcome, ${account.name.split(" ")[0]}. Let’s make something.`,
      "success",
    );
  };
  const update = (account) => {
    setUser(account);
    try {
      localStorage.setItem("createit_user", JSON.stringify(account));
      localStorage.setItem(
        `createit_profile_${encodeURIComponent(account.id)}`,
        JSON.stringify(account),
      );
    } catch {
      showToast("Your profile could not be saved in this browser.", "error");
    }
  };
  const logout = () => {
    try {
      localStorage.removeItem("createit_user");
      localStorage.setItem("createit_signed_out", "true");
    } catch {}
    setUser(demoUser);
    setView("login");
    showToast("You’re signed out. Your learning is saved on this device.");
  };
  return (
    <div className="app-container">
      {toast && (
        <div
          className={`toast-msg ${toast.type === "error" ? "toast-error" : toast.type === "success" ? "toast-success" : ""}`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}
      {view === "products" ? (
        <ProductsView
          key={user.id}
          user={user}
          onUpdateUser={update}
          onLogout={logout}
          onShowToast={showToast}
          onNavigateView={setView}
        />
      ) : view === "landing" ? (
        <Home
          onNavigate={(target) =>
            target === "products" ? enter(user) : setView(target)
          }
        />
      ) : (
        <Auth key={view} mode={view} onMode={setView} onSuccess={enter} />
      )}
    </div>
  );
}
