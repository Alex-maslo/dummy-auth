import { cookies } from "next/headers";

export const authorizingUsers = async (): Promise<any> => {
  const value = (await cookies()).get("user")?.value as string;
  if (!value) return null;
  const accessToken = JSON.parse(value).accessToken;

  const res = await fetch("https://dummyjson.com/auth/users", {
    method: "GET" /* or POST/PUT/PATCH/DELETE */,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const { users } = await res.json();
  return users;
};
