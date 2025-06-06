import useSWR from "swr";

import { PostT } from "@/app/types";
import Post from "@/app/components/post";

export default function FeedList({ index }: { index: number }) {
  const { data, error, isLoading } = useSWR("/api/posts/feed?page=" + index);

  if (error) return <div>Faild to load</div>;
  if (isLoading) return <div>Loading... </div>;

  return (
    <ul>
      {data.data.map((post: PostT) => {
        return (
          <li className="my-5" key={post.id}>
            <Post post={post} />
          </li>
        );
      })}
    </ul>
  );
}
