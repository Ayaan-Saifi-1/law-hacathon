import React from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles/theme.css';

export const Topbar = () => {
  const { currentUser, currentView, setCurrentView, isRecording, logout } = useAppContext();
  
  if (!currentUser) return null;
  const isRegistrar = currentUser.role === 'Presiding Officer';

  return (
    <header className="topbar" style={{ display: 'flex', alignItems: 'center', padding: '0 24px', height: '60px', backgroundColor: 'var(--bg-elevated)', borderBottom: '1px solid var(--bg-border)', boxShadow: 'var(--shadow-sm)', position: 'sticky', top: 0, zIndex: 10 }}>
      <div className="topbar-logo-group" onClick={() => setCurrentView('causelist')} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <span className="topbar-logo" style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--accent)' }}>LexRecord</span>
        <div className="topbar-divider" style={{ width: '1px', height: '20px', backgroundColor: 'var(--bg-border)', margin: '0 16px' }}></div>
        <span className="topbar-court-name" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{currentUser.court}</span>
      </div>

      <div className="topbar-spacer" style={{ flex: 1 }}></div>

      {isRecording && (
        <div id="topbar-live-badge" className="topbar-live-badge visible" style={{ display: 'flex', alignItems: 'center', padding: '4px 12px', backgroundColor: 'var(--live-bg)', color: 'var(--live)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, marginRight: '24px' }}>
          <span className="topbar-pulse-dot" style={{ width: '8px', height: '8px', backgroundColor: 'var(--live)', borderRadius: '50%', marginRight: '8px', animation: 'pulseLive 2s infinite' }}></span>
          RECORDING PROCEEDINGS
        </div>
      )}

      <div className="topbar-date" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginRight: '24px' }}>
        23.09.2026
      </div>

      <div className="topbar-user-pill" style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', marginRight: '24px' }}>
        <span style={{ fontWeight: 500 }}>{currentUser.name}</span>
        <span className="topbar-user-role" style={{ color: 'var(--text-tertiary)', marginLeft: '4px' }}>· {currentUser.role}</span>
      </div>

      <nav className="topbar-nav" style={{ display: 'flex', gap: '16px' }}>
        <button 
          className="btn-ghost" 
          onClick={() => setCurrentView('causelist')} 
          style={{ padding: '6px 12px', background: 'transparent', border: currentView === 'causelist' ? '1px solid var(--accent)' : '1px solid transparent', color: currentView === 'causelist' ? 'var(--accent)' : 'var(--text-secondary)', fontFamily: 'var(--font-ui)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem', cursor: 'pointer' }}
        >Cause List</button>
        <button 
          className="btn-ghost" 
          onClick={() => setCurrentView('archive')} 
          style={{ padding: '6px 12px', background: 'transparent', border: currentView === 'archive' ? '1px solid var(--accent)' : '1px solid transparent', color: currentView === 'archive' ? 'var(--accent)' : 'var(--text-secondary)', fontFamily: 'var(--font-ui)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem', cursor: 'pointer' }}
        >Precedents</button>
        {isRegistrar && (
          <button 
            className="btn-ghost" 
            onClick={() => setCurrentView('admin')} 
            style={{ padding: '6px 12px', background: 'transparent', border: currentView === 'admin' ? '1px solid var(--accent)' : '1px solid transparent', color: currentView === 'admin' ? 'var(--accent)' : 'var(--text-secondary)', fontFamily: 'var(--font-ui)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem', cursor: 'pointer' }}
          >Administration</button>
        )}
        <button 
          className="btn-ghost" 
          onClick={logout} 
          style={{ padding: '6px 12px', background: 'transparent', border: '1px solid var(--bg-border)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem', cursor: 'pointer' }}
        >Sign Out</button>
      </nav>
    </header>
  );
};
