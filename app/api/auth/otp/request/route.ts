import { NextResponse } from 'next/server'
import { issue, sendOtp } from '@/lib/otpStore'
import { findUserByIdentifier } from '@/lib/usersStore'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    const identifier = typeof body?.identifier === 'string' ? body.identifier.trim() : ''

    if (!identifier) {
      return NextResponse.json({ ok: false, error: 'Please enter an email or username' }, { status: 400 })
    }

    let emailToSend = identifier

    // Если это НЕ email, то ищем юзера по username
    if (!EMAIL_RE.test(identifier)) {
      const existingUser = findUserByIdentifier(identifier)
      if (!existingUser) {
        return NextResponse.json(
          { ok: false, error: 'User with this username was not found' },
          { status: 404 }
        )
      }
      emailToSend = existingUser.email
    }

    const code = issue(emailToSend)
    await sendOtp(emailToSend, code)

    return NextResponse.json({ ok: true, email: emailToSend })
  } catch (error) {
    console.error('[OTP REQUEST ERROR]:', error)
    return NextResponse.json({ ok: false, error: 'Failed to send verification code' }, { status: 500 })
  }
}