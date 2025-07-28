import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/fetcher'
import type { MarketData } from '@/lib/fetcher'

const SUPPORTED_SYMBOLS = ['BTC', 'ETH', 'SOL', 'HYPE'] as const
type SupportedSymbol = typeof SUPPORTED_SYMBOLS[number]

// Hook for individual symbol price
export function usePrice(symbol: SupportedSymbol) {
  return useQuery({
    queryKey: ['price', symbol],
    queryFn: () => api.getMarketData(symbol),
    refetchInterval: 5000, // Poll every 5 seconds
    refetchIntervalInBackground: true,
    staleTime: 0, // Always consider data stale to ensure fresh prices
    gcTime: 1000 * 60 * 5, // Keep in cache for 5 minutes
  })
}

// Hook for all supported symbols
export function useAllPrices() {
  return useQuery({
    queryKey: ['prices', 'all'],
    queryFn: async () => {
      const promises = SUPPORTED_SYMBOLS.map(symbol => 
        api.getMarketData(symbol).catch(error => {
          console.error(`Failed to fetch ${symbol} price:`, error)
          return null
        })
      )
      
      const results = await Promise.all(promises)
      const prices: Record<SupportedSymbol, MarketData | null> = {
        BTC: results[0],
        ETH: results[1],
        SOL: results[2],
        HYPE: results[3],
      }
      
      return prices
    },
    refetchInterval: 5000, // Poll every 5 seconds
    refetchIntervalInBackground: true,
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
  })
}

// Hook for trade cycle
export function useTradeCycle() {
  return useQuery({
    queryKey: ['trade', 'cycle'],
    queryFn: () => api.triggerTradeCycle(),
    enabled: false, // Don't run automatically
    retry: false, // Don't retry on failure
  })
} 