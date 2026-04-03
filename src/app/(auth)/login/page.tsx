"use client";

import { useState } from "react";
import { signIn, signUp, guestLogin } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { error } = await signIn({ email, password });
    if (error) alert(error.message);
  }

  async function handleSignup() {
    const { error } = await signUp({ email, password });
    if (error) alert(error.message);
  }

  async function handleGuest() {
    const { error } = await guestLogin();
    if (error) alert(error.message);
  }

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto mt-20">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />

      <button onClick={handleLogin} className="btn">
        Login
      </button>

      <button onClick={handleSignup} className="btn">
        Create Account
      </button>

      <div className="text-center opacity-60">or</div>

      <button onClick={handleGuest} className="btn">
        Continue as Guest
      </button>
    </div>
  );
}
