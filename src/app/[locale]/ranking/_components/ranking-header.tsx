'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, Radio } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

type PeriodType = 'daily' | 'weekly' | 'monthly';

const RankingHeader = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('daily');
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">{t('pages.ranking.aiRankingChart')}</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-muted-foreground text-xs">{t('pages.ranking.analyzing')}</span>
          </div>
        </div>
        <p className="text-muted-foreground">
          {t('pages.ranking.subtitle')}
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
          {t('pages.ranking.daily')}
        </Button>
        <Button
          variant={selectedPeriod === 'weekly' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('weekly')}
          className="gap-1"
        >
          <Calendar className="h-3 w-3" />
          {t('pages.ranking.weekly')}
        </Button>
        <Button
          variant={selectedPeriod === 'monthly' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('monthly')}
          className="gap-1"
        >
          <Calendar className="h-3 w-3" />
          {t('pages.ranking.monthly')}
        </Button>
        {selectedPeriod === 'daily' && (
          <Badge variant="destructive" className="gap-1 ml-2 animate-pulse">
            <Radio className="w-3 h-3" />
            {t('pages.ranking.live')}
          </Badge>
        )}
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-start gap-2">
          <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">{t('pages.ranking.aiScoreTitle')}</p>
            <p className="text-xs text-muted-foreground">
              {t('pages.ranking.aiScoreDescription')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingHeader;
