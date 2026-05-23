import React from "react";
import "./JobCard.css";

const JobCard = ({ org, role, description, tags, time, location, type, index = 0, onStartChat }) => {
  return (
    <div className="job-card" style={{ animationDelay: `${index * 60}ms` }}>
      <h3 className="org-name">{org}</h3>
      <h2 className="role-title">{role}</h2>
      <p className="job-description">{description}</p>

      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="job-meta">
        <span className="time">⏱ {time}</span>
        <span className="location">📍 {location}</span>
      </div>

      <button 
        className="btn-chat-ngo"
        onClick={() => onStartChat && onStartChat({ name: org, role: 'ngo', avatar: null, opportunityRole: role })}
        id={`chat-ngo-btn-${index}`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>Chat with NGO</span>
      </button>

      <div className="job-type">{type}</div>
    </div>
  );
};

export default JobCard;
