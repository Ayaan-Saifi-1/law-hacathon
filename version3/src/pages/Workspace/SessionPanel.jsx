import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";

export function SessionPanel({ isCollapsed }) {
  const {
    currentCase,
    witnesses,
    activeWitnessIndex,
    setWitnessIndex,
    addWitness,
    benchNotes,
    setBenchNotes,
    transcript,
  } = useApp();

  const [isAddWitnessOpen, setIsAddWitnessOpen] = useState(false);
  const [newWitness, setNewWitness] = useState({
    code: "PW-3",
    name: "",
    role: "",
  });

  if (isCollapsed) return null;

  const exhibitsMarked = transcript.filter((t) => t.type === "exhibit");

  const handleAddWitness = (e) => {
    e.preventDefault();
    if (!newWitness.name) return;
    addWitness({
      id: `wit-${Date.now()}`,
      code: newWitness.code || `PW-${witnesses.length + 1}`,
      name: newWitness.name,
      role: newWitness.role || "Independent Witness",
      status: "Summoned",
      exhibits: [],
    });
    setIsAddWitnessOpen(false);
    setNewWitness({ code: "PW-3", name: "", role: "" });
  };

  return (
    <aside className="session-panel">
      {/* 1. Case Details Section */}
      <div className="panel-section">
        <div className="panel-section-title">
          <span>DOCKET DETAILS</span>
          <Badge variant="navy">IN SESSION</Badge>
        </div>
        {currentCase ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--c-text-primary)", lineHeight: 1.3 }}>
                {currentCase.caseNo}
              </div>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--c-text-muted)", marginTop: "2px" }}>
                CNR: {currentCase.cnr}
              </div>
            </div>

            <div style={{ fontSize: "12px", color: "#fcd34d", fontWeight: 500, lineHeight: 1.4 }}>
              {currentCase.sections}
            </div>

            <div
              style={{
                backgroundColor: "var(--c-surface-elevated)",
                padding: "10px 12px",
                borderRadius: "5px",
                border: "1px solid var(--c-border)",
                fontSize: "12px",
              }}
            >
              <div style={{ color: "var(--c-text-primary)", fontWeight: 600 }}>
                State: {currentCase.petitioner}
              </div>
              <div style={{ color: "var(--c-text-muted)", fontSize: "11px", marginTop: "2px" }}>
                Counsel: {currentCase.advocateP}
              </div>
              <div style={{ color: "var(--c-text-primary)", fontWeight: 600, marginTop: "8px" }}>
                Accused: {currentCase.respondent}
              </div>
              <div style={{ color: "var(--c-text-muted)", fontSize: "11px", marginTop: "2px" }}>
                Counsel: {currentCase.advocateR}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: "12px", color: "var(--c-text-muted)" }}>No case currently active.</div>
        )}
      </div>

      {/* 2. Witness Box Section */}
      <div className="panel-section">
        <div className="panel-section-title">
          <span>WITNESS BOX</span>
          <Button size="sm" variant="ghost" onClick={() => setIsAddWitnessOpen(true)}>
            + Add
          </Button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {witnesses.map((wit, idx) => {
            const isWitnessActive = idx === activeWitnessIndex;
            return (
              <div
                key={wit.id}
                onClick={() => setWitnessIndex(idx)}
                style={{
                  padding: "10px 12px",
                  borderRadius: "5px",
                  backgroundColor: isWitnessActive ? "var(--c-navy-subtle)" : "var(--c-surface-elevated)",
                  border: `1px solid ${isWitnessActive ? "var(--c-navy)" : "var(--c-border)"}`,
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        fontSize: "11px",
                        color: isWitnessActive ? "var(--c-navy)" : "var(--c-text-secondary)",
                      }}
                    >
                      {wit.code}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: isWitnessActive ? "var(--c-text-primary)" : "var(--c-text-secondary)",
                      }}
                    >
                      {wit.name}
                    </span>
                  </div>
                  {isWitnessActive ? (
                    <Badge variant="live" pulse>
                      ACTIVE
                    </Badge>
                  ) : (
                    <span style={{ fontSize: "11px", color: "var(--c-text-muted)" }}>{wit.status}</span>
                  )}
                </div>
                <div style={{ fontSize: "11px", color: "var(--c-text-muted)", marginTop: "4px" }}>
                  {wit.role}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Exhibits Admitted on Record */}
      <div className="panel-section">
        <div className="panel-section-title">
          <span>EXHIBITS ON RECORD ({exhibitsMarked.length})</span>
        </div>
        {exhibitsMarked.length === 0 ? (
          <div style={{ fontSize: "12px", color: "var(--c-text-muted)" }}>
            No documentary exhibits marked yet in this session.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {exhibitsMarked.map((ex) => (
              <div
                key={ex.id}
                style={{
                  padding: "8px 12px",
                  borderRadius: "4px",
                  backgroundColor: "var(--c-surface-elevated)",
                  border: "1px solid var(--c-border)",
                  fontSize: "12px",
                }}
              >
                <div style={{ color: "var(--c-navy)", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                  {ex.exhibitNo}
                </div>
                <div style={{ color: "var(--c-text-primary)", marginTop: "2px" }}>{ex.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Bench Notes */}
      <div className="panel-section" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div className="panel-section-title">
          <span>BENCH OBSERVATION NOTES</span>
        </div>
        <textarea
          value={benchNotes}
          onChange={(e) => setBenchNotes(e.target.value)}
          placeholder="Stenographer observations, interim directions..."
          style={{
            flex: 1,
            width: "100%",
            minHeight: "120px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "var(--c-surface-elevated)",
            border: "1px solid var(--c-border)",
            color: "var(--c-text-primary)",
            fontSize: "12px",
            lineHeight: 1.5,
            resize: "none",
            outline: "none",
          }}
        />
      </div>

      {/* Add Witness Modal */}
      <Modal isOpen={isAddWitnessOpen} onClose={() => setIsAddWitnessOpen(false)} title="Summon Witness to Box">
        <form onSubmit={handleAddWitness} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--c-text-secondary)", marginBottom: "4px" }}>
              WITNESS CODE
            </label>
            <input
              type="text"
              placeholder="e.g. PW-3 or DW-2"
              value={newWitness.code}
              onChange={(e) => setNewWitness({ ...newWitness, code: e.target.value })}
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
              WITNESS FULL NAME *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. HC Naresh Kumar"
              value={newWitness.name}
              onChange={(e) => setNewWitness({ ...newWitness, name: e.target.value })}
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
              OFFICIAL ROLE / OCCUPATION
            </label>
            <input
              type="text"
              placeholder="e.g. Malkhana Moharrir, PS Kashmere Gate"
              value={newWitness.role}
              onChange={(e) => setNewWitness({ ...newWitness, role: e.target.value })}
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
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <Button variant="ghost" onClick={() => setIsAddWitnessOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Witness
            </Button>
          </div>
        </form>
      </Modal>
    </aside>
  );
}
