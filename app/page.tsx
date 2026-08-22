"use client";

import { useEffect, useRef, useState } from "react";
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
  const [cursor, setCursor] = useState<{
    created_at: string;
    id: string;
  } | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [postType, setPostType] = useState<
    "all" | "announcement" | "event" | "other"
  >("all");

  const cursorRef = useRef<{
    created_at: string;
    id: string;
  } | null>(null);
  const hasMoreRef = useRef(true);
  const loadingRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetch = async () => {
      setData([]);
      setCursor(null);
      cursorRef.current = null;
      setHasMore(true);
      hasMoreRef.current = true;
      setLoading(true);
      loadingRef.current = true;

      const result = await readPost(null, postType, controller.signal);

      if (result.error && !controller.signal.aborted) {
        setError(result.error);
        setLoading(false);
        loadingRef.current = false;
        return;
      }
      setData(result.data ?? []);
      setHasMore(result.hasMore);
      hasMoreRef.current = result.hasMore;

      if (result.hasMore && result.data) {
        const newCursor = {
          created_at: result.data[result.data.length - 1].created_at,
          id: result.data[result.data.length - 1].id,
        };
        setCursor(newCursor);
        cursorRef.current = newCursor;
      }
      setLoading(false);
      loadingRef.current = false;
    };
    fetch();

    return () => {
      controller.abort();
    };
  }, [postType]);

  useEffect(() => {
    const controller = new AbortController();
    const observer = new IntersectionObserver((entries) => {
      const loadMore = async () => {
        setLoading(true);
        loadingRef.current = true;
        const result = await readPost(
          cursorRef.current,
          postType,
          controller.signal,
        );

        if (controller.signal.aborted) {
          setLoading(false);
          loadingRef.current = false;
          return;
        }

        if (result.error) {
          setError(result.error);
          setLoading(false);
          loadingRef.current = false;
          return;
        }
        setData((current) => [...current, ...(result.data ?? [])]);
        setHasMore(result.hasMore);
        hasMoreRef.current = result.hasMore;
        if (result.hasMore && result.data) {
          const newCursor = {
            created_at: result.data[result.data.length - 1].created_at,
            id: result.data[result.data.length - 1].id,
          };
          setCursor(newCursor);
          cursorRef.current = newCursor;
        }
        setLoading(false);
        loadingRef.current = false;
      };
      if (
        entries[0].isIntersecting &&
        hasMoreRef.current &&
        !loadingRef.current
      ) {
        loadMore();
      }
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      observer.disconnect();
      controller.abort();
    };
  }, [postType]);

  return (
    <div className="flex flex-col lg:gap-6 px-10 lg:px-20 lg:pt-12">
      {error && <div>Napotkano błąd</div>}
      {!error && (
        <>
          <div className="w-full">
            <ul className="flex flex-row gap-1 lg:gap-5">
              <li onClick={() => setPostType("all")}>Wszystkie</li>
              <li onClick={() => setPostType("announcement")}>Ogłoszenia</li>
              <li onClick={() => setPostType("event")}>Wydarzenia</li>
              <li onClick={() => setPostType("other")}>Inne</li>
            </ul>
          </div>
          <div className="flex flex-col gap-1 lg:gap-6">
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
