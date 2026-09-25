import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({ isOpen, onClose, title, children, maxWidth = "560px" }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root") || document.body;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(4, 6, 12, 0.82)",
        backdropFilter: "blur(6px)",
        animation: "fadeIn 180ms ease-out",
        padding: "20px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth,
          backgroundColor: "var(--c-surface)",
          border: "1px solid var(--c-border)",
          borderRadius: "2px",
          boxShadow: "var(--shadow-lg)",
          overflow: "hidden",
          animation: "fadeUp 220ms ease-out",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid var(--c-border)",
            backgroundColor: "var(--c-surface-2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h3
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: 700,
                color: "var(--c-text-primary)",
                letterSpacing: "0.02em",
              }}
            >
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              color: "var(--c-text-3)",
              fontSize: "18px",
              padding: "4px 8px",
              borderRadius: "4px",
              lineHeight: 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-text-1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-text-3)")}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
}
