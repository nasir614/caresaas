import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect all base '/' traffic to dashboard
  redirect("/dashboard");
  return null;
}
