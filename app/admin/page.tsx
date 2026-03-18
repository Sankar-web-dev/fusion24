import { redirect } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/supabase/server";

import { createTrainer, deleteMember, deleteTrainer, setMemberRole } from "./actions";

export const metadata = {
  title: "Admin Dashboard",
};

type Trainer = {
  id: string;
  name: string;
  specialty: string;
  experience_years: number | null;
};

type Profile = {
  id: string;
  full_name: string | null;
  role: string | null;
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") redirect("/dashboard");

  const { data: members } = await supabase
    .from("profiles")
    .select("id,full_name,role")
    .order("created_at", { ascending: false })
    .limit(50);

  const { data: trainers } = await supabase
    .from("trainers")
    .select("id,name,specialty,experience_years")
    .order("name", { ascending: true });

  const memberRows = (members ?? []) as Profile[];
  const trainerRows = (trainers ?? []) as Trainer[];

  return (
    <div>
      <section className="container-px mx-auto max-w-7xl py-16 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="ADMIN"
            title="Operations dashboard."
            description="Manage members, trainers, and plans. Built clean and fast."
          />
        </Reveal>

        <div className="mt-10 grid gap-5">
          <div className="glass rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">Members</div>
                <div className="text-sm text-white/65">Promote admins, remove profiles.</div>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[260px]">Member ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {memberRows.length ? (
                    memberRows.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="font-mono text-xs text-white/60">{m.id}</TableCell>
                        <TableCell className="font-semibold text-white/80">
                          {m.full_name ?? "—"}
                        </TableCell>
                        <TableCell className="text-white/70">{m.role ?? "member"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <form action={setMemberRole}>
                              <input type="hidden" name="id" value={m.id} />
                              <input type="hidden" name="role" value={m.role === "admin" ? "member" : "admin"} />
                              <Button type="submit" variant="outline" size="sm">
                                {m.role === "admin" ? "Demote" : "Make admin"}
                              </Button>
                            </form>
                            <form action={deleteMember}>
                              <input type="hidden" name="id" value={m.id} />
                              <Button type="submit" variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </Button>
                            </form>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>No members yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <Separator />

          <div className="glass rounded-3xl p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Trainers</div>
                <div className="text-sm text-white/65">Add or remove trainers shown on the website.</div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="neon" className="neon-ring">
                    <Plus className="h-4 w-4" />
                    Add trainer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add trainer</DialogTitle>
                    <DialogDescription>Create a new trainer profile.</DialogDescription>
                  </DialogHeader>

                  <form action={createTrainer} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" placeholder="Ava Romero" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="specialty">Specialty</Label>
                      <Input id="specialty" name="specialty" placeholder="Strength Coach" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="experience_years">Experience (years)</Label>
                      <Input id="experience_years" name="experience_years" type="number" placeholder="8" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image_url">Image URL</Label>
                      <Input
                        id="image_url"
                        name="image_url"
                        placeholder="https://images.unsplash.com/..."
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" name="bio" placeholder="Short, premium bio..." required />
                    </div>
                    <Button type="submit" variant="neon" className="neon-ring">
                      Create trainer
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="mt-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[240px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Exp</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainerRows.length ? (
                    trainerRows.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-mono text-xs text-white/60">{t.id}</TableCell>
                        <TableCell className="font-semibold text-white/80">{t.name}</TableCell>
                        <TableCell>{t.specialty}</TableCell>
                        <TableCell>{t.experience_years ?? "—"}</TableCell>
                        <TableCell className="text-right">
                          <form action={deleteTrainer}>
                            <input type="hidden" name="id" value={t.id} />
                            <Button type="submit" variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </form>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>No trainers yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

