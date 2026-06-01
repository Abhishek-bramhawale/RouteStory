"use client";

import { useState, useTransition } from "react";
import { Search, Loader2 } from "lucide-react";
import { geocodeLocation } from "@/actions/route";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LocationSearch({ label, value, onSelect, placeholder }) {
  const [query, setQuery] = useState(value?.name || "");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const search = (q) => {
    setQuery(q);
    if (q.length < 3) {
      setResults([]);
      return;
    }
    startTransition(async () => {
      const res = await geocodeLocation(q);
      setResults(res.results || []);
    });
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
        <Input
          className="pl-9"
          placeholder={placeholder}
          value={query}
          onChange={(e) => search(e.target.value)}
        />
        {isPending && (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin" />
        )}
      </div>
      {results.length > 0 && (
        <ul className="max-h-40 overflow-auto rounded-md border border-[var(--color-border)] bg-[var(--color-background)] text-sm">
          {results.map((r, i) => (
            <li key={i}>
              <button
                type="button"
                className="w-full px-3 py-2 text-left hover:bg-[var(--color-muted)]"
                onClick={() => {
                  onSelect({ name: r.name, lat: r.lat, lng: r.lng });
                  setQuery(r.name);
                  setResults([]);
                }}
              >
                {r.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
