"use client";

import React from "react";
import Link from "next/link";
import { loginUserAndGetTokens } from "@/actions/loginUserAndGetTokens";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="navbar bg-primary text-primary-content flex justify-around">
      <Link href={"/"} className="btn btn-ghost text-xl">
        Home
      </Link>
      <Link href={"/users"} className="btn btn-ghost text-xl">
        Users
      </Link>
      <button
        onClick={async () => {
          await loginUserAndGetTokens();
          router.push("/auth"); // Використовуємо Next.js useRouter
        }}
        className="btn btn-ghost text-xl"
      >
        Login
      </button>
    </div>
  );
};

export default Navbar;
