import Hero from "./Hero"
import Features from "./Features"
import HowItWorks from "./HowItWorks"
import Testimonials from "./Testimonials"
import CTA from "./CTA"
import Footer from "./Footer"
import Navbar from "./Navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
