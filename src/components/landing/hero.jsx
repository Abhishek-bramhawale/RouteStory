"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroMap } from "@/components/landing/hero-map";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16 gradient-bg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.span
          className="absolute left-[10%] top-[20%] text-4xl opacity-20 animate-float"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          ✈️
        </motion.span>
        <motion.span
          className="absolute right-[15%] top-[30%] text-3xl opacity-20 animate-float"
          style={{ animationDelay: "1s" }}
        >
          🚗
        </motion.span>
        <motion.span
          className="absolute left-[20%] bottom-[25%] text-3xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        >
          🚆
        </motion.span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
              Animated travel routes in seconds
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Turn Your Journey Into a{" "}
              <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                Beautiful Animated Story
              </span>
            </h1>
            <p className="mt-6 text-lg text-[var(--color-muted-foreground)]">
              Create stunning travel route animations in seconds. Perfect for Instagram
              Reels, YouTube Shorts, travel memories, and trip sharing.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/app">Create Animation</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#showcase">
                  <Play className="h-4 w-4" />
                  Watch Demo
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[320px] sm:h-[400px] lg:h-[480px]"
          >
            <HeroMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
