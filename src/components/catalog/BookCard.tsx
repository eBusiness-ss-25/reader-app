import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer";
import { DrawerTrigger } from "../ui/drawer";

type BookCardProps = {
  id?: string; // Buch-ID für die Detailseite
  title: string;
  author?: string;
  introduction?: string;
  image?: string;
  bookPage?: number;
  numPages?: number;
};

export function BookCard({
  title,
  author,
  introduction,
  image,
  bookPage,
  numPages,
}: BookCardProps) {
  const showProgress =
    typeof bookPage === "number" && typeof numPages === "number";
  const progress = showProgress && numPages ? (bookPage! / numPages) * 100 : 0;

  return (
    <div className="w-full">
      <Drawer>
        <DrawerTrigger asChild>
          <AspectRatio ratio={3 / 4} className="w-full">
            {image ? (
              <div>
                <img
                  src={image}
                  alt={title}
                  className="w-full h-auto rounded"
                />
                {showProgress && (
                  <div className="absolute bottom-0 left-0 w-full px-2 pb-2">
                    <Progress value={progress} className="h-2 bg-white/30" />
                    <div className="text-xs mt-1 text-white drop-shadow text-center">
                      {Math.round(progress)}% gelesen
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Card className="h-full w-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-md text-white">
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <>
                    {title && (
                      <div className="font-semibold text-base mb-1">
                        {title}
                      </div>
                    )}
                    {author && (
                      <div className="text-xs text-white/80 mb-2">{author}</div>
                    )}
                    {introduction && (
                      <div className="text-xs text-white/70 line-clamp-3">
                        {introduction}
                      </div>
                    )}
                    {showProgress && (
                      <div className="mt-3">
                        <Progress
                          value={progress}
                          className="h-2 bg-white/30"
                        />
                        <div className="text-xs mt-1">
                          {Math.round(progress)}% gelesen
                        </div>
                      </div>
                    )}
                  </>
                </CardContent>
              </Card>
            )}
          </AspectRatio>
        </DrawerTrigger>
        <DrawerContent className="h-full">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
