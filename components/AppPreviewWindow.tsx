'use client'

import { motion } from 'framer-motion'
import { Circle, Search } from 'lucide-react'

const ROWS = [
  { name: 'Nordic Fitness Studio AB', country: '🇸🇪', score: 92 },
  { name: 'Meridian Legal Partners', country: '🇬🇧', score: 87 },
  { name: 'Casa Verde Restaurant', country: '🇵🇹', score: 78 },
  { name: 'Baltic Dental Clinic', country: '🇱🇻', score: 95 },
  { name: 'Sunrise Auto Repair LLC', country: '🇺🇸', score: 81 }
]

export default function AppPreviewWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      className="glass relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl shadow-[0_40px_100px_-20px_rgba(34,211,238,0.25)]"
      style={{ perspective: 1200 }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-rose-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 flex items-center gap-1.5 rounded-md bg-black/30 px-2.5 py-1 text-[11px] text-white/50">
          <Search size={11} /> aether-labs.app/scraper
        </span>
      </div>
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-[220px_1fr]">
        <div className="hidden flex-col gap-1 border-r border-white/10 bg-black/20 p-4 text-xs text-white/60 sm:flex">
          {['Dashboard', 'Scraper Engine', 'Lead Database', 'ROI Calculator', 'Settings'].map((item, i) => (
            <div key={item} className={`rounded-lg px-3 py-2 ${i === 1 ? 'bg-neon-cyan/10 text-neon-cyan' : ''}`}>{item}</div>
          ))}
        </div>
        <div className="p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-neon-emerald">
              <Circle size={7} className="fill-neon-emerald animate-pulse-slow" /> Live scan - 199 countries indexed
            </div>
            <span className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-semibold text-neon-cyan">B2B / B2C</span>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10">
            {ROWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.12 }}
                className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-3 py-2.5 text-xs last:border-b-0"
              >
                <span className="flex items-center gap-2 text-white/80">
                  <span>{r.country}</span> {r.name}
                </span>
                <span className={`font-mono font-bold ${r.score >= 90 ? 'text-neon-emerald' : r.score >= 80 ? 'text-neon-cyan' : 'text-neon-amber'}`}>
                  {r.score}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
