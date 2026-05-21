import { useState } from 'react';
import './Header.css';

export default function Header({ setPage = () => {}, currentPage = 'home', theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e, targetPage) => {
    e.preventDefault();
    setPage(targetPage);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <a
          href="/"
          className="logo-section"
          id="nav-logo"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <div className="logo-icon-wrapper">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="logo-icon"
            >
              {/* Volcano Peaks SVG */}
              <path
                d="M6 24L14.5 10L20 18L23.5 13L27 24H6Z"
                fill="url(#logo-grad)"
                stroke="url(#logo-grad)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M11 24L16 16L19 21"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="logo-grad" x1="6" y1="10" x2="27" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0066cc" />
                  <stop offset="1" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">Volcano</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li>
              <a
                href="#"
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'home')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`nav-link ${currentPage === 'opportunities' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'opportunities')}
              >
                Opportunities
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'dashboard')}
              >
                Volunteers
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`nav-link ${currentPage === 'dashboardNgo' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'dashboardNgo')}
              >
                For NGOs
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop Call to Actions */}
        <div className="auth-buttons">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            id="theme-toggle-desktop"
          >
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
          <a
            href="#"
            className="login-link"
            onClick={(e) => {
              e.preventDefault();
              setPage('login');
            }}
          >
            Log in
          </a>
          <a
            href="#"
            className="signup-btn"
            onClick={(e) => {
              e.preventDefault();
              setPage('signup');
            }}
          >
            Sign up
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          id="mobile-nav-toggle"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'show' : ''}`}>
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            <li>
              <a
                href="#"
                className={`mobile-nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'home')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`mobile-nav-link ${currentPage === 'opportunities' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'opportunities')}
              >
                Opportunities
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`mobile-nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'dashboard')}
              >
                Volunteers
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`mobile-nav-link ${currentPage === 'dashboardNgo' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'dashboardNgo')}
              >
                For NGOs
              </a>
            </li>
            <li className="mobile-divider"></li>
            <li>
              <a
                href="#"
                className="mobile-nav-link text-center"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(e, 'login');
                }}
              >
                Log in
              </a>
            </li>
            <li>
              <a
                href="#"
                className="mobile-signup-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(e, 'signup');
                }}
              >
                Sign up
              </a>
            </li>
            <li className="mobile-divider"></li>
            <li className="mobile-theme-toggle-container">
              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                id="theme-toggle-mobile"
              >
                {theme === 'dark' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
