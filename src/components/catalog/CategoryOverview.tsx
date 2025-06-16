"use client";

import { useEffect, useState } from "react";
import CategoryAPI from "@/lib/api/category/category";
import { CatalogSection } from "@/components/catalog/CatalogSection";
import { BookCard } from "./BookCard";

type Book = {
  id: string;
  title: string;
  author?: string;
  introduction?: string;
  // weitere Felder falls nötig
};

type CategoryWithBooks = {
  id: string;
  name: string;
  Books: Book[];
};

//TODO: Mockdaten erweiteren, um Buchcards anzuzeigen
// const mockCategories: CategoryWithBooks[] = [
//   { id: "1", name: "Fiktion" },
//   { id: "2", name: "Sachbuch" },
//   { id: "3", name: "Kinder- und Jugendbücher" },
//   { id: "4", name: "Science-Fiction" },
//   { id: "5", name: "Fantasy" },
// ];

export default function CategoryOverview() {
  const [categories, setCategories] = useState<CategoryWithBooks[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = new CategoryAPI();
    api
      .getCategoryWithBooks()
      .then(setCategories)
      .finally(() => setLoading(false));

    // MOCKDATEN nutzen:
    // setTimeout(() => {
    //   setCategories(mockCategories);
    //   setLoading(false);
    // }, 300); // 300ms Fake-Loading für echtes Gefühl
  }, []);

  if (loading) return <div>Lade Kategorien...</div>;

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <CatalogSection key={category.id} title={category.name}>
          {category.Books && category.Books.length > 0 ? (
            category.Books.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                introduction={book.introduction}
              />
            ))
          ) : (
            <div className="col-span-2 text-sm text-muted-foreground">
              Noch keine Bücher in dieser Kategorie.
            </div>
          )}
        </CatalogSection>
      ))}
    </div>
  );
}
