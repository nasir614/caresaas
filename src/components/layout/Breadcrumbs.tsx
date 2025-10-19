"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav className="hidden md:flex items-center text-sm font-medium">
      <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
        Home
      </Link>
      {pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const isLast = index === pathSegments.length - 1;
        const name = segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <div key={href} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            <Link
              href={href}
              className={
                isLast
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }
              aria-current={isLast ? "page" : undefined}
            >
              {name}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
