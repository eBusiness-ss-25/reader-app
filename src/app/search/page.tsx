"use client";
import Image from "next/image";
import BookSearchBox from "@/components/search/BookSearchBox";
import AgeGroupBox from "@/components/search/AgeGroupBox";
import ThemeWorldBox from "@/components/search/ThemeWorldBox";
import CloseButton from "@/components/common/CloseButton";

export default function SearchPage() {
  return (
    <div className="grid px-4 py-8 gap-4">
      <div className="w-full flex justify-between mb-4">
        <Image src="/Reeda_Logo_v2.png" width={200} height={160} alt="Logo" />
        <CloseButton url="/catalog" />
      </div>
      <BookSearchBox />
      <AgeGroupBox />
      <ThemeWorldBox />
    </div>
  );
}