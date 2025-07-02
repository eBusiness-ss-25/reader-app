"use client";

import { useEffect, useState } from "react";
import CategoryAPI from "@/lib/api/category/category";
import { Section } from "@/components/catalog/Section";
import { BookCard } from "./BookCard";
import { useCatalogLoading } from "@/lib/hooks/useCatalogLoading";

type Book = {
  id: string;
  title: string;
  author?: string;
  introduction?: string;
  bookCoverId?: string;
  // additional fields if needed
};

type CategoryWithBooks = {
  id: string;
  name: string;
  Books: Book[];
};

export default function CategoryOverview() {
  const [categories, setCategories] = useState<CategoryWithBooks[]>([]);
  const [loading, setLoading] = useState(true);
  const { setComponentLoading } = useCatalogLoading();

  useEffect(() => {
    const api = new CategoryAPI();
    api
      .getCategoryWithBooks()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setComponentLoading("categories", loading);
  }, [loading, setComponentLoading]);

  return (
    <div className="w-full max-w-none space-y-6 mt-4">
      {loading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : (
        categories.map((category) => (
          <Section key={category.id} title={category.name} className="w-full">
            {category.Books && category.Books.length > 0 ? (
              category.Books.map((book) => (
                <BookCard
                  id={book.id}
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  introduction={book.introduction}
                  bookCoverId={book.bookCoverId}
                />
              ))
            ) : (
              <div className="col-span-full text-sm text-muted-foreground">
                No books in this category yet.
              </div>
            )}
          </Section>
        ))
      )}
    </div>
  );
}
