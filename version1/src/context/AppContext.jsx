import React, { createContext, useState, useContext } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('login'); // 'login' | 'causelist' | 'workspace' | 'archive' | 'admin'
  const [currentUser, setCurrentUser] = useState(null);
  const [activeCase, setActiveCase] = useState(null);
  const [activeMode, setActiveMode] = useState('live'); // 'live' | 'archive'
  
  // Accessibility & UX State
  const [fontSize, setFontSize] = useState('md'); // 'sm' | 'md' | 'lg'
  const [highContrast, setHighContrast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, duration = 3000) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, duration);
  };
  
  // Playback state
  const [playbackState, setPlaybackState] = useState('stopped'); // 'playing', 'paused', 'stopped'
  const [playbackProgress, setPlaybackProgress] = useState(0);

  const [isRecording, setIsRecording] = useState(false);
  const [activeStage, setActiveStage] = useState('Cross-Examination');
  
  // Workspace specific states
  const [exhibitCount, setExhibitCount] = useState(3);
  const [exhibitList, setExhibitList] = useState(['PW-1/A', 'PW-1/B', 'PW-2/A']);
  const [witnessList] = useState([
    { name: 'Ramesh Yadav, Sub-Inspector', meta: 'PW-3 · Prosecution Witness' },
    { name: 'Dr. Sunita Pathak, CMO', meta: 'PW-4 · Expert Medical Witness' },
    { name: 'Anil Kumar Mishra, Shopkeeper', meta: 'DW-1 · Defence Witness' }
  ]);
  const [activeWitnessIndex, setActiveWitnessIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(842);
  const [currentNotes, setCurrentNotes] = useState('Witness admits to arriving at spot at 23:45 hrs. Defence focusing on discrepancy in GD entry No. 42.');

  // Login handler
  const login = async (email, password) => {
    try {
      const user = await api.login(email, password);
      setCurrentUser(user);
      if (user.role === 'Presiding Officer') {
        setCurrentView('admin');
      } else {
        setCurrentView('causelist');
      }
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setActiveCase(null);
    setPlaybackState('stopped');
  };

  const selectCase = (caseObj, mode = 'live') => {
    setActiveCase(caseObj);
    setActiveMode(mode);
    setPlaybackState('stopped');
    setPlaybackProgress(0);
    setCurrentView('workspace');
  };

  return (
    <AppContext.Provider value={{
      currentView, setCurrentView,
      currentUser, login, logout,
      activeCase, selectCase,
      activeMode, setActiveMode,
      fontSize, setFontSize,
      highContrast, setHighContrast,
      toastMessage, showToast,
      playbackState, setPlaybackState,
      playbackProgress, setPlaybackProgress,
      isRecording, setIsRecording,
      activeStage, setActiveStage,
      exhibitCount, setExhibitCount,
      exhibitList, setExhibitList,
      witnessList, activeWitnessIndex, setActiveWitnessIndex,
      elapsedSeconds, setElapsedSeconds,
      currentNotes, setCurrentNotes
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
