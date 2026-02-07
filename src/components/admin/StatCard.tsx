import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

const useCountUp = (value: number, duration = 900) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const diff = value - from;

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.round(from + diff * progress));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return display;
};

export function StatCard({ label, value, prefix, suffix }: StatCardProps) {
  const display = useCountUp(value);

  return (
    <Card className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-3 text-2xl font-semibold text-foreground">
        {prefix}
        {display.toLocaleString("en-IN")}
        {suffix}
      </div>
    </Card>
  );
}
