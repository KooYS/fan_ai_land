'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommentInputProps {
  userAvatar?: string;
  userName?: string;
  onSubmit: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  replyingTo?: string;
  onCancel?: () => void;
  autoFocus?: boolean;
}

const CommentInput = ({
  userAvatar = 'https://github.com/shadcn.png',
  userName = 'You',
  onSubmit,
  placeholder = '댓글을 입력하세요...',
  disabled = false,
  replyingTo,
  onCancel,
  autoFocus = false,
}: CommentInputProps) => {
  const [text, setText] = useState('');
  const [rows, setRows] = useState(2);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus, replyingTo]);

  // Auto-grow textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const textarea = e.target;
    const newRows = Math.min(Math.max(textarea.scrollHeight / 20, 2), 5);
    setRows(newRows);
  };

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText('');
      setRows(2);
    }
  };

  const handleCancel = () => {
    setText('');
    setRows(2);
    onCancel?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Cmd+Enter or Ctrl+Enter
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-3">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={userAvatar} alt={userName} />
        <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        {replyingTo && (
          <p className="text-xs text-muted-foreground mb-2">
            <span className="font-medium text-foreground">{replyingTo}</span>님에게 답글 중
          </p>
        )}

        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={Math.floor(rows)}
            className={cn(
              'flex-1 px-3 py-2 rounded-lg bg-muted border border-input',
              'text-sm resize-none',
              'placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          />

          <div className="flex flex-col gap-1">
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!text.trim() || disabled}
              className="gap-1 h-8"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">보내기</span>
            </Button>
            {replyingTo && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                disabled={disabled}
                className="h-8"
              >
                <span className="text-xs">취소</span>
              </Button>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-1">
          Cmd+Enter로 전송
        </p>
      </div>
    </div>
  );
};

export default CommentInput;
