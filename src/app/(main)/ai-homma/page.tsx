'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Info } from 'lucide-react';
import GenerationForm, { GenerationConfig } from './_components/generation-form';
import GenerationProgress from './_components/generation-progress';
import GenerationGallery, { GeneratedImage } from './_components/generation-gallery';
import GenerationHistory, { HistoryItem } from './_components/generation-history';
import { PageTransition } from '@/components/animations/page-transition';
import { StaggerList, StaggerItem } from '@/components/animations/stagger-list';

export default function AIHommaPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=400&auto=format&fit=crop',
      prompt: 'Hanni in a dreamy pastel aesthetic with sparkles',
      artist: 'NewJeans',
      style: 'digital_art',
      quality: 85,
      generatedAt: '2시간 전',
      likes: 2450,
      views: 12340,
      isLiked: true,
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=400&auto=format&fit=crop',
      prompt: 'Wonyoung as an ethereal goddess in a cosmic setting',
      artist: 'IVE',
      style: 'fantasy',
      quality: 90,
      generatedAt: '3시간 전',
      likes: 3120,
      views: 15670,
      isLiked: false,
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=400&auto=format&fit=crop',
      prompt: 'Karina in cyberpunk style with neon lights',
      artist: 'aespa',
      style: 'cyberpunk',
      quality: 88,
      generatedAt: '4시간 전',
      likes: 3890,
      views: 18920,
      isLiked: false,
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=400&auto=format&fit=crop',
      prompt: 'Jennie in a luxurious golden hour portrait',
      artist: 'BLACKPINK',
      style: 'realistic',
      quality: 92,
      generatedAt: '5시간 전',
      likes: 4560,
      views: 21450,
      isLiked: true,
    },
  ]);

  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      prompt: 'Hanni in a dreamy pastel aesthetic with sparkles',
      artist: 'NewJeans',
      style: 'digital_art',
      quality: 85,
      generatedAt: '2시간 전',
      status: 'success',
    },
    {
      id: '2',
      prompt: 'Wonyoung as an ethereal goddess in a cosmic setting',
      artist: 'IVE',
      style: 'fantasy',
      quality: 90,
      generatedAt: '3시간 전',
      status: 'success',
    },
    {
      id: '3',
      prompt: 'Undefined character with unclear description',
      artist: 'Unknown',
      style: 'anime',
      quality: 50,
      generatedAt: '1시간 전',
      status: 'failed',
    },
  ]);

  const [currentConfig, setCurrentConfig] = useState<GenerationConfig | null>(null);

  const handleGenerate = (config: GenerationConfig) => {
    setCurrentConfig(config);
    setIsGenerating(true);

    // Add to history
    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      prompt: config.prompt,
      artist: config.artist,
      style: config.style,
      quality: config.quality,
      generatedAt: '방금 전',
      status: 'processing',
    };
    setHistory((prev) => [newHistoryItem, ...prev]);

    // Simulate generation completion
    setTimeout(() => {
      // Create new generated image
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=400&auto=format&fit=crop',
        prompt: config.prompt,
        artist: config.artist,
        style: config.style,
        quality: config.quality,
        generatedAt: '방금 전',
        likes: Math.floor(Math.random() * 5000),
        views: Math.floor(Math.random() * 50000),
        isLiked: false,
      };

      setGeneratedImages((prev) => [newImage, ...prev]);

      // Update history status to success
      setHistory((prev) =>
        prev.map((item) =>
          item.id === newHistoryItem.id
            ? { ...item, status: 'success' as const }
            : item
        )
      );

      setIsGenerating(false);
      setCurrentConfig(null);
    }, 8000); // Simulate 8 seconds of generation
  };

  const handleDeleteHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <PageTransition>
      <div className="container-wrapper">
        <div className="container flex flex-col py-6 gap-6">
          <StaggerList staggerDelay={0.1} delayChildren={0.2}>
            <div className="space-y-6">
              {/* Header */}
              <StaggerItem>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
                      <h1 className="text-4xl font-bold">AI HOMMA</h1>
                    </div>
                    <Badge className="gap-1 bg-purple-500 text-white">
                      <Sparkles className="w-3 h-3" />
                      AI 생성기
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    생성형 AI로 KPOP 아티스트의 팬아트를 자동으로 생성합니다
                  </p>
                </div>
              </StaggerItem>

              {/* Info Banner */}
              <StaggerItem>
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold text-purple-900">
                        AI Homma에 대해
                      </p>
                      <p className="text-sm text-purple-700">
                        이 서비스는 생성형 AI 기술을 활용하여 실시간으로 KPOP 아티스트의 팬아트를 생성합니다.
                        생성되는 이미지는 AI가 만든 창작물이며, 실제 사진이 아닙니다.
                        모든 생성물은 저작권 정책을 준수합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Main Content Grid */}
              <StaggerItem>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form and Progress */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <GenerationForm onGenerate={handleGenerate} isGenerating={isGenerating} />
            <GenerationProgress
              isVisible={isGenerating}
              prompt={currentConfig?.prompt || ''}
              artist={currentConfig?.artist || ''}
            />

            {/* History Sidebar */}
            <GenerationHistory items={history} onDelete={handleDeleteHistory} />
          </div>

          {/* Right Column - Gallery */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">생성된 이미지</h2>
              <p className="text-muted-foreground text-sm">
                {generatedImages.length}개의 이미지가 생성되었습니다
              </p>
            </div>
            <GenerationGallery images={generatedImages} isLoading={false} />
          </div>
                </div>
              </StaggerItem>
            </div>
          </StaggerList>
        </div>
      </div>
    </PageTransition>
  );
}
