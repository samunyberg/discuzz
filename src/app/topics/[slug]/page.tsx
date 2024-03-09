import CreatePostForm from "@/components/posts/CreatePostForm";

interface Props {
  params: {
    slug: string;
  };
}

const ShowTopicPage = ({ params: { slug } }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 border">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
      </div>
      <div>
        <CreatePostForm slug={slug} />
      </div>
    </div>
  );
};

export default ShowTopicPage;
