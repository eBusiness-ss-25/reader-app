import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Section = {
  title: string;
  children?: React.ReactNode;
  className?: string;
  onTitleClick?: () => void;
};

export function Section({ title, children, className, onTitleClick }: Section) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={cn("mb-8", className)}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <button
          className="flex items-center text-muted-foreground hover:text-primary transition"
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={
            expanded ? `Section zuklappen` : `Alle Bücher in ${title}`
          }
          type="button"
        >
          {expanded ? <ChevronDown size={20} /> : <ArrowRight size={20} />}
        </button>
      </div>
      {expanded ? (
        // Aufgeklappt: Bücher untereinander (z.B. Grid)
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {children}
        </div>
      ) : (
        // Standard: Horizontal scrollbare Bücher
        <ScrollArea className="w-full">
          <div className="flex gap-4 min-w-full">{children}</div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </section>
  );
}
