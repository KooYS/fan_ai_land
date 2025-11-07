'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import FeedHeader from './feed-header';
import FeedContent, { MediaItem } from './feed-content';
import FeedActions from './feed-actions';
import FeedStats from './feed-stats';
import CommentSection from '../comment/comment-section';
import { Comment } from '../comment/comment-item';
import { cn } from '@/lib/utils';

export interface FeedCardPost {
  id: string;
  username: string;
  avatar: string;
  verified?: boolean;
  content: string;
  hashtags?: string[];
  media?: MediaItem[];
  likes: number;
  comments: number;
  views?: number;
  timestamp: string;
  likedByUser?: boolean;
  bookmarkedByUser?: boolean;
}

interface FeedCardProps {
  post: FeedCardPost;
  highlighted?: boolean;
  comments?: Comment[];
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onHashtagClick?: (tag: string) => void;
  onReport?: (postId: string) => void;
  onShareMenu?: (postId: string) => void;
  onCopyLink?: (postId: string) => void;
  onAddComment?: (postId: string, text: string, parentCommentId?: string) => void;
  onLikeComment?: (commentId: string) => void;
  onReportComment?: (commentId: string) => void;
  userAvatar?: string;
  userName?: string;
}

const FeedCard = ({
  post,
  highlighted = false,
  comments = [],
  onLike,
  onComment,
  onShare,
  onBookmark,
  onHashtagClick,
  onReport,
  onShareMenu,
  onCopyLink,
  onAddComment,
  onLikeComment,
  onReportComment,
  userAvatar,
  userName,
}: FeedCardProps) => {
  const [showComments, setShowComments] = useState(false);

  const handleComment = (postId: string) => {
    setShowComments(true);
    onComment?.(postId);
  };

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-md',
        highlighted && 'ring-2 ring-primary shadow-lg'
      )}
    >
      <div className="p-4 space-y-3">
        {/* Header */}
        <FeedHeader
          username={post.username}
          avatar={post.avatar}
          timestamp={post.timestamp}
          verified={post.verified}
          onReport={() => onReport?.(post.id)}
          onShare={() => onShareMenu?.(post.id)}
          onCopyLink={() => onCopyLink?.(post.id)}
        />

        <Separator className="my-2" />

        {/* Content */}
        <FeedContent
          text={post.content}
          hashtags={post.hashtags}
          media={post.media}
          onHashtagClick={onHashtagClick}
        />

        {/* Stats */}
        <FeedStats
          likes={post.likes}
          comments={post.comments}
          views={post.views}
        />

        <Separator className="my-0" />

        {/* Actions */}
        <FeedActions
          postId={post.id}
          liked={post.likedByUser}
          bookmarked={post.bookmarkedByUser}
          onLike={onLike}
          onComment={handleComment}
          onShare={onShare}
          onBookmark={onBookmark}
        />

        {/* Comment Section - Hidden by default */}
        {showComments && (
          <CommentSection
            postId={post.id}
            comments={comments}
            userAvatar={userAvatar}
            userName={userName}
            onAddComment={onAddComment}
            onLikeComment={onLikeComment}
            onReportComment={onReportComment}
          />
        )}
      </div>
    </Card>
  );
};

export default FeedCard;
