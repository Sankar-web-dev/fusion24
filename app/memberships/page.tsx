import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

import { PricingCard } from "@/components/pricing-card";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const plans = [
  {
    name: "Basic",
    monthly: "$39",
    yearly: "$399",
    highlight: false,
    features: ["24/7 access", "Locker rooms", "Monthly check-in"],
  },
  {
    name: "Pro",
    monthly: "$69",
    yearly: "$699",
    highlight: true,
    features: ["Everything in Basic", "2 coached sessions / month", "Priority booking", "Technique review"],
  },
  {
    name: "Elite",
    monthly: "$119",
    yearly: "$1199",
    highlight: false,
    features: ["Everything in Pro", "Weekly coaching", "Nutrition guidance", "Recovery lounge"],
  },
];

const compare = [
  { label: "24/7 access", basic: true, pro: true, elite: true },
  { label: "Locker rooms + showers", basic: true, pro: true, elite: true },
  { label: "Coached sessions", basic: false, pro: true, elite: true },
  { label: "Nutrition guidance", basic: false, pro: false, elite: true },
  { label: "Recovery lounge", basic: false, pro: false, elite: true },
];

export default function MembershipsPage() {
  return (
    <div>
      <section className="container-px mx-auto max-w-7xl py-16 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="MEMBERSHIPS"
            title="Premium plans, no fluff."
            description="Pick a plan that matches your ambition. Upgrade anytime—your training evolves, your membership should too."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {plans.map((p, idx) => (
            <PricingCard
              key={p.name}
              name={p.name}
              price={p.monthly.replace("$", "$")}
              tagline={`${p.yearly}/yr billed annually`}
              features={p.features}
              highlight={p.highlight}
              delay={idx * 0.06}
            />
          ))}
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="COMPARISON"
              title="Compare features."
              description="Everything you need, presented like a product sheet."
              className="max-w-xl"
            />
            <Button asChild variant="neon" className="neon-ring">
              <Link href="/login">
                Get Started <Sparkles className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <div className="mt-10">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[240px]">Feature</TableHead>
                    <TableHead>Basic</TableHead>
                    <TableHead>Pro</TableHead>
                    <TableHead>Elite</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {compare.map((row) => (
                    <TableRow key={row.label}>
                      <TableCell className="font-semibold text-white/80">{row.label}</TableCell>
                      <TableCell>{row.basic ? <Check className="h-4 w-4 text-white" /> : "—"}</TableCell>
                      <TableCell>{row.pro ? <Check className="h-4 w-4 text-white" /> : "—"}</TableCell>
                      <TableCell>{row.elite ? <Check className="h-4 w-4 text-white" /> : "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

