'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sparkles, Wand2, Eye, Heart } from 'lucide-react';
import Image from 'next/image';

interface AIHommaContent {
  id: string;
  aiName: string;
  artistTag: string;
  thumbnail: string;
  prompt: string;
  likes: number;
  views: number;
  generatedAt: string;
}

const aiHommaContents: AIHommaContent[] = [
  {
    id: '1',
    aiName: 'AI_Homma_NJ',
    artistTag: 'NewJeans',
    thumbnail: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=400&auto=format&fit=crop',
    prompt: 'Hanni in a dreamy pastel aesthetic',
    likes: 8920,
    views: 45230,
    generatedAt: '5분 전',
  },
  {
    id: '2',
    aiName: 'AI_Homma_IVE',
    artistTag: 'IVE',
    thumbnail: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=400&auto=format&fit=crop',
    prompt: 'Wonyoung ethereal goddess concept',
    likes: 12450,
    views: 62100,
    generatedAt: '12분 전',
  },
  {
    id: '3',
    aiName: 'AI_Homma_aespa',
    artistTag: 'aespa',
    thumbnail: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=400&auto=format&fit=crop',
    prompt: 'Karina futuristic cyberpunk style',
    likes: 15230,
    views: 78450,
    generatedAt: '18분 전',
  },
  {
    id: '4',
    aiName: 'AI_Homma_BP',
    artistTag: 'BLACKPINK',
    thumbnail: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=400&auto=format&fit=crop',
    prompt: 'Jennie elegant fashion editorial',
    likes: 18670,
    views: 91200,
    generatedAt: '25분 전',
  },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export default function AIHommaSection() {
  return (
    <div className="rounded-lg border-2 border-purple-500/30 border-dashed bg-gradient-to-br from-purple-500/5 to-transparent backdrop-blur-md p-6 w-full gap-4 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
            <h1 className="text-xl font-bold">AI HOMMA</h1>
          </div>
          <Badge variant="secondary" className="gap-1 bg-purple-500/10 text-purple-700 border-purple-500/30">
            <Wand2 className="w-3 h-3" />
            AI로 생성됨
          </Badge>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Sparkles className="w-4 h-4" />
          AI로 만들기
        </Button>
      </div>

      <div className="flex flex-col gap-2 bg-purple-50/50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-purple-900">
              AI가 생성한 팬 콘텐츠입니다
            </p>
            <p className="text-xs text-purple-700">
              Fan AI Land의 AI 홈마는 생성형 AI 기술을 활용하여 KPOP 아티스트의 팬아트를 자동으로 생성합니다.
              실제 사진이 아닌 AI가 만든 이미지이며, 팬들의 상상력을 시각화한 창작물입니다.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiHommaContents.map((content) => (
          <Card key={content.id} className="hover:shadow-lg transition-all border-purple-500/20 overflow-hidden group">
            <CardHeader className="p-0 relative">
              <div className="absolute top-2 right-2 z-10">
                <Badge className="gap-1 bg-purple-500 text-white shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  AI
                </Badge>
              </div>
              <div className="absolute top-2 left-2 z-10">
                <Badge variant="secondary" className="text-xs">
                  {content.generatedAt}
                </Badge>
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={content.thumbnail}
                  alt={content.prompt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold">{content.aiName}</span>
              </div>
              <Badge variant="outline" className="mb-2 text-xs">
                {content.artistTag}
              </Badge>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {content.prompt}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{formatNumber(content.likes)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{formatNumber(content.views)}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
        <Sparkles className="w-4 h-4 text-purple-500" />
        <span>오늘 127개의 AI 콘텐츠가 생성되었습니다</span>
      </div>
    </div>
  );
}
