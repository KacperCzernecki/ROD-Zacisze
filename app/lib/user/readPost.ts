import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "../supabase/client";

export async function readPost(
  cursor: { created_at: string; id: string } | null,
  type: string,
) {
  const supabase = createClient();
  const range = 10;

  try {
    let query = supabase
      .from("posts")
      .select("*, post_images(image_url)")
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .range(0, range);
    if (type !== "all") {
      query = query.eq("type", type);
    }
    if (cursor !== null) {
      query = query.or(
        `created_at.lt.${cursor.created_at},and(created_at.eq.${cursor.created_at}, id.lt.${cursor.id})`,
      );
    }

    const { data, error } = await query;
    return { data: data?.slice(0, 10), error, hasMore: data?.length === 11 };
  } catch (error) {
    return { data: null, hasMore: false, error: error as PostgrestError };
  }
}
