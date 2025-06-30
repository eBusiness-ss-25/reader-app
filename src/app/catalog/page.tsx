"use client";
import CategoryOverview from "@/components/catalog/CategoryOverview";
import PersonalOverview from "@/components/catalog/PersonalOverview";
import { SearchButton } from "@/components/catalog/SearchButton";
import Loading from "@/components/common/Loading";
import {
  CatalogLoadingProvider,
  useCatalogLoading,
} from "@/lib/hooks/useCatalogLoading";

function CatalogContent() {
  const { isLoading } = useCatalogLoading();
  return (
    <>
      {isLoading && <Loading />}
      <div className="flex min-h-screen flex-col w-full max-w-3xl mx-auto py-8 px-4 sm:px-8 gap-4">
        <SearchButton />
        <PersonalOverview />
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
