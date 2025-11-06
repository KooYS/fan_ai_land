'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, Flag, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/utils';

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
    <div className={cn('space-y-2', nested && 'ml-8')}>
      <div className="flex gap-2">
        {/* Avatar */}
        <Avatar className="w-6 h-6 flex-shrink-0">
          <AvatarImage src={comment.avatar} alt={comment.username} />
          <AvatarFallback>
            {comment.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-muted rounded-lg px-3 py-2">
            <p className="font-medium text-xs text-foreground">
              @{comment.username}
            </p>
            <p className="text-sm text-foreground mt-0.5 break-words">
              {comment.content}
            </p>
          </div>

          {/* Comment Actions */}
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span>{formatTime(comment.timestamp)}</span>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'h-5 px-2 text-xs gap-1',
                liked && 'text-red-500'
              )}
              onClick={handleLike}
            >
              <Heart
                className={cn(
                  'w-3 h-3',
                  liked && 'fill-current'
                )}
              />
              <span>{comment.likes > 0 ? comment.likes : ''}</span>
            </Button>

            {onReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 px-2 text-xs gap-1"
                onClick={() => onReply(comment.username, comment.id)}
              >
                <MessageCircle className="w-3 h-3" />
                답글
              </Button>
            )}

            {onReport && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => onReport(comment.id)}
              >
                <Flag className="w-3 h-3" />
              </Button>
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
