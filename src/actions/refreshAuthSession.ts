"use server";
import { cookies } from "next/headers";

export const refreshAuthSession = async () => {
  const refreshTokenOld = (await cookies()).get("refreshToken")?.value;

  const res = await fetch("https://dummyjson.com/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refreshToken: refreshTokenOld, // Optional, if not provided, the server will use the cookie
      expiresInMins: 2, // optional (FOR ACCESS TOKEN), defaults to 60
    }),
    credentials: "include", // Include cookies (e.g., accessToken) in the request
  });
  const { accessToken, refreshToken } = await res.json();

  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken);
  cookieStore.set("refreshToken", refreshToken);

  console.log(accessToken);
};
