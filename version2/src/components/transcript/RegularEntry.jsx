import React from "react";
import { Badge } from "../ui/Badge";

export function RegularEntry({ entry }) {
  const getSpeakerBadgeVariant = (speaker) => {
    switch (speaker) {
      case "court":
        return "court";
      case "app":
        return "prosecution";
      case "defence":
        return "defence";
      default:
        return "neutral";
    }
  };

  const isCourt = entry.speaker === "court";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "16px 20px",
        borderRadius: "6px",
        backgroundColor: isCourt ? "rgba(197, 160, 89, 0.04)" : "var(--c-surface)",
        border: `1px solid ${isCourt ? "var(--c-gold-border)" : "var(--c-border)"}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Badge variant={getSpeakerBadgeVariant(entry.speaker)}>
            {entry.speakerLabel || "SPEAKER"}
          </Badge>
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
          fontFamily: isCourt ? "var(--font-serif)" : "var(--font-sans)",
          fontSize: isCourt ? "15.5px" : "14px",
          lineHeight: "1.65",
          color: isCourt ? "var(--c-gold-light)" : "var(--c-text-primary)",
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {entry.text}
      </div>
    </div>
  );
}
