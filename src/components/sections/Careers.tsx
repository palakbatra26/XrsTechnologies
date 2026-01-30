import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Upload, Briefcase, MapPin, Mail, Phone, User, FileText, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Careers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    position: '',
    location: '',
    education: '',
    message: ''
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  // FormSubmit handles the backend/email sending.
  // We only use these handlers to keep your UI controlled.

  return (
    <section id="careers" className="section-padding bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4"
          >
            Join Our Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Build Your Career With Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Join Xrs Technologies and be part of an innovative team that's shaping the future of technology and education.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Why Join Us */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="font-display text-2xl font-bold text-foreground mb-6"
            >
              Why Work With Us?
            </motion.h3>
            
            <div className="space-y-6">
              {[
                {
                  icon: Award,
                  title: "Growth Opportunities",
                  description: "Continuous learning and professional development in cutting-edge technologies"
                },
                {
                  icon: Briefcase,
                  title: "Innovative Projects",
                  description: "Work on exciting projects that make a real impact"
                },
                {
                  icon: GraduationCap,
                  title: "Expert Mentorship",
                  description: "Learn from industry experts and thought leaders"
                },
                {
                  icon: User,
                  title: "Collaborative Culture",
                  description: "Join a team that values creativity and collaboration"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex gap-4 p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"
                  >
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-xl"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-6">Apply Now</h3>
              
              <form
                action="https://formsubmit.co/palakbatra79@gmail.com"
                method="POST"
                encType="multipart/form-data"
                className="space-y-4"
                onSubmit={() => {
                  setIsSubmitting(true);
                  setSubmitStatus("idle");
                }}
              >
                {/* FormSubmit options */}
                <input type="hidden" name="_subject" value="New Career Application - Xrs Technologies" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                      placeholder="John Doe"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.75 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.85 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Position Applied
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    >
                      <option value="">Select Position</option>
                      <option value="frontend-developer">Frontend Developer</option>
                      <option value="backend-developer">Backend Developer</option>
                      <option value="fullstack-developer">Full Stack Developer</option>
                      <option value="ui-ux-designer">UI/UX Designer</option>
                      <option value="digital-marketer">Digital Marketer</option>
                      <option value="content-writer">Content Writer</option>
                      <option value="trainer">Technical Trainer</option>
                      <option value="sales">Sales Executive</option>
                      <option value="intern">Intern</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.9 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    placeholder="City, Country"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.93 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <GraduationCap className="w-4 h-4 inline mr-2" />
                    Education (Optional)
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    placeholder="B.Tech, MCA, etc."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.95 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <GraduationCap className="w-4 h-4 inline mr-2" />
                    Experience Level
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  >
                    <option value="">Select Experience</option>
                    <option value="fresher">Fresher</option>
                    <option value="0-1">0-1 Years</option>
                    <option value="1-3">1-3 Years</option>
                    <option value="3-5">3-5 Years</option>
                    <option value="5-10">5-10 Years</option>
                    <option value="10+">10+ Years</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 1.0 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Upload Resume (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-accent/10 file:text-accent"
                    />
                    {resumeFile && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent/10 px-2 py-1 rounded text-xs text-accent"
                      >
                        {resumeFile.name}
                      </motion.div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supported formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 1.05 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                    placeholder="Tell us why you're interested in joining our team..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 1.1 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 text-base"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Send className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
            {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                  >
                    Thank you for your application! We'll review your resume and get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
                  >
                    <p className="font-semibold mb-1">Submission Failed</p>
                    <p className="text-sm mb-2">Please check your internet connection and try again.</p>
                    <p className="text-sm">
                      If the problem persists, please email us directly at{' '}
                      <a 
                        href="mailto:palakbatra79@gmail.com" 
                        className="text-accent hover:underline font-medium"
                        target="_blank"
                      >
                        palakbatra79@gmail.com
                      </a>
                    </p>
                  </motion.div>
                )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}