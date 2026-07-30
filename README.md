# SparkFund - Web3 Crowdfunding Platform

***Home Screen***
<img width="998" height="638" alt="image" src="https://github.com/user-attachments/assets/26241f59-8691-4276-aa3a-e336ae15a048" />
<img width="1003" height="635" alt="image" src="https://github.com/user-attachments/assets/58d84369-b351-464c-af73-66262a0be3df" />

SparkFund is a 3-page Web3 crowdfunding platform built on **Next.js 15**, **Tailwind CSS**, and **Stellar Web3 Horizon Testnet**. Inspired by Kickstarter and GoFundMe, SparkFund enables visionaries to launch innovative hardware, green tech, and Web3 campaigns with 3-second instant pledge settlement and zero platform cut.

---

## Key Features

### 1. Page 1: Discover Landing
- **Hero Spotlight**: Large featured banner showcasing trending innovations with real-time progress bars and milestone indicators.
- **Search & Category Filtering**: Filter campaigns across Tech & Innovation, Eco & Green, Creative & Arts, Gaming, and Web3 & AI.
- **Platform Analytics Ticker**: Live stats tracking total funds raised, total backers, success rate, and Stellar settlement speed.
- **Multi-Sort Modes**: Sort campaigns by Most Backers, Most Funded, Ending Soon, and Newest.

### 2. Page 2: Campaign Page
- **Immersive Trailer Player**: Embedded campaign video trailer with image gallery previews.
- **Rich Story & Milestones**: Detailed long-form story section, project milestones, FAQs, and creator bio with verification badge.
- **Backer Wall**: Live feed of recent pledges with Stellar Horizon Testnet transaction hash links (`stellar.expert`).
- **Sticky Reward Tiers**: Interactive right sidebar (bottom drawer on mobile) to pledge custom amounts or back specific reward tiers.
- **Celebration Confetti**: Dynamic particle celebration upon successful pledge confirmation.

### 3. Page 3: Creator Dashboard
- **Bento Stats Architecture**: Real-time funds raised, total backer count, funding progress, and Stellar payout destination.
- **Daily Funding Velocity**: Visual 7-day backing distribution chart.
- **Creator Broadcast Updates**: Form allowing campaign owners to publish live updates directly to their backers.
- **Backer Registry & CSV Export**: Searchable backer table with 1-click CSV download for fulfillment.
- **Launch Campaign Modal**: 2-minute setup to publish new campaigns to the platform.

---

## Web3 & Stellar Wallet Integration

- **StellarWalletsKit v2 API**: Wallet connection support for **Freighter**, Albedo, xBull, and WalletConnect via static `StellarWalletsKit.init()` and `StellarWalletsKit.authModal()` calls.
- **Instant Demo Wallet**: 1-click testnet wallet pre-funded with **5,000 XLM** so any user can test backing campaigns immediately without browser extensions.
- **Stellar Horizon Testnet**: Built with `@stellar/stellar-sdk` for submitting real-time transactions to the Stellar Testnet Horizon node.
- **Zustand Global State**: Persistent wallet state and campaign storage across browser reloads.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4, Semantic CSS variables (`--background`, `--foreground`, `--card`, `--primary`)
- **Theme**: System-connected Light and Dark mode using `next-themes`
- **Animations**: Framer Motion (`motion/react`) for page transitions and micro-interactions
- **Web3 Engine**: `@creit.tech/stellar-wallets-kit`, `@stellar/stellar-sdk`
- **State Management**: `zustand` with persistence
- **Icons**: Lucide React

---

## Getting Started

### Prerequisites
- Node.js 18+ and `npm`

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/sparkfund.git

# Navigate into the project
cd sparkfund

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Smart Contract Details
Deployed Contract Address: CADRMCVMLN2GYJFW4ZFO3O3DWIBF24MFKZKNUZKJD63PJIHFZ5DFBWOC
Transaction hash of a contract call: 81fa43fe32fb0a9838b7852f00f2aab8fa18b165460bb49f20ebc030ca7a7789
---

### Transaction Flow
The application successfully handles end-to-end user transactions. The frontend UI implements real-time ledger listening so the Transaction Status Visible to the user is always accurate via Loaders/Alerts.

### Contract Call (Frontend to Soroban)
The frontend successfully executes a Contract Call (Frontend to Soroban) to securely interact with the deployed smart contract on the blockchain.
