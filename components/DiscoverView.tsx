'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  TrendingUp,
  Clock,
  Users,
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Filter,
  Flame,
  Globe,
  PlusCircle,
  Coins
} from 'lucide-react';
import { Category } from '@/lib/types';
import { useCampaignStore } from '@/lib/store';

interface DiscoverViewProps {
  onOpenNewCampaignModal: () => void;
}

export function DiscoverView({ onOpenNewCampaignModal }: DiscoverViewProps) {
  const {
    campaigns,
    setActiveCampaignId,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy
  } = useCampaignStore();

  const categories: Category[] = [
    'All',
    'Tech & Innovation',
    'Creative & Arts',
    'Eco & Green',
    'Gaming',
    'Web3 & AI'
  ];

  // Find featured campaign or fallback to first
  const featuredCampaign = campaigns.find((c) => c.featured) || campaigns[0];

  // Filter campaigns
  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortBy === 'popular') return b.backerCount - a.backerCount;
    if (sortBy === 'mostFunded') return b.raisedUsd - a.raisedUsd;
    if (sortBy === 'endingSoon') return a.daysLeft - b.daysLeft;
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0;
  });

  // Calculate platform totals
  const totalRaisedUsd = campaigns.reduce((acc, c) => acc + c.raisedUsd, 0);
  const totalBackers = campaigns.reduce((acc, c) => acc + c.backerCount, 0);

  return (
    <div className="min-h-screen space-y-12 pb-16">
      
      {/* Aurora Ambient Backdrop */}
      <div className="relative overflow-hidden pt-8 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Title Section */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 text-xs font-mono font-bold uppercase tracking-widest"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stellar Web3 Protocol</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-serif-editorial italic font-light text-foreground tracking-tight leading-tight"
            >
              Fund Breakthrough Ideas with <br className="hidden sm:inline" />
              <span className="font-sans font-black not-italic bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Instant Stellar Pledges
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Discover groundbreaking hardware, green tech, and Web3 protocols. Back creators directly with 3-second settlement times and zero intermediary cut.
            </motion.p>

            {/* Platform Stats Counter Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-2xl mx-auto"
            >
              <div className="p-3.5 rounded-2xl bg-card/80 border border-border/80 shadow-xs text-center backdrop-blur-sm">
                <div className="text-xl font-mono-code font-bold text-foreground">${totalRaisedUsd.toLocaleString()}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-0.5">Funds Raised</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-card/80 border border-border/80 shadow-xs text-center backdrop-blur-sm">
                <div className="text-xl font-mono-code font-bold text-foreground">{totalBackers.toLocaleString()}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-0.5">Global Backers</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-card/80 border border-border/80 shadow-xs text-center backdrop-blur-sm">
                <div className="text-xl font-mono-code font-bold text-indigo-500">98.4%</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-0.5">Fund Success Rate</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-card/80 border border-border/80 shadow-xs text-center backdrop-blur-sm">
                <div className="text-xl font-mono-code font-bold text-cyan-400">~3.2s</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-0.5">Stellar Settlement</div>
              </div>
            </motion.div>
          </div>

          {/* Featured Project Hero Banner */}
          {featuredCampaign && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              onClick={() => setActiveCampaignId(featuredCampaign.id)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-card shadow-2xl hover:border-primary/50 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image Section */}
                <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-[420px] overflow-hidden bg-muted">
                  <img
                    src={featuredCampaign.heroImage}
                    alt={featuredCampaign.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/60" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> Featured Spotlight
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-semibold text-xs border border-white/20">
                      {featuredCampaign.category}
                    </span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-card">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={featuredCampaign.creator.avatar}
                        alt={featuredCampaign.creator.name}
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/30"
                      />
                      <span className="text-xs font-semibold text-muted-foreground">{featuredCampaign.creator.name}</span>
                      {featuredCampaign.creator.verified && (
                        <ShieldCheck className="w-4 h-4 text-indigo-500" />
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif-editorial font-normal italic text-foreground group-hover:text-indigo-500 transition-colors leading-tight">
                      {featuredCampaign.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {featuredCampaign.tagline}
                    </p>
                  </div>

                  {/* Progress Stats Bar */}
                  <div className="space-y-4 pt-6 border-t border-border">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xl sm:text-2xl font-mono-code font-bold text-foreground">
                          ${featuredCampaign.raisedUsd.toLocaleString()}
                        </span>
                        <span className="text-xs font-semibold text-muted-foreground">
                          of ${featuredCampaign.goalUsd.toLocaleString()} ({Math.round((featuredCampaign.raisedUsd / featuredCampaign.goalUsd) * 100)}%)
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400 rounded-full transition-all duration-1000"
                          style={{
                            width: `${Math.min(100, Math.round((featuredCampaign.raisedUsd / featuredCampaign.goalUsd) * 100))}%`
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-muted/60 border border-border/50">
                        <div className="font-mono-code font-bold text-foreground">{featuredCampaign.backerCount}</div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Backers</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-muted/60 border border-border/50">
                        <div className="font-mono-code font-bold text-foreground">{featuredCampaign.daysLeft}</div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Days Left</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-muted/60 border border-border/50">
                        <div className="font-mono-code font-bold text-indigo-400">{featuredCampaign.raisedXlm.toLocaleString()} XLM</div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Raised</div>
                      </div>
                    </div>

                    <button className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-98">
                      <span>Back Featured Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Campaign Discovery Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Controls Header: Categories & Sorting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-card text-muted-foreground hover:bg-muted border border-border'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-card border border-border text-foreground text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="popular">Most Backers</option>
              <option value="mostFunded">Most Funded ($)</option>
              <option value="endingSoon">Ending Soon</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Campaign Cards Grid */}
        {sortedCampaigns.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <p className="text-muted-foreground text-sm">No campaigns match your search criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-muted font-semibold text-xs text-foreground hover:bg-muted/80"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCampaigns.map((campaign) => {
              const percent = Math.min(100, Math.round((campaign.raisedUsd / campaign.goalUsd) * 100));

              return (
                <motion.div
                  key={campaign.id}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveCampaignId(campaign.id)}
                  className="group cursor-pointer flex flex-col justify-between overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 shadow-md transition-all"
                >
                  {/* Card Image */}
                  <div>
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={campaign.heroImage}
                        alt={campaign.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-semibold text-[11px] border border-white/10">
                        {campaign.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <img
                          src={campaign.creator.avatar}
                          alt={campaign.creator.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="truncate">{campaign.creator.name}</span>
                      </div>

                      <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {campaign.title}
                      </h3>

                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {campaign.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Progress & Footer */}
                  <div className="p-5 pt-0 space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="font-bold text-foreground">
                          ${campaign.raisedUsd.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground font-semibold">
                          {percent}% funded
                        </span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                      <div className="flex items-center gap-1 font-medium">
                        <Users className="w-3.5 h-3.5 text-primary" />
                        <span>{campaign.backerCount} Backers</span>
                      </div>
                      <div className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>{campaign.daysLeft} days left</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Why Web3 Crowdfunding Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-emerald-900/20 via-teal-900/10 to-card border border-emerald-500/20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-foreground">Instant Stellar Settlement</h4>
            <p className="text-xs text-muted-foreground">
              Funds clear instantly in ~3.2 seconds on Stellar Horizon Testnet with sub-cent gas fees.
            </p>
          </div>
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-foreground">Verifiable Backer Perks</h4>
            <p className="text-xs text-muted-foreground">
              Every reward tier issues a cryptographic backer hash for seamless claim verification.
            </p>
          </div>
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 w-fit">
              <Coins className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-foreground">0% Creator Platform Fee</h4>
            <p className="text-xs text-muted-foreground">
              Direct peer-to-peer pledges mean 100% of backed capital reaches the project team.
            </p>
          </div>
        </div>

        {/* Bottom Call-to-action */}
        <div className="p-8 rounded-3xl bg-card border border-border text-center space-y-4">
          <h3 className="text-2xl font-extrabold text-foreground">Have a Breakthrough Idea?</h3>
          <p className="text-xs text-muted-foreground max-w-lg mx-auto">
            Join visionary creators raising funds on SparkFund. Setup takes less than 2 minutes with instant Stellar wallet destination integration.
          </p>
          <button
            onClick={onOpenNewCampaignModal}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:brightness-110 shadow-md inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Launch Your Campaign</span>
          </button>
        </div>
      </div>
    </div>
  );
}
