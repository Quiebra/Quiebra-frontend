import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MarketData } from '@/lib/fetcher'

interface PriceCardProps {
  data: MarketData
  className?: string
}

export function PriceCard({ data, className }: PriceCardProps) {
  const isPositive = data.change24h > 0
  const isNegative = data.change24h < 0
  const isNeutral = data.change24h === 0

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price)
  }

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}%`
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`
    }
    if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`
    }
    if (volume >= 1e3) {
      return `$${(volume / 1e3).toFixed(2)}K`
    }
    return `$${volume.toFixed(2)}`
  }

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">{data.symbol}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl font-bold">{formatPrice(data.price)}</div>
        
        <div className="flex items-center gap-2">
          {isPositive && <TrendingUp className="h-4 w-4 text-green-500" />}
          {isNegative && <TrendingDown className="h-4 w-4 text-red-500" />}
          {isNeutral && <Minus className="h-4 w-4 text-gray-500" />}
          
          <span
            className={cn(
              'text-sm font-medium',
              isPositive && 'text-green-600',
              isNegative && 'text-red-600',
              isNeutral && 'text-gray-600'
            )}
          >
            {formatChange(data.change24h)}
          </span>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Vol: {formatVolume(data.volume24h)}
        </div>
        
        <div className="text-xs text-muted-foreground">
          Updated: {new Date(data.timestamp).toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  )
} 