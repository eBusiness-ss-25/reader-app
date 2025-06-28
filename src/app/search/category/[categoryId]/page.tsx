"use client";

import { use } from "react";

interface CategorySearchProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default function CategorySearch({ params }: CategorySearchProps) {
  const { categoryId } = use(params);
  
  return (
    <div>
      <h1>Category Search</h1>
      <p>Current Category ID: {categoryId}</p>
    </div>
  );
}
