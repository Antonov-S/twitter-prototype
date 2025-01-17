"use client";

import useSWR from "swr";

import Form from "./form";
import PostContainer from "@/app/components/post-container";

export default function Profile() {
  const { data, error, isLoading } = useSWR("/api/users/profile");

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      <h2>Profile</h2>
      <Form />
      <PostContainer username={data.data.username} />
    </main>
  );
}
