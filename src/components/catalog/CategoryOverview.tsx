"use client";

import { useEffect, useState } from "react";
import CategoryAPI from "@/lib/api/category/category";
import { CategorySection } from "@/components/catalog/category-section";

type Category = {
  id: string;
  name: string;
};

const mockCategories: Category[] = [
  { id: "1", name: "Fiktion" },
  { id: "2", name: "Sachbuch" },
  { id: "3", name: "Kinder- und Jugendbücher" },
  { id: "4", name: "Science-Fiction" },
  { id: "5", name: "Fantasy" },
];

export default function CategoryOverview() {
  const categoryAPI = new CategoryAPI();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // REST-Request für später:
    // categoryAPI.getAllCategories()
    //   .then(setCategories)
    //   .finally(() => setLoading(false));

    // MOCKDATEN nutzen:
    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 300); // 300ms Fake-Loading für echtes Gefühl
  }, []);

  if (loading) return <div>Lade Kategorien...</div>;

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <CategorySection key={category.id} title={category.name}>
          {/* Später Buchcards hier */}
        </CategorySection>
      ))}
    </div>
  );
}
