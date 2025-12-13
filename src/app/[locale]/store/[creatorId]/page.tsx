'use client';

import { useParams, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserPlus, Users, ArrowLeft, CheckCircle, Eye, Heart } from 'lucide-react';
import { mockCreators } from '@/data/mock-creators';
import Image from 'next/image';
import { motion } from 'framer-motion';

// 피드 데이터 import (실제로는 API에서 가져올 것)
const mockCreatorPosts = {
  '디지털드림AI': [
    { id: '1', image: '/images/4-1.jpg', likes: 25, views: 298 },
    { id: '2', image: '/images/4.jpg', likes: 25, views: 298 },
  ],
  'AI아티스트프로': [
    { id: '1', image: '/images/3-1.jpg', likes: 24, views: 287 },
    { id: '2', image: '/images/3.jpg', likes: 24, views: 287 },
  ],
  'AI갤러리공식': [
    { id: '1', image: '/images/8.jpg', likes: 23, views: 276 },
    { id: '2', image: '/images/8-2.jpg', likes: 23, views: 276 },
    { id: '3', image: '/images/8-3.jpg', likes: 23, views: 276 },
    { id: '4', image: '/images/14-1.png', likes: 15, views: 212 },
    { id: '5', image: '/images/14.png', likes: 15, views: 212 },
    { id: '6', image: '/images/15.png', likes: 13, views: 134 },
    { id: '7', image: '/images/16-1.png', likes: 11, views: 267 },
    { id: '8', image: '/images/16.png', likes: 11, views: 267 },
  ],
  'AI마스터웍스': [
    { id: '1', image: '/images/12.jpg', likes: 22, views: 234 },
  ],
  'AI비전랩': [
    { id: '1', image: '/images/5-1.jpg', likes: 21, views: 245 },
    { id: '2', image: '/images/5.jpg', likes: 21, views: 245 },
  ],
  '뉴럴아츠': [
    { id: '1', image: '/images/6-1.png', likes: 20, views: 189 },
    { id: '2', image: '/images/6.jpg', likes: 20, views: 189 },
  ],
  'AI미학연구소': [
    { id: '1', image: '/images/7-1.jpg', likes: 18, views: 167 },
    { id: '2', image: '/images/7.jpg', likes: 18, views: 167 },
  ],
  '미래AI아츠': [
    { id: '1', image: '/images/10.png', likes: 17, views: 145 },
  ],
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toString();
};

export default function CreatorPage() {
  const params = useParams();
  const router = useRouter();
  const creatorId = params.creatorId as string;
  const locale = params.locale as string;

  // 크리에이터 정보 찾기
  const creator = mockCreators.find((c) => c.id === creatorId);

  if (!creator) {
    return (
      <div className="container-wrapper">
        <div className="container flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold mb-4">크리에이터를 찾을 수 없습니다</h1>
          <Button variant="outline" onClick={() => router.push(`/${locale}/store`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            스토어로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  // 해당 크리에이터의 콘텐츠 가져오기
  const creatorPosts = mockCreatorPosts[creator.name as keyof typeof mockCreatorPosts] || [];

  return (
    <div className="container-wrapper">
      <div className="container flex flex-col py-6 gap-6">
        {/* 뒤로 가기 버튼 */}
        <Button variant="ghost" className="w-fit" onClick={() => router.push(`/${locale}/store`)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          스토어로 돌아가기
        </Button>

        {/* 크리에이터 프로필 */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={creator.avatar} />
              <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <h1 className="text-xl font-bold truncate">{creator.name}</h1>
                {creator.verified && (
                  <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="secondary" className="text-xs">
                  {creator.artistTag}
                </Badge>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span className="font-semibold text-foreground">
                    {formatNumber(creator.followers)}
                  </span>
                  <span className="text-xs">팔로워</span>
                </div>
              </div>
            </div>

            <Button className="gap-2 flex-shrink-0">
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">팔로우</span>
            </Button>
          </div>
        </Card>

        {/* 콘텐츠 섹션 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">콘텐츠</h2>

          {creatorPosts.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">아직 콘텐츠가 없습니다</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {creatorPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all group">
                    <div className="relative aspect-square">
                      <Image
                        src={post.image}
                        alt={`${creator.name} 콘텐츠 ${post.id}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* 오버레이 정보 */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                        <div className="flex items-center gap-1.5">
                          <Heart className="w-5 h-5 fill-white" />
                          <span className="font-semibold">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Eye className="w-5 h-5" />
                          <span className="font-semibold">{post.views}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
