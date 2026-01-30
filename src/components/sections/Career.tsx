import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Clock, ArrowRight, CheckCircle, BookOpen, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { useUser, SignInButton } from "@clerk/clerk-react";

// Training Programs organized by streams
const trainingStreams = [
  {
    id: "cse-it",
    streamName: "CSE / IT",
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
    borderColor: "border-blue-500",
    courses: [
      {
        id: "basic-computer",
        title: "Basic Computer",
        icon: "💻",
        description: "Fundamental computer literacy covering operating systems, office tools, and essential digital skills.",
        whatIs: "Basic Computer training introduces learners to core concepts of computer operation, file management, and common productivity applications used in daily professional environments.",
        futureScope: "Forms the foundation for any further IT specialization including programming, networking, and digital design.",
        benefits: ["Strong foundation", "Essential office skills", "Improved digital confidence", "Better employability", "Prepares for advanced courses"],
        package: "Entry-level roles in administration, support, and data operations.",
        duration: "6 Months"
      },
      {
        id: "c-cpp",
        title: "C / C++",
        icon: "📘",
        description: "Structured programming and object-oriented concepts using C and C++ for robust software development.",
        whatIs: "C and C++ are foundational programming languages used for system software, performance-critical applications, and core computer science concepts.",
        futureScope: "Opens opportunities in systems programming, embedded development, game engines, and competitive programming.",
        benefits: ["Strong logic building", "Understanding of memory management", "Industry-relevant syntax knowledge", "Foundation for other languages", "Suitable for technical interviews"],
        package: "Suitable for roles starting from ₹3-8 LPA, depending on profile and skills.",
        duration: "6 Months"
      },
      {
        id: "web-designing",
        title: "Web Designing",
        icon: "🌐",
        description: "Design-focused training in creating visually appealing, responsive, and user-friendly websites.",
        whatIs: "Web Designing focuses on layout, color theory, typography, and front-end implementation to create engaging user experiences on the web.",
        futureScope: "High demand in agencies, startups, and freelance markets for UI-focused web projects.",
        benefits: ["Creative career path", "Strong portfolio potential", "Freelancing opportunities", "Cross-industry demand", "Gateway to UI/UX specialization"],
        package: "Typical starting packages range from ₹3-7 LPA with growth via experience and portfolio.",
        duration: "6 Months"
      },
      {
        id: "php-mysql",
        title: "PHP / MySQL",
        icon: "🗄️",
        description: "Server-side web development using PHP with MySQL databases for dynamic applications.",
        whatIs: "PHP / MySQL development covers backend scripting and database operations to build and manage data-driven web applications.",
        futureScope: "Relevant for legacy systems, CMS platforms, and small to mid-scale web applications.",
        benefits: ["Backend development skills", "Database handling", "CMS customization opportunities", "Wide hosting support", "Suitable for service-based companies"],
        package: "Backend and full-stack roles commonly offer ₹3-8 LPA at entry level.",
        duration: "6 Months"
      },
      {
        id: "php-laravel",
        title: "PHP / Laravel",
        icon: "📦",
        description: "Modern web application development using the Laravel framework for structured PHP projects.",
        whatIs: "Laravel is a popular PHP framework that provides a robust structure for building secure, maintainable, and scalable web applications.",
        futureScope: "Widely used in product and service companies requiring rapid web application development.",
        benefits: ["Framework-based development", "Clean architecture", "Faster development cycles", "Industry-accepted stack", "Better maintainability"],
        package: "Framework-based backend roles typically start around ₹4-10 LPA depending on expertise.",
        duration: "6 Months"
      },
      {
        id: "digital-marketing",
        title: "Digital Marketing",
        icon: "📣",
        description: "Comprehensive training on SEO, social media, paid campaigns, and online brand promotion.",
        whatIs: "Digital Marketing involves promoting products and services through digital channels such as search engines, social media, email, and online advertising.",
        futureScope: "Strong demand across industries for digital brand building, lead generation, and campaign management.",
        benefits: ["Non-coding IT career option", "Freelance and agency opportunities", "Scalable skillset", "Cross-domain applicability", "Continuous learning through evolving tools"],
        package: "Digital marketing executives and specialists often start from ₹3-7 LPA with high growth potential.",
        duration: "6 Months"
      },
      {
        id: "java",
        title: "Java",
        icon: "☕",
        description: "Enterprise-focused programming in Java for desktop, web, and backend applications.",
        whatIs: "Java is a versatile, object-oriented language extensively used in enterprise software, Android development, and backend services.",
        futureScope: "Highly valued in product companies, banking, telecom, and large-scale enterprise environments.",
        benefits: ["Robust OOP understanding", "Enterprise-grade skills", "Strong community ecosystem", "Good demand in service/product firms", "Useful for Android pathways"],
        package: "Java developer roles typically range from ₹4-10 LPA for freshers with solid skills.",
        duration: "6 Months"
      },
      {
        id: "python",
        title: "Python",
        icon: "🐍",
        description: "Python programming for scripting, automation, web development, and data-oriented applications.",
        whatIs: "Python is a high-level, general-purpose language known for its readability and wide use in data science, automation, and web development.",
        futureScope: "Core skill for data science, AI, automation testing, scripting, and backend roles.",
        benefits: ["Easy syntax", "Versatile usage", "Rich library ecosystem", "Strong community support", "Fast prototyping"],
        package: "Python-related roles for freshers generally span ₹3-9 LPA based on specialization.",
        duration: "6 Months"
      },
      {
        id: "javascript",
        title: "JavaScript",
        icon: "🟨",
        description: "Front-end scripting for interactive, dynamic web pages and modern web applications.",
        whatIs: "JavaScript is the primary language of the web used to add interactivity, control behavior, and build single-page applications.",
        futureScope: "Core requirement for front-end, full-stack, and modern web frameworks such as React, Angular, and Vue.",
        benefits: ["Essential front-end skill", "Framework readiness", "Freelancing and startup demand", "Integrates with many stacks", "High community support"],
        package: "Front-end developer roles commonly start from ₹3-9 LPA based on skills and stack.",
        duration: "6 Months"
      },
      {
        id: "android",
        title: "Android",
        icon: "🤖",
        description: "Mobile application development for Android devices using modern tools and frameworks.",
        whatIs: "Android development focuses on designing, building, and deploying applications for the Android operating system.",
        futureScope: "Consistent demand in consumer apps, enterprise mobility, and startup ecosystems.",
        benefits: ["High user reach", "Product development exposure", "Monetization possibilities", "Portfolio-friendly projects", "Good fit with Java/Kotlin skills"],
        package: "Android developer roles typically range between ₹4-9 LPA at entry level.",
        duration: "6 Months"
      },
      {
        id: "machine-learning",
        title: "Machine Learning",
        icon: "🧠",
        description: "Applied machine learning techniques for predictive modeling and intelligent systems.",
        whatIs: "Machine Learning focuses on algorithms that learn from data to make predictions or decisions without explicit programming.",
        futureScope: "Key enabler for AI-driven products across healthcare, finance, retail, and more.",
        benefits: ["Cutting-edge technology", "High-impact use cases", "Research and industry roles", "Data-driven mindset", "Attractive salary potential"],
        package: "ML engineer and analyst roles generally range from ₹6-15 LPA for capable freshers.",
        duration: "6 Months"
      },
      {
        id: "iot-training",
        title: "IoT Training",
        icon: "🌐",
        description: "Internet of Things concepts for connecting devices, sensors, and embedded systems.",
        whatIs: "IoT training covers hardware-software integration, communication protocols, and cloud connectivity for smart devices.",
        futureScope: "Growing demand in smart homes, industrial IoT, automotive, and healthcare solutions.",
        benefits: ["Interdisciplinary exposure", "Emerging tech domain", "Hardware and software integration", "Innovation-driven projects", "Global applicability"],
        package: "IoT roles for freshers typically vary between ₹4-10 LPA depending on profile.",
        duration: "6 Months"
      },
      {
        id: "networking",
        title: "Networking",
        icon: "🌐",
        description: "Computer networking fundamentals, configuration, and troubleshooting for modern infrastructures.",
        whatIs: "Networking involves understanding how computers and devices communicate over local and wide area networks using standard protocols.",
        futureScope: "Critical skill for IT support, system administration, and network engineering profiles.",
        benefits: ["Stable career path", "Certification-friendly domain", "Essential for infrastructure roles", "On-premise and cloud relevance", "Applicable across sectors"],
        package: "Networking roles generally start from ₹3-8 LPA based on certifications and skills.",
        duration: "6 Months"
      },
      {
        id: "dotnet",
        title: ".NET",
        icon: "🧩",
        description: "Application development using the .NET platform for web and desktop solutions.",
        whatIs: ".NET is a Microsoft framework used to build secure, scalable web, desktop, and enterprise applications.",
        futureScope: "Widely used in corporate, government, and enterprise environments for internal and external systems.",
        benefits: ["Enterprise-ready skills", "Integration with Microsoft stack", "Long-term project exposure", "In-demand in service companies", "Strong tooling support"],
        package: ".NET developer roles typically start from ₹4-9 LPA for capable freshers.",
        duration: "6 Months"
      },
      {
        id: "data-science",
        title: "Data Science",
        icon: "📊",
        description: "Data analysis, visualization, and predictive modeling using modern data science tools.",
        whatIs: "Data Science combines statistics, programming, and domain knowledge to extract insights and build data-driven solutions.",
        futureScope: "High demand across finance, e-commerce, healthcare, and analytics firms.",
        benefits: ["Insight-driven career", "Cross-industry roles", "Advanced analytics exposure", "Strong salary growth", "Strategic decision support"],
        package: "Entry-level data science and analyst roles range from ₹5-12 LPA.",
        duration: "6 Months"
      },
      {
        id: "graphic-designing",
        title: "Graphic Designing",
        icon: "🎨",
        description: "Creative visual communication using design tools for digital and print media.",
        whatIs: "Graphic Designing focuses on crafting visual content for branding, marketing, and communication using typography, imagery, and layout.",
        futureScope: "In-demand for marketing agencies, product companies, and freelance creative work.",
        benefits: ["Creative expression", "Portfolio-driven growth", "Freelance potential", "Branding expertise", "Cross-platform design skills"],
        package: "Graphic designer roles typically start around ₹3-7 LPA and grow with portfolio strength.",
        duration: "6 Months"
      },
      {
        id: "artificial-intelligence",
        title: "Artificial Intelligence",
        icon: "🤖",
        description: "Concepts and applications of AI for building intelligent, autonomous systems.",
        whatIs: "Artificial Intelligence focuses on simulating human intelligence in machines through reasoning, learning, and decision-making algorithms.",
        futureScope: "Strategic domain for automation, autonomous systems, and advanced analytics across industries.",
        benefits: ["Future-ready skillset", "High innovation potential", "Global career pathways", "Strong research opportunities", "Premium compensation for experts"],
        package: "AI roles for skilled freshers commonly start from ₹6-15 LPA depending on depth and projects.",
        duration: "6 Months"
      }
    ]
  },
  {
    id: "mechanical",
    streamName: "Mechanical",
    bgColor: "bg-emerald-500",
    textColor: "text-emerald-500",
    borderColor: "border-emerald-500",
    courses: [
      {
        id: "autocad-mech",
        title: "AutoCAD 2D / 3D",
        icon: "📐",
        description: "Computer-aided drafting for mechanical components and layouts in 2D and 3D.",
        whatIs: "AutoCAD 2D / 3D enables precise drafting and modeling of mechanical parts, assemblies, and engineering drawings.",
        futureScope: "Core requirement for design roles in manufacturing, fabrication, and engineering consultancies.",
        benefits: ["Industry-standard tool", "Improved design accuracy", "Better visualization skills", "Stronger mechanical portfolio", "Applicable to multiple domains"],
        package: "Design-focused roles often start from ₹3-7 LPA for skilled drafters and designers.",
        duration: "6 Months"
      },
      {
        id: "solidworks",
        title: "SolidWorks",
        icon: "🛠️",
        description: "Solid modeling and mechanical design using SolidWorks for product development.",
        whatIs: "SolidWorks is a 3D CAD software widely used for product design, simulation, and manufacturing documentation.",
        futureScope: "Highly valued in product design, automotive, aerospace, and consumer goods industries.",
        benefits: ["Advanced CAD skills", "Parametric modeling", "Simulation exposure", "Manufacturing-ready drawings", "Strong industry recognition"],
        package: "SolidWorks-based roles typically range from ₹3.5-8 LPA at entry level.",
        duration: "6 Months"
      },
      {
        id: "catia",
        title: "CATIA",
        icon: "✈️",
        description: "High-end CAD/CAM/CAE software training for complex mechanical and aerospace designs.",
        whatIs: "CATIA is an advanced CAD platform used extensively in aerospace, automotive, and high-precision engineering sectors.",
        futureScope: "Preferred skill for roles in OEMs, design studios, and specialized manufacturing firms.",
        benefits: ["Premium CAD exposure", "High-value industry domains", "Complex surface modeling", "Better global mobility", "Attractive long-term prospects"],
        package: "CATIA-related roles often provide competitive starting packages based on domain and location.",
        duration: "6 Months"
      },
      {
        id: "proe-creo",
        title: "Pro-E / Creo",
        icon: "⚙️",
        description: "Parametric modeling and mechanical design using Pro/ENGINEER and Creo tools.",
        whatIs: "Pro-E / Creo is a professional-grade CAD solution used for detailed mechanical design, assemblies, and simulation.",
        futureScope: "Useful for roles in product design, tooling, and precision engineering companies.",
        benefits: ["Parametric modeling expertise", "Industry-ready tool knowledge", "Better career options in design", "Exposure to simulation workflows", "Supports complex assemblies"],
        package: "Mechanical design roles with Creo typically start around ₹3.5-8 LPA.",
        duration: "6 Months"
      },
      {
        id: "cnc-programming",
        title: "CNC Programming",
        icon: "🧱",
        description: "Programming CNC machines for precision machining operations and automated manufacturing.",
        whatIs: "CNC Programming involves writing and optimizing code to control computer numerical control machines for cutting, drilling, and shaping materials.",
        futureScope: "Demand in manufacturing, automotive, aerospace, and tooling industries globally.",
        benefits: ["Hands-on manufacturing exposure", "High relevance in factories", "Practical job roles", "Opportunities in industrial hubs", "Applicable to multiple machines"],
        package: "CNC programmer roles generally start from ₹3-7 LPA with growth based on expertise.",
        duration: "6 Months"
      },
      {
        id: "ansys",
        title: "ANSYS",
        icon: "📊",
        description: "Finite element analysis (FEA) for structural, thermal, and flow simulations using ANSYS.",
        whatIs: "ANSYS is a simulation platform used to analyze and optimize product performance under various physical conditions.",
        futureScope: "Important for CAE roles in automotive, aerospace, heavy machinery, and research.",
        benefits: ["Simulation expertise", "Better design validation", "Research-friendly skillset", "Valuable for R&D roles", "Supports innovation in engineering"],
        package: "CAE engineer roles often start from ₹4-9 LPA depending on domain and skill depth.",
        duration: "6 Months"
      },
      {
        id: "inventor-fusion",
        title: "Inventor / Fusion",
        icon: "🧮",
        description: "Mechanical design and 3D modeling using Autodesk Inventor and Fusion tools.",
        whatIs: "Inventor / Fusion tools provide powerful capabilities for 3D modeling, assemblies, and visualization in mechanical engineering.",
        futureScope: "Relevant for manufacturing design offices, product companies, and prototyping firms.",
        benefits: ["Modern CAD experience", "Cloud collaboration possibilities", "Enhanced modeling speed", "Better visualization", "Supports iterative design"],
        package: "Entry-level roles involving these tools usually offer ₹3-7 LPA.",
        duration: "6 Months"
      }
    ]
  },
  {
    id: "civil",
    streamName: "Civil",
    bgColor: "bg-purple-500",
    textColor: "text-purple-500",
    borderColor: "border-purple-500",
    courses: [
      {
        id: "autocad-civil",
        title: "AutoCAD 2D / 3D",
        icon: "📏",
        description: "Drafting and detailing of civil structures and layouts using AutoCAD.",
        whatIs: "AutoCAD for Civil focuses on preparing plans, sections, and elevations for buildings, roads, and infrastructure projects.",
        futureScope: "Essential skill for civil drafting roles in construction, consultancy, and infrastructure firms.",
        benefits: ["Precise drawing skills", "Industry-recognized software", "Better coordination with site teams", "Supports BIM workflows", "Widely accepted by employers"],
        package: "Civil CAD roles generally start from ₹3-6 LPA.",
        duration: "6 Months"
      },
      {
        id: "revit",
        title: "Revit",
        icon: "🏗️",
        description: "Building Information Modeling (BIM) for architectural and structural projects using Revit.",
        whatIs: "Revit is a BIM platform that integrates 3D modeling, documentation, and coordination for building projects.",
        futureScope: "In demand for BIM roles in construction, architecture, and large infrastructure projects.",
        benefits: ["BIM specialization", "Improved coordination", "Modern industry workflows", "Better global opportunities", "Higher-value roles"],
        package: "BIM and Revit-focused roles usually range from ₹3.5-8 LPA at entry level.",
        duration: "6 Months"
      },
      {
        id: "staad-pro",
        title: "STAAD Pro",
        icon: "🏗️",
        description: "Structural analysis and design of civil structures using STAAD Pro software.",
        whatIs: "STAAD Pro is used for analyzing and designing buildings, bridges, and other structures as per various codes.",
        futureScope: "Relevant for structural design roles in consultancies and engineering offices.",
        benefits: ["Structural design exposure", "Analysis-driven thinking", "Applicable to multiple project types", "Supports code-based design", "Strong value in consulting roles"],
        package: "Structural engineer and design roles commonly start from ₹4-8 LPA.",
        duration: "6 Months"
      },
      {
        id: "3ds-max",
        title: "3DS Max",
        icon: "🎬",
        description: "3D visualization and rendering for architectural and interior projects using 3DS Max.",
        whatIs: "3DS Max enables realistic rendering and animation of architectural models for presentations and marketing.",
        futureScope: "Valuable for visualization roles in architecture, interior design, and real estate marketing.",
        benefits: ["High-quality visualization", "Portfolio enhancement", "Creative presentation skills", "Useful for client proposals", "Complements CAD/BIM skills"],
        package: "Visualization roles typically start around ₹3-7 LPA.",
        duration: "6 Months"
      },
      {
        id: "google-sketchup",
        title: "Google SketchUp",
        icon: "📐",
        description: "Quick 3D modeling and conceptual design using SketchUp for civil and architectural projects.",
        whatIs: "Google SketchUp is a user-friendly 3D modeling tool used for quick concepts, massing studies, and basic visualization.",
        futureScope: "Widely used by architects and designers for early-stage design and client communication.",
        benefits: ["Fast modeling", "Easy learning curve", "Good for concept presentations", "Integrates with other tools", "Supports interior and exterior design"],
        package: "Design assistant and junior roles usually offer ₹3-6 LPA.",
        duration: "6 Months"
      },
      {
        id: "etabs",
        title: "E-TABS",
        icon: "🏢",
        description: "Structural analysis and design of high-rise and complex buildings using ETABS.",
        whatIs: "ETABS is specialized software for modeling, analysis, and design of building systems under gravity and lateral loads.",
        futureScope: "Important for structural engineers handling mid to high-rise projects.",
        benefits: ["High-rise design capability", "Seismic and wind analysis exposure", "Industry-relevant workflows", "Valuable consulting skill", "Enhances structural engineering profile"],
        package: "ETABS-related roles commonly start from ₹4-8 LPA.",
        duration: "6 Months"
      },
      {
        id: "primavera",
        title: "Primavera",
        icon: "🕒",
        description: "Project planning and scheduling for construction and infrastructure projects using Primavera.",
        whatIs: "Primavera is a professional project management tool used for planning, scheduling, and controlling large projects.",
        futureScope: "Key skill for planning engineer roles in construction, infrastructure, and EPC companies.",
        benefits: ["Project management exposure", "Better understanding of timelines", "Cross-functional collaboration skills", "Supports leadership roles", "Preferred in large projects"],
        package: "Planning engineer roles typically start from ₹4-8 LPA for freshers.",
        duration: "6 Months"
      }
    ]
  },
  {
    id: "ece-electrical",
    streamName: "ECE / Electrical",
    bgColor: "bg-green-500",
    textColor: "text-green-500",
    borderColor: "border-green-500",
    courses: [
      {
        id: "embedded-system",
        title: "Embedded System",
        icon: "🔌",
        description: "Design and programming of embedded systems for real-time applications.",
        whatIs: "Embedded Systems training focuses on microcontrollers, interfacing, and real-time software for dedicated hardware solutions.",
        futureScope: "In demand across automotive, consumer electronics, industrial automation, and IoT devices.",
        benefits: ["Hardware-software integration", "Hands-on lab experience", "Industry-relevant controllers", "Strong demand in electronics", "Good scope in R&D"],
        package: "Embedded engineer roles typically range from ₹4-9 LPA initially.",
        duration: "6 Months"
      },
      {
        id: "automation-ece",
        title: "Automation",
        icon: "⚙️",
        description: "Industrial automation concepts including PLC, SCADA, and control systems.",
        whatIs: "Automation training covers programmable logic controllers, SCADA interfaces, and control logic for industrial systems.",
        futureScope: "Widely used in process industries, manufacturing plants, and power systems.",
        benefits: ["Industry 4.0 relevance", "Field and control room exposure", "Multi-sector applicability", "Practical job roles", "Good demand in core companies"],
        package: "Automation roles typically offer ₹3.5-8 LPA to trained freshers.",
        duration: "6 Months"
      },
      {
        id: "matlab",
        title: "MATLAB",
        icon: "📈",
        description: "Numerical computing and simulation using MATLAB for engineering applications.",
        whatIs: "MATLAB is a high-level environment used for numerical analysis, modeling, and algorithm development in engineering domains.",
        futureScope: "Useful for control systems, signal processing, image processing, and academic research.",
        benefits: ["Strong analytical skills", "Model-based design exposure", "Research compatibility", "Applicable to multiple disciplines", "Supports advanced simulations"],
        package: "Roles involving MATLAB typically start from ₹3.5-8 LPA depending on domain.",
        duration: "6 Months"
      },
      {
        id: "vlsi-training",
        title: "VLSI Training",
        icon: "🔋",
        description: "Very Large Scale Integration design concepts for semiconductor and chip-level design.",
        whatIs: "VLSI training covers digital design, HDL coding, and chip-level implementation fundamentals.",
        futureScope: "Key skill for roles in semiconductor design houses and electronics R&D organizations.",
        benefits: ["High-tech domain", "Long-term growth prospects", "Strong global demand", "Cutting-edge project exposure", "Attractive compensation for experts"],
        package: "VLSI-related freshers usually see packages from ₹4-10 LPA depending on role and location.",
        duration: "6 Months"
      },
      {
        id: "robotics",
        title: "Robotics",
        icon: "🤖",
        description: "Robotics fundamentals including sensors, actuators, and control programming.",
        whatIs: "Robotics training covers mechanical structures, control algorithms, and integration of hardware and software for automated systems.",
        futureScope: "Growing relevance in manufacturing, logistics, healthcare, and research labs.",
        benefits: ["Interdisciplinary skillset", "Innovation-driven projects", "Research and industry roles", "Exposure to automation and AI", "Strong future demand"],
        package: "Robotics engineer roles often start from ₹4-9 LPA.",
        duration: "6 Months"
      },
      {
        id: "networking-ece",
        title: "Networking",
        icon: "🌐",
        description: "Networking concepts for electronics and electrical environments, including configuration and maintenance.",
        whatIs: "Networking for ECE/Electrical focuses on communication protocols, hardware integration, and network configuration in industrial and enterprise contexts.",
        futureScope: "Support and engineering roles in telecom, power, and industrial networks.",
        benefits: ["Hybrid domain exposure", "Relevant in multiple industries", "Supports system-level understanding", "Good for field roles", "Complements automation and IoT"],
        package: "Networking roles in this stream generally offer ₹3-8 LPA.",
        duration: "6 Months"
      },
      {
        id: "iot-training-ece",
        title: "IoT Training",
        icon: "📡",
        description: "IoT concepts focused on embedded communication and remote monitoring systems.",
        whatIs: "IoT training for ECE/Electrical blends embedded hardware, connectivity, and cloud integration for smart monitoring and control.",
        futureScope: "High potential in smart grids, industrial IoT, home automation, and remote sensing.",
        benefits: ["Future-ready specialisation", "Cross-domain applicability", "Strong project-based learning", "Supports innovation roles", "Global opportunity landscape"],
        package: "IoT-centric roles generally start from ₹4-10 LPA.",
        duration: "6 Months"
      },
      {
        id: "android-ece",
        title: "Android",
        icon: "📱",
        description: "Android application concepts tailored for integration with embedded and IoT solutions.",
        whatIs: "This Android training variant focuses on using mobile apps as interfaces for embedded and IoT systems.",
        futureScope: "Useful for integrated solutions in consumer devices, industrial controllers, and smart systems.",
        benefits: ["Bridges mobile and embedded", "Enhances system interaction design", "Supports product innovation", "Good for startups and R&D", "Enhances employability in hybrid roles"],
        package: "Android-integrated roles broadly align with ₹4-9 LPA at entry level.",
        duration: "6 Months"
      }
    ]
  }
];

const perks = [
  "Industry-relevant curriculum",
  "Hands-on projects and assignments",
  "Expert instructors",
  "Career support and placement assistance",
  "Certification upon completion",
];

export function Career() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [applicationCourse, setApplicationCourse] = useState<string | null>(null);
  const [applicationStream, setApplicationStream] = useState<string>("");
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});
  const [syllabusDialogs, setSyllabusDialogs] = useState<Record<string, boolean>>({});
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { toast } = useToast();
  const { isSignedIn } = useUser();

  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    stream: "",
    duration: "6 Months",
    message: "",
  });

  const handleApplyClick = (courseId: string, courseTitle: string, streamName: string) => {
    setApplicationCourse(courseId);
    setApplicationStream(streamName);
    setApplicationData({ 
      ...applicationData, 
      course: courseTitle,
      stream: streamName
    });
    setIsApplicationOpen(true);
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", applicationData.name);
      formData.append("email", applicationData.email);
      formData.append("phone", applicationData.phone);
      formData.append("course", applicationData.course);
      formData.append("stream", applicationData.stream);
      formData.append("duration", applicationData.duration);
      formData.append("message", applicationData.message);
      formData.append("type", "Training Application");
      formData.append("_subject", `New Training Application from ${applicationData.name}`);
      formData.append("_replyto", applicationData.email);
      
      // Add honeypot field to prevent spam
      formData.append("_honey", "");
      formData.append("_template", "table");

      const response = await fetch("https://formsubmit.co/ajax/palakbatra79@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description: "We'll get back to you soon with more details.",
        });
        setApplicationData({
          name: "",
          email: "",
          phone: "",
          course: "",
          stream: "",
          duration: "6 Months",
          message: "",
        });
        setIsApplicationOpen(false);
      } else {
        throw new Error(data.message || "Failed to submit application");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="career" className="section-padding bg-muted/50">
      <div className="section-container" ref={ref}>
        <div className="flex flex-col gap-12">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              Training Programs
            </span>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Start Your Career Journey
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Join our comprehensive training programs designed to make you industry-ready.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-semibold text-foreground mb-2">Flexible Duration</h4>
                <p className="text-sm text-muted-foreground">Comprehensive 6-month professional training programs designed for industry success</p>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-semibold text-foreground mb-2">Industry Ready</h4>
                <p className="text-sm text-muted-foreground">Hands-on projects and real-world applications</p>
              </div>
            </div>

            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              Why Choose Our Training?
            </h3>
            <ul className="space-y-3 mb-6">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground/80">{perk}</span>
                </li>
              ))}
            </ul>

            <Button variant="accent" size="lg">
              Explore All Courses
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Right - Course Listings */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {trainingStreams.map((stream) => (
              <div key={stream.id} className="space-y-4">
                <div className={`${stream.bgColor} text-white py-3 px-6 rounded-lg inline-block`}>
                  <h3 className="font-display font-bold text-xl">{stream.streamName}</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {stream.courses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="bg-card rounded-xl p-5 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg card-hover h-full flex flex-col"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-2xl">{course.icon}</div>
                        <div>
                          <h4 className="font-display text-base font-semibold text-foreground">
                            {course.title}
                          </h4>
                          <p className="text-muted-foreground text-xs">
                            {course.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </div>
                      </div>
                      
                      <div className="mt-auto space-y-2">
                        {isSignedIn ? (
                          <Dialog
                            open={syllabusDialogs[`${stream.id}-${course.id}`] || false}
                            onOpenChange={(open) =>
                              setSyllabusDialogs({ ...syllabusDialogs, [`${stream.id}-${course.id}`]: open })
                            }
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="w-full">
                                <BookOpen className="w-3 h-3 mr-1" />
                                See Syllabus
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-xl">{course.title} - Syllabus</DialogTitle>
                                <DialogDescription>
                                  {stream.streamName} Stream | Duration: {course.duration}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 mt-4">
                                <div className="bg-muted/50 rounded-lg p-4">
                                  <h4 className="font-semibold mb-2">Course Overview</h4>
                                  <p className="text-sm text-muted-foreground">{course.whatIs}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">What You'll Learn</h4>
                                  <ul className="space-y-1">
                                    <li className="flex items-start gap-2 text-sm">
                                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                      <span>Industry-relevant curriculum</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm">
                                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                      <span>Hands-on practical projects</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm">
                                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                      <span>Real-world case studies</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm">
                                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                      <span>Certification preparation</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="bg-accent/10 rounded-lg p-3">
                                    <h4 className="font-semibold text-sm mb-1 text-accent">Duration Options</h4>
                                    <div className="text-xs">
                                      <div>• 1 Month Intensive</div>
                                      <div>• 6 Months Comprehensive</div>
                                    </div>
                                  </div>
                                  <div className="bg-primary/10 rounded-lg p-3">
                                    <h4 className="font-semibold text-sm mb-1 text-primary">Package Range</h4>
                                    <p className="text-xs">{course.package}</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => setShowAuthDialog(true)}
                          >
                            <BookOpen className="w-3 h-3 mr-1" />
                            See Syllabus
                          </Button>
                        )}
                        
                        <div className="flex gap-1">
                          <Dialog
                            open={openDialogs[`${stream.id}-${course.id}`] || false}
                            onOpenChange={(open) =>
                              setOpenDialogs({ ...openDialogs, [`${stream.id}-${course.id}`]: open })
                            }
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex-1">
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-2xl">{course.title}</DialogTitle>
                                <DialogDescription>
                                  {stream.streamName} Stream - {course.description}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6 mt-4">
                                <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-6">
                                  <h4 className="font-semibold text-lg mb-2 text-accent">What is {course.title}?</h4>
                                  <p className="text-foreground leading-relaxed">{course.whatIs}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-lg mb-2">Future Scope & Opportunities</h4>
                                  <p className="text-muted-foreground leading-relaxed">{course.futureScope}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-lg mb-2">Key Benefits</h4>
                                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {course.benefits.map((benefit, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">{benefit}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                                  <h4 className="font-semibold text-lg mb-2 text-accent">Expected Package Range</h4>
                                  <p className="text-foreground font-medium">{course.package}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            variant="accent"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleApplyClick(course.id, course.title, stream.streamName)}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Application Form Dialog */}
      <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for Training</DialogTitle>
            <DialogDescription>
              Fill out the form to apply for {applicationData.course} training program
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApplicationSubmit} className="space-y-4 mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={applicationData.name}
                  onChange={(e) =>
                    setApplicationData({ ...applicationData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={applicationData.email}
                  onChange={(e) =>
                    setApplicationData({ ...applicationData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+91 98765 43210"
                value={applicationData.phone}
                onChange={(e) =>
                  setApplicationData({ ...applicationData, phone: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="course">Selected Course</Label>
              <Input
                id="course"
                name="course"
                value={applicationData.course}
                readOnly
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="stream">Stream</Label>
              <Input
                id="stream"
                name="stream"
                value={applicationData.stream}
                readOnly
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="duration">Preferred Training Duration *</Label>
              <Input
                id="duration"
                name="duration"
                value={applicationData.duration}
                readOnly
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="message">Additional Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your background and goals..."
                rows={4}
                value={applicationData.message}
                onChange={(e) =>
                  setApplicationData({ ...applicationData, message: e.target.value })
                }
              />
            </div>
            <input type="hidden" name="_subject" value={`New Training Application from ${applicationData.name}`} />
            <input type="hidden" name="_replyto" value={applicationData.email} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_honey" value="" />
            <input type="hidden" name="type" value="Training Application" />
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsApplicationOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="accent" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Auth Requirement Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              To view the detailed syllabus, please sign in to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowAuthDialog(false)}>
              Cancel
            </Button>
            <SignInButton mode="modal">
              <Button onClick={() => setShowAuthDialog(false)}>
                Sign In / Sign Up
              </Button>
            </SignInButton>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
