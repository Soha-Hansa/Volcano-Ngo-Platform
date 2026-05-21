import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <a href="/" className="logo-section" id="nav-logo">
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
              <a href="#" className="nav-link active">Home</a>
            </li>
            <li>
              <a href="#" className="nav-link">Opportunities</a>
            </li>
            <li>
              <a href="#" className="nav-link">Volunteers</a>
            </li>
            <li>
              <a href="#" className="nav-link">For NGOs</a>
            </li>
          </ul>
        </nav>

        {/* Desktop Call to Actions */}
        <div className="auth-buttons">
          <a href="#" className="login-link">Log in</a>
          <a href="#" className="signup-btn">Sign up</a>
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
              <a href="#" className="mobile-nav-link active" onClick={() => setMobileMenuOpen(false)}>Home</a>
            </li>
            <li>
              <a href="#" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Opportunities</a>
            </li>
            <li>
              <a href="#" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Volunteers</a>
            </li>
            <li>
              <a href="#" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>For NGOs</a>
            </li>
            <li className="mobile-divider"></li>
            <li>
              <a href="#" className="mobile-nav-link text-center" onClick={() => setMobileMenuOpen(false)}>Log in</a>
            </li>
            <li>
              <a href="#" className="mobile-signup-btn" onClick={() => setMobileMenuOpen(false)}>Sign up</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
