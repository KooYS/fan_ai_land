'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Award, Eye, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface RankingItem {
  id: string;
  rank: number;
  artistName: string;
  contentTitle: string;
  uploaderName: string;
  uploaderAvatar: string;
  thumbnailUrl: string;
  likes: number;
  views: number;
  aiScore: number;
  rankChange: number;
  uploadedAt: string;
}

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) {
    return (
      <div className="flex items-center gap-1 bg-[#FFD700] text-white px-3 py-1 rounded-full font-bold">
        <Award className="w-4 h-4" />
        <span>{rank}</span>
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="flex items-center gap-1 bg-[#C0C0C0] text-white px-3 py-1 rounded-full font-bold">
        <Award className="w-4 h-4" />
        <span>{rank}</span>
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="flex items-center gap-1 bg-[#CD7F32] text-white px-3 py-1 rounded-full font-bold">
        <Award className="w-4 h-4" />
        <span>{rank}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center bg-muted text-muted-foreground px-3 py-1 rounded-full font-bold min-w-[48px]">
      {rank}
    </div>
  );
};

const RankChange = ({ change }: { change: number }) => {
  if (change > 0) {
    return (
      <div className="flex items-center gap-1 text-green-600 font-semibold text-sm">
        <TrendingUp className="w-4 h-4" />
        <span>{change}</span>
      </div>
    );
  }
  if (change < 0) {
    return (
      <div className="flex items-center gap-1 text-red-600 font-semibold text-sm">
        <TrendingDown className="w-4 h-4" />
        <span>{Math.abs(change)}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 text-muted-foreground font-semibold text-sm">
      <Minus className="w-4 h-4" />
    </div>
  );
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const RankingList = ({ items }: { items: RankingItem[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <Card
            className={cn(
              'p-4 cursor-pointer',
              item.rank <= 3 && 'border-2 border-primary/30'
            )}
          >
          <div className="flex gap-4">
            <div className="flex items-center">
              <RankBadge rank={item.rank} />
            </div>

            <div className="relative flex-shrink-0">
              <Image
                src={item.thumbnailUrl}
                alt={item.contentTitle}
                width={160}
                height={160}
                className="rounded-lg aspect-square object-cover"
              />
            </div>

            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{item.artistName}</Badge>
                  <RankChange change={item.rankChange} />
                </div>
                <h3 className="font-bold text-lg line-clamp-1">
                  {item.contentTitle}
                </h3>
                <div className="flex items-center gap-2">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={item.uploaderAvatar} />
                    <AvatarFallback>
                      {item.uploaderName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {item.uploaderName}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <motion.div
                  className="flex items-center gap-1 text-muted-foreground"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-red-500">❤️</span>
                  <span>{formatNumber(item.likes)}</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-1 text-muted-foreground"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Eye className="w-4 h-4" />
                  <span>{formatNumber(item.views)}</span>
                </motion.div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex flex-col items-center gap-2 bg-primary/10 rounded-lg p-4">
                <span className="text-xs text-muted-foreground font-medium">
                  AI Score
                </span>
                <span className="text-2xl font-bold text-primary">
                  {item.aiScore}
                </span>
              </div>
            </div>
          </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default RankingList;
