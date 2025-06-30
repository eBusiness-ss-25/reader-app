"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton({ url }: { url: string }) {
  return (
    <Link href={url}>
      <div className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow duration-200 inline-flex items-center justify-center">
        <ChevronLeft size={20} />
      </div>
    </Link>
  );

}