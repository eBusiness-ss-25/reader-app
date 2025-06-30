"use client";

import BookSearchBox from "@/components/search/BookSearchBox";
import AgeGroupBox from "@/components/search/AgeGroupBox";
import ThemeWorldBox from "@/components/search/ThemeWorldBox";
import CloseButton from "@/components/common/CloseButton";

export default function SearchPage() {
  return (
    <div className="grid px-4 py-8 gap-4">
      <div className="w-full flex justify-end mb-4">
        <CloseButton url="/catalog" />
      </div>
      <BookSearchBox />
      <AgeGroupBox />
      <ThemeWorldBox />
    </div>
  );
}