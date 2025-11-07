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
import React from 'react';

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
    content: 'Hanni fancam from Super Shy live stage! 🎤✨ #NewJeans',
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
        content: 'Thank you for sharing! 💙',
        timestamp: '45 minutes ago',
      },
    ],
  },
  {
    id: '2',
    username: 'IVE_Moments',
    avatar: 'https://github.com/shadcn.png',
    content: 'Wonyoung "I AM" dance practice 💃 #IVE',
    media: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 12340,
    timestamp: '5 hours ago',
    comments: [
      {
        id: 'c3',
        username: 'DIVE_Forever',
        avatar: 'https://github.com/shadcn.png',
        content: 'She makes it look so effortless! 👑',
        timestamp: '3 hours ago',
      },
    ],
  },
  {
    id: '3',
    username: 'aespa_Archive',
    avatar: 'https://github.com/shadcn.png',
    content: 'Karina Drama MV filming location 🎬🌟 #aespa',
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
        content: 'I want to visit this location!',
        timestamp: '18 hours ago',
      },
      {
        id: 'c6',
        username: 'Photographer_KR',
        avatar: 'https://github.com/shadcn.png',
        content: 'What camera did you use?',
        timestamp: '12 hours ago',
      },
    ],
  },
];

export default function MainRecentFeeds() {
  const [posts, setPosts] = React.useState<Post[]>(initialPosts);
  const [newComments, setNewComments] = React.useState<Record<string, string>>(
    {}
  );
  const [likedPosts, setLikedPosts] = React.useState<Record<string, boolean>>(
    {}
  );

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

  return (
    <div className="w-full mx-auto my-3">
      <ScrollArea className="h-[600px] pr-4 ">
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
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
                          likedPosts[post.id] ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                      <span>{post.likes + (likedPosts[post.id] ? 1 : 0)}</span>
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
  );
}
