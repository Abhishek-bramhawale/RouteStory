"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const demos = [
  { id: "plane", label: "Plane Route", emoji: "✈️", desc: "NYC to London" },
  { id: "road", label: "Road Trip", emoji: "🚗", desc: "LA to San Francisco" },
  { id: "train", label: "Train Journey", emoji: "🚆", desc: "Paris to Berlin" },
  { id: "intl", label: "International Travel", emoji: "🌍", desc: "Tokyo to Sydney" },
];

export function Showcase() {
  const [active, setActive] = useState("plane");
  const current = demos.find((d) => d.id === active);

  return (
    <section id="showcase" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">See it in action</h2>
        <p className="mt-4 text-center text-[var(--color-muted-foreground)]">
          Interactive demo gallery
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {demos.map((d) => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active === d.id
                  ? "bg-[var(--color-primary)] text-white shadow-lg"
                  : "glass hover:bg-[var(--color-muted)]"
              }`}
            >
              {d.emoji} {d.label}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto mt-10 max-w-3xl"
        >
          <div className="glass aspect-video overflow-hidden rounded-2xl">
            <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 p-8">
              <motion.span
                className="text-7xl"
                animate={{ x: [0, 80, 0], y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {current.emoji}
              </motion.span>
              <h3 className="text-xl font-semibold">{current.label}</h3>
              <p className="text-[var(--color-muted-foreground)]">{current.desc}</p>
              <div className="h-1 w-48 overflow-hidden rounded-full bg-[var(--color-muted)]">
                <motion.div
                  className="h-full bg-[var(--color-primary)]"
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
