// This file will be created, but the prompt does not provide content for it.
// I will use the content from the previous user prompt.
"use client";
import { useState } from "react";
import { loginUser } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/lib/hooks/use-toast";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      router.push("/dashboard");
    } catch (e: any) {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: e.message || "Please check your credentials and try again.",
        });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary py-12">
      <form
        onSubmit={submit}
        className="w-full"
      >
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.6 15.15C17.6 15.15 17.39 16.29 16.2 16.89C15.01 17.49 13.57 17.13 13.57 17.13L12 16.5L10.43 17.13C10.43 17.13 8.99 17.49 7.8 16.89C6.61 16.29 6.4 15.15 6.4 15.15C6.4 15.15 6.86 13.88 7.94 13.33C9.02 12.78 10.43 13.15 10.43 13.15L12 13.78L13.57 13.15C13.57 13.15 14.98 12.78 16.06 13.33C17.14 13.88 17.6 15.15 17.6 15.15Z" fill="currentColor"/>
                <path d="M14.5 9.5C14.5 10.88 13.38 12 12 12C10.62 12 9.5 10.88 9.5 9.5C9.5 8.12 10.62 7 12 7C13.38 7 14.5 8.12 14.5 9.5Z" fill="currentColor"/>
                </svg>
                <h1 className="text-2xl font-bold font-headline ml-2">CareCloud SaaS</h1>
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
        </form>
    </div>
  );
}
