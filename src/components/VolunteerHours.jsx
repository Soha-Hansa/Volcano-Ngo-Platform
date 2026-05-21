import React from "react";
import "./VolunteerHours.css";

const VolunteerHours = () => {
  const data = [
    { month: "Aug", hours: 12 },
    { month: "Sep", hours: 18 },
    { month: "Oct", hours: 24 },
    { month: "Nov", hours: 30 },
    { month: "Dec", hours: 26 },
    { month: "Jan", hours: 38 },
    { month: "Feb", hours: 44 }
  ];

  // SVG parameters
  const height = 150;
  const width = 450;
  const paddingLeft = 35;
  const paddingBottom = 25;
  const chartHeight = height - paddingBottom;
  const chartWidth = width - paddingLeft;
  
  const maxHours = 50;

  return (
    <div className="volunteer-hours">
      <div className="hours-header">
        <div className="hours-header-text">
          <h3>Volunteer Activity</h3>
          <p className="trend-growth">
            <span className="trend-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
              +44%
            </span>
            <span>growth vs last 6 months</span>
          </p>
        </div>
        <div className="chart-legend">
          <span className="legend-dot"></span>
          <span>Hours / Month</span>
        </div>
      </div>

      <div className="chart-container">
        <svg width="100%" height="180" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00aaff" />
              <stop offset="100%" stopColor="#0066cc" />
            </linearGradient>
            <linearGradient id="activeBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 10, 20, 30, 40, 50].map((value, idx) => {
            const y = chartHeight - (value / maxHours) * chartHeight;
            return (
              <g key={idx} className="grid-line-group">
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width}
                  y2={y}
                  stroke="var(--border-color)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  fill="#64748b"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="'Outfit', sans-serif"
                >
                  {value}h
                </text>
              </g>
            );
          })}

          {/* Render Bars */}
          {data.map((item, idx) => {
            const barWidth = 32;
            const gap = (chartWidth - data.length * barWidth) / (data.length - 1);
            const x = paddingLeft + idx * (barWidth + gap);
            const barHeight = (item.hours / maxHours) * chartHeight;
            const y = chartHeight - barHeight;
            const isFeb = item.month === "Feb";

            return (
              <g key={idx} className="bar-group">
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="6"
                  fill={isFeb ? "url(#activeBarGradient)" : "url(#barGradient)"}
                  className="chart-bar"
                />
                
                {/* Hover value tooltip */}
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  fill={isFeb ? "#059669" : "#0052a3"}
                  fontSize="11"
                  fontWeight="600"
                  textAnchor="middle"
                  className="bar-value"
                  fontFamily="'Outfit', sans-serif"
                >
                  {item.hours}
                </text>

                {/* X Axis Label */}
                <text
                  x={x + barWidth / 2}
                  y={height - 5}
                  fill="#64748b"
                  fontSize="11"
                  textAnchor="middle"
                  fontFamily="'Outfit', sans-serif"
                >
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default VolunteerHours;
