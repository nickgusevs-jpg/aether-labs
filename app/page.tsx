import AboutSection from '@/components/AboutSection'
import BentoGrid from '@/components/BentoGrid'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PricingSection from '@/components/PricingSection'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BentoGrid />
        <AboutSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  )
}
