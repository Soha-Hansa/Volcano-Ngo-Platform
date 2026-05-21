import ScrollReveal from './ScrollReveal';
import './Testimonials.css';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: 'Volcano matched me with an NGO whose mission I deeply care about. Two hours a week, and I helped them ship a portal that doubled their donations.',
      author: 'Priya Sharma',
      role: 'Software Engineer · Volunteer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&fit=crop&crop=faces&auto=format&q=80'
    },
    {
      id: 2,
      quote: 'We found 14 incredible tutors in 3 weeks. The verification flow gave parents real confidence in our program.',
      author: 'Daniel Okoye',
      role: 'Founder · BrightFutures',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&fit=crop&crop=faces&auto=format&q=80'
    },
    {
      id: 3,
      quote: 'The matching is spookily good. Every opportunity I see feels handpicked for my skills and schedule.',
      author: 'Mei Lin',
      role: 'Product Designer · Volunteer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&fit=crop&crop=faces&auto=format&q=80'
    }
  ];

  return (
    <section className="testimonials-section" id="testimonials-section">
      <div className="testimonials-container">
        
        {/* Section Header */}
        <div className="testimonials-header">
          <h2 className="testimonials-title">
            Quiet conviction. <br />Loud impact.
          </h2>
        </div>

        {/* Testimonials Grid Wrapper */}
        <ScrollReveal className="testimonials-grid-wrapper">
          <div className="testimonials-grid">
            {testimonials.map((test, idx) => (
              <div
                key={test.id}
                className={`testimonial-card scroll-animate stagger-${idx + 1}`}
                id={`testimonial-card-${test.id}`}
              >
                {/* Quote Icon */}
                <div className="quote-icon-wrapper">
                  <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.5 0C9.5 0 11.5 1.5 11.5 4.5C11.5 8.5 7.5 12.5 5 15.5L3.5 14C5 12 7.5 9 7.5 6.5C7.5 5.5 7 5 6 5C5 5 3.5 5.5 2 4C0.5 2.5 0.5 0 2 0C3.5 0 5 0 6.5 0ZM21.5 0C24.5 0 26.5 1.5 26.5 4.5C26.5 8.5 22.5 12.5 20 15.5L18.5 14C20 12 22.5 9 22.5 6.5C22.5 5.5 22 5 21 5C20 5 18.5 5.5 17 4C15.5 2.5 15.5 0 17 0C18.5 0 20 0 21.5 0Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                
                {/* Quote Text */}
                <p className="testimonial-quote">"{test.quote}"</p>
                
                {/* Author Block */}
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src={test.avatar} alt={test.author} className="author-img" />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{test.author}</h4>
                    <p className="author-role">{test.role}</p>
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
