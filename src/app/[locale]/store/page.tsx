'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { mockCreators } from '@/data/mock-creators';
import { Creator } from '@/types';
import { UserPlus, Users, CheckCircle } from 'lucide-react';

const formatFollowers = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toString();
};

const CreatorCard = ({ creator }: { creator: Creator }) => {
  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader className="flex flex-col items-center gap-4 pb-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={creator.avatar} />
          <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center w-full">
          <div className="flex items-center justify-center gap-1">
            <h3 className="font-bold text-lg">{creator.name}</h3>
            {creator.verified && (
              <CheckCircle className="w-5 h-5 text-blue-500 fill-blue-500" />
            )}
          </div>
          <Badge variant="secondary" className="mt-2">
            {creator.artistTag}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2 pb-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-5 h-5" />
          <span className="font-semibold text-foreground">
            {formatFollowers(creator.followers)}
          </span>
          <span className="text-sm">Followers</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full gap-2">
          <UserPlus className="w-4 h-4" />
          Follow
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function StorePage() {
  return (
    <div className="container-wrapper">
      <div className="container flex flex-col py-6 gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">KPOP Creators</h1>
          <p className="text-muted-foreground">
            팔로우하고 최신 KPOP 팬 콘텐츠를 받아보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </div>
    </div>
  );
}
