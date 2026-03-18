import { Dumbbell, ShieldCheck, Sparkles, TimerReset } from "lucide-react";

import { CTASection } from "@/components/cta-section";
import { FeatureCard } from "@/components/feature-card";
import { GalleryGrid } from "@/components/gallery-grid";
import { Hero } from "@/components/hero";
import { PricingCard } from "@/components/pricing-card";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TrainerCard } from "@/components/trainer-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="container-px mx-auto max-w-7xl py-16 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="WHY FUSION 24"
            title="Built for consistency."
            description="Modern equipment, pro coaching, and a space that feels like a performance brand—because your training deserves better."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          <FeatureCard
            icon={<TimerReset className="h-5 w-5" />}
            title="24/7 Access"
            description="Secure entry, premium lighting, and a calm environment anytime you want to move."
            delay={0.05}
          />
          <FeatureCard
            icon={<Sparkles className="h-5 w-5" />}
            title="Professional Trainers"
            description="Coaches who build systems, not hype. Strength, conditioning, and body comp."
            accent="purple"
            delay={0.1}
          />
          <FeatureCard
            icon={<Dumbbell className="h-5 w-5" />}
            title="Modern Equipment"
            description="Plates, platforms, sleds, and the machines that make progressive overload fun."
            delay={0.15}
          />
          <FeatureCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Personal Training"
            description="1:1 programming and technique upgrades with measurable progress tracking."
            accent="red"
            delay={0.2}
          />
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="MEMBERSHIPS"
            title="Choose your intensity."
            description="Transparent plans, premium amenities, and a membership experience designed like a product."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <PricingCard
            name="Basic"
            price="$39"
            tagline="Essential access, premium vibes."
            features={["24/7 facility access", "Locker rooms + showers", "Monthly performance check-in"]}
            delay={0.05}
          />
          <PricingCard
            name="Pro"
            price="$69"
            tagline="The sweet spot for serious progress."
            features={[
              "Everything in Basic",
              "2x coached sessions / month",
              "Program updates + technique review",
              "Priority class booking",
            ]}
            highlight
            delay={0.1}
          />
          <PricingCard
            name="Elite"
            price="$119"
            tagline="Concierge training experience."
            features={[
              "Everything in Pro",
              "Weekly 1:1 coaching",
              "Nutrition guidance + body comp tracking",
              "Recovery lounge access",
            ]}
            delay={0.15}
          />
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="TRAINERS"
            title="Coaches, not influencers."
            description="Elite technique, high standards, and coaching that scales with your ambition."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <TrainerCard
            name="Ava Romero"
            specialty="STRENGTH"
            bio="Barbell-first programming with a focus on clean mechanics and sustainable progress."
            image="https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=1200&q=80"
            delay={0.05}
          />
          <TrainerCard
            name="Noah Kim"
            specialty="CONDITIONING"
            bio="Hybrid performance: strength meets engine. Built for sport, life, and confidence."
            image="https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1200&q=80"
            delay={0.1}
          />
          <TrainerCard
            name="Maya Singh"
            specialty="BODY COMP"
            bio="Precision training, smart volume, and recovery—designed to keep you looking and moving elite."
            image="https://images.unsplash.com/photo-1599058917765-3b04f7b5a2d9?auto=format&fit=crop&w=1200&q=80"
            delay={0.15}
          />
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="GALLERY"
            title="Cinematic training space."
            description="A modern gym interior designed for focus, flow, and the energy you need to go hard."
          />
        </Reveal>

        <div className="mt-10">
          <GalleryGrid
            images={[
              {
                src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=80",
                alt: "Modern gym interior",
              },
              {
                src: "https://images.unsplash.com/photo-1526401485004-2aa7b0b4a22b?auto=format&fit=crop&w=1600&q=80",
                alt: "Strength training",
              },
              {
                src: "https://images.unsplash.com/photo-1517964108460-ecb70c2ee1d0?auto=format&fit=crop&w=1600&q=80",
                alt: "Gym workout",
              },
              {
                src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
                alt: "Bodybuilding gym",
              },
              {
                src: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1600&q=80",
                alt: "Crossfit workout",
              },
              {
                src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
                alt: "Fitness training",
              },
            ]}
          />
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="TESTIMONIALS"
            title="Real members. Real results."
            description="Proof that premium environments + great coaching create unstoppable consistency."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              name: "Jordan P.",
              quote:
                "Fusion 24 feels like a brand, not a gym. The energy is calm, premium, and I train better because of it.",
            },
            {
              name: "Sara N.",
              quote:
                "The coaching is surgical. Small technique fixes turned into big strength jumps within weeks.",
            },
            {
              name: "Kieran V.",
              quote:
                "I finally stayed consistent. The space makes you want to show up—every day, any time.",
            },
          ].map((t, idx) => (
            <Reveal key={t.name} delay={idx * 0.06}>
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{t.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-white/70">
                  “{t.quote}”
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
