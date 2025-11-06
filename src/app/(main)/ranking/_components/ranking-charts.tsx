'use client';

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RankingItem } from '@/types';

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
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend />
                  {items.slice(0, 5).map((item, index) => (
                    <Line
                      key={item.id}
                      type="monotone"
                      dataKey={item.contentTitle}
                      stroke={[
                        '#3b82f6',
                        '#ef4444',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6',
                      ][index]}
                      dot={false}
                      isAnimationActive={true}
                      animationDuration={800}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="artist" className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Artist Performance (Avg AI Score)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={artistData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="artist" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="avgScore"
                    fill="#3b82f6"
                    name="Avg AI Score"
                    isAnimationActive={true}
                    animationDuration={800}
                  />
                  <Bar
                    dataKey="count"
                    fill="#10b981"
                    name="Content Count"
                    isAnimationActive={true}
                    animationDuration={800}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>AI Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="count"
                    fill="#f59e0b"
                    name="Content Count"
                    isAnimationActive={true}
                    animationDuration={800}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RankingCharts;
