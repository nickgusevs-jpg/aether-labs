import { Resend } from 'resend'

// Хранилище кодов в памяти (на 10 минут)
const store = new Map<string, { code: string; expiresAt: number }>()

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

/**
 * Генерирует 6-значный OTP код для email
 */
export function issue(email: string): string {
  const normalizedEmail = email.toLowerCase().trim()
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = Date.now() + 10 * 60 * 1000 // Код действителен 10 минут

  store.set(normalizedEmail, { code, expiresAt })
  return code
}

/**
 * Проверяет введенный пользователем код
 */
export function verify(email: string, code: string): 'ok' | 'invalid' | 'expired' {
  const normalizedEmail = email.toLowerCase().trim()
  const record = store.get(normalizedEmail)

  if (!record) return 'invalid'
  if (Date.now() > record.expiresAt) {
    store.delete(normalizedEmail)
    return 'expired'
  }
  if (record.code !== code.trim()) {
    return 'invalid'
  }

  // Стираем код после успешной проверки
  store.delete(normalizedEmail)
  return 'ok'
}

/**
 * Отправляет реальное письмо с кодом через Resend API
 */
export async function sendOtp(email: string, code: string): Promise<void> {
  const normalizedEmail = email.toLowerCase().trim()

  // Если включен отладочный режим — выводим в консоль
  if (process.env.OTP_DEBUG_LOG === 'true') {
    console.log(`[OTP DEBUG] Code for ${normalizedEmail}: ${code}`)
    return
  }

  try {
    await resend.emails.send({
      from: 'AETHER LABS <auth@aetherlabs.world>', // Стандартный тестовый адрес Resend
      to: normalizedEmail,
      subject: `${code} — Ваш код входа AETHER // LABS`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #0f172a; color: #ffffff;">
          <h2 style="color: #22d3ee; margin-top: 0;">AETHER // LABS</h2>
          <p style="font-size: 15px; color: #cbd5e1;">Используйте этот одноразовый код для входа в аккаунт:</p>
          <div style="background: rgba(34, 211, 238, 0.1); border: 1px solid #22d3ee; border-radius: 8px; padding: 16px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #34d399; margin: 20px 0;">
            ${code}
          </div>
          <p style="font-size: 13px; color: #64748b;">Код действителен 10 минут. Если вы не запрашивали этот код, просто проигнорируйте письмо.</p>
        </div>
      `
    })
  } catch (error) {
    console.error('Ошибка отправки OTP через Resend:', error)
    throw new Error('Could not send email OTP')
  }
}