import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { verify } from '@/lib/otpStore'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      // TODO: INSERT YOUR GOOGLE OAUTH CLIENT ID/SECRET HERE (via .env.local - see .env.example)
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    // Email + 6-digit OTP. The actual code issuing/sending happens in /api/auth/otp/request;
    // this provider only checks the code the user typed against lib/otpStore.
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
  pages: { signIn: '/' }, // the sign-in UI is the AuthModal on the landing page, not a separate route
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
