'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles } from 'lucide-react';
import TrendingTags, { TrendingTag } from './trending-tags';
import TrendingCreators, { TrendingCreator } from './trending-creators';

interface TrendingSectionProps {
  trendingTags?: TrendingTag[];
  trendingCreators?: TrendingCreator[];
  onTagClick?: (tag: string) => void;
  onCreatorClick?: (username: string) => void;
  onFollowClick?: (creatorId: string) => void;
}

const TrendingSection = ({
  trendingTags,
  trendingCreators,
  onTagClick,
  onCreatorClick,
  onFollowClick,
}: TrendingSectionProps) => {
  const [activeTab, setActiveTab] = useState('tags');

  return (
    <Card className="overflow-hidden">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="font-bold text-lg">트렌딩</h2>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="tags" className="text-sm">
              태그
            </TabsTrigger>
            <TabsTrigger value="creators" className="text-sm">
              크리에이터
            </TabsTrigger>
          </TabsList>

          {/* Tags Content */}
          <TabsContent value="tags" className="mt-4 space-y-2">
            <TrendingTags tags={trendingTags} onTagClick={onTagClick} />
          </TabsContent>

          {/* Creators Content */}
          <TabsContent value="creators" className="mt-4 space-y-2">
            <TrendingCreators
              creators={trendingCreators}
              onCreatorClick={onCreatorClick}
              onFollowClick={onFollowClick}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default TrendingSection;
