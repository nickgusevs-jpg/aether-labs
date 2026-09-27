export type PlanId = 'trial' | 'week' | 'month' | 'year' | 'lifetime'

export interface Plan {
  id: PlanId
  name: string
  price: number // USD. 0 = free trial
  period: string // short label shown after the price, e.g. "/ 1 day"
  tagline: string
  features: string[]
  highlight?: boolean // "Most Popular" styling
}

export const PLANS: Plan[] = [
  {
    id: 'trial',
    name: '1-Day Free Trial',
    price: 0,
    period: '/ 1 day',
    tagline: 'Full access, capped volume - see real leads before you pay.',
    features: ['Up to 100 leads', '1 country', 'CSV export', 'Email support']
  },
  {
    id: 'week',
    name: 'Weekly Pass',
    price: 19,
    period: '/ 7 days',
    tagline: 'Short campaigns and one-off pushes.',
    features: ['Up to 500 leads / day', 'All 199 countries', 'CSV, JSON export', 'Email support']
  },
  {
    id: 'month',
    name: 'Monthly License',
    price: 49,
    period: '/ 30 days',
    tagline: 'The default for an active outbound team.',
    features: ['Unlimited leads', 'All 199 countries', 'CSV, JSON, XLSX export', 'Priority email support'],
    highlight: true
  },
  {
    id: 'year',
    name: 'Annual Pass',
    price: 199,
    period: '/ 365 days',
    tagline: 'Best value for continuous prospecting.',
    features: ['Unlimited leads', 'All 199 countries', 'All export formats', 'Pitch generator', 'Priority support']
  },
  {
    id: 'lifetime',
    name: 'Lifetime VIP',
    price: 399,
    period: 'one-time',
    tagline: 'Pay once, use forever. No renewals.',
    features: ['Everything in Annual', 'Lifetime updates', 'No expiry, ever', 'Priority support']
  }
]

export const planById = (id: string): Plan | undefined => PLANS.find((p) => p.id === id)
