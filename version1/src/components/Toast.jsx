import React from 'react';
import { useAppContext } from '../context/AppContext';

export const Toast = () => {
  const { toastMessage } = useAppContext();

  if (!toastMessage) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      backgroundColor: 'var(--success-bg)',
      color: 'var(--success)',
      border: '1px solid var(--success)',
      padding: '16px 24px',
      borderRadius: '4px',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 9999,
      fontFamily: 'var(--font-ui)',
      fontSize: '0.9rem',
      fontWeight: 600,
      animation: 'toastFadeIn 0.3s ease-out'
    }}>
      <span style={{ fontSize: '1.2rem' }}>✓</span>
      {toastMessage}
    </div>
  );
};
