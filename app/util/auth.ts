import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { sql } from "@/db";
import { jwtVerify } from "jose";

export async function getJWTPayload() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt-token");

  console.log("Token value:", token?.value);

  if (!token?.value) {
    throw new Error("JWT token is missing or empty.");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload, protectedHeader } = await jwtVerify(token?.value!, secret);
  return payload;
}
