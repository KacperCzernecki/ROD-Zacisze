import Image from "next/image";
import { FastAverageColor } from "fast-average-color";
import { useState, useEffect } from "react";

type PostImage = {
  image_url: string;
};

export default function PostImage({ image_url }: PostImage) {
  const [color, setColor] = useState("#faf7f2");

  return (
    <Image
      className="object-contain rounded-2xl md:block overflow-hidden"
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      src={image_url}
      style={{ backgroundColor: color }}
      loading="eager"
      alt={`Image to a post`}
      onLoad={(e) => {
        const img = e.currentTarget;
        const fac = new FastAverageColor();

        fac
          .getColorAsync(img, { algorithm: "dominant" })
          .then((color) => setColor(color.hex))
          .catch((e) => {
            console.log(e);
            setColor("#faf7f2");
          });
      }}
    ></Image>
  );
}
