'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Heart, MessageCircle, Send, Share2 } from 'lucide-react';
import { useState } from 'react';

// Types for our data model
type Comment = {
  id: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
};

type Post = {
  id: string;
  username: string;
  avatar: string;
  content: string;
  media: string;
  likes: number;
  timestamp: string;
  comments: Comment[];
};

// KPOP Fan Content Sample Data
const initialPosts: Post[] = [
  {
    id: '1',
    username: 'NewJeans_Fansite',
    avatar: 'https://github.com/shadcn.png',
    content: 'Hanni fancam from Super Shy live stage! The vocals were absolutely stunning 🎤✨ #NewJeans #Hanni',
    media: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 15420,
    timestamp: '2 hours ago',
    comments: [
      {
        id: 'c1',
        username: 'KPOP_Lover_123',
        avatar: 'https://github.com/shadcn.png',
        content: 'Her stage presence is unreal! 🔥',
        timestamp: '1 hour ago',
      },
      {
        id: 'c2',
        username: 'Bunnies_Official',
        avatar: 'https://github.com/shadcn.png',
        content: 'Thank you for sharing! Saving this immediately 💙',
        timestamp: '45 minutes ago',
      },
    ],
  },
  {
    id: '2',
    username: 'IVE_Moments',
    avatar: 'https://github.com/shadcn.png',
    content: 'Wonyoung "I AM" dance practice behind the scenes 💃 The choreography details are insane! #IVE #Wonyoung',
    media: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 12340,
    timestamp: '5 hours ago',
    comments: [
      {
        id: 'c3',
        username: 'DIVE_Forever',
        avatar: 'https://github.com/shadcn.png',
        content: 'She makes it look so effortless! Queen behavior 👑',
        timestamp: '3 hours ago',
      },
    ],
  },
  {
    id: '3',
    username: 'aespa_Archive',
    avatar: 'https://github.com/shadcn.png',
    content: 'Karina Drama MV filming location photos! The aesthetic is perfect 🎬🌟 #aespa #Karina #Drama',
    media: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 18920,
    timestamp: '1 day ago',
    comments: [
      {
        id: 'c4',
        username: 'MY_aespa',
        avatar: 'https://github.com/shadcn.png',
        content: 'The visuals are out of this world! 😍',
        timestamp: '20 hours ago',
      },
      {
        id: 'c5',
        username: 'KPOP_Editor',
        avatar: 'https://github.com/shadcn.png',
        content: 'I want to visit this location! Where is it?',
        timestamp: '18 hours ago',
      },
      {
        id: 'c6',
        username: 'Photographer_KR',
        avatar: 'https://github.com/shadcn.png',
        content: 'What camera settings did you use? The colors are amazing!',
        timestamp: '12 hours ago',
      },
    ],
  },
  {
    id: '4',
    username: 'BLACKPINK_Daily',
    avatar: 'https://github.com/shadcn.png',
    content: 'Jennie at Paris Fashion Week! She owns every red carpet 💅✨ #BLACKPINK #Jennie #FashionWeek',
    media: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 24560,
    timestamp: '3 days ago',
    comments: [],
  },
  {
    id: '5',
    username: 'LESSERAFIM_Hub',
    avatar: 'https://github.com/shadcn.png',
    content: 'Chaewon Perfect Night encore stage compilation! Her live vocals never disappoint 🎤💕 #LESSERAFIM #Chaewon',
    media: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 16780,
    timestamp: '4 days ago',
    comments: [],
  },
  {
    id: '6',
    username: 'TWICE_Gallery',
    avatar: 'https://github.com/shadcn.png',
    content: 'Nayeon Pop! dance practice preview! The energy is incredible 💃🎵 #TWICE #Nayeon',
    media: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 14230,
    timestamp: '5 days ago',
    comments: [
      {
        id: 'c7',
        username: 'ONCE_Forever',
        avatar: 'https://github.com/shadcn.png',
        content: 'Nayeon always brings the best vibes! 🌟',
        timestamp: '4 days ago',
      },
    ],
  },
];

// Image Gallery Sidebar Component
function ImageGallerySidebar({
  posts,
  onImageClick
}: {
  posts: Post[];
  onImageClick: (postId: string) => void;
}) {
  return (
    <div className="w-full h-full p-4">
      <h2 className="text-xl font-bold mb-4">팬 콘텐츠 갤러리</h2>
      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="grid grid-cols-2 gap-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative group overflow-hidden rounded-md cursor-pointer"
              onClick={() => onImageClick(post.id)}
            >
              <img
                src={post.media || '/placeholder.svg'}
                alt={`Post by ${post.username}`}
                className="w-full h-auto object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                <div className="text-white text-xs">
                  <p className="font-medium">@{post.username}</p>
                  <p className="text-white/80">{post.timestamp}</p>
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white rounded-full p-1.5 shadow-lg">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default function SNSFeed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [highlightedPost, setHighlightedPost] = useState<string | null>(null);

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: likedPosts[postId] ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
    setLikedPosts({
      ...likedPosts,
      [postId]: !likedPosts[postId],
    });
  };

  const handleCommentChange = (postId: string, value: string) => {
    setNewComments({
      ...newComments,
      [postId]: value,
    });
  };

  const handleAddComment = (postId: string) => {
    if (!newComments[postId]?.trim()) return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      username: 'currentuser',
      avatar: '/placeholder.svg?height=32&width=32',
      content: newComments[postId],
      timestamp: 'Just now',
    };

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );

    setNewComments({
      ...newComments,
      [postId]: '',
    });
  };

  const handleImageClick = (postId: string) => {
    setHighlightedPost(postId);
    const element = document.getElementById(`post-${postId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => setHighlightedPost(null), 2000);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Feed - Full width on mobile, reduced on desktop */}
        <div className="w-full lg:w-[calc(100%-500px)]">
          <ScrollArea className="h-[600px] lg:h-[calc(100vh-40px)] pr-4">
            <div className="space-y-4 max-w-md mx-auto px-2">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  id={`post-${post.id}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    highlightedPost === post.id ? 'ring-2 ring-primary shadow-xl scale-105' : ''
                  }`}
                >
                  <CardHeader className="p-4 pb-0">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.avatar} alt={post.username} />
                        <AvatarFallback>
                          {post.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">@{post.username}</div>
                        <div className="text-xs text-muted-foreground">
                          {post.timestamp}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{post.content}</p>
                  </CardHeader>
                  <CardContent className="p-0 mt-4">
                    <img
                      src={post.media || '/placeholder.svg'}
                      alt="Post content"
                      className="w-full h-auto object-cover"
                    />
                  </CardContent>
                  <CardFooter className="flex flex-col p-4 pt-2">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-1 px-2"
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              likedPosts[post.id]
                                ? 'fill-red-500 text-red-500'
                                : ''
                            }`}
                          />
                          <span>
                            {post.likes + (likedPosts[post.id] ? 1 : 0)}
                          </span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-1 px-2"
                        >
                          <MessageCircle className="h-5 w-5" />
                          <span>{post.comments.length}</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="px-2">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>

                    {post.comments.length > 0 && (
                      <div className="w-full mt-3">
                        <Separator className="my-2" />
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {post.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="flex items-start space-x-2"
                            >
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={comment.avatar}
                                  alt={comment.username}
                                />
                                <AvatarFallback>
                                  {comment.username.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-baseline">
                                  <span className="font-medium text-xs">
                                    @{comment.username}
                                  </span>
                                  <span className="ml-2 text-xs text-muted-foreground">
                                    {comment.timestamp}
                                  </span>
                                </div>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 w-full mt-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="Your avatar"
                        />
                        <AvatarFallback>YO</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex items-center space-x-2">
                        <Input
                          className="h-8 text-sm"
                          placeholder="Add a comment..."
                          value={newComments[post.id] || ''}
                          onChange={(e) =>
                            handleCommentChange(post.id, e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAddComment(post.id);
                            }
                          }}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => handleAddComment(post.id)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Image Gallery Sidebar - Hidden on mobile, 500px on desktop */}
        <div className="hidden lg:block w-[500px] border-l">
          <ImageGallerySidebar posts={posts} onImageClick={handleImageClick} />
        </div>
      </div>
    </div>
  );
}
