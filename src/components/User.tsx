import React from "react";
import { IUser } from "@/models/IUser";

const User = ({ user }: { user: IUser }) => {
  return (
    <div>
      <h2>{user.firstName}</h2>
    </div>
  );
};

export default User;
