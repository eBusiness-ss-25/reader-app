import { Search } from "lucide-react";
import Link from "next/link";

export function SearchButton() {
  return (
    <Link href="/search">
      <div className="p-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 rounded-full hover:shadow-lg hover:shadow-yellow-300/50 transition-all duration-300 hover:scale-[1.05]">
        <div className="bg-white rounded-full p-2 shadow-md inline-flex items-center justify-center">
          <Search />
        </div>
      </div>
    </Link>
  );
}
