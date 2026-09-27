'use client'

import { motion } from 'framer-motion'
import { Calculator, Database, Globe2, ShieldCheck, Users } from 'lucide-react'

const CARDS = [
  {
    span: 'sm:col-span-2 sm:row-span-2',
    icon: Globe2,
    color: 'from-neon-cyan/20 to-transparent',
    title: '199 Countries, B2B & B2C',
    desc: 'Every UN member state plus major territories. Toggle between business and consumer audiences per niche - the picker and the results adapt instantly.'
  },
  {
    span: '',
    icon: ShieldCheck,
    color: 'from-neon-emerald/20 to-transparent',
    title: 'HWID Security',
    desc: 'Every license is cryptographically bound to one machine. No sharing, no leaked keys working elsewhere.'
  },
  {
    span: '',
    icon: Calculator,
    color: 'from-neon-amber/20 to-transparent',
    title: 'Profit Calculator',
    desc: 'Model revenue, cost-per-lead and payback period before you commit a single credit.'
  },
  {
    span: 'sm:col-span-2',
    icon: Database,
    color: 'from-neon-violet/20 to-transparent',
    title: 'Internal Lead Database',
    desc: 'Every lead you find is stored locally, searchable and sortable, with one-click export to CSV, JSON or XLSX - ready for your CRM.'
  },
  {
    span: '',
    icon: Users,
    color: 'from-neon-cyan/20 to-transparent',
    title: 'Multi-Account & Proxy Shielding',
    desc: 'Run several seats behind rotating egress without tripping rate limits on the public data sources we query.'
  }
]

export default function BentoGrid() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="mb-14 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Everything the pipeline needs</h2>
        <p className="mt-3 text-white/60 [html.light_&]:text-slate-600">One desktop app, five reasons teams switch.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className={`glass group relative overflow-hidden rounded-2xl p-6 ${c.span}`}
          >
            <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${c.color} blur-2xl transition-opacity group-hover:opacity-80`} />
            <c.icon size={26} className="text-white/90" />
            <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60 [html.light_&]:text-slate-600">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
