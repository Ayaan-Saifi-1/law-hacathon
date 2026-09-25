import React from "react";
import { Badge } from "../ui/Badge";

export function ExhibitMark({ entry }) {
  return (
    <div
      style={{
        margin: "8px 0",
        padding: "16px 20px",
        borderRadius: "var(--radius-md)",
        backgroundColor: "var(--c-surface-elevated)",
        border: "1px solid var(--c-gold-border)",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Badge variant="gold">📎 EXHIBIT TENDERED & ADMITTED</Badge>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "13px",
              color: "var(--c-text-primary)",
            }}
          >
            {entry.exhibitNo}
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

      <div
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--c-text-primary)",
        }}
      >
        {entry.title}
      </div>

      <div
        style={{
          fontSize: "12px",
          color: "var(--c-text-secondary)",
          fontStyle: "italic",
        }}
      >
        {entry.marker}
      </div>
    </div>
  );
}
