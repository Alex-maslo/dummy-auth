import React from "react";
import { authorizingUsers } from "@/actions/authorizingResources";
import { IUser } from "@/models/IUser";
import User from "@/components/User";

const Users = async () => {
  const users: IUser[] = await authorizingUsers();

  return (
    <div className="flex flex-wrap gap-4">
      {users ? (
        users.map((user) => <User key={user.id} user={user} />)
      ) : (
        <div className="flex justify-center p-5">
          <h1 className="text-2xl">No users found or token expired</h1>
        </div>
      )}
    </div>
  );
};

export default Users;
