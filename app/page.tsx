"use client";
import { useEffect, useMemo, useState } from "react";
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
  const [data, setData] = useState<Post[] | undefined | null>([]);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const fetch = async () => {
      const result = await readPost(page);

      if (result.error) {
        setError(result.error);
      }
      setData(result.data);
      setCount(result.count || 0);
    };
    fetch();
  }, [page]);

  const numOfPages = useMemo(() => {
    return Math.ceil(count / 10);
  }, [count]);
  return (
    <div>
      <div className="flex flex-col gap-10 justify-center items-center">
        {data?.map((post: Post) => {
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
      <div>
        {Array.from({ length: numOfPages }, (_, i) => i + 1).map((pageNum) => (
          <button key={pageNum} onClick={() => setPage(pageNum)}>
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
}
