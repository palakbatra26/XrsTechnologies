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
        id: "fullstack",
        title: "Full Stack Development",
        icon: "</>",
        description: "Build complete web applications from frontend to backend",
        whatIs: "Full Stack Development involves creating both client-side (frontend) and server-side (backend) components of web applications.",
        futureScope: "High demand in startups, tech companies, and freelancing.",
        benefits: ["High market demand", "Remote work flexibility", "Freelancing opportunities", "Multiple career paths", "Competitive packages"],
        package: "₹4-15 LPA (Freshers) | ₹20-50+ LPA (Experienced)",
        duration: "6 Months"
      },
      {
        id: "python",
        title: "Python Programming",
        icon: "🐍",
        description: "Learn one of the most versatile programming languages",
        whatIs: "Python is a high-level, interpreted programming language known for its simplicity and readability.",
        futureScope: "Essential for data science, AI/ML, web development, and automation roles.",
        benefits: ["Easy to learn", "Versatile applications", "Strong community support", "High industry adoption", "Great for beginners"],
        package: "₹3-12 LPA (Entry Level) | ₹15-35+ LPA (Advanced)",
        duration: "3 Months"
      },
      {
        id: "ai-ml",
        title: "Artificial Intelligence & Machine Learning",
        icon: "🤖",
        description: "Build intelligent systems that learn and adapt",
        whatIs: "AI/ML involves creating algorithms that can learn from data and make intelligent decisions.",
        futureScope: "Revolutionary field with applications in healthcare, finance, autonomous vehicles, and more.",
        benefits: ["Cutting-edge technology", "Future-proof career", "Research opportunities", "High salary potential", "Global demand"],
        package: "₹8-25 LPA (Engineers) | ₹30-100+ LPA (Experts)",
        duration: "6 Months"
      }
    ]
  },
  {
    id: "ee-ece",
    streamName: "EE / ECE",
    bgColor: "bg-green-500",
    textColor: "text-green-500",
    borderColor: "border-green-500",
    courses: [
      {
        id: "vlsi",
        title: "VLSI Design",
        icon: "칩",
        description: "Design complex integrated circuits and microchips",
        whatIs: "VLSI involves designing integrated circuits by combining thousands of transistors into a single chip.",
        futureScope: "Essential for semiconductor industry, electronics manufacturing, and R&D.",
        benefits: ["Semiconductor industry", "Hardware design", "IoT applications", "Research opportunities", "Patent potential"],
        package: "₹4-12 LPA (Designers) | ₹15-35+ LPA (Experts)",
        duration: "6 Months"
      }
    ]
  },
  {
    id: "civil-me",
    streamName: "Civil / ME",
    bgColor: "bg-purple-500",
    textColor: "text-purple-500",
    borderColor: "border-purple-500",
    courses: [
      {
        id: "automation",
        title: "Industrial Automation",
        icon: "⚙️",
        description: "Control manufacturing processes with advanced automation",
        whatIs: "Industrial Automation involves using PLCs, SCADA systems, sensors, and robotics to automate manufacturing processes.",
        futureScope: "Growing with Industry 4.0 and smart manufacturing.",
        benefits: ["Industry 4.0 adoption", "Manufacturing efficiency", "Process optimization", "Robotics integration", "Smart factory trends"],
        package: "₹3.5-10 LPA (Technicians) | ₹12-30+ LPA (Engineers)",
        duration: "4 Months"
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
      const formDataToSend = new FormData();
      formDataToSend.append("name", applicationData.name);
      formDataToSend.append("email", applicationData.email);
      formDataToSend.append("phone", applicationData.phone);
      formDataToSend.append("course", applicationData.course);
      formDataToSend.append("stream", applicationData.stream);
      formDataToSend.append("duration", applicationData.duration);
      formDataToSend.append("message", applicationData.message);
      formDataToSend.append("type", "Training Application");
      formDataToSend.append("_subject", `New Training Application from ${applicationData.name}`);
      formDataToSend.append("_replyto", applicationData.email);
      formDataToSend.append("_template", "table");

      const response = await fetch("https://formsubmit.co/ajax/palakbatra79@gmail.com", {
        method: "POST",
        body: formDataToSend,
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
        throw new Error("Failed to submit application");
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
                <p className="text-sm text-muted-foreground">Choose between 1 Month intensive or 6 Months comprehensive training</p>
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
                placeholder="+91 98765 43210"
                value={applicationData.phone}
                onChange={(e) =>
                  setApplicationData({ ...applicationData, phone: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="duration">Preferred Training Duration *</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={applicationData.duration === "1 Month" ? "accent" : "outline"}
                  onClick={() => setApplicationData({ ...applicationData, duration: "1 Month" })}
                  className="h-12"
                >
                  1 Month
                  <br />
                  <span className="text-xs opacity-80">Intensive</span>
                </Button>
                <Button
                  type="button"
                  variant={applicationData.duration === "6 Months" ? "accent" : "outline"}
                  onClick={() => setApplicationData({ ...applicationData, duration: "6 Months" })}
                  className="h-12"
                >
                  6 Months
                  <br />
                  <span className="text-xs opacity-80">Comprehensive</span>
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="message">Additional Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your background and goals..."
                rows={4}
                value={applicationData.message}
                onChange={(e) =>
                  setApplicationData({ ...applicationData, message: e.target.value })
                }
              />
            </div>
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
