"use client";
import { useEffect, useState } from "react";
import CategoryAPI from "@/lib/api/category/category";
import CategoryOverview from "@/components/catalog/CategoryOverview";
import PersonalOverview from "@/components/catalog/PersonalOverview";
import Loading from "@/components/common/Loading";
import {
  CatalogLoadingProvider,
  useCatalogLoading,
} from "@/lib/hooks/useCatalogLoading";
import { Navbar } from "@/components/nav/Navbar";

type Book = { id: string; title: string };
type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  Books: Book[];
};

function CatalogContent() {
  const { isLoading } = useCatalogLoading();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = new CategoryAPI();
    api.getCategoryWithBooks().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {(isLoading || loading) && <Loading />}
      <div className="flex min-h-screen flex-col w-full max-w-3xl mx-auto py-8 px-4 sm:px-8 gap-4">
        <Navbar />
        <PersonalOverview />
        <CategoryOverview categories={categories} />
      </div>
    </>
  );
}

export default function CatalogPage() {
  return (
    <CatalogLoadingProvider>
      <CatalogContent />
    </CatalogLoadingProvider>
  );
}
