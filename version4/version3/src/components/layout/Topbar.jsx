import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { exportDepositionTxt } from "../../utils/export";

export function Topbar() {
  const { currentCase, isRecording, transcript } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header
      className="app-topbar"
      style={{
        height: "var(--topbar-h)",
        backgroundColor: "var(--c-surface)",
        borderBottom: "1px solid var(--c-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        flexShrink: 0,
        zIndex: 40,
        gap: "16px",
      }}
    >
      {/* Left: Jurisdiction & Courtroom Identity */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
        <span
          style={{
            fontSize: "11px",
            padding: "3px 8px",
            borderRadius: "2px",
            backgroundColor: "var(--c-navy-subtle)",
            color: "var(--c-navy)",
            fontWeight: 700,
            border: "1px solid var(--c-navy)",
            whiteSpace: "nowrap",
          }}
        >
          COURT NO. 4
        </span>

        <span
          style={{
            fontSize: "13px",
            color: "var(--c-text-primary)",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          Sh. A. K. Garg, Ld. Additional Sessions Judge
        </span>

        {currentCase && (
          <>
            <span style={{ color: "var(--c-text-dim)" }}>|</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                minWidth: 0,
              }}
            >
              <span style={{ color: "var(--c-text-secondary)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {currentCase.caseNo}
              </span>
              <span style={{ color: "var(--c-text-dim)", flexShrink: 0 }}>•</span>
              <div style={{ flexShrink: 0 }}>
                <Badge variant="navy">{currentCase.stage}</Badge>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right: Clean Session Status, Export & Clock */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
        {/* Status Pill */}
        <Badge variant={isRecording ? "live" : "neutral"} pulse={isRecording}>
          {isRecording ? "Transcribing In Session" : "Court In Recess"}
        </Badge>

        {/* Deposition Export Button */}
        {currentCase && (
          <Button
            size="sm"
            variant="secondary"
            title="Download formatted court transcript"
            onClick={() => exportDepositionTxt(currentCase, transcript)}
          >
            ↓ Export Transcript
          </Button>
        )}

        {/* Date & Time in single line (no awkward line-breaks) */}
        <div
          style={{
            fontSize: "12px",
            fontFamily: "var(--font-mono)",
            color: "var(--c-text-secondary)",
            paddingLeft: "12px",
            borderLeft: "1px solid var(--c-border)",
            whiteSpace: "nowrap",
          }}
        >
          <span>{formattedDate}</span>
          <span style={{ margin: "0 6px", color: "var(--c-text-dim)" }}>•</span>
          <span style={{ color: "var(--c-text-primary)", fontWeight: 600 }}>{formattedTime}</span>
        </div>
      </div>
    </header>
  );
}
