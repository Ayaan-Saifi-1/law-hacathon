import React, { useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { RegularEntry } from "../../components/transcript/RegularEntry";
import { DepoEntry } from "../../components/transcript/DepoEntry";
import { SectionBreak } from "../../components/transcript/SectionBreak";
import { ExhibitMark } from "../../components/transcript/ExhibitMark";
import { LiveCursor } from "../../components/transcript/LiveCursor";

export function TranscriptStage() {
  const { transcript, isRecording, currentStage, currentCase } = useApp();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcript.length, isRecording]);

  const renderEntry = (entry) => {
    switch (entry.type) {
      case "section_break":
        return <SectionBreak key={entry.id} stage={entry.stage} />;
      case "exhibit":
        return <ExhibitMark key={entry.id} entry={entry} />;
      case "depo":
        return <DepoEntry key={entry.id} entry={entry} />;
      case "regular":
      default:
        return <RegularEntry key={entry.id} entry={entry} />;
    }
  };

  return (
    <div className="transcript-stage">
      {/* Official Court Document Banner */}
      <div
        style={{
          textAlign: "center",
          padding: "16px 20px",
          borderBottom: "1px solid var(--c-border)",
          marginBottom: "12px",
          backgroundColor: "var(--c-surface)",
          borderRadius: "6px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "18px",
            fontWeight: 700,
            color: "var(--c-text-primary)",
            letterSpacing: "0.03em",
          }}
        >
          COURT OF ADDITIONAL SESSIONS JUDGE-03, TIS HAZARI, DELHI
        </div>
        <div style={{ fontSize: "12px", color: "var(--c-text-muted)", marginTop: "4px" }}>
          {currentCase ? `${currentCase.caseNo} • ${currentCase.petitioner} vs. ${currentCase.respondent}` : "OFFICIAL DEPOSITION & PROCEEDING TRANSCRIPT"}
        </div>
      </div>

      {transcript.map((entry) => renderEntry(entry))}

      {/* Real-time speech stream receiver state */}
      <LiveCursor isRecording={isRecording} stage={currentStage} />

      <div ref={bottomRef} style={{ height: "8px" }} />
    </div>
  );
}
