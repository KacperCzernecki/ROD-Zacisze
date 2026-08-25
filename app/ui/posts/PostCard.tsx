import Image from "next/image";
import { useEffect } from "react";

type PostImage = {
  image_url: string;
};

type PostCardProps = {
  type: string;
  title: string;
  content: string;
  images: PostImage[];
  created_at: string;
};

export default function PostCard({
  type,
  title,
  content,
  images,
  created_at,
}: PostCardProps) {
  const dateTime = created_at.split("T");
  const date = dateTime[0].split("-");
  const [year, month, day] = date;

  return (
    <div className="flex flex-col max-w-4xl max-h-145 border-amber-800 border-2 p-2 gap-1 lg:p-8 lg:gap-5">
      <div className="flex justify-between">
        <h1>{title}</h1>
        <p className="text-xs">
          {day}.{month}.{year}
        </p>
      </div>
      <p>{type}</p>
      <p>{content}</p>
      <div>
        {images.map((image) => (
          <Image
            key={image.image_url}
            src={image.image_url}
            width={100}
            height={100}
            style={{ width: "auto", height: "auto" }}
            loading="eager"
            alt={`Image to a post`}
          ></Image>
        ))}
      </div>
    </div>
  );
}
