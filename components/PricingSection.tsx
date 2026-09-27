'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { PLANS } from '@/lib/plans'

export default function PricingSection() {
  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="mb-14 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Simple, transparent pricing</h2>
        <p className="mt-3 text-white/60 [html.light_&]:text-slate-600">Start free. Upgrade when the leads pay for themselves.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {PLANS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`relative flex flex-col rounded-2xl p-6 ${
              p.highlight
                ? 'border-2 border-neon-cyan bg-white/[0.06] shadow-[0_0_50px_-10px_rgba(34,211,238,0.5)]'
                : 'glass'
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-emerald px-3 py-1 text-[11px] font-bold text-black">
                Most Popular
              </span>
            )}
            <h3 className="text-sm font-semibold text-white/70">{p.name}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-black">${p.price}</span>
              <span className="text-xs text-white/40">{p.period}</span>
            </div>
            <p className="mt-2 text-xs text-white/50">{p.tagline}</p>
            <ul className="mt-5 flex flex-1 flex-col gap-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-white/70">
                  <Check size={14} className="mt-0.5 shrink-0 text-neon-emerald" /> {f}
                </li>
              ))}
            </ul>
            <Link
              href={`/pay?plan=${p.id}`}
              className={`mt-6 rounded-full py-2.5 text-center text-sm font-bold transition ${
                p.highlight
                  ? 'btn-glow bg-gradient-to-r from-neon-cyan to-neon-emerald text-black hover:scale-[1.02]'
                  : 'border border-white/15 text-white/85 hover:border-white/30 hover:bg-white/5'
              }`}
            >
              {p.price === 0 ? 'Start free' : 'Choose plan'}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
