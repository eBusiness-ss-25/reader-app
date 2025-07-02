"use client";

import { use, useState, useEffect } from "react";
import CategoryAPI, { Category } from "../../../../lib/api/category/category";
import Loading from "@/components/common/Loading";
import { BookCard } from "@/components/catalog/BookCard";
import BackButton from "@/components/common/BackButton";
import CloseButton from "@/components/common/CloseButton";
import Image from "next/image";

interface CategorySearchProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default function CategorySearch({ params }: CategorySearchProps) {
  const { categoryId } = use(params);
  const [category, setCategory] = useState<Category | null>(null);
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCategory() {
      const categoryApi = new CategoryAPI();
      const fetchedCategory = await categoryApi.getSingleCategoryWithBooks(
        categoryId
      );
      setCategory(fetchedCategory);
    }

    if (pending) {
      fetchCategory();
      setPending(false);
    }
  }, [categoryId, pending]);

  if (pending || !category) {
    return <Loading />;
  }

  return (
    <div className="p-8">
      <div className="w-full flex justify-between mb-4">
        <BackButton url="/search" />
        <Image src="/reeda-logo.png" width={200} height={160} alt="Logo" />
        <CloseButton url="/catalog" />
      </div>
      <h1 className="text-3xl font-bold mb-4">
        <span>{category?.icon || "❓"}</span> {category?.name}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {category.Books && category.Books.length > 0 ? (
          category.Books.map((book) => (
            <BookCard key={book.id} title={book.title} />
          ))
        ) : (
          <p className="text-gray-500">
            Keine Bücher in dieser Kategorie gefunden.
          </p>
        )}
      </div>
    </div>
  );
}
