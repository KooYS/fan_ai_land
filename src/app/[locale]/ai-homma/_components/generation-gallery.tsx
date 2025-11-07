'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Heart, Download, Share2, Eye, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  artist: string;
  style: string;
  quality: number;
  generatedAt: string;
  likes: number;
  views: number;
  isLiked?: boolean;
}

interface GenerationGalleryProps {
  images: GeneratedImage[];
  isLoading?: boolean;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const GenerationGallery = ({ images, isLoading = false }: GenerationGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [likedImages, setLikedImages] = useState<Set<string>>(
    new Set(images.filter((img) => img.isLiked).map((img) => img.id))
  );

  const handleLike = (imageId: string) => {
    const newLiked = new Set(likedImages);
    if (newLiked.has(imageId)) {
      newLiked.delete(imageId);
    } else {
      newLiked.add(imageId);
    }
    setLikedImages(newLiked);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="aspect-square bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <Card className="col-span-full p-12 text-center border-dashed">
        <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="font-semibold text-lg mb-2">생성된 이미지가 없습니다</h3>
        <p className="text-muted-foreground">
          위의 생성 폼에서 프롬프트를 입력하고 AI로 생성을 시작하세요
        </p>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card
            key={image.id}
            className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={image.url}
                alt={image.prompt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(image.id);
                    }}
                  >
                    <Heart
                      className={cn(
                        'w-4 h-4',
                        likedImages.has(image.id) && 'fill-current'
                      )}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Top Badges */}
              <div className="absolute top-2 left-2 right-2 flex gap-2 justify-between">
                <Badge className="gap-1 bg-purple-500/90 text-white">
                  <Sparkles className="w-3 h-3" />
                  AI
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {image.quality}%
                </Badge>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-3 space-y-2">
              {/* Meta Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">{image.artist}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {image.prompt}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-3 text-xs text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Heart
                    className={cn(
                      'w-3 h-3',
                      likedImages.has(image.id) && 'fill-red-500 text-red-500'
                    )}
                  />
                  <span>{formatNumber(image.likes)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{formatNumber(image.views)}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Image Detail Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>생성된 이미지</DialogTitle>
            <DialogDescription>
              {selectedImage?.generatedAt}에 생성됨
            </DialogDescription>
          </DialogHeader>

          {selectedImage && (
            <div className="flex flex-col gap-4">
              {/* Large Image */}
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.prompt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="space-y-3">
                {/* Prompt */}
                <div>
                  <h4 className="font-semibold text-sm mb-1">프롬프트</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedImage.prompt}
                  </p>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">아티스트</p>
                    <Badge>{selectedImage.artist}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">스타일</p>
                    <Badge variant="outline">{selectedImage.style}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">품질</p>
                    <Badge variant="secondary">{selectedImage.quality}%</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">생성 시간</p>
                    <Badge variant="secondary">{selectedImage.generatedAt}</Badge>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4 py-3 border-t border-b">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleLike(selectedImage.id)}
                  >
                    <Heart
                      className={cn(
                        'w-4 h-4',
                        likedImages.has(selectedImage.id) && 'fill-red-500 text-red-500'
                      )}
                    />
                    {formatNumber(selectedImage.likes)}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    {formatNumber(selectedImage.views)}
                  </Button>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button className="flex-1 gap-2" variant="default">
                    <Download className="w-4 h-4" />
                    다운로드
                  </Button>
                  <Button className="flex-1 gap-2" variant="outline">
                    <Share2 className="w-4 h-4" />
                    공유하기
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GenerationGallery;
