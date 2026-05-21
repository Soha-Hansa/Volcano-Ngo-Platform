import React from "react";
import "./Opportunities.css";
import JobCard from "./JobCard";

const Opportunities = () => {
  const jobs = [
    {
      org: "Green Earth Initiative",
      role: "Frontend Developer (Pro Bono)",
      description:
        "Help us rebuild our donor portal so we can raise more funds for reforestation in Southeast Asia.",
      tags: ["React", "Tailwind", "UI/UX"],
      time: "6 hrs / week",
      location: "Remote",
      type: "Skill-based",
    },
    // ...more jobs
  ];

  return (
    <div className="opportunities-container">
      <h2 className="section-title">LIVE OPPORTUNITIES</h2>
      <h1 className="main-heading">Find a cause worth your time.</h1>
      <p className="sub-text">
        {jobs.length} opportunities matching your search across {jobs.length} NGOs.
      </p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by role, NGO, or skill..."
          className="search-input"
        />
        <select className="search-dropdown">
          <option>All types</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Remote</option>
        </select>
        <button className="search-button">Search</button>
      </div>

      <div className="jobs-grid">
        {jobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Opportunities;
