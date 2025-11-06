'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RankingItem } from '@/types';
import { TrendingUp } from 'lucide-react';

interface RankingChartsProps {
  items: RankingItem[];
}

const RankingCharts = ({ items }: RankingChartsProps) => {
  const trendData = useMemo(() => {
    // Create trend data for top 5 items
    const top5 = items.slice(0, 5);

    // Simulate hourly trend data
    const hours = Array.from({ length: 24 }, (_, i) => {
      const data: Record<string, string | number> = { hour: `${i}:00` };

      top5.forEach((item) => {
        // Create realistic trend data based on rank
        const baseViews = item.views / 1000;
        const variation = Math.sin((i * Math.PI) / 12) * (10 - item.rank * 2);
        data[item.contentTitle] = Math.max(
          baseViews + variation,
          baseViews * 0.5
        );
      });

      return data;
    });

    return hours;
  }, [items]);

  const artistData = useMemo(() => {
    // Group items by artist and calculate stats
    const artistMap = new Map<
      string,
      {
        artist: string;
        count: number;
        avgScore: number;
        totalViews: number;
      }
    >();

    items.forEach((item) => {
      const existing = artistMap.get(item.artistName) || {
        artist: item.artistName,
        count: 0,
        avgScore: 0,
        totalViews: 0,
      };

      artistMap.set(item.artistName, {
        artist: item.artistName,
        count: existing.count + 1,
        avgScore:
          (existing.avgScore * existing.count + item.aiScore) /
          (existing.count + 1),
        totalViews: existing.totalViews + item.views,
      });
    });

    return Array.from(artistMap.values())
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 8);
  }, [items]);

  const scoreDistribution = useMemo(() => {
    const distribution = [
      { range: '90-100', count: 0, avg: 0 },
      { range: '80-90', count: 0, avg: 0 },
      { range: '70-80', count: 0, avg: 0 },
      { range: '60-70', count: 0, avg: 0 },
    ];

    items.forEach((item) => {
      if (item.aiScore >= 90) {
        distribution[0].count++;
        distribution[0].avg =
          (distribution[0].avg * (distribution[0].count - 1) + item.aiScore) /
          distribution[0].count;
      } else if (item.aiScore >= 80) {
        distribution[1].count++;
        distribution[1].avg =
          (distribution[1].avg * (distribution[1].count - 1) + item.aiScore) /
          distribution[1].count;
      } else if (item.aiScore >= 70) {
        distribution[2].count++;
        distribution[2].avg =
          (distribution[2].avg * (distribution[2].count - 1) + item.aiScore) /
          distribution[2].count;
      } else {
        distribution[3].count++;
        distribution[3].avg =
          (distribution[3].avg * (distribution[3].count - 1) + item.aiScore) /
          distribution[3].count;
      }
    });

    return distribution;
  }, [items]);

  return (
    <div className="grid gap-6 w-full">
      <Tabs defaultValue="trend" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trend">Trend</TabsTrigger>
          <TabsTrigger value="artist">Artist Performance</TabsTrigger>
          <TabsTrigger value="distribution">AI Score Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="trend" className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>24-Hour Trend (Views)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg border border-border">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground text-sm">차트 데이터 로딩 중...</p>
                  <p className="text-xs text-muted-foreground mt-1">{trendData.length}시간 데이터 준비됨</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="artist" className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Artist Performance (Avg AI Score)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 space-y-2">
                {artistData.map((artist) => (
                  <div key={artist.artist} className="flex items-center gap-3 p-3 bg-muted/50 rounded">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{artist.artist}</p>
                      <p className="text-xs text-muted-foreground">
                        평균 점수: {artist.avgScore.toFixed(2)} | 콘텐츠: {artist.count}개
                      </p>
                    </div>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${(artist.avgScore / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>AI Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 space-y-3">
                {scoreDistribution.map((dist) => (
                  <div key={dist.range} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{dist.range}</p>
                      <span className="text-xs text-muted-foreground">
                        {dist.count}개 (평균: {dist.avg.toFixed(2)})
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500"
                        style={{ width: `${(dist.count / items.length) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RankingCharts;
