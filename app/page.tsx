import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Rocket, TrendingUp, Wallet, Coins } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">Quiebra</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create, trade, and manage memecoins with AI-driven trading strategies. 
            Launch your token in seconds and start trading with confidence.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Rocket className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Launch Memecoin</CardTitle>
              <CardDescription>
                Create your own memecoin with just a few clicks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/launchpad">
                  Launch Now
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Live Trading</CardTitle>
              <CardDescription>
                Trade BTC, ETH, SOL, and HYPE with real-time prices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/trade">
                  Start Trading
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Wallet className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>
                View your cross-chain token balances and positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/portfolio">
                  View Portfolio
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Coins className="h-8 w-8 text-yellow-600 mb-2" />
              <CardTitle>Token Explorer</CardTitle>
              <CardDescription>
                Browse and analyze memecoins on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/tokens">
                  Explore Tokens
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1000+</div>
                <div className="text-sm text-gray-600">Memecoins Created</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">$50M+</div>
                <div className="text-sm text-gray-600">Total Volume Traded</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">10K+</div>
                <div className="text-sm text-gray-600">Active Traders</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-600 mb-8">
            Connect your wallet and start creating or trading memecoins today.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/launchpad">
                Create Your First Token
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/trade">
                Start Trading
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 