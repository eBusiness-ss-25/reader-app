"use client";

import Reader from "@/components/reader/reader";
import { useParams } from "next/navigation";

export default function ReaderPage() {
  const { bookId } = useParams() as { bookId: string };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <Reader bookId={bookId} />
    </div>
  );
}
