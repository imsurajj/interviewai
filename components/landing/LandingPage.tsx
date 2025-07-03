import Hero from "./Hero"
import Features from "./Features"
import HowItWorks from "./HowItWorks"
import Testimonials from "./Testimonials"
import CTA from "./CTA"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { Pricing2 } from "./Pricing2"
import { Faq } from "./Faq"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing2 />
      <Testimonials />
      <Faq />
      <CTA />
      <Footer />
    </div>
  )
}
