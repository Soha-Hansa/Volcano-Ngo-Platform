import { useState, useEffect, lazy, Suspense } from 'react';
import Home from './pages/Home';
import ChatWidget from './components/ChatWidget';
import DirectMessageWidget from './components/DirectMessageWidget';
import './App.css';

// Lazy load secondary/interior pages to optimize initial bundle load time
const OppoPage = lazy(() => import('./pages/OppoPage'));
const DashboardUser = lazy(() => import('./pages/DashboardUser'));
const DashboardNgo = lazy(() => import('./pages/DashboardNgo'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const VolunteerProfile = lazy(() => import('./pages/VolunteerProfile'));
const NgoProfile = lazy(() => import('./pages/NgoProfile'));

// Premium, glassmorphic fallback loader
const PageLoader = () => (
  <div className="page-loader-container">
    <div className="page-loader-inner">
      <div className="page-loader-glow"></div>
      <div className="page-loader-spinner"></div>
      <p className="page-loader-text">Loading Volcano...</p>
    </div>
  </div>
);

function App() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [activeDm, setActiveDm] = useState(null);

  const [ngoData, setNgoData] = useState({
    name: "Green Earth Initiative",
    email: "contact@greenearth.org",
    phone: "+91 22 2845 9900",
    website: "https://greenearth.org",
    category: "Climate & Environment",
    address: "SGNP Office, Borivali East, Mumbai, Maharashtra 400066",
    mission: "To restore native forest cover, protect coastal ecosystems, and raise environmental awareness through active community-led volunteering campaigns.",
    team: [
      { name: "Dr. Amit Patel", role: "Executive Director" },
      { name: "Sarah Jenkins", role: "Head of Operations" }
    ]
  });

  // Verify token on mount/change
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    fetch('http://localhost:5000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Session invalid');
        return res.json();
      })
      .then(data => {
        setUser(data.user);
      })
      .catch(err => {
        console.error("Token verification failed:", err);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      });
  }, [token]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const loginUser = (userToken, userData) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setPage('home');
  };

  return (
    <>
      {page === 'home' && (
        <div className="page-transition">
          <Home setPage={setPage} theme={theme} toggleTheme={toggleTheme} />
        </div>
      )}
      
      <Suspense fallback={<PageLoader />}>
        {page === 'opportunities' && (
          <div className="page-transition">
            <OppoPage 
              setPage={setPage} 
              theme={theme} 
              toggleTheme={toggleTheme} 
              onStartChat={(target) => setActiveDm(target)}
            />
          </div>
        )}
        {page === 'dashboard' && (
          <div className="page-transition">
            <DashboardUser 
              setPage={setPage} 
              theme={theme} 
              toggleTheme={toggleTheme} 
              user={user} 
              logoutUser={logoutUser} 
            />
          </div>
        )}
        {page === 'dashboardNgo' && (
          <div className="page-transition">
            <DashboardNgo 
              setPage={setPage} 
              ngoData={user && user.role === 'ngo' ? user : ngoData} 
              setNgoData={setNgoData} 
              theme={theme}
              toggleTheme={toggleTheme}
              logoutUser={logoutUser}
            />
          </div>
        )}
        {page === 'login' && (
          <div className="page-transition">
            <LoginPage 
              setPage={setPage} 
              theme={theme} 
              toggleTheme={toggleTheme} 
              loginUser={loginUser} 
            />
          </div>
        )}
        {page === 'signup' && (
          <div className="page-transition">
            <SignupPage 
              setPage={setPage} 
              theme={theme} 
              toggleTheme={toggleTheme} 
              loginUser={loginUser} 
            />
          </div>
        )}
        {page === 'volunteerProfile' && (
          <div className="page-transition">
            <VolunteerProfile 
              setPage={setPage} 
              theme={theme} 
              toggleTheme={toggleTheme} 
              onStartChat={(target) => setActiveDm(target)}
            />
          </div>
        )}
        {page === 'ngoProfile' && (
          <div className="page-transition">
            <NgoProfile 
              setPage={setPage} 
              ngoData={user && user.role === 'ngo' ? user : ngoData} 
              theme={theme}
              toggleTheme={toggleTheme}
            />
          </div>
        )}
      </Suspense>

      {/* Global Interactive Chat Widget */}
      <ChatWidget />

      {/* Direct Message Chat Widget */}
      <DirectMessageWidget activeDm={activeDm} onClose={() => setActiveDm(null)} />
    </>
  );
}

export default App;
