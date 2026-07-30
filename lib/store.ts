import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Campaign, Category, BackerRecord, CampaignUpdate, WalletState } from './types';
import { INITIAL_CAMPAIGN_DATA } from './initialData';
import { openStellarAuthModal, fetchStellarBalance, convertUsdToXlm, convertXlmToUsd } from './stellar';

interface WalletStore extends WalletState {
  connectWithStellarKit: () => Promise<boolean>;
  connectDemoWallet: () => void;
  disconnect: () => void;
  refreshBalance: () => Promise<void>;
  deductBalance: (amountXlm: number) => void;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      publicKey: null,
      isConnected: false,
      walletName: null,
      balanceXlm: 0,
      isTestnet: true,
      isConnecting: false,
      isDemoWallet: false,

      connectWithStellarKit: async () => {
        set({ isConnecting: true });
        try {
          const result = await openStellarAuthModal();
          if (result && result.publicKey) {
            const balance = await fetchStellarBalance(result.publicKey);
            set({
              publicKey: result.publicKey,
              walletName: result.walletName,
              isConnected: true,
              balanceXlm: balance,
              isConnecting: false,
              isDemoWallet: false
            });
            return true;
          }
        } catch (err) {
          console.error('Wallet connection error:', err);
        }
        set({ isConnecting: false });
        return false;
      },

      connectDemoWallet: () => {
        const demoKey = 'GBSP' + Math.random().toString(36).substring(2, 10).toUpperCase() + 'SPARKFUND2026';
        set({
          publicKey: demoKey,
          walletName: 'Freighter (Testnet Demo)',
          isConnected: true,
          balanceXlm: 5000.0,
          isConnecting: false,
          isDemoWallet: true
        });
      },

      disconnect: () => {
        set({
          publicKey: null,
          isConnected: false,
          walletName: null,
          balanceXlm: 0,
          isConnecting: false,
          isDemoWallet: false
        });
      },

      refreshBalance: async () => {
        const { publicKey, isDemoWallet } = get();
        if (publicKey && !isDemoWallet) {
          const balance = await fetchStellarBalance(publicKey);
          set({ balanceXlm: balance });
        }
      },

      deductBalance: (amountXlm: number) => {
        const { balanceXlm } = get();
        set({ balanceXlm: Math.max(0, balanceXlm - amountXlm) });
      }
    }),
    {
      name: 'sparkfund-wallet-storage',
      partialize: (state) => ({
        publicKey: state.publicKey,
        isConnected: state.isConnected,
        walletName: state.walletName,
        balanceXlm: state.balanceXlm,
        isDemoWallet: state.isDemoWallet
      })
    }
  )
);

interface CampaignStore {
  campaigns: Campaign[];
  activeCampaignId: string;
  currentView: 'discover' | 'campaign' | 'dashboard';
  searchQuery: string;
  selectedCategory: Category;
  sortBy: 'popular' | 'newest' | 'endingSoon' | 'mostFunded';

  setCurrentView: (view: 'discover' | 'campaign' | 'dashboard') => void;
  setActiveCampaignId: (id: string, viewCampaign?: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: Category) => void;
  setSortBy: (sort: 'popular' | 'newest' | 'endingSoon' | 'mostFunded') => void;

  addPledge: (
    campaignId: string,
    amountUsd: number,
    amountXlm: number,
    tierId: string | null,
    backerName: string,
    paymentMethod: 'STELLAR_TESTNET' | 'DEMO_WALLET' | 'CARD',
    txHash?: string
  ) => void;

  addUpdate: (campaignId: string, title: string, content: string, isPublic: boolean) => void;
  createCampaign: (newCampaign: Partial<Campaign>) => string;
  toggleLikeUpdate: (campaignId: string, updateId: string) => void;
}

export const useCampaignStore = create<CampaignStore>()(
  persist(
    (set, get) => ({
      campaigns: INITIAL_CAMPAIGN_DATA,
      activeCampaignId: 'aura-sound-x1',
      currentView: 'discover',
      searchQuery: '',
      selectedCategory: 'All',
      sortBy: 'popular',

      setCurrentView: (view) => set({ currentView: view }),

      setActiveCampaignId: (id, viewCampaign = true) => {
        set({
          activeCampaignId: id,
          ...(viewCampaign ? { currentView: 'campaign' as const } : {})
        });
      },

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setSortBy: (sortBy) => set({ sortBy }),

      addPledge: (campaignId, amountUsd, amountXlm, tierId, backerName, paymentMethod, txHash) => {
        set((state) => {
          const updatedCampaigns = state.campaigns.map((camp) => {
            if (camp.id !== campaignId) return camp;

            const updatedTiers = camp.tiers.map((tier) => {
              if (tier.id === tierId) {
                return {
                  ...tier,
                  backersCount: tier.backersCount + 1
                };
              }
              return tier;
            });

            const matchingTier = camp.tiers.find((t) => t.id === tierId);

            const newBacker: BackerRecord = {
              id: `backer_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              name: backerName || 'Anonymous Backer',
              avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${backerName || Date.now()}`,
              amountUsd,
              amountXlm,
              tierId,
              tierTitle: matchingTier ? matchingTier.title : 'Custom Pledge',
              timestamp: 'Just now',
              txHash: txHash || `0x${Math.random().toString(16).substring(2, 10)}`,
              paymentMethod
            };

            const newRaisedUsd = camp.raisedUsd + amountUsd;
            const newRaisedXlm = camp.raisedXlm + amountXlm;
            const percentage = Math.min(100, Math.round((newRaisedUsd / camp.goalUsd) * 100));

            const updatedMilestones = camp.milestones.map((m) => {
              if (percentage >= m.percentage) {
                return { ...m, achieved: true };
              }
              return m;
            });

            return {
              ...camp,
              raisedUsd: newRaisedUsd,
              raisedXlm: newRaisedXlm,
              backerCount: camp.backerCount + 1,
              tiers: updatedTiers,
              milestones: updatedMilestones,
              backers: [newBacker, ...camp.backers]
            };
          });

          return { campaigns: updatedCampaigns };
        });
      },

      addUpdate: (campaignId, title, content, isPublic) => {
        set((state) => ({
          campaigns: state.campaigns.map((camp) => {
            if (camp.id !== campaignId) return camp;
            const newUpdate: CampaignUpdate = {
              id: `up_${Date.now()}`,
              title,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              author: camp.creator.name,
              authorAvatar: camp.creator.avatar,
              content,
              likes: 0,
              isPublic
            };
            return {
              ...camp,
              updates: [newUpdate, ...camp.updates]
            };
          })
        }));
      },

      createCampaign: (newCampaignData) => {
        const id = `campaign_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        const goalUsd = newCampaignData.goalUsd || 10000;
        const goalXlm = convertUsdToXlm(goalUsd);

        const newCamp: Campaign = {
          id,
          title: newCampaignData.title || 'Untitled Innovation',
          tagline: newCampaignData.tagline || 'A revolutionary new project built on Stellar.',
          description: newCampaignData.description || 'Campaign story coming soon.',
          category: newCampaignData.category || 'Tech & Innovation',
          featured: false,
          heroImage: newCampaignData.heroImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
          gallery: newCampaignData.gallery || [],
          goalUsd,
          goalXlm,
          raisedUsd: 0,
          raisedXlm: 0,
          backerCount: 0,
          daysLeft: newCampaignData.daysLeft || 30,
          endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          creator: {
            name: newCampaignData.creator?.name || 'Creator',
            avatar: newCampaignData.creator?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
            bio: newCampaignData.creator?.bio || 'Creator on SparkFund',
            stellarAddress: newCampaignData.creator?.stellarAddress || 'GCREATOR...STELLAR',
            verified: true,
            location: newCampaignData.creator?.location || 'San Francisco, CA',
            successfulCampaigns: 1
          },
          stellarDestination: newCampaignData.stellarDestination || 'GDESTINATION...TESTNET',
          createdAt: new Date().toISOString().split('T')[0],
          milestones: [
            { percentage: 25, title: 'Concept Validation', achieved: false },
            { percentage: 50, title: 'Production Tooling', achieved: false },
            { percentage: 100, title: 'Full Manufacturing & Shipping', achieved: false }
          ],
          tiers: newCampaignData.tiers && newCampaignData.tiers.length > 0 ? newCampaignData.tiers : [
            {
              id: `tier_${Date.now()}_1`,
              title: 'Early Backer Supporter',
              amountUsd: 25,
              amountXlm: 125,
              description: 'Get exclusive updates, digital badge, and early backer access.',
              items: ['Digital Backer NFT', 'Exclusive Updates', 'Name in Credits'],
              estimatedDelivery: 'Next Month',
              shippingInfo: 'Digital Delivery',
              backersCount: 0,
              limit: null,
              badge: 'Early Access'
            }
          ],
          updates: [],
          backers: []
        };

        set((state) => ({
          campaigns: [newCamp, ...state.campaigns],
          activeCampaignId: id,
          currentView: 'campaign'
        }));

        return id;
      },

      toggleLikeUpdate: (campaignId, updateId) => {
        set((state) => ({
          campaigns: state.campaigns.map((camp) => {
            if (camp.id !== campaignId) return camp;
            return {
              ...camp,
              updates: camp.updates.map((up) => {
                if (up.id === updateId) {
                  return { ...up, likes: up.likes + 1 };
                }
                return up;
              })
            };
          })
        }));
      }
    }),
    {
      name: 'sparkfund-campaigns-storage'
    }
  )
);
