import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppContext } from '../context/AppContext';
import { api } from '../services/api';
import '../styles/theme.css';

export const Causelist = () => {
  const { selectCase, currentUser, showToast } = useAppContext();
  const [causelist, setCauselist] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewCase, setViewCase] = useState(null);
  const [newCase, setNewCase] = useState({
    caseNo: '', type: 'Criminal', partiesPrimary: '', sections: '',
    stage: 'Summons/Notices', counselP: '', counselD: '',
    status: 'Pending', judge: currentUser?.court?.split('·')[0].trim() || 'Judge',
    policeStation: '', firNo: '', isExamStage: false,
    badgeClass: 'badge-criminal', statusBadge: 'badge-pending'
  });

  const canAddCase = currentUser?.role === 'Ahlmad / Bench Clerk' || currentUser?.role === 'Presiding Officer';
  const isStenographer = currentUser?.role === 'Court Stenographer (PA)';

  // Phase 2 State
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [activeFilter, setActiveFilter] = useState('All');
  const [focusedRowIndex, setFocusedRowIndex] = useState(-1);

  useEffect(() => {
    loadCauselist();
  }, []);

  const loadCauselist = async () => {
    setLoading(true);
    try {
      const data = await api.fetchCauselist();
      setCauselist(data);
    } catch (err) {
      showToast(err.message || 'Failed to fetch causelist', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getBadgeStyle = (badgeClass) => {
    switch(badgeClass) {
      case 'badge-criminal': return { backgroundColor: 'var(--danger-bg)', color: 'var(--danger)' };
      case 'badge-civil': return { backgroundColor: 'var(--success-bg)', color: 'var(--success)' };
      case 'badge-writ': return { backgroundColor: 'var(--writ-bg)', color: 'var(--accent)' };
      case 'badge-active': return { backgroundColor: 'var(--live-bg)', color: 'var(--live)' };
      case 'badge-pending': return { backgroundColor: 'var(--misc-bg)', color: 'var(--text-secondary)' };
      case 'badge-adjourned': return { backgroundColor: 'var(--danger-bg)', color: 'var(--danger)' };
      default: return { backgroundColor: 'var(--misc-bg)', color: 'var(--text-secondary)' };
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const caseTypeToBadge = {
      'Criminal': 'badge-criminal',
      'Civil': 'badge-civil',
      'Writ': 'badge-writ'
    };
    const submitCase = {
      ...newCase,
      badgeClass: caseTypeToBadge[newCase.type] || 'badge-civil',
      isExamStage: ['Examination-in-Chief', 'Cross-Examination'].includes(newCase.stage)
    };
    
    try {
      await api.addCase(submitCase);
      setShowAddModal(false);
      showToast('New case registered successfully');
      loadCauselist();
    } catch (err) {
      showToast(err.message || 'Failed to add case', 'error');
    }
  };

  const filteredCauselist = causelist.filter(item => {
    if (activeFilter === 'All') return true;
    return item.type === activeFilter;
  });

  const sortedCauselist = React.useMemo(() => {
    let sortableItems = [...filteredCauselist];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredCauselist, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if modals are open
      if (showAddModal || viewCase) {
        if (e.key === 'Escape') setShowAddModal(false);
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedRowIndex(prev => (prev < sortedCauselist.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedRowIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter' && focusedRowIndex >= 0) {
        e.preventDefault();
        const selectedItem = sortedCauselist[focusedRowIndex];
        if (isStenographer || selectedItem.isExamStage) {
          selectCase(selectedItem);
        } else {
          setViewCase(selectedItem);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sortedCauselist, focusedRowIndex, isStenographer, selectCase, showAddModal, viewCase]);

  if (loading) return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <div className="skeleton-box" style={{ width: '300px', height: '40px', marginBottom: '12px' }}></div>
        <div className="skeleton-box" style={{ width: '200px', height: '20px' }}></div>
      </div>
      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--bg-border)', borderRadius: '4px', padding: '24px' }}>
        <div className="skeleton-box" style={{ width: '100%', height: '40px', marginBottom: '16px' }}></div>
        <div className="skeleton-box" style={{ width: '100%', height: '80px', marginBottom: '16px' }}></div>
        <div className="skeleton-box" style={{ width: '100%', height: '80px', marginBottom: '16px' }}></div>
        <div className="skeleton-box" style={{ width: '100%', height: '80px' }}></div>
      </div>
    </div>
  );

  return (
    <div className="page-causelist fade-up" style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Header */}
      <div className="causelist-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', borderBottom: '2px solid var(--text-primary)', paddingBottom: '24px' }}>
        <div className="causelist-title-group">
          <h1 className="legal-text" style={{ fontSize: '2.5rem', marginBottom: '12px', color: 'var(--text-primary)', fontWeight: 500, letterSpacing: '-0.5px' }}>Daily Cause List</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <p className="mono-text" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>{currentUser.court} · {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div style={{ width: '1px', height: '14px', backgroundColor: 'var(--bg-border)' }}></div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'Criminal', 'Civil', 'Writ'].map(f => (
                <button key={f} onClick={() => { setActiveFilter(f); setFocusedRowIndex(-1); }} style={{ padding: '4px 12px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', borderRadius: '4px', border: '1px solid', borderColor: activeFilter === f ? 'var(--accent)' : 'var(--bg-border)', backgroundColor: activeFilter === f ? 'rgba(30, 58, 138, 0.1)' : 'transparent', color: activeFilter === f ? 'var(--accent)' : 'var(--text-secondary)' }}>{f}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          {canAddCase && (
            <button 
              onClick={() => setShowAddModal(true)}
              style={{ padding: '10px 20px', border: '1px solid var(--accent)', backgroundColor: 'var(--accent)', color: '#ffffff', borderRadius: '0', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', transition: 'background 0.2s' }}
            >
              [+] List New Matter
            </button>
          )}
          <button onClick={loadCauselist} style={{ padding: '10px 20px', border: '1px solid var(--text-tertiary)', backgroundColor: 'transparent', color: 'var(--text-primary)', borderRadius: '0', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Refresh Docket
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--bg-border)', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-void)', borderBottom: '1px solid var(--bg-border)', fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-ui)' }}>
              <th style={{ padding: '16px 24px', width: '60px', cursor: 'pointer' }} onClick={() => requestSort('sr')}>Sr. {sortConfig.key === 'sr' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '16px 24px', cursor: 'pointer' }} onClick={() => requestSort('caseNo')}>Case Particulars {sortConfig.key === 'caseNo' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '16px 24px', cursor: 'pointer' }} onClick={() => requestSort('partiesPrimary')}>Parties &amp; Sections {sortConfig.key === 'partiesPrimary' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '16px 24px', cursor: 'pointer' }} onClick={() => requestSort('stage')}>Stage {sortConfig.key === 'stage' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '16px 24px' }}>Counsels</th>
              <th style={{ padding: '16px 24px', cursor: 'pointer' }} onClick={() => requestSort('status')}>Status {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '16px 24px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedCauselist.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '16px', opacity: 0.5 }}>📂</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>No Cases Found</div>
                  <div style={{ fontSize: '0.9rem' }}>No cases match the current filter criteria.</div>
                </td>
              </tr>
            ) : (
              sortedCauselist.map((item, idx) => {
              const isFocused = focusedRowIndex === idx;
              return (
                <tr 
                  key={item.id} 
                  style={{ 
                    borderBottom: '1px solid var(--bg-border)', 
                    transition: 'background-color 0.2s',
                    backgroundColor: isFocused ? 'var(--accent-glow)' : 'transparent',
                    boxShadow: isFocused ? 'inset 2px 0 0 var(--accent)' : 'none'
                  }}
                  onMouseOver={() => setFocusedRowIndex(idx)}
                  onMouseOut={() => setFocusedRowIndex(-1)}
                >
                  <td style={{ padding: '24px', color: 'var(--text-tertiary)', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>{item.sr}</td>
                  <td style={{ padding: '24px' }}>
                    <div style={{ fontWeight: 600, fontFamily: 'var(--font-ui)', color: 'var(--text-primary)', marginBottom: '8px' }}>{item.caseNo}</div>
                    <span style={{ padding: '4px 8px', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', ...getBadgeStyle(item.badgeClass) }}>{item.type}</span>
                  </td>
                  <td style={{ padding: '24px' }}>
                    <div className="legal-text" style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.4 }}>{item.partiesPrimary}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{item.sections}</div>
                  </td>
                  <td style={{ padding: '24px', color: item.isExamStage ? 'var(--accent)' : 'var(--text-secondary)', fontWeight: item.isExamStage ? 600 : 400, fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }}>{item.stage}</td>
                  <td style={{ padding: '24px', fontSize: '0.85rem', fontFamily: 'var(--font-ui)' }}>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '6px' }}><span style={{ color: 'var(--text-tertiary)' }}>P:</span> {item.counselP}</div>
                    <div style={{ color: 'var(--text-secondary)' }}><span style={{ color: 'var(--text-tertiary)' }}>D:</span> {item.counselD}</div>
                  </td>
                  <td style={{ padding: '24px' }}>
                    <span style={{ padding: '4px 8px', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', ...getBadgeStyle(item.statusBadge) }}>{item.status}</span>
                  </td>
                  <td style={{ padding: '24px', textAlign: 'right' }}>
                    {isStenographer || item.isExamStage ? (
                      <button onClick={() => selectCase(item)} style={{ padding: '8px 16px', backgroundColor: 'var(--bg-void)', border: '1px solid var(--bg-border)', color: 'var(--accent)', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer' }}>
                        Enter Workspace
                      </button>
                    ) : (
                      <button onClick={() => selectCase(item, 'archive')} style={{ padding: '8px 16px', backgroundColor: 'transparent', border: '1px solid var(--bg-border)', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer' }}>
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
            )}
          </tbody>
        </table>
      </div>

  {/* Add Case Modal - Formal Typography without Icons */}
  {showAddModal && createPortal(
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
      <div className="fade-up" style={{ width: '600px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--bg-border)', boxShadow: 'var(--shadow-lg)' }}>
        
        <div style={{ borderBottom: '1px solid var(--bg-border)', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-void)' }}>
          <h2 className="legal-text" style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>List New Matter</h2>
          <button aria-label="Close Modal" onClick={() => setShowAddModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', color: 'var(--text-tertiary)', cursor: 'pointer' }}>✕</button>
        </div>
        
        <form onSubmit={handleAddSubmit} style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Case Number</label>
              <input type="text" required value={newCase.caseNo} onChange={e => setNewCase({...newCase, caseNo: e.target.value})} placeholder="e.g. Sessions Case No. X/2026" style={{ width: '100%', padding: '12px', border: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Case Type</label>
              <select value={newCase.type} onChange={e => setNewCase({...newCase, type: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }}>
                <option value="Criminal">Criminal</option>
                <option value="Civil">Civil</option>
                <option value="Writ">Writ</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Title / Parties</label>
            <input type="text" required value={newCase.partiesPrimary} onChange={e => setNewCase({...newCase, partiesPrimary: e.target.value})} placeholder="e.g. State of U.P. v. Name" className="legal-text" style={{ width: '100%', padding: '12px', border: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)', fontSize: '1.1rem' }} />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Sections / FIR Details</label>
            <input type="text" value={newCase.sections} onChange={e => setNewCase({...newCase, sections: e.target.value})} placeholder="e.g. U/S 302 IPC" className="mono-text" style={{ width: '100%', padding: '12px', border: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Prosecution / Plaint Counsel</label>
              <input type="text" value={newCase.counselP} onChange={e => setNewCase({...newCase, counselP: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Defence / Resp. Counsel</label>
              <input type="text" value={newCase.counselD} onChange={e => setNewCase({...newCase, counselD: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }} />
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', borderTop: '1px solid var(--bg-border)', paddingTop: '24px' }}>
            <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '12px 24px', backgroundColor: 'transparent', border: '1px solid var(--text-tertiary)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ padding: '12px 24px', backgroundColor: 'var(--accent)', border: '1px solid var(--accent)', color: '#ffffff', fontFamily: 'var(--font-ui)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>Register Matter</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )}


    </div>
  );
};
