"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

const features = [
  "AI-Powered Interview Practice",
  "Real-time Feedback & Analytics",
  "Voice & Chat Interviews",
  "24/7 Availability",
]

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("cta")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="cta" className="py-20 bg-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who have improved their interview skills with our AI-powered platform.
          </p>

          {/* Features List */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 text-blue-100 transition-all duration-500 delay-${index * 100} ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              >
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <Link href="/auth">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
