import { NextResponse } from "next/server";

import { sql } from "@/db";
import { getJWTPayload } from "@/app/util/auth";

export async function GET(request: Request) {
  const jwtPayload = await getJWTPayload();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");

  const res = await sql(
    "select * from follows where user_id = $1 and follower_id = $2",
    [userId, jwtPayload.sub]
  );

  return NextResponse.json({ data: res.rows });
}

export async function POST(request: Request) {
  const jwtPayload = await getJWTPayload();
  const json = await request.json();

  const res = await sql(
    "select * from follows where user_id = $1 and follower_id = $2",
    [json.user_id, jwtPayload.sub]
  );

  if (res.rowCount && res.rowCount > 0) {
    return NextResponse.json({ error: "already following" }, { status: 409 });
  }

  await sql("insert into follows (user_id, follower_id) values ($1, $2)", [
    json.user_id,
    jwtPayload.sub
  ]);

  return NextResponse.json({ msg: "follow success" });
}
