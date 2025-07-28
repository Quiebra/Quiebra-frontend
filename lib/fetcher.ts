import { z } from 'zod'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Zod schemas for API responses
export const TradeCycleResponseSchema = z.object({
  success: z.boolean(),
  trades: z.array(z.string()).optional(),
  error: z.string().optional(),
})

export const PriceUpdateResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
})

export const ModelStateResponseSchema = z.object({
  state: z.any(), // Adjust based on your actual model state structure
})

// Mock schemas for features not yet implemented in backend
export const MarketDataSchema = z.object({
  symbol: z.string(),
  price: z.number(),
  change24h: z.number(),
  volume24h: z.number(),
  timestamp: z.number(),
})

export const MemecoinCreateResponseSchema = z.object({
  success: z.boolean(),
  tokenAddress: z.string(),
  txHash: z.string(),
  name: z.string(),
  symbol: z.string(),
  supply: z.string(),
})

export const MemecoinMetadataSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  supply: z.string(),
  owner: z.string(),
  price: z.number().optional(),
  marketCap: z.number().optional(),
})

export type TradeCycleResponse = z.infer<typeof TradeCycleResponseSchema>
export type PriceUpdateResponse = z.infer<typeof PriceUpdateResponseSchema>
export type ModelStateResponse = z.infer<typeof ModelStateResponseSchema>
export type MarketData = z.infer<typeof MarketDataSchema>
export type MemecoinCreateResponse = z.infer<typeof MemecoinCreateResponseSchema>
export type MemecoinMetadata = z.infer<typeof MemecoinMetadataSchema>

// Generic fetcher function with zod validation
export async function fetcher<T>(
  endpoint: string,
  schema: z.ZodSchema<T>,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.message}`)
    }
    throw error
  }
}

// Mock data for features not yet implemented
const mockMarketData: Record<string, MarketData> = {
  BTC: {
    symbol: 'BTC',
    price: 45000,
    change24h: 2.5,
    volume24h: 25000000000,
    timestamp: Date.now(),
  },
  ETH: {
    symbol: 'ETH',
    price: 2800,
    change24h: -1.2,
    volume24h: 15000000000,
    timestamp: Date.now(),
  },
  SOL: {
    symbol: 'SOL',
    price: 95,
    change24h: 5.8,
    volume24h: 2000000000,
    timestamp: Date.now(),
  },
  HYPE: {
    symbol: 'HYPE',
    price: 0.00015,
    change24h: 12.3,
    volume24h: 500000,
    timestamp: Date.now(),
  },
}

// Specific API functions
export const api = {
  // Trade cycle (actual backend endpoint)
  triggerTradeCycle: () =>
    fetcher('/api/trade/cycle', TradeCycleResponseSchema, {
      method: 'POST',
    }),

  // Price update (actual backend endpoint)
  updatePrices: () =>
    fetcher('/api/price/update', PriceUpdateResponseSchema, {
      method: 'POST',
    }),

  // Model state (actual backend endpoint)
  getModelState: () =>
    fetcher('/api/model/state', ModelStateResponseSchema),

  // Mock market data (for now, until backend implements these)
  getMarketData: (symbol: string) => {
    return new Promise<MarketData>((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        const data = mockMarketData[symbol]
        if (data) {
          resolve(data)
        } else {
          throw new Error(`Symbol ${symbol} not found`)
        }
      }, 100)
    })
  },

  // Mock memecoin functions (for now)
  createMemecoin: (data: { name: string; symbol: string; supply: string }) => {
    return new Promise<MemecoinCreateResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          tokenAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
          txHash: `0x${Math.random().toString(16).slice(2, 66)}`,
          name: data.name,
          symbol: data.symbol,
          supply: data.supply,
        })
      }, 2000)
    })
  },

  getMemecoinMetadata: (address: string) => {
    return new Promise<MemecoinMetadata>((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Mock Token',
          symbol: 'MOCK',
          supply: '1000000000',
          owner: `0x${Math.random().toString(16).slice(2, 42)}`,
          price: 0.000001,
          marketCap: 1000,
        })
      }, 500)
    })
  },
} 