/* ==========================================================================
   LexRecord — Court Data Bridge (Integration Layer)
   
   This module provides the clean API contract between your transcription &
   speaker-attribution data layer and the LexRecord React UI.
   
   HOW TO WIRE TO YOUR ACTUAL BACKEND:
   -----------------------------------
   1. Real-time Audio & Transcription:
      Replace `subscribeToTranscriptStream` with your WebSocket or SSE connection.
      When your data layer attributes a speaker and emits text or Q&A, call `onEntryReceived(entry)`.
      
   2. Docket / Cause List:
      Replace `fetchDailyCauseList` with your REST endpoint (e.g., `GET /api/court/causelist?date=...`).
      
   3. Archive & Precedents:
      Replace `searchPrecedentArchive` with your database / vector search endpoint.
   ========================================================================== */

import {
  MOCK_CAUSELIST,
  MOCK_TRANSCRIPT,
  MOCK_ARCHIVE,
  MOCK_ROZNAMA,
  MOCK_WITNESSES,
} from "../data/mock";

class CourtDataBridge {
  constructor() {
    this.transcriptListeners = [];
    this.statusListeners = [];
  }

  /**
   * Subscribe to live transcription entries from the data layer.
   * Expected entry structure from data layer:
   * {
   *   id: string,
   *   timestamp: "10:32:05 AM",
   *   speaker: "court" | "app" | "defence" | "witness",
   *   speakerLabel: "HON'BLE COURT" | "LD. ADDL. PUBLIC PROSECUTOR" | "LD. DEFENCE COUNSEL" | "WITNESS (PW-2)",
   *   type: "regular" | "depo" | "exhibit" | "section_break",
   *   text?: string,
   *   question?: string,    // for Q&A depo blocks
   *   answer?: string,      // for Q&A depo blocks
   *   witnessName?: string, // name of witness under examination
   *   exhibitNo?: string,   // e.g. "Ex. PW-2/B"
   *   marker?: string       // endorsement remarks
   * }
   */
  subscribeToTranscriptStream(callback) {
    this.transcriptListeners.push(callback);
    return () => {
      this.transcriptListeners = this.transcriptListeners.filter((cb) => cb !== callback);
    };
  }

  /**
   * Dispatches a newly transcribed chunk to all active UI subscribers.
   * Can be called directly by your WebSocket onmessage handler.
   */
  emitTranscriptEntry(entry) {
    this.transcriptListeners.forEach((callback) => callback(entry));
  }

  /**
   * Fetch daily court docket (Cause List)
   */
  async fetchDailyCauseList(date, courtNo = "Court No. 4") {
    /* TODO: replace with: return fetch(`/api/court/causelist?court=${courtNo}&date=${date}`).then(r => r.json()); */
    return Promise.resolve(MOCK_CAUSELIST);
  }

  /**
   * Fetch judicial precedent and deposition archive
   */
  async searchPrecedentArchive(query = "", category = "ALL") {
    /* TODO: replace with: return fetch(`/api/court/archive?q=${encodeURIComponent(query)}`).then(r => r.json()); */
    return Promise.resolve(MOCK_ARCHIVE);
  }

  /**
   * Fetch daily Roznama (Daily Diary / Order Sheet)
   */
  async fetchDailyRoznama(date) {
    /* TODO: replace with: return fetch(`/api/court/roznama?date=${date}`).then(r => r.json()); */
    return Promise.resolve(MOCK_ROZNAMA);
  }

  /**
   * Push an exhibit marked by court into the case record
   */
  async registerExhibit(caseId, exhibitData) {
    /* TODO: replace with: return fetch(`/api/court/cases/${caseId}/exhibits`, { method: 'POST', body: JSON.stringify(exhibitData) }); */
    return Promise.resolve({ success: true, exhibitId: `ex-${Date.now()}` });
  }

  /**
   * Toggle or command the audio recording hardware
   */
  async setAudioCaptureState(isCapturing, caseId) {
    /* TODO: replace with: return fetch(`/api/court/audio/toggle`, { method: 'POST', body: JSON.stringify({ isCapturing, caseId }) }); */
    return Promise.resolve({ success: true, capturing: isCapturing });
  }
}

export const courtDataBridge = new CourtDataBridge();
