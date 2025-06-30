"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import ReaderAPI, { PageData } from "@/lib/api/reader/reader";

const readerApi = new ReaderAPI();

interface ReaderProps {
  bookId: string;
  onClose?: () => void;
  onToggle?: (checked: boolean) => void;
}

export const Reader: React.FC<ReaderProps> = ({
  bookId,
  onClose,
  onToggle,
}) => {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toggleOn, setToggleOn] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const book = await readerApi.getBookWithPages(bookId);
        const sorted = book.BookPages.slice().sort(
          (a, b) => a.pageNumber - b.pageNumber
        );
        setPages(sorted);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [bookId]);

  return (
    <Card className="relative w-full h-full rounded-none flex flex-col overflow-hidden bg-gradient-to-b from-white to-yellow-50 shadow-lg">
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
      <CardContent className="relative flex-1 p-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {error && <div className="p-4 text-red-600">{error}</div>}
        {loading && <div className="p-4 text-center">Lade Buch …</div>}
        {!loading && (
          <div className="flex-1 overflow-auto p-6">
            {pages.map((pg) => (
              <div
                key={pg.id}
                className="prose max-w-none text-gray-800 mb-8"
                dangerouslySetInnerHTML={{ __html: pg.content }}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Reader;
