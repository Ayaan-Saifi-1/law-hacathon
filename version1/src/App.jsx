import React from 'react';
import { useAppContext } from './context/AppContext';
import { Login } from './components/Login';
import { Topbar } from './components/Topbar';
import { Causelist } from './components/Causelist';
import { Workspace } from './components/Workspace/Workspace';
import { Archive } from './components/Archive';
import { Admin } from './components/Admin';
import { Toast } from './components/Toast';
import './styles/theme.css';

function App() {
  const { currentUser, currentView, setCurrentView, fontSize, highContrast } = useAppContext();

  React.useEffect(() => {
    if (!currentUser && currentView !== 'login') {
      setCurrentView('login');
    }
  }, [currentUser, currentView, setCurrentView]);

  if (currentView === 'login') {
    return (
      <div className={`theme-wrapper font-${fontSize} ${highContrast ? 'high-contrast' : ''}`}>
        <Login />
        <Toast />
      </div>
    );
  }

  return (
    <div className={`theme-wrapper font-${fontSize} ${highContrast ? 'high-contrast' : ''}`}>
      <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Topbar />
        <main id="main-view-container" style={{ flex: 1, overflowY: 'auto' }}>
          {currentView === 'causelist' && <Causelist />}
          {currentView === 'workspace' && <Workspace />}
          {currentView === 'archive' && <Archive />}
          {currentView === 'admin' && <Admin />}
        </main>
        <Toast />
      </div>
    </div>
  );
}

export default App;
