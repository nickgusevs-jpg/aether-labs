import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 py-16 px-6 max-w-4xl mx-auto font-sans">
      <div className="mb-8">
        <a 
          href="/" 
          className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
        >
          ← Back to Main
        </a>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Terms of Service & Lead Disclaimer</h1>
      <p className="text-sm text-zinc-500 mb-8">Last updated: September 2026</p>

      <div className="space-y-8 text-sm leading-relaxed text-zinc-400">
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-base font-semibold text-white mb-3">1. Nature of Provided Data</h2>
          <p>
            Aether Labs operates as an automated discovery and extraction tool. All extracted contact details, email addresses, and phone numbers are gathered from publicly accessible sources and indexed purely as <strong>potential business contacts (leads)</strong>.
          </p>
        </section>

        <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-base font-semibold text-white mb-3">2. No Conversion or Sales Guarantees</h2>
          <p>
            Aether Labs does <strong>NOT guarantee</strong> any specific deal closures, conversion rates, response percentages, or commercial revenue resulting from using our data. Outreach efficiency relies solely on your product offer, cold messaging strategy, and sales execution.
          </p>
        </section>

        <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-base font-semibold text-white mb-3">3. Subscription Quotas & Fair Use</h2>
          <p>
            Daily and volume extraction limits apply strictly according to your selected tier:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-300">
            <li><strong>Free Trial:</strong> Up to 100 leads total (1 country)</li>
            <li><strong>Weekly Pass:</strong> Up to 500 leads per day</li>
            <li><strong>Monthly License & Above:</strong> Unlimited lead access</li>
          </ul>
        </section>

        <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-base font-semibold text-white mb-3">4. Limitation of Liability</h2>
          <p>
            Under no circumstances shall Aether Labs be held liable for any direct, indirect, or consequential damages arising out of the use or inability to use our lead extraction software.
          </p>
        </section>
      </div>
    </div>
  );
}