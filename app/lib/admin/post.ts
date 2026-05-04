import { createClient } from "../supabase/client";

export async function createPost(
  title: string,
  type: string,
  content: string,
  files: File[],
) {
  const supabase = createClient();
  const createdAt = Date.now();

  const { data, error } = await supabase
    .from("posts")
    .insert({ type: type, title: title, content: content })
    .select("id");
  if (error) {
    return "Błąd bazy danych przy dodawaniu postu";
  }

  for (const file of files) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("pictures")
      .upload(`${file.name}_${createdAt}`, file);

    if (uploadError) {
      return "Błąd z dodawaniem zdjęcia";
    }

    const { data: urlData } = supabase.storage
      .from("pictures")
      .getPublicUrl(uploadData?.path || "");

    console.log(urlData.publicUrl);

    const { error: insertError } = await supabase
      .from("post_images")
      .insert({ image_url: urlData.publicUrl, post_id: data[0].id });
    if (insertError) {
      return "Błąd bazy danych. Zdjęcie nie zostało zapisane";
    }
  }
}
