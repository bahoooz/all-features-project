"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      router.push("/");
      console.log("login successful");
    } else if (res?.status === 400 || res?.status === 401) {
      setError("Invalid email or password");
      setPending(false);
    } else {
      setError("Something went wrong");
      setPending(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Sign In</h1>
        <div>
          <p>Use email or service to sign in.</p>
        </div>
      </div>
      {error && <p>{error}</p>}
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            disabled={pending}
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            disabled={pending}
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button disabled={pending}>continue</button>
          <div className="flex flex-col gap-2">
            <button disabled={false} onClick={() => {}}>
              Sign Up with Google
            </button>
            <button disabled={false} onClick={() => {}}>
              Sign Up with Github
            </button>
          </div>
          <p>Create new account?</p>
          <Link href={"/sign-up"}>Sign Up</Link>
        </form>
      </div>
    </div>
  );
}
