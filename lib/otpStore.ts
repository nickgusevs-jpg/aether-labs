import { Resend } from 'resend'
import crypto from 'node:crypto'

interface OtpRecord {
  code: string
  expiresAt: number
  attempts: number
}

const store = new Map<string, OtpRecord>()

if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [email, record] of store.entries()) {
      if (now > record.expiresAt) {
        store.delete(email)
      }
    }
  }, 5 * 60 * 1000)
}

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build")

export function issue(email: string): string {
  const normalizedEmail = email.toLowerCase().trim()
  const code = crypto.randomInt(100000, 1000000).toString()
  const expiresAt = Date.now() + 10 * 60 * 1000

  store.set(normalizedEmail, { 
    code, 
    expiresAt, 
    attempts: 0 
  })
  
  return code
}

export function verify(email: string, code: string): 'ok' | 'invalid' | 'expired' {
  const normalizedEmail = email.toLowerCase().trim()
  const record = store.get(normalizedEmail)

  if (!record) return 'invalid'

  if (Date.now() > record.expiresAt) {
    store.delete(normalizedEmail)
    return 'expired'
  }

  if (record.attempts >= 5) {
    store.delete(normalizedEmail)
    return 'invalid'
  }

  if (record.code !== code.trim()) {
    record.attempts += 1
    return 'invalid'
  }

  store.delete(normalizedEmail)
  return 'ok'
}

export async function sendOtp(email: string, code: string): Promise<void> {
  const normalizedEmail = email.toLowerCase().trim()

  console.log(`\n========================================`)
  console.log(`[OTP CODE]: ${code}  ==>  ${normalizedEmail}`)
  console.log(`========================================\n`)

  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_dummy_key_for_build') {
    console.warn('[OTP WARNING] RESEND_API_KEY is missing or dummy.')
    return
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'AETHER LABS <auth@aetherlabs.world>',
      to: normalizedEmail,
      subject: `Your verification code: ${code}`,
      text: `Your verification code is: ${code}. It expires in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2>AETHER LABS</h2>
          <p>Your verification code:</p>
          <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px; padding: 12px; background: #f1f5f9; text-align: center; border-radius: 6px;">
            ${code}
          </div>
          <p style="font-size: 12px; color: #64748b; margin-top: 16px;">Valid for 10 minutes.</p>
        </div>
      `
    })

    if (error) {
      console.error('[RESEND ERROR]:', error)
    } else {
      console.log('[RESEND SUCCESS]: ID:', data?.id)
    }
  } catch (error) {
    console.error('Ошибка отправки OTP:', error)
  }
}