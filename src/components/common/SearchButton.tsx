import { Search } from "lucide-react";
import Link from "next/link";

export function SearchButton() {
  return (
    <Link href="/search">
      <div className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow duration-200 inline-flex items-center justify-center">
        <Search />
      </div>
    </Link>
  );
}
