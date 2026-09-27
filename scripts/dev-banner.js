// Prints a friendly startup banner before Next's own dev server output.
// Wired up via the "predev" script in package.json, so it runs automatically on `npm run dev`.
const PORT = process.env.PORT || 3000
const routes = [
  ['/', 'Landing page (Hero, Bento grid, Pricing)'],
  ['/pay', 'Checkout / Pay page'],
  ['/api/auth/[...nextauth]', 'NextAuth routes (Google + Email/OTP)'],
  ['/api/auth/otp/request', 'Issues a one-time code for an email (POST)'],
  ['/api/auth/otp/verify', 'Verifies an email + code pair (POST)']
]

console.log('')
console.log(`[INFO] SaaS Platform running at http://localhost:${PORT}`)
console.log('[INFO] Routes available:')
for (const [path, desc] of routes) {
  console.log(`       ${path.padEnd(28)} - ${desc}`)
}
console.log('[INFO] Starting Next.js dev server...')
console.log('')
