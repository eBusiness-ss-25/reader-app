import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { DrawerTrigger } from "../ui/drawer";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import BookAPI from "@/lib/api/book/book";

type BookCardProps = {
  id?: string;
  title: string;
  author?: string;
  introduction?: string;
  bookCoverId?: string;
  bookPage?: number;
  numPages?: number;
  userId?: string;
};

export function BookCard({
  id,
  title,
  author,
  introduction,
  bookPage,
  bookCoverId,
  numPages,
  userId,
}: BookCardProps) {
  const showProgress =
    typeof bookPage === "number" && typeof numPages === "number";
  const progress = showProgress && numPages ? (bookPage! / numPages) * 100 : 0;

  const coverUrl = bookCoverId
    ? BookAPI.getBookCoverUrlById(bookCoverId)
    : undefined;

  return (
    <div className="w-full">
      <Drawer>
        <DrawerTrigger asChild>
          <AspectRatio ratio={2 / 3} className="w-full">
            <Card className="h-full w-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-md text-white overflow-hidden rounded-md">
              {coverUrl ? (
                <>
                  <Image
                    src={coverUrl}
                    alt={title}
                    fill
                    className="object-cover w-full h-full rounded-md"
                    style={{ objectFit: "cover" }}
                  />
                  {showProgress && (
                    <div className="absolute bottom-0 left-0 w-full px-2 pb-2 z-10">
                      <Progress value={progress} className="h-2 bg-white/30" />
                    </div>
                  )}
                </>
              ) : (
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  {title && (
                    <div className="font-semibold text-base mb-1">{title}</div>
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
                      <Progress value={progress} className="h-2 bg-white/30" />
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          </AspectRatio>
        </DrawerTrigger>
        <DrawerContent className="h-full">
          {coverUrl && (
            <div className="flex justify-center px-4 mt-4">
              <div className="w-2/3 max-w-xs">
                <AspectRatio ratio={2 / 3} className="w-full">
                  <Image
                    src={coverUrl}
                    alt={title}
                    fill
                    className="h-full w-full object-cover rounded-md"
                  />
                </AspectRatio>
              </div>
            </div>
          )}
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{author}</DrawerDescription>
          </DrawerHeader>
          <b className="px-8 py-4">Description</b>
          <div className="px-8">{introduction}</div>
          <DrawerFooter>
            <Button disabled={!userId}>
              <Link href={`/reader/${id}`}>Lesen</Link>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
