import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CategorySectionProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
  onTitleClick?: () => void;
};

export function CategorySection({
  title,
  children,
  className,
  onTitleClick,
}: CategorySectionProps) {
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
      <div className="grid grid-cols-2 gap-4">
        {children}
      </div>
    </section>
  );
}
