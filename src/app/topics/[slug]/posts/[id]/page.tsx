import CommentList from "@/components/comments/CommentList";
import CreateCommentForm from "@/components/comments/CreateCommentForm";
import ShowPost from "@/components/posts/ShowPost";
import ShowPostLoading from "@/components/posts/ShowPostLoading";
import paths from "@/paths";
import Link from "next/link";
import { Suspense } from "react";

interface Props {
  params: {
    slug: string;
    id: string;
  };
}

const ShowPostPage = ({ params: { slug, id } }: Props) => {
  return (
    <div className="space-y-3">
      <Link className="text-purple-950" href={paths.showTopic(slug)}>
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<ShowPostLoading />}>
        <ShowPost postId={id} />
      </Suspense>
      <CreateCommentForm postId={id} startOpen />
      <CommentList postId={id} />
    </div>
  );
};

export default ShowPostPage;
