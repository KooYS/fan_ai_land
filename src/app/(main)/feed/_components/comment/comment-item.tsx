'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Flag, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { LikeButton } from '@/components/animations/like-button';
import { InteractiveButton } from '@/components/animations/interactive-button';

export interface Comment {
  id: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  likedByUser?: boolean;
  replies?: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  nested?: boolean;
  onReply?: (username: string, commentId: string) => void;
  onLike?: (commentId: string) => void;
  onReport?: (commentId: string) => void;
}

const formatTime = (date: string) => {
  try {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: ko,
    });
  } catch {
    return date;
  }
};

const CommentItem = ({
  comment,
  nested = false,
  onReply,
  onLike,
  onReport,
}: CommentItemProps) => {
  const [liked, setLiked] = useState(comment.likedByUser || false);
  const [showReplies, setShowReplies] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike?.(comment.id);
  };

  return (
    <div className={cn('space-y-2', nested && 'ml-4 opacity-90')}>
      <div className="flex gap-2">
        {/* Avatar */}
        <Avatar className={cn('flex-shrink-0', nested ? 'w-5 h-5' : 'w-6 h-6')}>
          <AvatarImage src={comment.avatar} alt={comment.username} />
          <AvatarFallback>
            {comment.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className={cn('bg-muted rounded-lg px-3 py-2', nested && 'py-1.5 px-2.5')}>
            <p className={cn('font-medium text-foreground', nested ? 'text-xs' : 'text-xs')}>
              @{comment.username}
            </p>
            <p className={cn('text-foreground mt-0.5 break-words', nested ? 'text-xs' : 'text-sm')}>
              {comment.content}
            </p>
          </div>

          {/* Comment Actions */}
          <div className={cn('flex items-center gap-2 mt-1 text-muted-foreground', nested ? 'text-xs' : 'text-xs')}>
            <span className={nested ? 'text-xs' : 'text-xs'}>{formatTime(comment.timestamp)}</span>

            <LikeButton
              liked={liked}
              count={comment.likes}
              onLike={handleLike}
              className={cn(
                'h-5 px-2 text-xs gap-1',
                nested && 'h-4 px-1'
              )}
            />

            {onReply && (
              <InteractiveButton
                onClick={() => onReply(comment.username, comment.id)}
                className={cn('h-5 px-2 text-xs gap-1 rounded-md hover:bg-accent', nested && 'h-4 px-1')}
              >
                <MessageCircle className="w-3 h-3" />
                <span>답글</span>
              </InteractiveButton>
            )}

            {onReport && (
              <InteractiveButton
                onClick={() => onReport(comment.id)}
                className={cn('h-5 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md', nested && 'h-4 px-1')}
              >
                <Flag className="w-3 h-3" />
              </InteractiveButton>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-muted-foreground mb-2"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? '답글 숨기기' : `답글 ${comment.replies.length}개`}
          </Button>

          {showReplies && (
            <div className="space-y-2">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  nested={true}
                  onReply={onReply}
                  onLike={onLike}
                  onReport={onReport}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
