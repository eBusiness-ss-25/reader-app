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
      <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8 gap-4">
        <div className="w-full max-w-7xl mx-auto space-y-6">
          <SearchButton />
          <PersonalBooksSection />
          <CategoryOverview />
        </div>
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