import { createClient } from "./supabase/client";

export const loginWithGoogle = () => {
  const supabase = createClient();
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

export const loginWithGithub = () => {
  const supabase = createClient();
  return supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

export const logout = () => {
  const supabase = createClient();
  return supabase.auth.signOut();
};
