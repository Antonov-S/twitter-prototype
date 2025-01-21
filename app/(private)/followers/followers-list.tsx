import useSWR from "swr";

import User from "@/app/components/user";
import { UserT } from "@/app/types";

export default function FollowersList({ index }: { index: number }) {
  const { data: userData } = useSWR("/api/users/profile");
  const { data: followerData } = useSWR(
    () => "/api/users/" + userData.data.id + "/followers?page=" + index
  );

  if (!followerData) return <div>loading...</div>;

  return (
    <ul>
      {followerData.data.map((user: UserT) => {
        return (
          <li className="my-5" key={user.id}>
            <User href={user.username} user={user} />
          </li>
        );
      })}
    </ul>
  );
}
