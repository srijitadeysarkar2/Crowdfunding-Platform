import { Campaign } from './types';

export const INITIAL_CAMPAIGN_DATA: Campaign[] = [
  {
    id: 'aura-sound-x1',
    title: 'AuraSound X1 - AI Spatial ANC Headphones',
    tagline: 'Experience zero-latency neural spatial audio with modular organic bamboo drivers and 60-hour active battery.',
    description: `### Sound Redefined by Neural Acoustics

Meet the **AuraSound X1**, the world's first open-architecture headphones powered by custom neural audio processing. Built for sound engineers, gamers, and audiophiles who demand uncompromising clarity and sustainable craftsmanship.

#### Key Breakthroughs:
1. **Bio-Cellulose Bamboo Drivers**: Harvested from sustainable bamboo forests, offering crisp ultra-highs (up to 45kHz) and warm sub-bass without harmonic distortion.
2. **On-Chip Gemini Spatial Engine**: Real-time room acoustics scanning via quad MEMS microphones adjusts EQ 2,000 times per second.
3. **Decentralized Warranty & Ownership**: Each pair is tied to a Stellar Testnet Proof-of-Craft NFT, giving you lifetime firmware updates and access to lossless sound presets created by top Grammy-winning producers.

#### Sustainable Engineering
Every pair of AuraSound X1 is crafted with 100% recycled aluminum casing and memory foam earpads wrapped in vegan pineapple leather (Piñatex). Parts are fully magnetic and field-replaceable with a standard screwdriver.

#### Timeline & Delivery
* **August 2026**: Tooling & Final Prototype Verification
* **October 2026**: Mass Assembly & Horizon Smart Contract Verification
* **November 2026**: Global Express Shipping to Early Backers`,
    category: 'Tech & Innovation',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    goalUsd: 50000,
    goalXlm: 250000,
    raisedUsd: 43250,
    raisedXlm: 216250,
    backerCount: 384,
    daysLeft: 14,
    endDate: '2026-08-10',
    creator: {
      name: 'Elena Vance & Aura Dynamics',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Acoustic engineers and hardware designers based in San Francisco and Zurich.',
      stellarAddress: 'GDC4S2...AURASOUND',
      verified: true,
      location: 'San Francisco, CA',
      successfulCampaigns: 3
    },
    stellarDestination: 'GAURASOUNDTESTNET2026PUBLICKEYDESTINATION',
    createdAt: '2026-07-01',
    milestones: [
      { percentage: 25, title: 'Prototype Validation Completed', achieved: true },
      { percentage: 50, title: 'Custom Travel Case Included for All Backers', achieved: true },
      { percentage: 75, title: 'Gold-Plated 4.4mm Balanced Cable Unlock', achieved: true },
      { percentage: 100, title: 'Custom Colorway Selection (Midnight Green / Obsidian)', achieved: false }
    ],
    tiers: [
      {
        id: 'tier-early-bird',
        title: 'Super Early Bird - AuraSound X1',
        amountUsd: 189,
        amountXlm: 945,
        description: 'Save $110 off retail price! Includes the AuraSound X1 Headphones in Obsidian Black.',
        items: ['AuraSound X1 Headphones', 'Hard Shell Travel Case', 'Braided USB-C Lossless Cable', 'Stellar Backer NFT', '2-Year Full Warranty'],
        estimatedDelivery: 'November 2026',
        shippingInfo: 'Free Worldwide Express Shipping',
        backersCount: 150,
        limit: 150,
        badge: 'Sold Out'
      },
      {
        id: 'tier-vip-backer',
        title: 'VIP Backer Edition + Custom Engraving',
        amountUsd: 249,
        amountXlm: 1245,
        description: 'Includes Laser-engraved aluminum headband with your name or custom text, plus signature tuning presets.',
        items: ['AuraSound X1 Headphones (VIP Engraved)', 'Magnetic Leather Case', '4.4mm Balanced Audio Cable', 'Lifetime Lossless Preset Pass', 'Stellar Collector Badge'],
        estimatedDelivery: 'October 2026',
        shippingInfo: 'Worldwide Express',
        backersCount: 182,
        limit: 250,
        badge: 'Most Popular'
      },
      {
        id: 'tier-studio-pack',
        title: 'Developer & Studio Dual Pack',
        amountUsd: 450,
        amountXlm: 2250,
        description: 'Get two AuraSound X1 units and access to our Open-Source Neural Audio SDK for custom firmware development.',
        items: ['2x AuraSound X1 Headphones', 'Neural Audio SDK Access Key', 'Direct 1-on-1 Engineering Support Call', 'All Stretch Goal Accessories'],
        estimatedDelivery: 'October 2026',
        shippingInfo: 'Worldwide Express',
        backersCount: 52,
        limit: 100,
        badge: 'Developer Choice'
      }
    ],
    updates: [
      {
        id: 'up-1',
        title: '🎉 85% Funded in 12 Days! Stretch Goal #3 Unlocked!',
        date: 'July 20, 2026',
        author: 'Elena Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        content: 'We are thrilled by the overwhelming support from our incredible community! Thanks to your pledges, we have unlocked the Gold-Plated 4.4mm Balanced Cable for all VIP tiers. Production samples are currently passing final acoustic tests in Zurich.',
        likes: 128,
        isPublic: true
      },
      {
        id: 'up-2',
        title: '🔬 Acoustic Testing Lab Video & Frequency Response Graph',
        date: 'July 10, 2026',
        author: 'Elena Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        content: 'Check out our latest anechoic chamber test results comparing AuraSound X1 against standard studio monitors. The bio-cellulose drivers demonstrated 0.02% THD at 100dB SPL!',
        likes: 94,
        isPublic: true
      }
    ],
    backers: [
      {
        id: 'b-1',
        name: 'Alexander Wright',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        amountUsd: 249,
        amountXlm: 1245,
        tierId: 'tier-vip-backer',
        tierTitle: 'VIP Backer Edition + Custom Engraving',
        timestamp: '2 hours ago',
        txHash: '0x8f3a92b...e41c',
        paymentMethod: 'STELLAR_TESTNET'
      },
      {
        id: 'b-2',
        name: 'Sophia Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        amountUsd: 450,
        amountXlm: 2250,
        tierId: 'tier-studio-pack',
        tierTitle: 'Developer & Studio Dual Pack',
        timestamp: '5 hours ago',
        txHash: '0x2a18f91...c99b',
        paymentMethod: 'STELLAR_TESTNET'
      },
      {
        id: 'b-3',
        name: 'Marcus Brody',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
        amountUsd: 189,
        amountXlm: 945,
        tierId: 'tier-early-bird',
        tierTitle: 'Super Early Bird - AuraSound X1',
        timestamp: '1 day ago',
        txHash: '0x712a4b0...12ed',
        paymentMethod: 'DEMO_WALLET'
      }
    ]
  },
  {
    id: 'solarpunk-garden',
    title: 'SolarPulse - Autonomous Vertical Hydroponic Pods',
    tagline: 'Grow fresh organic microgreens, herbs, and strawberries indoors with solar micro-turbines and AI climate control.',
    description: `### Fresh Food Security in Any Apartment

SolarPulse is a modular, ultra-quiet vertical indoor farming pod that uses 95% less water than traditional agriculture while producing up to 10 lbs of fresh food per month.

#### How It Works:
* **Solar-Harvesting Glass Panel**: Captures ambient light to power internal LED spectra.
* **Nutrient-Loop Automation**: Built-in water recirculation with auto-dosing sensors.
* **Companion App Integration**: Real-time harvest alerts and growth telemetry synced directly to your dashboard.`,
    category: 'Eco & Green',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'
    ],
    goalUsd: 30000,
    goalXlm: 150000,
    raisedUsd: 34800,
    raisedXlm: 174000,
    backerCount: 215,
    daysLeft: 8,
    endDate: '2026-08-04',
    creator: {
      name: 'BioGrid Labs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Clean tech engineers and urban permaculture pioneers.',
      stellarAddress: 'GCOL...SOLAR',
      verified: true,
      location: 'Portland, OR',
      successfulCampaigns: 2
    },
    stellarDestination: 'GSOLARPULSE2026TESTNETKEY',
    createdAt: '2026-07-05',
    milestones: [
      { percentage: 50, title: 'Energy Efficiency Certification', achieved: true },
      { percentage: 100, title: 'Organic Starter Seed Pack for All Backers', achieved: true }
    ],
    tiers: [
      {
        id: 'tier-sp-pod',
        title: 'SolarPulse Single Pod Kit',
        amountUsd: 149,
        amountXlm: 745,
        description: 'Includes 1 SolarPulse Pod, 6 organic seed pucks, and 1-year plant food supply.',
        items: ['SolarPulse Hydroponic Pod', 'Organic Heirloom Seeds (6 packs)', 'AI Growth Sensor Hub', '1-Year Organic Nutrient Pack'],
        estimatedDelivery: 'December 2026',
        shippingInfo: 'Ships to US, EU, and Canada',
        backersCount: 180,
        limit: 300,
        badge: 'Trending'
      }
    ],
    updates: [
      {
        id: 'up-sp-1',
        title: '🌱 100% Goal Reached! Micro-nutrients Unlocked!',
        date: 'July 18, 2026',
        author: 'BioGrid Team',
        content: 'We reached our funding goal in under 2 weeks! Every backer will now receive our heirloom strawberry pod pack for free.',
        likes: 67,
        isPublic: true
      }
    ],
    backers: []
  },
  {
    id: 'nexus-vr-tactile',
    title: 'Nexus Glove - Haptic VR Force-Feedback Gloves',
    tagline: 'Feel physical resistance, texture, and temperature in virtual reality and spatial computing with micro-fluidic actuators.',
    description: `### Feel the Virtual World as if It Were Real

Nexus Glove brings true physical touch to virtual gaming, 3D modeling, and medical robotics. Engineered with micro-pneumatic artificial muscle tendons, each finger experiences dynamic force feedback up to 40 Newtons.`,
    category: 'Gaming',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80'
    ],
    goalUsd: 80000,
    goalXlm: 400000,
    raisedUsd: 62400,
    raisedXlm: 312000,
    backerCount: 142,
    daysLeft: 21,
    endDate: '2026-08-17',
    creator: {
      name: 'Nexus Haptics',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'Robotics researchers and former aerospace control engineers.',
      stellarAddress: 'GNEXUS...HAPTIC',
      verified: true,
      location: 'Tokyo & Austin',
      successfulCampaigns: 1
    },
    stellarDestination: 'GNEXUSHAPTIC2026TESTNETKEY',
    createdAt: '2026-07-10',
    milestones: [
      { percentage: 25, title: 'Unity & Unreal SDK Beta', achieved: true },
      { percentage: 75, title: 'SteamVR Native Plugin Integration', achieved: true }
    ],
    tiers: [
      {
        id: 'tier-nexus-pair',
        title: 'Nexus Glove Developer Pair',
        amountUsd: 399,
        amountXlm: 1995,
        description: 'Full pair of left & right haptic gloves with Bluetooth 5.3 ultra-low-latency receiver.',
        items: ['Left & Right Nexus Haptic Gloves', 'Low-latency Receiver Dongle', 'SteamVR & OpenXR SDK', 'Custom Hard Storage Case'],
        estimatedDelivery: 'January 2027',
        shippingInfo: 'Worldwide Shipping',
        backersCount: 142,
        limit: 500,
        badge: 'High Performance'
      }
    ],
    updates: [],
    backers: []
  },
  {
    id: 'chronos-analog-synth',
    title: 'Chronos Modular Analog Synthesizer & Sequencer',
    tagline: 'Hand-assembled Eurorack synth with discrete transistor ladders, warm vacuum tube overdrive, and Web3 preset sharing.',
    description: `### Timeless Warmth Meets Modern Intelligence

Chronos combines vintage analog signal paths with modern digital modulation matrixing. Create cosmic soundscapes, rich basslines, and organic textures with pure electronic voltage.`,
    category: 'Creative & Arts',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
    ],
    goalUsd: 25000,
    goalXlm: 125000,
    raisedUsd: 28900,
    raisedXlm: 144500,
    backerCount: 188,
    daysLeft: 5,
    endDate: '2026-08-01',
    creator: {
      name: 'Klaus Electro-Acoustics',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      bio: 'Berlin-based synthesizer artisan and sound designer.',
      stellarAddress: 'GKLAUS...SYNTH',
      verified: true,
      location: 'Berlin, Germany',
      successfulCampaigns: 4
    },
    stellarDestination: 'GCHRONOSSYNTH2026TESTNETKEY',
    createdAt: '2026-06-28',
    milestones: [
      { percentage: 100, title: 'Goal Exceeded! Free Patch Cables Included', achieved: true }
    ],
    tiers: [
      {
        id: 'tier-chronos-full',
        title: 'Chronos Modular Unit - Assembled',
        amountUsd: 320,
        amountXlm: 1600,
        description: 'Complete fully tested Chronos synth unit in solid walnut wood enclosure.',
        items: ['Chronos Synthesizer', '20x Braided Patch Cables', 'Universal Power Adapter', 'Artisan Sound Patchbook'],
        estimatedDelivery: 'September 2026',
        shippingInfo: 'Worldwide Insured',
        backersCount: 120,
        limit: 150,
        badge: 'Limited Edition'
      }
    ],
    updates: [],
    backers: []
  },
  {
    id: 'stellar-identity-id',
    title: 'Self-Sovereign AI Agent Identity Network (SAID)',
    tagline: 'Decentralized protocol on Stellar enabling autonomous AI agents to hold verifiable credentials and execute micropayments.',
    description: `### Empowering the Next Billion AI Agents

SAID is an open protocol built on Stellar Testnet and Mainnet. It provides cryptographically secure identity keys and low-fee micro-escrow smart accounts for AI agents to negotiate tasks, compensate human creators, and verify dataset provenance transparently.`,
    category: 'Web3 & AI',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
    ],
    goalUsd: 100000,
    goalXlm: 500000,
    raisedUsd: 82500,
    raisedXlm: 412500,
    backerCount: 512,
    daysLeft: 19,
    endDate: '2026-08-15',
    creator: {
      name: 'Stellar Matrix DAO',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80',
      bio: 'Open-source Web3 security researchers and Stellar developers.',
      stellarAddress: 'GSAID...STELLARDAO',
      verified: true,
      location: 'Global Decentralized',
      successfulCampaigns: 5
    },
    stellarDestination: 'GSTELLARSAID2026TESTNETKEY',
    createdAt: '2026-07-02',
    milestones: [
      { percentage: 50, title: 'Smart Escrow Audit Passed', achieved: true },
      { percentage: 80, title: 'Python & TypeScript SDK Release', achieved: true }
    ],
    tiers: [
      {
        id: 'tier-said-node',
        title: 'Protocol Founding Node Membership',
        amountUsd: 100,
        amountXlm: 500,
        description: 'Receive 5,000 SAID Governance tokens on Stellar Testnet and early access to API keys.',
        items: ['5,000 SAID Testnet Tokens', 'Founding Validator Badge NFT', 'DAO Voting Portal Access', 'Priority API Rate Limits'],
        estimatedDelivery: 'Immediate Access',
        shippingInfo: 'Digital Delivery',
        backersCount: 410,
        limit: null,
        badge: 'Web3 Core'
      }
    ],
    updates: [],
    backers: []
  }
];
