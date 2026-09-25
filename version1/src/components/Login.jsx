import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles/theme.css'; // Global theme

export const Login = () => {
  const { login } = useAppContext();
  const [email, setEmail] = useState('steno@court.in');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (!result.success) {
      setError('Invalid court credentials. Please check your credentials.');
    } else {
      setError('');
    }
  };

  const fillDemoLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="view-login" style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-surface)' }}>
      <div className="login-left" style={{ flex: 1, backgroundColor: 'var(--accent)', color: 'white', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
        
        {/* Background Image of Dr. B.R. Ambedkar line art */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url(/ambedkar.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none' }}></div>
        
        {/* Subtle radial gradient overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at top left, rgba(255,255,255,0.05) 0%, transparent 60%)', pointerEvents: 'none' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="login-left-sublabel" style={{ letterSpacing: '3px', fontSize: '0.75rem', opacity: 0.9, textTransform: 'uppercase', fontWeight: 600 }}>MINISTRY OF LAW &amp; JUSTICE · GOVERNMENT OF INDIA</div>
          <div className="login-divider-thin" style={{ width: '40px', height: '2px', backgroundColor: 'var(--accent-dim)', margin: '24px 0' }}></div>
          <div className="login-quote legal-text" style={{ fontSize: '2.5rem', lineHeight: 1.2, margin: '32px 0', fontWeight: 500, letterSpacing: '-0.5px' }}>
            The record of a court<br/>
            is the memory<br/>
            of justice.
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, marginTop: 'auto' }}>
          <div className="login-gold-bar" style={{ width: '60px', height: '4px', backgroundColor: '#c8a96e', margin: '24px 0' }}></div>
          <div className="login-left-caption" style={{ opacity: 0.8, fontSize: '0.9rem', lineHeight: 1.5, maxWidth: '400px' }}>
            <strong>LexRecord</strong> — The definitive AI-powered platform designed to completely replace the physical stenographer in Indian Courts with real-time digital transcription.
          </div>
        </div>
      </div>
      <div className="login-right" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="login-form-box fade-up" style={{ width: '100%', maxWidth: '400px', padding: '40px', backgroundColor: 'var(--bg-elevated)', borderRadius: '8px', boxShadow: 'var(--shadow-lg)' }}>
          <h1 className="login-title" style={{ fontSize: '2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Sign In</h1>
          <p className="login-subtitle" style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Access your court docket and stenography workspace</p>

          <form id="login-form" className="login-fields" onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label className="field-label" htmlFor="login-email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Official Court Email</label>
              <input type="email" id="login-email" className="field-input" placeholder="e.g. steno@court.in" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid var(--bg-border)', borderRadius: '4px', backgroundColor: 'var(--bg-void)' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label className="field-label" htmlFor="login-password" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Security Credentials</label>
              <input type="password" id="login-password" className="field-input" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid var(--bg-border)', borderRadius: '4px', backgroundColor: 'var(--bg-void)' }} />
              {error && <div id="login-error" className="field-error" style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '8px' }}>{error}</div>}
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px', padding: '12px', backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, transition: 'background-color 0.2s' }}>
              Access Workspace →
            </button>
          </form>

          <div className="login-demo-box" style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--bg-border)' }}>
            <div className="login-demo-title" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '12px', textTransform: 'uppercase' }}>Demo Court Personnel Accounts</div>
            
            <div className="login-demo-item" onClick={() => fillDemoLogin('steno@court.in', 'demo123')} style={{ padding: '12px', border: '1px solid var(--bg-border)', borderRadius: '0', marginBottom: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-void)' }}>
              <span className="login-demo-cred" style={{ fontWeight: 600, fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>steno@court.in / demo123</span>
              <span className="login-demo-role" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>Court Stenographer (PA)</span>
            </div>
            <div className="login-demo-item" onClick={() => fillDemoLogin('reader@court.in', 'demo123')} style={{ padding: '12px', border: '1px solid var(--bg-border)', borderRadius: '0', marginBottom: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-void)' }}>
              <span className="login-demo-cred" style={{ fontWeight: 600, fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>reader@court.in / demo123</span>
              <span className="login-demo-role" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>Ahlmad / Bench Clerk</span>
            </div>
            <div className="login-demo-item" onClick={() => fillDemoLogin('admin@court.in', 'admin123')} style={{ padding: '12px', border: '1px solid var(--bg-border)', borderRadius: '0', marginBottom: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-void)' }}>
              <span className="login-demo-cred" style={{ fontWeight: 600, fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>admin@court.in / admin123</span>
              <span className="login-demo-role" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>Presiding Officer (Judge)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
