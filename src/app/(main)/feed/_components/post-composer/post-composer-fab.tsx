'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostComposerFABProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const PostComposerFAB = ({ open = false, onOpenChange }: PostComposerFABProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <Button
      size="lg"
      className={cn(
        'fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 shadow-lg',
        'transition-all duration-300 ease-out',
        'hover:shadow-xl hover:scale-110',
        !isVisible && 'translate-y-20 opacity-0 pointer-events-none'
      )}
      onClick={() => onOpenChange?.(!open)}
    >
      {open ? (
        <X className="w-6 h-6" />
      ) : (
        <Plus className="w-6 h-6" />
      )}
    </Button>
  );
};

export default PostComposerFAB;
