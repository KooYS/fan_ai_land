'use client';

import { Heart, MessageCircle, Eye } from 'lucide-react';

interface FeedStatsProps {
  likes: number;
  comments: number;
  views?: number;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const FeedStats = ({ likes, comments, views }: FeedStatsProps) => {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground py-2 border-t border-border/50">
      <div className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
        <Heart className="w-3.5 h-3.5" />
        <span>{formatNumber(likes)}명이 좋아합니다</span>
      </div>

      <div className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
        <MessageCircle className="w-3.5 h-3.5" />
        <span>댓글 {formatNumber(comments)}</span>
      </div>

      {views !== undefined && (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Eye className="w-3.5 h-3.5" />
          <span>조회 {formatNumber(views)}</span>
        </div>
      )}
    </div>
  );
};

export default FeedStats;
