"use client";
import CategoryOverview from "@/components/catalog/CategoryOverview";
import PersonalBooksSection from "@/components/catalog/PersonalBooksSection";
import { SearchButton } from "@/components/catalog/SearchButton";
import Loading from "@/components/common/Loading";
import { CatalogLoadingProvider, useCatalogLoading } from "@/lib/hooks/useCatalogLoading";

function CatalogContent() {
  const { isLoading } = useCatalogLoading();
  return (
    <>
      {isLoading && <Loading />}
      <div className="flex min-h-screen flex-col items-center px-12 py-8 gap-4">
        <SearchButton />
        <PersonalBooksSection />
        <CategoryOverview />
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