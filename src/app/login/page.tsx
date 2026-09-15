"use client";

import { toast } from "sonner";
import { loginWithGoogle, loginWithGithub } from "../../lib/auth";
import { Button } from "../../components/ui/button";

const Login = () => {
  const handleGoogle = async () => {
    const { error } = await loginWithGoogle();
    if (error) toast.error(`Google sign in failed: ${error.message}`);
  };

  const handleGithub = async () => {
    const { error } = await loginWithGithub();
    if (error) toast.error(`GitHub sign in failed: ${error.message}`);
  };

  return (
    <div className="mx-auto mt-20 w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
      <h1 className="text-xl font-semibold text-center">
        Sign in to Job Tracker
      </h1>

      <Button type="button" onClick={handleGoogle} className="h-11 w-full">
        Continue with Google
      </Button>

      <Button type="button" onClick={handleGithub} className="h-11 w-full">
        Continue with GitHub
      </Button>
    </div>
  );
};

export default Login;
