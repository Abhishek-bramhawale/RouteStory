"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 z-50 w-full border-b border-[var(--color-border)] glass"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
          RouteStory
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[var(--color-muted-foreground)] md:flex">
          <a href="#features" className="hover:text-[var(--color-foreground)]">Features</a>
          <a href="#how-it-works" className="hover:text-[var(--color-foreground)]">How it works</a>
          <a href="#pricing" className="hover:text-[var(--color-foreground)]">Pricing</a>
          <a href="#faq" className="hover:text-[var(--color-foreground)]">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="/app">Create Animation</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
