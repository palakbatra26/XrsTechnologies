import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Training } from "@/components/sections/Training";
import { Team } from "@/components/sections/Team";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { TechStack } from "@/components/sections/TechStack";
// import { Blog } from "@/components/sections/Blog";
import { Careers } from "@/components/sections/Careers";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Newsletter } from "@/components/sections/Newsletter";
import { Chatbot } from "@/components/chat/Chatbot";
import { PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = location.hash.replace("#", "");
    const section = document.getElementById(sectionId);
    if (!section) return;

    const header = document.querySelector("header");
    const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 0;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(sectionTop - headerHeight - 8, 0),
      behavior: "smooth",
    });
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="pointer-events-none fixed right-3 bottom-28 md:right-6 md:bottom-28 z-40 flex flex-col gap-3"
      >
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform"
          href="https://wa.me/918894110026"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            className="h-6 w-6 fill-current"
          >
            <path d="M16 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.51.698 4.953 2.021 7.08L3 29l6.144-1.61A13.261 13.261 0 0 0 16 29.333C23.364 29.333 29.333 23.364 29.333 16S23.364 2.667 16 2.667zm0 24.302c-2.175 0-4.297-.58-6.14-1.677l-.44-.26-3.645.957.973-3.55-.287-.457a11.309 11.309 0 0 1-1.772-6.04c0-6.214 5.098-11.312 11.311-11.312 6.214 0 11.312 5.098 11.312 11.312 0 6.213-5.098 11.311-11.312 11.311zm6.153-8.307c-.337-.169-1.99-.983-2.298-1.095-.307-.113-.531-.17-.755.168-.225.337-.868 1.095-1.065 1.32-.197.225-.394.253-.731.084-.337-.168-1.424-.525-2.712-1.676-1.003-.895-1.68-2.003-1.878-2.34-.197-.337-.02-.518.149-.687.152-.152.337-.394.506-.59.169-.197.225-.337.337-.562.113-.225.056-.422-.028-.59-.084-.168-.755-1.818-1.035-2.49-.274-.657-.552-.567-.755-.577l-.644-.014c-.225 0-.59.084-.897.422-.307.337-1.178 1.15-1.178 2.806 0 1.656 1.206 3.256 1.375 3.481.169.225 2.375 3.628 5.754 5.089.805.347 1.433.554 1.922.71.808.257 1.543.221 2.124.134.648-.097 1.99-.813 2.27-1.6.281-.787.281-1.46.197-1.6-.084-.14-.307-.225-.644-.394z" />
          </svg>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform"
          href="tel:+918894110026"
          aria-label="Call us"
        >
          <PhoneCall className="h-6 w-6" />
        </motion.a>
      </motion.div>
      <main>
        <Hero />
        <WhyChooseUs />
        <About />
        <Services />
        <Training />
        <Team />
        <Portfolio />
        <Testimonials />
        <TechStack />
        {/* <Blog /> */}
        <Careers />
        <Contact />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
