export interface Game {
  id: string;
  title: string;
  description: string;
  prompt: string;
  code: string;
  thumbnailUrl: string;
  previewGif?: string;
  views: number;
  earnings: number;
  author: string;
  tags: string[];
  isMonetized: boolean;
  monetizationType?: 'ads' | 'paywall';
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  totalEarnings: number;
  gamesCreated: number;
  plan: 'free' | 'pro' | 'lifetime';
}

export interface Plan {
  id: 'free' | 'pro' | 'lifetime';
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
  limit?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or URL
  category: 'Action' | 'Puzzle' | 'Arcade' | 'Strategy';
  basePrompt: string;
}