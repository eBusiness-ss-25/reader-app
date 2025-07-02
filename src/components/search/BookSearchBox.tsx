import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

export default function BookSearchBox() {
  const [value, setValue] = useState("");

  return (
    <div className="p-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 rounded-2xl">
      <div className="p-4 bg-accent rounded-2xl shadow-lg grid gap-2">
        <h2 className="text-2xl font-light">Welches Buch suchst du?</h2>
        <div className="relative">
          {value === "" && (
            <span className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none text-muted-foreground">
              <Search className="size-4" />
              <span>Buchtitel suchen</span>
            </span>
          )}
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={value === "h-12" ? "text-center placeholder-transparent h-12" : "text-start h-12"}
          />
        </div>
        {value === "" ? (
          <Button disabled className="w-full">Suchen</Button>
        ) : (
          <Link href={`/search/title/${encodeURIComponent(value)}`} className="w-full">
            <Button className="w-full">Suchen</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
