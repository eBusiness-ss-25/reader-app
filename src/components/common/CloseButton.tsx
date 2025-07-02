"use client";

import { X } from "lucide-react";
import Link from "next/link";

export default function CloseButton({ url }: { url: string }) {
  return (
    <div className="flex items-center">
      <Link href={url}>
        <div className="p-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 rounded-full hover:shadow-lg hover:shadow-yellow-300/50 transition-all duration-300 hover:scale-[1.05]">
          <div className="bg-white rounded-full p-2 shadow-md inline-flex items-center justify-center">
            <X size={20} />
          </div>
        </div>
      </Link>
    </div>
  );

}