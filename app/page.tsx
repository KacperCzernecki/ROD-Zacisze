"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { readPost } from "./lib/user/readPost";
import { PostgrestError } from "@supabase/supabase-js";
import PostCard from "./ui/posts/PostCard";

type Post = {
  id: string;
  title: string;
  type: string;
  content: string;
  created_at: string;
  post_images: { image_url: string }[];
};

export default function Home() {
  const [data, setData] = useState<Post[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<object | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [postType, setPostType] = useState<
    "all" | "announcement" | "event" | "other"
  >("all");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const result = await readPost(cursor, postType);

      if (result.error) {
        setError(result.error);
      }
      setData((current) => [...current, ...(result.data ?? [])]);
    };
    fetch();
  });

  useEffect(() => {});

  return (
    <div>
      {error && <div>Napotkano błąd</div>}
      {!error && (
        <>
          <div className="w-full items-center">
            <ul className="flex flex-row justify-center gap-5">
              <li onClick={() => setPostType("all")}>Wszystkie</li>
              <li onClick={() => setPostType("announcement")}>Ogłoszenia</li>
              <li onClick={() => setPostType("event")}>Wydarzenia</li>
              <li onClick={() => setPostType("other")}>Inne</li>
            </ul>
          </div>
          <div className="flex flex-col gap-10 justify-center items-center">
            {data.map((post: Post) => {
              return (
                <PostCard
                  key={post.id}
                  type={post.type}
                  title={post.title}
                  content={post.content}
                  images={post.post_images}
                  created_at={post.created_at}
                />
              );
            })}
          </div>
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
}
