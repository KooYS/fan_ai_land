'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TrendType = 'up' | 'down' | 'stable';

interface TrendIndicatorProps {
  type: TrendType;
  percentage?: number;
  className?: string;
}

const TrendIndicator = ({
  type,
  percentage = 0,
  className,
}: TrendIndicatorProps) => {
  const getIcon = () => {
    switch (type) {
      case 'up':
        return <TrendingUp className="w-3 h-3" />;
      case 'down':
        return <TrendingDown className="w-3 h-3" />;
      case 'stable':
        return <Minus className="w-3 h-3" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'up':
        return 'text-red-500';
      case 'down':
        return 'text-blue-500';
      case 'stable':
        return 'text-gray-500';
    }
  };

  return (
    <div
      className={cn(
        'flex items-center gap-1',
        getColor(),
        className
      )}
    >
      {getIcon()}
      {percentage > 0 && <span className="text-xs font-medium">{percentage}%</span>}
    </div>
  );
};

export default TrendIndicator;
