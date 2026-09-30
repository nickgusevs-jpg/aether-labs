'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowLeft, FileText, AlertTriangle, Scale, Lock, RefreshCw } from 'lucide-react'

export default function TermsContent() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 py-16 px-6 max-w-4xl mx-auto font-sans">
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Main
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
          <ShieldCheck size={14} /> Legal & Compliance
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Terms of Service & Lead Generation Disclaimer
        </h1>
        <p className="text-xs text-zinc-500">
          Effective Date: September 2026 | Version 1.2
        </p>
      </motion.div>

      <div className="space-y-6 text-sm leading-relaxed text-zinc-400">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-zinc-800 text-emerald-400">
              <FileText size={18} />
            </div>
            <h2 className="text-lg font-bold text-white">1. Nature of Provided Data & Source Methodology</h2>
          </div>
          <p className="mb-3">
            Aether Labs operates purely as an automated search, indexing, and data extraction software engine. All contact details, corporate email addresses, phone numbers, and associated meta-information provided through the software are extracted in real-time from publicly available internet directories, social networks, and indexed public registries.
          </p>
          <p>
            The software indexes records strictly as <strong>potential commercial leads</strong>. Aether Labs does not maintain a proprietary static database of personally identifying information (PII) without prior publicly available presence.
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-zinc-800 text-amber-400">
              <AlertTriangle size={18} />
            </div>
            <h2 className="text-lg font-bold text-white">2. Absolute Conversion & Revenue Disclaimer</h2>
          </div>
          <p className="mb-3">
            Aether Labs explicitly disclaims any warranties or guarantees regarding commercial outcomes resulting from the use of extracted data. Specifically, Aether Labs does <strong>NOT guarantee</strong>:
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-300 ml-2 mb-4">
            <li>Specific email deliverability or open rates</li>
            <li>Response percentages or deal conversions</li>
            <li>Financial revenue, ROI, or business growth metrics</li>
          </ul>
          <p className="text-xs text-zinc-500 italic">
            Outreach performance depends entirely on external factors outside Aether Labs&apos; control, including but not limited to the user&apos;s product value proposition, messaging compliance, domain reputation, and cold email execution.
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-zinc-800 text-cyan-400">
              <RefreshCw size={18} />
            </div>
            <h2 className="text-lg font-bold text-white">3. Subscription Quotas & Fair Usage Policy</h2>
          </div>
          <p className="mb-3">
            To maintain engine infrastructure stability and prevent server overload, daily extraction quotas and export formats apply strictly according to active subscription tiers:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
            <div className="p-3 bg-zinc-950/60 border border-zinc-800/60 rounded-xl">
              <div className="font-bold text-white mb-1">Free Trial</div>
              <div className="text-zinc-400">100 total leads, single country filter, CSV export.</div>
            </div>
            <div className="p-3 bg-zinc-950/60 border border-zinc-800/60 rounded-xl">
              <div className="font-bold text-white mb-1">Weekly Pass</div>
              <div className="text-zinc-400">500 leads / day, all 199 countries, CSV & JSON export.</div>
            </div>
            <div className="p-3 bg-zinc-950/60 border border-zinc-800/60 rounded-xl sm:col-span-2">
              <div className="font-bold text-white mb-1">Monthly License / Annual / Lifetime VIP</div>
              <div className="text-zinc-400">Unlimited daily extractions, priority queue, CSV, JSON & XLSX export options.</div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-zinc-800 text-purple-400">
              <Lock size={18} />
            </div>
            <h2 className="text-lg font-bold text-white">4. User Responsibility & Compliance</h2>
          </div>
          <p className="mb-3">
            Users bear sole legal responsibility for ensuring that all outbound communication conducted using data obtained through Aether Labs complies with applicable privacy regulations.
          </p>
          <p>
            Aether Labs shall not be held liable for domain blacklisting, spam reports, or legal proceedings resulting from aggressive outbound marketing activities.
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-zinc-800 text-rose-400">
              <Scale size={18} />
            </div>
            <h2 className="text-lg font-bold text-white">5. Limitation of Liability</h2>
          </div>
          <p>
            In no event shall Aether Labs, its developers, or affiliates be liable for any indirect, incidental, special, or consequential damages resulting from software downtime or data accuracy discrepancies.
          </p>
        </motion.section>
      </div>
    </div>
  )
}