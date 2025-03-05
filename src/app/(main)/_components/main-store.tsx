'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const MainDuckziller = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-5 m-auto gap-y-10">
      {new Array(8).fill(0).map((_, index) => {
        return (
          <div
            key={index}
            className="aspect-square rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <Avatar className="w-fit h-fit">
              <AvatarImage src={'https://github.com/shadcn.png'} />
              <AvatarFallback>TEST</AvatarFallback>
            </Avatar>
            <div className="font-bold">TEST</div>
            <div className="text-center">
              <p className="font-bold text-sm">23K</p>
              <p className="text-gray-500 text-xs">Follower</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainDuckziller;
