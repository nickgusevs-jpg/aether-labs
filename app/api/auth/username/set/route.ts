import { NextResponse } from 'next/server'
import { isUsernameTaken, saveUser } from '@/lib/usersStore'

export async function POST(req: Request) {
  try {
    const { email, username } = await req.json()

    if (!email || !username) {
      return NextResponse.json({ ok: false, error: 'Missing email or username' }, { status: 400 })
    }

    const cleanUsername = username.trim()

    if (cleanUsername.length < 3) {
      return NextResponse.json({ ok: false, error: 'Username must be at least 3 characters' }, { status: 400 })
    }

    // Проверяем уникальность юзернейма
    if (isUsernameTaken(cleanUsername, email)) {
      return NextResponse.json({ ok: false, error: 'Username is already taken' }, { status: 400 })
    }

    // Сохраняем связку
    saveUser(email, cleanUsername)

    return NextResponse.json({ ok: true, username: cleanUsername })
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}