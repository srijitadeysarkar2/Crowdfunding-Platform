'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DiscoverView } from '@/components/DiscoverView';
import { CampaignView } from '@/components/CampaignView';
import { DashboardView } from '@/components/DashboardView';
import { NewCampaignModal } from '@/components/NewCampaignModal';
import { useCampaignStore } from '@/lib/store';

export default function Page() {
  const { currentView } = useCampaignStore();
  const [isNewCampaignModalOpen, setIsNewCampaignModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      
      {/* Global Navigation Header */}
      <Navbar onOpenNewCampaignModal={() => setIsNewCampaignModalOpen(true)} />

      {/* Main View Area with Framer Motion transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {currentView === 'discover' && (
              <DiscoverView onOpenNewCampaignModal={() => setIsNewCampaignModalOpen(true)} />
            )}
            {currentView === 'campaign' && <CampaignView />}
            {currentView === 'dashboard' && (
              <DashboardView onOpenNewCampaignModal={() => setIsNewCampaignModalOpen(true)} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* New Campaign Launch Modal */}
      <NewCampaignModal
        isOpen={isNewCampaignModalOpen}
        onClose={() => setIsNewCampaignModalOpen(false)}
      />
    </div>
  );
}
