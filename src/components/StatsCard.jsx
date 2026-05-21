import React from "react";
import "./StatsCard.css";

const StatsCard = ({ title, value, subtitle, icon }) => {
    return (
        <div className="stats-card">
            <div className="stats-card-header">
                <span className="stats-card-title">{title}</span>
                {icon && <span className="stats-card-icon">{icon}</span>}
            </div>
            <div className="stats-card-body">
                <p className="value">{value}</p>
                <p className="subtitle">{subtitle}</p>
            </div>
        </div>
    );
};

export default StatsCard;
