"use server";

import { IUser } from "@/models/IUser";
import { cookies } from "next/headers";

export const getCurrentAuthUser = async (): Promise<IUser> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const res = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`, // Pass JWT via Authorization header
    },
    credentials: "include", // Include cookies (e.g., accessToken) in the request
  });

  // if (!res.ok) {
  //   await refreshAuthSession();
  //   return await getCurrentAuthUser(); // Повторно вызываем функцию для получения пользователя
  // }

  const user: IUser = await res.json();
  return user;
};
