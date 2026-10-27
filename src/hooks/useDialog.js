import { useEffect } from "react";

// Shared keyboard, focus, and scroll behavior for every modal in the prototype.
export default function useDialog(isOpen, onClose, ref) {
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement;
    const root = ref.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      [
        ...(root?.querySelectorAll(
          'button:not([disabled]), a[href], input, select, textarea, [tabindex="0"]',
        ) || []),
      ].filter((el) => el.getClientRects().length);
    (focusable()[0] || root)?.focus();
    const handleKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
      }
      if (event.key === "Tab") {
        const items = focusable();
        const first = items[0];
        const last = items.at(-1);
        if (!items.length) {
          event.preventDefault();
          return;
        }
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            !root.contains(document.activeElement))
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === last ||
            !root.contains(document.activeElement))
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus();
    };
  }, [isOpen, onClose, ref]);
}
