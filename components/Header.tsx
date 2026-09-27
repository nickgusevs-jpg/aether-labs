'use client'

import { motion } from 'framer-motion'
import { Globe2, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { useAuthModal } from '@/lib/authModalContext'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/#about', label: 'About Us' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/pay', label: 'Pay / Checkout' },
  { href: '/#contact', label: 'Contact' }
]

export default function Header() {
  const { data: session } = useSession()
  const { setOpen } = useAuthModal()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-base/70 backdrop-blur-xl dark:bg-base/70 [html.light_&]:bg-white/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-emerald text-sm font-black text-black shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-transform group-hover:scale-105">
            <Globe2 size={16} />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            AETHER <span className="gradient-text">// LABS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-white/70 transition-colors hover:text-white [html.light_&]:text-slate-600 [html.light_&:hover]:text-slate-900">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/70">{session.user?.email}</span>
              <button
                type="button"
                onClick={() => signOut()}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
              >
                Sign out
              </button>
            </div>
          ) : (
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpen(true)}
              className="btn-glow rounded-full bg-gradient-to-r from-neon-cyan to-neon-emerald px-5 py-2 text-sm font-bold text-black"
            >
              Sign In / Register
            </motion.button>
          )}
        </div>

        <button type="button" className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-white/5 md:hidden"
        >
          <div className="flex flex-col gap-1 px-5 py-4">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5">
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between px-3">
              <ThemeToggle />
              {!session && (
                <button
                  type="button"
                  onClick={() => { setOpen(true); setMobileOpen(false) }}
                  className="btn-glow rounded-full bg-gradient-to-r from-neon-cyan to-neon-emerald px-4 py-2 text-sm font-bold text-black"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
