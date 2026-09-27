'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { COUNTRIES, flagEmoji } from '@/lib/countries'

export default function CountryPicker({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COUNTRIES
    return COUNTRIES.filter((c) => c.en.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.dial.includes(q))
  }, [query])

  const current = COUNTRIES.find((c) => c.code === value)

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-left text-sm"
      >
        <span className="flex items-center gap-2">
          {current ? <>{flagEmoji(current.code)} {current.en}</> : 'Select a country...'}
        </span>
        <ChevronDown size={15} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.14 }}
            className="glass absolute z-30 mt-2 w-full overflow-hidden rounded-xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
              <Search size={13} className="text-white/40" />
              <input
                autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search 199 countries..."
                className="w-full bg-transparent py-1 text-sm outline-none placeholder:text-white/30"
              />
            </div>
            <div className="max-h-64 overflow-y-auto p-1.5">
              {filtered.map((c) => (
                <button
                  key={c.code} type="button" onClick={() => { onChange(c.code); setOpen(false) }}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-white/10 ${value === c.code ? 'bg-neon-cyan/10 text-neon-cyan' : ''}`}
                >
                  <span className="w-4">{value === c.code && <Check size={13} />}</span>
                  <span>{flagEmoji(c.code)}</span>
                  <span className="flex-1 truncate">{c.en}</span>
                  <span className="font-mono text-xs text-white/40">+{c.dial}</span>
                </button>
              ))}
              {filtered.length === 0 && <div className="px-3 py-4 text-center text-xs text-white/40">No match</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
