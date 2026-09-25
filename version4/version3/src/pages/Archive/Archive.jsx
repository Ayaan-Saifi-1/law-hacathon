import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ArchiveCard } from "./ArchiveCard";
import { ArchiveDetailPane } from "./ArchiveDetailPane";
import { Button } from "../../components/ui/Button";
import "./Archive.css";

export function Archive() {
  const { archive, selectedArchiveId, setSelectedArchive } = useApp();
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("ALL");

  const filteredArchive = archive.filter((rec) => {
    const matchesSearch =
      rec.caseNo.toLowerCase().includes(search.toLowerCase()) ||
      rec.title.toLowerCase().includes(search.toLowerCase()) ||
      rec.sections.toLowerCase().includes(search.toLowerCase()) ||
      rec.cnr.toLowerCase().includes(search.toLowerCase()) ||
      rec.summary.toLowerCase().includes(search.toLowerCase());

    const matchesStage = stageFilter === "ALL" || rec.stage.includes(stageFilter);

    return matchesSearch && matchesStage;
  });

  const selectedRecord = archive.find((r) => r.id === selectedArchiveId);

  return (
    <div className="archive-page">
      {/* Left / Main Column */}
      <div className="archive-main-column">
        {/* Header */}
        <div className="archive-header">
          <div>
            <h1 className="archive-title">Precedent & Record Archive</h1>
            <div style={{ fontSize: "13px", color: "var(--c-text-3)", marginTop: "4px" }}>
              Archive of Certified Judicial Depositions, Exhibits & Dictated Orders • Tis Hazari Courts
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <span
              style={{
                padding: "6px 12px",
                borderRadius: "5px",
                backgroundColor: "var(--c-surface)",
                border: "1px solid var(--c-border)",
                fontSize: "12px",
                color: "var(--c-text-2)",
              }}
            >
              Total Records: <strong>{archive.length}</strong>
            </span>
          </div>
        </div>

        {/* Search & Filter Strip */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search archival precedents by Case No., Legal Citation, Statute Section, or Keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: "6px",
              backgroundColor: "var(--c-surface)",
              border: "1px solid var(--c-border)",
              color: "var(--c-text-1)",
              fontSize: "13px",
              outline: "none",
            }}
          />

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "6px",
              backgroundColor: "var(--c-surface)",
              border: "1px solid var(--c-border)",
              color: "var(--c-text-1)",
              fontSize: "13px",
              outline: "none",
            }}
          >
            <option value="ALL">All Trial Categories</option>
            <option value="Evidence">Evidence / Deposition</option>
            <option value="Bail">Bail Applications</option>
            <option value="Judgment">Judgments Pronounced</option>
            <option value="Charges">Framing of Charges</option>
            <option value="313">Section 313 Statements</option>
          </select>
        </div>

        {/* Archive Cards Grid */}
        <div className="archive-grid">
          {filteredArchive.length === 0 ? (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                backgroundColor: "var(--c-surface)",
                borderRadius: "8px",
                border: "1px solid var(--c-border-subtle)",
              }}
            >
              <div style={{ fontSize: "28px", color: "var(--c-text-4)", marginBottom: "8px" }}>📖</div>
              <div style={{ fontSize: "14px", color: "var(--c-text-2)" }}>
                No judicial archive records found matching your query.
              </div>
            </div>
          ) : (
            filteredArchive.map((rec) => (
              <ArchiveCard
                key={rec.id}
                record={rec}
                isSelected={rec.id === selectedArchiveId}
                onSelect={() => setSelectedArchive(rec.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Right / Inline Sliding Detail Pane */}
      {selectedRecord && (
        <ArchiveDetailPane
          record={selectedRecord}
          onClose={() => setSelectedArchive(null)}
        />
      )}
    </div>
  );
}
