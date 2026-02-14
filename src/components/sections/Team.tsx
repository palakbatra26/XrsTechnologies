import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Linkedin, Twitter, Mail } from "lucide-react";

const team = [
  {
    name: "Mamta Panwar",
    role: "HR Manager",
    description:
      "Experienced HR Manager specializing in talent acquisition, employee relations, performance management, and building a positive organizational culture.",
    image: "/Mamtamam.jpeg",
    color: "from-blue-500 to-cyan-500",
  },
    {
    name: "Krishma Choudhary",
    role: "AI/ML Engineer",
    description:
      "AI/ML Engineer focused on developing intelligent models, data-driven solutions, and implementing machine learning algorithms for real-world applications.",
    image: "/krishma.jpeg",
    color: "from-blue-500 to-cyan-500",
  },
   {
    name: "Prince Singh ",
    role: "Cybersecurity Analyst",
    description:
      "Cybersecurity Analyst specializing in ethical hacking, penetration testing, threat detection, and securing systems against cyber attacks.",
    image: "/Prince.jpeg",
    color: "from-red-500 to-orange-500",
  },
   {
    name: "Shilpa Dhiman",
    role: "Senior Educational Counselor",
    description:
      "Senior Educational Counselor with expertise in student guidance, career planning, academic counseling, and helping learners make informed decisions.",
    image: "/shilpa.png",
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Nikita",
    role: "Education Counselor",
    description:
      "Education Counselor dedicated to assisting students with course selection, academic planning, and career-oriented guidance.",
    image: "/Nikita.jpeg",
    color: "from-accent to-orange-600",
  },

 
   {
    name: "Sanjana Verma",
    role: "System Engineer",
    description:
      "System Engineer responsible for managing system infrastructure, ensuring reliability, performance optimization, and smooth technical operations.",
    image: "/SJ.png",
    color: "from-green-500 to-emerald-500",
  },
   {
    name: "Palak Batra",
    role: "Software Engineer",
    description:
      "Software Engineer skilled in building scalable, efficient, and user-friendly applications with a strong focus on modern web technologies.",
    image: "/palakk.jpeg",
    color: "from-purple-500 to-pink-500",
  },
  
  {
    name: "Harsh Kaushal",
    role: "Junior Cybersecurity Analyst",
    description:
      "Junior Cybersecurity Analyst focused on monitoring security threats, performing vulnerability assessments, and supporting system security initiatives.",
    image: "/Harsh.jpeg",
    color: "from-accent to-orange-600",
  },
  

 

  {
    name: "Jashan Singh",
    role: "UI/UX designer",
    description:
      "UI/UX Designer passionate about creating meaningful digital experiences. I design clean, engaging, and easy-to-use interfaces that make products not just beautiful, but effortless to use." ,
       image: "/JASHAN SIR.jpeg",
    color: "from-purple-500 to-pink-500",
  },
];



export function Team() {
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
    <section id="team" className="section-padding bg-muted/50">
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
            Our Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: hasReducedMotion ? 0 : 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 0.2 }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Meet the Experts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: hasReducedMotion ? 0 : 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Backed up by the professional, young and expertise. The learning environment and innovative ideas cooperated by the team members emphasize the candidate to generate new ideas and up brings the career building opportunity to them.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: hasReducedMotion ? 0 : 50, scale: hasReducedMotion ? 1 : 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: hasReducedMotion ? 0 : 0.5, 
                delay: hasReducedMotion ? 0 : index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: hasReducedMotion ? 1 : 1.05, 
                y: hasReducedMotion ? 0 : -8,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: hasReducedMotion ? 1 : 0.98 }}
              className="group bg-card rounded-2xl p-6 border border-border text-center card-hover hover:shadow-lg transition-all duration-300 h-full"
            >
              {/* Avatar */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotate: hasReducedMotion ? 0 : -180 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ 
                  duration: hasReducedMotion ? 0 : 0.6, 
                  delay: hasReducedMotion ? 0 : 0.2 + index * 0.1 
                }}
                whileHover={{ scale: hasReducedMotion ? 1 : 1.1 }}
                className={`w-24 h-24 mx-auto mb-5 rounded-full bg-gradient-to-br ${member.color} p-1`}
              >
                <div className="w-full h-full rounded-full bg-muted overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top rounded-full"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </motion.div>

              <motion.h3 
                initial={{ opacity: 0, x: hasReducedMotion ? 0 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: hasReducedMotion ? 0 : 0.4, 
                  delay: hasReducedMotion ? 0 : 0.3 + index * 0.1 
                }}
                className="font-display text-xl font-semibold text-foreground mb-1"
              >
                {member.name}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ 
                  duration: hasReducedMotion ? 0 : 0.3, 
                  delay: hasReducedMotion ? 0 : 0.4 + index * 0.1 
                }}
                className="text-accent font-medium text-sm mb-3"
              >
                {member.role}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ 
                  duration: hasReducedMotion ? 0 : 0.4, 
                  delay: hasReducedMotion ? 0 : 0.5 + index * 0.1 
                }}
                className="text-muted-foreground text-sm mb-5 leading-relaxed"
              >
                {member.description}
              </motion.p>

              {/* Social Links */}
              <motion.div 
                initial={{ opacity: 0, y: hasReducedMotion ? 0 : 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: hasReducedMotion ? 0 : 0.3, 
                  delay: hasReducedMotion ? 0 : 0.6 + index * 0.1 
                }}
                className="flex justify-center gap-3"
              >
                {/* <motion.a
                  href="#"
                  whileHover={{ scale: hasReducedMotion ? 1 : 1.1, rotate: hasReducedMotion ? 0 : 5 }}
                  whileTap={{ scale: hasReducedMotion ? 1 : 0.9 }}
                  className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-accent" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: hasReducedMotion ? 1 : 1.1, rotate: hasReducedMotion ? 0 : 5 }}
                  whileTap={{ scale: hasReducedMotion ? 1 : 0.9 }}
                  className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-accent" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: hasReducedMotion ? 1 : 1.1, rotate: hasReducedMotion ? 0 : 5 }}
                  whileTap={{ scale: hasReducedMotion ? 1 : 0.9 }}
                  className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent" />
                </motion.a> */}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
