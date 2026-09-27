import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { verify } from '@/lib/otpStore'

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    CredentialsProvider({
      id: 'otp',
      name: 'Email code',
      credentials: {
        email: { label: 'Email', type: 'email' },
        code: { label: 'Code', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.code) return null
        const result = verify(credentials.email, credentials.code)
        if (result !== 'ok') return null
        return { id: credentials.email, email: credentials.email, name: credentials.email.split('@')[0] }
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/' },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
