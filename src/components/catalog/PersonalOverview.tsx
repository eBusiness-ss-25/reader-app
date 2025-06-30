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
    <Section title="Your Books" variant="grid">
      {loading ? (
        <div className="col-span-2 text-sm text-muted-foreground">Loading…</div>
      ) : userBooks.length > 0 ? (
        userBooks.map((entry) => (
          <BookCard
            id={entry.book.id}
            key={entry.book.id}
            title={entry.book.title}
            image={"/example.png"} // Placeholder image, replace with actual image URL if available
            author={entry.book.author}
            introduction={entry.book.introduction}
            bookPage={entry.bookPage}
            numPages={entry.book.numPages ?? 0}
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
