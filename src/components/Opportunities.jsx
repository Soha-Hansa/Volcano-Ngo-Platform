import ScrollReveal from './ScrollReveal';
import './Opportunities.css';

export default function Opportunities() {
  const opps = [
    {
      id: 1,
      ngo: 'Green Earth Initiative',
      role: 'Frontend Developer (Pro Bono)',
      type: 'Skill-based',
      skills: ['React', 'Tailwind', 'UI/UX'],
      hours: '6 hrs / week',
      location: 'Remote'
    },
    {
      id: 2,
      ngo: 'BrightFutures Foundation',
      role: 'English Tutor – Underserved Schools',
      type: 'On-ground',
      skills: ['Teaching', 'English', 'Empathy'],
      hours: '4 hrs / week',
      location: 'Mumbai, India'
    },
    {
      id: 3,
      ngo: 'OceanGuard',
      role: 'Beach Cleanup Coordinator',
      type: 'On-ground',
      skills: ['Logistics', 'Leadership'],
      hours: 'Weekends',
      location: 'Goa, India'
    },
    {
      id: 4,
      ngo: 'Hope Kitchen',
      role: 'Brand Designer',
      type: 'Skill-based',
      skills: ['Figma', 'Branding', 'Illustration'],
      hours: '8 hrs / week',
      location: 'Remote'
    },
    {
      id: 5,
      ngo: 'Animal Shelter Network',
      role: 'Weekend Caretaker',
      type: 'On-ground',
      skills: ['Animal Care', 'Compassion'],
      hours: 'Sat/Sun',
      location: 'Bengaluru, India'
    },
    {
      id: 6,
      ngo: 'CodeForKids',
      role: 'Workshop Facilitator',
      type: 'Skill-based',
      skills: ['Python', 'Teaching'],
      hours: '3 hrs / weekend',
      location: 'Remote'
    }
  ];

  return (
    <section className="opps-section" id="opps-section">
      <div className="opps-container">
        
        {/* Section Header */}
        <div className="opps-header">
          <div className="opps-title-group">
            <span className="section-label">LIVE OPPORTUNITIES</span>
            <h2 className="section-title">Find something worth your time.</h2>
          </div>
          <a href="#" className="see-all-link" id="see-all-opps">
            <span>See all</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Opportunities Grid Wrapper */}
        <ScrollReveal className="opps-grid-wrapper">
          <div className="opps-grid">
            {opps.map((opp, idx) => (
              <div
                key={opp.id}
                className={`opp-card scroll-animate stagger-${idx + 1}`}
                id={`opp-card-${opp.id}`}
              >
                {/* Top Info Row */}
                <div className="opp-card-header">
                  <span className="opp-ngo-name">{opp.ngo}</span>
                  <span className={`opp-type-badge type-${opp.type.toLowerCase().replace(' ', '-')}`}>
                    {opp.type}
                  </span>
                </div>
                
                {/* Role Title */}
                <h3 className="opp-role-title">{opp.role}</h3>
                
                {/* Skills Tags */}
                <div className="opp-skills-tags">
                  {opp.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-tag">{skill}</span>
                  ))}
                </div>
                
                {/* Card Footer Details */}
                <div className="opp-card-footer">
                  <div className="footer-detail-item">
                    {/* Clock Icon */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>{opp.hours}</span>
                  </div>
                  
                  <div className="footer-detail-item">
                    {/* Location Pin Icon */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{opp.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
