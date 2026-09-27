'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react'
import { useAuthModal } from '@/lib/authModalContext'
import AppPreviewWindow from './AppPreviewWindow'

export default function Hero() {
  const { setOpen } = useAuthModal()

  return (
    <section className="relative overflow-hidden pb-24 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
      <div className="pointer-events-none absolute inset-0 bg-noise" />

      {/* Floating Ambient Glows */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-neon-cyan/20 blur-[120px]" 
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 [html.light_&]:text-slate-800 [html.light_&]:border-slate-300 [html.light_&]:bg-slate-100 shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-neon-emerald animate-ping" />
          <span className="flex items-center gap-1">
            <Sparkles size={13} className="text-neon-cyan" /> Live across 199 countries
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl [html.light_&]:text-slate-900"
        >
          Global lead generation,
          <br />
          <span className="gradient-text">automated end to end.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg [html.light_&]:text-slate-600"
        >
          AETHER // LABS finds, validates and scores B2B and B2C leads in any of 199 countries —
          real phone numbers, real emails, real websites. HWID-locked licensing keeps every seat secure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(true)}
            className="btn-glow group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-neon-cyan to-neon-emerald px-8 py-4 text-sm font-extrabold text-black transition-all shadow-xl"
          >
            <Zap size={16} fill="black" />
            Try 1 Day Free 
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 flex items-center justify-center gap-2 text-xs text-white/50 [html.light_&]:text-slate-500"
        >
          <ShieldCheck size={14} className="text-neon-emerald" /> No credit card required for the trial · Cancel anytime
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative mt-16 px-5 sm:px-8"
      >
        <AppPreviewWindow />
      </motion.div>
    </section>
  )
}