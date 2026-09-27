import { Suspense } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PayForm from '@/components/PayForm'

export default function PayPage() {
  return (
    <>
      <Header />
      <main>
        {/* PayForm reads ?plan= via useSearchParams, which requires a Suspense boundary in the App Router */}
        <Suspense fallback={<div className="py-24 text-center text-white/40">Loading checkout...</div>}>
          <PayForm />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
