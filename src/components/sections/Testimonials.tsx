import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Fast turnaround, clean execution, and proactive communication.  Vpro Tech Digital feels like an extension of our team.",
    author: "Vibhakar Sharma",
    role: "Client Partner",
    type: "Client",
  },
  {
    quote: "They translated our requirements into a polished product without losing momentum. Solid delivery from start to finish.",
    author: "Prince Singh",
    role: "Project Lead",
    type: "Client",
  },
  {
    quote: "Reliable, responsive, and detail-oriented. The final output exceeded our quality bar.",
    author: "Rajesh Kumar",
    role: "Operations Team",
    type: "Client",
  },
  {
    quote: "Clear process, strong tech guidance, and zero surprises. We saw measurable improvements after launch.",
    author: "Anita Desai ",
    role: "Digital Programs",
    type: "Client",
  },
  {
    quote: "They balance creativity with engineering rigor. The project shipped on time and looks great.",
    author: "Sanjay Mehta",
    role: "Product Team",
    type: "Client",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary to-navy-800">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            What Our Clients Say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative bg-primary-foreground/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary-foreground/10">
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-accent/30 mb-6" />

            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed mb-8">
              "{testimonials[currentIndex].quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="font-display font-bold text-accent">
                  {testimonials[currentIndex].author.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div>
                <div className="font-display font-semibold text-primary-foreground">
                  {testimonials[currentIndex].author}
                </div>
                <div className="text-primary-foreground/60 text-sm">
                  {testimonials[currentIndex].role}
                </div>
              </div>
              <div className="ml-auto px-3 py-1 bg-accent/20 rounded-full text-accent text-xs font-medium">
                {testimonials[currentIndex].type}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-accent w-6"
                        : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
