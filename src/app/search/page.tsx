"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchPage() {
  return (
    <div className="grid px-4 py-8 gap-4">
      <div className="p-4 bg-accent rounded-2xl shadow-lg grid gap-4">
        <h2 className="text-2xl font-light">Welches Buch suchst du?</h2>
        <Input type="text" />
      </div>
      <div className="p-4 bg-accent rounded-2xl shadow-lg grid gap-4">
        <h2 className="text-2xl font-light">Welche Altersgruppe?</h2>
        <div className="gap-4 grid grid-cols-3">
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
            <Button variant="outline" className="w-full h-full text-8xl bg-primary-muted">👶🏻</Button>
          </AspectRatio>
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
            <Button variant="outline" className="w-full h-full text-8xl bg-primary-muted">🛝</Button>
          </AspectRatio>
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
            <Button variant="outline" className="w-full h-full text-8xl bg-primary-muted">🎓</Button>
          </AspectRatio>
        </div>
      </div>
      <div className="p-4 bg-accent rounded-2xl shadow-lg grid gap-4">
        <h2 className="text-2xl font-light">Welche Themenwelt?</h2>
        <div className="gap-4 grid grid-cols-3">
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
            <Button variant="outline" className="w-full h-full text-8xl bg-primary-muted">🤠</Button>
          </AspectRatio>
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
            <Button variant="outline" className="w-full h-full text-8xl bg-primary-muted">🦖</Button>
          </AspectRatio>
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
            <Button variant="outline" className="w-full h-full text-8xl bg-primary-muted">🥷</Button>
          </AspectRatio>
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
            <Button variant="outline" className="w-full h-full text-8xl bg-primary-muted">🚀</Button>
          </AspectRatio>
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
            <Button variant="outline" className="w-full h-full text-8xl bg-primary-muted">🦏</Button>
          </AspectRatio>
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl">
            <Button variant="outline" className="w-full h-full text-8xl bg-primary-muted">👸🏼</Button>
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}