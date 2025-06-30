import { SearchButton } from "../common/SearchButton"
import Image from "next/image";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-background z-50">
      <div className="container mx-auto flex h-16 items-center justify-between p-4 mt-1">
        <Image src="/reader-logo.png" width={40} height={40} alt="Logo" />  
        <SearchButton/>
      </div>
    </header>
  )
}
