"use client";

import { X } from "lucide-react";
import Link from "next/link";

export default function CloseButton({ url }: { url: string }) {
  return (
    <div className="flex items-center">
      <Link href={url}>
        <div className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow duration-200 inline-flex items-center justify-center">
          <X size={20} />
        </div>
      </Link>
    </div>
  );

}