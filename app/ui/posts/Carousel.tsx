import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import PostImage from "./PostImage";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type PostImageProps = {
  image_url: string;
};

type CarouselProps = {
  images: PostImageProps[];
};

export default function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const next = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const startX = useRef(0); /* For sliding */

  return (
    <div className="flex gap-3 w-full">
      {images.length > 1 && (
        <button
          onClick={prev}
          className="hidden md:block shrink-0 border border-border-main rounded-2xl active:bg-highlight cursor-pointer"
        >
          <ChevronLeftIcon className="w-6 text-text-main-100" />
        </button>
      )}

      <div
        className="relative flex-1 min-w-0 h-80 touch-pan-y overflow-hidden"
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          const diff = e.clientX - startX.current;

          if (diff < -100) next();
          if (diff > 100) prev();
        }}
      >
        <div
          className="flex w-full h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image) => (
            <div
              key={image.image_url}
              className="relative shrink-0 w-full h-full"
            >
              <PostImage image_url={image.image_url} />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-0 left-0 z-10 flex w-full justify-center gap-3 py-3">
            {images.map((image, index) => (
              <button
                key={image.image_url}
                onClick={() => setCurrentIndex(index)}
                className={clsx(
                  "flex w-2 h-2 border border-unselected rounded-full cursor-pointer",
                  {
                    "bg-highlight border-0": currentIndex === index,
                  },
                )}
              />
            ))}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <button
          onClick={next}
          className="hidden md:block shrink-0 border border-border-main rounded-2xl active:bg-highlight cursor-pointer"
        >
          <ChevronRightIcon className="w-6 text-text-main-100" />
        </button>
      )}
    </div>
  );
}
