import { useState, useEffect } from "react";
import ReaderAPI, { PageData } from "@/lib/api/reader/reader";

const readerApi = new ReaderAPI();

interface UseBookResult {
  pages: PageData[];
  loading: boolean;
  error: string | null;
}

export function useBook(bookId: string): UseBookResult {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    readerApi
      .getBookWithPages(bookId)
      .then((book) => {
        const sorted = book.BookPages.slice().sort(
          (a, b) => a.pageNumber - b.pageNumber
        );
        setPages(sorted);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bookId]);

  return { pages, loading, error };
}
