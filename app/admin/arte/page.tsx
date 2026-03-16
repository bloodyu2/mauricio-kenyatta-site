import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminArteClient from "./AdminArteClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — Arte | Maurício Kenyatta" };

export default async function AdminArtePage() {
  const supabase = await createClient();
  if (!supabase) redirect("/auth/login?next=/admin/arte");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login?next=/admin/arte");

  const { data: profile } = await supabase
    .from("mk_profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") redirect("/");

  const { data: artworks } = await supabase
    .from("mk_artwork")
    .select("*")
    .order("created_at", { ascending: false });

  return <AdminArteClient artworks={artworks ?? []} />;
}
