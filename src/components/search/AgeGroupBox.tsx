import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AgeGroupBox() {
  return (
    <div className="p-4 bg-accent rounded-2xl shadow-lg grid gap-4">
      <h2 className="text-2xl font-light">Welche Altersgruppe?</h2>
      <div className="gap-4 grid grid-cols-3">
        <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
          <Link href="/search/age/0">
            <Button variant="outline" className="w-full h-full text-6xl bg-primary-muted">👶🏻</Button>
          </Link>
        </AspectRatio>
        <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
          <Link href="/search/age/4">
            <Button variant="outline" className="w-full h-full text-6xl bg-primary-muted">🛝</Button>
          </Link>
        </AspectRatio>
        <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
          <Link href="/search/age/6">
            <Button variant="outline" className="w-full h-full text-6xl bg-primary-muted">🎓</Button>
          </Link>
        </AspectRatio>
      </div>
    </div>
  );
}
