'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommentItem, { Comment } from './comment-item';
import CommentInput from './comment-input';
import { ChevronDown } from 'lucide-react';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  userAvatar?: string;
  userName?: string;
  maxPreview?: number;
  onAddComment?: (postId: string, text: string) => void;
  onLikeComment?: (commentId: string) => void;
  onReportComment?: (commentId: string) => void;
}

type SortOption = 'latest' | 'popular';

const CommentSection = ({
  postId,
  comments = [],
  userAvatar,
  userName = 'You',
  maxPreview = 3,
  onAddComment,
  onLikeComment,
  onReportComment,
}: CommentSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [replyingTo, setReplyingTo] = useState<{ username: string; commentId: string } | null>(null);

  // Sort comments
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'popular') {
      return (b.likes || 0) - (a.likes || 0);
    }
    // latest - reverse chronological
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const displayComments = showAll ? sortedComments : sortedComments.slice(0, maxPreview);

  const handleAddComment = (text: string) => {
    onAddComment?.(postId, text);
    setReplyingTo(null);
  };

  const handleReply = (username: string, commentId: string) => {
    setReplyingTo({ username, commentId });
  };

  if (comments.length === 0) {
    return (
      <div className="space-y-3">
        <Separator className="my-0" />
        <CommentInput
          userAvatar={userAvatar}
          userName={userName}
          onSubmit={handleAddComment}
          autoFocus={false}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Separator className="my-0" />

      {/* Comment Stats and Sort */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          댓글 {comments.length}개
        </span>

        {comments.length > 1 && (
          <Tabs
            value={sortBy}
            onValueChange={(v) => setSortBy(v as SortOption)}
            className="w-auto"
          >
            <TabsList className="h-7 bg-muted/50">
              <TabsTrigger value="latest" className="text-xs">
                최신순
              </TabsTrigger>
              <TabsTrigger value="popular" className="text-xs">
                인기순
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {displayComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            nested={false}
            onReply={handleReply}
            onLike={onLikeComment}
            onReport={onReportComment}
          />
        ))}
      </div>

      {/* View All Button */}
      {!showAll && comments.length > maxPreview && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs gap-1"
          onClick={() => setShowAll(true)}
        >
          모든 댓글 보기
          <span className="text-muted-foreground">
            (+{comments.length - maxPreview})
          </span>
          <ChevronDown className="w-3 h-3 ml-auto" />
        </Button>
      )}

      {showAll && comments.length > maxPreview && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs"
          onClick={() => setShowAll(false)}
        >
          댓글 접기
        </Button>
      )}

      {/* Comment Input */}
      {replyingTo ? (
        <div className="pt-2 border-t">
          <CommentInput
            userAvatar={userAvatar}
            userName={userName}
            placeholder={`${replyingTo.username}님에게 답글...`}
            replyingTo={replyingTo.username}
            onSubmit={handleAddComment}
            onCancel={() => setReplyingTo(null)}
            autoFocus={true}
          />
        </div>
      ) : (
        <CommentInput
          userAvatar={userAvatar}
          userName={userName}
          onSubmit={handleAddComment}
          autoFocus={false}
        />
      )}
    </div>
  );
};

export default CommentSection;
