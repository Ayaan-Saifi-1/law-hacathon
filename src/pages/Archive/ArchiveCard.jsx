import React from "react";
import { Badge } from "../../components/ui/Badge";

export function ArchiveCard({ record, isSelected, onSelect }) {
  return (
    <div
      className={`archive-card ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--c-text-primary)" }}>
              {record.caseNo}
            </span>
            <Badge variant="navy">{record.stage}</Badge>
          </div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--c-text-2)", marginTop: "2px" }}>
            {record.title}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--c-text-3)" }}>
            {record.date}
          </span>
          <div style={{ fontSize: "11px", color: "var(--c-text-3)", marginTop: "2px" }}>
            {record.court.split(",")[0]}
          </div>
        </div>
      </div>

      <div style={{ fontSize: "12px", color: "var(--c-navy)", marginBottom: "8px", fontWeight: 600 }}>
        {record.sections}
      </div>

      <p
        style={{
          fontSize: "12px",
          color: "var(--c-text-2)",
          lineHeight: 1.5,
          marginBottom: "12px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {record.summary}
      </p>

      {/* Record Stats Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          fontSize: "11px",
          color: "var(--c-text-3)",
          borderTop: "1px solid var(--c-border-subtle)",
          paddingTop: "10px",
        }}
      >
        <span>
          Exhibits: <strong style={{ color: "var(--c-text-2)" }}>{record.stats.exhibits}</strong>
        </span>
        <span>•</span>
        <span>
          Depositions: <strong style={{ color: "var(--c-text-2)" }}>{record.stats.depositions}</strong>
        </span>
        <span>•</span>
        <span>
          Orders: <strong style={{ color: "var(--c-text-2)" }}>{record.stats.orders}</strong>
        </span>
        <span style={{ marginLeft: "auto", color: "var(--c-navy)", fontWeight: 700 }}>
          {isSelected ? "Viewing Record ‹" : "View Full Docket ›"}
        </span>
      </div>
    </div>
  );
}
