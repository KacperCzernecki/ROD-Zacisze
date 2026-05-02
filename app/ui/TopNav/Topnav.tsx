"use server";

import NavLinks from "./NavLinks";
import { createClient } from "@/app/lib/supabase/server";

export default async function TopNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .maybeSingle();

  const isAdmin = data?.role === "admin";
  return (
    <>
      <NavLinks isAdmin={isAdmin} />
    </>
  );
}
