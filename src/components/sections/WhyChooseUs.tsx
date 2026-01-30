import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Target, Settings, Lightbulb, Clock } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Goal Oriented, ROI – Driven Focus",
    description: "Focused on achieving measurable results and maximizing your return on investment through strategic planning.",
  },
  {
    icon: Settings,
    title: "Streamlined Process",
    description: "Quality-driven workflows and agile methodologies ensuring efficient and timely project execution.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description: "Customized, cutting-edge technology solutions tailored to meet unique business challenges.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Commitment to meeting deadlines without compromising on quality or performance.",
  },
];

export function WhyChooseUs() {
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
    <section className="py-20 bg-card relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: hasReducedMotion ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: hasReducedMotion ? 0 : 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Partner with us for excellence in IT solutions and career-ready training
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: hasReducedMotion ? 0 : 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : index * 0.1 }}
              whileHover={{ scale: hasReducedMotion ? 1 : 1.05, y: hasReducedMotion ? 0 : -5 }}
              className="group p-6 bg-background rounded-2xl border border-border hover:border-accent/50 transition-all duration-300 card-hover h-full shadow-sm hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
