"use client";

import { readPost } from "@/app/lib/user/readPost";
import { useEffect } from "react";

export default function PostCard() {
  useEffect(() => {
    readPost();
  });
  return <div>PostCard</div>;
}
