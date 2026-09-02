import PostImage from "./PostImage";

type PostImageProps = {
  image_url: string;
};

type PostCardProps = {
  type: string;
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
      <p>{type}</p>
      <p className="text-text-secondary">{content}</p>
      <div className="relative flex self-center w-full max-w-206 h-80">
        {/* Sort out images!!!!!!!!! */}
        {images.map((image) => (
          <PostImage image_url={image.image_url} key={image.image_url} />
        ))}
      </div>
    </div>
  );
}
