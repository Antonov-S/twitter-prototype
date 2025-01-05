"use client";

import useSWR from "swr";

import fetcher from "../util/fetcher";

export default function Header() {
  const { data, error, isLoading } = useSWR("/api/users/profile", fetcher);

  if (error) return <div>Faild to load</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log(data);

  return <header>Header</header>;
}
