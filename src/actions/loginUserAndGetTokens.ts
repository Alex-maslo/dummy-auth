"use server";

import { IUserWithTokens } from "@/models/IUserWithTokens";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const loginUserAndGetTokens = async (): Promise<void> => {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "emilys",
      password: "emilyspass",
      expiresInMins: 30,
    }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("nu blyaaa");
  }

  const user: IUserWithTokens = await res.json();
  const cookieStore = await cookies();

  cookieStore.set("accessToken", user.accessToken);
  cookieStore.set("refreshToken", user.refreshToken);
  cookieStore.set("user", JSON.stringify(user));

  revalidatePath("/auth");

  // redirect(`/auth`);
};
