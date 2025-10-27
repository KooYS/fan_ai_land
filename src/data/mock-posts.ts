import { Post } from '@/types';

export const mockPosts: Post[] = [
  {
    id: '1',
    username: 'NewJeans_Fansite',
    avatar: 'https://github.com/shadcn.png',
    content:
      'Hanni fancam from Super Shy live stage! The vocals were absolutely stunning 🎤✨ #NewJeans #Hanni',
    media:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 15420,
    timestamp: '2 hours ago',
    comments: [
      {
        id: 'c1',
        username: 'KPOP_Lover_123',
        avatar: 'https://github.com/shadcn.png',
        content: 'Her stage presence is unreal! 🔥',
        timestamp: '1 hour ago',
      },
      {
        id: 'c2',
        username: 'Bunnies_Official',
        avatar: 'https://github.com/shadcn.png',
        content: 'Thank you for sharing! Saving this immediately 💙',
        timestamp: '45 minutes ago',
      },
    ],
  },
  {
    id: '2',
    username: 'IVE_Moments',
    avatar: 'https://github.com/shadcn.png',
    content:
      'Wonyoung "I AM" dance practice behind the scenes 💃 The choreography details are insane! #IVE #Wonyoung',
    media:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 12340,
    timestamp: '5 hours ago',
    comments: [
      {
        id: 'c3',
        username: 'DIVE_Forever',
        avatar: 'https://github.com/shadcn.png',
        content: 'She makes it look so effortless! Queen behavior 👑',
        timestamp: '3 hours ago',
      },
    ],
  },
  {
    id: '3',
    username: 'aespa_Archive',
    avatar: 'https://github.com/shadcn.png',
    content:
      'Karina Drama MV filming location photos! The aesthetic is perfect 🎬🌟 #aespa #Karina #Drama',
    media:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 18920,
    timestamp: '1 day ago',
    comments: [
      {
        id: 'c4',
        username: 'MY_aespa',
        avatar: 'https://github.com/shadcn.png',
        content: 'The visuals are out of this world! 😍',
        timestamp: '20 hours ago',
      },
      {
        id: 'c5',
        username: 'KPOP_Editor',
        avatar: 'https://github.com/shadcn.png',
        content: 'I want to visit this location! Where is it?',
        timestamp: '18 hours ago',
      },
      {
        id: 'c6',
        username: 'Photographer_KR',
        avatar: 'https://github.com/shadcn.png',
        content: 'What camera settings did you use? The colors are amazing!',
        timestamp: '12 hours ago',
      },
    ],
  },
  {
    id: '4',
    username: 'BLACKPINK_Daily',
    avatar: 'https://github.com/shadcn.png',
    content:
      'Jennie at Paris Fashion Week! She owns every red carpet 💅✨ #BLACKPINK #Jennie #FashionWeek',
    media:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 24560,
    timestamp: '3 days ago',
    comments: [],
  },
  {
    id: '5',
    username: 'LESSERAFIM_Hub',
    avatar: 'https://github.com/shadcn.png',
    content:
      'Chaewon Perfect Night encore stage compilation! Her live vocals never disappoint 🎤💕 #LESSERAFIM #Chaewon',
    media:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 16780,
    timestamp: '4 days ago',
    comments: [],
  },
  {
    id: '6',
    username: 'TWICE_Gallery',
    avatar: 'https://github.com/shadcn.png',
    content:
      'Nayeon Pop! dance practice preview! The energy is incredible 💃🎵 #TWICE #Nayeon',
    media:
      'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop',
    likes: 14230,
    timestamp: '5 days ago',
    comments: [
      {
        id: 'c7',
        username: 'ONCE_Forever',
        avatar: 'https://github.com/shadcn.png',
        content: 'Nayeon always brings the best vibes! 🌟',
        timestamp: '4 days ago',
      },
    ],
  },
];
