import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Training", href: "#training" },
  { name: "Team", href: "#team" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Career", href: "#career" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const socialLinks = [
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61562280483740", icon: Facebook },
    { label: "X", href: "https://x.com/PalakBatra26_", icon: Twitter },
    { label: "Instagram", href: "https://www.instagram.com/palakbatra26_/", icon: Instagram },
    { label: "YouTube", href: "https://www.youtube.com/@vprotechdigital5980/featured", icon: Youtube },
  ];

  return (
    <footer className="bg-navy-900 text-primary-foreground">
      <div className="section-container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center font-display font-bold text-lg text-accent-foreground">
                V
              </div>
              <span className="font-display font-bold text-xl">
                Xrs <span className="text-accent">Technologies</span>
              </span>
            </div>
            <p className="text-primary-foreground/60 text-sm mb-6 leading-relaxed">
              Innovating IT Solutions, Empowering Talent. We deliver cutting-edge software solutions and industry-ready training.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-accent text-sm flex items-center gap-2 transition-colors"
                  >
                    <ArrowRight className="w-3 h-3" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/60 text-sm">
                  SCF-116a, 2nd Floor, Ind Area, Sector 58, Phase 5, Mohali
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/60 text-sm">+91-88941-10026</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/60 text-sm">0172-3503511</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/60 text-sm">Xrstechnologies@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter - Currently commented out in user input but kept if needed later or removed if requested. User input has it commented out. */}
           {/* <div> 
             <h4 className="font-display font-semibold text-lg mb-6">Newsletter</h4> 
             <p className="text-primary-foreground/60 text-sm mb-4"> 
               Subscribe to our newsletter for updates 
             </p> 
             <form className="flex gap-2"> 
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 className="flex-1 px-4 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent" 
               /> 
               <button 
                 type="submit" 
                 className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground hover:bg-accent/90 transition-colors" 
               > 
                 <ArrowRight className="w-5 h-5" /> 
               </button> 
             </form> 
           </div> */} 
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="section-container py-6">
          <p className="text-center text-primary-foreground/50 text-sm">
            © 2026 Xrs Technologies. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
