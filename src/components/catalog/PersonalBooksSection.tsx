"use client";

import { useEffect, useState } from "react";
import BookAPI from "@/lib/api/book/book";
import { CatalogSection } from "@/components/catalog/CatalogSection";
import { BookCard } from "./BookCard";

// Book- und UserBook-Typen
type Book = {
  id: string;
  title: string;
  author?: string;
  introduction?: string;
};

type UserBook = {
  id: string;
  book: Book;
  bookPage: number;
};

export default function PersonalBooksSection() {
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const api = new BookAPI();
        const data = await api.getBooksForUser();
        setUserBooks(data);
      } catch (err) {
        // Optionale Fehlerbehandlung
        setUserBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBooks();
  }, []);

  return (
    <CatalogSection title="Deine Bücher">
      {loading ? (
        <div className="col-span-2 text-sm text-muted-foreground">Lädt…</div>
      ) : userBooks.length > 0 ? (
        userBooks.map((entry) => (
          <BookCard
            key={entry.book.id}
            title={entry.book.title}
            author={entry.book.author}
            introduction={entry.book.introduction}
          />
        ))
      ) : (
        <div className="col-span-2 text-sm text-muted-foreground">
          Du hast noch keine eigenen Bücher!
        </div>
      )}
    </CatalogSection>
  );
}
