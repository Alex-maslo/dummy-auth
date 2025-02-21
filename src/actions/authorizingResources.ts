import { cookies } from "next/headers";

export const authorizingUsers = async (): Promise<any> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

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
