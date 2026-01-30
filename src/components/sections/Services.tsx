import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Code2,
  Smartphone,
  Database,
  Cloud,
  Palette,
  MessageSquare,
  Shield,
  Wrench,
  Globe,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description: "Full-stack development using MERN stack for scalable and robust applications.",
  },
  {
    icon: Smartphone,
    title: "Web & Mobile App Development",
    description: "Modern, responsive web applications and mobile apps built with cutting-edge technologies.",
  },
  {
    icon: Database,
    title: "ERP/CRM Solutions",
    description: "Streamline your business processes with custom ERP and CRM systems for better efficiency.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Services",
    description: "Migrate to cloud infrastructure and implement DevOps practices for scalable solutions.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Create intuitive and engaging user experiences with our expert design services.",
  },
  {
    icon: MessageSquare,
    title: "IT Consulting",
    description: "Strategic IT consulting to help your business leverage technology for competitive advantage.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Protect your digital assets with comprehensive cybersecurity solutions and best practices.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description: "Ongoing maintenance and technical support to keep your systems running smoothly.",
  },
  {
    icon: Globe,
    title: "Website Designing",
    description: "Professional website design services that combine aesthetics with functionality.",
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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

  return (
    <section id="services" className="section-padding bg-muted/50">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: hasReducedMotion ? 0 : 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: hasReducedMotion ? 0 : 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 0.1 }}
            className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: hasReducedMotion ? 0 : 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 0.2 }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Our Services in Software Development
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: hasReducedMotion ? 0 : 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Transform your ideas into a successful business.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: hasReducedMotion ? 0 : 50, scale: hasReducedMotion ? 1 : 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: hasReducedMotion ? 0 : 0.5, 
                delay: hasReducedMotion ? 0 : index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: hasReducedMotion ? 1 : 1.05, 
                y: hasReducedMotion ? 0 : -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: hasReducedMotion ? 1 : 0.98 }}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300 card-hover h-full"
            >
              <motion.div 
                initial={{ opacity: 0, rotate: hasReducedMotion ? 0 : -180 }}
                animate={isInView ? { opacity: 1, rotate: 0 } : {}}
                transition={{ 
                  duration: hasReducedMotion ? 0 : 0.6, 
                  delay: hasReducedMotion ? 0 : 0.2 + index * 0.1 
                }}
                className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:scale-110 transition-all duration-300"
              >
                <service.icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors" />
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, x: hasReducedMotion ? 0 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: hasReducedMotion ? 0 : 0.4, 
                  delay: hasReducedMotion ? 0 : 0.3 + index * 0.1 
                }}
                className="font-display text-lg font-semibold text-foreground mb-3"
              >
                {service.title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ 
                  duration: hasReducedMotion ? 0 : 0.4, 
                  delay: hasReducedMotion ? 0 : 0.4 + index * 0.1 
                }}
                className="text-muted-foreground text-sm leading-relaxed"
              >
                {service.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
