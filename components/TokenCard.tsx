import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MemecoinMetadata } from '@/lib/fetcher'
import Link from 'next/link'

interface TokenCardProps {
  data: MemecoinMetadata
  address: string
  className?: string
}

export function TokenCard({ data, address, className }: TokenCardProps) {
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{data.name}</CardTitle>
          <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
            {data.symbol}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Supply</div>
            <div className="font-medium">{formatSupply(data.supply)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Price</div>
            <div className="font-medium">{formatPrice(data.price)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Market Cap</div>
            <div className="font-medium">{formatMarketCap(data.marketCap)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Owner</div>
            <div className="font-medium font-mono text-xs">
              {shortenAddress(data.owner)}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Token Address</div>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted px-2 py-1 rounded flex-1">
              {shortenAddress(address)}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(address)}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/tokens/${address}`}>
              View Details
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href={`https://basescan.org/token/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" />
              Explorer
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 