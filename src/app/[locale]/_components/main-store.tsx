'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockCreators } from '@/data/mock-creators';

const formatFollowers = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toString();
};

const MainStore = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-5 m-auto gap-y-10">
      {mockCreators.map((creator) => {
        return (
          <div
            key={creator.id}
            className="aspect-square rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent/50 transition-colors p-2"
          >
            <Avatar className="w-16 h-16">
              <AvatarImage src={creator.avatar} />
              <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="font-bold text-sm text-center line-clamp-1 w-full px-1">
              {creator.name}
            </div>
            <Badge variant="secondary" className="text-xs">
              {creator.artistTag}
            </Badge>
            <div className="text-center">
              <p className="font-bold text-sm">
                {formatFollowers(creator.followers)}
              </p>
              <p className="text-gray-500 text-xs">Followers</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainStore;
