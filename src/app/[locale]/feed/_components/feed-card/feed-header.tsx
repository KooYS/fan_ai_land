'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Flag, Share, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface FeedHeaderProps {
  username: string;
  avatar: string;
  timestamp: string;
  verified?: boolean;
  onReport?: () => void;
  onShare?: () => void;
  onCopyLink?: () => void;
}

const FeedHeader = ({
  username,
  avatar,
  timestamp,
  verified = false,
  onReport,
  onShare,
  onCopyLink,
}: FeedHeaderProps) => {
  const formatTime = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: ko,
      });
    } catch {
      return timestamp;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatar} alt={username} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm hover:underline cursor-pointer">
              @{username}
            </span>
            {verified && (
              <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {formatTime(timestamp)}
          </span>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            aria-label="더보기"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {onShare && (
            <DropdownMenuItem onClick={onShare}>
              <Share className="w-4 h-4 mr-2" />
              <span>공유하기</span>
            </DropdownMenuItem>
          )}
          {onCopyLink && (
            <DropdownMenuItem onClick={onCopyLink}>
              <LinkIcon className="w-4 h-4 mr-2" />
              <span>링크 복사</span>
            </DropdownMenuItem>
          )}
          {onReport && (
            <>
              <div className="my-1" />
              <DropdownMenuItem onClick={onReport} className="text-red-600">
                <Flag className="w-4 h-4 mr-2" />
                <span>신고하기</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FeedHeader;
