import ScrollReveal from './ScrollReveal';
import './Cta.css';

export default function Cta({ setPage = () => {} }) {
  return (
    <section className="cta-section" id="cta-section">
      <div className="cta-container">
        <ScrollReveal className="cta-reveal-wrapper">
          <div className="cta-card scroll-animate stagger-1">
            {/* Background decorative glows */}
            <div className="cta-glow-bg-1"></div>
            <div className="cta-glow-bg-2"></div>
            
            <div className="cta-content">
              {/* Badge */}
              <div className="cta-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 11l2 2 4-4"/>
                </svg>
                <span>Verified · Trusted · Free to join</span>
              </div>
              
              {/* Heading */}
              <h2 className="cta-heading">Start somewhere. Start today.</h2>
              
              {/* Description */}
              <p className="cta-desc">
                Your skills, time, and energy could change a life this month. It only takes 60 seconds to begin.
              </p>
              
              {/* CTA Buttons */}
              <div className="cta-buttons">
                <a
                  href="#"
                  className="btn-cta-primary"
                  id="cta-btn-get-started"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage('signup');
                  }}
                >
                  Get started free
                </a>
                <a
                  href="#"
                  className="btn-cta-secondary"
                  id="cta-btn-browse"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage('opportunities');
                  }}
                >
                  Browse opportunities
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
