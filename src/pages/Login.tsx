import { z } from "zod";
import {
  FormItem,
  FormControl,
  FormMessage,
  FormField,
  Form,
} from "../components/ui/form";
import { registerWithCredentials, login, loginWithGoogle } from "../auth/Auth";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Pssword must be atleast 4 characters"),
});

type AuthFormData = z.infer<typeof schema>;

const Login = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const form = useForm<AuthFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      if (isRegistered) {
        await registerWithCredentials({
          email: data.email.trim(),
          password: data.password.trim(),
        });
      } else {
        await login({
          email: data.email.trim(),
          password: data.password.trim(),
        });
      }
      navigate("/dashboard");
    } catch (err: unknown) {
      alert(
        `Auth failed: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err: unknown) {
      alert(
        `Google sign in failed: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <div className="max-w-md mx-auto rounded shadow-md bg-white/90 p-6 space-y-4 mt-20">
      <h1 className="text-xl font-semibold text-center">
        {isRegistered ? "Create account" : "Login"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    className="my-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    className="my-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded mt-6"
          >
            {isRegistered ? "Sign Up" : "Sign In"}
          </button>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full bg-red-500 text-white p-2 rounded mt-6"
          >
            Continue with Google
          </button>

          <p className="text-sm text-center mt-6">
            {isRegistered
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsRegistered(!isRegistered)}
              className="text-blue-600 underline"
            >
              {isRegistered ? "Login" : "Register"}
            </button>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Login;
