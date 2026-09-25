import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { exportRoznamaCsv } from "../../utils/export";
import "./Admin.css";

export function Admin() {
  const { roznama } = useApp();
  const [activeTab, setActiveTab] = useState("roznama");

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Court Daily Roznama & Bench Register</h1>
          <div style={{ fontSize: "13px", color: "var(--c-text-secondary)", marginTop: "4px" }}>
            Court No. 4 • Central District Sessions Court • Tis Hazari Courts, Delhi
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="gold" size="sm" onClick={() => exportRoznamaCsv(roznama)}>
            ↓ Export Official Roznama (CSV)
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <div
          className={`admin-tab ${activeTab === "roznama" ? "active" : ""}`}
          onClick={() => setActiveTab("roznama")}
        >
          Daily Roznama Register (Order Sheet)
        </div>
        <div
          className={`admin-tab ${activeTab === "audit" ? "active" : ""}`}
          onClick={() => setActiveTab("audit")}
        >
          Stenography & Evidence Audit Log
        </div>
        <div
          className={`admin-tab ${activeTab === "integration" ? "active" : ""}`}
          onClick={() => setActiveTab("integration")}
        >
          Backend & Data Layer Wiring Status
        </div>
      </div>

      {/* Tab 1: Roznama Register */}
      {activeTab === "roznama" && (
        <div className="roznama-table-container">
          <table className="roznama-table">
            <thead>
              <tr>
                <th style={{ width: "60px" }}>Item</th>
                <th style={{ width: "220px" }}>Case Registration</th>
                <th style={{ width: "180px" }}>Parties</th>
                <th style={{ width: "160px" }}>Stage of Hearing</th>
                <th>Daily Court Proceedings & Order Summary</th>
                <th style={{ width: "160px" }}>Next Date</th>
              </tr>
            </thead>
            <tbody>
              {roznama.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--c-gold)" }}>
                    #{row.itemNo}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: "var(--c-text-primary)" }}>{row.caseNo}</div>
                    <div style={{ fontSize: "11px", color: "var(--c-text-muted)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
                      Central District
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{row.petitioner}</div>
                    <div style={{ fontSize: "11px", color: "var(--c-text-muted)" }}>vs. {row.respondent}</div>
                  </td>
                  <td>
                    <Badge variant="scheduled">{row.stage}</Badge>
                  </td>
                  <td style={{ color: "var(--c-text-primary)", lineHeight: 1.6 }}>
                    {row.proceedings}
                  </td>
                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        backgroundColor: "var(--c-surface-elevated)",
                        border: "1px solid var(--c-border)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        color: row.nextDate === "Disposed Of" ? "#6ee7b7" : "var(--c-text-primary)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.nextDate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Audit Trail */}
      {activeTab === "audit" && (
        <div
          style={{
            padding: "20px 24px",
            borderRadius: "8px",
            backgroundColor: "var(--c-surface)",
            border: "1px solid var(--c-border)",
          }}
        >
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--c-gold)", marginBottom: "16px" }}>
            COURT RECORD INTEGRITY LOG (SECTION 65-B EVIDENTIARY AUDIT)
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
            <div style={{ padding: "10px 14px", backgroundColor: "var(--c-surface-elevated)", borderRadius: "4px", border: "1px solid var(--c-border)" }}>
              <span style={{ color: "var(--c-text-muted)" }}>[10:30:14 IST]</span>{" "}
              <strong style={{ color: "var(--c-gold)" }}>SESSION_START</strong>: Sessions Case No. 14/2024 opened by Stenographer Gr-I (Rajeshwar Sharma).
            </div>
            <div style={{ padding: "10px 14px", backgroundColor: "var(--c-surface-elevated)", borderRadius: "4px", border: "1px solid var(--c-border)" }}>
              <span style={{ color: "var(--c-text-muted)" }}>[10:31:02 IST]</span>{" "}
              <strong style={{ color: "#93c5fd" }}>OATH_ADMINISTERED</strong>: PW-2 SI Vikram Rathore sworn on Solemn Affirmation under Indian Oaths Act.
            </div>
            <div style={{ padding: "10px 14px", backgroundColor: "var(--c-surface-elevated)", borderRadius: "4px", border: "1px solid var(--c-border)" }}>
              <span style={{ color: "var(--c-text-muted)" }}>[10:31:40 IST]</span>{" "}
              <strong style={{ color: "#fcd34d" }}>STAGE_TRANSITION</strong>: Proceeding transitioned to 'Cross-Examination'.
            </div>
            <div style={{ padding: "10px 14px", backgroundColor: "var(--c-surface-elevated)", borderRadius: "4px", border: "1px solid var(--c-border)" }}>
              <span style={{ color: "var(--c-text-muted)" }}>[10:34:02 IST]</span>{" "}
              <strong style={{ color: "var(--c-gold)" }}>EXHIBIT_TENDERED</strong>: Ex. PW-2/B admitted onto judicial record without objection.
            </div>
            <div style={{ padding: "10px 14px", backgroundColor: "var(--c-surface-elevated)", borderRadius: "4px", border: "1px solid var(--c-border)" }}>
              <span style={{ color: "var(--c-text-muted)" }}>[10:35:45 IST]</span>{" "}
              <strong style={{ color: "#6ee7b7" }}>OBJECTION_OVERRULED</strong>: Prosecution objection regarding Sec. 160 CrPC recorded and ruled upon by Court.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Data Layer Integration Guide */}
      {activeTab === "integration" && (
        <div
          style={{
            padding: "24px",
            borderRadius: "8px",
            backgroundColor: "var(--c-surface)",
            border: "1px solid var(--c-border)",
          }}
        >
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--c-gold)", marginBottom: "8px" }}>
            HOW TO WIRE YOUR BACKEND & TRANSCRIPTION DATA LAYER
          </h3>
          <p style={{ fontSize: "13px", color: "var(--c-text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
            The frontend has been decoupled and prepared with a dedicated integration bridge at{" "}
            <code style={{ color: "var(--c-gold)", fontFamily: "var(--font-mono)" }}>src/services/courtDataBridge.js</code>.
            Your backend or transcription service can simply push pre-attributed entries into this bridge:
          </p>

          <pre
            style={{
              padding: "16px",
              borderRadius: "6px",
              backgroundColor: "var(--c-bg)",
              border: "1px solid var(--c-border)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--c-text-primary)",
              lineHeight: 1.6,
              overflowX: "auto",
            }}
          >{`// Example: Connecting your WebSocket or transcription stream in courtDataBridge.js
import { courtDataBridge } from "./services/courtDataBridge";

const socket = new WebSocket("wss://your-backend.local/court/live-stream");

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // data = {
  //   id: "tr-" + Date.now(),
  //   timestamp: "10:32:05 AM",
  //   speaker: "court" | "app" | "defence" | "witness",
  //   speakerLabel: "HON'BLE COURT" | "LD. ADDL. PUBLIC PROSECUTOR",
  //   type: "regular" | "depo" | "exhibit",
  //   text: "Matter called out...",
  //   question: "At what time did you arrive?", // for depo type
  //   answer: "At 21:15 hours..."               // for depo type
  // }
  courtDataBridge.emitTranscriptEntry(data);
};`}</pre>
        </div>
      )}
    </div>
  );
}
