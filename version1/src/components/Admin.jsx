import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { api } from '../services/api';
import { useAppContext } from '../context/AppContext';
import '../styles/theme.css';

export const Admin = () => {
  const { showToast } = useAppContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await api.fetchUsers();
        setUsers(data);
      } catch (err) {
        showToast(err.message || 'Failed to load users', 'error');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [showToast]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (editUser && e.key === 'Escape') setEditUser(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editUser]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    const updatedUsers = users.map(u => u.id === editUser.id ? editUser : u);
    setUsers(updatedUsers);
    setEditUser(null);
  };

  if (loading) return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <div className="skeleton-box" style={{ width: '400px', height: '40px', marginBottom: '12px' }}></div>
        <div className="skeleton-box" style={{ width: '300px', height: '20px' }}></div>
      </div>
      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--bg-border)', borderRadius: '8px', padding: '24px' }}>
        {[1,2,3,4,5].map(n => (
          <div key={n} style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
            <div className="skeleton-box" style={{ flex: 1, height: '20px' }}></div>
            <div className="skeleton-box" style={{ flex: 1, height: '20px' }}></div>
            <div className="skeleton-box" style={{ flex: 0.5, height: '20px' }}></div>
            <div className="skeleton-box" style={{ flex: 0.5, height: '20px' }}></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="page-admin fade-up" style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div className="admin-header" style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Court Administration &amp; Access Control</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage judicial officers, stenographers, and clerks across the district.</p>
      </div>

      <div className="table-container" style={{ backgroundColor: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--bg-border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-void)', borderBottom: '1px solid var(--bg-border)', fontSize: '0.85rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <th style={{ padding: '16px' }}>Name</th>
              <th style={{ padding: '16px' }}>Email</th>
              <th style={{ padding: '16px' }}>Role</th>
              <th style={{ padding: '16px' }}>Assigned Court</th>
              <th style={{ padding: '16px' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--bg-border)' }}>
                <td style={{ padding: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{user.email}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'var(--misc-bg)', color: 'var(--text-secondary)' }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{user.court}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'var(--success-bg)', color: 'var(--success)' }}>
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <button onClick={() => setEditUser(user)} style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Edit User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {editUser && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
          <div className="fade-up" style={{ width: '500px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--bg-border)', boxShadow: 'var(--shadow-lg)' }}>
            
            <div style={{ borderBottom: '1px solid var(--bg-border)', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-void)' }}>
              <h2 className="legal-text" style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-primary)' }}>Edit User Privileges</h2>
              <button aria-label="Close Modal" onClick={() => setEditUser(null)} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', color: 'var(--text-tertiary)', cursor: 'pointer' }}>✕</button>
            </div>
            
            <form onSubmit={handleEditSubmit} style={{ padding: '24px' }}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>User Name</label>
                <input type="text" required value={editUser.name} onChange={e => setEditUser({...editUser, name: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }} />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Role</label>
                <select value={editUser.role} onChange={e => setEditUser({...editUser, role: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }}>
                  <option value="Court Stenographer (PA)">Court Stenographer (PA)</option>
                  <option value="Ahlmad / Bench Clerk">Ahlmad / Bench Clerk</option>
                  <option value="Presiding Officer">Presiding Officer</option>
                  <option value="Public Prosecutor">Public Prosecutor</option>
                </select>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Status</label>
                <select value={editUser.status} onChange={e => setEditUser({...editUser, status: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }}>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Transferred">Transferred</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', borderTop: '1px solid var(--bg-border)', paddingTop: '24px' }}>
                <button type="button" onClick={() => setEditUser(null)} style={{ padding: '10px 20px', backgroundColor: 'transparent', border: '1px solid var(--text-tertiary)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'var(--accent)', border: '1px solid var(--accent)', color: '#ffffff', fontFamily: 'var(--font-ui)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
