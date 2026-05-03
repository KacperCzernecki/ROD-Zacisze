import { createClient } from "../supabase/client";

export async function createPost(
  title: string,
  type: string,
  content: string,
  files: File[],
) {
  const supabase = createClient();
  const createdAt = Date.now();

  const { id, error } = await supabase
    .from("posts")
    .insert({ type: type, title: title, content: content })
    .select("id");
  if (error) {
    return "Błąd bazy danych przy dodawaniu postu";
  }

  for (const file of files) {
    const { data, error } = await supabase.storage
      .from("pictures")
      .upload(`${file.name}_${createdAt}`, file);

    const { urlData } = supabase.storage
      .from("pictures")
      .getPublicUrl(data?.fullPath);
  }
}
