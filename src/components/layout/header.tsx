import Link from "next/link"

import { MainNav } from "@/components/layout/nav"
import { Button } from "../ui/button"

export function Header() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MainNav />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <nav className="flex items-center gap-0.5">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 px-0"
              >
                <Link
                  href={""}
                  target="_blank"
                  rel="noreferrer"
                >
                  쳌쳌
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}