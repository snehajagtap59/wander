"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default function Header() {
  const supabase = createClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // get initial session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/">Logo</Link>

      {/* 🔥 THIS IS THE FIX */}
      {user ? (
        <LogoutButton />
      ) : (
        <div className="flex gap-4">
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </div>
      )}
    </header>
  );
}
