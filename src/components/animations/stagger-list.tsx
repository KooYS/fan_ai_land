'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerListProps {
  children: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export function StaggerList({
  children,
  staggerDelay = 0.1,
  delayChildren = 0.2,
}: StaggerListProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }: { children: ReactNode }) {
  return <motion.div variants={itemVariants}>{children}</motion.div>;
}
