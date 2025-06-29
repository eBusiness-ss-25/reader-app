import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import ReaderAPI, { PageData } from "@/lib/api/reader/reader";

const readerApi = new ReaderAPI();

interface ReaderProps {
  bookId: string;
  initialPage?: number;
  onClose?: () => void;
  onToggle?: (checked: boolean) => void;
}

export const Reader: React.FC<ReaderProps> = ({
  bookId,
  initialPage = 1,
  onClose,
  onToggle,
}) => {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [toggleOn, setToggleOn] = useState(false);

  const loadPage = useCallback(
    async (page: number) => {
      if (totalPages !== null && page > totalPages) return;
      setLoading(true);
      setError(null);
      try {
        const data = await readerApi.getPage(bookId, page);
        setPages((prev) => {
          if (prev.some((p) => p.pageNumber === data.pageNumber)) return prev;
          return [...prev, data];
        });
        setTotalPages(data.totalPages);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [bookId, totalPages]
  );

  useEffect(() => {
    setPages([]);
    setCurrentPage(initialPage);
    setTotalPages(null);
    loadPage(initialPage);
  }, [bookId, initialPage, loadPage]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (loading) return;
      if (totalPages !== null && currentPage >= totalPages) return;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
        const next = currentPage + 1;
        setCurrentPage(next);
        loadPage(next);
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [loading, currentPage, totalPages, loadPage]);

  return (
    <Card className="relative w-full max-w-md h-[600px] mx-auto rounded-2xl overflow-hidden bg-gradient-to-b from-white to-yellow-50 shadow-lg">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10">
        <Switch
          checked={toggleOn}
          onCheckedChange={(v) => {
            setToggleOn(v);
            onToggle?.(v);
          }}
        />
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1 rounded-full bg-white/80 hover:bg-white"
          aria-label="Close Reader"
        >
          <X size={20} />
        </button>
      )}

      {/* Content */}
      <CardContent className="relative flex-1 p-0">
        {error && <div className="p-4 text-red-600">{error}</div>}
        <ScrollArea ref={scrollRef} className="h-full w-full p-6">
          {pages.map((pg) => (
            <div
              key={pg.pageNumber}
              className="prose max-w-none text-gray-800 mb-8"
              dangerouslySetInnerHTML={{ __html: pg.content }}
            />
          ))}
          {loading && <div className="py-2 text-center">Lade mehr …</div>}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Reader;
