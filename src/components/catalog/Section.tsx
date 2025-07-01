import { useState } from "react";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Section = {
  title: string;
  children?: React.ReactNode;
  className?: string;
  onTitleClick?: () => void;
  variant?: "horizontal" | "grid";
};

export function Section({
  title,
  children,
  className,
  variant = "horizontal",
}: Section) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={cn("mb-6 relative z-0 clear-both", className)}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <button
          className="flex items-center text-muted-foreground hover:text-primary transition"
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={
            expanded ? `Collapse section` : `Show all books in ${title}`
          }
          type="button"
        >
          {expanded ? (
            <HiChevronDown size={20} />
          ) : (
            <HiChevronRight size={20} />
          )}
        </button>
      </div>
      {expanded ? (
        // Expanded: Books in grid layout, responsive sizing
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {children}
        </div>
      ) : variant === "grid" ? (
        // Grid: 2 columns on mobile, 3 on tablet portrait, 6 on tablet landscape
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {children}
        </div>
      ) : (
        // Standard: Horizontal scrollable books with fixed min/max sizes
        <ScrollArea className="w-full">
          <div className="flex gap-4 min-w-full">
            {Array.isArray(children) ? (
              children.map((child, index) => (
                <div key={index} className="min-w-[140px] max-w-[180px] flex-shrink-0">
                  {child}
                </div>
              ))
            ) : (
              <div className="min-w-[140px] max-w-[180px] flex-shrink-0">
                {children}
              </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </section>
  );
}
