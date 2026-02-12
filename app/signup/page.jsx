"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignupPage() {
  const router = useRouter();
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // ✅ account created → go to login
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md rounded-xl border p-8 shadow bg-white dark:bg-black"
      >
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded disabled:opacity-60"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
