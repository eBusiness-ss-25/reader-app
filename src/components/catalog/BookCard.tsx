import { Card, CardContent } from "@/components/ui/card";

type BookCardProps = {
  title: string;
  author?: string;
  introduction?: string;
};

export function BookCard({ title, author, introduction }: BookCardProps) {
  return (
    <Card className="min-h-[120px] min-w-[140px] max-w-[180px] w-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-md text-white">
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div>
          <div className="font-semibold text-base mb-1">{title}</div>
          {author && <div className="text-xs text-white/80 mb-2">{author}</div>}
          {introduction && (
            <div className="text-xs text-white/70 line-clamp-3">
              {introduction}
            </div>
          )}
        </div>
        {/* Platz für Progressbar, Actions, etc. */}
      </CardContent>
    </Card>
  );
}
