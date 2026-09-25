import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAppContext } from '../../context/AppContext';
import '../../styles/theme.css';

export const Workspace = () => {
  const {
    activeCase, activeMode, setCurrentView, 
    isRecording, setIsRecording,
    activeStage, setActiveStage, exhibitCount, setExhibitCount,
    exhibitList, setExhibitList, witnessList, activeWitnessIndex,
    setActiveWitnessIndex, elapsedSeconds, setElapsedSeconds,
    currentNotes, setCurrentNotes,
    playbackState, setPlaybackState,
    playbackProgress, setPlaybackProgress,
    showToast
  } = useAppContext();

  const [transcriptEntries, setTranscriptEntries] = useState([]);
  const transcriptEndRef = useRef(null);

  // Phase 3 State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState('metadata'); // 'metadata' | 'document'
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  useEffect(() => {
    if (activeMode === 'archive' && activeCase?.transcriptEntries) {
      setTranscriptEntries(activeCase.transcriptEntries);
    } else {
      setTranscriptEntries([
        { type: 'entry', speaker: "HON'BLE COURT", time: '11:15:04', text: 'Let the judicial record reflect that Sessions Case No. 14 of 2024 is called out for hearing. Accused Ramesh Kumar @ Ramu is present from judicial custody with learned Defence Counsel Shri Mohit Srivastava. Learned Additional Public Prosecutor Shri D.K. Sharma is present for the State. Sub-Inspector Ramesh Yadav is called to the witness stand.' },
        { type: 'section-break', label: '— EXAMINATION-IN-CHIEF BY STATE (LD. APP) —' },
        { type: 'depo', examiner: 'Examined by Ld. APP Sh. D.K. Sharma', time: '11:16:22', q: 'Sub-Inspector Yadav, please state your current posting and whether you were on duty on the intervening night of 14th and 15th March 2024.', a: 'I am currently posted as Sub-Inspector at Police Station Hazratganj, Lucknow. On the night of 14th March 2024, I was on emergency duty officer roster starting from 20:00 hours to 08:00 hours the following morning.' },
        { type: 'depo', examiner: 'Examined by Ld. APP Sh. D.K. Sharma', time: '11:18:10', q: 'Did you receive any official transmission regarding an incident at Butler Palace Colony?', a: 'Yes, Sir. At approximately 23:45 hours, a telephonic PCR call flash was received at the station GD counter stating that an assault was taking place near Quarter No. 47, Butler Palace Colony. I made General Diary Entry No. 42 and immediately proceeded to the place of occurrence along with Constable Brijesh and Constable Satendra.' },
        { type: 'exhibit', label: 'Ex. PW-1/A marked — Original Station General Diary Entry No. 42 dt. 14.03.2024' }
      ]);
    }
  }, [activeCase, activeMode]);

  // Auto-scroll
  useEffect(() => {
    if (transcriptEndRef.current && playbackState !== 'playing') {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcriptEntries, isRecording]);

  // Live Recording Timer
  useEffect(() => {
    let interval;
    if (isRecording && activeMode === 'live') {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, activeMode, setElapsedSeconds]);

  // Simulated Audio Playback (Karaoke Effect)
  useEffect(() => {
    let interval;
    if (playbackState === 'playing' && activeMode === 'archive') {
      interval = setInterval(() => {
        setPlaybackProgress(prev => {
          if (prev >= transcriptEntries.length) {
            setPlaybackState('stopped');
            return prev;
          }
          return prev + 0.1; // Slow progression to simulate reading pace
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [playbackState, activeMode, transcriptEntries.length, setPlaybackState, setPlaybackProgress]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // F2: Mark Exhibit
      if (e.key === 'F2') {
        e.preventDefault();
        if (activeMode === 'live') {
          const newEx = `Ex. PW-${exhibitList.length + 1}/A`;
          setExhibitList(prev => [...prev, newEx]);
          setTranscriptEntries(prev => [...prev, { type: 'exhibit', label: `${newEx} marked — Document marked via shortcut F2` }]);
        }
      }
      // F4: Toggle Record / Toggle Play
      if (e.key === 'F4') {
        e.preventDefault();
        if (activeMode === 'live') {
          setIsRecording(prev => !prev);
        } else if (activeMode === 'archive') {
          setPlaybackState(prev => prev === 'playing' ? 'paused' : 'playing');
        }
      }
      // Ctrl+S: Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        showToast('Transcript saved securely.');
      }
      // Ctrl+F: Search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setShowSearch(true);
      }
      // Escape: Close Search or Modal
      if (e.key === 'Escape') {
        setShowSearch(false);
        setSearchQuery('');
        setShowDocumentModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMode, exhibitList.length, setIsRecording, setExhibitList, setPlaybackState, showToast]);

  const isExaminationStage = ['Examination-in-Chief', 'Cross-Examination', 'Re-Examination'].includes(activeStage);
  const currentWitness = witnessList[activeWitnessIndex] || witnessList[0];
  const c = activeCase || {};
  const isArchive = activeMode === 'archive';
  const caseDuration = isArchive ? (c.duration || '01:45:20') : '';
  const caseNotes = isArchive ? (c.excerpt || c.sections || 'No judicial remarks available for this historic record.') : currentNotes;

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const handleStageChange = (e) => {
    const newStage = e.target.value;
    setActiveStage(newStage);
    setTranscriptEntries(prev => [...prev, {
      type: 'section-break',
      label: `— ${newStage.toUpperCase()} —`
    }]);
  };

  const toggleRecording = () => setIsRecording(!isRecording);
  
  const togglePlayback = () => setPlaybackState(prev => prev === 'playing' ? 'paused' : 'playing');
  const stopPlayback = () => { setPlaybackState('stopped'); setPlaybackProgress(0); };

  // Karaoke & Search renderer
  const renderTextWithHighlight = (text, isHighlighted, isSpeaking) => {
    if (!text) return null;
    let content = text;
    if (searchQuery && showSearch) {
      const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
      content = parts.map((part, i) => 
        part.toLowerCase() === searchQuery.toLowerCase() 
          ? <span key={i} style={{ backgroundColor: 'rgba(255, 235, 59, 0.4)', color: 'var(--text-primary)', borderRadius: '2px', padding: '0 2px' }}>{part}</span> 
          : part
      );
    }
    return <span style={{ 
      color: isSpeaking ? 'var(--accent)' : 'inherit', 
      backgroundColor: isSpeaking ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
      transition: 'color 0.3s, background-color 0.3s'
    }}>{content}</span>;
  };

  return (
    <div className="workspace" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-void)' }}>
      {/* Top Action Bar */}
      <div className="action-bar" style={{ display: 'flex', alignItems: 'center', padding: '12px 24px', backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--bg-border)' }}>
        <button className="btn-ghost" onClick={() => setCurrentView(isArchive ? 'archive' : 'causelist')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500, fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>
          ← {isArchive ? 'Return to Precedents' : 'Cause List'}
        </button>
        <div className="ab-divider" style={{ width: '1px', height: '20px', backgroundColor: 'var(--bg-border)', margin: '0 16px' }}></div>
        <span className="ab-caseno" style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{c.caseNo}</span>
        <span className="ab-dot" style={{ margin: '0 8px', color: 'var(--text-tertiary)' }}>·</span>

        {/* Procedural Stage Selector */}
        <select value={activeStage} onChange={handleStageChange} disabled={isArchive} style={{ padding: '6px 12px', border: '1px solid var(--bg-border)', backgroundColor: isArchive ? 'var(--bg-void)' : 'var(--bg-surface)', color: 'var(--text-primary)', marginLeft: '8px', fontFamily: 'var(--font-ui)', opacity: isArchive ? 0.7 : 1 }}>
          <option value="Framing of Charges">Framing of Charges</option>
          <option value="Examination-in-Chief">Examination-in-Chief</option>
          <option value="Cross-Examination">Cross-Examination</option>
          <option value="Re-Examination">Re-Examination</option>
          <option value="S.313 Statement">S.313 CrPC Accused Statement</option>
          <option value="Final Arguments">Final Arguments</option>
          <option value="Bail Arguments">Bail Arguments</option>
          <option value="Judicial Order">Pronouncement of Order</option>
        </select>

        <span style={{ marginLeft: '16px', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: isArchive ? 'var(--misc-bg)' : (isExaminationStage ? 'rgba(59, 130, 246, 0.1)' : 'var(--misc-bg)'), color: isArchive ? 'var(--text-secondary)' : (isExaminationStage ? 'var(--accent)' : 'var(--text-secondary)'), border: '1px solid currentColor', fontFamily: 'var(--font-ui)' }}>
          {isArchive ? 'ARCHIVE PLAYBACK MODE' : (isExaminationStage ? 'Q/A DEPOSITION MODE' : 'NARRATIVE RECORD MODE')}
        </span>

        <div style={{ flex: 1 }}></div>

        {/* Live Connection Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '24px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)', animation: 'pulseLive 2s infinite' }}></span>
          Secure Link
        </div>

        {/* Recording / Playback Action Button */}
        {isArchive ? (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={togglePlayback} style={{ padding: '8px 16px', border: '1px solid var(--accent)', fontWeight: 600, cursor: 'pointer', backgroundColor: playbackState === 'playing' ? 'transparent' : 'var(--accent)', color: playbackState === 'playing' ? 'var(--accent)' : '#ffffff', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>
              {playbackState === 'playing' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '2px', height: '12px', alignItems: 'center' }}>
                    <span style={{ width: '3px', height: '100%', backgroundColor: 'currentColor', animation: 'pulseLive 0.8s infinite' }}></span>
                    <span style={{ width: '3px', height: '60%', backgroundColor: 'currentColor', animation: 'pulseLive 0.6s infinite 0.2s' }}></span>
                    <span style={{ width: '3px', height: '80%', backgroundColor: 'currentColor', animation: 'pulseLive 1s infinite 0.4s' }}></span>
                  </div>
                  Pause [F4]
                </div>
              ) : 'Play Audio [F4]'}
            </button>
            <button onClick={stopPlayback} disabled={playbackState === 'stopped'} style={{ padding: '8px 16px', border: '1px solid var(--text-tertiary)', fontWeight: 600, cursor: 'pointer', backgroundColor: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', opacity: playbackState === 'stopped' ? 0.5 : 1 }}>
              Stop
            </button>
          </div>
        ) : (
          <button onClick={toggleRecording} style={{ padding: '8px 16px', border: '1px solid var(--live)', fontWeight: 600, cursor: 'pointer', backgroundColor: isRecording ? 'transparent' : 'var(--live-bg)', color: isRecording ? 'var(--live)' : 'var(--live)', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>
            {isRecording ? <><span style={{ width: '8px', height: '8px', backgroundColor: 'var(--live)', animation: 'pulseLive 2s infinite' }}></span> Recording [F4]</> : 'Begin Recording [F4]'}
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Center Transcript Stage */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '40px', backgroundColor: 'var(--bg-void)', position: 'relative' }}>
          
          {/* Contextual Search Overlay */}
          {showSearch && (
            <div className="fade-in" style={{ position: 'sticky', top: '0', zIndex: 10, display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--accent)', padding: '8px 16px', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', gap: '12px' }}>
                <span style={{ fontSize: '1.2rem' }}>🔍</span>
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search transcript..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ border: 'none', outline: 'none', background: 'transparent', color: 'var(--text-primary)', width: '250px', fontFamily: 'var(--font-ui)' }}
                />
                <button onClick={() => { setShowSearch(false); setSearchQuery(''); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
              </div>
            </div>
          )}

          <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--bg-surface)', padding: '60px 80px', border: '1px solid var(--bg-border)', boxShadow: 'var(--shadow-md)', minHeight: '100%', fontFamily: 'var(--font-legal)' }}>
            {transcriptEntries.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', marginTop: '40px', fontFamily: 'var(--font-ui)' }}>
                <h3 style={{ marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{isArchive ? 'Loading Record...' : 'Court in Session — Awaiting Recording'}</h3>
                <p>{isArchive ? 'The physical audio record is being fetched.' : 'Press "Begin Recording" [F4] when examination begins.'}</p>
              </div>
            ) : (
              transcriptEntries.map((e, idx) => {
                const isSpeaking = isArchive && playbackState === 'playing' && Math.floor(playbackProgress) === idx;
                
                if (e.type === 'section-break') {
                  return <div key={idx} className="mono-text" style={{ textAlign: 'center', margin: '40px 0', color: isSpeaking ? 'var(--accent)' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>{e.label}</div>;
                }
                if (e.type === 'exhibit') {
                  return <div key={idx} className="mono-text" style={{ textAlign: 'center', margin: '20px 0', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>─── {e.label} ───</div>;
                }
                if (e.type === 'entry') {
                  return (
                    <div key={idx} style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '4px', fontWeight: 600, letterSpacing: '0.5px', fontFamily: 'var(--font-ui)' }}>
                        <span style={{ color: isSpeaking ? 'var(--accent)' : 'inherit' }}>{e.speaker}</span>
                        <span className="mono-text">{e.time}</span>
                      </div>
                      <div className="legal-text" style={{ fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                        {renderTextWithHighlight(e.text, true, isSpeaking)}
                      </div>
                    </div>
                  );
                }
                if (e.type === 'depo') {
                  return (
                    <div key={idx} style={{ marginBottom: '32px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '12px', fontWeight: 600, fontFamily: 'var(--font-ui)' }}>
                        <span style={{ color: isSpeaking ? 'var(--accent)' : 'inherit' }}>{e.examiner}</span>
                        <span className="mono-text">{e.time}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                        <span className="mono-text" style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Q.</span>
                        <span className="legal-text" style={{ fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--text-primary)', fontWeight: 500 }}>
                          {renderTextWithHighlight(e.q, true, isSpeaking)}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <span className="mono-text" style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>A.</span>
                        <span className="legal-text" style={{ fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                          {renderTextWithHighlight(e.a, true, isSpeaking)}
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              })
            )}
            {isRecording && !isArchive && (
              <div className="mono-text" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--live)', marginTop: '32px', fontSize: '0.85rem', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--live)', animation: 'pulseLive 1s infinite' }}></span> TRANSCRIBING FROM AUDIO...
              </div>
            )}
            <div ref={transcriptEndRef} />
          </div>
        </div>

        {/* Split-Pane Right Panel */}
        <div style={{ width: '380px', borderLeft: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-surface)', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', borderBottom: '1px solid var(--bg-border)' }}>
            <button onClick={() => setRightPanelTab('metadata')} style={{ flex: 1, padding: '16px 12px', border: 'none', background: rightPanelTab === 'metadata' ? 'var(--bg-surface)' : 'var(--bg-void)', borderBottom: rightPanelTab === 'metadata' ? '2px solid var(--accent)' : '2px solid transparent', color: rightPanelTab === 'metadata' ? 'var(--accent)' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.2s' }}>Metadata</button>
            <button onClick={() => setRightPanelTab('document')} style={{ flex: 1, padding: '16px 12px', border: 'none', background: rightPanelTab === 'document' ? 'var(--bg-surface)' : 'var(--bg-void)', borderBottom: rightPanelTab === 'document' ? '2px solid var(--accent)' : '2px solid transparent', color: rightPanelTab === 'document' ? 'var(--accent)' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.2s' }}>Document View</button>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {rightPanelTab === 'metadata' ? (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>CASE DETAILS</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.85rem', fontFamily: 'var(--font-ui)' }}><span style={{ color: 'var(--text-secondary)' }}>Case No.</span><span className="mono-text" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.caseNo}</span></div>
                  {!isArchive && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.85rem', fontFamily: 'var(--font-ui)' }}><span style={{ color: 'var(--text-secondary)' }}>FIR No.</span><span className="mono-text" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.firNo}</span></div>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.85rem', fontFamily: 'var(--font-ui)' }}><span style={{ color: 'var(--text-secondary)' }}>Judge</span><span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.judge}</span></div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>{isArchive ? 'RECORDING DURATION' : 'ELAPSED TIME'}</div>
                  <div className="mono-text" style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)', marginBottom: '4px' }}>{isArchive ? caseDuration : formatTime(elapsedSeconds)}</div>
                  {!isArchive && <div style={{ fontSize: '0.8rem', color: isRecording ? 'var(--live)' : 'var(--text-secondary)', fontWeight: isRecording ? 600 : 400, fontFamily: 'var(--font-ui)', textTransform: 'uppercase' }}>{isRecording ? 'Recording in progress' : 'Session paused'}</div>}
                </div>

                {!isArchive && (
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>WITNESS ON STAND</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', fontFamily: 'var(--font-ui)' }}>{currentWitness.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>{currentWitness.meta}</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ flex: 1, padding: '6px', border: '1px solid var(--text-tertiary)', background: 'transparent', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', textTransform: 'uppercase' }}>[←] Prev</button>
                      <button style={{ flex: 1, padding: '6px', border: '1px solid var(--text-tertiary)', background: 'transparent', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', textTransform: 'uppercase' }}>Next [→]</button>
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: '32px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>EXHIBITS MARKED: {exhibitList.length} {activeMode === 'live' && '[F2]'}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {exhibitList.map((e, idx) => <span key={idx} className="mono-text" style={{ padding: '4px 8px', backgroundColor: 'var(--bg-void)', border: '1px solid var(--text-primary)', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>[{e}]</span>)}
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>BENCH NOTES</div>
                  <textarea 
                    value={caseNotes} 
                    onChange={e => setCurrentNotes(e.target.value)}
                    disabled={isArchive}
                    style={{ width: '100%', height: '100px', padding: '12px', border: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)', resize: 'none', fontSize: '0.85rem', fontFamily: 'var(--font-ui)', opacity: isArchive ? 0.8 : 1 }}
                    placeholder="Adjournment reason, compliance directives, judicial notes..."
                  />
                </div>

                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--bg-border)', paddingTop: '24px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', fontFamily: 'var(--font-ui)' }}>System Shortcuts</div>
                  <div className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    <div><strong style={{color:'var(--text-primary)'}}>F2</strong> : Mark Exhibit</div>
                    <div><strong style={{color:'var(--text-primary)'}}>F4</strong> : {isArchive ? 'Play/Pause Audio' : 'Start/Stop Recording'}</div>
                    <div><strong style={{color:'var(--text-primary)'}}>Ctrl+S</strong> : Secure Save</div>
                    <div><strong style={{color:'var(--text-primary)'}}>Ctrl+F</strong> : Search Transcript</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>REFERENCE DOCUMENT</div>
                <div style={{ flex: 1, border: '1px dashed var(--text-tertiary)', backgroundColor: 'var(--bg-void)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', fontSize: '0.85rem', padding: '24px', textAlign: 'center', flexDirection: 'column', gap: '16px' }}>
                  <span style={{ fontSize: '3rem', opacity: 0.5 }}>📄</span>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Ex. PW-1/A</div>
                    <div style={{ fontSize: '0.75rem' }}>(Station General Diary Entry No. 42)</div>
                  </div>
                  <button onClick={() => setShowDocumentModal(true)} style={{ marginTop: '12px', padding: '8px 16px', border: '1px solid var(--accent)', background: 'var(--bg-surface)', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>View Full Screen / Download</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {showDocumentModal && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' }}>
          <div className="fade-up" style={{ width: '90%', height: '90%', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--bg-border)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 24px', backgroundColor: 'var(--bg-void)', borderBottom: '1px solid var(--bg-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 className="mono-text" style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Ex. PW-1/A</h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Station General Diary Entry No. 42</div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => showToast('Downloading document...')} style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '8px 16px', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer' }}>Download PDF</button>
                <button onClick={() => setShowDocumentModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', color: 'var(--text-tertiary)', cursor: 'pointer' }}>✕</button>
              </div>
            </div>
            <div style={{ flex: 1, padding: '40px', backgroundColor: '#e5e7eb', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
              {/* Dummy Document PDF Page */}
              <div style={{ width: '100%', maxWidth: '800px', backgroundColor: 'white', minHeight: '1000px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', padding: '80px', color: '#1f2937', fontFamily: 'serif' }}>
                <div style={{ textAlign: 'center', borderBottom: '2px solid #1f2937', paddingBottom: '24px', marginBottom: '40px' }}>
                  <h1 style={{ fontSize: '24px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '2px' }}>Station General Diary</h1>
                  <p style={{ fontSize: '14px', color: '#4b5563' }}>Police Station: Hazratganj, District: Lucknow</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', fontSize: '14px', fontFamily: 'monospace' }}>
                  <div><strong>GD Entry No:</strong> 42</div>
                  <div><strong>Date:</strong> 14-03-2024</div>
                  <div><strong>Time:</strong> 23:45 Hrs</div>
                </div>
                <div style={{ fontSize: '16px', lineHeight: 1.8, textAlign: 'justify' }}>
                  <p style={{ marginBottom: '20px' }}>
                    <strong>Information Received:</strong> At approximately 23:45 hours, a telephonic flash was received from the Police Control Room (PCR). The caller, identifying himself as a resident of Butler Palace Colony, reported a violent altercation near Quarter No. 47 involving multiple individuals armed with blunt objects.
                  </p>
                  <p style={{ marginBottom: '20px' }}>
                    <strong>Action Taken:</strong> Sub-Inspector Ramesh Yadav, along with Constable Brijesh (Belt No. 4092) and Constable Satendra (Belt No. 312), immediately departed for the place of occurrence in official vehicle UP32-DG-1102.
                  </p>
                  <p>
                    <strong>Officer In-Charge:</strong> SI Ramesh Yadav<br/>
                    <strong>Signature:</strong> <em>[Signed by SI Ramesh Yadav]</em>
                  </p>
                </div>
                <div style={{ marginTop: '100px', borderTop: '1px dashed #9ca3af', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
                  Exhibit Marked: Ex. PW-1/A<br/>
                  By Order of the Court
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
