'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'
import AuthModal from '@/components/AuthModal'
import { AuthModalContext } from '@/lib/authModalContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <AuthModalContext.Provider value={{ open, setOpen }}>
          {children}
          <AuthModal open={open} onClose={() => setOpen(false)} />
        </AuthModalContext.Provider>
      </ThemeProvider>
    </SessionProvider>
  )
}
