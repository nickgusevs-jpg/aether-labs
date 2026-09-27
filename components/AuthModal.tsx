'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Chrome, Loader2, Mail, ShieldCheck, X } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

type Step = 'email' | 'code' | 'done'

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setStep('email')
      setEmail('')
      setCode('')
      setError('')
      setBusy(false)
    }
  }, [open])

  const requestCode = async () => {
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email.')
      return
    }
    setBusy(true)

    try {
      // Отправляем реальный запрос на бэкенд, который вызывает Resend
      const res = await fetch('/api/auth/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json().catch(() => null)

      if (!res.ok || !data?.ok) {
        setError(data?.error || 'Could not send code. Check Resend configuration.')
        return
      }

      setStep('code')
    } catch {
      setError('Network error. Failed to send code.')
    } finally {
      setBusy(false)
    }
  }

  const submitCode = async () => {
    setError('')
    if (code.trim().length !== 6) {
      setError('Enter the 6-digit code.')
      return
    }
    setBusy(true)
    try {
      const res = await signIn('otp', { email, code, redirect: false })

      if (res?.error) {
        setError('Invalid or expired code.')
        return
      }

      setStep('done')
      setTimeout(onClose, 1000)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="glass relative w-full max-w-md rounded-2xl p-7 shadow-2xl [html.light_&]:bg-white [html.light_&]:text-slate-900"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 text-white/50 hover:text-white [html.light_&]:text-slate-400 [html.light_&:hover]:text-slate-900"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-bold">Sign in to AETHER // LABS</h2>
            <p className="mt-1 text-sm text-white/60 [html.light_&]:text-slate-500">
              Passwordless — just your email and a one-time code.
            </p>

            <div className="relative mt-6">
              <button
                type="button"
                disabled
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 [html.light_&]:border-slate-300 [html.light_&]:bg-slate-100 py-3 text-sm font-semibold opacity-60 cursor-not-allowed"
              >
                <Chrome size={16} /> Continue with Google
              </button>
              <span className="absolute -top-2 -right-2 rounded-full bg-slate-800 text-[10px] font-bold text-white px-2 py-0.5 border border-white/20">
                Disabled in Local
              </span>
            </div>

            <div className="my-5 flex items-center gap-3 text-xs text-white/40 [html.light_&]:text-slate-400">
              <div className="h-px flex-1 bg-white/10 [html.light_&]:bg-slate-200" /> OR{' '}
              <div className="h-px flex-1 bg-white/10 [html.light_&]:bg-slate-200" />
            </div>

            {step === 'email' && (
              <div className="flex flex-col gap-3">
                <label className="text-xs font-medium text-white/60 [html.light_&]:text-slate-700">
                  Email address
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/30 [html.light_&]:bg-slate-100 [html.light_&]:border-slate-300 px-3">
                  <Mail size={15} className="text-white/40 [html.light_&]:text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') void requestCode()
                    }}
                    placeholder="you@company.com"
                    className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/30 [html.light_&]:text-slate-900 [html.light_&]:placeholder:text-slate-400"
                  />
                </div>
                {error && <p className="text-xs text-rose-400">{error}</p>}
                <button
                  type="button"
                  onClick={() => void requestCode()}
                  disabled={busy}
                  className="btn-glow mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-emerald py-3 text-sm font-bold text-black disabled:opacity-50"
                >
                  {busy ? <Loader2 size={16} className="animate-spin" /> : null} Send code
                </button>
              </div>
            )}

            {step === 'code' && (
              <div className="flex flex-col gap-3">
                <label className="text-xs font-medium text-white/60 [html.light_&]:text-slate-700">
                  6-digit code sent to {email}
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') void submitCode()
                  }}
                  placeholder="000000"
                  className="w-full rounded-xl border border-white/15 bg-black/30 [html.light_&]:bg-slate-100 [html.light_&]:border-slate-300 [html.light_&]:text-slate-900 px-4 py-3 text-center text-2xl tracking-[0.5em] outline-none"
                />
                {error && <p className="text-xs text-rose-400">{error}</p>}
                <button
                  type="button"
                  onClick={() => void submitCode()}
                  disabled={busy}
                  className="btn-glow flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-emerald py-3 text-sm font-bold text-black disabled:opacity-50"
                >
                  {busy ? <Loader2 size={16} className="animate-spin" /> : null} Verify & sign in
                </button>
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-xs text-white/40 hover:text-white/70 [html.light_&]:text-slate-500"
                >
                  Use a different email
                </button>
              </div>
            )}

            {step === 'done' && (
              <div className="flex flex-col items-center gap-2 py-6 text-center">
                <ShieldCheck size={36} className="text-neon-emerald" />
                <p className="text-base font-bold">You're signed in!</p>
              </div>
            )}

            <p className="mt-5 text-center text-[11px] text-white/30 [html.light_&]:text-slate-400">
              By continuing you agree to the Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}