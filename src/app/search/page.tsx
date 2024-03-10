import PostList from "@/components/posts/PostList";
import { fetchPostsBySearchTerm } from "@/db/queries/posts";
import { redirect } from "next/navigation";

const SearchPage = async ({
  searchParams: { term },
}: {
  searchParams: {
    term: string;
  };
}) => {
  if (!term) redirect("/");

  return (
    <div>
      <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
    </div>
  );
};

export default SearchPage;
