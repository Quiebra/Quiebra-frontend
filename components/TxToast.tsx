import { CheckCircle, XCircle, Copy, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TxToastProps {
  success: boolean
  message: string
  txHash?: string
  onCopy?: () => void
  onView?: () => void
  className?: string
}

export function TxToast({ 
  success, 
  message, 
  txHash, 
  onCopy, 
  onView, 
  className 
}: TxToastProps) {
  const Icon = success ? CheckCircle : XCircle
  const iconColor = success ? 'text-green-500' : 'text-red-500'
  const bgColor = success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'

  const copyToClipboard = async () => {
    if (txHash && onCopy) {
      try {
        await navigator.clipboard.writeText(txHash)
        onCopy()
      } catch (err) {
        console.error('Failed to copy to clipboard:', err)
      }
    }
  }

  const viewOnExplorer = () => {
    if (txHash && onView) {
      onView()
    }
  }

  const shortenHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`
  }

  return (
    <div className={cn(
      'flex items-start gap-3 p-4 rounded-lg border',
      bgColor,
      className
    )}>
      <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', iconColor)} />
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">
          {success ? 'Success' : 'Error'}
        </p>
        <p className="text-sm text-gray-600 mt-1">{message}</p>
        
        {txHash && (
          <div className="mt-3 flex items-center gap-2">
            <code className="text-xs bg-white px-2 py-1 rounded border flex-1">
              {shortenHash(txHash)}
            </code>
            <button
              onClick={copyToClipboard}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Copy transaction hash"
            >
              <Copy className="h-3 w-3 text-gray-500" />
            </button>
            <button
              onClick={viewOnExplorer}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="View on explorer"
            >
              <ExternalLink className="h-3 w-3 text-gray-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 