import useSWR from "swr";

import User from "@/app/components/user";
import { UserT } from "@/app/types";

type FollowingListProps = {
  index: number;
};

function FollowingList({ index }: FollowingListProps) {
  const { data: userData } = useSWR("/api/users/profile");
  const { data: followerData } = useSWR(
    () => "/api/users/" + userData.data.id + "/following?page=" + index
  );

  if (!followerData) return <div>Loading...</div>;

  return (
    <ul>
      {followerData.data.map((user: UserT) => {
        return (
          <li className="my-5" key={user.id}>
            <User user={user} href={user.username} />
          </li>
        );
      })}
    </ul>
  );
}

export default FollowingList;
