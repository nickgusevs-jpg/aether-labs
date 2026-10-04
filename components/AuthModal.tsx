'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Mail, KeyRound, User, ArrowRight, CheckCircle2, Loader2, RefreshCw } from 'lucide-react'

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<'identifier' | 'code' | 'username' | 'success'>('identifier')
  const [identifier, setIdentifier] = useState('')
  const [targetEmail, setTargetEmail] = useState('')
  const [code, setCode] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(0)

  const startTimer = () => {
    setResendTimer(60)
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // 1. Отправка OTP (работает по Email или Username)
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    const input = identifier.trim()

    if (!input) {
      setError('Please enter your email or username')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: input }),
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to send verification code')
      }

      setTargetEmail(data.email || input)
      setStep('code')
      startTimer()
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  // 2. Проверка OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length < 4) {
      setError('Please enter the full verification code')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, code }),
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Invalid or expired verification code')
      }

      // Если username у юзера уже зарегистрирован — сразу завершаем
      if (data.username) {
        finishAuth({ email: targetEmail, username: data.username })
      } else {
        // Если юзера еще нет — просим ввести username
        const defaultName = targetEmail.split('@')[0]
        setUsername(defaultName)
        setStep('username')
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  // 3. Сохранение Username и проверка уникальности
  const handleCompleteUsername = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanUsername = username.trim()

    if (!cleanUsername) {
      setError('Please enter a username')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/username/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, username: cleanUsername }),
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Username is already taken')
      }

      finishAuth({ email: targetEmail, username: cleanUsername })
    } catch (err: any) {
      setError(err.message || 'Failed to set username')
    } finally {
      setLoading(false)
    }
  }

  const finishAuth = (userData: { email: string; username: string }) => {
    localStorage.setItem('aether_user', JSON.stringify(userData))
    window.dispatchEvent(new Event('aether_auth_change'))

    setUsername(userData.username)
    setStep('success')

    setTimeout(() => {
      handleReset()
      onClose()
    }, 1200)
  }

  const handleReset = () => {
    setStep('identifier')
    setIdentifier('')
    setTargetEmail('')
    setCode('')
    setUsername('')
    setError('')
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
            if (e.target === e.currentTarget) {
              handleReset()
              onClose()
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="glass relative w-full max-w-md rounded-2xl p-7 shadow-2xl [html.light_&]:bg-white [html.light_&]:text-slate-900 border border-white/10"
          >
            <button
              type="button"
              onClick={() => {
                handleReset()
                onClose()
              }}
              className="absolute right-4 top-4 text-white/50 hover:text-white [html.light_&]:text-slate-400 [html.light_&:hover]:text-slate-900"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                {step === 'identifier' && <Mail size={26} />}
                {step === 'code' && <KeyRound size={26} />}
                {step === 'username' && <User size={26} />}
                {step === 'success' && <CheckCircle2 size={26} className="text-emerald-400" />}
              </div>

              <h2 className="text-2xl font-bold tracking-wide">AETHER // LABS</h2>
              <p className="mt-1 text-sm text-white/60 [html.light_&]:text-slate-500">
                {step === 'identifier' && 'Enter your email or username to sign in'}
                {step === 'code' && `We sent a code to ${targetEmail}`}
                {step === 'username' && 'Choose your unique display username'}
                {step === 'success' && 'Authentication successful!'}
              </p>

              {error && (
                <div className="mt-4 w-full rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
                  {error}
                </div>
              )}

              {/* Step 1: Email or Username */}
              {step === 'identifier' && (
                <form onSubmit={handleSendOtp} className="mt-6 w-full space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Email or username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-cyan-500 transition-colors [html.light_&]:bg-slate-100 [html.light_&]:text-slate-900 [html.light_&]:placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-emerald py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Step 2: Code */}
              {step === 'code' && (
                <form onSubmit={handleVerifyOtp} className="mt-6 w-full space-y-4">
                  <input
                    type="text"
                    maxLength={6}
                    required
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center text-2xl font-mono tracking-[0.5em] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 outline-none focus:border-cyan-500 transition-colors [html.light_&]:bg-slate-100 [html.light_&]:text-slate-900"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-emerald py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : 'Verify Code'}
                  </button>

                  <div className="flex items-center justify-between text-xs text-white/50 pt-2 [html.light_&]:text-slate-500">
                    <button type="button" onClick={() => setStep('identifier')} className="hover:underline">
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={resendTimer > 0 || loading}
                      onClick={handleSendOtp}
                      className="flex items-center gap-1 hover:text-white disabled:opacity-40"
                    >
                      <RefreshCw size={12} />
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Username */}
              {step === 'username' && (
                <form onSubmit={handleCompleteUsername} className="mt-6 w-full space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Choose username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-cyan-500 transition-colors [html.light_&]:bg-slate-100 [html.light_&]:text-slate-900"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-emerald py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span>Complete Sign In</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Step 4: Success */}
              {step === 'success' && (
                <div className="mt-6 py-4 text-emerald-400 font-medium">
                  Welcome back, {username}!
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}