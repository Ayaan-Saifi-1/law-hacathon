import React from "react";

export function LiveCursor({ isRecording, stage }) {
  if (!isRecording) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        borderRadius: "6px",
        backgroundColor: "var(--c-surface)",
        border: "1px solid var(--c-border)",
        margin: "8px 0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--c-text-secondary)" }}>
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: "var(--c-live)",
            animation: "pulseDot 1.4s infinite ease-in-out",
          }}
        />
        <span style={{ color: "var(--c-text-primary)", fontWeight: 600 }}>Real-Time Stream Active</span>
        <span style={{ color: "var(--c-text-dim)" }}>•</span>
        <span>Awaiting speech attribution for {stage}...</span>
      </div>

      <span
        style={{
          fontSize: "11px",
          color: "var(--c-text-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        [Data Layer Receiver Ready]
      </span>
    </div>
  );
}
