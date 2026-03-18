"use client";

import * as React from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export function useSession() {
  const [session, setSession] = React.useState<Session | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setIsLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return { session, isLoading };
}

