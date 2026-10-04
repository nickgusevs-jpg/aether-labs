// Временное/базовое хранилище пользователей в памяти.
// В дальнейшем здесь можно подключить Prisma / Database.

interface UserProfile {
    email: string
    username: string
  }
  
  // Map: lowercase username -> UserProfile
  const usersByUsername = new Map<string, UserProfile>()
  // Map: email -> UserProfile
  const usersByEmail = new Map<string, UserProfile>()
  
  export function findUserByIdentifier(identifier: string): UserProfile | null {
    const clean = identifier.trim().toLowerCase()
    if (clean.includes('@')) {
      return usersByEmail.get(clean) || null
    }
    return usersByUsername.get(clean) || null
  }
  
  export function getUserByEmail(email: string): UserProfile | null {
    return usersByEmail.get(email.trim().toLowerCase()) || null
  }
  
  export function isUsernameTaken(username: string, currentEmail: string): boolean {
    const cleanUsername = username.trim().toLowerCase()
    const existing = usersByUsername.get(cleanUsername)
    if (!existing) return false
    return existing.email.toLowerCase() !== currentEmail.trim().toLowerCase()
  }
  
  export function saveUser(email: string, username: string): UserProfile {
    const cleanEmail = email.trim().toLowerCase()
    const cleanUsername = username.trim()
    const profile: UserProfile = { email: cleanEmail, username: cleanUsername }
  
    usersByEmail.set(cleanEmail, profile)
    usersByUsername.set(cleanUsername.toLowerCase(), profile)
  
    return profile
  }