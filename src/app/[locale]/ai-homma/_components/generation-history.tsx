'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Copy, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HistoryItem {
  id: string;
  prompt: string;
  artist: string;
  style: string;
  quality: number;
  generatedAt: string;
  status: 'success' | 'failed' | 'processing';
}

interface GenerationHistoryProps {
  items: HistoryItem[];
  onDelete?: (id: string) => void;
}

const GenerationHistory = ({ items, onDelete }: GenerationHistoryProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const successItems = items.filter((item) => item.status === 'success');
  const processingItems = items.filter((item) => item.status === 'processing');
  const failedItems = items.filter((item) => item.status === 'failed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'success':
        return '완료';
      case 'processing':
        return '진행 중';
      case 'failed':
        return '실패';
      default:
        return status;
    }
  };

  const renderHistoryItems = (historyItems: HistoryItem[]) => {
    if (historyItems.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">생성 히스토리가 없습니다</p>
        </div>
      );
    }

    return (
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {historyItems.map((item) => (
          <Card key={item.id} className="p-3 hover:bg-muted/50 transition-colors">
            <div className="flex gap-3">
              {/* Status Indicator */}
              <div className="flex-shrink-0 pt-1">
                {item.status === 'success' && (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                )}
                {item.status === 'processing' && (
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                )}
                {item.status === 'failed' && (
                  <div className="w-5 h-5 bg-red-600 rounded-full" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium line-clamp-1">
                    {item.prompt}
                  </p>
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-xs flex-shrink-0',
                      getStatusColor(item.status)
                    )}
                  >
                    {getStatusLabel(item.status)}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.artist}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {item.style}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {item.quality}%
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground">
                  {item.generatedAt}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-1 flex-shrink-0">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={() => handleCopyPrompt(item.prompt, item.id)}
                  title="프롬프트 복사"
                >
                  {copiedId === item.id ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                {onDelete && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(item.id)}
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-purple-50/50 to-transparent">
      <CardHeader>
        <CardTitle>생성 히스토리</CardTitle>
        <CardDescription>
          최근 생성된 이미지 기록 ({items.length})
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              전체 ({items.length})
            </TabsTrigger>
            <TabsTrigger value="success">
              완료 ({successItems.length})
            </TabsTrigger>
            <TabsTrigger value="other">
              기타 ({processingItems.length + failedItems.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            {renderHistoryItems(items)}
          </TabsContent>

          <TabsContent value="success" className="mt-4">
            {renderHistoryItems(successItems)}
          </TabsContent>

          <TabsContent value="other" className="mt-4">
            {renderHistoryItems([...processingItems, ...failedItems])}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GenerationHistory;
