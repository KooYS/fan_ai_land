'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MessageCircle, Share2, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LikeButton } from '@/components/animations/like-button';
import { InteractiveButton } from '@/components/animations/interactive-button';

interface FeedActionsProps {
  postId: string;
  liked?: boolean;
  bookmarked?: boolean;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
}

const FeedActions = ({
  postId,
  liked: initialLiked = false,
  bookmarked: initialBookmarked = false,
  onLike,
  onComment,
  onShare,
  onBookmark,
}: FeedActionsProps) => {
  const [liked, setLiked] = useState(initialLiked);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const handleLike = (newLiked: boolean) => {
    setLiked(newLiked);
    onLike?.(postId);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark?.(postId);
  };

  const handleComment = () => {
    onComment?.(postId);
  };

  const handleShare = () => {
    onShare?.(postId);
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 text-muted-foreground py-2">
        {/* Like Button with Animation */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <LikeButton
                liked={liked}
                count={0}
                onLike={handleLike}
                className="gap-2 text-sm h-8"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>{liked ? '좋아요 취소' : '좋아요'}</TooltipContent>
        </Tooltip>

        {/* Comment Button with Interactive Animation */}
        <Tooltip>
          <TooltipTrigger asChild>
            <InteractiveButton
              onClick={handleComment}
              className="flex items-center gap-2 text-sm h-8 px-3 py-2 rounded-md hover:bg-accent"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">댓글</span>
            </InteractiveButton>
          </TooltipTrigger>
          <TooltipContent>댓글 작성</TooltipContent>
        </Tooltip>

        {/* Share Button with Interactive Animation */}
        <Tooltip>
          <TooltipTrigger asChild>
            <InteractiveButton
              onClick={handleShare}
              className="flex items-center gap-2 text-sm h-8 px-3 py-2 rounded-md hover:bg-accent"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">공유</span>
            </InteractiveButton>
          </TooltipTrigger>
          <TooltipContent>공유하기</TooltipContent>
        </Tooltip>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bookmark Button with Interactive Animation */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'gap-2 text-sm h-8',
                  bookmarked && 'text-amber-500 hover:text-amber-600'
                )}
                onClick={handleBookmark}
              >
                <Bookmark
                  className={cn(
                    'w-4 h-4 transition-all',
                    bookmarked && 'fill-current'
                  )}
                />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            {bookmarked ? '저장 취소' : '저장하기'}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default FeedActions;
