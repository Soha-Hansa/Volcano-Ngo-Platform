import React from "react";
import "./UpcomingEvents.css";

const UpcomingEvents = () => {
  const events = [
    {
      role: "Frontend Developer",
      ngo: "Green Earth Initiative",
      date: "Wed, 14 Feb",
      time: "5:00 PM",
      status: "Today",
      statusClass: "today",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      )
    },
    {
      role: "Brand Designer",
      ngo: "Hope Kitchen",
      date: "Fri, 16 Feb",
      time: "11:00 AM",
      status: "In 2 days",
      statusClass: "soon",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><path d="M12 8V12L14 14"/></svg>
      )
    },
    {
      role: "Beach Cleanup",
      ngo: "OceanGuard",
      date: "Sat, 17 Feb",
      time: "7:00 AM",
      status: "Weekend",
      statusClass: "weekend",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      )
    }
  ];

  return (
    <div className="upcoming-events">
      <div className="events-header">
        <h3>Upcoming Schedule</h3>
        <span className="events-badge">{events.length} Active</span>
      </div>

      <div className="timeline">
        {events.map((e, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-icon-col">
              <div className={`timeline-icon-wrapper ${e.statusClass}`}>
                {e.icon}
              </div>
              {idx < events.length - 1 && <div className="timeline-connector"></div>}
            </div>
            
            <div className="timeline-content-card">
              <div className="card-top-row">
                <span className={`status-pill ${e.statusClass}`}>{e.status}</span>
                <span className="event-time">{e.date} · {e.time}</span>
              </div>
              <h4 className="event-role">{e.role}</h4>
              <p className="event-ngo">{e.ngo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
