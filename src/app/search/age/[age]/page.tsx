"use client";

import { BookCard } from "@/components/catalog/BookCard";
import BackButton from "@/components/common/BackButton";
import CloseButton from "@/components/common/CloseButton";
import Loading from "@/components/common/Loading";
import BookAPI, { Book } from "@/lib/api/book/book";
import { use, useState, useEffect } from "react";
import Image from "next/image";

interface AgeSearchPageProps {
  params: Promise<{
    age: number;
  }>;
}

export default function AgeSearchPage({ params }: AgeSearchPageProps) {
  const { age } = use(params);

  const icon = age < 4 ? "👶🏻" : age < 6 ? "🛝" : age >= 6 ? "🎓" : "❓";

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const bookApi = new BookAPI();
        const data = await bookApi.getBooksByAge(age);

        setBooks(data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Bücher:", error);
      } finally {
        setLoading(false);
      }
    }

    if (loading) {
      fetchBooks();
    }
  }, [age, loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-8">
      <div className="w-full flex justify-between mb-4">
        <BackButton url="/search" />
        <Image src="/Reeda_Logo_v2.png" width={200} height={160} alt="Logo" />
        <CloseButton url="/catalog" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Bücher für das Alter { icon }</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
            />
          ))
        ) : (
          `No books found for age ${age} ${icon}.`
        )}
      </div>
    </div>
  );
}