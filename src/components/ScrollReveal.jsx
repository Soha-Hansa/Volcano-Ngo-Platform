import { useEffect, useRef, useState } from 'react';
import './ScrollReveal.css';

export default function ScrollReveal({ children, className = '' }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} ${inView ? 'in-view' : ''}`}>
      {children}
    </div>
  );
}
