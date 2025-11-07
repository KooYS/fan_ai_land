'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import FeedCard, { FeedCardPost } from './_components/feed-card/feed-card';
import { Comment } from './_components/comment/comment-item';
import PostComposerSheet, { PostData } from './_components/post-composer/post-composer-sheet';
import PostComposerFAB from './_components/post-composer/post-composer-fab';
import TrendingSection from './_components/trending/trending-section';
import { StaggerList, StaggerItem } from '@/components/animations/stagger-list';

// Mock data for posts
const initialPosts: FeedCardPost[] = [
  {
    id: '1',
    username: 'NewJeans_Fansite',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NewJeans_Fansite',
    verified: true,
    content: 'Hanni fancam from Super Shy live stage! The vocals were absolutely stunning 🎤✨',
    hashtags: ['NewJeans', 'Hanni', 'SuperShy'],
    media: [
      {
        id: '1-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=800&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=200&auto=format&fit=crop',
        alt: 'Hanni live stage',
      },
    ],
    likes: 15420,
    comments: 8,
    views: 45230,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
  },
  {
    id: '2',
    username: 'IVE_Moments',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=IVE_Moments',
    verified: true,
    content: 'Wonyoung "I AM" dance practice behind the scenes 💃 The choreography details are insane!',
    hashtags: ['IVE', 'Wonyoung', 'I_AM'],
    media: [
      {
        id: '2-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        alt: 'Wonyoung dance practice',
      },
    ],
    likes: 12340,
    comments: 5,
    views: 34120,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
  },
  {
    id: '3',
    username: 'aespa_Archive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aespa_Archive',
    verified: true,
    content: 'Karina Drama MV filming location photos! The aesthetic is perfect 🎬🌟',
    hashtags: ['aespa', 'Karina', 'Drama'],
    media: [
      {
        id: '3-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=200&auto=format&fit=crop',
        alt: 'Karina MV location',
      },
    ],
    likes: 18920,
    comments: 12,
    views: 52890,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
  },
  {
    id: '4',
    username: 'BLACKPINK_Daily',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BLACKPINK_Daily',
    verified: true,
    content: 'Jennie at Paris Fashion Week! She owns every red carpet 💅✨',
    hashtags: ['BLACKPINK', 'Jennie', 'FashionWeek'],
    media: [
      {
        id: '4-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200&auto=format&fit=crop',
        alt: 'Jennie fashion week',
      },
    ],
    likes: 24560,
    comments: 15,
    views: 67420,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
  },
];

export default function SNSFeed() {
  const [posts, setPosts] = useState<FeedCardPost[]>(initialPosts);
  const [composerOpen, setComposerOpen] = useState(false);
  const [postComments, setPostComments] = useState<Record<string, Comment[]>>({});

  // Initialize comments from posts
  const getPostComments = (postId: string): Comment[] => {
    if (postComments[postId]) {
      return postComments[postId];
    }
    return [];
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
              likedByUser: !post.likedByUser,
            }
          : post
      )
    );
  };

  const handleComment = (postId: string) => {
    // Scroll to comment section and trigger focus
    const element = document.getElementById(`comment-section-${postId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Dispatch custom event to show comment input
      const event = new CustomEvent('openCommentInput', { detail: { postId } });
      element.dispatchEvent(event);
    }
  };

  const handleBookmark = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              bookmarkedByUser: !post.bookmarkedByUser,
            }
          : post
      )
    );
  };

  const handleAddComment = (postId: string, text: string, parentCommentId?: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      username: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current_user',
      content: text,
      timestamp: new Date().toISOString(),
      likes: 0,
      likedByUser: false,
      replies: [],
    };

    if (parentCommentId) {
      // Add as a reply to parent comment
      setPostComments((prev) => {
        const updated = { ...prev };
        const comments = updated[postId] || [];

        // Find parent comment and add reply
        const addReplyToComment = (comments: Comment[]): Comment[] => {
          return comments.map((comment) => {
            if (comment.id === parentCommentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newComment],
              };
            }
            if (comment.replies && comment.replies.length > 0) {
              return {
                ...comment,
                replies: addReplyToComment(comment.replies),
              };
            }
            return comment;
          });
        };

        updated[postId] = addReplyToComment(comments);
        return updated;
      });
    } else {
      // Add as a top-level comment
      setPostComments({
        ...postComments,
        [postId]: [...(postComments[postId] || []), newComment],
      });
    }
  };

  const handleCreatePost = (data: PostData) => {
    const newPost: FeedCardPost = {
      id: `post_${Date.now()}`,
      username: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current_user',
      verified: false,
      content: data.text,
      hashtags: data.hashtags,
      media: data.images.map((img, idx) => ({
        id: `${Date.now()}-${idx}`,
        type: 'image' as const,
        url: img.preview,
        thumbnail: img.preview,
        alt: `User uploaded image ${idx + 1}`,
      })),
      likes: 0,
      comments: 0,
      views: 0,
      timestamp: new Date().toISOString(),
      likedByUser: false,
      bookmarkedByUser: false,
    };

    setPosts([newPost, ...posts]);
    setComposerOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Feed */}
          <div className="flex-1 min-w-0 max-w-2xl mx-auto lg:mx-0">
            <ScrollArea className="h-[calc(100vh-40px)] pr-4">
              <StaggerList staggerDelay={0.08} delayChildren={0.1}>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <StaggerItem key={post.id}>
                      <div id={`post-${post.id}`} className="space-y-0">
                        <FeedCard
                          post={post}
                          comments={getPostComments(post.id)}
                          onLike={handleLike}
                          onComment={handleComment}
                          onBookmark={handleBookmark}
                          onHashtagClick={(tag) => console.log('Tag clicked:', tag)}
                          onReport={(postId) => console.log('Report:', postId)}
                          onShareMenu={(postId) => console.log('Share menu:', postId)}
                          onCopyLink={(postId) => console.log('Copy link:', postId)}
                          onAddComment={handleAddComment}
                          onLikeComment={(commentId) =>
                            console.log('Like comment:', commentId)
                          }
                          onReportComment={(commentId) =>
                            console.log('Report comment:', commentId)
                          }
                          userName="You"
                          userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=current_user"
                        />
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerList>
            </ScrollArea>
          </div>

          {/* Trending Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-96 sticky top-6 h-fit">
            <TrendingSection />
          </aside>
        </div>
      </div>

      {/* Post Composer */}
      <PostComposerSheet
        open={composerOpen}
        onOpenChange={setComposerOpen}
        onSubmit={handleCreatePost}
        userName="You"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=current_user"
      />

      {/* FAB Button */}
      <PostComposerFAB
        open={composerOpen}
        onOpenChange={setComposerOpen}
      />
    </div>
  );
}
