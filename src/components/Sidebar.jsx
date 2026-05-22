import React from "react";
import "./Sidebar.css";

const Sidebar = ({ setPage = () => {}, currentPage = 'dashboard', onTabChange, menuItems, userProfile }) => {
  const defaultMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
      )
    },
    {
      id: 'opportunities',
      label: 'Opportunities',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
      )
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      )
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
      )
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      )
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      )
    }
  ];

  const items = menuItems || defaultMenuItems;

  const defaultProfile = {
    name: "Priya Sharma",
    role: "Volunteer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&crop=faces&auto=format&q=80"
  };

  const profile = userProfile || defaultProfile;

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <aside className="sidebar">
      {/* Brand logo link */}
      <div className="sidebar-brand-section" onClick={() => setPage('home')}>
        <div className="sidebar-logo-icon">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 24L14.5 10L20 18L23.5 13L27 24H6Z" fill="url(#sidebar-logo-grad)" stroke="url(#sidebar-logo-grad)" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M11 24L16 16L19 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
            <defs>
              <linearGradient id="sidebar-logo-grad" x1="6" y1="10" x2="27" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00aaff" />
                <stop offset="1" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="sidebar-brand-text">Volcano</span>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {items.map((item) => (
            <li
              key={item.id}
              className={`sidebar-menu-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => {
                if (item.id === 'opportunities') {
                  setPage('opportunities');
                } else if (onTabChange) {
                  onTabChange(item.id);
                } else {
                  setPage(item.id);
                }
              }}
            >
              <span className="menu-item-icon">{item.icon}</span>
              <span className="menu-item-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* User profile section at the bottom */}
      <div className="sidebar-user-profile">
        <div className="user-avatar-wrapper">
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} className="user-avatar-img" loading="lazy" />
          ) : (
            <div className="ngo-logo-fallback">{profile.fallbackText || getInitials(profile.name) || "PS"}</div>
          )}
          <div className="avatar-status-badge"></div>
        </div>
        <div className="user-info">
          <span className="user-name">{profile.name}</span>
          <span className="user-role">{profile.role}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

