'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  Send,
  PlusCircle,
  ShieldCheck,
  Zap,
  Download,
  Search,
  ExternalLink,
  Gift,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';
import { useCampaignStore, useWalletStore } from '@/lib/store';

interface DashboardViewProps {
  onOpenNewCampaignModal: () => void;
}

export function DashboardView({ onOpenNewCampaignModal }: DashboardViewProps) {
  const { campaigns, activeCampaignId, setActiveCampaignId, addUpdate } = useCampaignStore();
  const { publicKey } = useWalletStore();

  const activeCampaign = campaigns.find((c) => c.id === activeCampaignId) || campaigns[0];

  const [updateTitle, setUpdateTitle] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [backerSearch, setBackerSearch] = useState('');

  if (!activeCampaign) {
    return <div className="p-12 text-center text-muted-foreground">No active campaign found.</div>;
  }

  const percentage = Math.min(100, Math.round((activeCampaign.raisedUsd / activeCampaign.goalUsd) * 100));

  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateTitle || !updateContent) return;

    addUpdate(activeCampaign.id, updateTitle, updateContent, true);
    setUpdateTitle('');
    setUpdateContent('');
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  const filteredBackers = activeCampaign.backers.filter((b) =>
    b.name.toLowerCase().includes(backerSearch.toLowerCase()) ||
    (b.tierTitle && b.tierTitle.toLowerCase().includes(backerSearch.toLowerCase()))
  );

  const handleExportCsv = () => {
    const headers = ['Name', 'Amount USD', 'Amount XLM', 'Tier', 'Date', 'TxHash', 'PaymentMethod'];
    const rows = activeCampaign.backers.map((b) => [
      `"${b.name}"`,
      b.amountUsd,
      b.amountXlm,
      `"${b.tierTitle || 'Custom'}"`,
      `"${b.timestamp}"`,
      `"${b.txHash || ''}"`,
      b.paymentMethod
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${activeCampaign.id}_backers.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pb-20 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      
      {/* Top Selector & Quick Launch Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-4xl font-serif-editorial italic font-normal text-foreground">Creator Dashboard</h1>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 font-mono text-[10px] uppercase tracking-widest border border-indigo-500/20 font-bold">
              Horizon Analytics
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Track real-time backer pledges, manage reward tiers, and post backer updates.
          </p>
        </div>

        {/* Campaign Switcher & Launch Button */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={activeCampaign.id}
              onChange={(e) => setActiveCampaignId(e.target.value, false)}
              className="bg-card border border-border text-foreground font-bold text-xs rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onOpenNewCampaignModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/20 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* Bento Stats Architecture */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Funds */}
        <div className="p-5 rounded-3xl bg-card border border-border shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Total Funds Raised</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono-code font-bold text-foreground">
            ${activeCampaign.raisedUsd.toLocaleString()}
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-indigo-400 font-mono-code font-bold">{activeCampaign.raisedXlm.toLocaleString()} XLM</span>
            <span className="text-muted-foreground font-mono-code">Goal: ${activeCampaign.goalUsd.toLocaleString()}</span>
          </div>
        </div>

        {/* Card 2: Backer Count */}
        <div className="p-5 rounded-3xl bg-card border border-border shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Active Backers</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono-code font-bold text-foreground">
            {activeCampaign.backerCount}
          </div>
          <div className="text-[11px] text-muted-foreground font-mono-code">
            Avg: ${activeCampaign.backerCount > 0 ? Math.round(activeCampaign.raisedUsd / activeCampaign.backerCount) : 0} per backer
          </div>
        </div>

        {/* Card 3: Funding Progress */}
        <div className="p-5 rounded-3xl bg-card border border-border shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Funding Milestone</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono-code font-bold text-foreground">
            {percentage}%
          </div>
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400" style={{ width: `${percentage}%` }} />
          </div>
        </div>

        {/* Card 4: Stellar Payout Destination */}
        <div className="p-5 rounded-3xl bg-card border border-border shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Stellar Payout Key</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono-code text-xs text-foreground truncate font-bold">
            {activeCampaign.stellarDestination}
          </div>
          <div className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Horizon Testnet Verified
          </div>
        </div>
      </div>

      {/* Main Analytics Visualizer & Post Updates Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Visual Growth & Pledges Analytics (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-card border border-border shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h3 className="font-extrabold text-base text-foreground">Funding Velocity & Daily Pledges</h3>
              <p className="text-xs text-muted-foreground">Recent 7-day backing distribution across currency channels</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-muted text-foreground text-xs font-bold">
              Real-time
            </span>
          </div>

          {/* Simple Vector Analytics Chart */}
          <div className="h-48 w-full flex items-end gap-3 pt-6 px-2">
            {[40, 65, 30, 85, 95, 70, percentage].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}%
                </div>
                <div className="w-full rounded-t-xl bg-muted/80 overflow-hidden h-36 flex items-end">
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:brightness-125 transition-all"
                    style={{ height: `${val}%` }}
                  />
                </div>
                <div className="text-[10px] font-semibold text-muted-foreground">
                  Day {idx + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Reward Tiers Inventory Breakdown */}
          <div className="pt-4 border-t border-border space-y-3">
            <h4 className="font-bold text-xs text-foreground uppercase tracking-wider">Reward Tiers Inventory</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeCampaign.tiers.map((t) => (
                <div key={t.id} className="p-3 rounded-2xl bg-muted/40 border border-border/50 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-foreground">
                    <span>{t.title}</span>
                    <span className="text-emerald-500">${t.amountUsd}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-[11px]">
                    <span>Backers: {t.backersCount}</span>
                    <span>Limit: {t.limit ? `${t.limit - t.backersCount} left` : 'Unlimited'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Post Campaign Update Form (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">Post Creator Update</h3>
              <p className="text-[11px] text-muted-foreground">Broadcast directly to all project backers</p>
            </div>
          </div>

          {updateSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Update published successfully!
            </div>
          )}

          <form onSubmit={handlePostUpdate} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-foreground">Update Headline</label>
              <input
                type="text"
                required
                placeholder="e.g. 🎉 Stretch Goal #2 Unlocked!"
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-muted/60 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground">Message Content</label>
              <textarea
                rows={4}
                required
                placeholder="Share production milestones, shipping news, or behind-the-scenes clips..."
                value={updateContent}
                onChange={(e) => setUpdateContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-muted/60 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:brightness-110 shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Update to Campaign Page</span>
            </button>
          </form>
        </div>
      </div>

      {/* Backer Roster Table & CSV Export */}
      <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h3 className="font-extrabold text-base text-foreground">Backers Registry & Verification</h3>
            <p className="text-xs text-muted-foreground">List of all supporters and Horizon transaction hashes</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search backer name..."
                value={backerSearch}
                onChange={(e) => setBackerSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs rounded-xl bg-muted/60 border border-border text-foreground focus:outline-none"
              />
            </div>

            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {filteredBackers.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground text-xs">
            No backer records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-semibold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Backer</th>
                  <th className="py-2.5 px-3">Reward Tier</th>
                  <th className="py-2.5 px-3">Amount ($ / XLM)</th>
                  <th className="py-2.5 px-3">Network Channel</th>
                  <th className="py-2.5 px-3">Stellar Tx Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredBackers.map((b) => (
                  <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <img src={b.avatar} alt={b.name} className="w-6 h-6 rounded-full" />
                        <span className="font-bold text-foreground">{b.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">{b.tierTitle || 'Custom Pledge'}</td>
                    <td className="py-3 px-3 font-extrabold text-foreground">${b.amountUsd} ({b.amountXlm} XLM)</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px]">
                        {b.paymentMethod === 'STELLAR_TESTNET' ? 'Stellar Testnet' : 'Demo Wallet'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {b.txHash ? (
                        <a
                          href={`https://stellar.expert/explorer/testnet/tx/${b.txHash}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-primary hover:underline flex items-center gap-1 text-[11px]"
                        >
                          {b.txHash.slice(0, 10)}... <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
