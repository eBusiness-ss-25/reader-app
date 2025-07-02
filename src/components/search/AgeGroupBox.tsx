import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import Image from "next/image";

export default function AgeGroupBox() {
  return (
    <div className="p-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 rounded-2xl">
      <div className="p-4 bg-accent rounded-2xl shadow-lg grid gap-4">
        <h2 className="text-2xl font-light">Welche Altersgruppe?</h2>
        <div className="gap-4 grid grid-cols-3">
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
            <Link href="/search/age/0">
              <Image
                src="/baby.png"
                alt="Baby"
                className="object-cover rounded-3xl"
                fill
              />
            </Link>
          </AspectRatio>
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
            <Link href="/search/age/4">
              <Image
                src="/kindergarten.png"
                alt="Baby"
                className="object-cover rounded-3xl"
                fill
              />
            </Link>
          </AspectRatio>
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
            <Link href="/search/age/6">
              <Image
                src="/grundschule.png"
                alt="Baby"
                className="object-cover rounded-3xl"
                fill
              />
            </Link>
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}
