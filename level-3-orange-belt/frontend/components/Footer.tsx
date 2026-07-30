'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Heart, Github, ExternalLink } from 'lucide-react';
import { useCampaignStore } from '@/lib/store';

export function Footer() {
  const { setCurrentView } = useCampaignStore();

  return (
    <footer className="w-full border-t border-border bg-card/50 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-black text-lg tracking-tight text-foreground">SPARK<span className="text-indigo-500 font-serif-editorial italic">.</span>FUND</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Decentralized crowdfunding platform connecting visionaries with backers worldwide on the Stellar Horizon Testnet.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-mono uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Stellar Testnet Operational
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Explore Platform</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <button onClick={() => setCurrentView('discover')} className="hover:text-primary transition-colors">
                  Discover Campaigns
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('campaign')} className="hover:text-primary transition-colors">
                  Featured Innovation
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('dashboard')} className="hover:text-primary transition-colors">
                  Creator Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Categories</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="hover:text-primary cursor-pointer">Tech & Innovation</li>
              <li className="hover:text-primary cursor-pointer">Eco & Green Tech</li>
              <li className="hover:text-primary cursor-pointer">Gaming & VR</li>
              <li className="hover:text-primary cursor-pointer">Web3 & AI Protocols</li>
            </ul>
          </div>

          {/* Developer / Web3 Resources */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Web3 Infrastructure</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a href="https://stellar.org" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary">
                  Stellar Network <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://freighter.app" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary">
                  Freighter Wallet <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://laboratory.stellar.org" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary">
                  Horizon Testnet Faucet <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SparkFund Web3. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision on Stellar Testnet</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
