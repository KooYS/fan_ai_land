'use client';

import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

interface ShimmerSkeletonProps {
  width?: string | number;
  height?: string | number;
  count?: number;
  circle?: boolean;
  className?: string;
}

export function ShimmerSkeleton({
  width = '100%',
  height = '16px',
  count = 1,
  circle = false,
  className,
}: ShimmerSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={circle ? 'rounded-full' : ''}
          style={{
            width,
            height,
          }}
        >
          <Skeleton
            className={`${circle ? 'rounded-full' : ''} ${className}`}
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(
                90deg,
                #f0f0f0 0%,
                #e0e0e0 50%,
                #f0f0f0 100%
              )`,
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
            }}
          />
        </motion.div>
      ))}
    </>
  );
}

interface SkeletonCardProps {
  lines?: number;
  className?: string;
  imageHeight?: number;
}

export function SkeletonCard({
  lines = 3,
  className,
  imageHeight = 200,
}: SkeletonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`space-y-3 ${className}`}
    >
      {/* Image placeholder */}
      <Skeleton style={{ height: imageHeight }} className="w-full" />

      {/* Title placeholder */}
      <Skeleton className="h-6 w-3/4" />

      {/* Text placeholders */}
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={`h-4 ${index === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </motion.div>
  );
}
