'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PriceCard } from '@/components/PriceCard'
import { TxToast } from '@/components/TxToast'
import { useAllPrices, useTradeCycle } from '@/hooks/usePrices'
import { Play, Loader2, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'

export default function TradePage() {
  const [isRunningCycle, setIsRunningCycle] = useState(false)
  const { data: prices, isLoading: pricesLoading, error: pricesError } = useAllPrices()
  const { refetch: runTradeCycle } = useTradeCycle()

  const handleRunCycle = async () => {
    setIsRunningCycle(true)
    
    try {
      const result = await runTradeCycle()
      
      if (result.data?.success) {
        toast.success('Trade cycle completed successfully!')
        
        // Show detailed toast with results
        const tradeLog = result.data.trades?.join('\n') || 'No trade details available'
        toast.custom((t) => (
          <TxToast
            success={true}
            message={`Trade cycle completed! Check console for details.`}
            onCopy={() => {
              navigator.clipboard.writeText(tradeLog)
              toast.success('Trade log copied!')
            }}
            onView={() => console.log('Trade Log:', tradeLog)}
          />
        ), { duration: 10000 })
      } else {
        toast.error(result.data?.error || 'Trade cycle failed')
      }
    } catch (error) {
      console.error('Error running trade cycle:', error)
      toast.error('Failed to run trade cycle. Please try again.')
    } finally {
      setIsRunningCycle(false)
    }
  }

  const symbols = ['BTC', 'ETH', 'SOL', 'HYPE']

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Live Trading Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Monitor real-time prices and execute AI-driven trading strategies. 
            Prices update every 5 seconds automatically.
          </p>
        </div>

        {/* Price Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {symbols.map((symbol) => {
            const priceData = prices?.[symbol as keyof typeof prices]
            
            if (pricesLoading) {
              return (
                <Card key={symbol} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              )
            }

            if (pricesError || !priceData) {
              return (
                <Card key={symbol} className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-600">{symbol}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-600 text-sm">Failed to load price data</p>
                  </CardContent>
                </Card>
              )
            }

            return <PriceCard key={symbol} data={priceData} />
          })}
        </div>

        {/* Trading Controls */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <div>
                  <CardTitle>AI Trading Bot</CardTitle>
                  <CardDescription>
                    Execute a complete trading cycle using our AI-driven strategy
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">How it works:</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Analyzes current market conditions across all assets</li>
                  <li>• Identifies optimal entry and exit points</li>
                  <li>• Executes trades automatically</li>
                  <li>• Returns profit/loss results</li>
                </ul>
              </div>

              <div className="flex items-center justify-center">
                <Button
                  onClick={handleRunCycle}
                  disabled={isRunningCycle || pricesLoading}
                  size="lg"
                  className="px-8 py-3"
                >
                  {isRunningCycle ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Running Cycle...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5" />
                      Run Trading Cycle
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>⚠️ Trading involves risk. Past performance does not guarantee future results.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">24.5%</div>
                <div className="text-sm text-gray-600">Average Daily Return</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-gray-600">Cycles Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">$2.4M</div>
                <div className="text-sm text-gray-600">Total Profit Generated</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 