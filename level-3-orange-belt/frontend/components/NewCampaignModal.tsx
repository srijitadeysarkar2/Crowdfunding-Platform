'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, PlusCircle, ShieldCheck, Zap } from 'lucide-react';
import { Category } from '@/lib/types';
import { useCampaignStore, useWalletStore } from '@/lib/store';

interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewCampaignModal({ isOpen, onClose }: NewCampaignModalProps) {
  const { createCampaign } = useCampaignStore();
  const { publicKey } = useWalletStore();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<Category>('Tech & Innovation');
  const [goalUsd, setGoalUsd] = useState<number>(25000);
  const [heroImage, setHeroImage] = useState('');
  const [description, setDescription] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [tierTitle, setTierTitle] = useState('Early Bird Edition');
  const [tierAmount, setTierAmount] = useState<number>(100);

  const categories: Category[] = [
    'Tech & Innovation',
    'Creative & Arts',
    'Eco & Green',
    'Gaming',
    'Web3 & AI'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    createCampaign({
      title,
      tagline: tagline || 'An innovative new crowdfunding campaign on Stellar.',
      category,
      goalUsd,
      heroImage: heroImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      description: description || `### About ${title}\n\nWe are excited to launch this groundbreaking project on SparkFund!`,
      creator: {
        name: creatorName || 'Spark Creator',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        bio: 'Innovator building on Stellar Web3.',
        stellarAddress: publicKey || 'GCREATOR...DESTINATION',
        verified: true,
        location: 'San Francisco, CA',
        successfulCampaigns: 1
      },
      stellarDestination: publicKey || 'GSPARKFUNDDEMODESTINATIONKEY2026',
      tiers: [
        {
          id: `tier_${Date.now()}`,
          title: tierTitle,
          amountUsd: tierAmount,
          amountXlm: tierAmount * 5,
          description: `Includes full early bird access and early backer rewards for ${title}.`,
          items: ['Early Backer Special Pack', 'Name in Credits', 'Stellar Backer NFT'],
          estimatedDelivery: '3 Months After Funding',
          shippingInfo: 'Worldwide Shipping',
          backersCount: 0,
          limit: 100,
          badge: 'Early Bird'
        }
      ]
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-card p-6 shadow-2xl border border-border z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Launch New Campaign</h3>
                  <p className="text-xs text-muted-foreground">Stellar Crowdfunding Protocol</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
              
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Campaign Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AeroPod - Quantum Sound Earbuds"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-muted/60 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-muted/60 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Funding Goal ($ USD)</label>
                  <input
                    type="number"
                    min={100}
                    value={goalUsd}
                    onChange={(e) => setGoalUsd(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-muted/60 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Tagline Summary</label>
                <input
                  type="text"
                  placeholder="Short 1-sentence hook explaining the innovation..."
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-muted/60 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Hero Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-muted/60 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Campaign Story & Details</label>
                <textarea
                  rows={4}
                  placeholder="Describe your breakthrough idea, features, and timeline..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-muted/60 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Tier Setup */}
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-3">
                <div className="font-bold text-foreground flex items-center justify-between">
                  <span>Initial Reward Tier</span>
                  <span className="text-emerald-500 font-mono text-[10px]">Stellar Testnet Enabled</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-muted-foreground">Tier Title</label>
                    <input
                      type="text"
                      value={tierTitle}
                      onChange={(e) => setTierTitle(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-card border border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground">Tier Price ($ USD)</label>
                    <input
                      type="number"
                      value={tierAmount}
                      onChange={(e) => setTierAmount(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg bg-card border border-border text-foreground font-bold"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-extrabold text-sm hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish Campaign to Stellar Network</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
