'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface LikeButtonProps {
  liked?: boolean;
  count?: number;
  onLike?: (liked: boolean) => void;
  className?: string;
}

const particleVariants = {
  initial: () => ({
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
  }),
  animate: (index: number) => {
    const angle = (index / 6) * Math.PI * 2;
    const distance = 50;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.6,
      },
    };
  },
};

export function LikeButton({
  liked = false,
  count = 0,
  onLike,
  className,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const [showParticles, setShowParticles] = useState(false);
  const [likeCount, setLikeCount] = useState(count);

  const handleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikeCount(newLiked ? likeCount + 1 : Math.max(0, likeCount - 1));

    // Show particle animation
    if (newLiked) {
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 600);
    }

    onLike?.(newLiked);
  };

  return (
    <div className="relative inline-flex items-center gap-1">
      <motion.div
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.1 }}
      >
        <Button
          variant="ghost"
          size="sm"
          className={className}
          onClick={handleLike}
        >
          <Heart
            className="w-4 h-4"
            fill={isLiked ? 'currentColor' : 'none'}
            color={isLiked ? '#ef4444' : 'currentColor'}
          />
          {likeCount > 0 && <span className="ml-1 text-sm">{likeCount}</span>}
        </Button>
      </motion.div>

      {/* Particle effect */}
      {showParticles && (
        <div className="pointer-events-none">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={particleVariants}
              initial="initial"
              animate="animate"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Heart className="w-3 h-3 text-red-500" fill="currentColor" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
