import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import ProfileCompletion from "../components/ProfileCompletion";
import VolunteerHours from "../components/VolunteerHours";
import UpcomingEvents from "../components/UpcomingEvents";
import "./DashboardUser.css";

const DashboardUser = ({ setPage = () => { }, theme, toggleTheme, user, logoutUser }) => {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("dashboard");

    // Profile state management
    const [profileData, setProfileData] = useState({
        name: user?.name || "Priya Sharma",
        email: user?.email || "priya.sharma@example.com",
        phone: user?.phone || "+91 98765 43210",
        bio: user?.bio || "Passionate volunteer dedicated to environmental conservation and educational empowerment. Always excited to meet like-minded change makers!",
        skills: user?.skills ? (Array.isArray(user.skills) ? user.skills : user.skills.split(',').map(s => s.trim()).filter(Boolean)) : ["Reforestation", "Content Design", "Event Planning", "Teaching"],
        interests: user?.interest ? [user.interest] : ["Environment", "Education", "Healthcare", "Disaster Relief"]
    });
    const [newSkill, setNewSkill] = useState("");
    const [saveStatus, setSaveStatus] = useState("");

    // Settings state management
    const [settings, setSettings] = useState({
        emailAlerts: true,
        weeklyDigest: true,
        smsNotifications: false,
        publicProfile: true,
        showBadges: true
    });

    // Calendar state management
    const [selectedDate, setSelectedDate] = useState(14);
    const calendarMonth = "February 2026";

    const calendarEvents = {
        4: {
            title: "Sanjay Gandhi National Park Reforestation",
            time: "09:00 AM - 01:00 PM",
            location: "SGNP, Borivali, Mumbai",
            type: "Environment",
            slotsLeft: 3,
            description: "Help plant native tree saplings and restore green cover in Mumbai's forest lung.",
            buttonAction: "Get Directions",
            status: "Confirmed"
        },
        12: {
            title: "Coastal Cleanup Drive",
            time: "07:30 AM - 10:30 AM",
            location: "Juhu Beach, Mumbai",
            type: "Environment",
            slotsLeft: 12,
            description: "Join our beach cleanup crew to gather plastic waste and marine debris.",
            buttonAction: "Get Directions",
            status: "Confirmed"
        },
        14: {
            title: "Code for Kids Workshop",
            time: "02:00 PM - 04:30 PM",
            location: "Online (Zoom Video)",
            type: "Education",
            slotsLeft: 0,
            description: "Mentor children from underprivileged backgrounds on basic HTML/CSS concepts.",
            buttonAction: "Join Zoom",
            status: "Confirmed"
        },
        18: {
            title: "Winter Meal Program Setup",
            time: "11:00 AM - 02:00 PM",
            location: "Dharavi Community Center",
            type: "Social Help",
            slotsLeft: 5,
            description: "Distribute hot lunches and coordinate food logistics for local community families.",
            buttonAction: "Get Directions",
            status: "Pending Approval"
        },
        25: {
            title: "Eco Warrior Summit",
            time: "04:00 PM - 06:00 PM",
            location: "Online (Google Meet)",
            type: "Environment",
            slotsLeft: 50,
            description: "A monthly meeting of NGO representatives and active volunteer leaders to discuss green campaigns.",
            buttonAction: "Join Meet",
            status: "Confirmed"
        }
    };

    const achievementsList = [
        { id: 1, name: "Eco Warrior", desc: "Contributed 10+ hours to green campaigns", status: "Earned", icon: "🌱", color: "#10b981", progress: 100 },
        { id: 2, name: "Community Catalyst", desc: "Completed 50+ total volunteer hours", status: "Earned", icon: "🤝", color: "#3b82f6", progress: 100 },
        { id: 3, name: "Crisis Responder", desc: "Assisted in emergency outreach programs", status: "Earned", icon: "🛡️", color: "#ef4444", progress: 100 },
        { id: 4, name: "Tech for Good", desc: "Mentor code/design workshops for 50 hours", status: "In Progress", icon: "💻", color: "#8b5cf6", progress: 80, current: 40, target: 50 },
        { id: 5, name: "Winter Hero", desc: "Participated in winter meal/blanket drives", status: "Earned", icon: "❄️", color: "#06b6d4", progress: 100 },
        { id: 6, name: "Youth Mentor", desc: "Conduct 15 tutorial sessions for kids", status: "Locked", icon: "📚", color: "#f59e0b", progress: 20, current: 3, target: 15 },
        { id: 7, name: "Ocean Savior", desc: "Clean up beaches for 5 separate drives", status: "Locked", icon: "🌊", color: "#2563eb", progress: 60, current: 3, target: 5 }
    ];

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || "Priya Sharma",
                email: user.email || "priya.sharma@example.com",
                phone: user.phone || "+91 98765 43210",
                bio: user.bio || "Passionate volunteer dedicated to environmental conservation and educational empowerment. Always excited to meet like-minded change makers!",
                skills: user.skills ? (Array.isArray(user.skills) ? user.skills : user.skills.split(',').map(s => s.trim()).filter(Boolean)) : ["Reforestation", "Content Design", "Event Planning", "Teaching"],
                interests: user.interest ? [user.interest] : ["Environment", "Education", "Healthcare", "Disaster Relief"]
            });
        }
    }, [user]);

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setSaveStatus("Saving changes...");
        setTimeout(() => {
            setSaveStatus("Profile updated successfully!");
            setTimeout(() => setSaveStatus(""), 3000);
        }, 1000);
    };

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
            setProfileData({
                ...profileData,
                skills: [...profileData.skills, newSkill.trim()]
            });
            setNewSkill("");
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setProfileData({
            ...profileData,
            skills: profileData.skills.filter(s => s !== skillToRemove)
        });
    };

    const handleToggleInterest = (interest) => {
        if (profileData.interests.includes(interest)) {
            setProfileData({
                ...profileData,
                interests: profileData.interests.filter(i => i !== interest)
            });
        } else {
            setProfileData({
                ...profileData,
                interests: [...profileData.interests, interest]
            });
        }
    };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="spinner-wrapper">
                    <div className="spinner"></div>
                    <div className="spinner-glow"></div>
                </div>
                <p className="loader-text">Waking up Volcano core...</p>
            </div>
        );
    }

    // Grid rendering logic for February 2026 (Starts on Sunday, 28 days)
    const renderCalendarGrid = () => {
        const totalDays = 28;
        const days = [];
        for (let i = 1; i <= totalDays; i++) {
            const hasEvent = calendarEvents.hasOwnProperty(i);
            days.push(
                <div
                    key={i}
                    className={`calendar-day-cell ${selectedDate === i ? "selected" : ""} ${hasEvent ? "has-event" : ""}`}
                    onClick={() => setSelectedDate(i)}
                >
                    <span className="day-number">{i}</span>
                    {hasEvent && <span className="event-dot"></span>}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="app-container">
            <Header setPage={setPage} currentPage="dashboard" theme={theme} toggleTheme={toggleTheme} />
            <main className="main-content" style={{ display: 'block', width: '100%', backgroundColor: 'var(--bg-primary)' }}>
                <div className="dashboard">
                    <Sidebar 
                        setPage={setPage} 
                        currentPage={activeTab} 
                        onTabChange={setActiveTab} 
                        userProfile={{
                            name: profileData.name,
                            role: "Volunteer",
                            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&crop=faces&auto=format&q=80"
                        }}
                    />

                    <div className="dashboard-main">
                        {/* Top Header Section */}
                        <header className="dashboard-header">
                            <div className="header-greeting-area">
                                <h2>Hello {profileData.name || "Volunteer"} 👋</h2>
                                <p className="header-date">Wednesday, 14 Feb 2026</p>
                            </div>

                            <div className="header-actions-area">
                                <button className="btn-opportunities-redirect" onClick={() => setPage('opportunities')}>
                                    <span>Browse Projects</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                                <button className="btn-logout" onClick={logoutUser}>
                                    <span>Log out</span>
                                </button>
                            </div>
                        </header>

                        {activeTab === "dashboard" && (
                            <div className="dashboard-view-transition">
                                {/* Stats Row Grid */}
                                <section className="stats-row">
                                    <StatsCard
                                        title="Hours this month"
                                        value="44"
                                        subtitle="+12 vs last month"
                                        icon={
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                        }
                                    />
                                    <StatsCard
                                        title="Total hours"
                                        value="184"
                                        subtitle="All-time contribution"
                                        icon={
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                                        }
                                    />
                                    <StatsCard
                                        title="Active applications"
                                        value="3"
                                        subtitle="2 status: shortlisted"
                                        icon={
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                                        }
                                    />
                                    <StatsCard
                                        title="Badges earned"
                                        value="7"
                                        subtitle="2 status: in progress"
                                        icon={
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" /><path d="M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.6 6h6.8c2.16-1.1 3.6-3.38 3.6-7a7 7 0 0 0-7-7z" /></svg>
                                        }
                                    />
                                </section>

                                {/* Dashboard Widgets Grid */}
                                <section className="dashboard-widgets-grid">
                                    <div className="widgets-column-left">
                                        <VolunteerHours />
                                        <ProfileCompletion />
                                    </div>
                                    <div className="widgets-column-right">
                                        <UpcomingEvents />
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === "calendar" && (
                            <div className="dashboard-view-transition">
                                <section className="dashboard-subview calendar-view-container">
                                    <div className="subview-header">
                                        <h3>Volunteer Calendar</h3>
                                        <p>Track your registered campaigns and upcoming duty shifts.</p>
                                    </div>
                                    <div className="calendar-content-grid">
                                        <div className="calendar-card">
                                            <div className="calendar-header-row">
                                                <h4>{calendarMonth}</h4>
                                                <div className="calendar-nav-buttons">
                                                    <button disabled>&lt;</button>
                                                    <button disabled>&gt;</button>
                                                </div>
                                            </div>
                                            <div className="calendar-weekdays">
                                                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                                            </div>
                                            <div className="calendar-days-grid">
                                                {renderCalendarGrid()}
                                            </div>
                                        </div>
                                        <div className="calendar-details-card">
                                            <h4>Schedule for Feb {selectedDate}</h4>
                                            {calendarEvents[selectedDate] ? (
                                                <div className="event-details-active">
                                                    <span className="event-type-badge">{calendarEvents[selectedDate].type}</span>
                                                    <h5>{calendarEvents[selectedDate].title}</h5>
                                                    <div className="detail-row">
                                                        <strong>Time:</strong>
                                                        <span>{calendarEvents[selectedDate].time}</span>
                                                    </div>
                                                    <div className="detail-row">
                                                        <strong>Location:</strong>
                                                        <span>{calendarEvents[selectedDate].location}</span>
                                                    </div>
                                                    <p className="event-desc-text">{calendarEvents[selectedDate].description}</p>
                                                    <div className="event-status-row">
                                                        <span className={`status-text ${calendarEvents[selectedDate].status.toLowerCase().replace(" ", "-")}`}>
                                                            ● {calendarEvents[selectedDate].status}
                                                        </span>
                                                        <button className="btn-event-action">
                                                            {calendarEvents[selectedDate].buttonAction}
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="event-details-empty">
                                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <line x1="12" y1="8" x2="12" y2="16" />
                                                        <line x1="8" y1="12" x2="16" y2="12" />
                                                    </svg>
                                                    <p>No volunteering tasks scheduled for this day.</p>
                                                    <button className="btn-opportunities-redirect" onClick={() => setPage('opportunities')}>
                                                        Find Opportunities
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === "achievements" && (
                            <div className="dashboard-view-transition">
                                <section className="dashboard-subview achievements-view-container">
                                    <div className="subview-header">
                                        <h3>Volunteer Achievements</h3>
                                        <p>Celebrate your commitment. You earn badges as you help the community.</p>
                                    </div>
                                    <div className="achievements-summary-card">
                                        <div className="summary-text-col">
                                            <h4>Level 4 Volunteer</h4>
                                            <p>You have contributed <strong>184 hours</strong>. Just 16 more hours to reach Level 5!</p>
                                            <div className="progress-bar-container">
                                                <div className="progress-bar-fill" style={{ width: "92%" }}></div>
                                            </div>
                                            <span className="progress-bar-label">184 / 200 hours logged</span>
                                        </div>
                                        <div className="summary-stats-col">
                                            <div className="badge-count-card">
                                                <span className="badge-icon-large">🏆</span>
                                                <div>
                                                    <h5>7 Badges</h5>
                                                    <span>5 active / 2 locked</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="badges-grid-list">
                                        {achievementsList.map(b => (
                                            <div key={b.id} className={`badge-card-item ${b.status.toLowerCase().replace(" ", "-")}`}>
                                                <div className="badge-icon-wrapper" style={{ backgroundColor: `${b.color}15`, color: b.color }}>
                                                    <span className="badge-icon-symbol">{b.icon}</span>
                                                </div>
                                                <div className="badge-info-details">
                                                    <h5>{b.name}</h5>
                                                    <p>{b.desc}</p>
                                                    {b.status === "In Progress" && (
                                                        <div className="badge-progress-mini">
                                                            <div className="progress-mini-bar">
                                                                <div className="progress-mini-fill" style={{ width: `${b.progress}%`, backgroundColor: b.color }}></div>
                                                            </div>
                                                            <span className="progress-mini-text">{b.current} / {b.target} hours</span>
                                                        </div>
                                                    )}
                                                    {b.status === "Locked" && (
                                                        <span className="badge-status-tag locked">Locked</span>
                                                    )}
                                                    {b.status === "Earned" && (
                                                        <span className="badge-status-tag earned">Earned</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === "profile" && (
                            <div className="dashboard-view-transition">
                                <section className="dashboard-subview profile-view-container">
                                    <div className="subview-header">
                                        <h3>Volunteer Profile</h3>
                                        <p>Manage your public info, volunteer bio, expertise, and target cause interests.</p>
                                    </div>
                                    <div className="profile-content-cols">
                                        <div className="profile-left-card">
                                            <div className="profile-avatar-wrapper">
                                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&fit=crop&crop=faces&auto=format&q=80" alt="Priya Sharma" loading="lazy" />
                                                <button className="btn-change-avatar" onClick={() => alert("Simulation: Upload new profile photo")}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                                                </button>
                                            </div>
                                            <h4>{profileData.name}</h4>
                                            <span className="profile-tag-sub">Active Volunteer</span>
                                            <p className="profile-since">Member since October 2024</p>
                                            <div className="quick-points-box">
                                                <div className="q-point">⭐ 4.9 Volunteer Rating</div>
                                                <div className="q-point">⚡ 100% Attendance Rate</div>
                                            </div>
                                            <button 
                                                type="button" 
                                                className="btn-view-public-profile" 
                                                onClick={() => setPage("volunteerProfile")}
                                                style={{
                                                    marginTop: '20px',
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    background: 'var(--primary-light)',
                                                    color: 'var(--primary-color)',
                                                    padding: '10px 16px',
                                                    borderRadius: '8px',
                                                    fontWeight: '600',
                                                    fontSize: '13px',
                                                    border: '1px solid transparent',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'var(--primary-light-hover)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'var(--primary-light)';
                                                }}
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                                View Public Profile
                                            </button>
                                        </div>
                                        <div className="profile-right-form-card">
                                            {saveStatus && (
                                                <div className="toast-success-message">
                                                    {saveStatus}
                                                </div>
                                            )}
                                            <form onSubmit={handleSaveProfile} className="profile-edit-form">
                                                <div className="form-row">
                                                    <div className="form-group-item">
                                                        <label>Full Name</label>
                                                        <input
                                                            type="text"
                                                            value={profileData.name}
                                                            onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group-item">
                                                        <label>Email Address</label>
                                                        <input
                                                            type="email"
                                                            value={profileData.email}
                                                            onChange={e => setProfileData({ ...profileData, email: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group-item full-width">
                                                        <label>Phone Number</label>
                                                        <input
                                                            type="text"
                                                            value={profileData.phone}
                                                            onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group-item full-width">
                                                    <label>Bio / Description</label>
                                                    <textarea
                                                        rows="3"
                                                        value={profileData.bio}
                                                        onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                                                    ></textarea>
                                                </div>

                                                <div className="skills-tags-section">
                                                    <label>My Skills</label>
                                                    <div className="skills-tags-container">
                                                        {profileData.skills.map(s => (
                                                            <span key={s} className="skill-tag-pill">
                                                                {s}
                                                                <button type="button" onClick={() => handleRemoveSkill(s)} className="btn-remove-tag">&times;</button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="add-skill-bar">
                                                        <input
                                                            type="text"
                                                            placeholder="Add a new skill..."
                                                            value={newSkill}
                                                            onChange={e => setNewSkill(e.target.value)}
                                                        />
                                                        <button type="button" onClick={handleAddSkill} className="btn-add-skill-action">Add</button>
                                                    </div>
                                                </div>

                                                <div className="interests-section">
                                                    <label>Causes I Support</label>
                                                    <div className="interests-options-grid">
                                                        {["Environment", "Education", "Healthcare", "Disaster Relief", "Animal Welfare", "Elderly Care"].map(interest => {
                                                            const isSelected = profileData.interests.includes(interest);
                                                            return (
                                                                <button
                                                                    key={interest}
                                                                    type="button"
                                                                    className={`interest-select-btn ${isSelected ? "selected" : ""}`}
                                                                    onClick={() => handleToggleInterest(interest)}
                                                                >
                                                                    {interest}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                <div className="form-actions-row">
                                                    <button type="submit" className="btn-submit-profile">Save Changes</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === "settings" && (
                            <div className="dashboard-view-transition">
                                <section className="dashboard-subview settings-view-container">
                                    <div className="subview-header">
                                        <h3>Account Settings</h3>
                                        <p>Adjust notification channels, privacy parameters, and preferences.</p>
                                    </div>
                                    <div className="settings-options-cols">
                                        <div className="settings-card-group">
                                            <h4>Notifications Preferences</h4>
                                            <div className="setting-toggle-row">
                                                <div className="toggle-info">
                                                    <h5>Email Campaigns Notifications</h5>
                                                    <p>Receive updates when new volunteer events matching your skills are posted.</p>
                                                </div>
                                                <label className="switch-toggle-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={settings.emailAlerts}
                                                        onChange={e => setSettings({ ...settings, emailAlerts: e.target.checked })}
                                                    />
                                                    <span className="slider-round-toggle"></span>
                                                </label>
                                            </div>
                                            <div className="setting-toggle-row">
                                                <div className="toggle-info">
                                                    <h5>Weekly Impact Digest</h5>
                                                    <p>Get a summary email of hours contributed, badges earned, and community milestones.</p>
                                                </div>
                                                <label className="switch-toggle-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={settings.weeklyDigest}
                                                        onChange={e => setSettings({ ...settings, weeklyDigest: e.target.checked })}
                                                    />
                                                    <span className="slider-round-toggle"></span>
                                                </label>
                                            </div>
                                            <div className="setting-toggle-row">
                                                <div className="toggle-info">
                                                    <h5>SMS Alerts</h5>
                                                    <p>Receive reminders on your phone 2 hours before your scheduled shifts.</p>
                                                </div>
                                                <label className="switch-toggle-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={settings.smsNotifications}
                                                        onChange={e => setSettings({ ...settings, smsNotifications: e.target.checked })}
                                                    />
                                                    <span className="slider-round-toggle"></span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="settings-card-group">
                                            <h4>Privacy & Safety</h4>
                                            <div className="setting-toggle-row">
                                                <div className="toggle-info">
                                                    <h5>Public Profile Searchability</h5>
                                                    <p>Allow certified NGOs to view your profile, contact details, and invite you to programs.</p>
                                                </div>
                                                <label className="switch-toggle-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={settings.publicProfile}
                                                        onChange={e => setSettings({ ...settings, publicProfile: e.target.checked })}
                                                    />
                                                    <span className="slider-round-toggle"></span>
                                                </label>
                                            </div>
                                            <div className="setting-toggle-row">
                                                <div className="toggle-info">
                                                    <h5>Show Achievements Badges</h5>
                                                    <p>Display your earned trophies and Level status on the NGO finder results page.</p>
                                                </div>
                                                <label className="switch-toggle-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={settings.showBadges}
                                                        onChange={e => setSettings({ ...settings, showBadges: e.target.checked })}
                                                    />
                                                    <span className="slider-round-toggle"></span>
                                                </label>
                                            </div>
                                            <div className="settings-danger-actions">
                                                <h5>Critical Actions</h5>
                                                <p>Permanently clean data, reset dashboard status, or deactivate user account.</p>
                                                <div className="danger-buttons-row">
                                                    <button type="button" className="btn-danger-action reset" onClick={() => alert("Simulation: Resetting all dashboard statistics to initial state")}>
                                                        Reset Data
                                                    </button>
                                                    <button type="button" className="btn-danger-action delete" onClick={() => {
                                                        if (confirm("Are you sure you want to deactivate your Volcano Account? This action is irreversible.")) {
                                                            alert("Simulation: Profile deactivated. Redirecting to home.");
                                                            setPage("home");
                                                        }
                                                    }}>
                                                        Deactivate Account
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer setPage={setPage} />
        </div>
    );
};

export default DashboardUser;
