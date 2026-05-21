import React from "react";
import "./ProfileCompletion.css";

const ProfileCompletion = () => {
  const steps = [
    { label: "Account setup (Basics)", completed: true },
    { label: "Select skills & interests", completed: true },
    { label: "Write volunteer bio", completed: true },
    { label: "Define availability schedule", completed: false },
    { label: "Connect professional networks", completed: false }
  ];

  return (
    <div className="profile-completion">
      <div className="completion-header">
        <h3>Profile Strength</h3>
        <span className="percent-text">78%</span>
      </div>
      
      <div className="progress-bar-container">
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: "78%" }}></div>
        </div>
      </div>
      
      <div className="checklist-items">
        {steps.map((step, idx) => (
          <div key={idx} className={`checklist-item ${step.completed ? 'completed' : ''}`}>
            <span className="checkbox-icon">
              {step.completed ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <span className="dot-pending"></span>
              )}
            </span>
            <span className="step-label">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCompletion;
