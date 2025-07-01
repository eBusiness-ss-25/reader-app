import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useBook } from "@/lib/hooks/useBook";
import ReaderAPI from "@/lib/api/reader/reader";
import { Switch } from "../ui/switch";
import CloseButton from "../common/CloseButton";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export function Reader({ bookId }: { bookId: string }) {
  const { pages, error, loading } = useBook(bookId);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const currentPage = pages[currentPageIdx];

  useEffect(() => {
    if (!currentPage) return;
    const api = new ReaderAPI();
    api.getVideoIdByPageId(currentPage.id).then(setVideoUrl);
  }, [currentPage]);

  const goPrev = () => {
    if (currentPageIdx > 0) setCurrentPageIdx((idx) => idx - 1);
  };
  const goNext = () => {
    if (currentPageIdx < pages.length - 1) setCurrentPageIdx((idx) => idx + 1);
  };

  useEffect(() => {
    setHasPlayed(false);
  }, [videoUrl]);

  return (
    <Card className="relative w-full h-full flex flex-col overflow-hidden bg-gradient-to-b from-white to-yellow-50 shadow-lg max-w-2xl mx-auto">
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-20">
        <div className="flex items-center gap-2">
          <Switch
            checked={soundOn}
            onCheckedChange={setSoundOn}
            id="sound-switch"
          />
          <label htmlFor="sound-switch" className="text-sm select-none">
            Ton {soundOn ? "an" : "aus"}
          </label>
        </div>
        <CloseButton url="/catalog" />
      </div>

      {error && <div className="p-4 text-red-600">{error}</div>}
      {loading && <div className="p-4 text-center">Lade Buch …</div>}

      {!loading && currentPage && (
        <CardContent className="relative flex flex-col flex-1 p-0 pt-20">
          {videoUrl && (
            <div className="w-full mb-8 flex justify-center relative">
              <video
                ref={videoRef}
                src={videoUrl}
                width={300}
                height={250}
                preload="auto"
                autoPlay
                muted={!soundOn || hasPlayed}
                playsInline
                controlsList="nodownload nofullscreen noremoteplayback"
                controls={false}
                className="rounded-lg shadow-md"
                onEnded={() => {
                  setHasPlayed(true);
                  if (videoRef.current) {
                    videoRef.current.muted = true;
                    videoRef.current.play();
                  }
                }}
              />
            </div>
          )}
          <div className="flex-1 overflow-auto p-8">
            <div
              className="prose max-w-none text-gray-800 mb-8"
              dangerouslySetInnerHTML={{ __html: currentPage.content }}
            />
          </div>
          <div className="flex justify-between items-center px-8 pb-8">
            <button
              onClick={goPrev}
              disabled={currentPageIdx === 0}
              className={`rounded-full p-2 transition ${
                currentPageIdx === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-accent/30"
              }`}
              aria-label="Vorherige Seite"
            >
              <ChevronLeftIcon size={32} />
            </button>
            <span className="text-sm text-muted-foreground">
              Seite {currentPageIdx + 1} / {pages.length}
            </span>
            <button
              onClick={goNext}
              disabled={currentPageIdx === pages.length - 1}
              className={`rounded-full p-2 transition ${
                currentPageIdx === pages.length - 1
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-accent/30"
              }`}
              aria-label="Nächste Seite"
            >
              <ChevronRightIcon size={32} />
            </button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
