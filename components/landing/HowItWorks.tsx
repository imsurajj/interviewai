import { UserPlus, Settings, Mic, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your account and set up your profile in minutes.",
  },
  {
    icon: Settings,
    title: "Choose Your Focus",
    description: "Select the type of interview and industry you want to practice for.",
  },
  {
    icon: Mic,
    title: "Start Practicing",
    description: "Begin your voice or chat interview session with our AI interviewer.",
  },
  {
    icon: TrendingUp,
    title: "Improve & Repeat",
    description: "Review feedback, track progress, and continue improving your skills.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with interview practice in just four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mx-auto mb-6">
                <step.icon className="h-10 w-10 text-white" />
              </div>
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-black">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
