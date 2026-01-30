import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  isScrolled?: boolean;
  showLabel?: boolean;
  className?: string;
};

export function ThemeToggle({ isScrolled = false, showLabel = false, className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant={isScrolled ? "ghost" : "heroOutline"}
      size={showLabel ? "sm" : "icon"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        isScrolled ? "text-foreground" : "text-primary-foreground border-primary-foreground/40",
        showLabel ? "gap-2 px-3" : "",
        className,
      )}
    >
      {isDark ? <Sun /> : <Moon />}
      {showLabel ? (isDark ? "Day" : "Night") : null}
    </Button>
  );
}
