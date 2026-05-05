import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "../supabase/client";
import { matchesGlob } from "path";

export async function readPost(page: number) {
  const supabase = createClient();
  const range = 10;
  const start = (page - 1) * range;
  const end = start + range - 1;

  try {
    const { data, error, count } = await supabase
      .from("posts")
      .select("*, post_images(image_url)", { count: "exact" })
      .range(start, end);

    return { data, error, count };
  } catch (error) {
    return { data: null, error: error as PostgrestError };
  }
}
