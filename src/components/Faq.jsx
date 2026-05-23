import { useState, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import './Faq.css';

function FaqItem({ question, answer, isOpen, onToggle, index }) {
  const contentRef = useRef(null);

  return (
    <div className={`faq-item scroll-animate stagger-${(index % 4) + 2} ${isOpen ? 'active' : ''}`} id={`faq-item-${index}`}>
      <div className="faq-item-glow"></div>
      <button
        className="faq-question-btn"
        onClick={onToggle}
        aria-expanded={isOpen}
        id={`faq-btn-${index}`}
      >
        <span className="faq-question-text">{question}</span>
        <span className="faq-toggle-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div
        className="faq-answer-wrapper"
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
          opacity: isOpen ? 1 : 0
        }}
        id={`faq-answer-${index}`}
      >
        <div className="faq-answer-content">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is Volcano?",
      answer: "Volcano is a digital matching platform that connects skilled professionals (developers, writers, designers, educators) with NGOs looking for volunteer talent. We bridge the gap between passion and professional expertise."
    },
    {
      question: "Is Volcano free to use?",
      answer: "Yes, Volcano is 100% free for both individual volunteers looking to make an impact and registered NGOs looking to scale their operations."
    },
    {
      question: "Can we post multiple campaigns at the same time?",
      answer: "Yes. NGOs can host and manage multiple campaigns simultaneously from their dashboard. You can track volunteer metrics, manage incoming applications, and update event timelines separately for each listing."
    },
    {
      question: "How do we communicate with volunteers?",
      answer: "Volcano provides a central message center in your NGO Dashboard where you can view applicant list profiles, invite selected volunteers to projects, and coordinate execution details seamlessly."
    },
    {
      question: "Is there a minimum hourly commitment?",
      answer: "No. Volcano is designed for flexibility. You can choose micro-projects (e.g., a 2-hour branding review) or long-term partnerships."
    },
    {
      question: "Is there a certificate of completion for the volunteer work?",
      answer: "Absolutely yes, after completing the work a certificate is sent to your Gmail."
    }
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq-section">
      <ScrollReveal className="faq-container">
        
        {/* FAQ Header */}
        <div className="faq-header scroll-animate stagger-1">
          <div className="faq-badge">
            <span>Support & Help</span>
          </div>
          <h2 className="faq-title">
            Frequently Asked Questions
          </h2>
          <p className="faq-subtitle">
            Got questions about how Volcano works? Find quick answers to common inquiries here.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-container">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={activeIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

      </ScrollReveal>
    </section>
  );
}
