import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Section = {
  title: string;
  children?: React.ReactNode;
  className?: string;
  onTitleClick?: () => void;
};

export function Section({ title, children, className, onTitleClick }: Section) {
  return (
    <section className={cn("mb-8", className)}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <button
          className="flex items-center text-muted-foreground hover:text-primary transition"
          onClick={onTitleClick}
          aria-label={`Alle Bücher in ${title}`}
          type="button"
        >
          <ArrowRight size={20} />
        </button>
      </div>
      <ScrollArea className="w-full">
        <div className="flex gap-4 min-w-full">{children}</div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
