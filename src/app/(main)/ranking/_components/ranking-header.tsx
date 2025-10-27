'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, Radio } from 'lucide-react';
import { useState } from 'react';

type PeriodType = 'daily' | 'weekly' | 'monthly';

const RankingHeader = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('daily');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">AI Ranking Chart</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-muted-foreground text-xs">실시간 집계 중</span>
          </div>
        </div>
        <p className="text-muted-foreground">
          AI 기술로 분석된 실시간 KPOP 팬 콘텐츠 랭킹
        </p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Button
          variant={selectedPeriod === 'daily' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('daily')}
          className="gap-1"
        >
          <Calendar className="h-3 w-3" />
          Daily
        </Button>
        <Button
          variant={selectedPeriod === 'weekly' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('weekly')}
          className="gap-1"
        >
          <Calendar className="h-3 w-3" />
          Weekly
        </Button>
        <Button
          variant={selectedPeriod === 'monthly' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('monthly')}
          className="gap-1"
        >
          <Calendar className="h-3 w-3" />
          Monthly
        </Button>
        {selectedPeriod === 'daily' && (
          <Badge variant="destructive" className="gap-1 ml-2 animate-pulse">
            <Radio className="w-3 h-3" />
            LIVE
          </Badge>
        )}
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-start gap-2">
          <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">AI Score란?</p>
            <p className="text-xs text-muted-foreground">
              콘텐츠 품질, 참여도, 트렌드 등을 종합적으로 분석한 AI 평가 점수입니다.
              높을수록 팬들에게 인기 있는 고품질 콘텐츠를 의미합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingHeader;
