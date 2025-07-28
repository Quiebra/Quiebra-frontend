# Quiebra Frontend

A modern, production-ready frontend for the Quiebra memecoin trading platform. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Memecoin Launchpad** - Create tokens with just a few clicks
- 📊 **Live Trading Dashboard** - Real-time price feeds and AI-driven trading
- 💼 **Cross-Chain Portfolio** - View balances across EVM and Solana networks
- 🔗 **Multi-Wallet Support** - RainbowKit (EVM) + Solana wallet adapters
- 🎨 **Modern UI** - Beautiful, responsive design with shadcn/ui components
- ⚡ **Type-Safe** - Full TypeScript support with Zod validation
- 🔄 **Real-Time Updates** - Live price polling and state management

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand + React Query
- **EVM Wallets**: RainbowKit + Wagmi
- **Solana Wallets**: @solana/wallet-adapter
- **Validation**: Zod
- **Blockchain**: Viem + Solana Web3.js

## Prerequisites

- Node.js 20+ 
- npm or yarn
- Mac OS (tested on zsh)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Quiebra-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Backend API URL
   NEXT_PUBLIC_API_URL=http://localhost:3001
   
   # WalletConnect Project ID
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
   
   # Blockchain RPC URLs
   NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
   NEXT_PUBLIC_OPTIMISM_RPC_URL=https://mainnet.optimism.io
   NEXT_PUBLIC_MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your_alchemy_key
   
   # Solana RPC URL
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   
   # Memecoin Factory Contract Address (Base testnet)
   NEXT_PUBLIC_MEMECOIN_FACTORY_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
Quiebra-frontend/
├── app/                    # Next.js 14 app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Landing page
│   ├── launchpad/         # Memecoin creation
│   ├── trade/             # Trading dashboard
│   ├── portfolio/         # Cross-chain portfolio
│   └── tokens/[address]/  # Token detail pages
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── PriceCard.tsx     # Price display component
│   ├── TokenCard.tsx     # Token information card
│   ├── TxToast.tsx       # Transaction notifications
│   └── Providers.tsx     # App providers wrapper
├── lib/                  # Utility libraries
│   ├── fetcher.ts        # Type-safe API client
│   ├── utils.ts          # Utility functions
│   └── wagmi-config.ts   # Wagmi configuration
├── store/                # State management
│   └── useUser.ts        # User state store
├── hooks/                # Custom React hooks
│   └── usePrices.ts      # Price polling hooks
└── env.example           # Environment variables template
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Backend Integration

This frontend integrates with the Quiebra backend API:

### Endpoints Used

- `GET /api/market/:symbol` - Live market data (BTC, ETH, SOL, HYPE)
- `POST /api/trade/cycle` - Trigger AI-driven trade cycle
- `POST /api/memecoin/create` - Create new memecoin
- `GET /api/memecoin/:address` - Get token metadata

### API Response Validation

All API responses are validated using Zod schemas in `lib/fetcher.ts`:

```typescript
// Example API call with type safety
const marketData = await api.getMarketData('BTC')
// marketData is fully typed as MarketData
```

## Wallet Integration

### EVM Wallets (RainbowKit)
- **Supported Chains**: Base, Optimism, Mainnet, Polygon, Arbitrum
- **Wallets**: MetaMask, WalletConnect, Coinbase Wallet, etc.

### Solana Wallets
- **Supported Wallets**: Phantom, Backpack
- **Network**: Mainnet

## Key Features

### 1. Memecoin Launchpad
- Create tokens with name, symbol, and supply
- Deploy directly to Base network
- Real-time transaction feedback

### 2. Live Trading Dashboard
- Real-time price feeds (5-second polling)
- AI-driven trading cycle execution
- Profit/loss tracking

### 3. Cross-Chain Portfolio
- View EVM and Solana balances
- Real-time balance updates
- Portfolio value calculations

### 4. Token Explorer
- Browse created memecoins
- View detailed token information
- Market data and statistics

## Development

### Adding New Components

1. Create component in `components/` directory
2. Use shadcn/ui base components from `components/ui/`
3. Follow TypeScript best practices
4. Add proper JSDoc comments

### State Management

- **Global State**: Use Zustand stores in `store/`
- **Server State**: Use React Query hooks in `hooks/`
- **Local State**: Use React useState/useReducer

### Styling

- Use Tailwind CSS classes
- Follow the design system in `app/globals.css`
- Use shadcn/ui components for consistency

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

1. Build the project: `npm run build`
2. Start production server: `npm run start`
3. Configure environment variables
4. Set up reverse proxy if needed

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | Yes |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `NEXT_PUBLIC_BASE_RPC_URL` | Base network RPC URL | Yes |
| `NEXT_PUBLIC_OPTIMISM_RPC_URL` | Optimism network RPC URL | Yes |
| `NEXT_PUBLIC_MAINNET_RPC_URL` | Ethereum mainnet RPC URL | Yes |
| `NEXT_PUBLIC_SOLANA_RPC_URL` | Solana RPC URL | Yes |
| `NEXT_PUBLIC_MEMECOIN_FACTORY_ADDRESS` | Memecoin factory contract address | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Join our community Discord

---

Built with ❤️ by the Quiebra team