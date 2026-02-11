"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // ✅ login successful
    router.push("/");
    router.refresh(); // important for auth-aware pages
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl border p-8 shadow bg-white dark:bg-black"
      >
        <h1 className="text-2xl font-bold mb-6">Login</h1>

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
          {loading ? "Logging in..." : "Login"}
          <p className="mt-4 text-sm text-center">
  Don&apos;t have an account?{" "}
  <Link
    href="/signup"
    className="text-blue-600 hover:underline font-medium"
  >
    Sign up
  </Link>
</p>

        </button>
      </form>
    </div>
  );
}
