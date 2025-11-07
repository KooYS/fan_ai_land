'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Eye, Radio } from 'lucide-react';

export default function LiveStats() {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="gap-1 animate-pulse">
                  <Radio className="w-3 h-3" />
                  LIVE
                </Badge>
                <span className="text-sm text-muted-foreground">접속 중</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{formatNumber(onlineUsers)}</span>
                <span className="text-sm text-muted-foreground">명</span>
              </div>
            </div>
            <Users className="w-12 h-12 text-primary/30" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="w-3 h-3" />
                  실시간
                </Badge>
                <span className="text-sm text-muted-foreground">업로드</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{liveContent}</span>
                <span className="text-sm text-muted-foreground">개</span>
              </div>
            </div>
            <Radio className="w-12 h-12 text-orange-500/30" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <Eye className="w-3 h-3" />
                  오늘
                </Badge>
                <span className="text-sm text-muted-foreground">조회수</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{formatNumber(totalViews)}</span>
                <span className="text-sm text-muted-foreground">회</span>
              </div>
            </div>
            <Eye className="w-12 h-12 text-blue-500/30" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
