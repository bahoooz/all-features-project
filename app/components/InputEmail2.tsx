"use client";

import { useAppStore } from "@/store";
import React from "react";

export default function InputEmail2() {
  const email = useAppStore.use.email();
  const updateEmail = useAppStore.use.updateEmail();
  const timer = useAppStore.use.timer();

  return (
    <div>
      <input
        type="email"
        onChange={(e) => updateEmail(e.target.value)}
        className="border border-black"
        placeholder="Entrer votre email"
        value={email || ""}
      />
      <p>Timer : {timer}</p>
      
    </div>
  );
}
