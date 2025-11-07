'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sparkles, RefreshCw } from 'lucide-react';

interface GenerationFormProps {
  onGenerate: (config: GenerationConfig) => void;
  isGenerating?: boolean;
}

export interface GenerationConfig {
  prompt: string;
  artist: string;
  style: string;
  quality: number;
}

const ARTISTS = [
  'NewJeans',
  'IVE',
  'aespa',
  'BLACKPINK',
  'LE SSERAFIM',
  'TWICE',
  'STRAY KIDS',
  'SEVENTEEN',
  'BTS',
  'TWICE',
];

const STYLES = [
  { value: 'realistic', label: '현실적 (Realistic)' },
  { value: 'anime', label: '애니메이션 (Anime)' },
  { value: 'oil_painting', label: '유화 (Oil Painting)' },
  { value: 'watercolor', label: '수채화 (Watercolor)' },
  { value: 'digital_art', label: '디지털 아트 (Digital Art)' },
  { value: 'cyberpunk', label: '사이버펑크 (Cyberpunk)' },
  { value: 'fantasy', label: '판타지 (Fantasy)' },
  { value: 'minimalist', label: '미니멀리스트 (Minimalist)' },
];

const GenerationForm = ({ onGenerate, isGenerating = false }: GenerationFormProps) => {
  const [config, setConfig] = useState<GenerationConfig>({
    prompt: '',
    artist: 'NewJeans',
    style: 'realistic',
    quality: 75,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (config.prompt.trim()) {
      onGenerate(config);
    }
  };

  const handleReset = () => {
    setConfig({
      prompt: '',
      artist: 'NewJeans',
      style: 'realistic',
      quality: 75,
    });
  };

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-purple-50/50 to-transparent">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <CardTitle>AI Homma 생성기</CardTitle>
        </div>
        <CardDescription>
          KPOP 아티스트의 팬아트를 AI로 자동 생성합니다
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Prompt Input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="prompt" className="font-semibold">
              프롬프트 (Prompt)
            </Label>
            <Textarea
              id="prompt"
              placeholder="예시: '새로운 진에서 보라색 드레스를 입고 있는 판타지 신비로운 분위기'..."
              value={config.prompt}
              onChange={(e) => setConfig({ ...config, prompt: e.target.value })}
              className="min-h-24 resize-none"
              disabled={isGenerating}
            />
            <p className="text-xs text-muted-foreground">
              상세할수록 원하는 이미지가 잘 생성됩니다
            </p>
          </div>

          {/* Grid for selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Artist Selection */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="artist" className="font-semibold">
                아티스트 선택
              </Label>
              <Select
                value={config.artist}
                onValueChange={(value) => setConfig({ ...config, artist: value })}
                disabled={isGenerating}
              >
                <SelectTrigger id="artist">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ARTISTS.map((artist) => (
                    <SelectItem key={artist} value={artist}>
                      {artist}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Style Selection */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="style" className="font-semibold">
                스타일 선택
              </Label>
              <Select
                value={config.style}
                onValueChange={(value) => setConfig({ ...config, style: value })}
                disabled={isGenerating}
              >
                <SelectTrigger id="style">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STYLES.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quality Slider */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">품질 레벨</Label>
              <Badge variant="secondary" className="font-mono">
                {config.quality}%
              </Badge>
            </div>
            <Slider
              value={[config.quality]}
              onValueChange={([value]) => setConfig({ ...config, quality: value })}
              min={25}
              max={100}
              step={5}
              disabled={isGenerating}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>빠름 (25%)</span>
              <span>권장 (75%)</span>
              <span>최고 (100%)</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
              disabled={isGenerating || !config.prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  생성 중...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  AI로 생성하기
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isGenerating}
            >
              초기화
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default GenerationForm;
