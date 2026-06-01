"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Play, Truck } from "lucide-react";

const steps = [
  { icon: MapPin, title: "Choose Start Location", step: 1 },
  { icon: Navigation, title: "Choose Destination", step: 2 },
  { icon: Truck, title: "Select Vehicle", step: 3 },
  { icon: Play, title: "Generate Video", step: 4 },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[var(--color-muted)]/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">How it works</h2>
        <p className="mt-4 text-center text-[var(--color-muted-foreground)]">
          Four simple steps to your animated travel story
        </p>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="glass flex flex-col items-center rounded-xl p-6 text-center">
                  <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
                    {s.step}
                  </span>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
                    <s.icon className="h-6 w-6 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-semibold">{s.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
