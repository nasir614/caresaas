import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect all base '/' traffic to the main dashboard
  redirect("/dashboard");
  return null;
}