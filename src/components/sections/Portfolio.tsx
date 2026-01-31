import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ShoppingCart, Smartphone, Database, Cloud } from "lucide-react";

const projects = [
  {
    icon: ShoppingCart,
    title: "E-commerce Platform",
    category: "Custom web application for online retail",
    image: "/Ecommerce.jpg",
  },
  {
    icon: Smartphone,
    title: "Mobile Banking App",
    category: "Secure mobile application for financial services",
    image: "/MobileApp.png",
  },
  {
    icon: Database,
    title: "ERP System",
    category: "Comprehensive business management solution",
    image: "/ERP.jpg",
  },
  {
    icon: Cloud,
    title: "Cloud Migration",
    category: "Infrastructure migration to AWS cloud",
    image: "/CloudMigration.jpg",
  },
];

const clients = [
  { name: "Apollo", logo: "/Apollo.png" },
  { name: "Nestle", logo: "/Nestle.png" },
  { name: "Westpac", logo: "/Westpac.png" },
  { name: "Yale", logo: "/Yale.png" },
  { name: "Real Estate", logo: "/RealEstate.png" },
  { name: "Xerox", logo: "/Xerox.png" },
  { name: "Microsoft", logo: "/microsoft.png" },
  { name: "Mahindra", logo: "/mahindra-logo.png" },
  { name: "Mercedes", logo: "/mercedes.jpg" },
  { name: "Ambuja", logo: "/Ambuja-logo.png" },
  { name: "Techwalk", logo: "/techwalk.jpg" },
  { name: "Madbrains", logo: "/madbrains.jpg" },
  { name: "Crownhills", logo: "/crownhills.jpg" },
  { name: "Parry's", logo: "/parrys.png" },
  { name: "Mphasis", logo: "/Mphasis.png" },
  { name: "Kellogs", logo: "/kelloggs.png" },
  { name: "Genpact", logo: "/genpact.png" },
  { name: "Bonn", logo: "/Bonn.png" },
];

export function Portfolio() {
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

  // Add CSS animation for horizontal scroll
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scrollHorizontal {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      
      .animate-scroll-horizontal {
        animation: scrollHorizontal 25s linear infinite;
      }
      
      .animate-scroll-horizontal:hover {
        animation-play-state: paused;
      }
      
      @media (prefers-reduced-motion: reduce) {
        .animate-scroll-horizontal {
          animation: none;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section id="portfolio" className="section-padding bg-background">
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
            Our Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: hasReducedMotion ? 0 : 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 0.2 }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Showcasing Our Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: hasReducedMotion ? 0 : 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Successful projects and client work that demonstrate our expertise
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: hasReducedMotion ? 0 : 50, scale: hasReducedMotion ? 1 : 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: hasReducedMotion ? 0 : 0.5, 
                delay: hasReducedMotion ? 0 : index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: hasReducedMotion ? 1 : 1.03, 
                y: hasReducedMotion ? 0 : -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: hasReducedMotion ? 1 : 0.98 }}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image Only - No White Background */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

                {/* Icon chip */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 text-foreground shadow-sm">
                  <project.icon className="h-4 w-4" />
                  <span className="text-xs font-semibold">Case Study</span>
                </div>

                {/* Content Overlay on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {project.category}
                  </p>

                  {/* Small badges */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                      Modern UI
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                      Scalable
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                      Secure
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trusted By */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-accent font-semibold uppercase tracking-wider text-sm mb-3">
            Trusted By
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
            Brands That Trust Our Work
          </h3>

          <div className="relative overflow-hidden mb-12">
            <div className="flex gap-8 animate-scroll-horizontal py-8">
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center flex-shrink-0"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
