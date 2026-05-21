import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './VolunteerProfile.css';

const VolunteerProfile = ({ setPage = () => {}, theme, toggleTheme }) => {
    // Volunteer high-fidelity default details
    const volunteer = {
        name: "Priya Sharma",
        title: "Verified Community Champion",
        since: "Member since October 2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&fit=crop&crop=faces&auto=format&q=80",
        bio: "Passionate volunteer dedicated to environmental conservation and educational empowerment. Always excited to meet like-minded change makers!",
        location: "Mumbai, India",
        stats: {
            hours: 184,
            campaigns: 12,
            rating: 4.9,
            attendance: 100
        },
        skills: ["Reforestation", "Content Design", "Event Planning", "Teaching", "HTML/CSS", "Public Speaking"],
        causes: [
            { name: "Environment", icon: "🌱" },
            { name: "Education", icon: "📚" },
            { name: "Healthcare", icon: "🏥" },
            { name: "Disaster Relief", icon: "🛡️" }
        ],
        timeline: [
            {
                id: 1,
                date: "Feb 14, 2026",
                title: "Code for Kids Workshop",
                org: "CodeForKids",
                role: "Web Mentor",
                hours: "2.5 hrs",
                description: "Mentored 15 children from underserved backgrounds on standard HTML/CSS structure and web creation."
            },
            {
                id: 2,
                date: "Feb 12, 2026",
                title: "Coastal Cleanup Drive",
                org: "OceanGuard",
                role: "Cleanup Volunteer",
                hours: "3 hrs",
                description: "Participated in beach cleaning drive gathering plastics and segregated waste materials for safe recycling."
            },
            {
                id: 3,
                date: "Feb 4, 2026",
                title: "Sanjay Gandhi Park Reforestation",
                org: "Green Earth Initiative",
                role: "Plantation Volunteer",
                hours: "4 hrs",
                description: "Planted native saplings to contribute to forest density inside Mumbai's green cover reserve."
            },
            {
                id: 4,
                date: "Jan 31, 2026",
                title: "Winter Meal Program Setup",
                org: "Hope Kitchen",
                role: "Food Distributor",
                hours: "6 hrs",
                description: "Aided local community centers with lunch preparation and logistic coordination of hot meal containers."
            }
        ]
    };

    return (
        <div className="app-container">
            <Header setPage={setPage} currentPage="volunteerProfile" theme={theme} toggleTheme={toggleTheme} />
            
            <main className="main-content volunteer-profile-page" style={{ display: 'block', width: '100%' }}>
                {/* Header Banner */}
                <div className="profile-banner">
                    <div className="profile-banner-overlay"></div>
                </div>

                <div className="profile-wrapper">
                    {/* Back Navigation Bar */}
                    <div className="profile-back-bar">
                        <button className="btn-back-nav" onClick={() => setPage("dashboard")}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            <span>Back to Volunteer Dashboard</span>
                        </button>
                    </div>

                    <div className="profile-grid">
                        {/* LEFT COLUMN: Summary Card */}
                        <div className="profile-left-col">
                            <div className="profile-main-card">
                                <div className="profile-photo-container">
                                    <img src={volunteer.avatar} alt={volunteer.name} className="volunteer-avatar-large" />
                                    <span className="verify-badge-dot" title="Verified Volunteer">✓</span>
                                </div>

                                <h2 className="volunteer-name-large">{volunteer.name}</h2>
                                <p className="volunteer-tagline">{volunteer.title}</p>
                                
                                <div className="volunteer-location-row">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span>{volunteer.location}</span>
                                </div>
                                
                                <span className="member-since-badge">{volunteer.since}</span>

                                <div className="profile-divider"></div>

                                <div className="contact-actions-stack">
                                    <a href={`mailto:${volunteer.name.toLowerCase().replace(' ', '.')}@example.com`} className="btn-contact-volunteer email">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                        <span>Send Email Message</span>
                                    </a>
                                    <button className="btn-contact-volunteer share" onClick={() => alert("Simulation: Copy profile link to clipboard")}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                            <polyline points="16 6 12 2 8 6" />
                                            <line x1="12" y1="2" x2="12" y2="15" />
                                        </svg>
                                        <span>Share Profile</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Details & History */}
                        <div className="profile-right-col">
                            {/* Bio Block */}
                            <section className="profile-section-card">
                                <h3 className="section-title">About Priya</h3>
                                <p className="volunteer-bio-text">{volunteer.bio}</p>
                            </section>

                            {/* Impact Stats Grid */}
                            <div className="profile-stats-dashboard">
                                <div className="stat-square-card">
                                    <span className="stat-icon-wrap hour">🕒</span>
                                    <div className="stat-content">
                                        <span className="stat-num-val">{volunteer.stats.hours}</span>
                                        <span className="stat-desc-lbl">Hours Contributed</span>
                                    </div>
                                </div>

                                <div className="stat-square-card">
                                    <span className="stat-icon-wrap project">🚀</span>
                                    <div className="stat-content">
                                        <span className="stat-num-val">{volunteer.stats.campaigns}</span>
                                        <span className="stat-desc-lbl">Projects Completed</span>
                                    </div>
                                </div>

                                <div className="stat-square-card">
                                    <span className="stat-icon-wrap rating">⭐</span>
                                    <div className="stat-content">
                                        <span className="stat-num-val">{volunteer.stats.rating}</span>
                                        <span className="stat-desc-lbl">Rating Score</span>
                                    </div>
                                </div>

                                <div className="stat-square-card">
                                    <span className="stat-icon-wrap attend">⚡</span>
                                    <div className="stat-content">
                                        <span className="stat-num-val">{volunteer.stats.attendance}%</span>
                                        <span className="stat-desc-lbl">Attendance Rate</span>
                                    </div>
                                </div>
                            </div>

                            {/* Skills Section */}
                            <section className="profile-section-card">
                                <h3 className="section-title">Expertise & Skills</h3>
                                <div className="volunteer-skills-box">
                                    {volunteer.skills.map((skill, index) => (
                                        <span key={index} className="v-skill-pill">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* Causes Section */}
                            <section className="profile-section-card">
                                <h3 className="section-title">Causes Supported</h3>
                                <div className="volunteer-causes-grid">
                                    {volunteer.causes.map((cause, index) => (
                                        <div key={index} className="v-cause-card">
                                            <span className="cause-icon-symbol">{cause.icon}</span>
                                            <span className="cause-name-lbl">{cause.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Impact Timeline */}
                            <section className="profile-section-card timeline-card">
                                <h3 className="section-title">Volunteering History</h3>
                                <div className="timeline-track">
                                    {volunteer.timeline.map((event) => (
                                        <div key={event.id} className="timeline-item">
                                            <div className="timeline-dot-wrapper">
                                                <div className="timeline-dot-inner"></div>
                                            </div>
                                            <div className="timeline-event-content">
                                                <div className="event-meta-top">
                                                    <span className="event-date-stamp">{event.date}</span>
                                                    <span className="event-hours-badge">{event.hours} logged</span>
                                                </div>
                                                <h4 className="event-title-h4">{event.title}</h4>
                                                <div className="event-sub-info">
                                                    <strong>{event.org}</strong> • <span>{event.role}</span>
                                                </div>
                                                <p className="event-desc-paragraph">{event.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Footer setPage={setPage} />
        </div>
    );
};

export default VolunteerProfile;
