'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, Check, ChevronDown, Lock, ShieldCheck } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
]

export default function PayForm() {
  const searchParams = useSearchParams()
  const planParam = searchParams.get('plan') || 'pro'

  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1500)
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
      <div className="glass rounded-2xl p-6 sm:p-10 shadow-2xl relative">
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl mb-2">
          Complete Your Order
        </h1>
        <p className="text-sm text-white/60 [html.light_&]:text-slate-600 mb-8">
          Selected Plan: <span className="font-bold text-neon-cyan uppercase">{planParam}</span>
        </p>

        {success ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <ShieldCheck size={56} className="mx-auto text-neon-emerald mb-4 animate-bounce" />
            <h3 className="text-xl font-bold">Payment Successful!</h3>
            <p className="text-sm text-white/60 [html.light_&]:text-slate-600 mt-2">
              Your license key and HWID activation details have been sent to your email.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 [html.light_&]:text-slate-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full rounded-xl border border-white/15 bg-black/20 [html.light_&]:bg-slate-100 [html.light_&]:border-slate-300 [html.light_&]:text-slate-900 px-4 py-3 text-sm outline-none focus:border-neon-cyan"
              />
            </div>

            {/* COUNTRY SELECTOR WITH CORRECT Z-INDEX & DROPDOWN */}
            <div className="relative z-30" ref={dropdownRef}>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 [html.light_&]:text-slate-700 mb-2">
                Billing Country / Region
              </label>
              
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                className="w-full flex items-center justify-between rounded-xl border border-white/15 bg-black/20 [html.light_&]:bg-slate-100 [html.light_&]:border-slate-300 [html.light_&]:text-slate-900 px-4 py-3 text-sm outline-none hover:border-white/30"
              >
                <span className="flex items-center gap-2">
                  <span>{selectedCountry.flag}</span>
                  <span>{selectedCountry.name}</span>
                </span>
                <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute left-0 right-0 top-full mt-2 z-50 max-h-56 overflow-y-auto rounded-xl border border-white/15 bg-slate-900 [html.light_&]:bg-white [html.light_&]:border-slate-300 shadow-2xl p-1"
                  >
                    {COUNTRIES.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country)
                          setDropdownOpen(false)
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition ${
                          selectedCountry.code === country.code
                            ? 'bg-neon-cyan/20 text-neon-cyan font-bold'
                            : 'hover:bg-white/10 [html.light_&:hover]:bg-slate-100 text-white/80 [html.light_&]:text-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </span>
                        {selectedCountry.code === country.code && <Check size={14} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 [html.light_&]:text-slate-700 mb-2">
                Card Details
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="4532 •••• •••• 8892"
                  className="w-full rounded-xl border border-white/15 bg-black/20 [html.light_&]:bg-slate-100 [html.light_&]:border-slate-300 [html.light_&]:text-slate-900 px-4 py-3 text-sm outline-none focus:border-neon-cyan pr-10"
                />
                <CreditCard size={18} className="absolute right-3 top-3.5 text-white/40 [html.light_&]:text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-glow relative z-10 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-emerald py-4 text-sm font-bold text-black transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              <Lock size={16} />
              {loading ? 'Processing Encrypted Payment...' : 'Proceed to Purchase'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}