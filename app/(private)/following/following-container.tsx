import { useState } from "react";

import FollowingList from "./following-list";

export default function FollowingContainer() {
  const [cnt, setCnt] = useState(1);

  return (
    <div>
      {[...Array(cnt)].map((_, i) => (
        <FollowingList key={i} index={i} />
      ))}
      <div className="flex justify-center">
        <button
          className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg"
          onClick={() => setCnt(cnt + 1)}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
