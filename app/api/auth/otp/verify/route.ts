import { NextResponse } from 'next/server'
import { verify } from '@/lib/otpStore'

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json()

    if (!email || !code) {
      return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 })
    }

    const result = verify(email, code)

    if (result === 'ok') {
      return NextResponse.json({ ok: true })
    } else if (result === 'expired') {
      return NextResponse.json({ ok: false, error: 'expired' }, { status: 400 })
    } else {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}