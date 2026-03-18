"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/supabase/server";

export async function createTrainer(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const specialty = String(formData.get("specialty") ?? "").trim();
  const experienceYears = Number(formData.get("experience_years") ?? 0);
  const bio = String(formData.get("bio") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();

  if (!name || !specialty || !bio || !imageUrl) {
    throw new Error("Missing trainer fields");
  }

  const { error } = await supabase.from("trainers").insert({
    name,
    specialty,
    experience_years: Number.isFinite(experienceYears) ? experienceYears : 0,
    bio,
    image_url: imageUrl,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
}

export async function deleteTrainer(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Missing trainer id");

  const { error } = await supabase.from("trainers").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
}

export async function deleteMember(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Missing member id");

  const { error } = await supabase.from("profiles").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
}

export async function setMemberRole(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "").trim();
  const role = String(formData.get("role") ?? "member").trim();
  if (!id) throw new Error("Missing member id");

  const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
}

