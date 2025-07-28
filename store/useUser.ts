import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface TokenBalance {
  symbol: string
  balance: string
  decimals: number
  address?: string // For EVM tokens
  mint?: string // For Solana tokens
}

export interface UserState {
  // EVM wallet state
  evmAddress: string | null
  evmChainId: number | null
  evmBalances: TokenBalance[]
  
  // Solana wallet state
  solanaAddress: string | null
  solanaBalances: TokenBalance[]
  
  // Actions
  setEvmWallet: (address: string, chainId: number) => void
  setSolanaWallet: (address: string) => void
  updateEvmBalances: (balances: TokenBalance[]) => void
  updateSolanaBalances: (balances: TokenBalance[]) => void
  disconnectEvm: () => void
  disconnectSolana: () => void
  disconnectAll: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // Initial state
      evmAddress: null,
      evmChainId: null,
      evmBalances: [],
      solanaAddress: null,
      solanaBalances: [],
      
      // Actions
      setEvmWallet: (address: string, chainId: number) =>
        set({ evmAddress: address, evmChainId: chainId }),
      
      setSolanaWallet: (address: string) =>
        set({ solanaAddress: address }),
      
      updateEvmBalances: (balances: TokenBalance[]) =>
        set({ evmBalances: balances }),
      
      updateSolanaBalances: (balances: TokenBalance[]) =>
        set({ solanaBalances: balances }),
      
      disconnectEvm: () =>
        set({ 
          evmAddress: null, 
          evmChainId: null, 
          evmBalances: [] 
        }),
      
      disconnectSolana: () =>
        set({ 
          solanaAddress: null, 
          solanaBalances: [] 
        }),
      
      disconnectAll: () =>
        set({
          evmAddress: null,
          evmChainId: null,
          evmBalances: [],
          solanaAddress: null,
          solanaBalances: [],
        }),
    }),
    {
      name: 'quiebra-user-storage',
      partialize: (state) => ({
        evmAddress: state.evmAddress,
        evmChainId: state.evmChainId,
        solanaAddress: state.solanaAddress,
      }),
    }
  )
) 