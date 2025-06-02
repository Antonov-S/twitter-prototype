import { useState } from "react";
import PostList from "./post-list";

type PostContainerProps = {
  username: string;
};

export default function PostContainer({ username }: PostContainerProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cnt, setCnt] = useState(1);
  const pages = [];

  for (let i = 0; i < cnt; i++) {
    pages.push(<PostList index={i} key={i} username={username} />);
  }

  return (
    <div className="my-5">
      {pages}
      <div className="flex flex-row justify-center">
        <button
          onClick={() => setCnt(cnt + 1)}
          className="bg-slate-900 p-2 rounded-lg my-5"
        >
          Load More
        </button>
      </div>
    </div>
  );
}
