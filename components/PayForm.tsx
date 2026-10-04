'use client'

import { Check, ShieldCheck, MessageCircle, Send, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PLANS } from '@/lib/plans'

export default function PayForm() {
  const searchParams = useSearchParams()
  const planId = searchParams.get('plan') || 'monthly'

  // Ищем тариф в PLANS по id, если не найден — берем про запас 3-й тариф
  const currentPlan = PLANS.find((p) => p.id === planId) || PLANS[2]

  // Шаблон текста сообщения для менеджера
  const orderMessage = `Hello! I would like to order the "${currentPlan.name}" plan ($${currentPlan.price}) for AETHER // LABS.`

  // Прямые ссылки на мессенджеры
  const telegramUrl = `https://t.me/aether_axel?text=${encodeURIComponent(orderMessage)}`
  const whatsappUrl = `https://api.whatsapp.com/send?phone=37127099333&text=${encodeURIComponent(orderMessage)}`

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
      {/* Кнопка «Назад к тарифам» */}
      <Link 
        href="/#pricing" 
        className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition mb-6"
      >
        <ArrowLeft size={14} /> Back to Pricing
      </Link>

      <div className="glass rounded-2xl p-6 sm:p-10 shadow-2xl relative border border-white/10">
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl mb-2">
          Checkout & Activation
        </h1>
        <p className="text-sm text-white/60 mb-8">
          Complete your order via instant support in Telegram or WhatsApp.
        </p>

        {/* Карточка с деталями выбранного плана */}
        <div className="rounded-xl border border-neon-cyan/30 bg-neon-cyan/5 p-5 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-neon-cyan font-bold">Selected Plan</span>
              <h3 className="text-xl font-extrabold text-white mt-1">{currentPlan.name}</h3>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-white">${currentPlan.price}</span>
              <span className="text-xs text-white/50 block">{currentPlan.period}</span>
            </div>
          </div>

          <hr className="border-white/10 my-4" />

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
            {currentPlan.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check size={14} className="text-neon-emerald shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Выбор мессенджера для оплаты */}
        <div className="space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
            Select payment method & Contact Manager
          </label>

          {/* Кнопка Telegram */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between rounded-xl bg-[#229ED9]/15 border border-[#229ED9]/40 p-4 transition-all hover:bg-[#229ED9]/25 hover:border-[#229ED9] group"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#229ED9] p-2.5 text-white">
                <Send size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-white group-hover:text-neon-cyan transition">
                  Pay via Telegram
                </h4>
                <p className="text-xs text-white/60">Instant response • @aether_axel</p>
              </div>
            </div>
            <span className="rounded-full bg-[#229ED9]/20 px-3 py-1 text-xs font-bold text-[#229ED9]">
              Order Now →
            </span>
          </a>

          {/* Кнопка WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 p-4 transition-all hover:bg-[#25D366]/25 hover:border-[#25D366] group"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#25D366] p-2.5 text-white">
                <MessageCircle size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-white group-hover:text-neon-emerald transition">
                  Pay via WhatsApp
                </h4>
                <p className="text-xs text-white/60">Fast activation • +371 27099333</p>
              </div>
            </div>
            <span className="rounded-full bg-[#25D366]/20 px-3 py-1 text-xs font-bold text-[#25D366]">
              Order Now →
            </span>
          </a>
        </div>

        {/* Гарантия безопасности */}
        <div className="mt-8 flex items-center gap-3 text-xs text-white/50 border-t border-white/10 pt-6">
          <ShieldCheck size={20} className="text-neon-emerald shrink-0" />
          <p>
            Instant activation after payment confirmation. Crypto, Cards, and direct transfers supported via manager.
          </p>
        </div>
      </div>
    </div>
  )
}