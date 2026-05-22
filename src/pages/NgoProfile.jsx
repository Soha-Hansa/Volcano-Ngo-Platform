import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./NgoProfile.css";

const NgoProfile = ({ setPage = () => {}, ngoData, theme, toggleTheme }) => {
  // Safe fallback if ngoData is not passed
  const data = ngoData || {
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
  };

  // Extract initials for the logo fallback
  const initials = data.name
    ? data.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "GE";

  // Static campaign data for showcase (can also filter from a global pool if needed, but since we are showing public profile of this NGO, we render their specific campaigns)
  const activeCampaigns = [
    {
      id: 1,
      title: "Reforest 2026",
      category: "Environment",
      description: "Help us plant 1,000 native tree saplings to restore the forest canopy and stop soil erosion in the SGNP region.",
      volunteersCount: 42,
      maxVolunteers: 50,
      deadline: "28 Feb",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      title: "Coastal Cleanup Drive",
      category: "Ocean Conservation",
      description: "Join our weekend drive to remove plastic waste, microplastics and debris from our local beaches to save marine life.",
      volunteersCount: 18,
      maxVolunteers: 25,
      deadline: "12 Mar",
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="ngo-profile-page-wrapper">
      <Header setPage={setPage} currentPage="ngoProfile" theme={theme} toggleTheme={toggleTheme} />
      
      {/* Dynamic Cover Banner */}
      <section className="ngo-profile-banner">
        <div className="banner-overlay"></div>
        <div className="banner-wave-decoration">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" fill="var(--bg-primary)" />
          </svg>
        </div>
      </section>

      {/* Main Profile Grid */}
      <main className="ngo-profile-main">
        <div className="ngo-profile-grid">
          
          {/* Left Sidebar Info Card */}
          <aside className="ngo-sidebar-card">
            <div className="ngo-logo-holder">
              <div className="ngo-logo-badge">{initials}</div>
            </div>
            
            <div className="ngo-essential-info">
              <h1 className="ngo-name-title">{data.name}</h1>
              <span className="badge-verified">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Verified NGO
              </span>
              <p className="ngo-category-text">{data.category}</p>
            </div>

            <div className="ngo-action-links">
              {data.website && (
                <a href={data.website} target="_blank" rel="noopener noreferrer" className="btn-sidebar-action btn-visit-web">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span>Visit Website</span>
                </a>
              )}
              <a href={`mailto:${data.email}`} className="btn-sidebar-action btn-send-email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Contact NGO</span>
              </a>
            </div>

            <div className="ngo-contact-details">
              <div className="contact-item">
                <span className="contact-label">Location</span>
                <span className="contact-value">{data.address}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Phone</span>
                <span className="contact-value">{data.phone || "Not specified"}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <span className="contact-value">{data.email}</span>
              </div>
            </div>

            {/* Back to Dashboard CTA */}
            <div className="back-to-dashboard-wrapper">
              <button className="btn-back-to-dashboard" onClick={() => setPage("dashboardNgo")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>Back to NGO Dashboard</span>
              </button>
            </div>
          </aside>

          {/* Right Main Panel Content */}
          <div className="ngo-profile-details-panel">
            
            {/* Impact Metrics Stats Row */}
            <section className="impact-stats-card">
              <h2 className="section-card-title">Our Collective Impact</h2>
              <div className="stats-box-grid">
                <div className="stat-box-item">
                  <span className="stat-number">102</span>
                  <span className="stat-label">Active Volunteers</span>
                </div>
                <div className="stat-box-item">
                  <span className="stat-number">910+</span>
                  <span className="stat-label">Volunteer Hours</span>
                </div>
                <div className="stat-box-item">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Campaigns Run</span>
                </div>
                <div className="stat-box-item">
                  <span className="stat-number">2020</span>
                  <span className="stat-label">Year Established</span>
                </div>
              </div>
            </section>

            {/* Mission Statement Block */}
            <section className="profile-details-card mission-section">
              <h2 className="section-card-title">Mission & Purpose</h2>
              <div className="mission-content-quote">
                <span className="quote-mark open-quote">“</span>
                <p className="mission-body-text">{data.mission}</p>
                <span className="quote-mark close-quote">”</span>
              </div>
            </section>

            {/* Active Campaigns List */}
            <section className="profile-details-card campaigns-section">
              <h2 className="section-card-title">Active Campaigns</h2>
              <div className="public-campaigns-grid">
                {activeCampaigns.map((camp) => {
                  const progressPct = Math.round((camp.volunteersCount / camp.maxVolunteers) * 100);
                  return (
                    <div key={camp.id} className="public-campaign-card">
                      <div className="campaign-card-media">
                        <img src={camp.image} alt={camp.title} className="campaign-img" loading="lazy" />
                        <span className="campaign-badge">{camp.category}</span>
                      </div>
                      <div className="campaign-card-body">
                        <h3 className="campaign-title-h3">{camp.title}</h3>
                        <p className="campaign-desc-p">{camp.description}</p>
                        
                        <div className="campaign-progress-bar-container">
                          <div className="progress-labels">
                            <span className="progress-value">{camp.volunteersCount} / {camp.maxVolunteers} Spots Filled</span>
                            <span className="progress-pct">{progressPct}%</span>
                          </div>
                          <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${progressPct}%` }}></div>
                          </div>
                        </div>

                        <div className="campaign-card-footer">
                          <span className="campaign-deadline-tag">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            Deadline: {camp.deadline}
                          </span>
                          <button className="btn-apply-campaign" onClick={() => setPage("opportunities")}>
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Team Members List */}
            <section className="profile-details-card team-section">
              <h2 className="section-card-title">Key Team & Management</h2>
              <div className="public-team-grid">
                {data.team && data.team.length > 0 ? (
                  data.team.map((member, index) => (
                    <div key={index} className="public-team-card-item">
                      <div className="member-avatar-fallback">
                        {member.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                      </div>
                      <div className="member-details">
                        <h4 className="member-name-h4">{member.name}</h4>
                        <span className="member-role-span">{member.role}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-team-text">No team members specified yet.</p>
                )}
              </div>
            </section>

            {/* Location Map Row */}
            <section className="profile-details-card map-section">
              <h2 className="section-card-title">Headquarters Location</h2>
              <div className="map-placeholder-card">
                <div className="map-details-overlay">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="map-office-title">{data.name} Main HQ</span>
                  <p className="map-address-p">{data.address}</p>
                </div>
              </div>
            </section>

          </div>

        </div>
      </main>

      <Footer setPage={setPage} />
    </div>
  );
};

export default NgoProfile;
