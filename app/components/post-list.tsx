import useSWR from "swr";

import { PostT } from "../types";
import Post from "./post";

type PostListProps = {
  index: number;
  username: string;
};

export default function PostList({ index, username }: PostListProps) {
  const { data, error, isLoading } = useSWR(
    () => "/api/posts?page=" + index + "&username=" + username
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <ul>
      {data.data.map((post: PostT) => {
        return (
          <li key={post.id} className="my-5">
            <Post post={post} />
          </li>
        );
      })}
    </ul>
  );
}
