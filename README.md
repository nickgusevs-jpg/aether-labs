# AETHER // LABS - marketing site

Next.js (App Router) + Tailwind CSS + Framer Motion + NextAuth landing site and checkout flow for
the AETHER // LABS desktop app.

## Setup

```bash
npm install
cp .env.example .env.local
```

Then fill in `.env.local`:
- `NEXTAUTH_SECRET` - generate one with `openssl rand -base64 32`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - from https://console.cloud.google.com/apis/credentials
  (add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI)

Also open these two files and swap in your real contact handles (search for `TODO`):
- `lib/contact.ts` - Telegram link and WhatsApp number used on `/pay` and in the footer
- `.env.example` already documents the OAuth vars above

## Run

```bash
npm run dev
```

Prints a startup banner listing every route, then starts the dev server at http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## What's real vs. what's a stub

- **Google sign-in** works once you add real OAuth credentials.
- **Email + 6-digit code sign-in** is fully wired end to end (`/api/auth/otp/request` issues a code,
  NextAuth's `otp` credentials provider verifies it) but the code store (`lib/otpStore.ts`) is an
  **in-memory Map** - it resets on every server restart and won't work across multiple server
  instances. It also logs codes to the server console instead of emailing them (`sendOtp()`).
  Before going live: swap the store for Redis/a database table, and wire `sendOtp()` to a real
  provider (Resend, SendGrid, Twilio, etc.) - both are isolated in `lib/otpStore.ts` so nothing
  else needs to change.
- **`/pay` checkout** does not process payments. It builds an order summary and hands it to you via
  a prefilled Telegram or WhatsApp link - the Credit Card and PayPal options are intentionally
  disabled ("Coming Soon") until a real payment gateway (Stripe, PayPal, etc.) is integrated.
- **Pricing shown here is presentation only** - `lib/plans.ts` is not connected to the Electron
  app's actual license generation; keep the two in sync by hand, or wire this site to call the
  app's licensing logic if you want automated key delivery after payment.
