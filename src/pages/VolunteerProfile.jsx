import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './VolunteerProfile.css';

const VolunteerProfile = ({ setPage = () => {}, theme, toggleTheme, onStartChat }) => {
    const [verificationStatus, setVerificationStatus] = useState('unverified'); // 'unverified' | 'scanning' | 'verified'
    const [progress, setProgress] = useState(0);
    const [linkedinUrl, setLinkedinUrl] = useState('');

    // DigiLocker simulation states
    const [verifiedAadhaar, setVerifiedAadhaar] = useState('');

    const handleStartDigiLockerVerify = () => {
        setVerifiedAadhaar("XXXX-XXXX-9840");
        setVerificationStatus('scanning');
        setProgress(0);
    };

    useEffect(() => {
        let interval = null;
        if (verificationStatus === 'scanning') {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setVerificationStatus('verified');
                        return 100;
                    }
                    return prev + 10;
                });
            }, 300);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [verificationStatus]);

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
        ],
        reviews: [
            {
                id: 1,
                reviewer: "Dr. Amit Patel",
                role: "Executive Director",
                organization: "Green Earth Initiative",
                rating: 5.0,
                message: "Priya is an outstanding volunteer. Her commitment during the Sanjay Gandhi Park Reforestation project was exemplary, and her ability to coordinate teams of new volunteers significantly boosted our impact. A true community leader!",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&fit=crop&crop=faces&auto=format&q=80",
                date: "Feb 18, 2026"
            },
            {
                id: 2,
                reviewer: "Sarah Jenkins",
                role: "Head of Operations",
                organization: "Hope Kitchen",
                rating: 4.8,
                message: "We were thrilled to have Priya support our Winter Meal Program. She is highly reliable, energetic, and brings great problem-solving skills to fast-paced environments. Her 100% attendance rate speaks volumes.",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&fit=crop&crop=faces&auto=format&q=80",
                date: "Feb 5, 2026"
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
                                    <img src={volunteer.avatar} alt={volunteer.name} className="volunteer-avatar-large" loading="lazy" />
                                    {verificationStatus === 'verified' ? (
                                        <span className="verify-badge-dot verified" title="Verified Volunteer">✓</span>
                                    ) : (
                                        <span className="verify-badge-dot unverified" title="Verification Pending">⚠️</span>
                                    )}
                                </div>

                                <h2 className="volunteer-name-large">{volunteer.name}</h2>
                                <p className="volunteer-tagline">
                                    {verificationStatus === 'verified' ? 'Verified Community Champion' : 'Volunteer (Verification Pending)'}
                                </p>
                                
                                <div className="volunteer-location-row">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span>{volunteer.location}</span>
                                </div>
                                
                                {verificationStatus === 'verified' && linkedinUrl && (
                                    <div className="volunteer-linkedin-container">
                                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="volunteer-linkedin-link">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                                            </svg>
                                            <span>Visit LinkedIn Profile</span>
                                        </a>
                                    </div>
                                )}
                                
                                <span className="member-since-badge">{volunteer.since}</span>

                                <div className="profile-divider"></div>

                                <div className="contact-actions-stack">
                                    <button 
                                        className="btn-contact-volunteer chat"
                                        onClick={() => onStartChat && onStartChat({ name: volunteer.name, role: 'volunteer', avatar: volunteer.avatar })}
                                        id="chat-volunteer-btn"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                        <span>Chat with Volunteer</span>
                                    </button>
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

                            {/* Verification Form Card */}
                            <div className="profile-verification-card">
                                <h3 className="verification-card-title">Identity Verification</h3>
                                
                                {verificationStatus === 'unverified' && (
                                    <div className="verification-form">
                                        <p className="verification-card-desc">
                                            Verify your volunteer identity instantly using your Government-issued DigiLocker account.
                                        </p>
                                        
                                        <div className="digilocker-verify-container">
                                            <div className="digilocker-logo-box">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                                <span>DigiLocker</span>
                                            </div>
                                            <p className="digilocker-info-text">
                                                By linking DigiLocker, Volcano retrieves your authenticated Aadhaar card securely to verify your profile.
                                            </p>
                                            <button 
                                                type="button"
                                                className="btn-digilocker-verify"
                                                onClick={handleStartDigiLockerVerify}
                                                id="btn-trigger-digilocker"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                                </svg>
                                                Verify with DigiLocker
                                            </button>
                                        </div>

                                        <div className="verification-input-group">
                                            <label className="verification-label">LinkedIn URL (Optional)</label>
                                            <input 
                                                type="url" 
                                                value={linkedinUrl}
                                                onChange={(e) => setLinkedinUrl(e.target.value)}
                                                placeholder="https://linkedin.com/in/username"
                                                className="verify-url-input"
                                                id="linkedin-url-input"
                                            />
                                        </div>
                                    </div>
                                )}

                                {verificationStatus === 'scanning' && (
                                    <div className="verification-scanning-view">
                                        <div className="scan-doc-container">
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="scan-doc-icon">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                            <div className="scan-laser-line"></div>
                                        </div>
                                        
                                        <h4 className="scan-status-title">DigiLocker Secure Fetch...</h4>
                                        <div className="scan-progress-wrapper">
                                            <div className="scan-progress-bar-bg">
                                                <div className="scan-progress-bar" style={{ width: `${progress}%` }}></div>
                                            </div>
                                            <span className="scan-percentage">{progress}%</span>
                                        </div>

                                        <div className="verification-scan-steps">
                                            <div className={`scan-step-item ${progress >= 0 ? (progress >= 25 ? 'completed' : 'active') : ''}`}>
                                                <span className="scan-step-icon">{progress >= 25 ? '✓' : '●'}</span>
                                                <span>Connecting to DigiLocker Secure Vault</span>
                                            </div>
                                            <div className={`scan-step-item ${progress >= 25 ? (progress >= 50 ? 'completed' : 'active') : ''}`}>
                                                <span className="scan-step-icon">{progress >= 50 ? '✓' : (progress >= 25 ? '●' : '○')}</span>
                                                <span>Accessing issued documents</span>
                                            </div>
                                            <div className={`scan-step-item ${progress >= 50 ? (progress >= 75 ? 'completed' : 'active') : ''}`}>
                                                <span className="scan-step-icon">{progress >= 75 ? '✓' : (progress >= 50 ? '●' : '○')}</span>
                                                <span>Retrieving digitally signed Aadhaar card</span>
                                            </div>
                                            <div className={`scan-step-item ${progress >= 75 ? (progress >= 100 ? 'completed' : 'active') : ''}`}>
                                                <span className="scan-step-icon">{progress >= 100 ? '✓' : (progress >= 75 ? '●' : '○')}</span>
                                                <span>Validating cryptographic signatures</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {verificationStatus === 'verified' && (
                                    <div className="verification-success-view">
                                        <div className="success-badge-wrapper">
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="success-check-icon">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <h4 className="verified-status-title">User Verified ✅</h4>
                                        <p className="verified-status-desc">
                                            Identity verification successfully completed.
                                        </p>
                                        
                                        <div className="verified-details-list">
                                            <div className="verified-detail-item">
                                                <span>Aadhaar:</span>
                                                <strong>{verifiedAadhaar || 'XXXX-XXXX-8910'}</strong>
                                            </div>
                                            <div className="verified-detail-item">
                                                <span>Source:</span>
                                                <strong style={{ color: '#10b981' }}>DigiLocker Secure</strong>
                                            </div>
                                            {linkedinUrl && (
                                                <div className="verified-detail-item">
                                                    <span>LinkedIn:</span>
                                                    <strong>Connected</strong>
                                                </div>
                                            )}
                                        </div>

                                        <button 
                                            className="btn-verify-reset"
                                            onClick={() => {
                                                setVerificationStatus('unverified');
                                                setVerifiedAadhaar('');
                                                setLinkedinUrl('');
                                                setProgress(0);
                                            }}
                                            id="btn-reset-verification"
                                        >
                                            Reset Verification
                                        </button>
                                    </div>
                                )}
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

                            {/* Reviews & Recommendations */}
                            <section className="profile-section-card reviews-card">
                                <h3 className="section-title">Endorsements & Reviews</h3>
                                <div className="profile-reviews-list">
                                    {volunteer.reviews.map((review) => (
                                        <div key={review.id} className="profile-review-item">
                                            <div className="review-header">
                                                <div className="reviewer-info-wrap">
                                                    <img src={review.avatar} alt={review.reviewer} className="reviewer-avatar" />
                                                    <div className="reviewer-meta">
                                                        <h4 className="reviewer-name">{review.reviewer}</h4>
                                                        <p className="reviewer-role">{review.role} • <strong>{review.organization}</strong></p>
                                                    </div>
                                                </div>
                                                <div className="review-rating-stars">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <span key={i} className={`star-icon ${i < Math.floor(review.rating) ? 'filled' : ''}`}>★</span>
                                                    ))}
                                                    <span className="rating-number">{review.rating.toFixed(1)}</span>
                                                </div>
                                            </div>
                                            <p className="review-message-text">"{review.message}"</p>
                                            <div className="review-footer-meta">
                                                <span className="review-date-stamp">{review.date}</span>
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
