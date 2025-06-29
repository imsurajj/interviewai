import { Brain, Clock, BarChart3, Users, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Feedback",
    description: "Get intelligent feedback on your answers, body language, and communication skills.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Practice anytime, anywhere. Our AI interviewer is always ready when you are.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track your progress with detailed analytics and improvement suggestions.",
  },
  {
    icon: Users,
    title: "Multiple Interview Types",
    description: "Practice technical, behavioral, and industry-specific interview scenarios.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your practice sessions are completely private and secure.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get immediate feedback and suggestions for improvement after each session.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Why Choose InterviewAce?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge AI technology with proven interview techniques to give you the best
            preparation experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-black">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
