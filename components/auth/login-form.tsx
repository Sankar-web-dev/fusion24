"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

function sanitizeRedirectTo(redirectTo?: string) {
  if (!redirectTo) return "/dashboard";
  if (!redirectTo.startsWith("/")) return "/dashboard";
  return redirectTo;
}

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const safeRedirectTo = sanitizeRedirectTo(redirectTo);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);

  async function handleLogin() {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) throw err;
      window.location.href = safeRedirectTo;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup() {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: err } = await supabase.auth.signUp({ email, password });
      if (err) throw err;
      setMessage("Account created. Check your email to confirm, then log in.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <div className="text-sm text-white/70">
          Sign in or create an account to access your dashboard.
        </div>
      </CardHeader>
      <CardContent className="pb-7">
        <Tabs defaultValue="login">
          <TabsList className="w-full">
            <TabsTrigger className="flex-1" value="login">
              Login
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="signup">
              Signup
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-white/12 bg-white/5 p-3 text-sm text-white/80">
              {error}
            </div>
          ) : null}
          {message ? (
            <div className="mt-4 rounded-xl border border-white/12 bg-white/5 p-3 text-sm text-white/80">
              {message}
            </div>
          ) : null}

          <TabsContent value="login" className="mt-6">
            <Button
              type="button"
              variant="neon"
              className="w-full neon-ring"
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </TabsContent>
          <TabsContent value="signup" className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={loading}
              onClick={handleSignup}
            >
              {loading ? "Creating..." : "Create account"}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

