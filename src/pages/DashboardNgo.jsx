import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import "./DashboardNgo.css";

const DashboardNgo = ({ 
  setPage = () => {},
  ngoData: propsNgoData,
  setNgoData: propsSetNgoData,
  theme,
  toggleTheme,
  logoutUser
}) => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [invitedVolunteers, setInvitedVolunteers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [verificationStatus, setVerificationStatus] = useState(
    propsNgoData?.certificateVerified ? 'verified' : 'idle'
  );
  const [scanProgress, setScanProgress] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    if (propsNgoData?.certificateVerified) {
      setVerificationStatus('verified');
    } else {
      setVerificationStatus('idle');
    }
  }, [propsNgoData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVerificationStatus('scanning');
    setScanProgress(0);

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target.result;
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setScanProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setVerificationStatus('verified');
          if (propsSetNgoData) {
            propsSetNgoData({
              ...ngoData,
              ngoCertificate: base64Data,
              certificateName: file.name,
              certificateVerified: true
            });
          } else {
            setLocalNgoData({
              ...localNgoData,
              ngoCertificate: base64Data,
              certificateName: file.name,
              certificateVerified: true
            });
          }
        }
      }, 300);
    };
    reader.readAsDataURL(file);
  };

  // NGO details state with props fallback
  const [localNgoData, setLocalNgoData] = useState({
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
  const ngoData = propsNgoData || localNgoData;
  const setNgoData = propsSetNgoData || setLocalNgoData;

  const [saveStatus, setSaveStatus] = useState("");
  
  // State for Campaigns Table
  const [campaigns, setCampaigns] = useState([
    { 
      id: 1, 
      name: "Reforest 2026", 
      status: "Active", 
      applicants: 42, 
      spots: 50, 
      deadline: "28 Feb",
      category: "Climate & Environment",
      description: "Join us in planting over 500 native saplings to restore local forest canopy and fight urban heat islands.",
      requirements: ["Physical Fitness", "Outdoor work", "Teamwork"],
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=60"
    },
    { 
      id: 2, 
      name: "Coastal Cleanup Drive", 
      status: "Active", 
      applicants: 18, 
      spots: 25, 
      deadline: "12 Mar",
      category: "Climate & Environment",
      description: "Help clean and restore our coastline. We'll be collecting debris, segregating plastics, and recording waste data.",
      requirements: ["Eco Awareness", "Coastal Safety", "Data Logging"],
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&auto=format&fit=crop&q=60"
    },
    { 
      id: 3, 
      name: "Code for Kids Workshop", 
      status: "Draft", 
      applicants: 0, 
      spots: 20, 
      deadline: "25 Mar",
      category: "Education & Literacy",
      description: "Teach basic visual programming and HTML/CSS to kids in community centers. No advanced programming needed.",
      requirements: ["Basic HTML/CSS", "Patience", "Mentoring"],
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&auto=format&fit=crop&q=60"
    },
    { 
      id: 4, 
      name: "Winter Meal Program", 
      status: "Closed", 
      applicants: 64, 
      spots: 60, 
      deadline: "31 Jan",
      category: "Community Development",
      description: "Assist in preparing, packing, and distributing hot, nutritious meals to homeless families during cold winter weeks.",
      requirements: ["Food Handling", "Empathy", "Cooking Skills"],
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&auto=format&fit=crop&q=60"
    }
  ]);

  // Modal State for posting new opportunity
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    status: "Active",
    applicants: 0,
    spots: "",
    deadline: "",
    category: "Climate & Environment",
    description: "",
    requirements: ""
  });

  // Hover state for SVG chart tooltip
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const getCategoryImage = (category) => {
    switch (category) {
      case "Climate & Environment":
        return "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=60";
      case "Education & Literacy":
        return "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&auto=format&fit=crop&q=60";
      case "Healthcare & Medical":
        return "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=60";
      case "Disaster Relief":
        return "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&auto=format&fit=crop&q=60";
      case "Community Development":
        return "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&auto=format&fit=crop&q=60";
      case "Animal Welfare":
        return "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500&auto=format&fit=crop&q=60";
      default:
        return "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&auto=format&fit=crop&q=60";
    }
  };

  // Handler to post a new campaign
  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newCampaign.name || !newCampaign.spots || !newCampaign.deadline || !newCampaign.description) {
      alert("Please fill in all fields.");
      return;
    }
    
    const reqArray = newCampaign.requirements
      ? newCampaign.requirements.split(",").map(r => r.trim()).filter(Boolean)
      : [];

    const created = {
      id: campaigns.length + 1,
      name: newCampaign.name,
      status: newCampaign.status,
      applicants: 0,
      spots: parseInt(newCampaign.spots) || 0,
      deadline: newCampaign.deadline,
      category: newCampaign.category,
      description: newCampaign.description,
      requirements: reqArray,
      image: getCategoryImage(newCampaign.category)
    };
    setCampaigns([created, ...campaigns]);
    setNewCampaign({
      name: "",
      status: "Active",
      applicants: 0,
      spots: "",
      deadline: "",
      category: "Climate & Environment",
      description: "",
      requirements: ""
    });
    setIsModalOpen(false);
  };

  // Toggle volunteer invite state
  const handleInvite = (id) => {
    if (invitedVolunteers.includes(id)) {
      setInvitedVolunteers(invitedVolunteers.filter((vId) => vId !== id));
    } else {
      setInvitedVolunteers([...invitedVolunteers, id]);
    }
  };

  const handleLogout = () => {
    if (logoutUser) {
      logoutUser();
    } else {
      setPage("home");
    }
  };

  // Mock datasets
  const smartMatches = [
    { id: 1, name: "Aarav Mehta", role: "Frontend Developer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&crop=faces&auto=format&q=80" },
    { id: 2, name: "Priyanka Banerjee", role: "Brand Designer", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&crop=faces&auto=format&q=80" },
    { id: 3, name: "Rahul Verma", role: "Fullstack Engineer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&crop=faces&auto=format&q=80" },
    { id: 4, name: "Mouma Das", role: "UI/UX Consultant", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&crop=faces&auto=format&q=80" },
    { id: 5, name: "Debasmita Sen", role: "Social Media Lead", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&fit=crop&crop=faces&auto=format&q=80" },
    { id: 6, name: "Subrata Bose", role: "Data Analyst", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&fit=crop&crop=faces&auto=format&q=80" }
  ];

  const recentApplicants = [
    { id: 1, name: "Aarav Mehta", campaign: "Reforest 2026", status: "Shortlisted", statusClass: "badge-shortlisted", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&crop=faces&auto=format&q=80" },
    { id: 2, name: "Sophie Tan", campaign: "Reforest 2026", status: "New", statusClass: "badge-new", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&crop=faces&auto=format&q=80" },
    { id: 3, name: "Rahul Verma", campaign: "Coastal Cleanup", status: "Interview", statusClass: "badge-interview", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&crop=faces&auto=format&q=80" },
    { id: 4, name: "Maya Iyer", campaign: "Code for Kids", status: "New", statusClass: "badge-new", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&crop=faces&auto=format&q=80" }
  ];

  // Chart data
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
  const hoursData = [250, 310, 390, 500, 620, 750, 910];
  const volunteersData = [45, 52, 60, 72, 80, 88, 102];

  // Map charts coordinates
  const svgWidth = 600;
  const svgHeight = 180;
  const paddingX = 40;
  const paddingY = 20;

  const pointsHours = hoursData.map((val, index) => {
    const x = paddingX + (index * (svgWidth - paddingX * 2)) / (months.length - 1);
    const y = svgHeight - paddingY - (val / 1000) * (svgHeight - paddingY * 2);
    return { x, y, val, month: months[index], volunteers: volunteersData[index] };
  });

  const pointsVolunteers = volunteersData.map((val, index) => {
    const x = paddingX + (index * (svgWidth - paddingX * 2)) / (months.length - 1);
    const y = svgHeight - paddingY - (val / 1000) * (svgHeight - paddingY * 2);
    return { x, y, val };
  });

  const linePathHours = pointsHours.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const linePathVolunteers = pointsVolunteers.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner-wrapper">
          <div className="spinner"></div>
          <div className="spinner-glow"></div>
        </div>
        <p className="loader-text">Loading Volcano NGO Suite...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header setPage={setPage} currentPage="dashboardNgo" theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content" style={{ display: "block", width: "100%", backgroundColor: "var(--bg-primary)" }}>
        <div className="dashboard">
          
          {/* LEFT SIDEBAR */}
          <Sidebar
            setPage={setPage}
            currentPage={activeTab}
            onTabChange={setActiveTab}
            menuItems={[
              { id: "overview", label: "Overview", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg> },
              { id: "campaigns", label: "Campaigns", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg> },
              { id: "volunteers", label: "Volunteers", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
              { id: "applications", label: "Applications", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> },
              { id: "analytics", label: "Analytics", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
              { id: "profile", label: "NGO Profile", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
            ]}
            userProfile={{
              name: ngoData.name,
              role: "Verified NGO"
            }}
          />

          {/* MAIN DASHBOARD CONTENT */}
          <div className="dashboard-main">
            
            {/* TOP BAR */}
            <header className="dashboard-header-bar">
              <div className="search-bar-wrapper">
                <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search opportunities, NGOs, volunteers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="top-search-input"
                />
              </div>

              <div className="top-bar-right-actions">
                <button className="notification-bell-btn" aria-label="Notifications">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <span className="notification-badge-dot"></span>
                </button>
                <div className="team-avatar-icon">{(ngoData.name || "GE").substring(0, 2).toUpperCase()}</div>
                <button className="btn-logout" onClick={handleLogout}>Log out</button>
              </div>
            </header>

            {activeTab === "overview" ? (
              <div className="dashboard-view-transition">
                {/* WELCOME BANNER & PRIMARY ACTION */}
                <div className="welcome-banner-section">
                  <div className="welcome-text-area">
                    <h1 className="welcome-title">Welcome back, {ngoData.name || "Green Earth"}.</h1>
                    <p className="welcome-subtitle">
                      You have <span className="highlight-blue">12 new applications</span> waiting for review.
                    </p>
                  </div>
                  <button className="btn-post-opportunity" onClick={() => setIsModalOpen(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Post new opportunity</span>
                  </button>
                </div>

                {/* STATS ROW CARDS */}
                <section className="stats-row">
                  <div className="stats-card-modern">
                    <div className="card-top-info">
                      <div className="icon-badge-round color-blue">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      </div>
                      <span className="trend-indicator text-green">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 18 9 12 9"/><line x1="6" y1="18" x2="18" y2="9"/></svg>
                        +14 this month
                      </span>
                    </div>
                    <div className="card-value-display">102</div>
                    <div className="card-label-display">Total volunteers</div>
                  </div>

                  <div className="stats-card-modern">
                    <div className="card-top-info">
                      <div className="icon-badge-round color-green">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      </div>
                      <span className="trend-indicator text-green">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 18 9 12 9"/><line x1="6" y1="18" x2="18" y2="9"/></svg>
                        +16% vs last
                      </span>
                    </div>
                    <div className="card-value-display">910</div>
                    <div className="card-label-display">Hours logged</div>
                  </div>

                  <div className="stats-card-modern">
                    <div className="card-top-info">
                      <div className="icon-badge-round color-blue">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                      </div>
                      <span className="trend-indicator text-green">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 18 9 12 9"/><line x1="6" y1="18" x2="18" y2="9"/></svg>
                        1 launching
                      </span>
                    </div>
                    <div className="card-value-display">4</div>
                    <div className="card-label-display">Active campaigns</div>
                  </div>

                  <div className="stats-card-modern">
                    <div className="card-top-info">
                      <div className="icon-badge-round color-green">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                      </div>
                      <span className="trend-indicator text-green">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 18 9 12 9"/><line x1="6" y1="18" x2="18" y2="9"/></svg>
                        +8%
                      </span>
                    </div>
                    <div className="card-value-display">76%</div>
                    <div className="card-label-display">Application rate</div>
                  </div>
                </section>

                {/* ROW 2: ENGAGEMENT CHART & SMART MATCHES */}
                <section className="dashboard-grid-row">
                  {/* Engagement Graph widget */}
                  <div className="dashboard-card widget-engagement">
                    <div className="card-header-with-legend">
                      <div className="card-header-left">
                        <h3 className="widget-title">Engagement</h3>
                        <p className="widget-subtitle">Volunteers and hours over the last 7 months</p>
                      </div>
                      <div className="legend-items">
                        <span className="legend-item"><span className="legend-dot color-blue"></span>Volunteers</span>
                        <span className="legend-item"><span className="legend-dot color-green"></span>Hours</span>
                      </div>
                    </div>

                    <div className="chart-container-inner" style={{ position: "relative" }}>
                      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="100%" height="100%" className="engagement-svg-chart">
                        {/* Horizontal Gridlines */}
                        {[250, 500, 750, 1000].map((val) => {
                          const y = svgHeight - paddingY - (val / 1000) * (svgHeight - paddingY * 2);
                          return (
                            <g key={val}>
                              <line x1={paddingX} y1={y} x2={svgWidth - paddingX} y2={y} className="chart-gridline" />
                              <text x={paddingX - 10} y={y + 4} className="chart-axis-label-y" textAnchor="end">{val}</text>
                            </g>
                          );
                        })}

                        {/* Months X labels */}
                        {months.map((m, index) => {
                          const x = paddingX + (index * (svgWidth - paddingX * 2)) / (months.length - 1);
                          return (
                            <text key={m} x={x} y={svgHeight - 2} className="chart-axis-label-x" textAnchor="middle">
                              {m}
                            </text>
                          );
                        })}

                        {/* Hours Trend Line (Green) */}
                        <path d={linePathHours} className="chart-line hours-line" />
                        
                        {/* Volunteers Trend Line (Blue) */}
                        <path d={linePathVolunteers} className="chart-line volunteers-line" />

                        {/* Interactive Hover Areas */}
                        {pointsHours.map((p, idx) => (
                          <g key={idx}>
                            {/* Hover overlay column */}
                            <rect
                              x={p.x - 20}
                              y={paddingY}
                              width="40"
                              height={svgHeight - paddingY * 2}
                              fill="transparent"
                              className="hover-column-trigger"
                              onMouseEnter={() => setHoveredPoint(p)}
                              onMouseLeave={() => setHoveredPoint(null)}
                            />

                            {/* Circle Markers */}
                            <circle cx={p.x} cy={p.y} r={hoveredPoint && hoveredPoint.month === p.month ? 6 : 4} className="chart-point-marker hours-marker" />
                            <circle cx={pointsVolunteers[idx].x} cy={pointsVolunteers[idx].y} r={hoveredPoint && hoveredPoint.month === p.month ? 6 : 4} className="chart-point-marker volunteers-marker" />
                          </g>
                        ))}
                      </svg>

                      {/* Tooltip Overlay */}
                      {hoveredPoint && (
                        <div
                          className="chart-tooltip-bubble"
                          style={{
                            left: `${(hoveredPoint.x / svgWidth) * 100}%`,
                            top: `${(hoveredPoint.y / svgHeight) * 100 - 25}%`
                          }}
                        >
                          <div className="tooltip-title">{hoveredPoint.month}</div>
                          <div className="tooltip-row text-green">
                            <span>Hours logged:</span> <strong>{hoveredPoint.val}</strong>
                          </div>
                          <div className="tooltip-row text-blue">
                            <span>Volunteers:</span> <strong>{hoveredPoint.volunteers}</strong>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Smart Matches widget */}
                  <div className="dashboard-card widget-smart-matches">
                    <div className="widget-header-row">
                      <h3 className="widget-title">
                        <svg className="sparkles-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                        </svg>
                        Smart matches
                      </h3>
                      <p className="widget-subtitle">Top volunteers we recommend for your open roles.</p>
                    </div>

                    <div className="volunteers-matching-list">
                      {smartMatches.map((volunteer) => {
                        const isInvited = invitedVolunteers.includes(volunteer.id);
                        return (
                          <div key={volunteer.id} className="volunteer-match-card">
                            <div className="card-left-info">
                              <img src={volunteer.avatar} alt={volunteer.name} className="v-avatar" loading="lazy" />
                              <div className="v-details">
                                <span className="v-name">{volunteer.name}</span>
                                <span className="v-role">{volunteer.role}</span>
                              </div>
                            </div>
                            <div className="card-right-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <button
                                className={`btn-invite-action ${isInvited ? "invited" : ""}`}
                                onClick={() => handleInvite(volunteer.id)}
                              >
                                {isInvited ? (
                                  <>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span>Invited</span>
                                  </>
                                ) : (
                                  "Invite"
                                )}
                              </button>
                              
                              <a
                                href={`https://wa.me/919876543210?text=Hi%20${encodeURIComponent(volunteer.name)},%20we%20saw%20your%20profile%20on%20Volcano%20and%20would%20love%20to%20chat%20about%20our%20open%20roles!`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp-chat"
                                title={`Chat with ${volunteer.name} on WhatsApp`}
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 1.978 14.12 .952 11.487.95c-5.442 0-9.866 4.372-9.87 9.802 0 1.814.504 3.59 1.46 5.184L2.082 22l6.23-1.611c-1.603.953-3.19 1.453-4.832 1.454zM16.732 13.7c-.287-.143-1.695-.838-1.955-.933-.26-.096-.45-.143-.639.143-.19.286-.735.933-.9 1.122-.165.189-.33.214-.617.071-2.876-1.433-4.717-3.23-5.51-4.597-.189-.327-.02-.503.143-.666.147-.147.33-.382.495-.572.165-.19.22-.327.33-.546.11-.22.054-.412-.027-.555-.08-.143-.639-1.543-.876-2.112-.23-.556-.465-.48-.639-.49l-.546-.01c-.19 0-.5.07-.76.356-.26.287-1 .978-1 2.387s1.02 2.775 1.16 2.966c.14.191 2.007 3.064 4.862 4.297.68.293 1.21.469 1.62.6.68.216 1.3.185 1.79.112.55-.082 1.695-.693 1.935-1.362.24-.669.24-1.242.17-1.362-.07-.12-.26-.192-.547-.335z"/>
                                </svg>
                                <span>WhatsApp</span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* ROW 3: CAMPAIGNS & RECENT APPLICANTS */}
                <section className="dashboard-grid-row">
                  {/* Campaigns Table Card */}
                  <div className="dashboard-card widget-campaigns-table">
                    <div className="widget-header-row table-header">
                      <h3 className="widget-title">Campaigns</h3>
                      <button className="manage-all-link">Manage all &rarr;</button>
                    </div>

                    <div className="table-responsive-wrapper">
                      <table className="campaigns-data-table">
                        <thead>
                          <tr>
                            <th>Campaign</th>
                            <th>Status</th>
                            <th>Applicants</th>
                            <th>Spots</th>
                            <th>Deadline</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {campaigns.map((c) => (
                            <tr key={c.id}>
                              <td className="campaign-name-cell">{c.name}</td>
                              <td>
                                <span className={`status-badge-pill ${c.status.toLowerCase()}`}>
                                  {c.status}
                                </span>
                              </td>
                              <td className="text-center">{c.applicants}</td>
                              <td className="text-center">{c.spots}</td>
                              <td>{c.deadline}</td>
                              <td className="actions-cell">
                                <button className="btn-table-actions" aria-label="More actions">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="19" cy="12" r="1" />
                                    <circle cx="5" cy="12" r="1" />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Recent Applicants Feed Card */}
                  <div className="dashboard-card widget-recent-applicants">
                    <h3 className="widget-title">Recent applicants</h3>
                    <div className="applicants-feed-list">
                      {recentApplicants.map((applicant) => (
                        <div key={applicant.id} className="applicant-item-card">
                          <div className="applicant-left">
                            <img src={applicant.avatar} alt={applicant.name} className="applicant-avatar" loading="lazy" />
                            <div className="applicant-meta">
                              <span className="applicant-name">{applicant.name}</span>
                              <span className="applicant-project">{applicant.campaign}</span>
                            </div>
                          </div>
                          <span className={`status-pill ${applicant.statusClass}`}>
                            {applicant.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            ) : activeTab === "profile" ? (
              <div className="dashboard-view-transition">
                <div className="profile-editor-container">
                {/* Left Profile Card Preview */}
                <div className="profile-editor-sidebar">
                  <div className="profile-preview-card">
                    <div className="preview-banner"></div>
                    <div className="preview-avatar-wrapper">
                      <div className="preview-ngo-logo-fallback">GE</div>
                    </div>
                    <div className="preview-content">
                      <div className="preview-name-row">
                        <h3>{ngoData.name}</h3>
                        <span className="badge-verified-ngo">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          Verified NGO
                        </span>
                      </div>
                      <span className="preview-category">{ngoData.category}</span>
                      <div className="preview-details">
                        <p className="preview-address">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {ngoData.address}
                        </p>
                        {ngoData.website && (
                          <p className="preview-website">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="2" y1="12" x2="22" y2="12"></line>
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                            <a href={ngoData.website} target="_blank" rel="noopener noreferrer">{ngoData.website}</a>
                          </p>
                        )}
                      </div>
                      <button className="btn-view-public-profile" onClick={() => setPage("ngoProfile")}>
                        View Public Profile
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Form Card */}
                <div className="profile-editor-form-card">
                  <div className="editor-card-header">
                    <h2>Edit Organisation Profile</h2>
                    <p>Update your NGO's information to show to prospective volunteers and donors.</p>
                  </div>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setSaveStatus("Saving changes...");
                    
                    const token = localStorage.getItem('token');
                    
                    fetch('http://localhost:5000/api/ngo/profile', {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify({
                        name: ngoData.name,
                        ngoCategory: ngoData.category,
                        ngoWebsite: ngoData.website,
                        address: ngoData.address,
                        phone: ngoData.phone,
                        mission: ngoData.mission,
                        team: ngoData.team,
                        ngoCertificate: ngoData.ngoCertificate,
                        certificateName: ngoData.certificateName,
                        certificateVerified: ngoData.certificateVerified
                      })
                    })
                    .then(async res => {
                      const data = await res.json();
                      if (!res.ok) {
                        throw new Error(data.message || 'Failed to save profile');
                      }
                      return data;
                    })
                    .then(data => {
                      setSaveStatus("Profile saved successfully!");
                      if (propsSetNgoData) {
                        propsSetNgoData(data.user);
                      } else {
                        setLocalNgoData(data.user);
                      }
                      setTimeout(() => setSaveStatus(""), 3000);
                    })
                    .catch(err => {
                      setSaveStatus("Error saving changes.");
                      alert(err.message);
                      setTimeout(() => setSaveStatus(""), 3000);
                    });
                  }} className="profile-edit-form">
                    <div className="form-grid">
                      <div className="form-group-field full-width">
                        <label htmlFor="ngo-name">Organisation Name</label>
                        <input
                          id="ngo-name"
                          type="text"
                          value={ngoData.name}
                          onChange={(e) => setNgoData({ ...ngoData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group-field">
                        <label htmlFor="ngo-category">Primary Category</label>
                        <select
                          id="ngo-category"
                          value={ngoData.category}
                          onChange={(e) => setNgoData({ ...ngoData, category: e.target.value })}
                        >
                          <option value="Climate & Environment">Climate & Environment</option>
                          <option value="Education & Literacy">Education & Literacy</option>
                          <option value="Healthcare & Medical">Healthcare & Medical</option>
                          <option value="Disaster Relief">Disaster Relief</option>
                          <option value="Community Development">Community Development</option>
                          <option value="Animal Welfare">Animal Welfare</option>
                        </select>
                      </div>

                      <div className="form-group-field">
                        <label htmlFor="ngo-website">Website URL</label>
                        <input
                          id="ngo-website"
                          type="url"
                          value={ngoData.website}
                          onChange={(e) => setNgoData({ ...ngoData, website: e.target.value })}
                          placeholder="https://example.org"
                        />
                      </div>

                      <div className="form-group-field">
                        <label htmlFor="ngo-email">Contact Email</label>
                        <input
                          id="ngo-email"
                          type="email"
                          value={ngoData.email}
                          onChange={(e) => setNgoData({ ...ngoData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group-field">
                        <label htmlFor="ngo-phone">Phone Number</label>
                        <input
                          id="ngo-phone"
                          type="text"
                          value={ngoData.phone}
                          onChange={(e) => setNgoData({ ...ngoData, phone: e.target.value })}
                        />
                      </div>

                      <div className="form-group-field full-width">
                        <label htmlFor="ngo-address">Address</label>
                        <input
                          id="ngo-address"
                          type="text"
                          value={ngoData.address}
                          onChange={(e) => setNgoData({ ...ngoData, address: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group-field full-width">
                        <label htmlFor="ngo-mission">Mission Statement</label>
                        <textarea
                          id="ngo-mission"
                          rows="4"
                          value={ngoData.mission}
                          onChange={(e) => setNgoData({ ...ngoData, mission: e.target.value })}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="team-members-section">
                      <h3>Management & Key Team</h3>
                      <div className="team-members-list">
                        {ngoData.team.map((member, idx) => (
                          <div key={idx} className="team-member-edit-row">
                            <div className="member-info">
                              <span className="member-name">{member.name}</span>
                              <span className="member-role">{member.role}</span>
                            </div>
                            <button
                              type="button"
                              className="btn-remove-member"
                              onClick={() => {
                                const newTeam = [...ngoData.team];
                                newTeam.splice(idx, 1);
                                setNgoData({ ...ngoData, team: newTeam });
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="add-member-row">
                        <input
                          type="text"
                          placeholder="Member Name"
                          id="new-member-name"
                          className="member-input"
                        />
                        <input
                          type="text"
                          placeholder="Role (e.g. Director)"
                          id="new-member-role"
                          className="member-input"
                        />
                        <button
                          type="button"
                          className="btn-add-member"
                          onClick={() => {
                            const nameInput = document.getElementById("new-member-name");
                            const roleInput = document.getElementById("new-member-role");
                            if (nameInput.value.trim() && roleInput.value.trim()) {
                              setNgoData({
                                ...ngoData,
                                team: [
                                  ...ngoData.team,
                                  { name: nameInput.value.trim(), role: roleInput.value.trim() }
                                ]
                              });
                              nameInput.value = "";
                              roleInput.value = "";
                            } else {
                              alert("Please fill in both name and role.");
                            }
                          }}
                        >
                          Add Member
                        </button>
                      </div>
                    </div>

                    <div className="licensing-authenticity-section">
                      <h3>Licensing & Authenticity</h3>
                      <p className="licensing-section-desc">
                        Upload your NGO license certificate or registration documents so volunteers can trust your organization.
                      </p>
                      
                      {verificationStatus === 'idle' && (
                        <div className="license-upload-zone">
                          <input 
                            type="file" 
                            id="license-file-input" 
                            accept="image/*,application/pdf" 
                            onChange={handleFileChange} 
                            style={{ display: 'none' }}
                          />
                          <label htmlFor="license-file-input" className="license-upload-label">
                            <svg className="upload-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="17 8 12 3 7 8"></polyline>
                              <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <span className="upload-label-title">Click to upload certificate</span>
                            <span className="upload-label-subtitle">Supports PDF, JPG, PNG up to 5MB</span>
                          </label>
                        </div>
                      )}

                      {verificationStatus === 'scanning' && (
                        <div className="license-scanning-container">
                          <div className="license-scanning-card">
                            <div className="scanning-laser-line"></div>
                            <div className="scanning-file-info">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                              </svg>
                              <div className="file-details">
                                <span className="file-name">{ngoData.certificateName || "License_Document.pdf"}</span>
                                <span className="scanning-status-text">Verifying and scanning authenticity... {scanProgress}%</span>
                              </div>
                            </div>
                            <div className="scanning-progress-track">
                              <div className="scanning-progress-fill" style={{ width: `${scanProgress}%` }}></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {verificationStatus === 'verified' && (
                        <div className="license-verified-container">
                          <div className="license-verified-badge" onClick={() => setShowPreviewModal(true)}>
                            <div className="badge-left">
                              <div className="verified-check-circle">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </div>
                              <div className="badge-info">
                                <span className="verified-title">License Certificate Verified</span>
                                <span className="verified-subtitle">{ngoData.certificateName || "Uploaded document"}</span>
                              </div>
                            </div>
                            <button type="button" className="btn-view-certificate">View Certificate</button>
                          </div>
                          
                          <button 
                            type="button" 
                            className="btn-reupload-license"
                            onClick={() => {
                              setVerificationStatus('idle');
                              if (propsSetNgoData) {
                                propsSetNgoData({
                                  ...ngoData,
                                  ngoCertificate: null,
                                  certificateName: "",
                                  certificateVerified: false
                                });
                              } else {
                                setLocalNgoData({
                                  ...localNgoData,
                                  ngoCertificate: null,
                                  certificateName: "",
                                  certificateVerified: false
                                });
                              }
                            }}
                          >
                            Upload another document
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="form-actions-row">
                      <button type="submit" className="btn-save-profile">Save Changes</button>
                      {saveStatus && (
                        <span className={`save-status-msg ${saveStatus.includes("successfully") ? "success" : "pending"}`}>
                          {saveStatus}
                        </span>
                      )}
                    </div>
                  </form>
                </div>

                {saveStatus && saveStatus.includes("successfully") && (
                  <div className="floating-toast-alert">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{saveStatus}</span>
                  </div>
                )}
                </div>
              </div>
            ) : activeTab === "campaigns" ? (
              <div className="dashboard-view-transition">
                {/* CAMPAIGNS HEADER ROW */}
                <div className="campaigns-header-section">
                  <div className="campaigns-text-area">
                    <h1 className="campaigns-title">Volunteer Requirements & Campaigns</h1>
                    <p className="campaigns-subtitle">
                      Post volunteer opportunities and track applicant engagements.
                    </p>
                  </div>
                  <button className="btn-post-opportunity" onClick={() => setIsModalOpen(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Create Post</span>
                  </button>
                </div>

                {/* Grid of Campaign Cards */}
                <div className="campaigns-grid">
                  {campaigns.map((c) => (
                    <div key={c.id} className="campaign-card-premium">
                      <div className="campaign-card-image-wrapper">
                        <img 
                          src={c.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&auto=format&fit=crop&q=60"} 
                          alt={c.name} 
                          className="campaign-card-img" 
                          loading="lazy"
                        />
                        <span className={`status-badge-pill-card ${c.status.toLowerCase()}`}>
                          {c.status}
                        </span>
                      </div>
                      <div className="campaign-card-content">
                        <div className="campaign-card-top">
                          <span className="campaign-category-tag">{c.category || "General"}</span>
                        </div>
                        <h3 className="campaign-card-title">{c.name}</h3>
                        <p className="campaign-card-description">{c.description || "Help support our operations and make a direct community impact."}</p>
                        
                        {c.requirements && c.requirements.length > 0 && (
                          <div className="campaign-req-tags">
                            {c.requirements.map((req, rIdx) => (
                              <span key={rIdx} className="req-tag">{req}</span>
                            ))}
                          </div>
                        )}

                        <div className="campaign-progress-section">
                          <div className="progress-info-row">
                            <span className="progress-spots">Volunteers: {c.applicants} / {c.spots} spots</span>
                            <span className="progress-percentage">{Math.round((c.applicants / c.spots) * 100)}%</span>
                          </div>
                          <div className="campaign-progress-bar-bg">
                            <div 
                              className="campaign-progress-bar-fill" 
                              style={{ width: `${Math.min((c.applicants / c.spots) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="campaign-card-footer">
                          <div className="campaign-deadline-info">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span>Deadline: {c.deadline}</span>
                          </div>
                          <button className="btn-manage-campaign">Manage</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="dashboard-view-transition">
                <div className="dashboard-placeholder-tab">
                <div className="placeholder-illustration">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Suite</h2>
                <p>Detailed modules for managing {activeTab} will be implemented here. Use Overview to see active widgets.</p>
                <button className="btn-opportunities-redirect" onClick={() => setActiveTab("overview")}>Back to Overview</button>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* POPUP MODAL FOR NEW CAMPAIGN POSTING */}
      {isModalOpen && (
        <div className="modal-backdrop-overlay">
          <div className="modal-content-card">
            <div className="modal-header-row">
              <h3>Create New Campaign</h3>
              <button className="btn-close-modal" onClick={() => setIsModalOpen(false)} aria-label="Close modal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleCreateCampaign} className="modal-campaign-form">
              <div className="form-group-field">
                <label htmlFor="campaign-name">Campaign Name</label>
                <input
                  id="campaign-name"
                  type="text"
                  placeholder="e.g. Literacy Drive 2026"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-row-grid">
                <div className="form-group-field">
                  <label htmlFor="campaign-category">Category</label>
                  <select
                    id="campaign-category"
                    value={newCampaign.category}
                    onChange={(e) => setNewCampaign({ ...newCampaign, category: e.target.value })}
                    required
                  >
                    <option value="Climate & Environment">Climate & Environment</option>
                    <option value="Education & Literacy">Education & Literacy</option>
                    <option value="Healthcare & Medical">Healthcare & Medical</option>
                    <option value="Disaster Relief">Disaster Relief</option>
                    <option value="Community Development">Community Development</option>
                    <option value="Animal Welfare">Animal Welfare</option>
                  </select>
                </div>

                <div className="form-group-field">
                  <label htmlFor="campaign-status">Initial Status</label>
                  <select
                    id="campaign-status"
                    value={newCampaign.status}
                    onChange={(e) => setNewCampaign({ ...newCampaign, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="form-row-grid">
                <div className="form-group-field">
                  <label htmlFor="campaign-spots">Target Spots</label>
                  <input
                    id="campaign-spots"
                    type="number"
                    placeholder="e.g. 30"
                    value={newCampaign.spots}
                    onChange={(e) => setNewCampaign({ ...newCampaign, spots: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group-field">
                  <label htmlFor="campaign-deadline">Deadline</label>
                  <input
                    id="campaign-deadline"
                    type="text"
                    placeholder="e.g. 15 Apr"
                    value={newCampaign.deadline}
                    onChange={(e) => setNewCampaign({ ...newCampaign, deadline: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group-field">
                <label htmlFor="campaign-description">Description & Volunteer Requirements</label>
                <textarea
                  id="campaign-description"
                  placeholder="Describe what the volunteers will do, the impact of their work, etc."
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  rows="3"
                  style={{ 
                    padding: "10px 14px", 
                    border: "1px solid var(--border-color)", 
                    borderRadius: "8px", 
                    fontSize: "14px", 
                    outline: "none", 
                    background: "var(--bg-card)", 
                    color: "var(--text-heading)", 
                    fontFamily: "'Outfit', sans-serif" 
                  }}
                  required
                ></textarea>
              </div>

              <div className="form-group-field">
                <label htmlFor="campaign-requirements">Required Skills (comma-separated)</label>
                <input
                  id="campaign-requirements"
                  type="text"
                  placeholder="e.g. Outdoor work, Basic Coding, Patience"
                  value={newCampaign.requirements}
                  onChange={(e) => setNewCampaign({ ...newCampaign, requirements: e.target.value })}
                />
              </div>

              <div className="modal-actions-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit-campaign">Post Opportunity</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPreviewModal && (
        <div className="cert-modal-overlay" onClick={() => setShowPreviewModal(false)}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="cert-modal-header">
              <h3>Authenticity License Certificate</h3>
              <button type="button" className="btn-cert-modal-close" onClick={() => setShowPreviewModal(false)}>&times;</button>
            </div>
            <div className="cert-modal-body">
              {ngoData.ngoCertificate ? (
                ngoData.ngoCertificate.startsWith('data:application/pdf') ? (
                  <iframe 
                    src={ngoData.ngoCertificate} 
                    className="cert-pdf-iframe" 
                    title="NGO Certificate PDF"
                  />
                ) : (
                  <img 
                    src={ngoData.ngoCertificate} 
                    alt="NGO License Certificate" 
                    className="cert-image-preview" 
                  />
                )
              ) : (
                <div className="cert-empty-preview">
                  <p>No preview available for this document.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer setPage={setPage} />
    </div>
  );
};

export default DashboardNgo;
