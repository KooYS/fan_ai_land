'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [likeAnimating, setLikeAnimating] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeAnimating(true);
    setTimeout(() => setLikeAnimating(false), 300);
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
        {/* Like Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'gap-2 text-sm h-8',
                liked && 'text-red-500 hover:text-red-600'
              )}
              onClick={handleLike}
            >
              <div className="relative">
                <Heart
                  className={cn(
                    'w-4 h-4 transition-all',
                    liked && 'fill-current',
                    likeAnimating && 'scale-125'
                  )}
                />
              </div>
              <span className="hidden sm:inline">좋아요</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {liked ? '좋아요 취소' : '좋아요'}
          </TooltipContent>
        </Tooltip>

        {/* Comment Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-sm h-8"
              onClick={handleComment}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">댓글</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>댓글 작성</TooltipContent>
        </Tooltip>

        {/* Share Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-sm h-8"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">공유</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>공유하기</TooltipContent>
        </Tooltip>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bookmark Button */}
        <Tooltip>
          <TooltipTrigger asChild>
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
