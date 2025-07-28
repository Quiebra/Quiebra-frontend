'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/fetcher'
import type { MemecoinMetadata } from '@/lib/fetcher'
import { ExternalLink, Copy, ArrowLeft, TrendingUp, Users, Activity } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function TokenDetailPage() {
  const params = useParams()
  const address = params?.address as string
  const [tokenData, setTokenData] = useState<MemecoinMetadata | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!address || typeof address !== 'string') return
      
      setIsLoading(true)
      setError(null)
      
      try {
        const data = await api.getMemecoinMetadata(address)
        setTokenData(data)
      } catch (err) {
        console.error('Error fetching token data:', err)
        setError('Failed to load token data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTokenData()
  }, [address])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
      toast.error('Failed to copy to clipboard')
    }
  }

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatSupply = (supply: string) => {
    const num = parseFloat(supply)
    if (num >= 1e9) {
      return `${(num / 1e9).toFixed(2)}B`
    }
    if (num >= 1e6) {
      return `${(num / 1e6).toFixed(2)}M`
    }
    if (num >= 1e3) {
      return `${(num / 1e3).toFixed(2)}K`
    }
    return num.toLocaleString()
  }

  const formatPrice = (price?: number) => {
    if (!price) return 'N/A'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6,
      maximumFractionDigits: 8,
    }).format(price)
  }

  const formatMarketCap = (marketCap?: number) => {
    if (!marketCap) return 'N/A'
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`
    }
    if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`
    }
    if (marketCap >= 1e3) {
      return `$${(marketCap / 1e3).toFixed(2)}K`
    }
    return `$${marketCap.toFixed(2)}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !tokenData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Token Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">
              {error || 'The requested token could not be found.'}
            </p>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {tokenData.name}
              </h1>
              <p className="text-lg text-gray-600">
                Symbol: <span className="font-mono bg-muted px-2 py-1 rounded">
                  {tokenData.symbol}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => copyToClipboard(address)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Address
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={`https://basescan.org/token/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on Explorer
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Token Information */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Token Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Token Information</CardTitle>
                <CardDescription>Basic details about the token</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Token Address</div>
                    <div className="font-mono text-sm bg-muted px-2 py-1 rounded mt-1">
                      {shortenAddress(address)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Owner</div>
                    <div className="font-mono text-sm bg-muted px-2 py-1 rounded mt-1">
                      {shortenAddress(tokenData.owner)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Supply</div>
                    <div className="font-medium">{formatSupply(tokenData.supply)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Current Price</div>
                    <div className="font-medium">{formatPrice(tokenData.price)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Data</CardTitle>
                <CardDescription>Current market statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatMarketCap(tokenData.marketCap)}
                    </div>
                    <div className="text-sm text-muted-foreground">Market Cap</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(tokenData.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">Current Price</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/trade">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Trade This Token
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/portfolio">
                    <Users className="mr-2 h-4 w-4" />
                    View Portfolio
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Token Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="text-sm font-medium">Created</div>
                      <div className="text-xs text-muted-foreground">2 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="text-sm font-medium">Price Change</div>
                      <div className="text-xs text-muted-foreground">+15.2% (24h)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 