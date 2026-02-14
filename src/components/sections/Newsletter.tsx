import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Building, Users, ThumbsUp, Clock, Mail, Bell, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { buildApiUrl } from "@/lib/api";

const stats = [
  { icon: Building, value: "100+", label: "Companies Served" },
  { icon: Users, value: "500+", label: "Students Trained" },
  { icon: ThumbsUp, value: "98%", label: "Client Satisfaction" },
  { icon: Clock, value: "24/7", label: "Support Available" },
];

export function Newsletter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(trimmedEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address like name@example.com.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(buildApiUrl("/api/subscribe"), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });
      
      if (response.ok) {
        toast({
          title: "Successfully Subscribed! 🎉",
          description: "Thank you for subscribing!",
        });
        setEmail("");
      } else {
        const errorData = await response.json().catch(() => ({} as { error?: string }));
        
        toast({
          title: "Subscription Failed",
          description: errorData.error || "Please try again in a moment.",
        });
      }
    } catch {
      toast({
        title: "Connection Error",
        description: "Unable to connect. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary to-navy-800">
      <div className="section-container" ref={ref}>
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-accent" />
              </div>
              <div className="text-3xl font-bold text-primary-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-primary-foreground/60 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6"
          >
            <Mail className="w-4 h-4 text-accent" />
            <span className="text-accent font-medium text-sm">Stay Connected With Xrs Technologies</span>
          </motion.div>

          <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Stay Tuned With Us
          </h3>
          
          <p className="text-primary-foreground/70 mb-6 text-lg">
            Subscribe to our newsletter and never miss updates on:
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Star className="w-4 h-4 text-accent" />
              <span className="text-sm">Latest Courses</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Bell className="w-4 h-4 text-accent" />
              <span className="text-sm">Tech Updates</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Mail className="w-4 h-4 text-accent" />
              <span className="text-sm">Special Offers</span>
            </div>
          </motion.div>

          <p className="text-primary-foreground/60 mb-8 text-sm">
            Join 500+ subscribers getting weekly insights from VproTech digital
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              inputMode="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value.replace(/\s+/g, ""))}
              required
              className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <Button
              type="submit"
              variant="heroPrimary"
              size="lg"
              disabled={isSubmitting}
              className="whitespace-nowrap"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
            </Button>
          </form>

          <p className="text-primary-foreground/40 text-xs mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
