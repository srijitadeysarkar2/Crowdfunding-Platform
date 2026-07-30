'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Heart,
  Share2,
  ShieldCheck,
  MapPin,
  Clock,
  Users,
  Check,
  Gift,
  Zap,
  MessageSquare,
  ThumbsUp,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { RewardTier } from '@/lib/types';
import { useCampaignStore } from '@/lib/store';
import { PledgeModal } from './PledgeModal';

export function CampaignView() {
  const { campaigns, activeCampaignId, toggleLikeUpdate } = useCampaignStore();

  const campaign = campaigns.find((c) => c.id === activeCampaignId) || campaigns[0];

  const [activeTab, setActiveTab] = useState<'story' | 'updates' | 'backers' | 'faq'>('story');
  const [selectedTier, setSelectedTier] = useState<RewardTier | null>(null);
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  if (!campaign) {
    return <div className="p-12 text-center text-muted-foreground">Campaign not found.</div>;
  }

  const percentage = Math.min(100, Math.round((campaign.raisedUsd / campaign.goalUsd) * 100));

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const openPledgeForTier = (tier: RewardTier | null) => {
    setSelectedTier(tier);
    setIsPledgeModalOpen(true);
  };

  const faqs = [
    {
      q: 'How does funding on SparkFund work?',
      a: 'SparkFund operates as an all-or-nothing crowdfunding platform powered by Stellar Horizon Testnet. If the campaign reaches its goal, funds are transferred directly to the creator destination wallet.'
    },
    {
      q: 'When will my reward tier be delivered?',
      a: `The estimated delivery date for each tier is listed in the tier description (e.g., ${campaign.tiers[0]?.estimatedDelivery || 'Late 2026'}). Creators post regular progress updates.`
    },
    {
      q: 'Can I pledge using XLM cryptocurrency?',
      a: 'Yes! All pledges support both XLM on Stellar Horizon Testnet and standard USD equivalent values.'
    }
  ];

  return (
    <div className="min-h-screen pb-24">
      
      {/* Top Breadcrumb & Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-semibold text-primary">{campaign.category}</span>
            <span>/</span>
            <span className="truncate max-w-[200px] text-foreground font-medium">{campaign.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Media & Core Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-serif-editorial italic font-normal text-foreground tracking-tight leading-tight">
            {campaign.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            {campaign.tagline}
          </p>
        </div>

        {/* Media & Progress Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Video / Image Container */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-border group shadow-xl">
              {isPlayingVideo && campaign.videoUrl ? (
                <iframe
                  src={`${campaign.videoUrl}?autoplay=1`}
                  title={campaign.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={campaign.heroImage}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

                  {/* Play Video Overlay Button */}
                  <button
                    onClick={() => setIsPlayingVideo(true)}
                    className="absolute inset-0 flex items-center justify-center group/btn"
                    aria-label="Play campaign trailer video"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl group-hover/btn:scale-110 transition-transform">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </button>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Play className="w-3.5 h-3.5 text-emerald-400" /> Watch Campaign Trailer (1:45)
                    </span>
                    <span className="text-[11px] opacity-80">Click to Play</span>
                  </div>
                </>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {campaign.gallery && campaign.gallery.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                <div className="relative w-24 h-16 rounded-xl overflow-hidden border-2 border-primary shrink-0 cursor-pointer">
                  <img src={campaign.heroImage} alt="Main" className="w-full h-full object-cover" />
                </div>
                {campaign.gallery.map((imgUrl, i) => (
                  <div key={i} className="relative w-24 h-16 rounded-xl overflow-hidden border border-border shrink-0 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                    <img src={imgUrl} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Progress Sidebar / Summary */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xl space-y-6">
            <div className="space-y-6">
              
              {/* Creator Card */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50 border border-border">
                <img
                  src={campaign.creator.avatar}
                  alt={campaign.creator.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 font-bold text-xs text-foreground truncate">
                    <span>{campaign.creator.name}</span>
                    {campaign.creator.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {campaign.creator.location}</span>
                    <span>• {campaign.creator.successfulCampaigns} Launched</span>
                  </div>
                </div>
              </div>

              {/* Raised Stats */}
              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl font-mono-code font-bold text-foreground">
                  ${campaign.raisedUsd.toLocaleString()}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
                  <span>pledged of ${campaign.goalUsd.toLocaleString()} goal</span>
                  <span className="text-indigo-500 font-bold">{percentage}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400 rounded-full transition-all duration-700"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-muted/60 border border-border/50">
                  <div className="text-xl font-mono-code font-bold text-foreground">{campaign.backerCount}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Backers</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-muted/60 border border-border/50">
                  <div className="text-xl font-mono-code font-bold text-foreground">{campaign.daysLeft}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Days Remaining</div>
                </div>
              </div>

              {/* Stellar Horizon Destination Tag */}
              <div className="p-3.5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-indigo-500 dark:text-indigo-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> Stellar Payout Address
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">Testnet</span>
                </div>
                <div className="font-mono text-[11px] text-muted-foreground truncate">
                  {campaign.stellarDestination}
                </div>
              </div>
            </div>

            {/* Back Button Action */}
            <div className="space-y-2">
              <button
                onClick={() => openPledgeForTier(null)}
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4" />
                <span>Back This Project</span>
              </button>
              <p className="text-[10px] text-center text-muted-foreground">
                All-or-nothing funding. Cancel or modify pledge anytime before campaign end.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs & Sticky Tier Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Tabbed Content Area */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tabs Header */}
            <div className="flex items-center gap-2 border-b border-border pb-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('story')}
                className={`px-4 py-2.5 font-bold text-xs rounded-xl transition-all ${
                  activeTab === 'story'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Campaign Story
              </button>

              <button
                onClick={() => setActiveTab('updates')}
                className={`flex items-center gap-1.5 px-4 py-2.5 font-bold text-xs rounded-xl transition-all ${
                  activeTab === 'updates'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>Updates</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-card/80 text-foreground">
                  {campaign.updates.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('backers')}
                className={`flex items-center gap-1.5 px-4 py-2.5 font-bold text-xs rounded-xl transition-all ${
                  activeTab === 'backers'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>Backer Wall</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-card/80 text-foreground">
                  {campaign.backers.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('faq')}
                className={`px-4 py-2.5 font-bold text-xs rounded-xl transition-all ${
                  activeTab === 'faq'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                FAQ
              </button>
            </div>

            {/* TAB 1: STORY */}
            {activeTab === 'story' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Milestones Tracker */}
                <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    Project Stretch Goals & Milestones
                  </h3>

                  <div className="space-y-3">
                    {campaign.milestones.map((ms, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
                        <div className={`p-1 rounded-full ${ms.achieved ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center text-xs font-semibold">
                            <span className={ms.achieved ? 'text-foreground' : 'text-muted-foreground'}>{ms.title}</span>
                            <span className="text-primary">{ms.percentage}% Goal</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Long Story Content */}
                <div className="p-8 rounded-3xl bg-card border border-border space-y-6 text-foreground leading-relaxed text-sm">
                  <div className="prose dark:prose-invert max-w-none space-y-4 whitespace-pre-line">
                    {campaign.description}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: UPDATES */}
            {activeTab === 'updates' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {campaign.updates.length === 0 ? (
                  <div className="p-8 text-center bg-card rounded-3xl border border-border text-muted-foreground text-xs">
                    No updates posted yet by creator.
                  </div>
                ) : (
                  campaign.updates.map((up) => (
                    <div key={up.id} className="p-6 rounded-3xl bg-card border border-border space-y-4">
                      <div className="flex items-center justify-between border-b border-border pb-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={up.authorAvatar || campaign.creator.avatar}
                            alt={up.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-bold text-sm text-foreground">{up.title}</div>
                            <div className="text-[11px] text-muted-foreground">{up.author} • {up.date}</div>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {up.content}
                      </p>

                      <div className="flex items-center gap-4 pt-2 text-xs">
                        <button
                          onClick={() => toggleLikeUpdate(campaign.id, up.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/60 text-muted-foreground hover:text-primary transition-colors font-medium"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{up.likes} Likes</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {/* TAB 3: BACKERS */}
            {activeTab === 'backers' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
                  <h3 className="font-bold text-sm text-foreground">Recent Stellar Backers</h3>

                  {campaign.backers.length === 0 ? (
                    <p className="text-xs text-muted-foreground">Be the very first backer for this campaign!</p>
                  ) : (
                    <div className="divide-y divide-border">
                      {campaign.backers.map((b) => (
                        <div key={b.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                          <div className="flex items-center gap-3">
                            <img src={b.avatar} alt={b.name} className="w-8 h-8 rounded-full" />
                            <div>
                              <div className="font-bold text-foreground">{b.name}</div>
                              <div className="text-[11px] text-muted-foreground">{b.tierTitle || 'Custom Pledge'} • {b.timestamp}</div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="font-extrabold text-emerald-500">${b.amountUsd} ({b.amountXlm} XLM)</div>
                            {b.txHash && (
                              <a
                                href={`https://stellar.expert/explorer/testnet/tx/${b.txHash}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-primary hover:underline font-mono inline-flex items-center gap-0.5"
                              >
                                {b.txHash.slice(0, 10)}... <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 4: FAQ */}
            {activeTab === 'faq' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {faqs.map((faq, i) => {
                  const isOpen = expandedFaq === i;
                  return (
                    <div key={i} className="rounded-2xl bg-card border border-border overflow-hidden">
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : i)}
                        className="w-full p-4 text-left flex justify-between items-center font-bold text-sm text-foreground hover:bg-muted/40 transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Sticky Right Sidebar: Backer Tiers (Desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="sticky top-20 space-y-4">
              <h3 className="font-extrabold text-base text-foreground flex items-center justify-between">
                <span>Select a Reward Tier</span>
                <span className="text-xs text-muted-foreground font-normal">{campaign.tiers.length} Available</span>
              </h3>

              {/* Tiers List */}
              <div className="space-y-4">
                {campaign.tiers.map((tier) => {
                  const isSoldOut = tier.limit !== null && tier.backersCount >= tier.limit;

                  return (
                    <div
                      key={tier.id}
                      className={`relative group p-5 rounded-3xl bg-card border transition-all ${
                        isSoldOut
                          ? 'opacity-60 border-border'
                          : 'border-border hover:border-primary/60 shadow-md hover:shadow-xl'
                      }`}
                    >
                      {/* Badge if exists */}
                      {tier.badge && (
                        <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px] border border-emerald-500/20">
                          {tier.badge}
                        </span>
                      )}

                      <div className="space-y-3">
                        <div>
                          <div className="text-xl font-black text-foreground">
                            Pledge ${tier.amountUsd} <span className="text-xs font-normal text-muted-foreground">({tier.amountXlm} XLM)</span>
                          </div>
                          <h4 className="font-bold text-sm text-foreground mt-1">{tier.title}</h4>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {tier.description}
                        </p>

                        {/* Included Items */}
                        <div className="space-y-1.5 pt-2 border-t border-border/60">
                          <div className="text-[11px] font-bold text-foreground">INCLUDES:</div>
                          {tier.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* Delivery Info */}
                        <div className="flex justify-between text-[11px] text-muted-foreground pt-2">
                          <span>EST. DELIVERY: <strong className="text-foreground">{tier.estimatedDelivery}</strong></span>
                          <span>{tier.backersCount} Backers</span>
                        </div>

                        {/* Pledge Button */}
                        <button
                          disabled={isSoldOut}
                          onClick={() => openPledgeForTier(tier)}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                            isSoldOut
                              ? 'bg-muted text-muted-foreground cursor-not-allowed'
                              : 'bg-primary text-primary-foreground hover:brightness-110 shadow-sm'
                          }`}
                        >
                          {isSoldOut ? 'Reward Sold Out' : `Back This Tier ($${tier.amountUsd})`}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Bar for Mobile Pledges */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border z-30 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs text-muted-foreground">Raised</div>
          <div className="font-black text-base text-foreground">${campaign.raisedUsd.toLocaleString()}</div>
        </div>
        <button
          onClick={() => openPledgeForTier(null)}
          className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-lg flex items-center gap-1.5"
        >
          <Gift className="w-4 h-4" />
          <span>Select Reward & Pledge</span>
        </button>
      </div>

      {/* Pledge Modal */}
      <PledgeModal
        isOpen={isPledgeModalOpen}
        onClose={() => setIsPledgeModalOpen(false)}
        campaign={campaign}
        selectedTier={selectedTier}
      />
    </div>
  );
}
