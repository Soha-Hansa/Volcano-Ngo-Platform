import './Hero.css';

export default function Hero() {
  const avatars = [
    { id: 1, name: 'Sarah', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&crop=faces&auto=format&q=80' },
    { id: 2, name: 'David', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&crop=faces&auto=format&q=80' },
    { id: 3, name: 'Emily', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&crop=faces&auto=format&q=80' },
    { id: 4, name: 'Marcus', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&crop=faces&auto=format&q=80' },
    { id: 5, name: 'Chloe', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop&crop=faces&auto=format&q=80' },
  ];

  return (
    <section className="hero-section" id="hero-section">
      <div className="hero-container">
        
        {/* Left Content Column */}
        <div className="hero-content">
          {/* Trust Badge */}
          <div className="trust-badge" id="trust-badge">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="badge-sparkle"
            >
              <path
                d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z"
                fill="#0066cc"
              />
            </svg>
            <span className="badge-text">Trusted by 1,200+ NGOs worldwide</span>
          </div>

          {/* Heading */}
          <h1 className="hero-heading">
            Connect skills with <span className="gradient-text">social impact.</span>
          </h1>

          {/* Paragraph */}
          <p className="hero-description">
            Volcano is where talented volunteers meet verified NGOs. Match with causes you care about, contribute hours that count, and watch your impact grow — all in one calm, modern workspace.
          </p>

          {/* Action Buttons */}
          <div className="hero-actions">
            <button className="btn-primary" id="btn-join-volunteer">
              <span>Join as Volunteer</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="btn-arrow"
              >
                <path
                  d="M1 8H15M15 8L8 1M15 8L8 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            
            <button className="btn-secondary" id="btn-register-ngo">
              Register NGO
            </button>
          </div>

          {/* Social Proof */}
          <div className="social-proof" id="social-proof-section">
            <div className="avatar-pile">
              {avatars.map((avatar) => (
                <div key={avatar.id} className="avatar-circle">
                  <img src={avatar.url} alt={avatar.name} className="avatar-img" />
                </div>
              ))}
            </div>
            
            <div className="rating-info">
              <div className="stars-wrapper">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="star-icon"
                  >
                    <path
                      d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.29 16.2812L9 12.4377L3.71 16.2812L5.73056 10.0623L0.440492 6.21885H6.97938L9 0Z"
                      fill="#F59E0B"
                    />
                  </svg>
                ))}
              </div>
              <span className="rating-text">
                <strong>4.9</strong> from 8,000+ volunteers
              </span>
            </div>
          </div>
        </div>

        {/* Right Graphic Column */}
        <div className="hero-graphic-col">
          <div className="graphic-wrapper">
            {/* Background Radial Glow */}
            <div className="radial-glow"></div>
            
            {/* Large Orbit Line */}
            <div className="orbit-circle orbit-outer"></div>
            <div className="orbit-circle orbit-inner"></div>

            {/* Accent Floating Dots */}
            <div className="floating-dot dot-blue-1"></div>
            <div className="floating-dot dot-blue-2"></div>
            <div className="floating-dot dot-green"></div>

            {/* Back Card 1 (Top Left) */}
            <div className="floating-card card-top-left" id="card-tasks">
              <div className="card-header-row">
                <span className="card-dot blue-indicator"></span>
                <div className="card-lines">
                  <span className="line-long"></span>
                  <span className="line-short"></span>
                </div>
              </div>
            </div>

            {/* Back Card 2 (Bottom Right) */}
            <div className="floating-card card-bottom-right" id="card-progress">
              <div className="card-lines">
                <span className="line-medium"></span>
                <span className="line-short"></span>
              </div>
              <div className="progress-badge"></div>
            </div>

            {/* Foreground Main Gradient Circle */}
            <div className="main-gradient-circle-card" id="main-volcano-circle">
              <div className="people-icon-container">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="people-icon"
                >
                  {/* Three People SVG Icon */}
                  <path
                    d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                    fill="white"
                  />
                  <path
                    d="M6 14C3.79086 14 2 12.2091 2 10C2 7.79086 3.79086 6 6 6C8.20914 6 10 7.79086 10 10C10 12.2091 8.20914 14 6 14Z"
                    fill="white"
                    fillOpacity="0.7"
                  />
                  <path
                    d="M18 14C20.2091 14 22 12.2091 22 10C22 7.79086 20.2091 6 18 6C15.7909 6 14 7.79086 14 10C14 12.2091 15.7909 14 18 14Z"
                    fill="white"
                    fillOpacity="0.7"
                  />
                  <path
                    d="M12 14C8.68629 14 6 16.6863 6 20H18C18 16.6863 15.3137 14 12 14Z"
                    fill="white"
                  />
                  <path
                    d="M6 15.5C3.51472 15.5 1.5 17.5147 1.5 20H4.5C4.5 17.5147 5.17157 15.5 6 15.5Z"
                    fill="white"
                    fillOpacity="0.7"
                  />
                  <path
                    d="M18 15.5C18.8284 15.5 19.5 17.5147 19.5 20H22.5C22.5 17.5147 20.4853 15.5 18 15.5Z"
                    fill="white"
                    fillOpacity="0.7"
                  />
                </svg>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
