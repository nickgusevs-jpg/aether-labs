import { NextResponse } from 'next/server'
import { verify } from '@/lib/otpStore'

// Standalone "is this code correct" check, exposed for completeness/testing. The actual sign-in
// flow (AuthModal) does NOT call this route - it calls next-auth's `signIn('otp', { email, code })`
// directly, which runs the credentials provider's authorize() (also in lib/otpStore.ts). Calling
// this route AND then signIn() would consume the one-time code twice and the second check would
// fail, since verify() deletes the code as soon as it matches - so keep those two paths separate.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const code = typeof body?.code === 'string' ? body.code.trim() : ''
  if (!email || !code) return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 })

  // Consumes the code on success (see the file-level comment above about why the AuthModal
  // doesn't also call this route as part of the real sign-in path).
  const result = verify(email, code)
  return NextResponse.json({ ok: result === 'ok', reason: result === 'ok' ? undefined : result })
}
