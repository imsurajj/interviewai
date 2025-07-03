import { UserPlus, Mic, TrendingUp } from "lucide-react"

const steps = [
  {
    title: "Sign Up",
    description: "Create your free InterviewLab account in seconds.",
    icon: <UserPlus className="size-7 text-red-600" />,
  },
  {
    title: "Practice",
    description: "Start a mock interview with voice or chat instantly.",
    icon: <Mic className="size-7 text-red-600" />,
  },
  {
    title: "Improve",
    description: "Get feedback, track your progress, and grow your skills.",
    icon: <TrendingUp className="size-7 text-red-600" />,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-2 text-black">How It Works</h2>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-2xl bg-white relative">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-gray-100 text-xl font-bold text-red-600">
                {step.icon}
              </div>
              <div className="mb-2 text-sm font-semibold text-gray-400">Step {i + 1}</div>
              <h3 className="mb-2 text-xl font-semibold text-black">{step.title}</h3>
              <p className="text-gray-600 text-base">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
