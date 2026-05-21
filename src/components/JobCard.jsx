import React from "react";
import "./JobCard.css";

const JobCard = ({ org, role, description, tags, time, location, type }) => {
  return (
    <div className="job-card">
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

      <div className="job-type">{type}</div>
    </div>
  );
};

export default JobCard;
