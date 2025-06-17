import { Input } from "@/components/ui/input";

export default function BookSearchBox() {
  return (
    <div className="p-4 bg-accent rounded-2xl shadow-lg grid gap-4">
      <h2 className="text-2xl font-light">Welches Buch suchst du?</h2>
      <Input type="text" />
    </div>
  );
}
