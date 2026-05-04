"use client";

import { useState } from "react";
import { createPost } from "@/app/lib/admin/post";

export default function CreatePostForm() {
  const [postType, setPostType] = useState<"announcement" | "event" | "other">(
    "announcement",
  );
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setpostContent] = useState("");
  const [postFiles, setPostFiles] = useState<File[]>([]);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createPost(postTitle, postType, postContent, postFiles);
  };

  return (
    <div className="bg-amber-900 w-full flex-1  flex flex-col">
      <form>
        <h1>Dodaj post</h1>

        <div>
          <label htmlFor="title">Tytuł</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Tytuł"
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="type">Wybierz typ</label>
          <select
            name="type"
            id="type"
            onChange={(e) =>
              setPostType(e.target.value as "announcement" | "event" | "other")
            }
          >
            <option value="announcement">Ogłoszenie</option>
            <option value="event">Wydarzenie</option>
            <option value="other">Inne</option>
          </select>
        </div>

        <div>
          <label htmlFor="content">Dodaj opis</label>
          <textarea
            name="content"
            id="content"
            cols={30}
            rows={10}
            placeholder="Drodzy działkowicze..."
            onChange={(e) => setpostContent(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="file">Dodaj zdjęcia</label>
          <input
            type="file"
            accept="image/*"
            multiple
            name="file"
            id="file"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setPostFiles(files);
            }}
          />
        </div>

        <button type="submit" onClick={(e) => onSubmit(e)}>
          Dodaj post
        </button>
      </form>
    </div>
  );
}
