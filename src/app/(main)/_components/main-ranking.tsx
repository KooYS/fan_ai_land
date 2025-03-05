'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import Image from 'next/image';
import { Award, Heart } from 'lucide-react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { cn } from '@/lib/utils';

interface Item {
  id: string;
  name: string;
  avatar: string;
  image: string;
  like: number;
}

const Prize = ({ rank }: { rank: number }) => {
  return (
    <>
      {[1, 2, 3].includes(rank) && (
        <div
          className={cn(
            'absolute top-2.5 right-2.5 rounded-full p-1.5',
            rank === 1
              ? 'bg-[#FFD700]'
              : rank === 2
              ? 'bg-[#C0C0C0]'
              : rank === 3
              ? 'bg-[#CD7F32]'
              : ''
          )}
        >
          <Award className="text-white w-4 h-4" />
        </div>
      )}
    </>
  );
};
const MainRanking = ({ items }: { items: Item[] }) => {
  // const plusStyle = 'flex items-center gap-2 text-green-600/80 font-bold';
  // const minusStyle = "text-red-600/80 font-bold"
  return (
    <div>
      <div className="w-full">
        <SimpleBar autoHide={false} forceVisible="x">
          <div className="flex gap-5 py-5 px-[20px] lg:px-0">
            {items.map((item: Item, index) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-col py-4 px-2 gap-2 w-fit shrink-0"
                >
                  <div className="flex gap-2 justify-start items-center">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={item.avatar} />
                      <AvatarFallback>{item.name}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm flex justify-between w-full px-1">
                      <p>{item.name}</p>
                      <p className={'flex items-center gap-2 font-bold'}>
                        <Heart fill="red" stroke="red" className="w-4 h-4" />
                        {item.like}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <Prize rank={index + 1} />
                    <Image
                      className="aspect-square rounded-lg"
                      src={item.image}
                      width={300}
                      height={300}
                      alt="image"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </SimpleBar>
        {/* // <div className="flex flex-col py-4 px-2 gap-2 w-fit">
        //   <div className="flex gap-2 justify-start items-center">
        //     <Avatar className="w-6 h-6">
        //       <AvatarImage src="https://github.com/shadcn.png" />
        //       <AvatarFallback>CN</AvatarFallback>
        //     </Avatar>
        //     <div className="text-sm flex justify-between w-full px-1">
        //       <p>Lorem Ipsum</p>
        //       <p className={'flex items-center gap-2 font-bold'}>
        //         <Heart fill="red" stroke="red" className="w-4 h-4" />3
        //       </p>
        //     </div>
        //   </div>
        //   <div className="">
        //     <Image
        //       className="aspect-square rounded-lg"
        //       src="https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        //       width={300}
        //       height={300}
        //       alt="image"
        //     />
        //   </div> */}
      </div>
    </div>
  );
};

export default MainRanking;
