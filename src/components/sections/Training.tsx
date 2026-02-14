import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Code2, Shield, Network, PenTool, Brain, Megaphone, Palette, Smartphone, Cloud, Clock, Briefcase, Award, Banknote, Wrench, Cpu, Building2, CircuitBoard, Radio, Monitor, Database, X, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const categories = ["All", "CSE/IT", "Mechanical", "Civil", "ECE/Electrical"];
const durationLabel = "1 Month / 45 Days / 6 Months";

const programs = [
  {
    category: "CSE/IT",
    icon: Brain,
    title: "AI/ML/Python",
    description: "Learn machine learning fundamentals, model building, and real-world AI applications using modern tools.",
    duration: "1/45 Days/6 Months",
    color: "from-sky-500 to-indigo-500",
    backgroundImage: "/AI.jpg",
    skills: ["Python", "Machine Learning", "Data Science", "Model Deployment", "TensorFlow"],
    projects: "12+ AI Projects"
  },
  {
    category: "CSE/IT",
    icon: Code2,
    title: "Web Development",
    description: "Master React, Node.js, MongoDB & modern web technologies. Build real-world projects from e-commerce to social platforms.",
    duration: "1/45 Days/6 Months",
    color: "from-blue-500 to-cyan-500",
    backgroundImage: "/webdev.jpg",
    skills: ["React", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS"],
    projects: "15+ Live Projects"
  },
  {
  category: "CSE/IT",
  icon: Shield,
  title: "Cybersecurity & Defense",
  description: "Build strong foundations in cybersecurity, including threat detection, risk management, and system protection. Learn how to defend networks and data from real-world cyber attacks.",
  duration: "1/45 Days/6 Months",
  color: "from-red-500 to-orange-500",
  backgroundImage: "/cyber.png",
  skills: ["Network Security","Threat Analysis","Kali Linux","Wireshark", "Security Auditing"],
  projects: "20+ Security Audits"
},
{
  category: "CSE/IT",
  icon: Bug,
  title: "Ethical Hacking & Penetration Testing",
  description: "Learn how ethical hackers identify vulnerabilities, perform penetration tests, and secure applications using industry-standard tools and methodologies.",
  duration: "1/45 Days/6 Months",
  color: "from-amber-500 to-orange-600",
  backgroundImage: "/cyber.png",
  skills: ["Nmap Scanning","OWASP Top 10", "Burp Suite","Metasploit","Vulnerability Assessment"],
  projects: "15+ Hands-on Security Labs"
}
,
  {
    category: "CSE/IT",
    icon: Network,
    title: "Networking",
    description: "Master CCNA, network protocols, routing & switching. Design and manage enterprise network infrastructure.",
    duration: "1/45 Days/6 Months",
    color: "from-green-500 to-emerald-500",
    backgroundImage: "/Networking.jpg",
    skills: ["CCNA", "TCP/IP", "Router Configuration", "Firewall Management", "VPN"],
    projects: "10+ Network Designs"
  },
  {
    category: "CSE/IT",
    icon: Cloud,
    title: "Cloud Computing",
    description: "Understand cloud architecture, deployment, and management using leading cloud platforms.",
    duration: "1/45 Days/6 Months",
    color: "from-cyan-500 to-sky-500",
    backgroundImage: "/CloudMigration.jpg",
    skills: ["AWS", "Azure", "Cloud Security", "DevOps", "Scalability"],
    projects: "12+ Cloud Deployments"
  },
  {
    category: "CSE/IT",
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Master SEO, social media, performance ads, and analytics to grow brands and generate leads.",
    duration: "1/45 Days/6 Months",
    color: "from-orange-500 to-amber-500",
    backgroundImage: "/Ecommerce.jpg",
    skills: ["SEO", "Social Media", "Google Ads", "Content Strategy", "Analytics"],
    projects: "18+ Campaigns"
  },
  {
    category: "CSE/IT",
    icon: Palette,
    title: "Graphic Designing",
    description: "Create stunning visuals with design principles, typography, and industry-standard tools.",
    duration: "1/45 Days/6 Months",
    color: "from-fuchsia-500 to-rose-500",
    backgroundImage: "/Graphic.png",
    skills: ["Photoshop", "Illustrator", "Typography", "Branding", "UI Design"],
    projects: "20+ Design Projects"
  },
  {
    category: "CSE/IT",
    icon: Smartphone,
    title: "Android Development",
    description: "Build modern Android apps using Kotlin, Jetpack, and real-world app architecture patterns.",
    duration: "1/45 Days/6 Months",
    color: "from-emerald-500 to-teal-500",
    backgroundImage: "/MobileApp.png",
    skills: ["Kotlin", "Jetpack", "Firebase", "API Integration", "UI/UX"],
    projects: "15+ Mobile Apps"
  },
  //  {
  //   category: "Mechanical",
  //   icon: PenTool,
  //   title: "AutoCAD",
  //   description: "Professional 2D/3D drafting, architectural design & engineering modeling. Industry-standard CAD training.",
  //   duration: "6 Months",
  //   color: "from-purple-500 to-pink-500",
  //   backgroundImage: "/autocad.jpg",
  //   skills: ["2D Drafting", "3D Modeling", "Architectural Design", "Mechanical Design", "Rendering"],
  //   projects: "25+ Design Projects"
  // },
  {
    category: "CSE/IT",
    icon: Code2,
    title: "C/C++ Programming",
    description: "Master programming fundamentals, data structures, and system-level coding with C and C++.",
    duration: "1/45 Days/6 Months",
    color: "from-slate-500 to-sky-600",
    backgroundImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    skills: ["C", "C++", "DSA", "Pointers", "OOP"],
    projects: "10+ Core Projects"
  },
  {
    category: "CSE/IT",
    icon: Monitor,
    title: "Java",
    description: "Build robust backend applications with Java, OOP concepts, and enterprise-ready tooling.",
    duration: "1/45 Days/6 Months",
    color: "from-amber-500 to-red-500",
    backgroundImage: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
    skills: ["Java", "OOP", "Spring Basics", "JDBC", "Collections"],
    projects: "12+ Java Apps"
  },
  {
    category: "CSE/IT",
    icon: Database,
    title: "PHP & MySQL",
    description: "Learn server-side scripting, database design, and build dynamic web applications.",
    duration: "1/45 Days/6 Months",
    color: "from-indigo-500 to-blue-600",
    backgroundImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
    skills: ["PHP", "MySQL", "CRUD", "APIs", "Auth"],
    projects: "10+ Web Apps"
  },
  {
    category: "CSE/IT",
    icon: Code2,
    title: "PHP Laravel",
    description: "Develop modern web apps with Laravel, MVC architecture, and best practices.",
    duration: "1/45 Days/6 Months",
    color: "from-red-500 to-rose-500",
    backgroundImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    skills: ["Laravel", "MVC", "Eloquent", "REST API", "Blade"],
    projects: "8+ Laravel Projects"
  },
  {
    category: "CSE/IT",
    icon: Code2,
    title: "JavaScript",
    description: "Learn modern JavaScript, DOM, and build interactive web applications.",
    duration: "1/45 Days/6 Months",
    color: "from-yellow-400 to-amber-500",
    backgroundImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    skills: ["ES6+", "DOM", "Async JS", "APIs", "Tooling"],
    projects: "10+ JS Projects"
  },
  {
    category: "CSE/IT",
    icon: Cpu,
    title: "IOT Training",
    description: "Build connected devices, sensors, and smart applications with IoT platforms.",
    duration: "1/45 Days/6 Months",
    color: "from-green-500 to-teal-500",
    backgroundImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    skills: ["Sensors", "Arduino", "ESP32", "MQTT", "Cloud IoT"],
    projects: "8+ IoT Builds"
  },
  {
    category: "CSE/IT",
    icon: Brain,
    title: "Data Science",
    description: "Analyze data, build predictive models, and create insightful dashboards.",
    duration: "1/45 Days/6 Months",
    color: "from-cyan-500 to-indigo-500",
    backgroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    skills: ["Python", "Pandas", "ML", "Visualization", "Statistics"],
    projects: "10+ DS Projects"
  },
  {
    category: "Mechanical",
    icon: Wrench,
    title: "SolidWorks",
    description: "Design mechanical parts and assemblies with advanced 3D CAD workflows.",
    duration: "1/45 Days/6 Months",
    color: "from-slate-500 to-gray-700",
    backgroundImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    skills: ["3D Modeling", "Assemblies", "Drafting", "Simulation", "Manufacturing"],
    projects: "15+ CAD Models"
  },
  {
    category: "Mechanical",
    icon: Wrench,
    title: "CATIA",
    description: "Industry-grade surface and product design training for automotive and aerospace workflows.",
    duration: "1/45 Days/6 Months",
    color: "from-blue-500 to-indigo-600",
    backgroundImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    skills: ["Surface Design", "Part Design", "Assembly", "Drafting", "Rendering"],
    projects: "12+ Product Models"
  },
  {
    category: "Mechanical",
    icon: Wrench,
    title: "PRO-E / CREO",
    description: "Parametric modeling, assemblies, and manufacturing-ready designs.",
    duration: "1/45 Days/6 Months",
    color: "from-orange-500 to-red-600",
    backgroundImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    skills: ["Parametric Design", "Sheet Metal", "Assemblies", "GD&T", "Drafting"],
    projects: "10+ Mechanical Models"
  },
  {
    category: "Mechanical",
    icon: Wrench,
    title: "CNC Programming",
    description: "Learn G-code, tooling, and machining processes for CNC manufacturing.",
    duration: "1/45 Days/6 Months",
    color: "from-emerald-500 to-green-600",
    backgroundImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    skills: ["G-Code", "Tooling", "CAM", "Machining", "Setup"],
    projects: "8+ CNC Jobs"
  },
  {
    category: "Mechanical",
    icon: Wrench,
    title: "ANSYS",
    description: "Structural, thermal, and CFD analysis with real-world simulations.",
    duration: "1/45 Days/6 Months",
    color: "from-purple-500 to-fuchsia-600",
    backgroundImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    skills: ["FEA", "CFD", "Thermal", "Structural", "Meshing"],
    projects: "12+ Simulations"
  },
  {
    category: "Mechanical",
    icon: Wrench,
    title: "Inventor / Fusion",
    description: "Product design, CAM workflows, and prototyping with Autodesk tools.",
    duration: "1/45 Days/6 Months",
    color: "from-sky-500 to-blue-600",
    backgroundImage: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=80",
    skills: ["Fusion 360", "CAM", "3D Modeling", "Simulation", "Rendering"],
    projects: "10+ Product Designs"
  },
  {
    category: "Civil",
    icon: Building2,
    title: "Revit",
    description: "BIM modeling for architecture, structural, and MEP workflows.",
    duration: "1/45 Days/6 Months",
    color: "from-teal-500 to-cyan-600",
    backgroundImage: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80",
    skills: ["BIM", "Architecture", "MEP", "Documentation", "Families"],
    projects: "12+ BIM Models"
  },
  {
    category: "Civil",
    icon: Building2,
    title: "3DS Max",
    description: "Create realistic architectural visualizations and walkthroughs.",
    duration: "1/45 Days/6 Months",
    color: "from-rose-500 to-pink-600",
    backgroundImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    skills: ["Modeling", "Rendering", "V-Ray", "Textures", "Animation"],
    projects: "10+ Visualizations"
  },
  {
    category: "Civil",
    icon: Building2,
    title: "Google SketchUp",
    description: "Fast 3D modeling for architectural concepts and client presentations.",
    duration: "1/45 Days/6 Months",
    color: "from-amber-500 to-orange-500",
    backgroundImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    skills: ["Concept Modeling", "Layouts", "Components", "Plugins", "Rendering"],
    projects: "8+ Concepts"
  },
  {
    category: "Civil",
    icon: Building2,
    title: "ETABS",
    description: "Structural analysis and design for buildings and infrastructure.",
    duration: "1/45 Days/6 Months",
    color: "from-slate-500 to-gray-700",
    backgroundImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    skills: ["Structural Analysis", "Load Combinations", "Design", "Codes", "Modeling"],
    projects: "8+ Structural Models"
  },
  {
    category: "Civil",
    icon: Building2,
    title: "Primavera",
    description: "Project scheduling and planning for large-scale construction projects.",
    duration: "1/45 Days/6 Months",
    color: "from-indigo-500 to-purple-600",
    backgroundImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    skills: ["Scheduling", "Resource Planning", "Cost Control", "Reporting", "Baselines"],
    projects: "6+ Project Plans"
  },
  {
    category: "ECE/Electrical",
    icon: CircuitBoard,
    title: "Embedded Systems",
    description: "Design microcontroller-based systems with real-time applications.",
    duration: "1/45 Days/6 Months",
    color: "from-emerald-500 to-lime-500",
    backgroundImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    skills: ["Microcontrollers", "C", "RTOS", "Sensors", "Peripherals"],
    projects: "10+ Embedded Builds"
  },
  {
    category: "ECE/Electrical",
    icon: Radio,
    title: "Automation",
    description: "Learn PLCs, SCADA basics, and industrial automation control systems.",
    duration: "1/45 Days/6 Months",
    color: "from-cyan-500 to-blue-600",
    backgroundImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    skills: ["PLC", "SCADA", "Sensors", "Control Systems", "HMI"],
    projects: "8+ Automation Labs"
  },
  {
    category: "ECE/Electrical",
    icon: Cpu,
    title: "MATLAB",
    description: "Simulate systems, analyze data, and build engineering models with MATLAB.",
    duration: "1/45 Days/6 Months",
    color: "from-orange-500 to-yellow-500",
    backgroundImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    skills: ["Simulation", "Signal Processing", "Control", "Modeling", "Scripting"],
    projects: "10+ MATLAB Models"
  },
  {
    category: "ECE/Electrical",
    icon: CircuitBoard,
    title: "VLSI Training",
    description: "Chip design fundamentals, RTL design, and verification basics.",
    duration: "1/45 Days/6 Months",
    color: "from-purple-500 to-indigo-600",
    backgroundImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    skills: ["Digital Design", "Verilog", "Timing", "Synthesis", "EDA"],
    projects: "6+ Chip Labs"
  },
  {
    category: "ECE/Electrical",
    icon: CircuitBoard,
    title: "Robotics",
    description: "Build robotic systems with sensors, actuators, and control logic.",
    duration: "1/45 Days/6 Months",
    color: "from-rose-500 to-red-600",
    backgroundImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    skills: ["Sensors", "Actuators", "Control", "Embedded", "Automation"],
    projects: "8+ Robotics Builds"
  },
  {
    category: "ECE/Electrical",
    icon: Network,
    title: "Networking",
    description: "Routing, switching, and industrial network configuration for smart systems.",
    duration: "1/45 Days/6 Months",
    color: "from-green-500 to-emerald-600",
    backgroundImage: "/Networking.jpg",
    skills: ["Routing", "Switching", "Protocols", "Security", "Monitoring"],
    projects: "8+ Network Labs"
  }
];

const features = [
  { icon: Briefcase, title: "Live Projects", description: "Hands-on experience with real-world projects" },
  { icon: Banknote, title: "Internship with Stipend", description: "Earn while you learn" },
  { icon: Award, title: "Certification", description: "Industry-recognized certifications" },
  { icon: Clock, title: "Placement Assistance", description: "100% placement support" },
];

export function Training() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  const [expandedSkills, setExpandedSkills] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProgram, setSelectedProgram] = useState<(typeof programs)[number] | null>(null);
  const [enrollProgram, setEnrollProgram] = useState<(typeof programs)[number] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [enrollForm, setEnrollForm] = useState({
    name: "",
    className: "",
    address: "",
    contact: "",
    email: "",
    durationPreference: "",
    courseInterest: "",
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setHasReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setHasReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleEnrollSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!enrollProgram) return;
    if (!enrollForm.durationPreference) {
      toast({
        title: "Select Duration",
        description: "Please choose 1 month, 45 days, or 6 months before submitting.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", enrollForm.name);
      formDataToSend.append("class", enrollForm.className);
      formDataToSend.append("address", enrollForm.address);
      formDataToSend.append("contact", enrollForm.contact);
      formDataToSend.append("email", enrollForm.email);
      formDataToSend.append("duration", enrollForm.durationPreference);
      formDataToSend.append("course", enrollProgram.title);
      formDataToSend.append("category", enrollProgram.category);
      formDataToSend.append("courseInterest", enrollForm.courseInterest);
      formDataToSend.append("type", "Training Enrollment");
      formDataToSend.append("_subject", `New Training Enrollment - ${enrollProgram.title}`);
      formDataToSend.append("_replyto", enrollForm.email);
      formDataToSend.append("_honey", "");
      formDataToSend.append("_template", "table");

      const response = await fetch("https://formsubmit.co/ajax/palakbatra79@gmail.com", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit enrollment");
      }

      toast({
        title: "Enrollment Submitted",
        description: `Thanks! We'll contact you soon about ${enrollProgram.title}.`,
      });
      setEnrollForm({ name: "", className: "", address: "", contact: "", email: "", durationPreference: "", courseInterest: "" });
      setEnrollProgram(null);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="training" className="section-padding bg-background">
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
            Training Programs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: hasReducedMotion ? 0 : 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: hasReducedMotion ? 0 : 0.5, delay: hasReducedMotion ? 0 : 0.2 }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Industry-Ready Training
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: hasReducedMotion ? 0 : 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: hasReducedMotion ? 0 : 0.4, delay: hasReducedMotion ? 0 : 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Kickstart your IT career with hands-on training from industry experts
          </motion.p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "heroPrimary" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full px-5"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Programs Carousel */}
        <Carousel
          opts={{ align: "start", loop: false }}
          className="mb-16 overflow-visible"
        >
          <CarouselContent className="-ml-3 md:-ml-4 overflow-visible items-stretch" style={{ alignItems: "stretch" }}>
            {(selectedCategory === "All"
              ? programs
              : programs.filter((program) => program.category === selectedCategory)
            ).map((program, index) => (
              <CarouselItem
                key={program.title}
                className="basis-[85%] sm:basis-2/3 lg:basis-1/3 xl:basis-1/4 pl-3 md:pl-4 h-full flex"
                style={{ alignSelf: "stretch" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: hasReducedMotion ? 0 : 50, scale: hasReducedMotion ? 1 : 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: hasReducedMotion ? 0 : 0.5, 
                    delay: hasReducedMotion ? 0 : index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: hasReducedMotion ? 1 : 1.05, 
                    y: hasReducedMotion ? 0 : -10,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: hasReducedMotion ? 1 : 0.98 }}
                  onClick={() => setSelectedProgram(program)}
                  className="group relative bg-card rounded-2xl p-6 w-full h-full border border-white/10 overflow-hidden card-hover shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
                  style={{ height: "520px" }}
                >
                  {/* Background Image with Animation */}
                  <motion.div 
                    className="absolute inset-0 opacity-20 group-hover:opacity-100 transition-all duration-700"
                    initial={{ scale: hasReducedMotion ? 1 : 1.3 }}
                    whileHover={{ scale: hasReducedMotion ? 1 : 1.1 }}
                    transition={{ duration: 0.7 }}
                  >
                    <img
                      src={program.backgroundImage}
                      alt={`${program.title} background`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to gradient if image not found
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.className = `absolute inset-0 bg-gradient-to-br ${program.color} opacity-30 group-hover:opacity-50 transition-all duration-700`;
                      }}
                    />
                    {/* Optimized overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  </motion.div>
                  
                  {/* Gradient Background Fallback */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-20 transition-all duration-700`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <motion.div 
                      initial={{ opacity: 0, rotate: hasReducedMotion ? 0 : -180 }}
                      animate={isInView ? { opacity: 1, rotate: 0 } : {}}
                      transition={{ 
                        duration: hasReducedMotion ? 0 : 0.6, 
                        delay: hasReducedMotion ? 0 : 0.2 + index * 0.1 
                      }}
                      whileHover={{ scale: hasReducedMotion ? 1 : 1.2, rotate: hasReducedMotion ? 0 : 10 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-5 shadow-2xl group-hover:shadow-3xl transition-all duration-300 border-2 border-white/20`}
                    >
                      <program.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.h3 
                      initial={{ opacity: 0, x: hasReducedMotion ? 0 : -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        duration: hasReducedMotion ? 0 : 0.4, 
                        delay: hasReducedMotion ? 0 : 0.3 + index * 0.1 
                      }}
                      className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-white transition-colors duration-300 min-h-[56px] leading-tight"
                    >
                      {program.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ 
                        duration: hasReducedMotion ? 0 : 0.4, 
                        delay: hasReducedMotion ? 0 : 0.4 + index * 0.1 
                      }}
                      className="text-muted-foreground text-base mb-6 leading-relaxed group-hover:text-white/90 transition-colors duration-300 min-h-[96px] max-h-[96px] overflow-hidden"
                    >
                      {program.description}
                    </motion.p>
                    
                    {/* Skills Section */}
                    <motion.div 
                      initial={{ opacity: 0, y: hasReducedMotion ? 0 : 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ 
                        duration: hasReducedMotion ? 0 : 0.3, 
                        delay: hasReducedMotion ? 0 : 0.5 + index * 0.1 
                      }}
                      className="mb-4"
                    >
                      <div className="grid grid-cols-2 gap-2 mb-4 min-h-[80px]">
                        {(expandedSkills[program.title] ? program.skills : program.skills.slice(0, 3)).map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ 
                              duration: hasReducedMotion ? 0 : 0.2, 
                              delay: hasReducedMotion ? 0 : 0.6 + index * 0.1 + skillIndex * 0.05 
                            }}
                            whileHover={{ scale: hasReducedMotion ? 1 : 1.05 }}
                            className="flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/90 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:border-white/50 group-hover:bg-white/25 whitespace-nowrap"
                          >
                            {skill}
                          </motion.span>
                        ))}
                        {program.skills.length > 3 && !expandedSkills[program.title] && (
                          <motion.button
                            onClick={(event) => {
                              event.stopPropagation();
                              setExpandedSkills(prev => ({ ...prev, [program.title]: true }));
                            }}
                            whileHover={{ scale: hasReducedMotion ? 1 : 1.05 }}
                            whileTap={{ scale: hasReducedMotion ? 1 : 0.95 }}
                            className="flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/90 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:border-white/50 group-hover:bg-white/25 whitespace-nowrap"
                          >
                            +{program.skills.length - 3}
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                    
                    {/* Duration and Projects */}
                    <div className="space-y-2">
                      <motion.div 
                        initial={{ opacity: 0, y: hasReducedMotion ? 0 : 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ 
                          duration: hasReducedMotion ? 0 : 0.3, 
                          delay: hasReducedMotion ? 0 : 0.7 + index * 0.1 
                        }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Clock className="w-4 h-4 text-accent group-hover:text-white transition-colors duration-300" />
                        <span className="text-foreground font-medium group-hover:text-white transition-colors duration-300">{durationLabel}</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: hasReducedMotion ? 0 : 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ 
                          duration: hasReducedMotion ? 0 : 0.3, 
                          delay: hasReducedMotion ? 0 : 0.8 + index * 0.1 
                        }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Briefcase className="w-4 h-4 text-accent group-hover:text-white transition-colors duration-300" />
                        <span className="text-foreground font-medium group-hover:text-white transition-colors duration-300">{program.projects}</span>
                      </motion.div>
                    </div>

                    <div className="mt-auto pt-5">
                      <Button
                        variant="heroPrimary"
                        size="sm"
                        className="w-full"
                        onClick={(event) => {
                          event.stopPropagation();
                          setEnrollProgram(program);
                        }}
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        {selectedProgram && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProgram(null)}
          >
            <div
              className="relative w-[90vw] max-w-3xl max-h-[80vh] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 text-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute inset-0">
                <img
                  src={selectedProgram.backgroundImage}
                  alt={`${selectedProgram.title} background`}
                  className="h-full w-full object-cover opacity-30"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.className = `absolute inset-0 bg-gradient-to-br ${selectedProgram.color} opacity-40`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
              </div>

              <div className="relative z-10 flex flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-wider text-accent">{selectedProgram.category}</p>
                    <h3 className="mt-2 text-2xl font-semibold">{selectedProgram.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-white/85">{selectedProgram.description}</p>
                  </div>
                  <button
                    className="rounded-full border border-white/30 p-2 text-white/90 hover:bg-white/10"
                    onClick={() => setSelectedProgram(null)}
                    aria-label="Close"
                  >
                    <X className="h-4 w-4 text-accent" />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProgram.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm text-white/90">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" />
                    <span>{durationLabel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-accent" />
                    <span>{selectedProgram.projects}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {enrollProgram && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setEnrollProgram(null)}
          >
            <div
              className="relative w-[92vw] max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-900 text-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute inset-0">
                <img
                  src={enrollProgram.backgroundImage}
                  alt={`${enrollProgram.title} background`}
                  className="h-full w-full object-cover opacity-20"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.className = `absolute inset-0 bg-gradient-to-br ${enrollProgram.color} opacity-40`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
              </div>

              <div className="relative z-10 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-wider text-accent">Enroll Now</p>
                    <h3 className="mt-2 text-2xl font-semibold">1 Month / 45 Days / 6 Months Training</h3>
                    {/* <p className="mt-2 text-sm text-white/80"> • 1 Month / 45 Days / 6 Months Training</p> */}
                  </div>
                  <button
                    className="rounded-full border border-white/30 p-2 text-white/90 hover:bg-white/10"
                    onClick={() => setEnrollProgram(null)}
                    aria-label="Close"
                  >
                    <X className="h-4 w-4 text-accent" />
                  </button>
                </div>

                <form onSubmit={handleEnrollSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Name</label>
                      <Input
                        name="name"
                        placeholder="Your full name"
                        value={enrollForm.name}
                        onChange={(event) => setEnrollForm({ ...enrollForm, name: event.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Class</label>
                      <Input
                        name="class"
                        placeholder="Your class"
                        value={enrollForm.className}
                        onChange={(event) => setEnrollForm({ ...enrollForm, className: event.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Preferred Duration</label>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="durationPreference"
                          checked={enrollForm.durationPreference === "1 Month"}
                          onChange={() =>
                            setEnrollForm({
                              ...enrollForm,
                              durationPreference: enrollForm.durationPreference === "1 Month" ? "" : "1 Month",
                            })
                          }
                          className="h-4 w-4 rounded border-white/40 bg-transparent text-accent focus:ring-accent"
                        />
                        1 Month
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="durationPreference"
                          checked={enrollForm.durationPreference === "45 Days"}
                          onChange={() =>
                            setEnrollForm({
                              ...enrollForm,
                              durationPreference: enrollForm.durationPreference === "45 Days" ? "" : "45 Days",
                            })
                          }
                          className="h-4 w-4 rounded border-white/40 bg-transparent text-accent focus:ring-accent"
                        />
                        45 Days
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="durationPreference"
                          checked={enrollForm.durationPreference === "6 Months"}
                          onChange={() =>
                            setEnrollForm({
                              ...enrollForm,
                              durationPreference: enrollForm.durationPreference === "6 Months" ? "" : "6 Months",
                            })
                          }
                          className="h-4 w-4 rounded border-white/40 bg-transparent text-accent focus:ring-accent"
                        />
                        6 Months
                      </label>
                    </div>
                    <p className="mt-2 text-xs text-white/60">Select one option.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Which course do you want to enroll in?</label>
                    <Input
                      name="courseInterest"
                      placeholder="Example: AI/ML, Web Development"
                      value={enrollForm.courseInterest}
                      onChange={(event) => setEnrollForm({ ...enrollForm, courseInterest: event.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Address</label>
                    <Textarea
                      name="address"
                      rows={3}
                      placeholder="Your full address"
                      value={enrollForm.address}
                      onChange={(event) => setEnrollForm({ ...enrollForm, address: event.target.value })}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Contact No.</label>
                      <Input
                        name="contact"
                        placeholder="+91 98765 43210"
                        value={enrollForm.contact}
                        onChange={(event) => setEnrollForm({ ...enrollForm, contact: event.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={enrollForm.email}
                        onChange={(event) => setEnrollForm({ ...enrollForm, email: event.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <input type="hidden" name="course" value={enrollProgram.title} />
                  <input type="hidden" name="duration" value={enrollForm.durationPreference} />
                  <input type="hidden" name="category" value={enrollProgram.category} />
                  <input type="hidden" name="courseInterest" value={enrollForm.courseInterest} />
                  <input type="hidden" name="type" value="Training Enrollment" />
                  <input type="hidden" name="_subject" value={`New Training Enrollment - ${enrollProgram.title}`} />
                  <input type="hidden" name="_replyto" value={enrollForm.email} />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_honey" value="" />

                  <Button type="submit" variant="heroPrimary" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Enrollment"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: hasReducedMotion ? 0 : 50, scale: hasReducedMotion ? 1 : 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ 
            duration: hasReducedMotion ? 0 : 0.6, 
            delay: hasReducedMotion ? 0 : 0.8 
          }}
          className="bg-gradient-to-br from-primary to-navy-800 rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: hasReducedMotion ? 0 : 30, scale: hasReducedMotion ? 1 : 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: hasReducedMotion ? 0 : 0.4, 
                  delay: hasReducedMotion ? 0 : 0.9 + index * 0.1 
                }}
                whileHover={{ scale: hasReducedMotion ? 1 : 1.05 }}
                className="text-center"
              >
                <motion.div 
                  initial={{ opacity: 0, rotate: hasReducedMotion ? 0 : -180 }}
                  animate={isInView ? { opacity: 1, rotate: 0 } : {}}
                  transition={{ 
                    duration: hasReducedMotion ? 0 : 0.5, 
                    delay: hasReducedMotion ? 0 : 1.0 + index * 0.1 
                  }}
                  whileHover={{ scale: hasReducedMotion ? 1 : 1.1, rotate: hasReducedMotion ? 0 : 5 }}
                  className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4"
                >
                  <feature.icon className="w-7 h-7 text-accent" />
                </motion.div>
                <motion.h4 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ 
                    duration: hasReducedMotion ? 0 : 0.3, 
                    delay: hasReducedMotion ? 0 : 1.1 + index * 0.1 
                  }}
                  className="font-display font-semibold text-primary-foreground mb-2"
                >
                  {feature.title}
                </motion.h4>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ 
                    duration: hasReducedMotion ? 0 : 0.3, 
                    delay: hasReducedMotion ? 0 : 1.2 + index * 0.1 
                  }}
                  className="text-primary-foreground/70 text-sm"
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0, y: hasReducedMotion ? 0 : 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: hasReducedMotion ? 0 : 0.4, 
              delay: hasReducedMotion ? 0 : 1.5 
            }}
            className="text-center mt-10"
          >
            <Button
              variant="heroPrimary"
              size="xl"
              onClick={() => setEnrollProgram(programs[0])}
            >
              Enroll Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
