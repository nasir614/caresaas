import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary py-12">
      <Card className="mx-auto max-w-md w-full">
         <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.6 15.15C17.6 15.15 17.39 16.29 16.2 16.89C15.01 17.49 13.57 17.13 13.57 17.13L12 16.5L10.43 17.13C10.43 17.13 8.99 17.49 7.8 16.89C6.61 16.29 6.4 15.15 6.4 15.15C6.4 15.15 6.86 13.88 7.94 13.33C9.02 12.78 10.43 13.15 10.43 13.15L12 13.78L13.57 13.15C13.57 13.15 14.98 12.78 16.06 13.33C17.14 13.88 17.6 15.15 17.6 15.15Z" fill="currentColor"/>
              <path d="M14.5 9.5C14.5 10.88 13.38 12 12 12C10.62 12 9.5 10.88 9.5 9.5C9.5 8.12 10.62 7 12 7C13.38 7 14.5 8.12 14.5 9.5Z" fill="currentColor"/>
            </svg>
            <h1 className="text-2xl font-bold font-headline ml-2">CareCloud SaaS</h1>
          </div>
          <CardTitle className="text-2xl">Create your Organization</CardTitle>
          <CardDescription>
            Start your 14-day free trial. No credit card required for the trial period.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="organization-name">Organization Name</Label>
              <Input id="organization-name" placeholder="Sunshine Daycare Center" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Robinson" required />
                </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            
            <div className="grid gap-2">
                <Label>Select a Plan</Label>
                <RadioGroup defaultValue="monthly" className="grid grid-cols-2 gap-4">
                    <div>
                        <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                        <Label htmlFor="monthly" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            <span className="font-semibold">Monthly</span>
                            <span className="text-2xl font-bold">$49</span>
                            <span className="text-xs text-muted-foreground">per month</span>
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="annual" id="annual" className="peer sr-only" />
                        <Label htmlFor="annual" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                             <span className="font-semibold">Annual</span>
                            <span className="text-2xl font-bold">$499</span>
                            <span className="text-xs text-muted-foreground">per year</span>
                        </Label>
                    </div>
                </RadioGroup>
            </div>


            <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">Proceed to Checkout</Link>
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
