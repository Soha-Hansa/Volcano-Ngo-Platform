import { useEffect, useState, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import './Stats.css';

function Counter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let startTime = null;
    const startValue = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const rate = Math.min(progress / duration, 1);
      
      // Easing out quadratic
      const easeOutQuad = (t) => t * (2 - t);
      const easedRate = easeOutQuad(rate);
      
      const currentValue = Math.floor(startValue + easedRate * (end - startValue));
      setCount(currentValue);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return <span ref={elementRef}>{count.toLocaleString()}</span>;
}

export default function Stats() {
  const statsData = [
    { id: 'ngos', endVal: 1240, label: 'NGOs Registered' },
    { id: 'volunteers', endVal: 18500, label: 'Active Volunteers' },
    { id: 'campaigns', endVal: 3200, label: 'Successful Campaigns' },
    { id: 'lives', endVal: 420000, label: 'Lives Impacted' },
  ];

  return (
    <section className="stats-section" id="stats-section">
      <ScrollReveal className="stats-reveal-wrapper">
        <div className="stats-container">
          {statsData.map((stat, index) => (
            <div key={stat.id} className={`stat-card scroll-animate stagger-${index + 1}`} id={`stat-${stat.id}`}>
              <h2 className="stat-number">
                <Counter end={stat.endVal} />
                <span>+</span>
              </h2>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
