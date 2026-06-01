"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Get started with route animations",
    features: ["Basic animations", "Watermark", "Standard quality"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    desc: "For creators who want the best",
    features: ["No watermark", "Premium vehicles", "HD exports", "Faster rendering"],
    cta: "Go Pro",
    highlight: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[var(--color-muted)]/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Simple pricing</h2>
        <p className="mt-4 text-center text-[var(--color-muted-foreground)]">
          Start free, upgrade when you need more
        </p>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={`h-full ${
                  plan.highlight
                    ? "ring-2 ring-[var(--color-primary)] shadow-xl shadow-[var(--color-primary)]/20"
                    : ""
                }`}
              >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.desc}</CardDescription>
                  <p className="text-4xl font-bold">
                    {plan.price}
                    <span className="text-base font-normal text-[var(--color-muted-foreground)]">
                      /mo
                    </span>
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-[var(--color-primary)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-8 w-full"
                    variant={plan.highlight ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/app">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
