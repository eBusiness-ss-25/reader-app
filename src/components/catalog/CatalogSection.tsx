import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CatalogSection = {
  title: string;
  children?: React.ReactNode;
  className?: string;
  onTitleClick?: () => void;
};

export function CatalogSection({
  title,
  children,
  className,
  onTitleClick,
}: CatalogSection) {
  return (
    <section className={cn("mb-8 w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button
          className="flex items-center text-muted-foreground hover:text-primary transition"
          onClick={onTitleClick}
          aria-label={`All books in ${title}`}
          type="button"
        >
          <ArrowRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full">
        {children}
      </div>
    </section>
  );
}
