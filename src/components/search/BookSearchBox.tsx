import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function BookSearchBox() {
  const [value, setValue] = useState("");

  return (
    <div className="p-4 bg-accent rounded-2xl shadow-lg grid gap-4">
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
          placeholder="Buchtitel suchen"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={value === "" ? "text-center placeholder-transparent" : "text-start"}
        />
      </div>
    </div>
  );
}
