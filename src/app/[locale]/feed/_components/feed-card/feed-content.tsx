'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  alt?: string;
}

interface FeedContentProps {
  text: string;
  hashtags?: string[];
  media?: MediaItem[];
  onHashtagClick?: (tag: string) => void;
  expandable?: boolean;
}

const MAX_PREVIEW_LENGTH = 200;

const FeedContent = ({
  text,
  hashtags = [],
  media = [],
  onHashtagClick,
  expandable = true,
}: FeedContentProps) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const isLongText = text.length > MAX_PREVIEW_LENGTH;
  const displayText = expanded || !isLongText ? text : text.slice(0, MAX_PREVIEW_LENGTH) + '...';

  // Parse text for hashtags and mentions
  const renderTextWithHighlights = () => {
    const parts = displayText.split(/(\#\w+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('#')) {
        return (
          <button
            key={i}
            onClick={() => onHashtagClick?.(part)}
            className="text-primary hover:underline font-medium"
          >
            {part}
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const images = media.filter((m) => m.type === 'image');

  return (
    <div className="space-y-3">
      {/* Text Content */}
      <div className="text-sm text-foreground leading-relaxed">
        <p>{renderTextWithHighlights()}</p>
      </div>

      {/* Hashtags */}
      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80 transition-colors"
              onClick={() => onHashtagClick?.(tag)}
            >
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* "Read More" Button */}
      {isLongText && expandable && (
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-primary font-medium text-sm"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '축소' : '더보기'}
        </Button>
      )}

      {/* Media Gallery */}
      {images.length > 0 && (
        <div>
          {images.length === 1 ? (
            // Single Image
            <div
              className="relative w-full rounded-lg overflow-hidden bg-muted cursor-pointer group aspect-video"
              onClick={() => {
                setSelectedImageIndex(0);
                setModalOpen(true);
              }}
            >
              <Image
                src={images[0].url}
                alt={images[0].alt || 'Post image'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ) : (
            // Multiple Images Grid
            <div
              className="relative bg-muted rounded-lg overflow-hidden"
              onClick={() => {
                setSelectedImageIndex(0);
                setModalOpen(true);
              }}
            >
              {/* Grid Layout */}
              <div className="grid grid-cols-2 gap-1 aspect-square">
                {images.slice(0, 4).map((image, idx) => (
                  <div
                    key={image.id}
                    className={cn(
                      'relative overflow-hidden bg-muted cursor-pointer group',
                      idx === 0 && images.length > 1 && 'col-span-1 row-span-2',
                      idx === 0 && images.length === 2 && 'col-span-1 row-span-1'
                    )}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `Post image ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

                    {/* Show count for last visible image if more than 4 */}
                    {idx === 3 && images.length > 4 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          +{images.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Image Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl bg-black border-0 p-0">
          <DialogDescription className="sr-only">
            이미지 보기
          </DialogDescription>

          {/* Image Viewer */}
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
            <Image
              src={images[selectedImageIndex].url}
              alt={images[selectedImageIndex].alt || 'Post image'}
              fill
              className="object-contain"
            />
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <div className="flex items-center justify-between p-4 bg-black text-white">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1
                  )
                }
                className="text-white hover:bg-white/20"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <span className="text-sm font-medium">
                {selectedImageIndex + 1} / {images.length}
              </span>

              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1
                  )
                }
                className="text-white hover:bg-white/20"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2 p-4 bg-black overflow-x-auto">
              {images.map((image, idx) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={cn(
                    'flex-shrink-0 w-12 h-12 rounded border-2 overflow-hidden transition-colors',
                    idx === selectedImageIndex
                      ? 'border-white'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  )}
                >
                  <Image
                    src={image.thumbnail || image.url}
                    alt={image.alt || `Thumbnail ${idx + 1}`}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedContent;
