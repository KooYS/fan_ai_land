'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Check, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GenerationProgressProps {
  isVisible: boolean;
  prompt: string;
  artist: string;
}

interface ProgressStep {
  id: string;
  label: string;
  description: string;
}

const PROGRESS_STEPS: ProgressStep[] = [
  { id: 'init', label: 'AI 모델 초기화', description: '생성 모델을 준비 중입니다' },
  { id: 'analyze', label: '프롬프트 분석', description: '입력된 설명을 분석하고 있습니다' },
  { id: 'generate', label: '이미지 생성', description: 'AI가 이미지를 생성하고 있습니다' },
  { id: 'enhance', label: '품질 향상', description: '이미지 품질을 개선하고 있습니다' },
  { id: 'finalize', label: '최종 처리', description: '이미지를 완성하고 있습니다' },
];

const GenerationProgress = ({ isVisible, prompt, artist }: GenerationProgressProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    // Simulate progress through steps
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        // Random increment between 5-15%
        return prev + Math.random() * 10 + 5;
      });
    }, 800);

    // Move to next step based on progress
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < PROGRESS_STEPS.length - 1 ? prev + 1 : prev));
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-purple-50/50 to-transparent overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          AI 이미지 생성 중...
        </CardTitle>
        <CardDescription>
          &quot;{prompt}&quot; - {artist}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Overall Progress Bar */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">전체 진행률</span>
            <span className="text-sm font-bold text-purple-600">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step-by-step Progress */}
        <div className="flex flex-col gap-3">
          {PROGRESS_STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isUpcoming = index > currentStep;

            return (
              <div key={step.id} className="flex gap-3">
                {/* Step Indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all',
                      isCompleted &&
                        'bg-green-500 text-white',
                      isCurrent &&
                        'bg-purple-500 text-white ring-2 ring-purple-500/30 animate-pulse',
                      isUpcoming &&
                        'bg-muted text-muted-foreground'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : isCurrent ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < PROGRESS_STEPS.length - 1 && (
                    <div
                      className={cn(
                        'w-0.5 h-8 my-1 transition-colors',
                        isCompleted ? 'bg-green-500' : 'bg-muted'
                      )}
                    />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 py-1">
                  <div className="flex items-center gap-2">
                    <p className={cn(
                      'font-medium text-sm',
                      isCompleted && 'text-green-600',
                      isCurrent && 'text-purple-600',
                      isUpcoming && 'text-muted-foreground'
                    )}>
                      {step.label}
                    </p>
                    {isCompleted && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        완료
                      </Badge>
                    )}
                    {isCurrent && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 animate-pulse">
                        진행 중
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Estimated Time */}
        <div className="flex items-center justify-center gap-2 pt-2 border-t border-purple-200">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">약 1-2분 소요</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GenerationProgress;
