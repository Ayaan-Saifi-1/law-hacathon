/* ==========================================================================
   LexRecord — Export Utilities
   TXT Deposition Transcript & CSV Roznama Daily Docket
   ========================================================================== */

export function exportDepositionTxt(caseData, entries, exhibits = []) {
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  let content = `================================================================================
IN THE COURT OF ${caseData.judge?.toUpperCase() || "SH. A. K. GARG, LD. ASJ"}
${caseData.courtRoom?.toUpperCase() || "COURT NO. 4"}, TIS HAZARI COURTS, CENTRAL DISTRICT, DELHI
================================================================================

Case / Registration No. : ${caseData.caseNo}
CNR Number              : ${caseData.cnr}
Offense / Sections      : ${caseData.sections}
Date of Proceedings     : ${dateStr}
Stage of Proceedings    : ${caseData.stage}

PETITIONER / PROSECUTION:
${caseData.petitioner}
Represented by: ${caseData.advocateP}

VERSUS

RESPONDENT / ACCUSED:
${caseData.respondent}
Represented by: ${caseData.advocateR}

--------------------------------------------------------------------------------
OFFICIAL TRANSCRIPTION RECORD (COURT STENOGRAPHY PROTOCOL)
--------------------------------------------------------------------------------
`;

  entries.forEach((entry, idx) => {
    if (entry.type === "section_break") {
      content += `\n[--- ${entry.stage?.toUpperCase() || "STAGE BREAK"} ---]\n\n`;
    } else if (entry.type === "exhibit") {
      content += `\n>>> COURT EXHIBIT MARKED: ${entry.exhibitNo} <<<\n`;
      content += `Document / Item: ${entry.title}\n`;
      content += `Remarks: ${entry.marker}\n\n`;
    } else if (entry.type === "depo") {
      content += `[${entry.timestamp}] ${entry.speakerLabel || "EXAMINING COUNSEL"}:\n`;
      content += `Q. ${entry.question}\n`;
      content += `Ans. ${entry.answer}\n\n`;
    } else {
      content += `[${entry.timestamp}] ${entry.speakerLabel}:\n`;
      content += `${entry.text}\n\n`;
    }
  });

  content += `--------------------------------------------------------------------------------
END OF DAILY PROCEEDING
RO. & A.C. (Read Over & Accepted Correct)

Certified to be true and correct transcription dictated in open court.


(Stenographer Gr-I)                         (Peshkar / Reader)
Court No. 4, Tis Hazari                     Court No. 4, Tis Hazari


                                            (Presiding Officer / ASJ)
                                            Tis Hazari Courts, Delhi
================================================================================
Generated via LexRecord Automated Judicial Transcription System
/* TODO: wire to data layer for certified cryptographic hash stamping */
`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${caseData.caseNo.replace(/[^a-zA-Z0-9]/g, "_")}_Transcript_${dateStr.replace(/\//g, "-")}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportRoznamaCsv(roznamaData) {
  const headers = ["Item No.", "Case No.", "Petitioner", "Respondent", "Stage", "Daily Proceedings", "Next Date of Hearing"];
  const rows = roznamaData.map((row) => [
    `"${row.itemNo || ""}"`,
    `"${(row.caseNo || "").replace(/"/g, '""')}"`,
    `"${(row.petitioner || "").replace(/"/g, '""')}"`,
    `"${(row.respondent || "").replace(/"/g, '""')}"`,
    `"${(row.stage || "").replace(/"/g, '""')}"`,
    `"${(row.proceedings || "").replace(/"/g, '""')}"`,
    `"${(row.nextDate || "").replace(/"/g, '""')}"`,
  ]);

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Roznama_Court4_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
