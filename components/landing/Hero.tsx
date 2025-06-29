import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            Master Your Interview Skills with <span className="text-blue-600">AI-Powered Practice</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Practice interviews through voice calls and chat conversations with our advanced AI. Get real-time feedback,
            improve your responses, and land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth">
              <Button size="lg" className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white">
                Start Practicing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3 border-gray-300 text-black hover:bg-gray-50 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
