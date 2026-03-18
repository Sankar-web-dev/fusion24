import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, CreditCard, User as UserIcon } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/supabase/server";

export const metadata = {
  title: "Member Dashboard",
};

type Visit = { visited_at: string };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: membership } = await supabase
    .from("member_memberships")
    .select("plan_name,status,renewal_date")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: visits } = await supabase
    .from("visits")
    .select("visited_at")
    .eq("user_id", user.id)
    .order("visited_at", { ascending: false })
    .limit(8);

  const visitList = (visits ?? []) as Visit[];

  return (
    <div>
      <section className="container-px mx-auto max-w-7xl py-16 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="DASHBOARD"
            title="Welcome back."
            description="Your membership status, recent visits, and profile controls—designed like a premium product."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-white/70" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-white/70">
              <div>
                <div className="text-xs font-semibold tracking-[0.2em] text-white/55">EMAIL</div>
                <div className="mt-1 font-semibold text-white/85">{user.email}</div>
              </div>
              <div className="pt-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">Need help?</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-white/70" />
                Membership
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-white/70">
              <div className="glass rounded-2xl p-4">
                <div className="text-xs font-semibold tracking-[0.2em] text-white/55">PLAN</div>
                <div className="mt-1 text-xl font-semibold text-white">
                  {membership?.plan_name ?? "Pro"}
                </div>
                <div className="mt-1 text-white/60">
                  Status: <span className="font-semibold text-white/80">{membership?.status ?? "active"}</span>
                </div>
                <div className="mt-1 text-white/60">
                  Renewal:{" "}
                  <span className="font-semibold text-white/80">
                    {membership?.renewal_date
                      ? new Date(membership.renewal_date).toLocaleDateString()
                      : "—"}
                  </span>
                </div>
              </div>
              <Button asChild variant="neon" className="w-full neon-ring">
                <Link href="/memberships">Upgrade plan</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-white/70" />
                Recent visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              {visitList.length ? (
                <ul className="space-y-2 text-sm text-white/70">
                  {visitList.map((v) => (
                    <li key={v.visited_at} className="glass rounded-xl px-4 py-3">
                      {new Date(v.visited_at).toLocaleString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-white/65">
                  No visits logged yet. Your first session starts now.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

