import { NextRequest, NextResponse } from "next/server";
import { IUserWithTokens } from "@/models/IUserWithTokens";

export async function middleware(request: NextRequest) {
  const userHas = request.cookies.has("user");
  if (!userHas) return NextResponse.next();

  const userCookie = request.cookies.get("user")?.value as string;
  const user: IUserWithTokens = JSON.parse(userCookie);

  try {
    const res = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`, // Pass JWT via Authorization header
      },
      credentials: "include", // Include cookies (e.g., accessToken) in the request
    });

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    return NextResponse.next();
  } catch (error) {
    const res = await fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken: user.refreshToken, // Optional, if not provided, the server will use the cookie
        expiresInMins: 30, // optional (FOR ACCESS TOKEN), defaults to 60
      }),
      credentials: "include", // Include cookies (e.g., accessToken) in the request
    });

    const data = await res.json();

    user.accessToken = data.accessToken;
    user.refreshToken = data.refreshToken;

    const response = NextResponse.next();
    response.cookies.set({
      name: "user",
      value: JSON.stringify(user),
      path: "/",
      httpOnly: true,
    });
    return response;
  }
}
