import ShowComment from "@/components/comments/ShowComment";
import { CommentWithAuthor } from "@/db/queries/comments";

interface Props {
  fetchData: () => Promise<CommentWithAuthor[]>;
}

const CommentList = async ({ fetchData }: Props) => {
  const comments = await fetchData();

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <ShowComment
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">{comments.length} comments</h1>
      {renderedComments}
    </div>
  );
};

export default CommentList;
