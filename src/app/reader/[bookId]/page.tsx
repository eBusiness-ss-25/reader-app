"use client";

import Reader from "@/components/reader/reader";
import { useParams } from "next/navigation";

export function ReaderPage() {
  const { bookId } = useParams() as { bookId: string };

  return <Reader bookId={bookId}></Reader>;
}
