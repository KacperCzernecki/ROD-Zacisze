import { createClient } from "../supabase/client";

export async function readPost() {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*, post_images(image_url)");
    if (error) {
      return "Nie można odczytać postu. Błąd bazy danych";
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
