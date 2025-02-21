import React from "react";
import { authorizingUsers } from "@/actions/authorizingResources";
import { IUser } from "@/models/IUser";
import User from "@/components/User";

const Users = async () => {
  const users: IUser[] = await authorizingUsers();

  return (
    <div>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Users;
