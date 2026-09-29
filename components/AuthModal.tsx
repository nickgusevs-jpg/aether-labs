'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Hammer, X } from 'lucide-react'

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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

            <div className="flex flex-col items-center text-center">
              {/* Иконка статуса разработки */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Hammer size={28} />
              </div>

              <h2 className="text-2xl font-bold">AETHER // LABS</h2>
              <p className="mt-1 text-sm text-white/60 [html.light_&]:text-slate-500">
                Platform Access
              </p>

              {/* Плашка In Development */}
              <div className="my-6 w-full rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-400">
                <div className="flex items-center justify-center gap-2 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  In Development
                </div>
                <p className="mt-1.5 text-xs text-amber-300/80 [html.light_&]:text-amber-700">
                  Authentication is currently disabled during early showcase. Feel free to explore the site!
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn-glow w-full rounded-xl bg-gradient-to-r from-neon-cyan to-neon-emerald py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity"
              >
                Got it, explore site
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}