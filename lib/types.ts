export type Category = 
  | 'All' 
  | 'Tech & Innovation' 
  | 'Creative & Arts' 
  | 'Eco & Green' 
  | 'Gaming' 
  | 'Web3 & AI';

export interface RewardTier {
  id: string;
  title: string;
  amountUsd: number;
  amountXlm: number;
  description: string;
  items: string[];
  estimatedDelivery: string;
  shippingInfo: string;
  backersCount: number;
  limit: number | null; // null means unlimited
  badge?: string;
}

export interface CampaignUpdate {
  id: string;
  title: string;
  date: string;
  author: string;
  authorAvatar?: string;
  content: string;
  likes: number;
  isPublic: boolean;
}

export interface BackerRecord {
  id: string;
  name: string;
  avatar: string;
  amountUsd: number;
  amountXlm: number;
  tierId: string | null;
  tierTitle?: string;
  timestamp: string;
  txHash?: string;
  paymentMethod: 'STELLAR_TESTNET' | 'DEMO_WALLET' | 'CARD';
}

export interface Campaign {
  id: string;
  title: string;
  tagline: string;
  description: string; // Markdown / detailed story
  category: Category;
  featured: boolean;
  heroImage: string;
  gallery: string[];
  videoUrl?: string;
  goalUsd: number;
  goalXlm: number;
  raisedUsd: number;
  raisedXlm: number;
  backerCount: number;
  daysLeft: number;
  endDate: string;
  creator: {
    name: string;
    avatar: string;
    bio: string;
    stellarAddress: string;
    verified: boolean;
    location: string;
    successfulCampaigns: number;
  };
  tiers: RewardTier[];
  updates: CampaignUpdate[];
  backers: BackerRecord[];
  stellarDestination: string;
  createdAt: string;
  milestones: {
    percentage: number;
    title: string;
    achieved: boolean;
  }[];
}

export interface WalletState {
  publicKey: string | null;
  isConnected: boolean;
  walletName: string | null;
  balanceXlm: number;
  isTestnet: boolean;
  isConnecting: boolean;
  isDemoWallet: boolean;
}
