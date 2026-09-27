import { NextResponse } from 'next/server'
import { issue, sendOtp } from '@/lib/otpStore'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
  }
  const code = issue(email)
  await sendOtp(email, code)
  return NextResponse.json({ ok: true })
}
