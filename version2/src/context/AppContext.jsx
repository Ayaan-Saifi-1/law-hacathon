/* ==========================================================================
   LexRecord — Application Context & State Management
   Unified store for Court Session, Docket, Live Audio & Archive
   ========================================================================== */

import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  MOCK_USERS,
  MOCK_CAUSELIST,
  MOCK_WITNESSES,
  MOCK_TRANSCRIPT,
  MOCK_ROZNAMA,
  MOCK_ARCHIVE,
} from "../data/mock";
import { courtDataBridge } from "../services/courtDataBridge";

const AppContext = createContext();

const initialState = {
  currentUser: null, // Require login initially
  currentCase: MOCK_CAUSELIST[0], // Sessions Case No. 14/2024
  causeList: MOCK_CAUSELIST,
  witnesses: MOCK_WITNESSES,
  activeWitnessIndex: 1, // PW-2 SI Vikram Rathore
  transcript: MOCK_TRANSCRIPT,
  roznama: MOCK_ROZNAMA,
  archive: MOCK_ARCHIVE,
  isRecording: true,
  currentStage: "Cross-Examination",
  benchNotes: "Witness stated DD 42-A received at 21:15 hrs. Notice u/s 100(8) admitted not served on public persons.",
  searchQuery: "",
  selectedArchiveId: "arch-01",
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, currentUser: action.payload };

    case "SET_CASE": {
      const selected = state.causeList.find((c) => c.id === action.payload) || action.payload;
      return {
        ...state,
        currentCase: selected,
        currentStage: selected.stage || state.currentStage,
      };
    }

    case "TOGGLE_RECORDING": {
      const nextState = !state.isRecording;
      courtDataBridge.setAudioCaptureState(nextState, state.currentCase?.id);
      return { ...state, isRecording: nextState };
    }

    case "SET_RECORDING":
      courtDataBridge.setAudioCaptureState(action.payload, state.currentCase?.id);
      return { ...state, isRecording: action.payload };

    case "SET_STAGE": {
      const newStage = action.payload;
      const stageBreakEntry = {
        id: `tr-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        type: "section_break",
        stage: `${newStage} Commenced`,
      };
      return {
        ...state,
        currentStage: newStage,
        transcript: [...state.transcript, stageBreakEntry],
      };
    }

    case "ADD_TRANSCRIPT_ENTRY":
      return {
        ...state,
        transcript: [...state.transcript, action.payload],
      };

    case "MARK_EXHIBIT": {
      const { exhibitNo, title, marker } = action.payload;
      const exhibitEntry = {
        id: `tr-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        type: "exhibit",
        exhibitNo: exhibitNo || `Ex. PW-${state.activeWitnessIndex + 1}/${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
        title: title || "Document admitted on record",
        marker: marker || "Admitted into evidence under Indian Evidence Act.",
      };
      if (state.currentCase?.id) {
        courtDataBridge.registerExhibit(state.currentCase.id, exhibitEntry);
      }
      return {
        ...state,
        transcript: [...state.transcript, exhibitEntry],
      };
    }

    case "ADD_CAUSELIST_CASE":
      return {
        ...state,
        causeList: [action.payload, ...state.causeList],
      };

    case "UPDATE_CASE_STATUS":
      return {
        ...state,
        causeList: state.causeList.map((c) =>
          c.id === action.payload.id ? { ...c, status: action.payload.status } : c
        ),
      };

    case "SET_WITNESS_INDEX":
      return {
        ...state,
        activeWitnessIndex: action.payload,
      };

    case "ADD_WITNESS":
      return {
        ...state,
        witnesses: [...state.witnesses, action.payload],
      };

    case "SET_BENCH_NOTES":
      return {
        ...state,
        benchNotes: action.payload,
      };

    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };

    case "SET_SELECTED_ARCHIVE":
      return {
        ...state,
        selectedArchiveId: action.payload,
      };

    case "ADD_ROZNAMA_ENTRY":
      return {
        ...state,
        roznama: [action.payload, ...state.roznama],
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Listen to entries arriving from the data layer bridge
  useEffect(() => {
    const unsubscribe = courtDataBridge.subscribeToTranscriptStream((entry) => {
      dispatch({ type: "ADD_TRANSCRIPT_ENTRY", payload: entry });
    });
    return () => unsubscribe();
  }, []);

  const value = {
    ...state,
    setUser: (user) => dispatch({ type: "SET_USER", payload: user }),
    setCase: (caseId) => dispatch({ type: "SET_CASE", payload: caseId }),
    toggleRecording: () => dispatch({ type: "TOGGLE_RECORDING" }),
    setRecording: (val) => dispatch({ type: "SET_RECORDING", payload: val }),
    setStage: (stage) => dispatch({ type: "SET_STAGE", payload: stage }),
    addTranscriptEntry: (entry) => dispatch({ type: "ADD_TRANSCRIPT_ENTRY", payload: entry }),
    markExhibit: (exhibit) => dispatch({ type: "MARK_EXHIBIT", payload: exhibit }),
    addCase: (newCase) => dispatch({ type: "ADD_CAUSELIST_CASE", payload: newCase }),
    updateCaseStatus: (id, status) => dispatch({ type: "UPDATE_CASE_STATUS", payload: { id, status } }),
    setWitnessIndex: (idx) => dispatch({ type: "SET_WITNESS_INDEX", payload: idx }),
    addWitness: (wit) => dispatch({ type: "ADD_WITNESS", payload: wit }),
    setBenchNotes: (notes) => dispatch({ type: "SET_BENCH_NOTES", payload: notes }),
    setSearchQuery: (query) => dispatch({ type: "SET_SEARCH_QUERY", payload: query }),
    setSelectedArchive: (id) => dispatch({ type: "SET_SELECTED_ARCHIVE", payload: id }),
    addRoznamaEntry: (entry) => dispatch({ type: "ADD_ROZNAMA_ENTRY", payload: entry }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
