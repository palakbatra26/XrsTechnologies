import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isScrolled?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, isScrolled, size = "md" }: LogoProps) {
  const circleSizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Logo in Circle - White circle */}
      <div className={cn(
        "rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm",
        circleSizeClasses[size]
      )}>
        <img
          src="/logo.png"
          alt="VPRO TECH DIGITAL Logo"
          className="w-full h-full object-contain p-2"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            // Try different formats
            if (target.src.includes('logo.png')) {
              target.src = '/logo.svg';
            } else if (target.src.includes('logo.svg')) {
              target.src = '/logo.jpg';
            } else if (target.src.includes('logo.jpg')) {
              target.src = '/logo.jpeg';
            } else {
              // Hide image if no logo file found - circle will remain visible as white
              target.style.display = 'none';
            }
          }}
        />
      </div>
      {/* Text - VPRO TECH DIGITAL */}
      <div className="flex flex-col leading-tight">
        <span className={cn(
          "font-bold uppercase tracking-tight",
          textSizeClasses[size],
          isScrolled !== undefined 
            ? (isScrolled ? "text-foreground" : "text-primary-foreground")
            : "text-foreground"
        )}>
          Xrs Technologies
        </span>
        <span className={cn(
          "font-bold uppercase tracking-tight",
          textSizeClasses[size],
          isScrolled !== undefined
            ? (isScrolled ? "text-foreground/80" : "text-primary-foreground/90")
            : "text-foreground/80"
        )}>
          Technologies
        </span>
      </div>
    </div>
  );
}
