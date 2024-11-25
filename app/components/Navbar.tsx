import React from "react";
import UserButton from "./UserButton";

export default function Navbar() {
  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-between bg-white h-16 px-4 shadow-sm">
      Navbar
      <UserButton />
    </div>
  );
}
