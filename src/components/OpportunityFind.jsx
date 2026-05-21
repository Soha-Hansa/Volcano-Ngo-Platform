import React from "react";
import "./OpportunityFind.css";

const OpportunityFind = () => {
    return (
        <div className="opportunity-find-container">
            <h2 className="section-title">LIVE OPPORTUNITIES</h2>
            <h1 className="main-heading">Find a cause worth your time.</h1>
            <p className="sub-text">
                6 opportunities matching your search across 6 NGOs.
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
        </div>
    );
};

export default Opportunities;
