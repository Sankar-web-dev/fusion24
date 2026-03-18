import { MapPin, Phone, Mail } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div>
      <section className="container-px mx-auto max-w-7xl py-16 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="CONTACT"
            title="Talk to a coach."
            description="Whether you’re new to training or chasing a performance goal, we’ll match you with the right plan."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Send a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@domain.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us your goal. We'll reply fast." />
                  </div>
                  <Button type="button" variant="neon" className="neon-ring">
                    Submit
                  </Button>
                  <p className="text-xs text-white/55">
                    This demo form doesn’t send email yet. Hook it to Supabase + an email provider
                    when you’re ready.
                  </p>
                </form>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Visit Fusion 24</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-white/70">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-white/60" />
                  <div>
                    <div className="font-semibold text-white/80">Downtown Performance District</div>
                    <div className="text-white/60">City Center • Open 24/7</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-white/60" />
                  <div>+1 (555) 240-2424</div>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-white/60" />
                  <div>hello@fusion24.fit</div>
                </div>

                <div className="glass rounded-2xl p-5">
                  <div className="text-xs font-semibold tracking-[0.28em] text-white/60">
                    HOURS
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-white">24 / 7</div>
                  <div className="mt-1 text-sm text-white/60">
                    Staffed hours vary for onboarding + personal training.
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

