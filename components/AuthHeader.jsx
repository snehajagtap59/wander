"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/client";
import LogoutButton from "@/components/LogoutButton";

export default function AuthHeader() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="w-full flex items-center justify-between p-4 border-b">
      <Link href="/" className="font-bold text-lg">
        MyApp
      </Link>

      <div className="flex items-center gap-4">
        {!user && (
          <>
            <Link href="/login" className="text-sm hover:underline">
              Login
            </Link>
            <Link href="/signup" className="text-sm hover:underline">
              Sign up
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="text-sm text-zinc-500">
              {user.email}
            </span>
            <LogoutButton />
          </>
        )}
      </div>
    </header>
  );
}
