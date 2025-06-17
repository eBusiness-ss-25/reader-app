"use client";

import BookSearchBox from "@/components/search/BookSearchBox";
import AgeGroupBox from "@/components/search/AgeGroupBox";
import ThemeWorldBox from "@/components/search/ThemeWorldBox";

export default function SearchPage() {
  return (
    <div className="grid px-4 py-8 gap-4">
      <BookSearchBox />
      <AgeGroupBox />
      <ThemeWorldBox />
    </div>
  );
}