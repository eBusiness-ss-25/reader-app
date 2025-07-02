import { useEffect, useState } from "react";
import BookAPI from "@/lib/api/book/book";
import { Section } from "@/components/catalog/Section";
import { BookCard } from "@/components/catalog/BookCard";
import { useCatalogLoading } from "@/lib/hooks/useCatalogLoading";

// Types
type Book = {
  id: string;
  title: string;
  author?: string;
  introduction?: string;
  bookCoverId?: string; // URL or path to the book cover image
  numPages?: number;
};

type UserBook = {
  id: string;
  book: Book;
  bookPage: number;
};

export default function PersonalBooksSection() {
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [loading, setLoading] = useState(true);
  const { setComponentLoading } = useCatalogLoading();

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const api = new BookAPI();
        const data = await api.getBooksForUser();
        setUserBooks(data);
      } catch {
        setUserBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBooks();
  }, []);

  useEffect(() => {
    setComponentLoading("personalBooks", loading);
  }, [loading, setComponentLoading]);

  return (
    <Section title="Deine Bücher" variant="grid" className="pt-10">
      {loading ? (
        <div className="col-span-2 text-sm text-muted-foreground">Loading…</div>
      ) : userBooks.length > 0 ? (
        userBooks.map((entry) => (
          <BookCard
            id={entry.book.id}
            key={entry.book.id}
            title={entry.book.title}
            bookCoverId={entry.book.bookCoverId}
            author={entry.book.author}
            introduction={entry.book.introduction}
            bookPage={entry.bookPage}
            numPages={entry.book.numPages ?? 0}
            userId={entry.id}
          />
        ))
      ) : (
        <div className="col-span-2 text-sm text-muted-foreground">
          You don&apos;t have any books yet!
        </div>
      )}
    </Section>
  );
}
