import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type BookCardProps = {
  id: string; // Buch-ID für die Detailseite
  title: string;
  author?: string;
  introduction?: string;
  image?: string;
  bookPage?: number;
  numPages?: number;
};

export function BookCard({
  id,
  title,
  author,
  introduction,
  image,
  bookPage,
  numPages,
}: BookCardProps) {
  const [showInfo, setShowInfo] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const showProgress =
    typeof bookPage === "number" && typeof numPages === "number";
  const progress = showProgress && numPages ? (bookPage! / numPages) * 100 : 0;

  // Overlay schließen, wenn außerhalb geklickt wird
  useEffect(() => {
    if (!showInfo) return;
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowInfo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showInfo]);

  const handleClick = () => {
    if (!showInfo) {
      setShowInfo(true);
    } else {
      router.push(`/book/${id}`);
    }
  };

  return (
    <Card
      ref={cardRef}
      className="min-h-[180px] min-w-[140px] max-w-[180px] w-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-md text-white overflow-hidden group relative"
      onClick={handleClick}
      tabIndex={0}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <CardContent
        className={`
          p-4 flex flex-col justify-between h-full
          absolute inset-0 z-10
          bg-black/70
          transition-opacity
          ${showInfo ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
      >
        <div>
          <div className="font-semibold text-base mb-1">{title}</div>
          {author && <div className="text-xs text-white/80 mb-2">{author}</div>}
          {introduction && (
            <div className="text-xs text-white/70 line-clamp-3">
              {introduction}
            </div>
          )}
        </div>
        {showProgress && (
          <div className="mt-3">
            <Progress value={progress} className="h-2 bg-white/30" />
            <div className="text-xs mt-1">{Math.round(progress)}% gelesen</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
