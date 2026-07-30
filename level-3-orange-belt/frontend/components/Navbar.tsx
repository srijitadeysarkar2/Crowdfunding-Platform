'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import {
  Sparkles,
  Compass,
  Layers,
  LayoutDashboard,
  PlusCircle,
  Sun,
  Moon,
  Wallet,
  Search,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { useCampaignStore, useWalletStore } from '@/lib/store';
import { shortenAddress } from '@/lib/stellar';
import { WalletModal } from './WalletModal';

interface NavbarProps {
  onOpenNewCampaignModal: () => void;
}

export function Navbar({ onOpenNewCampaignModal }: NavbarProps) {
  const { currentView, setCurrentView, searchQuery, setSearchQuery } = useCampaignStore();
  const { isConnected, publicKey, balanceXlm, isDemoWallet } = useWalletStore();
  const { theme, setTheme } = useTheme();

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const navItems = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'campaign', label: 'Campaign Page', icon: Layers },
    { id: 'dashboard', label: 'Creator Dashboard', icon: LayoutDashboard }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div
            onClick={() => {
              setCurrentView('discover');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <div className="absolute -inset-0.5 rounded-xl bg-indigo-500 opacity-0 group-hover:opacity-40 blur transition-opacity" />
            </div>
            <div>
              <div className="font-black text-xl tracking-tighter text-foreground flex items-center gap-1">
                SPARK<span className="text-indigo-500 font-serif-editorial italic text-2xl">.</span>FUND
                <span className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  STELLAR
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium hidden sm:block">Crowdfunding Protocol</p>
            </div>
          </div>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as any)}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : ''}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-card rounded-lg shadow-sm border border-border -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search bar & Actions */}
          <div className="flex items-center gap-2.5">
            
            {/* Search Input (Discover only) */}
            <div className="relative hidden lg:block w-48 xl:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-muted/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Launch Campaign Button */}
            <button
              onClick={onOpenNewCampaignModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground hover:brightness-110 font-semibold text-xs transition-all shadow-sm active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Launch</span>
            </button>

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Toggle Theme"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>
            )}

            {/* Wallet Connect Button */}
            <button
              onClick={() => setIsWalletModalOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md ${
                isConnected
                  ? 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 dark:text-indigo-400 hover:bg-indigo-500/20 shadow-indigo-500/10'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
              }`}
            >
              <Wallet className="w-3.5 h-3.5 text-indigo-400" />
              {isConnected && publicKey ? (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs">{shortenAddress(publicKey, 3)}</span>
                  <span className="hidden xl:inline text-indigo-300/80">• {balanceXlm.toFixed(0)} XLM</span>
                </div>
              ) : (
                <span>Connect Wallet</span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-border bg-card text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-card p-4 space-y-3"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                onOpenNewCampaignModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Launch New Campaign</span>
            </button>
          </motion.div>
        )}
      </header>

      {/* Wallet Modal */}
      <WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
    </>
  );
}
