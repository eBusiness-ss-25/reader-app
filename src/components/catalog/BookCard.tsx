import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";

type BookCardProps = {
  title: string;
  author?: string;
  introduction?: string;
};

export function BookCard({ title, author, introduction }: BookCardProps) {
  return (
    <div className="w-full">
      <AspectRatio ratio={3 / 4} className="w-full">
        <Card className="h-full w-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-md text-white">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div>
              <div className="font-semibold text-base mb-1">{title}</div>
              {author && (
                <div className="text-xs text-white/80 mb-2">
                  {author}
                </div>
              )}
              {introduction && (
                <div className="text-xs text-white/70 line-clamp-3">
                  {introduction}
                </div>
              )}
            </div>
            {/* Space for progressbar, actions, etc. */}
          </CardContent>
        </Card>
      </AspectRatio>
    </div>
  );
}
