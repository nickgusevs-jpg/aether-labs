'use client'

import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

export default function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-3xl font-extrabold sm:text-4xl [html.light_&]:text-slate-900"
      >
        Built by people who were tired of stale lead lists
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="mx-auto mt-5 max-w-2xl text-white/60 [html.light_&]:text-slate-600 leading-relaxed"
      >
        AETHER // LABS started as an internal tool for our own outbound team. Public directories go
        stale in weeks; we wanted something that queried live map data, validated every contact
        method it found, and scored leads the same way a sales rep would - by how reachable they
        actually are.
      </motion.p>

      {/* Telegram Channel Button */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="mt-8 flex justify-center"
      >
        <a
          href="https://t.me/aether_co"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 [html.light_&]:bg-white [html.light_&]:border-slate-300 px-6 py-3 text-sm font-semibold text-white [html.light_&]:text-slate-800 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-all duration-300 group"
        >
          <Send size={16} className="text-neon-cyan transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          Join Our Telegram Channel
        </a>
      </motion.div>
    </section>
  )
}