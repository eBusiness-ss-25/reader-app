import { useState, useRef, useEffect } from "react";
import { useBook } from "@/lib/hooks/useBook";
import ReaderAPI from "@/lib/api/reader/reader";
import { Switch } from "../ui/switch";
import CloseButton from "../common/CloseButton";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import BookAPI from "@/lib/api/book/book";

export function Reader({ bookId }: { bookId: string }) {
  const { pages, error, loading } = useBook(bookId);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [maxVisitedPageIdx, setMaxVisitedPageIdx] = useState(0);

  const currentPage = pages[currentPageIdx];

  // fetch user book progress
  useEffect(() => {
    let isMounted = true;
    const fetchProgress = async () => {
      const api = new BookAPI();
      const userBooks = await api.getBooksForUser();
      const userBook = userBooks.find((ub) => ub.bookId === bookId);
      if (userBook && typeof userBook.bookPage === "number" && isMounted) {
        setCurrentPageIdx(userBook.bookPage - 1);
        setMaxVisitedPageIdx(userBook.bookPage - 1);
      }
    };
    fetchProgress();
    return () => {
      isMounted = false;
    };
  }, [bookId]);

  // Track highest page visited
  useEffect(() => {
    setMaxVisitedPageIdx((prev) => Math.max(prev, currentPageIdx));
  }, [currentPageIdx]);

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

  // update user book progress
  useEffect(() => {
    let storedBookPage: number | null = null;
    const fetchStoredProgress = async () => {
      const api = new BookAPI();
      const userBooks = await api.getBooksForUser();
      const userBook = userBooks.find((ub) => ub.bookId === bookId);
      storedBookPage = userBook?.bookPage ?? null;
    };
    fetchStoredProgress();

    return () => {
      if (pages.length > 0) {
        const api = new ReaderAPI();
        const maxVisitedPageNumber = pages[maxVisitedPageIdx]?.pageNumber ?? 0;
        if (
          storedBookPage === null ||
          maxVisitedPageNumber + 1 > storedBookPage
        ) {
          api.updateBookPage(bookId, maxVisitedPageNumber + 1);
        }
      }
    };
  }, [bookId, maxVisitedPageIdx, pages]);

  return (
    <div className="h-screen flex flex-col">
      <div className="top-0 left-0 w-full flex justify-between items-center p-4 md:p-6 z-20">
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
        <div className="relative flex flex-col flex-1 p-0 md:pt-24">
          {videoUrl && (
            <div className="w-full flex justify-center relative mb-4 md:mb-8 px-2 md:px-0">
              <video
                ref={videoRef}
                src={videoUrl}
                width={300}
                height={250}
                preload="auto"
                autoPlay
                muted={!soundOn}
                playsInline
                controlsList="nodownload nofullscreen noremoteplayback"
                controls={false}
                className="rounded-lg shadow-md w-full max-w-xl aspect-video"
              />
            </div>
          )}
          <div className="flex-1 overflow-auto px-2 md:px-8 pb-4 md:pb-8">
            <div
              className="prose max-w-none text-gray-800 mb-8 text-base md:text-lg"
              dangerouslySetInnerHTML={{ __html: currentPage.content }}
            />
          </div>
          <div className="flex justify-between items-center px-4 md:px-12 pb-6 md:pb-12 mt-auto">
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
        </div>
      )}
    </div>
  );
}
