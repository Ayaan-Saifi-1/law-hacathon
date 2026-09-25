import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { PROCEEDING_STAGES } from "../../data/mock";
import "./CauseList.css";

export function CauseList() {
  const { causeList, setCase, addCase } = useApp();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newCase, setNewCase] = useState({
    caseNo: "",
    cnr: "",
    petitioner: "",
    respondent: "",
    advocateP: "",
    advocateR: "",
    sections: "",
    stage: PROCEEDING_STAGES[0],
    time: "11:30 AM",
    witnessName: "",
  });

  const filteredCases = causeList.filter((c) => {
    const matchesSearch =
      c.caseNo.toLowerCase().includes(search.toLowerCase()) ||
      c.petitioner.toLowerCase().includes(search.toLowerCase()) ||
      c.respondent.toLowerCase().includes(search.toLowerCase()) ||
      c.sections.toLowerCase().includes(search.toLowerCase()) ||
      c.cnr.toLowerCase().includes(search.toLowerCase());

    const matchesStage = stageFilter === "ALL" || c.stage === stageFilter;
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;

    return matchesSearch && matchesStage && matchesStatus;
  });

  const inProgressCount = causeList.filter((c) => c.status === "IN_PROGRESS").length;
  const scheduledCount = causeList.filter((c) => c.status === "SCHEDULED").length;
  const concludedCount = causeList.filter((c) => c.status === "CONCLUDED").length;

  const handleOpenInWorkspace = (c) => {
    setCase(c.id);
    navigate("/workspace");
  };

  const handleCreateCase = (e) => {
    e.preventDefault();
    const created = {
      id: `case-${Date.now()}`,
      itemNo: String(causeList.length + 1).padStart(2, "0"),
      caseNo: newCase.caseNo || "Sessions Case No. 99/2026",
      cnr: newCase.cnr || `DLCT01-${Math.floor(100000 + Math.random() * 900000)}-2026`,
      courtRoom: "Court No. 4",
      judge: "Sh. A. K. Garg, Ld. ASJ",
      petitioner: newCase.petitioner || "State",
      respondent: newCase.respondent || "Respondent",
      advocateP: newCase.advocateP || "Ld. Addl. PP",
      advocateR: newCase.advocateR || "Defense Counsel",
      sections: newCase.sections || "IPC / Special Statute",
      stage: newCase.stage,
      time: newCase.time,
      status: "SCHEDULED",
      exhibitsCount: 0,
      depositionsCount: 0,
      witnessName: newCase.witnessName || "N/A",
    };
    addCase(created);
    setIsAddModalOpen(false);
    setNewCase({
      caseNo: "",
      cnr: "",
      petitioner: "",
      respondent: "",
      advocateP: "",
      advocateR: "",
      sections: "",
      stage: PROCEEDING_STAGES[0],
      time: "11:30 AM",
      witnessName: "",
    });
  };

  return (
    <div className="causelist-page">
      {/* Top Header */}
      <div className="causelist-header">
        <div>
          <h1 className="causelist-title">Daily Cause List — Court No. 4</h1>
          <div className="causelist-meta">
            Presiding Officer: <strong>Sh. A. K. Garg, Ld. Additional Sessions Judge</strong> • Tis Hazari Courts, Delhi
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="gold" icon="+" onClick={() => setIsAddModalOpen(true)}>
            Add Case to Cause List
          </Button>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-label">Total Listed Today</span>
          <span className="stat-value">{causeList.length} Cases</span>
        </div>
        <div style={{ width: "1px", height: "28px", backgroundColor: "var(--c-border)" }} />
        <div className="stat-item">
          <span className="stat-label" style={{ color: "#f87171" }}>In Active Session</span>
          <span className="stat-value" style={{ color: "#f87171" }}>{inProgressCount}</span>
        </div>
        <div style={{ width: "1px", height: "28px", backgroundColor: "var(--c-border)" }} />
        <div className="stat-item">
          <span className="stat-label">Scheduled / Pending</span>
          <span className="stat-value" style={{ color: "#fcd34d" }}>{scheduledCount}</span>
        </div>
        <div style={{ width: "1px", height: "28px", backgroundColor: "var(--c-border)" }} />
        <div className="stat-item">
          <span className="stat-label">Concluded / Disposed</span>
          <span className="stat-value" style={{ color: "#6ee7b7" }}>{concludedCount}</span>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "var(--c-text-muted)" }}>Session Date:</span>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "4px",
              backgroundColor: "var(--c-surface-elevated)",
              border: "1px solid var(--c-border)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--c-gold)",
              fontWeight: 600,
            }}
          >
            23-09-2026 (Wednesday)
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type="text"
            placeholder="Search docket by Case No., CNR, Litigant, Section, or Advocate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 14px",
              borderRadius: "6px",
              backgroundColor: "var(--c-surface)",
              border: "1px solid var(--c-border)",
              color: "var(--c-text-primary)",
              fontSize: "13px",
              outline: "none",
            }}
          />
        </div>

        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          style={{
            padding: "9px 12px",
            borderRadius: "6px",
            backgroundColor: "var(--c-surface)",
            border: "1px solid var(--c-border)",
            color: "var(--c-text-primary)",
            fontSize: "13px",
            outline: "none",
          }}
        >
          <option value="ALL">All Proceeding Stages</option>
          {PROCEEDING_STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "9px 12px",
            borderRadius: "6px",
            backgroundColor: "var(--c-surface)",
            border: "1px solid var(--c-border)",
            color: "var(--c-text-primary)",
            fontSize: "13px",
            outline: "none",
          }}
        >
          <option value="ALL">All Statuses</option>
          <option value="IN_PROGRESS">In Active Session</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="CONCLUDED">Concluded</option>
        </select>
      </div>

      {/* Case List Display */}
      {filteredCases.map((c) => {
        const isInProgress = c.status === "IN_PROGRESS";
        return (
          <div
            key={c.id}
            className={`case-card ${isInProgress ? "in-progress" : ""}`}
          >
            <div className="case-card-grid">
              {/* Item No & Time */}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: isInProgress ? "var(--c-gold)" : "var(--c-text-secondary)",
                  }}
                >
                  #{c.itemNo}
                </div>
                <div style={{ fontSize: "12px", color: "var(--c-text-muted)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
                  {c.time}
                </div>
              </div>

              {/* Case No, CNR, Offense */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--c-text-primary)" }}>
                    {c.caseNo}
                  </span>
                  {isInProgress && (
                    <Badge variant="live" pulse>
                      ACTIVE
                    </Badge>
                  )}
                  {c.status === "CONCLUDED" && <Badge variant="concluded">CONCLUDED</Badge>}
                </div>
                <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--c-text-muted)" }}>
                  CNR: {c.cnr}
                </div>
                <div style={{ fontSize: "12px", color: "#fcd34d", marginTop: "4px" }}>
                  {c.sections}
                </div>
              </div>

              {/* Parties & Advocates */}
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--c-text-primary)", lineHeight: 1.4 }}>
                  {c.petitioner} <span style={{ color: "var(--c-gold)", fontWeight: 400 }}>vs.</span> {c.respondent}
                </div>
                <div style={{ fontSize: "11px", color: "var(--c-text-muted)", marginTop: "4px" }}>
                  Pros: <span style={{ color: "var(--c-text-secondary)" }}>{c.advocateP}</span> • Def:{" "}
                  <span style={{ color: "var(--c-text-secondary)" }}>{c.advocateR}</span>
                </div>
                {c.witnessName && c.witnessName !== "N/A" && (
                  <div style={{ fontSize: "11px", color: "var(--c-gold-light)", marginTop: "2px" }}>
                    Witness: <strong>{c.witnessName}</strong>
                  </div>
                )}
              </div>

              {/* Stage & Details */}
              <div>
                <div style={{ marginBottom: "6px" }}>
                  <Badge variant={isInProgress ? "court" : "scheduled"}>{c.stage}</Badge>
                </div>
                <div style={{ fontSize: "11px", color: "var(--c-text-muted)" }}>
                  Exhibits: <strong style={{ color: "var(--c-text-secondary)" }}>{c.exhibitsCount}</strong> • Depo:{" "}
                  <strong style={{ color: "var(--c-text-secondary)" }}>{c.depositionsCount}</strong>
                </div>
              </div>

              {/* Actions */}
              <div>
                <Button
                  variant={isInProgress ? "gold" : "secondary"}
                  size="sm"
                  onClick={() => handleOpenInWorkspace(c)}
                >
                  {isInProgress ? "Open Workspace ◈" : "Enter Session →"}
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Add New Case Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Case to Cause List (Court No. 4)"
      >
        <form onSubmit={handleCreateCase} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--c-text-secondary)", marginBottom: "4px" }}>
              CASE / REGISTRATION NUMBER *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Sessions Case No. 42/2026"
              value={newCase.caseNo}
              onChange={(e) => setNewCase({ ...newCase, caseNo: e.target.value })}
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--c-text-secondary)", marginBottom: "4px" }}>
                CNR NUMBER
              </label>
              <input
                type="text"
                placeholder="e.g. DLCT01-008912-2026"
                value={newCase.cnr}
                onChange={(e) => setNewCase({ ...newCase, cnr: e.target.value })}
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
                SCHEDULED TIME
              </label>
              <input
                type="text"
                placeholder="e.g. 11:30 AM"
                value={newCase.time}
                onChange={(e) => setNewCase({ ...newCase, time: e.target.value })}
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
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--c-text-secondary)", marginBottom: "4px" }}>
                PETITIONER / STATE *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. State (NCT of Delhi)"
                value={newCase.petitioner}
                onChange={(e) => setNewCase({ ...newCase, petitioner: e.target.value })}
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
                RESPONDENT / ACCUSED *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={newCase.respondent}
                onChange={(e) => setNewCase({ ...newCase, respondent: e.target.value })}
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
          </div>

          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--c-text-secondary)", marginBottom: "4px" }}>
              LEGAL SECTIONS / OFFENSE
            </label>
            <input
              type="text"
              placeholder="e.g. U/s 302/34 IPC & 25 Arms Act"
              value={newCase.sections}
              onChange={(e) => setNewCase({ ...newCase, sections: e.target.value })}
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

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gold">
              Add Case to Docket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
