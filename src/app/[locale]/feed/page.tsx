'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import FeedCard, { FeedCardPost } from './_components/feed-card/feed-card';
import { Comment } from './_components/comment/comment-item';
import PostComposerSheet, {
  PostData,
} from './_components/post-composer/post-composer-sheet';
import PostComposerFAB from './_components/post-composer/post-composer-fab';
import TrendingSection from './_components/trending/trending-section';
import { StaggerList, StaggerItem } from '@/components/animations/stagger-list';

// Mock data for posts
const initialPosts: FeedCardPost[] = [
  {
    id: '1',
    username: 'AI홈마공식',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AI_Homma_Official',
    verified: true,
    content: '방금 만든 AI 초상화예요! ✨ 디테일과 조명이 완벽하게 나왔어요 🎨',
    hashtags: ['AI아트', 'K팝AI', '디지털아트'],
    media: [
      {
        id: '1-1',
        type: 'image',
        url: '/images/1.jpg',
        thumbnail: '/images/1.jpg',
        alt: 'AI 생성 초상화',
      },
    ],
    likes: 12,
    comments: 0,
    views: 156,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '2',
    username: 'K팝AI스튜디오',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KpopAI_Studio',
    verified: true,
    content:
      '새로운 AI 생성 컨셉 아트! 🌟 다양한 스타일과 분위기를 실험 중이에요',
    hashtags: ['AI생성', '컨셉아트', 'K팝'],
    media: [
      {
        id: '2-1',
        type: 'image',
        url: '/images/2.jpg',
        thumbnail: '/images/2.jpg',
        alt: 'AI 컨셉 아트',
      },
    ],
    likes: 8,
    comments: 0,
    views: 89,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '3',
    username: 'AI아티스트프로',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AI_Artist_Pro',
    verified: true,
    content:
      'AI 사진 시리즈 - 변화 전후 비교! 💫 AI가 본질을 정말 잘 담아냈어요',
    hashtags: ['AI사진', '비포애프터', '디지털변환'],
    media: [
      {
        id: '3-1',
        type: 'image',
        url: '/images/3-1.jpg',
        thumbnail: '/images/3-1.jpg',
        alt: 'AI 변환 - 전',
      },
      {
        id: '3-2',
        type: 'image',
        url: '/images/3.jpg',
        thumbnail: '/images/3.jpg',
        alt: 'AI 변환 - 후',
      },
    ],
    likes: 24,
    comments: 0,
    views: 287,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '4',
    username: '디지털드림AI',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Digital_Dreams_AI',
    verified: true,
    content: '듀얼 AI 초상화 세트! ✨ 각각의 독특한 분위기가 너무 좋아요',
    hashtags: ['AI초상화', '듀얼컨셉', '인공지능'],
    media: [
      {
        id: '4-1',
        type: 'image',
        url: '/images/4-1.jpg',
        thumbnail: '/images/4-1.jpg',
        alt: 'AI 초상화 1',
      },
      {
        id: '4-2',
        type: 'image',
        url: '/images/4.jpg',
        thumbnail: '/images/4.jpg',
        alt: 'AI 초상화 2',
      },
    ],
    likes: 25,
    comments: 0,
    views: 298,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '5',
    username: 'AI비전랩',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AI_Vision_Lab',
    verified: true,
    content: '판타지와 현실의 만남 - AI 생성 듀오 🎭 대비가 정말 매력적이에요!',
    hashtags: ['AI판타지', '디지털마법', 'AI창의성'],
    media: [
      {
        id: '5-1',
        type: 'image',
        url: '/images/5-1.jpg',
        thumbnail: '/images/5-1.jpg',
        alt: 'AI 판타지 1',
      },
      {
        id: '5-2',
        type: 'image',
        url: '/images/5.jpg',
        thumbnail: '/images/5.jpg',
        alt: 'AI 판타지 2',
      },
    ],
    likes: 21,
    comments: 0,
    views: 245,
    timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '6',
    username: '뉴럴아츠',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neural_Arts',
    verified: true,
    content: 'AI 창의력의 정점! 🚀 같은 프롬프트에서 나온 두 가지 놀라운 변형',
    hashtags: ['뉴럴아트', 'AI변형', '머신러닝'],
    media: [
      {
        id: '6-1',
        type: 'image',
        url: '/images/6-1.png',
        thumbnail: '/images/6-1.png',
        alt: '뉴럴 아트 1',
      },
      {
        id: '6-2',
        type: 'image',
        url: '/images/6.jpg',
        thumbnail: '/images/6.jpg',
        alt: '뉴럴 아트 2',
      },
    ],
    likes: 20,
    comments: 0,
    views: 189,
    timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '7',
    username: 'AI미학연구소',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AI_Aesthetic',
    verified: true,
    content: 'AI가 만든 미학적 듀오 💎 두 작품 간의 조화가 놀라워요',
    hashtags: ['AI미학', '조화아트', '생성AI'],
    media: [
      {
        id: '7-1',
        type: 'image',
        url: '/images/7-1.jpg',
        thumbnail: '/images/7-1.jpg',
        alt: 'AI 미학 1',
      },
      {
        id: '7-2',
        type: 'image',
        url: '/images/7.jpg',
        thumbnail: '/images/7.jpg',
        alt: 'AI 미학 2',
      },
    ],
    likes: 18,
    comments: 0,
    views: 167,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '8',
    username: 'AI갤러리공식',
    avatar:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=AI_Gallery_Official',
    verified: true,
    content: 'AI 아트 컬렉션 - 트리플 걸작! 🎨 각각이 다른 이야기를 들려줘요',
    hashtags: ['AI컬렉션', '트리플작품', 'AI갤러리'],
    media: [
      {
        id: '8-1',
        type: 'image',
        url: '/images/8.jpg',
        thumbnail: '/images/8.jpg',
        alt: 'AI 갤러리 1',
      },
      {
        id: '8-2',
        type: 'image',
        url: '/images/8-2.jpg',
        thumbnail: '/images/8-2.jpg',
        alt: 'AI 갤러리 2',
      },
      {
        id: '8-3',
        type: 'image',
        url: '/images/8-3.jpg',
        thumbnail: '/images/8-3.jpg',
        alt: 'AI 갤러리 3',
      },
    ],
    likes: 23,
    comments: 0,
    views: 276,
    timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '9',
    username: '픽셀AI크리에이터',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pixel_AI_Creator',
    verified: true,
    content: '깔끔하고 미니멀한 AI 디자인 🎯 때로는 단순함이 더 아름다워요!',
    hashtags: ['미니멀AI', '심플디자인', 'AI미니멀리즘'],
    media: [
      {
        id: '9-1',
        type: 'image',
        url: '/images/9.png',
        thumbnail: '/images/9.png',
        alt: '미니멀 AI 디자인',
      },
    ],
    likes: 14,
    comments: 0,
    views: 123,
    timestamp: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '10',
    username: '미래AI아츠',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Future_AI_Arts',
    verified: true,
    content: '미래지향적 AI 창작물! 🌌 디지털 아트의 미래가 여기 있어요',
    hashtags: ['미래AI', '차세대', 'AI미래'],
    media: [
      {
        id: '10-1',
        type: 'image',
        url: '/images/10.png',
        thumbnail: '/images/10.png',
        alt: '미래지향 AI 아트',
      },
    ],
    likes: 17,
    comments: 0,
    views: 145,
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '11',
    username: 'AI혁신허브',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AI_Innovation_Hub',
    verified: true,
    content: '혁신적인 AI 작품! 💡 AI가 만들 수 있는 것의 경계를 넓혀가요',
    hashtags: ['AI혁신', '최첨단', 'AI혁명'],
    media: [
      {
        id: '11-1',
        type: 'image',
        url: '/images/11.png',
        thumbnail: '/images/11.png',
        alt: '혁신적 AI 작품',
      },
    ],
    likes: 10,
    comments: 0,
    views: 78,
    timestamp: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '12',
    username: 'AI마스터웍스',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AI_Masterworks',
    verified: true,
    content: '오늘의 AI 걸작! 🏆 AI와 예술성이 만났을 때 일어나는 마법',
    hashtags: ['AI걸작', 'AI예술성', '디지털마스터피스'],
    media: [
      {
        id: '12-1',
        type: 'image',
        url: '/images/12.jpg',
        thumbnail: '/images/12.jpg',
        alt: 'AI 걸작',
      },
    ],
    likes: 22,
    comments: 0,
    views: 234,
    timestamp: new Date(Date.now() - 44 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '13',
    username: 'AI크리에이터스페이스',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AI_Creator_Space',
    verified: true,
    content: '대담하고 아름다운 AI 창작물! 🎨 색감과 구도가 정말 멋져요',
    hashtags: ['대담한AI', '화려한AI', 'AI구도'],
    media: [
      {
        id: '13-1',
        type: 'image',
        url: '/images/13.jpg',
        thumbnail: '/images/13.jpg',
        alt: '대담한 AI 창작물',
      },
    ],
    likes: 16,
    comments: 0,
    views: 198,
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '14',
    username: 'AI디자인스튜디오',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AI_Design_Studio',
    verified: true,
    content: 'AI로 만드는 디자인 진화! 📐 컨셉에서 현실까지 몇 초 만에',
    hashtags: ['AI디자인', '디자인진화', '컨셉투리얼리티'],
    media: [
      {
        id: '14-1',
        type: 'image',
        url: '/images/14-1.png',
        thumbnail: '/images/14-1.png',
        alt: 'AI 디자인 1',
      },
      {
        id: '14-2',
        type: 'image',
        url: '/images/14.png',
        thumbnail: '/images/14.png',
        alt: 'AI 디자인 2',
      },
    ],
    likes: 15,
    comments: 0,
    views: 212,
    timestamp: new Date(Date.now() - 52 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '15',
    username: 'AI비저너리',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AI_Visionary',
    verified: true,
    content: '비전을 담은 AI 아트! 👁️ AI의 창의적인 렌즈로 본 세상',
    hashtags: ['AI비전', '창의적렌즈', 'AI시각'],
    media: [
      {
        id: '15-1',
        type: 'image',
        url: '/images/15.png',
        thumbnail: '/images/15.png',
        alt: '비전 AI 아트',
      },
    ],
    likes: 13,
    comments: 0,
    views: 134,
    timestamp: new Date(Date.now() - 56 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
  {
    id: '16',
    username: 'AI크래프트마스터즈',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AI_Craft_Masters',
    verified: true,
    content: 'AI의 정밀한 손길로 만든 작품! ⚡ 두 가지 버전, 하나의 비전',
    hashtags: ['AI크래프트', '정밀AI', '듀얼비전'],
    media: [
      {
        id: '16-1',
        type: 'image',
        url: '/images/16-1.png',
        thumbnail: '/images/16-1.png',
        alt: 'AI 크래프트 1',
      },
      {
        id: '16-2',
        type: 'image',
        url: '/images/16.png',
        thumbnail: '/images/16.png',
        alt: 'AI 크래프트 2',
      },
    ],
    likes: 11,
    comments: 0,
    views: 267,
    timestamp: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString(),
    likedByUser: false,
    bookmarkedByUser: false,
    aiGenerated: true,
  },
];

export default function SNSFeed() {
  const [posts, setPosts] = useState<FeedCardPost[]>(initialPosts);
  const [composerOpen, setComposerOpen] = useState(false);
  const [postComments, setPostComments] = useState<Record<string, Comment[]>>(
    {}
  );

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

  const handleAddComment = (
    postId: string,
    text: string,
    parentCommentId?: string
  ) => {
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
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row  gap-6 justify-center">
          {/* Main Feed - Expanded for image content */}
          <div className="flex-1 min-w-0 max-w-4xl mx-auto lg:mx-0">
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
                          onHashtagClick={(tag) =>
                            console.log('Tag clicked:', tag)
                          }
                          onReport={(postId) => console.log('Report:', postId)}
                          onShareMenu={(postId) =>
                            console.log('Share menu:', postId)
                          }
                          onCopyLink={(postId) =>
                            console.log('Copy link:', postId)
                          }
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

          {/* Trending Sidebar - Right side on desktop only */}
          {/* <aside className="hidden lg:block w-80 sticky top-6 h-fit flex-shrink-0">
            <TrendingSection />
          </aside> */}
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
      <PostComposerFAB open={composerOpen} onOpenChange={setComposerOpen} />
    </div>
  );
}
