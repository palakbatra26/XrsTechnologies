import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of IT services including custom software development, web and mobile app development, ERP/CRM solutions, cloud services, UI/UX design, IT consulting, cybersecurity, and maintenance & support.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity and scope. Simple websites may take 2-4 weeks, while complex software solutions can take 3-6 months or more. We'll provide a detailed timeline during consultation.",
  },
  {
    question: "Do you provide training programs?",
    answer: "Yes, we offer industry-ready training programs in web development, cybersecurity, networking, and AutoCAD. Our 6-month programs include live projects and placement assistance.",
  },
  {
    question: "What is your development process?",
    answer: "We follow an agile development methodology with regular client communication, iterative development, and quality assurance at every stage to ensure the best results.",
  },
  {
    question: "Do you provide maintenance and support?",
    answer: "Yes, we offer ongoing maintenance and technical support services to keep your applications running smoothly and up-to-date with the latest security patches and features.",
  },
  {
    question: "How do I get started?",
    answer: "Simply contact us through our website or give us a call. We'll schedule a consultation to understand your requirements and provide a customized solution proposal.",
  },
];

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-muted/50">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services and training programs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:border-accent/30"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-accent py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
