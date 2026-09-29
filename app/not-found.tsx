export const dynamic = 'force-dynamic'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 text-center">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-gray-400 mb-6">The page you are looking for does not exist.</p>
      <Link 
        href="/" 
        className="px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
      >
        Return Home
      </Link>
    </div>
  )
}