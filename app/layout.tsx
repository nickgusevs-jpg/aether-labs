import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

// Функция гарантирует 100% валидный URL в любом окружении
function getBaseUrl(): URL {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL?.trim()
  
  if (envUrl) {
    if (envUrl.startsWith('http://') || envUrl.startsWith('https://')) {
      return new URL(envUrl)
    }
    return new URL(`https://${envUrl}`)
  }

  return new URL('https://aetherlabs.world')
}

export const metadata: Metadata = {
  metadataBase: getBaseUrl(),
  title: 'AETHER // LABS - Global B2B & B2C Lead Generation',
  description: 'Automated lead scraping across 199 countries, HWID-secured licensing, and a built-in ROI calculator.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}