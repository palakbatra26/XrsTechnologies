import { useState, useEffect, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Training", href: "#training" },
  { name: "Team", href: "#team" },
  { name: "Portfolio", href: "#portfolio" },
  // { name: "Blog", href: "#blog" },
  { name: "Career", href: "#careers" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <motion.header
      initial={{ y: hasReducedMotion ? 0 : -100 }}
      animate={{ y: 0 }}
      transition={{ duration: hasReducedMotion ? 0 : 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/95 backdrop-blur-lg shadow-lg py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="section-container">
       <nav className="flex items-center">
  {/* Left: Logo (text below logo) */}
  <Link to="/" onClick={handleLogoClick} className="flex flex-col items-start shrink-0">
    <img
      src="/VPROO.png"
      alt="Logo"
      className="w-28 h-20 sm:w-32 sm:h-24 object-contain"
    />

    {/* <span
      className={cn(
        "mt-1 font-display font-bold leading-tight transition-colors",
        isScrolled ? "text-foreground" : "text-primary-foreground"
      )}
    >
      VproTech
      <br />
      <span className="text-accent">Digital</span>
    </span> */}
  </Link>

  {/* Center: Desktop Navigation (this will go more right/center properly) */}
  <div className="hidden lg:flex ml-auto items-center gap-1 xl:gap-2">
    {navItems.map((item, index) => (
      <motion.a
        key={item.name}
        href={item.href === "#home" ? "/" : `/${item.href}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: hasReducedMotion ? 0 : 0.3,
          delay: hasReducedMotion ? 0 : 0.1 + index * 0.05,
        }}
        whileHover={{ scale: hasReducedMotion ? 1 : 1.05, y: hasReducedMotion ? 0 : -2 }}
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
          isScrolled
            ? "text-foreground/70 hover:text-foreground hover:bg-muted"
            : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
        )}
      >
        {item.name}
      </motion.a>
    ))}
  </div>

  {/* Right: Actions */}
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: hasReducedMotion ? 0 : 0.3, delay: hasReducedMotion ? 0 : 0.5 }}
    className="hidden lg:flex items-center gap-3 pl-2"
  >
    <ThemeToggle isScrolled={isScrolled} />

    <motion.div whileHover={{ scale: hasReducedMotion ? 1 : 1.05 }} whileTap={{ scale: hasReducedMotion ? 1 : 0.95 }}>
      <Button asChild variant={isScrolled ? "outline" : "heroSecondary"} size="lg" className="transition-transform">
        <Link to="/verify">Student Verification</Link>
      </Button>
    </motion.div>

    <SignedOut>
      <SignInButton mode="modal">
        <motion.div whileHover={{ scale: hasReducedMotion ? 1 : 1.05 }} whileTap={{ scale: hasReducedMotion ? 1 : 0.95 }}>
          <Button variant={isScrolled ? "accent" : "heroPrimary"} size="lg" className="transition-transform">
            Sign In / Sign Up
          </Button>
        </motion.div>
      </SignInButton>
    </SignedOut>

    <SignedIn>
      <UserButton />
    </SignedIn>
  </motion.div>

  {/* Mobile Menu Button (right end) */}
  <button
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    className={cn(
      "lg:hidden ml-auto p-2 rounded-lg",
      isScrolled ? "text-foreground" : "text-primary-foreground"
    )}
  >
    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
</nav>


        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: hasReducedMotion ? 0 : 0.3 }}
              className="lg:hidden mt-4 bg-card rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href === "#home" ? "/" : `/${item.href}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-2">
                  <ThemeToggle isScrolled showLabel className="w-full justify-center" />
                </div>
                <div className="pt-4">
                  <Button asChild variant="outline" className="w-full mb-2" size="lg">
                    <Link to="/verify">Student Verification</Link>
                  </Button>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button variant="accent" className="w-full" size="lg">
                        Sign In / Sign Up
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="flex justify-center">
                      <UserButton />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
