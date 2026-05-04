import Image from "next/image";

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
  return (
    <div>
      <h1>{title}</h1>
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
            alt={`Image to a post`}
          ></Image>
        ))}
      </div>
      <p>{created_at}</p>
    </div>
  );
}
