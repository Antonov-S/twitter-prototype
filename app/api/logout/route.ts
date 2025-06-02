import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  const response = NextResponse.json({ msg: "Logout success" });
  response.cookies.set("jwt-token", "");
  return response;
}
