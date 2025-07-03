"use client";

import { Reader } from "@/components/reader/reader";
import { useParams } from "next/navigation";

export default function ReaderPage() {
  const { bookId } = useParams() as { bookId: string };

  return (
    <div>
      <Reader bookId={bookId} />
    </div>
  );
}
