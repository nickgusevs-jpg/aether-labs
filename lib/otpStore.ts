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

const resend = new Resend(process.env.RESEND_API_KEY)

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

  // ВЫВОДИМ КОД В КОНСОЛЬ (чтобы всегда можно было войти)
  console.log(`\n========================================`)
  console.log(`[AUTH CODE FOR ${normalizedEmail}]: ${code}`)
  console.log(`========================================\n`)

  try {
    const response = await resend.emails.send({
      from: 'AETHER LABS <auth@aetherlabs.world>',
      to: normalizedEmail,
      subject: `${code} — Ваш код входа AETHER // LABS`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #0f172a; color: #ffffff;">
          <h2 style="color: #22d3ee; margin-top: 0;">AETHER // LABS</h2>
          <p style="font-size: 15px; color: #cbd5e1;">Используйте этот одноразовый код для входа в аккаунт:</p>
          <div style="background: rgba(34, 211, 238, 0.1); border: 1px solid #22d3ee; border-radius: 8px; padding: 16px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #34d399; margin: 20px 0;">
            ${code}
          </div>
          <p style="font-size: 13px; color: #64748b;">Код действителен 10 минут.</p>
        </div>
      `
    })

    if (response.error) {
      console.error('[RESEND API DETAILED ERROR]:', JSON.stringify(response.error, null, 2))
    } else {
      console.log('[RESEND SUCCESS]: Message sent with ID:', response.data?.id)
    }
  } catch (err) {
    console.error('[SEND OTP FAILED]:', err)
  }
}