'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InteractiveButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function InteractiveButton({
  children,
  onClick,
  className,
}: InteractiveButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}
