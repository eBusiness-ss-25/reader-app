"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchButton() {
  const router = useRouter();

  const handleSearch = () => {
    router.push("/search");
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className="size-8"
      onClick={handleSearch}
    >
      <Search />
    </Button>
  );
}
