"use client";

import { FormInput } from "@/components/shared/form-input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null);

    try {
      // TODO: Implement actual admin authentication
      // For now, this is a placeholder
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        setLoginError("Invalid password. Please try again.");
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        {/* Mobile Logo */}
        <div className="lg:hidden text-center mb-8">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
            style={{ backgroundColor: "#C4A053" }}
          >
            <div className="w-6 h-6 bg-white rounded-sm" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">ICSA</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-foreground">Admin Login</h2>
            <p className="text-muted-foreground">
              Enter your password to access the admin dashboard
            </p>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
              {loginError}
            </div>
          )}

          {/* Password Field */}
          <div className="space-y-2">
            <div className="relative">
              <div className="space-y-6">
                <FormInput
                  label="Admin Email"
                  required
                  type="email"
                  registration={register("email")}
                  error={errors.email}
                  placeholder="Enter admin email"
                  inputClassName="pr-10"
                />

                <FormInput
                  label="Admin Password"
                  required
                  type={showPassword ? "text" : "password"}
                  registration={register("password")}
                  error={errors.password}
                  placeholder="Enter admin password"
                  inputClassName="pr-10"
                />
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-[38px] h-10 px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-sm font-medium text-white bg-gold hover:bg-gold/90 rounded-lg shadow-none"
          >
            {isSubmitting ? "Logging in..." : "Access Admin Dashboard"}
          </Button>

          {/* Back to Home */}
          <div className="text-center text-sm text-muted-foreground">
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-sm hover:text-opacity-80 font-medium text-gold"
              onClick={() => router.push("/")}
            >
              ← Back to Home
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
