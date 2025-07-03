"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section id="cta" className="py-16 bg-red-600 text-center">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Start Practicing for Your Next Interview</h2>
        <p className="text-lg text-red-100 mb-8">Join InterviewLab and get instant feedback to boost your confidence.</p>
        <Link href="/auth">
          <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-3 shadow">
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
