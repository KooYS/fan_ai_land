'use client';

import Link from "next/link"
import { MainNav } from "@/components/layout/nav"
import { Button } from "@/ui/button"
import { CommandSearch } from "@/components/layout/command-search"
import { UserCircle, Users, Radio, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from 'react';

export function Header() {
  const [onlineUsers, setOnlineUsers] = useState(12847);
  const [liveContent, setLiveContent] = useState(23);
  const [totalViews, setTotalViews] = useState(1547892);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) => prev + Math.floor(Math.random() * 20 - 5));
      setLiveContent((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(10, prev + change);
      });
      setTotalViews((prev) => prev + Math.floor(Math.random() * 100));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MainNav />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <div className="hidden lg:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Badge variant="destructive" className="gap-1 h-5 px-1.5 animate-pulse">
                  <Radio className="w-3 h-3" />
                </Badge>
                <Users className="w-4 h-4" />
                <span className="font-semibold text-foreground">{formatNumber(onlineUsers)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Badge variant="secondary" className="gap-1 h-5 px-1.5">
                  <Radio className="w-3 h-3" />
                </Badge>
                <span className="font-semibold text-foreground">{liveContent}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span className="font-semibold text-foreground">{formatNumber(totalViews)}</span>
              </div>
            </div>
            <nav className="flex items-center gap-4">
              <CommandSearch />
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-6 w-6"
              >
                <Link
                  href={""}
                  target="_blank"
                  className="h-6 w-6"
                  rel="noreferrer"
                >
                  <UserCircle className="!h-5 !w-5" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}