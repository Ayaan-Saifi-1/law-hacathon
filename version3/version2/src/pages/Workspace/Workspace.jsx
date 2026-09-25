import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ActionBar } from "./ActionBar";
import { TranscriptStage } from "./TranscriptStage";
import { SessionPanel } from "./SessionPanel";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { useKeyboard } from "../../hooks/useKeyboard";
import "./Workspace.css";

export function Workspace() {
  const {
    isRecording,
    toggleRecording,
    markExhibit,
    addTranscriptEntry,
    activeWitnessIndex,
    witnesses,
    currentStage,
    setStage,
  } = useApp();

  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [isExhibitModalOpen, setIsExhibitModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const activeWitness = witnesses[activeWitnessIndex] || { code: "PW-1", name: "Witness" };
  const [exhibitForm, setExhibitForm] = useState({
    exhibitNo: `Ex. ${activeWitness.code}/C`,
    title: "",
    marker: "Admitted into evidence under Indian Evidence Act.",
  });

  const [orderText, setOrderText] = useState("");

  useKeyboard({
    "Alt+R": () => toggleRecording(),
    "Alt+E": () => setIsExhibitModalOpen(true),
    "Alt+S": () => setStage(currentStage),
    "Alt+D": () => setIsOrderModalOpen(true),
    Escape: () => {
      setIsExhibitModalOpen(false);
      setIsOrderModalOpen(false);
    },
  });

  const handleSaveExhibit = (e) => {
    e.preventDefault();
    markExhibit(exhibitForm);
    setIsExhibitModalOpen(false);
    setExhibitForm({
      exhibitNo: `Ex. ${activeWitness.code}/${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`,
      title: "",
      marker: "Admitted into evidence under Indian Evidence Act.",
    });
  };

  const handleSaveOrder = (e) => {
    e.preventDefault();
    if (!orderText.trim()) return;

    addTranscriptEntry({
      id: `tr-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      speaker: "court",
      speakerLabel: "HON'BLE COURT (ORDER DICTATION)",
      text: orderText.trim(),
      type: "regular",
    });

    setIsOrderModalOpen(false);
    setOrderText("");
  };

  return (
    <div className="workspace-page">
      <ActionBar
        onOpenExhibitModal={() => setIsExhibitModalOpen(true)}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        isPanelCollapsed={isPanelCollapsed}
        onTogglePanel={() => setIsPanelCollapsed(!isPanelCollapsed)}
      />

      <div className="workspace-layout">
        <div className="transcript-column">
          <TranscriptStage />
        </div>
        <SessionPanel isCollapsed={isPanelCollapsed} />
      </div>

      {/* Mark Exhibit Modal */}
      <Modal
        isOpen={isExhibitModalOpen}
        onClose={() => setIsExhibitModalOpen(false)}
        title="Mark Documentary / Material Exhibit"
      >
        <form onSubmit={handleSaveExhibit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--c-text-secondary)", marginBottom: "4px" }}>
              EXHIBIT IDENTIFIER *
            </label>
            <input
              required
              type="text"
              value={exhibitForm.exhibitNo}
              onChange={(e) => setExhibitForm({ ...exhibitForm, exhibitNo: e.target.value })}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "4px",
                backgroundColor: "var(--c-surface-elevated)",
                border: "1px solid var(--c-border)",
                color: "var(--c-gold)",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "14px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--c-text-secondary)", marginBottom: "4px" }}>
              DOCUMENT / ITEM DESCRIPTION *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. MLC Report No. 894/23 or Site Sketch Map"
              value={exhibitForm.title}
              onChange={(e) => setExhibitForm({ ...exhibitForm, title: e.target.value })}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "4px",
                backgroundColor: "var(--c-surface-elevated)",
                border: "1px solid var(--c-border)",
                color: "var(--c-text-primary)",
                fontSize: "13px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--c-text-secondary)", marginBottom: "4px" }}>
              COURT ENDORSEMENT / REMARKS
            </label>
            <textarea
              rows={3}
              value={exhibitForm.marker}
              onChange={(e) => setExhibitForm({ ...exhibitForm, marker: e.target.value })}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "4px",
                backgroundColor: "var(--c-surface-elevated)",
                border: "1px solid var(--c-border)",
                color: "var(--c-text-primary)",
                fontSize: "12px",
                resize: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <Button variant="ghost" onClick={() => setIsExhibitModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gold">
              Admit into Record
            </Button>
          </div>
        </form>
      </Modal>

      {/* Dictate Bench Order Modal */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        title="Dictate Judicial Order in Open Court"
        maxWidth="620px"
      >
        <form onSubmit={handleSaveOrder} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--c-text-secondary)", marginBottom: "4px" }}>
              JUDICIAL ORDER / DIRECTIONS DICTATION *
            </label>
            <textarea
              required
              rows={6}
              placeholder="e.g. Heard Ld. Counsel for both parties. Cross-examination deferred till 02:30 PM today..."
              value={orderText}
              onChange={(e) => setOrderText(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "5px",
                backgroundColor: "var(--c-surface-elevated)",
                border: "1px solid var(--c-border)",
                color: "var(--c-text-primary)",
                fontFamily: "var(--font-serif)",
                fontSize: "15px",
                lineHeight: "1.6",
                resize: "none",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
            <span style={{ fontSize: "11px", color: "var(--c-text-muted)" }}>
              Order will be appended immediately to the official transcript.
            </span>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button variant="ghost" onClick={() => setIsOrderModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="gold">
                Transcribe Order
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
