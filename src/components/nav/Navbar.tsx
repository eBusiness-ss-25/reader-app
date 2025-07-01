import { SearchButton } from "../common/SearchButton"
import Image from "next/image";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-background z-50">
      <div className="container mx-auto flex h-16 items-center justify-between p-4  pt-6 mt-1">
        <Image src="/Reeda_Logo_v2.png" width={160} height={160} alt="Logo" />  
        <SearchButton/>
      </div>
    </header>
  )
}
