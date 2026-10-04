import { NextResponse } from 'next/server'
import { verify } from '@/lib/otpStore'
import { getUserByEmail } from '@/lib/usersStore'

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json()

    if (!email || !code) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    const result = verify(email, code)

    if (result === 'ok') {
      const user = getUserByEmail(email)
      return NextResponse.json({
        ok: true,
        username: user?.username || null
      })
    } else if (result === 'expired') {
      return NextResponse.json({ ok: false, error: 'Verification code expired' }, { status: 400 })
    } else {
      return NextResponse.json({ ok: false, error: 'Invalid verification code' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}