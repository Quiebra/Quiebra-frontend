'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserStore } from '@/store/useUser'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Wallet, Coins, TrendingUp, RefreshCw } from 'lucide-react'

export default function PortfolioPage() {
  const { 
    evmAddress, 
    solanaAddress, 
    evmBalances, 
    solanaBalances,
    updateEvmBalances,
    updateSolanaBalances 
  } = useUserStore()
  
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for demonstration - in real app, fetch from blockchain
  const mockEvmBalances = [
    { symbol: 'ETH', balance: '2.5', decimals: 18, address: '0x...' },
    { symbol: 'USDC', balance: '1000', decimals: 6, address: '0x...' },
    { symbol: 'PEPE', balance: '1000000', decimals: 18, address: '0x...' },
  ]

  const mockSolanaBalances = [
    { symbol: 'SOL', balance: '5.2', decimals: 9, mint: 'So11111111111111111111111111111111111111112' },
    { symbol: 'USDC', balance: '500', decimals: 6, mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
  ]

  const refreshBalances = async () => {
    setIsLoading(true)
    
    // Simulate API calls
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update with mock data
    updateEvmBalances(mockEvmBalances)
    updateSolanaBalances(mockSolanaBalances)
    
    setIsLoading(false)
  }

  useEffect(() => {
    if (evmAddress || solanaAddress) {
      refreshBalances()
    }
  }, [evmAddress, solanaAddress])

  const formatBalance = (balance: string, decimals: number) => {
    const num = parseFloat(balance) / Math.pow(10, decimals)
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    })
  }

  const formatUSDValue = (balance: string, decimals: number, symbol: string) => {
    // Mock USD values - in real app, fetch from price APIs
    const prices: Record<string, number> = {
      ETH: 3000,
      USDC: 1,
      PEPE: 0.000001,
      SOL: 100,
    }
    
    const num = parseFloat(balance) / Math.pow(10, decimals)
    const price = prices[symbol] || 0
    const value = num * price
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Portfolio Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View your cross-chain token balances and track your investments across EVM and Solana networks.
          </p>
        </div>

        {/* Wallet Connection Status */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-blue-600" />
                <CardTitle>EVM Wallet</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {evmAddress ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Connected</p>
                  <p className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    {shortenAddress(evmAddress)}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Not connected</p>
                  <ConnectButton />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Coins className="h-5 w-5 text-green-600" />
                <CardTitle>Solana Wallet</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {solanaAddress ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Connected</p>
                  <p className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    {shortenAddress(solanaAddress)}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Not connected</p>
                  <WalletMultiButton />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center mb-8">
          <Button 
            onClick={refreshBalances} 
            disabled={isLoading || (!evmAddress && !solanaAddress)}
            variant="outline"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Balances
              </>
            )}
          </Button>
        </div>

        {/* Balances */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* EVM Balances */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle>EVM Balances</CardTitle>
                    <CardDescription>Base, Optimism, Mainnet</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {evmAddress ? (
                evmBalances.length > 0 ? (
                  <div className="space-y-4">
                    {evmBalances.map((token, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">{token.symbol}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatBalance(token.balance, token.decimals)} {token.symbol}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {formatUSDValue(token.balance, token.decimals, token.symbol)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No tokens found
                  </p>
                )
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Connect your EVM wallet to view balances
                </p>
              )}
            </CardContent>
          </Card>

          {/* Solana Balances */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Coins className="h-5 w-5 text-green-600" />
                  <div>
                    <CardTitle>Solana Balances</CardTitle>
                    <CardDescription>Mainnet</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {solanaAddress ? (
                solanaBalances.length > 0 ? (
                  <div className="space-y-4">
                    {solanaBalances.map((token, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">{token.symbol}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatBalance(token.balance, token.decimals)} {token.symbol}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {formatUSDValue(token.balance, token.decimals, token.symbol)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No tokens found
                  </p>
                )
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Connect your Solana wallet to view balances
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Summary */}
        {(evmAddress || solanaAddress) && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <CardTitle>Portfolio Summary</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {evmBalances.length + solanaBalances.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Tokens</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      $8,250.00
                    </div>
                    <div className="text-sm text-gray-600">Total Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      +12.5%
                    </div>
                    <div className="text-sm text-gray-600">24h Change</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
} 