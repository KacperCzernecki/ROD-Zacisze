"use client";

import { useEffect, useRef, useState } from "react";
import { readPost } from "./lib/user/readPost";
import { PostgrestError } from "@supabase/supabase-js";
import { clsx } from "clsx";
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
  const types = [
    { value: "all", label: "Wszystkie" },
    { value: "announcement", label: "Ogłoszenie" },
    { value: "event", label: "Wydarzenie" },
    { value: "other", label: "Inne" },
  ] as const;
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
    <div className="flex w-full flex-col gap-2 px-5 lg:gap-6 lg:px-20">
      {error && <div>Napotkano błąd</div>}
      {!error && (
        <>
          <div className="flex w-full justify-center lg:justify-start">
            <ul className="flex w-screen flex-row py-2 lg:py-0 gap-1 lg:gap-5">
              {types.map((type) => (
                <li key={type.value}>
                  <button
                    type="button"
                    onClick={() => setPostType(type.value)}
                    className={clsx(
                      "py-1.5 px-3.5 rounded-full cursor-pointer font-mono font-semibold text-sm",
                      {
                        "bg-highlight text-white": type.value === postType,
                        "bg-unselected text-text-main-200":
                          type.value !== postType,
                      },
                    )}
                  >
                    {type.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2 lg:gap-6">
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
