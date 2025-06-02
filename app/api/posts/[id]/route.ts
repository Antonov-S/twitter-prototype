import { type NextRequest, NextResponse } from "next/server";

import { sql } from "@/db";
import { getJWTPayload } from "@/app/util/auth";

type RouteContext = {
  params: { id: string };
};

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const parsedId = Number(params.id);
  const jwtPayload = await getJWTPayload();

  const res = await sql("select * from posts where id = $1 and user_id = $2", [
    parsedId,
    jwtPayload.sub
  ]);

  if (res.rowCount === 0) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json({ data: res.rows[0] });
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const parsedId = Number(params.id);
  const body = await request.json();
  const jwtPayload = await getJWTPayload();

  const res = await sql("select * from posts where user_id = $1 and id = $2", [
    jwtPayload.sub,
    parsedId
  ]);

  if (res.rowCount === 0) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  await sql("update posts set content = $1 where user_id = $2 and id = $3", [
    body.content,
    jwtPayload.sub,
    parsedId
  ]);

  return NextResponse.json({ msg: "update success" });
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const parsedId = Number(params.id);
  const jwtPayload = await getJWTPayload();

  const res = await sql("delete from posts where user_id = $1 and id = $2", [
    jwtPayload.sub,
    parsedId
  ]);

  if (res.rowCount === 1) {
    return NextResponse.json({ msg: "delete success" });
  }

  return NextResponse.json({ error: "not found" }, { status: 404 });
}
