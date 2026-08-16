import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "../supabase/client";

export async function readPost(page: number, type: string) {
  const supabase = createClient();
  const range = 10;
  const start = (page - 1) * range;
  const end = start + range - 1;

  try {
    let query = supabase
      .from("posts")
      .select("*, post_images(image_url)", { count: "exact" })
      .order("created_at", { ascending: false });

    if (type !== "all") {
      query = query.eq("type", type);
    }
    const { data, error, count } = await query.range(start, end);
    return { data, error, count };
  } catch (error) {
    return { data: null, error: error as PostgrestError, count: 0 };
  }
}
