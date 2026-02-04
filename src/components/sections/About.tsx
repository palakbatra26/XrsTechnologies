import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Target, Lightbulb, Shield, Heart, Linkedin, Award, Users, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  { icon: Target, text: "Excellence in everything we do" },
  { icon: Lightbulb, text: "Innovation and continuous improvement" },
  { icon: Shield, text: "Integrity and transparency" },
  { icon: Heart, text: "Customer satisfaction" },
];

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "500+", label: "Students Trained" },
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
];

const achievements = [
  { icon: Award, text: "ISO 9001:2015 Certified" },
  { icon: Users, text: "500+ Students Trained" },
  { icon: Zap, text: "100+ Projects Delivered" },
  { icon: Star, text: "5+ Years Excellence" },
];

export function About() {
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
    <section id="about" className="bg-background py-0">
      <div className="section-container" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: hasReducedMotion ? 0 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: hasReducedMotion ? 0 : 0.8, ease: "easeOut" }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 0.1 }}
              className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4"
            >
              About Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: hasReducedMotion ? 0 : 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: hasReducedMotion ? 0 : 0.6, delay: hasReducedMotion ? 0 : 0.2 }}
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6"
            >
              Who We Are
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: hasReducedMotion ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 0.3 }}
              className="text-muted-foreground mb-6 leading-relaxed"
            >
              Born in 2016, Vpro Tech Digital  is a forward looking company focused on software, solution and innovative ideas that are required for 21st century. As an institution being a pioneer in courses that is gave birth to , vprotech digital offers different job practices oriented trainings from different streams including mechanical, civil, electronics and computer science engineering with placement tie ups all over the country.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: hasReducedMotion ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 0.4 }}
              className="text-muted-foreground mb-8 leading-relaxed"
            >
              Under the 9001:2015 ISO Certification, we offer you standardize trainings and personality development sessions that helps building the mindset and vision of the students for their bright future.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: hasReducedMotion ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 0.5 }}
            >
              <motion.h3 
                initial={{ opacity: 0, x: hasReducedMotion ? 0 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 0.6 }}
                className="font-display text-xl font-semibold text-foreground mb-3"
              >
                Our Philosophy
              </motion.h3>
              <motion.ul 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: hasReducedMotion ? 0 : 0.6, delay: hasReducedMotion ? 0 : 0.7 }}
                className="space-y-2 text-muted-foreground text-sm"
              >
                {[/* eslint-disable max-len */
                  "To impart hardcore practical quality training among students/developers about latest technologies trending today.",
                  "To share knowledge of information security and create awareness in the market. The solution to clients' as per the International standard practices and governance.",
                  "To support good business practices through continual employee training and education.",
                  "To equip a local team with a strong knowledge of international best practices and international expert support so as to provide practical advisories in the best interests of our clients."
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: hasReducedMotion ? 0 : -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: hasReducedMotion ? 0 : 0.3, delay: hasReducedMotion ? 0 : 0.8 + index * 0.1 }}
                    className="flex gap-2"
                  >
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: hasReducedMotion ? 0 : 0.3, delay: hasReducedMotion ? 0 : 0.8 + index * 0.1 }}
                      className="text-accent"
                    >✓</motion.span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: hasReducedMotion ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 1.1 }}
            >
              <motion.h3 
                initial={{ opacity: 0, x: hasReducedMotion ? 0 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 1.2 }}
                className="font-display text-xl font-semibold text-foreground mb-3"
              >
                Vision
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: hasReducedMotion ? 0 : 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 1.3 }}
                className="text-muted-foreground text-sm"
              >
                Our motto is to provide excellent opportunities that are responsible to fulfil the needs of student and empower them to meet challenges as an active participant in shaping the future of the world.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: hasReducedMotion ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 1.4 }}
            >
              <motion.h3 
                initial={{ opacity: 0, x: hasReducedMotion ? 0 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 1.5 }}
                className="font-display text-xl font-semibold text-foreground mb-3"
              >
                Our Mission
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: hasReducedMotion ? 0 : 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 1.6 }}
                className="text-muted-foreground text-sm mb-2"
              >
                Is to cultivate the creativity and sensibility with increases passion for learning in all sorts. We foster the career and academic success through the development of critical thinking, effective communication, accessible and affordable learning environment that leads to the successful completion of certified courses.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 1.7 }}
                className="text-accent font-medium text-sm"
              >
                We embraces equity and accountability learning outcomes that's might be called as "YOUR FUTURE OUR MISSION"
              </motion.p>
            </motion.div>

            {/* Values */}
            <motion.div 
              initial={{ opacity: 0, y: hasReducedMotion ? 0 : 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 1.8 }}
              className="mb-8"
            >
              <motion.h3 
                initial={{ opacity: 0, x: hasReducedMotion ? 0 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 1.9 }}
                className="font-display text-xl font-semibold text-foreground mb-4"
              >
                Our Values
              </motion.h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Target, text: "To strengthen student" },
                  { icon: Shield, text: "Excellence" },
                  { icon: Heart, text: "Collaboration" },
                  { icon: Lightbulb, text: "Technical advancement" }
                ].map((value, index) => (
                  <motion.div
                    key={value.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: hasReducedMotion ? 0 : 0.3, delay: hasReducedMotion ? 0 : 2.0 + index * 0.1 }}
                    whileHover={{ scale: hasReducedMotion ? 1 : 1.05, x: hasReducedMotion ? 0 : 5 }}
                    className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <motion.div 
                      initial={{ rotate: hasReducedMotion ? 0 : -180 }}
                      animate={isInView ? { rotate: 0 } : {}}
                      transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 2.0 + index * 0.1 }}
                      className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"
                    >
                      <value.icon className="w-4 h-4 text-accent" />
                    </motion.div>
                    <span className="text-sm text-foreground/80">{value.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: hasReducedMotion ? 0 : 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 2.4 }}
              className="grid grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5, rotate: hasReducedMotion ? 0 : -45 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 2.5 + index * 0.1 }}
                  whileHover={{ scale: hasReducedMotion ? 1 : 1.1, y: hasReducedMotion ? 0 : -5 }}
                  className="text-center p-3 bg-muted rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: hasReducedMotion ? 0 : 0.3, delay: hasReducedMotion ? 0 : 2.8 + index * 0.1 }}
                    className="text-2xl font-bold text-accent"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Founder Card */}
          <motion.div
            initial={{ opacity: 0, x: hasReducedMotion ? 0 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: hasReducedMotion ? 0 : 0.8, delay: hasReducedMotion ? 0 : 0.3 }}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: hasReducedMotion ? 1 : 1.02 }}
              transition={{ duration: hasReducedMotion ? 0 : 0.3 }}
            >
              {/* Animated background glow */}
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-accent/30 via-primary/20 to-orange-500/30 rounded-3xl blur-2xl"
                animate={{
                  background: hasReducedMotion ? "from-accent/30 via-primary/20 to-orange-500/30" : [
                    "from-accent/30 via-primary/20 to-orange-500/30",
                    "from-orange-500/30 via-accent/30 to-primary/20",
                    "from-primary/20 via-orange-500/30 to-accent/30",
                    "from-accent/30 via-primary/20 to-orange-500/30"
                  ]
                }}
                transition={{ 
                  duration: hasReducedMotion ? 0 : 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              {/* Main card */}
              <motion.div 
                initial={{ opacity: 0, rotateY: hasReducedMotion ? 0 : 15 }}
                animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
                transition={{ duration: hasReducedMotion ? 0 : 0.8, delay: hasReducedMotion ? 0 : 0.4 }}
                className="relative bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm rounded-3xl p-8 border border-border shadow-2xl overflow-hidden"
              >
                {/* Decorative elements */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 0.6 }}
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl"
                />
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 0.7 }}
                  className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl"
                />

                <div className="relative z-10">
                  <motion.div 
                    initial={{ opacity: 0, y: hasReducedMotion ? 0 : -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 0.5 }}
                    className="text-center mb-6"
                  >
                    <motion.span 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 0.6 }}
                      className="inline-block text-sm text-accent font-semibold uppercase tracking-wider px-4 py-2 bg-accent/10 rounded-full"
                    >
                      Meet Our Founder
                    </motion.span>
                  </motion.div>

                  {/* Founder Image with enhanced animation */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, rotate: hasReducedMotion ? 0 : -180 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ duration: hasReducedMotion ? 0 : 0.8, delay: hasReducedMotion ? 0 : 0.7 }}
                    whileHover={{ scale: hasReducedMotion ? 1 : 1.05, rotate: hasReducedMotion ? 0 : 5 }}
                    className="w-40 h-40 mx-auto mb-6 relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent via-orange-500 to-primary rounded-full p-1 animate-pulse-slow">
                      <div className="w-full h-full bg-card rounded-full p-1">
                        <img
                          src="/RajatKumar.png"
                          alt="Palak Batra"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Floating particles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-accent rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { 
                          opacity: [0, 1, 0], 
                          scale: [0, 1, 0],
                          y: [0, -20, -40],
                          x: [0, i === 0 ? -10 : i === 1 ? 10 : 0, i === 0 ? -20 : i === 1 ? 20 : 0]
                        } : {}}
                        transition={{ 
                          duration: hasReducedMotion ? 0 : 2, 
                          repeat: Infinity, 
                          delay: hasReducedMotion ? 0 : 0.8 + i * 0.3,
                          ease: "easeOut"
                        }}
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    ))}
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: hasReducedMotion ? 0 : 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 0.9 }}
                    className="text-center"
                  >
                    <motion.h3 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 1.0 }}
                      className="font-display text-2xl font-bold text-foreground mb-1"
                    >
                      Palak Batra
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 1.1 }}
                      className="text-accent font-medium mb-4"
                    >
                      Founder & CEO
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: hasReducedMotion ? 0 : 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 1.2 }}
                      className="text-muted-foreground text-sm mb-6"
                    >
                      Technology visionary with over 10 years of experience in software development and IT training.
                    </motion.p>
                    
                    {/* Achievement badges */}
                    <motion.div 
                      initial={{ opacity: 0, y: hasReducedMotion ? 0 : 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 1.3 }}
                      className="flex flex-wrap justify-center gap-2 mb-6"
                    >
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={achievement.text}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: hasReducedMotion ? 0 : 0.3, delay: hasReducedMotion ? 0 : 1.4 + index * 0.1 }}
                          whileHover={{ scale: hasReducedMotion ? 1 : 1.05 }}
                          className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full text-xs"
                        >
                          <achievement.icon className="w-3 h-3 text-accent" />
                          <span className="text-foreground/70">{achievement.text}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Social links */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 1.6 }}
                      className="flex justify-center gap-3"
                    >
                      <motion.a
                        href="#"
                        whileHover={{ scale: hasReducedMotion ? 1 : 1.1, rotate: hasReducedMotion ? 0 : 5 }}
                        whileTap={{ scale: hasReducedMotion ? 1 : 0.9 }}
                        className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-accent" />
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
