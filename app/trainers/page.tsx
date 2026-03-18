import { Instagram, Linkedin, Shield, Trophy, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const trainers = [
  {
    name: "Ava Romero",
    specialty: "Strength Coach",
    experience: "8+ years",
    bio: "Barbell-first programming with clean mechanics and sustainable progress. Focus: strength, hypertrophy, and confident movement.",
    image:
      "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Noah Kim",
    specialty: "Conditioning & Hybrid",
    experience: "10+ years",
    bio: "Hybrid performance: strength meets engine. Systems that build athletic capacity without burning you out.",
    image:
      "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Maya Singh",
    specialty: "Body Composition",
    experience: "7+ years",
    bio: "Precision training and smart recovery. Coaching that keeps you looking elite and moving better week after week.",
    image:
      "https://images.unsplash.com/photo-1599058917765-3b04f7b5a2d9?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Ethan Cole",
    specialty: "Athletic Performance",
    experience: "12+ years",
    bio: "Explosive power, speed, and strength. Built for athletes, fighters, and anyone chasing performance.",
    image:
      "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function TrainersPage() {
  return (
    <div>
      <section className="container-px mx-auto max-w-7xl py-16 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="TRAINERS"
            title="Elite coaching, premium energy."
            description="Meet the team behind the results. Every coach is performance-first: technique, progression, and consistency."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {trainers.map((t, idx) => (
            <Reveal key={t.name} delay={idx * 0.06}>
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-[220px_1fr]">
                  <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
                    <Image
                      src={t.image}
                      alt={`${t.name} profile`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 220px"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.78),rgba(0,0,0,0.1))]" />
                  </div>
                  <div>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex flex-wrap items-baseline justify-between gap-3">
                        <span className="text-2xl">{t.name}</span>
                        <span className="text-xs font-semibold tracking-[0.22em] text-white/55">
                          {t.experience}
                        </span>
                      </CardTitle>
                      <div className="mt-1 text-sm font-semibold text-white/75">{t.specialty}</div>
                    </CardHeader>
                    <CardContent className="pb-6">
                      <p className="text-sm leading-relaxed text-white/70">{t.bio}</p>

                      <div className="mt-5 grid grid-cols-3 gap-2">
                        <div className="glass rounded-xl p-3">
                          <div className="flex items-center gap-2 text-xs font-semibold text-white/75">
                            <Trophy className="h-4 w-4 text-white/70" />
                            Strength
                          </div>
                        </div>
                        <div className="glass rounded-xl p-3">
                          <div className="flex items-center gap-2 text-xs font-semibold text-white/75">
                            <Zap className="h-4 w-4 text-white/70" />
                            Conditioning
                          </div>
                        </div>
                        <div className="glass rounded-xl p-3">
                          <div className="flex items-center gap-2 text-xs font-semibold text-white/75">
                            <Shield className="h-4 w-4 text-white/70" />
                            Technique
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex gap-2">
                        <Link
                          href="#"
                          className="rounded-md border border-white/12 bg-white/5 p-2 text-white/75 transition hover:bg-white/10 hover:text-white"
                          aria-label="Instagram"
                        >
                          <Instagram className="h-4 w-4" />
                        </Link>
                        <Link
                          href="#"
                          className="rounded-md border border-white/12 bg-white/5 p-2 text-white/75 transition hover:bg-white/10 hover:text-white"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

