import { Globe2, MessageSquare, Send } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-black/40 [html.light_&]:bg-slate-100 [html.light_&]:border-slate-200 py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:grid-cols-4 sm:px-8">
        
        <div className="col-span-1 sm:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-emerald text-black font-bold">
              <Globe2 size={16} />
            </span>
            <span className="font-extrabold text-lg tracking-tight [html.light_&]:text-slate-900">AETHER // LABS</span>
          </div>
          <p className="mt-3 text-xs text-white/50 [html.light_&]:text-slate-600">
            Global B2B & B2C lead generation, done right.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 [html.light_&]:text-slate-500">Product</h4>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm text-white/70 [html.light_&]:text-slate-700">
            <li><Link href="/#features" className="hover:text-neon-cyan transition">Features</Link></li>
            <li><Link href="/#pricing" className="hover:text-neon-cyan transition">Pricing</Link></li>
            <li><Link href="/pay" className="hover:text-neon-cyan transition">Pay / Checkout</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 [html.light_&]:text-slate-500">Company</h4>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm text-white/70 [html.light_&]:text-slate-700">
            <li><Link href="/#about" className="hover:text-neon-cyan transition">About Us</Link></li>
            <li><Link href="/#contact" className="hover:text-neon-cyan transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* CONTACT US BUTTONS */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 [html.light_&]:text-slate-500">Direct Support</h4>
          <div className="mt-3 flex flex-col gap-2">
            <a
              href="https://t.me/aether_co"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 [html.light_&]:bg-white [html.light_&]:border-slate-300 px-3.5 py-2 text-xs font-medium text-white/90 [html.light_&]:text-slate-800 hover:border-neon-cyan hover:text-neon-cyan transition"
            >
              <Send size={14} className="text-neon-cyan" />
              Telegram Channel
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 [html.light_&]:bg-white [html.light_&]:border-slate-300 px-3.5 py-2 text-xs font-medium text-white/90 [html.light_&]:text-slate-800 hover:border-neon-emerald hover:text-neon-emerald transition"
            >
              <MessageSquare size={14} className="text-neon-emerald" />
              WhatsApp Support
            </a>
          </div>
        </div>

      </div>

      <div className="mx-auto mt-10 max-w-7xl px-5 text-xs text-white/30 [html.light_&]:text-slate-400 sm:px-8 border-t border-white/5 pt-6">
        © {new Date().getFullYear()} AETHER // LABS. All rights reserved.
      </div>
    </footer>
  )
}