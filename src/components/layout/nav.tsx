"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <span className="hidden font-bold lg:inline-block">
          Duckzill
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          href="/ranking"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/ranking" ? "text-foreground" : "text-foreground/80"
          )}
        >
          Ranking
        </Link>
        <Link
          href="/feed"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/feed")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Feed
        </Link>
        <Link
          href="/store"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/store")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Store
        </Link>
      </nav>
    </div>
  )
}