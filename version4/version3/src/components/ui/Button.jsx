import React from "react";

export function Button({
  children,
  variant = "secondary",
  size = "md",
  icon = null,
  onClick,
  disabled = false,
  className = "",
  style = {},
  title = "",
  type = "button",
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          background: "var(--c-navy)",
          color: "#ffffff",
          border: "1px solid var(--c-navy)",
          fontWeight: 700,
        };
      case "danger":
        return {
          background: "#b91c1c",
          color: "#ffffff",
          border: "1px solid #dc2626",
          fontWeight: 600,
        };
      case "ghost":
        return {
          background: "transparent",
          color: "var(--c-text-secondary)",
          border: "1px solid transparent",
        };
      case "secondary":
      default:
        return {
          background: "var(--c-surface-elevated)",
          color: "var(--c-text-primary)",
          border: "1px solid var(--c-border)",
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          padding: "5px 12px",
          fontSize: "12px",
          borderRadius: "2px",
          gap: "6px",
        };
      case "lg":
        return {
          padding: "10px 20px",
          fontSize: "14px",
          borderRadius: "2px",
          gap: "8px",
        };
      case "md":
      default:
        return {
          padding: "7px 15px",
          fontSize: "13px",
          borderRadius: "2px",
          gap: "6px",
        };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "background 150ms ease, border-color 150ms ease",
        userSelect: "none",
        fontFamily: "inherit",
        lineHeight: 1.2,
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          if (variant === "ghost") e.currentTarget.style.background = "var(--c-surface-elevated)";
          if (variant === "secondary") e.currentTarget.style.background = "var(--c-surface-hover)";
          if (variant === "primary") e.currentTarget.style.background = "var(--c-navy-hover)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          if (variant === "ghost") e.currentTarget.style.background = "transparent";
          if (variant === "secondary") e.currentTarget.style.background = "var(--c-surface-elevated)";
          if (variant === "primary") e.currentTarget.style.background = "var(--c-navy)";
        }
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = "scale(0.97)";
      }}
      onMouseUp={(e) => {
        if (!disabled) e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {icon && <span style={{ display: "inline-flex", fontSize: "13px" }}>{icon}</span>}
      {children}
    </button>
  );
}
