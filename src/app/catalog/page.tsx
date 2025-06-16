"use-client";
import CategoryOverview from "@/components/catalog/CategoryOverview";
import PersonalBooksSection from "@/components/catalog/PersonalBooksSection";
import { SearchButton } from "@/components/catalog/SearchButton";

export default function CatalogPage() {


    return (
        <div className="flex min-h-screen flex-col items-center px-12 py-8 gap-4">
            <SearchButton />
            <PersonalBooksSection />
            <CategoryOverview />
        </div>
    );
}