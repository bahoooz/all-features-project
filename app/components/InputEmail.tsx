"use client";

import { globalUpdateEmail, useAppStore } from "@/store";
import React from "react";

export default function InputEmail() {
  const email = useAppStore.use.email();
  const updateEmail = useAppStore.use.updateEmail();

  return (
    <input
      type="email"
      onChange={e => updateEmail(e.target.value)}
      className="border border-black"
      placeholder="Entrer votre email"
      value={email || ""}
    />
  );
}
