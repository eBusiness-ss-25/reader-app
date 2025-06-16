"use-client";
import CategoryOverview from "@/components/catalog/CategoryOverview";
import { SearchButton } from "@/components/catalog/SearchButton";

export default function CatalogPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-12 py-8 gap-4">
      <SearchButton />
      <CategoryOverview />
    </div>
  );
}