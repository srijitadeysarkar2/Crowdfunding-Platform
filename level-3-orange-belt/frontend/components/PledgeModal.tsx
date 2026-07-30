'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Zap,
  ArrowRight,
  RefreshCw,
  Gift
} from 'lucide-react';
import { Campaign, RewardTier } from '@/lib/types';
import { useCampaignStore, useWalletStore } from '@/lib/store';
import { convertUsdToXlm, convertXlmToUsd, submitStellarPledgeTransaction, XLM_USD_RATE } from '@/lib/stellar';

interface PledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
  selectedTier: RewardTier | null;
}

export function PledgeModal({ isOpen, onClose, campaign, selectedTier }: PledgeModalProps) {
  const { addPledge } = useCampaignStore();
  const { isConnected, publicKey, balanceXlm, isDemoWallet, connectDemoWallet, deductBalance } = useWalletStore();

  const [prevTier, setPrevTier] = useState<RewardTier | null>(selectedTier);
  const [amountUsd, setAmountUsd] = useState<number>(selectedTier ? selectedTier.amountUsd : 25);
  const [currencyMode, setCurrencyMode] = useState<'USD' | 'XLM'>('XLM');
  const [backerName, setBackerName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>('');

  if (selectedTier !== prevTier) {
    setPrevTier(selectedTier);
    setAmountUsd(selectedTier ? selectedTier.amountUsd : 25);
    setIsSuccess(false);
  }

  const amountXlm = convertUsdToXlm(amountUsd);

  const handlePledgeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amountUsd <= 0) return;

    setIsSubmitting(true);

    try {
      let finalTxHash = '';
      let paymentMethod: 'STELLAR_TESTNET' | 'DEMO_WALLET' | 'CARD' = 'DEMO_WALLET';

      if (isConnected && publicKey && !isDemoWallet) {
        // Execute real Stellar Horizon Testnet transaction using Stellar SDK / Wallet
        const txResult = await submitStellarPledgeTransaction({
          senderPublicKey: publicKey,
          destinationPublicKey: campaign.stellarDestination,
          amountXlm,
          memo: `Pledge: ${campaign.title.slice(0, 15)}`
        });
        finalTxHash = txResult.hash || `st_${Date.now()}`;
        paymentMethod = 'STELLAR_TESTNET';
        deductBalance(amountXlm);
      } else {
        // Instant Demo wallet execution
        if (!isConnected) {
          connectDemoWallet();
        }
        finalTxHash = `tx_testnet_${Math.random().toString(36).substring(2, 10)}`;
        paymentMethod = 'DEMO_WALLET';
        deductBalance(amountXlm);
      }

      // Record pledge in campaign store
      addPledge(
        campaign.id,
        amountUsd,
        amountXlm,
        selectedTier ? selectedTier.id : null,
        backerName || (publicKey ? `Stellar Backer ${publicKey.slice(-4)}` : 'Anonymous Supporter'),
        paymentMethod,
        finalTxHash
      );

      setTxHash(finalTxHash);
      setIsSuccess(true);
      setIsSubmitting(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback silently if confetti encounters environment constraints
      }
    } catch (err) {
      console.error('Pledge submission failed:', err);
      setIsSubmitting(false);
    }
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
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-card p-6 shadow-2xl border border-border z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif-editorial italic font-normal text-foreground">Back This Campaign</h3>
                  <p className="text-xs text-muted-foreground truncate max-w-[260px]">{campaign.title}</p>
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

            {/* Success View */}
            {isSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>

                <div>
                  <h4 className="text-2xl font-black text-foreground">Pledge Confirmed! 🎉</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Thank you for empowering innovation on SparkFund.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/60 border border-border text-left space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount Pledged:</span>
                    <span className="font-bold text-foreground">{amountXlm} XLM (${amountUsd} USD)</span>
                  </div>
                  {selectedTier && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reward Tier:</span>
                      <span className="font-medium text-emerald-500">{selectedTier.title}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="text-muted-foreground">Transaction Hash:</span>
                    <span className="font-mono text-[11px] text-primary truncate max-w-[180px]">{txHash}</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:brightness-110 transition-all"
                >
                  Return to Campaign
                </button>
              </div>
            ) : (
              /* Form View */
              <form onSubmit={handlePledgeSubmit} className="mt-5 space-y-5">
                
                {/* Selected Tier Banner */}
                {selectedTier ? (
                  <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3">
                    <Gift className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        Selected Reward Tier
                      </div>
                      <div className="font-bold text-sm text-foreground">{selectedTier.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Minimum ${selectedTier.amountUsd} (${selectedTier.amountXlm} XLM) • Delivery: {selectedTier.estimatedDelivery}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-muted/50 border border-border text-xs text-muted-foreground">
                    💡 Making a custom pledge without a reward tier.
                  </div>
                )}

                {/* Amount Input & Currency Switcher */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-foreground">Select Pledge Amount</label>
                    <div className="flex bg-muted p-0.5 rounded-lg border border-border">
                      <button
                        type="button"
                        onClick={() => setCurrencyMode('XLM')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                          currencyMode === 'XLM' ? 'bg-primary text-primary-foreground shadow-xs' : 'text-muted-foreground'
                        }`}
                      >
                        XLM (Stellar)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrencyMode('USD')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                          currencyMode === 'USD' ? 'bg-primary text-primary-foreground shadow-xs' : 'text-muted-foreground'
                        }`}
                      >
                        USD ($)
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                      {currencyMode === 'XLM' ? 'XLM' : '$'}
                    </span>
                    <input
                      type="number"
                      min={selectedTier ? (currencyMode === 'XLM' ? selectedTier.amountXlm : selectedTier.amountUsd) : 1}
                      value={currencyMode === 'XLM' ? amountXlm : amountUsd}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        if (currencyMode === 'XLM') {
                          setAmountUsd(convertXlmToUsd(val));
                        } else {
                          setAmountUsd(val);
                        }
                      }}
                      className="w-full pl-14 pr-4 py-3 rounded-xl bg-muted/60 border border-border font-extrabold text-lg text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground px-1">
                    <span>
                      Equivalent: {currencyMode === 'XLM' ? `$${amountUsd} USD` : `${amountXlm} XLM`}
                    </span>
                    <span>1 XLM ≈ ${XLM_USD_RATE.toFixed(2)} USD</span>
                  </div>
                </div>

                {/* Backer Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Backer Display Name (Optional)</label>
                  <input
                    type="text"
                    placeholder={publicKey ? `Stellar Account ${publicKey.slice(0, 6)}...` : 'e.g. Satoshi N.'}
                    value={backerName}
                    onChange={(e) => setBackerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-muted/60 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Payment Channel Indicator */}
                <div className="p-3.5 rounded-xl bg-card border border-border space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Payment Network
                    </span>
                    <span className="text-emerald-500 font-medium">Stellar Testnet Horizon</span>
                  </div>

                  {isConnected ? (
                    <div className="flex justify-between text-xs text-muted-foreground pt-1 border-t border-border/50">
                      <span>Connected Wallet Balance:</span>
                      <span className="font-bold text-foreground">{balanceXlm.toFixed(2)} XLM</span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-muted-foreground">
                      * Auto-connects instant Testnet Demo Wallet if no wallet extension is attached.
                    </div>
                  )}
                </div>

                {/* Action Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Signing & Submitting to Stellar...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Confirm Pledge of {amountXlm} XLM</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
