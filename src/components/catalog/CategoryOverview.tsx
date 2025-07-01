import { Section } from "@/components/catalog/Section";
import { BookCard } from "@/components/catalog/BookCard";

type Book = {
  id: string;
  title: string;
  author?: string;
  introduction?: string;
  bookCoverId?: string;
  numPages?: number;
};

type CategoryWithBooks = {
  id: string;
  name: string;
  Books: Book[];
  icon?: string;
};

interface CategoryOverviewProps {
  categories?: CategoryWithBooks[];
  category?: CategoryWithBooks;
}

export default function CategoryOverview({
  categories,
  category,
}: CategoryOverviewProps) {
  // Priorität: Einzelne Kategorie, sonst mehrere
  const cats = category ? [category] : categories ?? [];

  if (!cats.length) {
    return (
      <div className="text-sm text-muted-foreground">
        Keine Bücher in dieser Kategorie gefunden.
      </div>
    );
  }

  return (
    <div className="w-full max-w-none space-y-6 mt-4">
      {cats.map((cat) => (
        <Section key={cat.id} title={cat.name} className="w-full">
          {cat.Books && cat.Books.length > 0 ? (
            cat.Books.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                introduction={book.introduction}
                bookCoverId={book.bookCoverId}
                numPages={book.numPages}
              />
            ))
          ) : (
            <div className="col-span-full text-sm text-muted-foreground">
              Keine Bücher in dieser Kategorie gefunden.
            </div>
          )}
        </Section>
      ))}
    </div>
  );
}
