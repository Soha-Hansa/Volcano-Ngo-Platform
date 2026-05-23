import React, { useState } from "react";
import "./OpportunityFind.css";
import JobCard from "./JobCard";

const Opportunities = ({ onStartChat }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All types");

  const jobs = [
    {
      org: "Green Earth Initiative",
      role: "Frontend Developer (Pro Bono)",
      description: "Help us rebuild our donor portal so we can raise more funds for reforestation in Southeast Asia.",
      tags: ["React", "Tailwind", "UI/UX"],
      time: "6 hrs / week",
      location: "Remote",
      type: "Skill-based",
    },
    {
      org: "BrightFutures Foundation",
      role: "English Tutor – Underserved Schools",
      description: "Provide online and on-ground English lessons to children in rural areas to help bridge the educational divide.",
      tags: ["Teaching", "English", "Empathy"],
      time: "4 hrs / week",
      location: "Mumbai, India",
      type: "On-ground",
    },
    {
      org: "OceanGuard",
      role: "Beach Cleanup Coordinator",
      description: "Lead weekend coastal cleanup drives and organize waste segregation workshops for local beachgoers.",
      tags: ["Logistics", "Leadership", "Environment"],
      time: "Weekends",
      location: "Goa, India",
      type: "On-ground",
    },
    {
      org: "Hope Kitchen",
      role: "Brand Designer",
      description: "Craft a fresh, modern visual identity, logo, and social media media kit for our community soup kitchen program.",
      tags: ["Figma", "Branding", "Illustration"],
      time: "8 hrs / week",
      location: "Remote",
      type: "Skill-based",
    },
    {
      org: "Animal Shelter Network",
      role: "Weekend Caretaker",
      description: "Assist with daily operations, feeding, and socialization activities for rescued animals awaiting adoption.",
      tags: ["Animal Care", "Compassion", "Rescue"],
      time: "Sat/Sun",
      location: "Bengaluru, India",
      type: "On-ground",
    },
    {
      org: "CodeForKids",
      role: "Workshop Facilitator",
      description: "Introduce elementary students to coding basics using Python and scratch programming in interactive online classes.",
      tags: ["Python", "Teaching", "Coding"],
      time: "3 hrs / weekend",
      location: "Remote",
      type: "Skill-based",
    }
  ];

  // Search and filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType =
      typeFilter === "All types" || job.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const handleReset = () => {
    setSearchTerm("");
    setTypeFilter("All types");
  };

  return (
    <div className="opportunities-container">
      <span className="section-label">LIVE OPPORTUNITIES</span>
      <h1 className="main-heading">Find a cause worth your time.</h1>
      <p className="sub-text">
        {filteredJobs.length} {filteredJobs.length === 1 ? "opportunity" : "opportunities"} matching your search across {new Set(filteredJobs.map(j => j.org)).size} NGOs.
      </p>

      {/* Premium Search Bar */}
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search by role, NGO, or skill..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="search-dropdown-wrapper">
          <select
            className="search-dropdown"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All types">All types</option>
            <option value="Skill-based">Skill-based</option>
            <option value="On-ground">On-ground</option>
          </select>
        </div>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="jobs-grid">
          {filteredJobs.map((job, index) => (
            <JobCard key={index} index={index} {...job} onStartChat={onStartChat} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px" }}>
            <circle cx="12" cy="12" r="10"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          <h3>No matching opportunities</h3>
          <p>We couldn't find anything matching your filters. Try clearing your search or choosing another type.</p>
          <button className="btn-reset" onClick={handleReset}>Reset Filters</button>
        </div>
      )}
    </div>
  );
};

export default Opportunities;
