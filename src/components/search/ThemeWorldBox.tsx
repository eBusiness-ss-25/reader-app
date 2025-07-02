"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import CategoryAPI, { Category } from "@/lib/api/category/category";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ThemeWorldBox() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const categoryApi = new CategoryAPI();
    categoryApi.getAllCategories()
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading categories:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="p-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 rounded-2xl">
        <div className="p-4 bg-accent rounded-2xl shadow-lg">
          <h2 className="text-2xl font-light">Lade Themenwelten...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 rounded-2xl">
      <div className="p-4 bg-accent rounded-2xl shadow-lg grid gap-4">
        <h2 className="text-2xl font-light">Welche Themenwelt?</h2>        <div className="gap-4 grid grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/search/category/${category.id}`} className="block">
              <AspectRatio ratio={1 / 1} className="bg-muted rounded-3xl overflow-hidden">
                {
                  category.categoryImageId ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BOOK_API}/storage/${category.categoryImageId}`}
                      alt={category.name}
                      fill
                      className="object-cover rounded-3xl"
                    />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-5xl rounded-3xl">{category.icon || "❓"}</span>
                  )
                }
              </AspectRatio>
            </Link>
          ))}
      </div>
    </div>
  </div>
  );
}
