import React from "react";

export function Badge({ children, variant = "neutral", pulse = false, className = "", style = {} }) {
  const getVariantStyles = () => {
    switch (variant) {
      case "live":
        return {
          background: "var(--c-live-bg)",
          color: "var(--c-live)",
          border: "1px solid var(--c-live-border)",
        };
      case "gold":
        return {
          background: "var(--c-gold-subtle)",
          color: "var(--c-gold-hover)",
          border: "1px solid var(--c-gold-border)",
          boxShadow: "var(--glow-gold)",
        };
      case "court":
      case "navy":
        return {
          background: "var(--c-navy-subtle)",
          color: "var(--c-navy)",
          border: "1px solid var(--c-navy)",
        };
      case "app":
      case "blue":
      case "prosecution":
        return {
          background: "var(--c-prosecution-bg)",
          color: "var(--c-prosecution)",
          border: "1px solid var(--c-prosecution-border)",
        };
      case "defence":
      case "green":
        return {
          background: "var(--c-defence-bg)",
          color: "var(--c-defence)",
          border: "1px solid var(--c-defence-border)",
        };
      case "amber":
      case "scheduled":
        return {
          background: "var(--c-amber-bg)",
          color: "var(--c-amber)",
          border: "1px solid var(--c-amber-border)",
        };
      case "concluded":
        return {
          background: "var(--c-surface-elevated)",
          color: "var(--c-text-secondary)",
          border: "1px solid var(--c-border)",
        };
      default:
        return {
          background: "var(--c-surface-elevated)",
          color: "var(--c-text-secondary)",
          border: "1px solid var(--c-border-subtle)",
        };
    }
  };

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 10px",
        borderRadius: "var(--radius-full)",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.03em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...getVariantStyles(),
        ...style,
      }}
    >
      {pulse && (
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "currentColor",
            animation: "pulseDot 1.4s infinite ease-in-out",
          }}
        />
      )}
      {children}
    </span>
  );
}
