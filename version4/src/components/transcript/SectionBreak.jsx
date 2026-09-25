import React from "react";

export function SectionBreak({ stage }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        margin: "16px 0",
      }}
    >
      <div style={{ flex: 1, height: "1px", backgroundColor: "var(--c-border)" }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "4px 16px",
          borderRadius: "4px",
          backgroundColor: "var(--c-surface-elevated)",
          border: "1px solid var(--c-navy-border)",
          color: "var(--c-navy)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        <span>{stage || "PROCEEDING STAGE"}</span>
      </div>
      <div style={{ flex: 1, height: "1px", backgroundColor: "var(--c-border)" }} />
    </div>
  );
}
