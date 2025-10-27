import { RankingItem, MainRankingItem } from '@/types';

export const mockRankingItems: RankingItem[] = [
  {
    id: '1',
    rank: 1,
    artistName: 'NewJeans',
    contentTitle: 'Hanni Fancam - Super Shy',
    uploaderName: 'NewJeans_Fansite',
    uploaderAvatar: 'https://github.com/shadcn.png',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 15420,
    views: 125340,
    aiScore: 98.5,
    rankChange: 0,
    uploadedAt: '2025-10-26T10:00:00Z',
  },
  {
    id: '2',
    rank: 2,
    artistName: 'IVE',
    contentTitle: 'Wonyoung I AM Stage',
    uploaderName: 'IVE_Moments',
    uploaderAvatar: 'https://github.com/shadcn.png',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 14230,
    views: 98750,
    aiScore: 96.8,
    rankChange: 2,
    uploadedAt: '2025-10-26T08:30:00Z',
  },
  {
    id: '3',
    rank: 3,
    artistName: 'aespa',
    contentTitle: 'Karina Drama MV Behind',
    uploaderName: 'aespa_Archive',
    uploaderAvatar: 'https://github.com/shadcn.png',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 13890,
    views: 87230,
    aiScore: 95.2,
    rankChange: -1,
    uploadedAt: '2025-10-25T15:20:00Z',
  },
  {
    id: '4',
    rank: 4,
    artistName: 'BLACKPINK',
    contentTitle: 'Jennie Solo Performance',
    uploaderName: 'BLACKPINK_Daily',
    uploaderAvatar: 'https://github.com/shadcn.png',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 12560,
    views: 76540,
    aiScore: 94.1,
    rankChange: 1,
    uploadedAt: '2025-10-25T12:00:00Z',
  },
  {
    id: '5',
    rank: 5,
    artistName: 'LE SSERAFIM',
    contentTitle: 'Chaewon Perfect Night Focus',
    uploaderName: 'LESSERAFIM_Hub',
    uploaderAvatar: 'https://github.com/shadcn.png',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 11240,
    views: 68920,
    aiScore: 92.7,
    rankChange: -2,
    uploadedAt: '2025-10-24T18:45:00Z',
  },
  {
    id: '6',
    rank: 6,
    artistName: 'TWICE',
    contentTitle: 'Nayeon Pop! Dance Practice',
    uploaderName: 'TWICE_Gallery',
    uploaderAvatar: 'https://github.com/shadcn.png',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 10890,
    views: 65430,
    aiScore: 91.3,
    rankChange: 0,
    uploadedAt: '2025-10-24T14:20:00Z',
  },
];

export const mockMainRankingItems: MainRankingItem[] = [
  {
    id: '1',
    name: 'NewJeans_Fansite',
    avatar: 'https://github.com/shadcn.png',
    image:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    like: 15420,
  },
  {
    id: '2',
    name: 'IVE_Moments',
    avatar: 'https://github.com/shadcn.png',
    image:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    like: 14230,
  },
  {
    id: '3',
    name: 'aespa_Archive',
    avatar: 'https://github.com/shadcn.png',
    image:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    like: 13890,
  },
  {
    id: '4',
    name: 'BLACKPINK_Daily',
    avatar: 'https://github.com/shadcn.png',
    image:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    like: 12560,
  },
  {
    id: '5',
    name: 'LESSERAFIM_Hub',
    avatar: 'https://github.com/shadcn.png',
    image:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    like: 11240,
  },
  {
    id: '6',
    name: 'TWICE_Gallery',
    avatar: 'https://github.com/shadcn.png',
    image:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    like: 10890,
  },
];
