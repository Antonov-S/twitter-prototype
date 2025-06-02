import { cookies } from "next/headers";

import { jwtVerify } from "jose";

export async function getJWTPayload() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt-token");

  if (!token || !token.value) {
    throw new Error("JWT token is missing or empty.");
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not set.");
  }

  const secret = new TextEncoder().encode(jwtSecret);
  const { payload } = await jwtVerify(token.value, secret);

  return payload;
}
