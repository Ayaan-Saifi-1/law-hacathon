import { useEffect } from "react";

export function useKeyboard(keyHandlers = {}) {
  useEffect(() => {
    function handleKeyDown(event) {
      // Don't intercept if user is typing in an input or textarea
      const tag = event.target.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") {
        if (event.key === "Escape" && keyHandlers["Escape"]) {
          keyHandlers["Escape"](event);
        }
        return;
      }

      const alt = event.altKey;
      const ctrl = event.ctrlKey || event.metaKey;
      const key = event.key.toUpperCase();

      if (alt && keyHandlers[`Alt+${key}`]) {
        event.preventDefault();
        keyHandlers[`Alt+${key}`](event);
        return;
      }

      if (ctrl && keyHandlers[`Ctrl+${key}`]) {
        event.preventDefault();
        keyHandlers[`Ctrl+${key}`](event);
        return;
      }

      if (keyHandlers[event.key]) {
        keyHandlers[event.key](event);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyHandlers]);
}
