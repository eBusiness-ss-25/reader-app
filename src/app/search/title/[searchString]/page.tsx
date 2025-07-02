"use client";

import { BookCard } from "@/components/catalog/BookCard";
import BackButton from "@/components/common/BackButton";
import CloseButton from "@/components/common/CloseButton";
import Loading from "@/components/common/Loading";
import AuthAPI from "@/lib/api/auth/auth";
import BookAPI, { Book } from "@/lib/api/book/book";
import { use, useState, useEffect } from "react";
import Image from "next/image";

interface TitleSearchProps {
  params: Promise<{
    searchString: string;
  }>;
}

export default function CategorySearch({ params }: TitleSearchProps) {
  const { searchString } = use(params);
  const decodedSearch = decodeURIComponent(searchString);
  const [books, setBooks] = useState<Book[]>([]);
  const [pending, setPending] = useState<boolean>(true);

  const authAPI = new AuthAPI();

  useEffect(() => {
    const bookApi = new BookAPI();
    bookApi.searchBooksByTitle(decodedSearch)
      .then((data) => {
        console.log(data);
        setBooks(data);
        setPending(false);
      })
      .catch((error) => {
        console.error("Error loading books:", error);
        setPending(false);
      });
  }, [decodedSearch]);

  if (pending) {
    return <Loading />;
  }

  return (
    <div className="p-8">
      <div className="w-full flex justify-between mb-4">
        <BackButton url="/search" />
        <Image src="/reeda-logo.png" width={200} height={160} alt="Logo" />
        <CloseButton url="/catalog" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Ergebnisse für:<br />{decodedSearch}</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              title={book.title}
              author={book.author}
              key={book.id}
              introduction={book.introduction}
              bookCoverId={book.bookCoverId}
              numPages={book.numPages}
              userId={authAPI.getUserId() || undefined}
            />
          ))
        ) : (
          <p>Keine Bücher gefunden</p>
        )}
      </div>
    </div>
  )
}
