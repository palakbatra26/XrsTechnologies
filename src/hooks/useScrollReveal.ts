import { useEffect, useState, useRef } from "react";
import { useAnimation } from "framer-motion";

export const useScrollReveal = () => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [view, setView] = useState(false);
  const controls = useAnimation();
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setHasReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setHasReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(currentElement);
    return () => observer.unobserve(currentElement);
  }, []);

  useEffect(() => {
    if (view) {
      controls.start('visible');
    }
  }, [view, controls]);

  const variants = {
    hidden: { opacity: 0, y: hasReducedMotion ? 0 : 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: hasReducedMotion ? 0 : 0.6,
        ease: "easeOut"
      }
    }
  };

  return { ref: elementRef, controls, variants, hasReducedMotion };
};
