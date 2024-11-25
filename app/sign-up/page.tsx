"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setPending(false);
      router.push("/sign-in");
    } else if (res.status === 400) {
      setError(data.error);
      setPending(false);
    } else if (res.status === 500) {
      setPending(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Sign Up</h1>
        <div>
          <p>Use email or service to create an account.</p>
        </div>
      </div>
      {error && <p>{error}</p>}
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            disabled={pending}
            value={form.name}
            placeholder="Full name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            disabled={pending}
            value={form.email}
            placeholder="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            disabled={pending}
            value={form.password}
            placeholder="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <input
            type="password"
            disabled={pending}
            value={form.confirmPassword}
            placeholder="confirm password"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
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
          <p>Already have an account?</p>
          <Link href={"/sign-in"}>Sign In</Link>
        </form>
      </div>
    </div>
  );
}
