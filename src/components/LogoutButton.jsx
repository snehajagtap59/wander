"use client";

import { supabase } from "@/app/lib/supabase/client";

export default function LogoutButton() {
  const supabase = createClient();

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return <button onClick={logout}>Logout</button>;
}
