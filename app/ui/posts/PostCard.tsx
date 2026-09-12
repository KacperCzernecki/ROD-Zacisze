import { useState, useRef } from "react";
import Carousel from "./Carousel";

type PostImageProps = {
  image_url: string;
};
type PostType = "all" | "announcement" | "event" | "other";

type PostCardProps = {
  type: PostType;
  title: string;
  content: string;
  images: PostImageProps[];
  created_at: string;
};

export default function PostCard({
  type,
  title,
  content,
  images,
  created_at,
}: PostCardProps) {
  const types: Record<string, string> = {
    all: "Wszystkie",
    announcement: "Ogłoszenie",
    event: "Wydarzenie",
    other: "Inne",
  };
  const dateTime = created_at.split("T");
  const date = dateTime[0].split("-");
  const [year, month, day] = date;

  return (
    <div className="flex flex-col w-screen max-w-4xl bg-white max-h-145 border-border-main border rounded-3xl  p-3 gap-1 lg:p-8 lg:gap-5">
      <div className="flex justify-between">
        <h1 className="text-text-main-100">{title}</h1>
        <p className="text-xs text-text-secondary">
          {day}.{month}.{year}
        </p>
      </div>
      <p>{types[type]}</p>
      <p className="text-text-secondary">{content}</p>
      {images.length > 0 && <Carousel images={images} />}
    </div>
  );
}
