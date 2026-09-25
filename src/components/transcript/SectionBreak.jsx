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
          padding: "6px 20px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "var(--c-gold-subtle)",
          border: "1px solid var(--c-gold-border)",
          boxShadow: "var(--glow-gold)",
          color: "var(--c-gold-hover)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        <span>◈ {stage || "PROCEEDING STAGE"} ◈</span>
      </div>
      <div style={{ flex: 1, height: "1px", backgroundColor: "var(--c-border)" }} />
    </div>
  );
}
