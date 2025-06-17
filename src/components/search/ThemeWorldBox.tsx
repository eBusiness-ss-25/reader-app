"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import CategoryAPI, { Category } from "@/lib/api/category/category";
import { useState, useEffect } from "react";

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
      <div className="p-4 bg-accent rounded-2xl shadow-lg">
        <h2 className="text-2xl font-light">Loading themes...</h2>
      </div>
    );
  }

  return (
    <div className="p-4 bg-accent rounded-2xl shadow-lg grid gap-4">
      <h2 className="text-2xl font-light">Welche Themenwelt?</h2>
      <div className="gap-4 grid grid-cols-3">
        {categories.map((category) => (
          <AspectRatio key={category.id} ratio={1 / 1} className="bg-muted rounded-3xl">
            <Button 
              variant="outline" 
              className="w-full h-full text-8xl bg-primary-muted"
              onClick={() => console.log(`Selected category: ${category.name}`)}
            >
              {category.icon || "❓"}
            </Button>
          </AspectRatio>
        ))}
      </div>
    </div>
  );
}
