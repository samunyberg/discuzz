import CreatePostForm from "@/components/posts/CreatePostForm";
import PostList from "@/components/posts/PostList";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";

interface Props {
  params: {
    slug: string;
  };
}

const ShowTopicPage = ({ params: { slug } }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>
      <div>
        <CreatePostForm slug={slug} />
      </div>
    </div>
  );
};

export default ShowTopicPage;
