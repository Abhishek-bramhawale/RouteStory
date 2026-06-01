import Link from "next/link";
import { MapPin } from "lucide-react";

const links = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "App", href: "/app" },
  ],
  Company: [
    { label: "Contact", href: "mailto:hello@routestory.app" },
    { label: "Privacy Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
              RouteStory
            </Link>
            <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">
              Turn your journey into a beautiful animated story.
            </p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold">{title}</h4>
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted-foreground)]">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-[var(--color-foreground)]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-sm text-[var(--color-muted-foreground)]">
          © {new Date().getFullYear()} RouteStory. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
