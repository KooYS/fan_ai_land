'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Award, Heart, Eye, TrendingUp } from 'lucide-react';
import { RankingItem } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface RankingHeroProps {
  items: RankingItem[];
}

const RankingHero = ({ items }: RankingHeroProps) => {
  const topThree = items.slice(0, 3);

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-gray-200 to-gray-400';
    }
  };

  const getMedalBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-[#FFD700]';
      case 2:
        return 'bg-[#C0C0C0]';
      case 3:
        return 'bg-[#CD7F32]';
      default:
        return 'bg-gray-300';
    }
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

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">🏆 Top 3 Rankings</h2>
        <p className="text-muted-foreground text-sm">
          This week&apos;s most popular fan content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {topThree.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <Card
              className={cn(
                'overflow-hidden cursor-pointer h-full',
                index === 0 && 'md:row-span-1 md:col-span-1'
              )}
            >
            <div className={`bg-gradient-to-b ${getMedalColor(item.rank)} p-6 text-white relative`}>
              {/* Rank Medal */}
              <div className="absolute top-4 right-4">
                <div
                  className={cn(
                    'w-16 h-16 rounded-full flex items-center justify-center shadow-lg',
                    getMedalBg(item.rank)
                  )}
                >
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Rank Number */}
              <div className="text-6xl font-bold opacity-30 mb-4">{item.rank}</div>

              {/* Image */}
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={item.thumbnailUrl}
                  alt={item.contentTitle}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content Info */}
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {item.artistName}
                </Badge>
                <h3 className="font-bold text-lg line-clamp-2 text-white">
                  {item.contentTitle}
                </h3>

                {/* Uploader Info */}
                <div className="flex items-center gap-2 mt-3">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={item.uploaderAvatar} />
                    <AvatarFallback>{item.uploaderName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-white/90">{item.uploaderName}</span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="p-4 bg-card">
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="flex items-center gap-1 text-sm">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="font-semibold">{formatNumber(item.likes)}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold">{formatNumber(item.views)}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {item.rankChange > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : item.rankChange < 0 ? (
                    <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />
                  ) : null}
                  <span className={cn('font-semibold', {
                    'text-green-600': item.rankChange > 0,
                    'text-red-600': item.rankChange < 0,
                  })}>
                    {item.rankChange > 0 ? '+' : ''}{item.rankChange || '−'}
                  </span>
                </div>
              </div>

              {/* AI Score Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">AI Score</span>
                  <span className="font-bold text-primary">{item.aiScore}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.aiScore}%` }}
                  />
                </div>
              </div>
            </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RankingHero;
