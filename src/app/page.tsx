import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Activity, ShieldCheck, CreditCard } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find(img => img.id === "hero");

const featureItems = [
  {
    icon: Users,
    title: "Client & Staff Management",
    description: "Streamline profiles, schedules, and care plans in one centralized hub.",
  },
  {
    icon: Activity,
    title: "Dashboard & KPIs",
    description: "Monitor attendance, compliance, and key metrics with our intuitive dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "AI Compliance Tools",
    description: "Automate credential tracking and stay ahead of compliance requirements effortlessly.",
  },
  {
    icon: CreditCard,
    title: "Seamless Billing",
    description: "Integrate with Stripe for easy subscription and payment management.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.6 15.15C17.6 15.15 17.39 16.29 16.2 16.89C15.01 17.49 13.57 17.13 13.57 17.13L12 16.5L10.43 17.13C10.43 17.13 8.99 17.49 7.8 16.89C6.61 16.29 6.4 15.15 6.4 15.15C6.4 15.15 6.86 13.88 7.94 13.33C9.02 12.78 10.43 13.15 10.43 13.15L12 13.78L13.57 13.15C13.57 13.15 14.98 12.78 16.06 13.33C17.14 13.88 17.6 15.15 17.6 15.15Z" fill="currentColor"/>
            <path d="M14.5 9.5C14.5 10.88 13.38 12 12 12C10.62 12 9.5 10.88 9.5 9.5C9.5 8.12 10.62 7 12 7C13.38 7 14.5 8.12 14.5 9.5Z" fill="currentColor"/>
          </svg>
          <span className="sr-only">CareCloud SaaS</span>
        </Link>
        <span className="ml-2 text-lg font-bold font-headline">CareCloud SaaS</span>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="/auth/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
          <Button asChild>
            <Link href="/auth/register">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-24 lg:pb-32">
          <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                  The All-in-One Solution for Adult Daycare Management
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  CareCloud SaaS simplifies your operations, enhances client care, and ensures compliance, all from one powerful platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/auth/register">Start Free Trial</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#">Request a Demo</Link>
                </Button>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  width={1270}
                  height={846}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  className="mx-auto aspect-video overflow-hidden rounded-t-xl object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Everything You Need, Nothing You Don't
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed with the specific needs of adult daycare centers in mind, focusing on efficiency, compliance, and quality of care.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {featureItems.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Ready to transform your daycare center?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join dozens of centers who have streamlined their workflow and improved client outcomes. Get started today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Button asChild size="lg">
                <Link href="/auth/register">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} CareCloud SaaS. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
