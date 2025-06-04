import { NextResponse } from "next/server";

import { sql } from "@/db";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params; // тук await
  const id = params.id;

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "0");
  const limit = 2;
  const offset = page * limit;

  const res = await sql(
    `select u.id, u.username, u.avatar
     from users u inner join follows f on u.id = f.user_id
     where follower_id = $1 limit $2 offset $3`,
    [id, limit, offset]
  );

  return NextResponse.json({ data: res.rows });
}
