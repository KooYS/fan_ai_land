'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Sparkles, X } from 'lucide-react';
import ImageUploadZone, { UploadedImage } from './image-upload-zone';

export interface PostData {
  text: string;
  hashtags: string[];
  artistTags: string[];
  images: UploadedImage[];
}

interface PostComposerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PostData) => void;
  userName?: string;
  userAvatar?: string;
}

const ARTISTS = [
  'NewJeans',
  'IVE',
  'aespa',
  'BLACKPINK',
  'LE SSERAFIM',
  'TWICE',
  'STRAY KIDS',
  'SEVENTEEN',
];

const PostComposerSheet = ({
  open,
  onOpenChange,
  onSubmit,
  userName = 'You',
  userAvatar = 'https://github.com/shadcn.png',
}: PostComposerSheetProps) => {
  const [text, setText] = useState('');
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [selectedArtist, setSelectedArtist] = useState('');
  const [discardConfirm, setDiscardConfirm] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      if (text || images.length > 0 || selectedArtist) {
        const draft = { text, selectedArtist, imageCount: images.length };
        localStorage.setItem('postDraft', JSON.stringify(draft));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [text, selectedArtist, images.length]);

  // Load draft on mount
  useEffect(() => {
    if (open) {
      const savedDraft = localStorage.getItem('postDraft');
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          setText(draft.text || '');
          setSelectedArtist(draft.selectedArtist || '');
        } catch (err) {
          console.error('Failed to load draft:', err);
        }
      }
    }
  }, [open]);

  const handleSubmit = () => {
    if (!text.trim()) {
      alert('텍스트를 입력해주세요');
      return;
    }

    // Extract hashtags from text
    const hashtagRegex = /#\w+/g;
    const hashtags = (text.match(hashtagRegex) || []).map((tag) => tag.slice(1));

    const postData: PostData = {
      text,
      hashtags,
      artistTags: selectedArtist ? [selectedArtist] : [],
      images,
    };

    onSubmit(postData);

    // Clear form and draft
    setText('');
    setImages([]);
    setSelectedArtist('');
    localStorage.removeItem('postDraft');
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && (text.trim() || images.length > 0)) {
      setDiscardConfirm(true);
    } else {
      onOpenChange(newOpen);
    }
  };

  const handleDiscard = () => {
    setText('');
    setImages([]);
    setSelectedArtist('');
    localStorage.removeItem('postDraft');
    setDiscardConfirm(false);
    onOpenChange(false);
  };

  const charCount = text.length;
  const maxChars = 500;
  const isOverLimit = charCount > maxChars;

  return (
    <>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl">
          <SheetHeader>
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle>새 포스트 작성</SheetTitle>
                <SheetDescription>
                  팬 콘텐츠를 공유하세요
                </SheetDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => handleOpenChange(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </SheetHeader>

          <div className="mt-6 overflow-y-auto max-h-[calc(90vh-120px)] pr-4 space-y-4">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">@{userName}</p>
                <p className="text-xs text-muted-foreground">지금 공유 중</p>
              </div>
            </div>

            {/* Text Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">콘텐츠</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, maxChars))}
                placeholder="여기에 팬 콘텐츠에 대해 작성해주세요..."
                className="w-full h-32 px-3 py-2 rounded-lg bg-muted border border-input text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  해시태그를 #으로 시작해서 사용할 수 있습니다
                </p>
                <Badge
                  variant={isOverLimit ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {charCount}/{maxChars}
                </Badge>
              </div>
            </div>

            {/* Artist Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">아티스트 태그</label>
              <Select value={selectedArtist} onValueChange={setSelectedArtist}>
                <SelectTrigger>
                  <SelectValue placeholder="아티스트를 선택하세요 (선택사항)" />
                </SelectTrigger>
                <SelectContent>
                  {ARTISTS.map((artist) => (
                    <SelectItem key={artist} value={artist}>
                      {artist}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">이미지 추가</label>
              <ImageUploadZone
                images={images}
                onImagesChange={setImages}
                maxImages={10}
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-1">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-700">
                  <p className="font-medium mb-1">팁: AI 홈마로 생성된 콘텐츠?</p>
                  <p>AI Homma에서 생성한 이미지는 &quot;AI&quot; 라벨이 자동으로 추가됩니다.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-6 border-t pt-4">
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!text.trim() || isOverLimit}
              className="flex-1"
            >
              포스트 작성
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Discard Confirmation */}
      <AlertDialog open={discardConfirm} onOpenChange={setDiscardConfirm}>
        <AlertDialogContent>
          <AlertDialogTitle>포스트를 버릴까요?</AlertDialogTitle>
          <AlertDialogDescription>
            작성 중인 내용이 저장되지 않습니다. 계속하시겠어요?
          </AlertDialogDescription>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>계속 작성</AlertDialogCancel>
            <AlertDialogAction onClick={handleDiscard}>
              버리기
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PostComposerSheet;
