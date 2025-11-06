'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, X, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

interface ImageUploadZoneProps {
  images: UploadedImage[];
  maxImages?: number;
  onImagesChange: (images: UploadedImage[]) => void;
  disabled?: boolean;
}

const ImageUploadZone = ({
  images,
  maxImages = 10,
  onImagesChange,
  disabled = false,
}: ImageUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processFiles = (files: FileList) => {
    const newImages: UploadedImage[] = [];

    Array.from(files).forEach((file) => {
      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        console.warn(`Unsupported file type: ${file.type}`);
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        console.warn(`File too large: ${file.name}`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        newImages.push({
          id: `${Date.now()}-${Math.random()}`,
          file,
          preview,
        });

        // Update when all files are processed
        if (newImages.length === Array.from(files).filter((f) =>
          ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(f.type)
        ).length) {
          const combined = [...images, ...newImages].slice(0, maxImages);
          onImagesChange(combined);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled || images.length >= maxImages) return;

    const { files } = e.dataTransfer;
    processFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    processFiles(e.target.files);
  };

  const handleRemoveImage = (id: string) => {
    onImagesChange(images.filter((img) => img.id !== id));
  };

  const handleReorder = (startIndex: number, endIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(startIndex, 1);
    newImages.splice(endIndex, 0, movedImage);
    onImagesChange(newImages);
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="space-y-3">
      {/* Upload Zone */}
      {canAddMore && (
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            'border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-border bg-muted/30 hover:bg-muted/50',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="font-medium text-sm mb-1">이미지를 드래그하거나 클릭하세요</p>
          <p className="text-xs text-muted-foreground">
            JPG, PNG, GIF, WebP (최대 10MB)
          </p>
          <Badge variant="secondary" className="mt-2 text-xs">
            {images.length}/{maxImages}
          </Badge>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            disabled={disabled || !canAddMore}
            className="hidden"
          />
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">업로드된 이미지</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {images.map((image, idx) => (
              <div
                key={image.id}
                draggable
                onDragStart={() => setDraggedIndex(idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggedIndex !== null && draggedIndex !== idx) {
                    handleReorder(draggedIndex, idx);
                    setDraggedIndex(null);
                  }
                }}
                className={cn(
                  'relative group aspect-square rounded-lg overflow-hidden bg-muted border border-border transition-all',
                  draggedIndex === idx && 'opacity-50 scale-95'
                )}
              >
                <Image
                  src={image.preview}
                  alt={`Preview ${idx + 1}`}
                  fill
                  className="object-cover"
                />

                {/* Drag Handle */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <GripVertical className="w-4 h-4 text-white" />
                </div>

                {/* Remove Button */}
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(image.id)}
                >
                  <X className="w-3 h-3" />
                </Button>

                {/* Index Badge */}
                <Badge className="absolute top-1 left-1 bg-black/60 text-white text-xs">
                  {idx + 1}
                </Badge>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            이미지를 드래그하여 순서를 변경할 수 있습니다
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadZone;
