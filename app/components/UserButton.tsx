"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function UserButton() {
  const router = useRouter();
  const { data: session, status } = useSession();


  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOut({
        redirect: false,
    });
  }

  console.log(avatarFallback);

  return (
    <div>{session ? (
        <div className="flex items-center gap-4">
            <span>{session.user?.name}</span>
            <button onClick={() => handleSignOut()}>Log out</button>
        </div>
    ) : "Non connecté"}</div>
  );
}
