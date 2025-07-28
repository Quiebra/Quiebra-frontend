'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TxToast } from '@/components/TxToast'
import { api } from '@/lib/fetcher'
import { Rocket, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LaunchpadPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    supply: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await api.createMemecoin(formData)
      
      if (response.success) {
        toast.success('Memecoin created successfully!')
        
        // Show transaction toast
        toast.custom((t) => (
          <TxToast
            success={true}
            message={`${formData.name} (${formData.symbol}) created successfully!`}
            txHash={response.txHash}
            onCopy={() => toast.success('Transaction hash copied!')}
            onView={() => window.open(`https://basescan.org/tx/${response.txHash}`, '_blank')}
          />
        ), { duration: 10000 })

        // Redirect to token page
        setTimeout(() => {
          router.push(`/tokens/${response.tokenAddress}`)
        }, 2000)
      } else {
        toast.error('Failed to create memecoin')
      }
    } catch (error) {
      console.error('Error creating memecoin:', error)
      toast.error('Failed to create memecoin. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Launch Your Memecoin
          </h1>
          <p className="text-lg text-gray-600">
            Create your own memecoin in seconds. Deploy directly to Base network.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Rocket className="h-6 w-6 text-blue-600" />
              <div>
                <CardTitle>Create New Token</CardTitle>
                <CardDescription>
                  Fill in the details below to create your memecoin
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Token Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g., DogeMoon, PepeCoin"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  The full name of your token (e.g., "DogeMoon Token")
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symbol">Token Symbol</Label>
                <Input
                  id="symbol"
                  type="text"
                  placeholder="e.g., DOGE, PEPE"
                  value={formData.symbol}
                  onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                  required
                  disabled={isLoading}
                  maxLength={10}
                />
                <p className="text-xs text-muted-foreground">
                  The symbol for your token (3-10 characters, uppercase)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supply">Total Supply</Label>
                <Input
                  id="supply"
                  type="number"
                  placeholder="e.g., 1000000000"
                  value={formData.supply}
                  onChange={(e) => handleInputChange('supply', e.target.value)}
                  required
                  disabled={isLoading}
                  min="1"
                />
                <p className="text-xs text-muted-foreground">
                  Total number of tokens to be created (e.g., 1,000,000,000)
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Important Notes:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Tokens are deployed on Base network</li>
                  <li>• You will be the owner of the created token</li>
                  <li>• Gas fees apply for deployment</li>
                  <li>• Token creation is irreversible</li>
                </ul>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !formData.name || !formData.symbol || !formData.supply}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Token...
                  </>
                ) : (
                  <>
                    <Rocket className="mr-2 h-4 w-4" />
                    Launch Token
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help? Check out our{' '}
            <a href="#" className="text-blue-600 hover:underline">
              documentation
            </a>
            {' '}or{' '}
            <a href="#" className="text-blue-600 hover:underline">
              community
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 