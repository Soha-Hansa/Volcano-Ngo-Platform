import './Features.css';

export default function Features() {
  const featuresData = [
    {
      id: 1,
      title: 'Skill-Based Volunteering',
      description: 'Match your professional skills with causes that need them most — from design to data science.',
      iconColor: 'blue',
      // Sparkle SVG
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'NGO Opportunity Posting',
      description: 'NGOs publish opportunities in minutes with rich descriptions, requirements, and timelines.',
      iconColor: 'green',
      // Megaphone SVG
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.54 8.46C16.4774 9.39766 17.0041 10.6692 17.0041 11.995C17.0041 13.3208 16.4774 14.5923 15.54 15.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M19.07 4.93005C20.9447 6.80528 21.9979 9.34787 21.9979 12.0001C21.9979 14.6522 20.9447 17.1948 19.07 19.0701" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Smart Volunteer Matching',
      description: 'Our intelligent matchmaking surfaces the right people for every role automatically.',
      iconColor: 'purple',
      // Connection/Link/Smart Match SVG
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-6.555a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.1 1.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Real-Time Communication',
      description: 'Built-in messaging keeps volunteers and NGOs in sync without leaving the platform.',
      iconColor: 'teal',
      // Chat Message SVG
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 5,
      title: 'Verified NGO Profiles',
      description: 'Every NGO goes through a verification flow so volunteers can trust where their time goes.',
      iconColor: 'blue',
      // Shield SVG
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 11l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 6,
      title: 'Impact Tracking',
      description: 'Beautiful dashboards quantify hours, outcomes, and the lives every campaign has touched.',
      iconColor: 'green',
      // Trend Chart SVG
      iconSvg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <section className="features-section" id="features-section">
      <div className="features-container">
        
        {/* Heading Section */}
        <div className="features-header">
          <h2 className="features-title">
            Everything an NGO and a volunteer needs — <span className="gradient-text">nothing they don't.</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {featuresData.map((feature) => (
            <div key={feature.id} className="feature-card" id={`feature-card-${feature.id}`}>
              {/* Card Hover Glow Backdrops */}
              <div className={`card-glow-bg glow-${feature.iconColor}`}></div>
              
              <div className="feature-card-content">
                {/* Icon Wrapper */}
                <div className={`feature-icon-wrapper icon-color-${feature.iconColor}`}>
                  {feature.iconSvg}
                </div>
                
                {/* Text Content */}
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-desc">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
