import React from "react";
import { cookies } from "next/headers";
import { IUserWithTokens } from "@/models/IUserWithTokens";

const AuthUser = async () => {
  const cookieStore = await cookies();
  const value = cookieStore.get("user")?.value;
  const user: IUserWithTokens | null = value ? JSON.parse(value) : null;

  return (
    <div className="flex justify-center p-5">
      {user ? (
        <div>
          <h2 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h2>
          <h2>{user.email}</h2>
        </div>
      ) : (
        <>User not create ...</>
      )}
    </div>
  );
};

export default AuthUser;
