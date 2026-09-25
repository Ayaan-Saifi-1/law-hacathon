import React from "react";
import { useApp } from "../../context/AppContext";
import { Button } from "../../components/ui/Button";
import { PROCEEDING_STAGES } from "../../data/mock";

export function ActionBar({
  onOpenExhibitModal,
  onOpenOrderModal,
  isPanelCollapsed,
  onTogglePanel,
}) {
  const { isRecording, toggleRecording, currentStage, setStage } = useApp();

  return (
    <div className="command-strip">
      {/* Left: Recording Toggle & Stage Selector */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Button
          variant={isRecording ? "danger" : "gold"}
          size="sm"
          onClick={toggleRecording}
          title="Toggle audio capture (Shortcut: Alt+R)"
          icon={
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#fff",
              }}
            />
          }
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
          <span
            style={{
              fontSize: "10px",
              opacity: 0.75,
              marginLeft: "4px",
              fontFamily: "var(--font-mono)",
            }}
          >
            [Alt+R]
          </span>
        </Button>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "var(--c-text-muted)", fontWeight: 600 }}>
            STAGE:
          </span>
          <select
            value={currentStage}
            onChange={(e) => setStage(e.target.value)}
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              backgroundColor: "var(--c-surface-elevated)",
              border: "1px solid var(--c-border)",
              color: "var(--c-gold-light)",
              fontSize: "12px",
              fontWeight: 600,
              outline: "none",
            }}
          >
            {PROCEEDING_STAGES.map((stg) => (
              <option key={stg} value={stg}>
                {stg}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Middle: Stenographer Rapid Entry Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenExhibitModal}
          title="Mark documentary / material exhibit on record (Shortcut: Alt+E)"
        >
          + Mark Exhibit
          <span style={{ fontSize: "10px", opacity: 0.6, marginLeft: "4px", fontFamily: "var(--font-mono)" }}>
            [Alt+E]
          </span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setStage(currentStage)}
          title="Insert stage separator break in transcript flow (Shortcut: Alt+S)"
        >
          ◈ Stage Break
          <span style={{ fontSize: "10px", opacity: 0.6, marginLeft: "4px", fontFamily: "var(--font-mono)" }}>
            [Alt+S]
          </span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenOrderModal}
          title="Dictate formal judicial order (Shortcut: Alt+D)"
        >
          ⚖ Dictate Order
          <span style={{ fontSize: "10px", opacity: 0.6, marginLeft: "4px", fontFamily: "var(--font-mono)" }}>
            [Alt+D]
          </span>
        </Button>
      </div>

      {/* Right: Toggle Session Info Panel */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onTogglePanel}
          title={isPanelCollapsed ? "Show case & witness panel" : "Hide case & witness panel"}
        >
          {isPanelCollapsed ? "◧ Show Details" : "⊟ Hide Details"}
        </Button>
      </div>
    </div>
  );
}
