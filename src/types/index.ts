// 공통 타입 정의

export interface Comment {
  id: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  username: string;
  avatar: string;
  content: string;
  media: string;
  likes: number;
  timestamp: string;
  comments: Comment[];
}

export interface RankingItem {
  id: string;
  rank: number;
  artistName: string;
  contentTitle: string;
  uploaderName: string;
  uploaderAvatar: string;
  thumbnailUrl: string;
  likes: number;
  views: number;
  aiScore: number;
  rankChange: number;
  uploadedAt: string;
}

export interface MainRankingItem {
  id: string;
  name: string;
  avatar: string;
  image: string;
  like: number;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  artistTag: string;
  verified?: boolean;
}

export interface BannerItem {
  src: string;
}
