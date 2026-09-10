import { useState, useRef } from "react";
import PostImage from "./PostImage";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const types: Record<string, string> = {
    all: "Wszystkie",
    announcement: "Ogłoszenie",
    event: "Wydarzenie",
    other: "Inne",
  };
  const dateTime = created_at.split("T");
  const date = dateTime[0].split("-");
  const [year, month, day] = date;

  const next = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const startX = useRef(0); /* For sliding */

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
      {images.length > 0 && (
        <div className="flex gap-3">
          {images.length > 1 && (
            <button
              onClick={prev}
              className="cursor-pointer border border-border-main rounded-2xl"
            >
              <ChevronLeftIcon className="w-6 text-text-main-100" />
            </button>
          )}
          <div
            className="relative flex self-center w-full max-w-206 h-80 touch-pan-y"
            onPointerDown={(e) => (startX.current = e.clientX)}
            onPointerUp={(e) => {
              const diff = e.clientX - startX.current;

              if (diff < -100) {
                next();
              }
              if (diff > 100) {
                prev();
              }
            }}
          >
            <PostImage image_url={images[currentIndex].image_url} />
          </div>
          {images.length > 1 && (
            <button
              onClick={next}
              className="cursor-pointer border border-border-main rounded-2xl"
            >
              <ChevronRightIcon className="w-6 text-text-main-100" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
