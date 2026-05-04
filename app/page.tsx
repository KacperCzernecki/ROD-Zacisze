"use client";
import { useEffect, useState } from "react";
import { readPost } from "./lib/user/readPost";
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
  const [data, setData] = useState<Post[] | string | undefined>([]);
  useEffect(() => {
    const fetch = async () => {
      const result = await readPost();
      setData(result);
    };
    fetch();
  }, []);
  return (
    <div>
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
  );
}
