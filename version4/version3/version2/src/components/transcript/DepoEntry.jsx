import React from "react";
import { Badge } from "../ui/Badge";

export function DepoEntry({ entry }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "18px 22px",
        borderRadius: "6px",
        backgroundColor: "var(--c-surface)",
        border: "1px solid var(--c-border)",
        borderLeft: "4px solid var(--c-gold)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Deposition Header Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Badge variant="defence">{entry.speakerLabel || "EXAMINING COUNSEL"}</Badge>
          <span style={{ fontSize: "12px", color: "var(--c-text-dim)" }}>›</span>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--c-text-secondary)",
            }}
          >
            {entry.witnessName || "Witness on Solemn Affirmation (S.A.)"}
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--c-text-muted)",
          }}
        >
          {entry.timestamp}
        </span>
      </div>

      {/* Question Block */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          backgroundColor: "var(--c-surface-elevated)",
          padding: "12px 16px",
          borderRadius: "5px",
          border: "1px solid var(--c-border-subtle)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "14px",
            color: "var(--c-gold)",
            lineHeight: 1.6,
            flexShrink: 0,
          }}
        >
          Q.
        </span>
        <div
          style={{
            fontSize: "14px",
            lineHeight: 1.6,
            color: "var(--c-text-primary)",
            fontWeight: 500,
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {entry.question}
        </div>
      </div>

      {/* Answer Block */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          backgroundColor: "rgba(16, 185, 129, 0.05)",
          padding: "12px 16px",
          borderRadius: "5px",
          borderLeft: "3px solid var(--c-defence)",
          borderTop: "1px solid rgba(16, 185, 129, 0.15)",
          borderRight: "1px solid rgba(16, 185, 129, 0.15)",
          borderBottom: "1px solid rgba(16, 185, 129, 0.15)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "14px",
            color: "#34d399",
            lineHeight: 1.6,
            flexShrink: 0,
          }}
        >
          Ans.
        </span>
        <div
          style={{
            fontSize: "14px",
            lineHeight: 1.65,
            color: "var(--c-text-primary)",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {entry.answer}
        </div>
      </div>
    </div>
  );
}
