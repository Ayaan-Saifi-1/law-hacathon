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
        borderRadius: "0px",
        backgroundColor: "var(--c-surface)",
        borderBottom: "1px solid var(--c-border-subtle)",
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
          fontFamily: "var(--font-serif)",
          fontSize: isCourt ? "17px" : "16px",
          fontWeight: isCourt ? 700 : 400,
          lineHeight: "1.65",
          color: "var(--c-text-primary)",
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {entry.text}
      </div>
    </div>
  );
}
