import React from "react";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

export function ArchiveDetailPane({ record, onClose }) {
  if (!record) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const blob = new Blob([record.fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${record.caseNo.replace(/[^a-zA-Z0-9]/g, "_")}_Record.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="archive-detail-pane">
      {/* Pane Header */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--c-border)",
          backgroundColor: "var(--c-surface-elevated)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Badge variant="navy">{record.stage}</Badge>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--c-text-muted)" }}>
                {record.date}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "19px",
                fontWeight: 700,
                color: "var(--c-text-primary)",
                margin: "8px 0 2px 0",
              }}
            >
              {record.caseNo}
            </h2>
            <div style={{ fontSize: "13px", color: "var(--c-text-secondary)" }}>{record.title}</div>
          </div>
          <button
            onClick={onClose}
            style={{
              color: "var(--c-text-muted)",
              fontSize: "18px",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-text-muted)")}
          >
            ✕
          </button>
        </div>

        <div style={{ marginTop: "14px", display: "flex", gap: "10px" }}>
          <Button size="sm" variant="primary" onClick={handleDownload}>
            Download Certified Record
          </Button>
          <Button size="sm" variant="secondary" onClick={handlePrint}>
            Print
          </Button>
        </div>
      </div>

      {/* Pane Content */}
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Court & Judge Card */}
        <div
          style={{
            padding: "14px 16px",
            borderRadius: "6px",
            backgroundColor: "var(--c-surface-elevated)",
            border: "1px solid var(--c-border)",
            fontSize: "12px",
          }}
        >
          <div style={{ color: "var(--c-text-muted)", textTransform: "uppercase", fontSize: "10px", fontWeight: 700 }}>
            BENCH & CNR
          </div>
          <div style={{ color: "var(--c-text-primary)", fontWeight: 600, marginTop: "4px", fontSize: "13px" }}>
            {record.judge}
          </div>
          <div style={{ color: "var(--c-text-secondary)", marginTop: "2px" }}>{record.court}</div>
          <div style={{ color: "var(--c-navy)", fontFamily: "var(--font-mono)", fontSize: "11px", marginTop: "4px" }}>
            CNR: {record.cnr}
          </div>
        </div>

        {/* Precedents Cited */}
        {record.precedentsCited && record.precedentsCited.length > 0 && (
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--c-navy)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              JUDICIAL PRECEDENTS CITED IN PROCEEDINGS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {record.precedentsCited.map((cite, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "5px",
                    backgroundColor: "var(--c-surface-elevated)",
                    borderLeft: "3px solid var(--c-navy)",
                    borderTop: "1px solid var(--c-border)",
                    borderRight: "1px solid var(--c-border)",
                    borderBottom: "1px solid var(--c-border)",
                    fontSize: "12px",
                    color: "var(--c-text-primary)",
                    lineHeight: 1.5,
                  }}
                >
                  {cite}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--c-text-muted)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            PROCEEDING SUMMARY
          </div>
          <p style={{ fontSize: "13px", lineHeight: "1.65", color: "var(--c-text-secondary)" }}>
            {record.summary}
          </p>
        </div>

        {/* Verbatim Record Text */}
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--c-text-muted)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            VERBATIM OFFICIAL COURT TRANSCRIPTION
          </div>
          <pre
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "14px",
              lineHeight: "1.7",
              color: "var(--c-text-primary)",
              backgroundColor: "var(--c-bg)",
              padding: "18px",
              borderRadius: "6px",
              border: "1px solid var(--c-border)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {record.fullText}
          </pre>
        </div>
      </div>
    </div>
  );
}
