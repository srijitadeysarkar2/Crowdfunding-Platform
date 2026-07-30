'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wallet, ShieldCheck, Zap, ExternalLink, RefreshCw, Copy, Check } from 'lucide-react';
import { useWalletStore } from '@/lib/store';
import { shortenAddress } from '@/lib/stellar';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const {
    publicKey,
    isConnected,
    walletName,
    balanceXlm,
    isConnecting,
    isDemoWallet,
    connectWithStellarKit,
    connectDemoWallet,
    disconnect,
    refreshBalance
  } = useWalletStore();

  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConnectFreighter = async () => {
    const success = await connectWithStellarKit();
    if (success) {
      onClose();
    }
  };

  const handleConnectDemo = () => {
    connectDemoWallet();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-card p-6 shadow-2xl border border-border z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Stellar Web3 Wallet</h3>
                  <p className="text-xs text-muted-foreground">Testnet Horizon Network</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Connected State */}
            {isConnected && publicKey ? (
              <div className="mt-5 space-y-4">
                <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Connected Account</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {isDemoWallet ? 'Testnet Demo' : walletName || 'Stellar Wallet'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-background border border-border">
                    <span className="font-mono text-xs text-foreground truncate">{publicKey}</span>
                    <button
                      onClick={handleCopy}
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
                      title="Copy Public Key"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <div className="text-xs text-muted-foreground">Balance</div>
                      <div className="text-xl font-extrabold text-foreground">{balanceXlm.toLocaleString('en-US', { minimumFractionDigits: 2 })} XLM</div>
                    </div>
                    <button
                      onClick={() => refreshBalance()}
                      className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Sync
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground p-2 rounded-lg bg-muted/30">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Stellar Horizon Testnet
                  </span>
                  <a
                    href={`https://stellar.expert/explorer/testnet/account/${publicKey}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    Explorer <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={disconnect}
                    className="w-full py-2.5 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 font-medium text-sm transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              /* Disconnected / Connect Options */
              <div className="mt-5 space-y-3">
                <p className="text-xs text-muted-foreground">
                  Connect your Stellar wallet using StellarWalletsKit v2 to pledge XLM or manage campaign funds on Testnet.
                </p>

                {/* Main Option 1: StellarWalletsKit (Freighter / Wallet Connect) */}
                <button
                  onClick={handleConnectFreighter}
                  disabled={isConnecting}
                  className="w-full group flex items-center justify-between p-3.5 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-primary/20 text-primary group-hover:scale-105 transition-transform">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">Stellar Wallets Kit</div>
                      <div className="text-xs text-muted-foreground">Freighter, Albedo, xBull & WalletConnect</div>
                    </div>
                  </div>
                  {isConnecting ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                  ) : (
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">Connect</span>
                  )}
                </button>

                {/* Option 2: Instant Demo Wallet */}
                <button
                  onClick={handleConnectDemo}
                  className="w-full group flex items-center justify-between p-3.5 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">Instant Demo Wallet (Testnet)</div>
                      <div className="text-xs text-muted-foreground">Pre-funded with 5,000 XLM for testing</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-foreground bg-muted px-2 py-1 rounded-md">1-Click</span>
                </button>

                <div className="pt-2 text-center">
                  <a
                    href="https://laboratory.stellar.org/#account-creator?network=testnet"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    Need testnet XLM tokens? Stellar Faucet <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
