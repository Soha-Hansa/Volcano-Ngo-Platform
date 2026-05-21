import ScrollReveal from './ScrollReveal';
import './HowItWorks.css';

export default function HowItWorks() {
  const steps = [
    {
      id: '01',
      title: 'Create your profile',
      description: 'Tell us about your skills, availability, and the causes you care about.'
    },
    {
      id: '02',
      title: 'Match with an NGO',
      description: 'Get curated opportunities or apply to ones that move you.'
    },
    {
      id: '03',
      title: 'Start volunteering',
      description: 'Coordinate, contribute, and watch your impact grow over time.'
    }
  ];

  return (
    <section className="how-it-works-section" id="how-it-works-section">
      <div className="how-it-works-container">
        
        {/* Section Header */}
        <div className="how-it-works-header">
          <span className="section-label">HOW IT WORKS</span>
          <h2 className="section-title">
            Three small steps. <br />One enormous outcome.
          </h2>
        </div>

        {/* Steps Cards Wrapper */}
        <ScrollReveal className="steps-reveal-wrapper">
          {/* Connector Line behind cards */}
          <div className="steps-connector-line"></div>

          <div className="steps-grid">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={`step-card scroll-animate stagger-${idx + 1}`}
                id={`step-card-${step.id}`}
              >
                {/* Step Number Badge */}
                <div className="step-number-badge">
                  <span>{step.id}</span>
                </div>
                
                {/* Step Text Content */}
                <h3 className="step-card-title">{step.title}</h3>
                <p className="step-card-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
