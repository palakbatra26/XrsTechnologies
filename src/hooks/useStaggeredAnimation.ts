import { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";

export const useStaggeredAnimation = (staggerDelay: number = 0.1) => {
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());
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
    const observers = elements.map((element, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleElements(prev => new Set(prev).add(index));
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [elements]);

  const registerElement = (element: HTMLElement | null, index: number) => {
    if (element) {
      setElements(prev => {
        const newElements = [...prev];
        newElements[index] = element;
        return newElements;
      });
    }
  };

  const variants = {
    hidden: { opacity: 0, y: hasReducedMotion ? 0 : 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: hasReducedMotion ? 0 : 0.5,
        delay: hasReducedMotion ? 0 : index * staggerDelay,
        ease: "easeOut"
      }
    })
  };

  return { registerElement, variants, visibleElements, hasReducedMotion };
};
