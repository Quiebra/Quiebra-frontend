import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  useParams() {
    return {}
  },
}))

// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3001'
process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID = 'test_project_id'
process.env.NEXT_PUBLIC_MEMECOIN_FACTORY_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3' 