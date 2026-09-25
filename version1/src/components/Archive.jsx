import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAppContext } from '../context/AppContext';
import '../styles/theme.css';

export const Archive = () => {
  const { selectCase, showToast } = useAppContext();
  const [archive, setArchive] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArchive('');
  }, []);

  const loadArchive = async (query) => {
    setLoading(true);
    try {
      const data = await api.fetchArchive(query);
      setArchive(data);
    } catch (err) {
      showToast(err.message || 'Failed to fetch precedents', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    loadArchive(val);
  };

  const getBadgeStyle = (badgeClass) => {
    switch(badgeClass) {
      case 'badge-criminal': return { backgroundColor: 'var(--danger-bg)', color: 'var(--danger)' };
      case 'badge-civil': return { backgroundColor: 'var(--success-bg)', color: 'var(--success)' };
      case 'badge-writ': return { backgroundColor: 'var(--writ-bg)', color: 'var(--accent)' };
      default: return { backgroundColor: 'var(--misc-bg)', color: 'var(--text-secondary)' };
    }
  };

  return (
    <div className="page-archive fade-up" style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div className="archive-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Judicial Precedent Archive</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Search historic judgments, depositions, and rulings across districts.</p>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Search by case number, party, section, or keyword..." 
            value={searchQuery}
            onChange={handleSearch}
            style={{ width: '400px', padding: '10px 16px', borderRadius: '4px', border: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-surface)', fontFamily: 'var(--font-ui)' }}
          />
        </div>
      </div>

      {loading ? (
        <div className="archive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
          {[1,2,3,4,5,6].map(n => (
            <div key={n} style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--bg-border)', borderRadius: '4px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div className="skeleton-box" style={{ width: '80px', height: '16px' }}></div>
                <div className="skeleton-box" style={{ width: '60px', height: '16px' }}></div>
              </div>
              <div className="skeleton-box" style={{ width: '100%', height: '24px', marginBottom: '12px' }}></div>
              <div className="skeleton-box" style={{ width: '60%', height: '16px', marginBottom: '24px' }}></div>
              <div className="skeleton-box" style={{ width: '100%', height: '60px', marginBottom: '16px' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="skeleton-box" style={{ width: '100px', height: '12px' }}></div>
                <div className="skeleton-box" style={{ width: '80px', height: '12px' }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : archive.length === 0 ? (
        <div style={{ padding: '64px', textAlign: 'center', backgroundColor: 'var(--bg-surface)', border: '1px dashed var(--bg-border)', borderRadius: '4px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.5 }}>📚</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>No Precedents Found</div>
          <div style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>No historical records match your search criteria.</div>
        </div>
      ) : (
        <div className="archive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
          {archive.map(item => (
            <div key={item.id} className="archive-card" onClick={() => selectCase(item, 'archive')} style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--bg-border)', borderRadius: '4px', padding: '24px', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="mono-text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.caseNo}</span>
                <span style={{ padding: '4px 8px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', ...getBadgeStyle(item.badgeClass) }}>{item.type}</span>
              </div>
              <h3 className="legal-text" style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{item.title}</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>{item.parties}</div>
              
              <div style={{ padding: '12px', backgroundColor: 'var(--bg-void)', borderLeft: '3px solid var(--accent)', marginBottom: '16px', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                "{item.excerpt}"
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <span>{item.judge}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
