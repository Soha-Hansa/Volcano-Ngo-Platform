import React, { useState } from "react";
import "./SignupPage.css";

const SignupPage = ({ setPage = () => {}, theme, toggleTheme }) => {
  const [role, setRole] = useState("volunteer"); // "volunteer" or "ngo"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    availability: "",
    interest: "",
    ngoCategory: "",
    ngoWebsite: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful registration and redirect to the appropriate dashboard
    if (role === "ngo") {
      setPage("dashboardNgo");
    } else {
      setPage("dashboard");
    }
  };

  return (
    <div className="signup-container">
      {/* Left side - Registration form */}
      <div className="signup-form-section">
        <button
          type="button"
          className="signup-theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          id="signup-theme-toggle"
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
        <div className="logo-header" onClick={() => setPage("home")}>
          <div className="logo-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 24L14.5 10L20 18L23.5 13L27 24H6Z" fill="url(#signup-logo-grad)" stroke="url(#signup-logo-grad)" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M11 24L16 16L19 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="signup-logo-grad" x1="6" y1="10" x2="27" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0066cc" />
                  <stop offset="1" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">Volcano</span>
        </div>

        <h1 className="signup-heading">Create your account</h1>
        <p className="signup-subtitle">
          Join 18,500+ volunteers and 1,200+ NGOs already on Volcano.
        </p>

        {/* Role Selector Toggle */}
        <div className="role-selector-toggle">
          <button
            type="button"
            className={`role-tab ${role === "volunteer" ? "active" : ""}`}
            onClick={() => setRole("volunteer")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Volunteer</span>
          </button>
          <button
            type="button"
            className={`role-tab ${role === "ngo" ? "active" : ""}`}
            onClick={() => setRole("ngo")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <line x1="9" y1="22" x2="9" y2="16"></line>
              <line x1="15" y1="22" x2="15" y2="16"></line>
              <line x1="12" y1="22" x2="12" y2="12"></line>
            </svg>
            <span>NGO</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          {role === "volunteer" ? (
            <>
              {/* Volunteer Form Fields */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullname">Full name</label>
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="skills">Skills</label>
                <input
                  id="skills"
                  type="text"
                  placeholder="React, Teaching, Graphic Design..."
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="availability">Availability</label>
                  <select
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    required
                  >
                    <option value="">Pick availability</option>
                    <option value="weekends">Weekends</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="interest">Primary interest</label>
                  <select
                    id="interest"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    required
                  >
                    <option value="">Pick a cause</option>
                    <option value="environment">Environment</option>
                    <option value="education">Education</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="disaster-relief">Disaster Relief</option>
                    <option value="animal-rescue">Animal Rescue Operation</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* NGO Form Fields */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ngoName">NGO Name</label>
                  <input
                    id="ngoName"
                    type="text"
                    placeholder="Green Earth Initiative"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ngoEmail">Contact Email</label>
                  <input
                    id="ngoEmail"
                    type="email"
                    placeholder="contact@greenearth.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ngoCategory">Cause Category</label>
                  <select
                    id="ngoCategory"
                    value={formData.ngoCategory}
                    onChange={(e) => setFormData({ ...formData, ngoCategory: e.target.value })}
                    required
                  >
                    <option value="">Select cause area</option>
                    <option value="environment">Climate & Environment</option>
                    <option value="education">Education & Literacy</option>
                    <option value="healthcare">Healthcare & Medicine</option>
                    <option value="relief">Disaster Relief</option>
                    <option value="home-management">Home Management</option>
                    <option value="animal-rescue">Animal Rescue Operation</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="ngoWebsite">Website link</label>
                  <input
                    id="ngoWebsite"
                    type="url"
                    placeholder="https://greenearth.org"
                    value={formData.ngoWebsite}
                    onChange={(e) => setFormData({ ...formData, ngoWebsite: e.target.value })}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="signup-submit-btn">
            Create account
          </button>
        </form>

        <p className="login-redirect-link">
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPage("login");
            }}
          >
            Sign in
          </a>
        </p>
      </div>

      {/* Right side - Visual block */}
      <div className="signup-side-banner">
        <div className="badge-pile">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&crop=faces&auto=format&q=80" alt="vol1" loading="lazy" />
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&crop=faces&auto=format&q=80" alt="vol2" loading="lazy" />
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&crop=faces&auto=format&q=80" alt="vol3" loading="lazy" />
          <div className="pile-text">+18k</div>
        </div>
        <blockquote>
          “We don’t just volunteer. We build relationships, sharpen skills, and fuel movements. Join us.”
        </blockquote>
        <p className="community-info">— Join 1,200+ verified NGOs and 18,500+ active volunteers</p>
      </div>
    </div>
  );
};

export default SignupPage;
