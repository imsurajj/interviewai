import {
  Mic,
  MessageCircle,
  TrendingUp,
  ShieldCheck,
  Clock,
  Zap,
} from "lucide-react";

const reasons = [
  {
    title: "Voice Practice",
    description: "Practice real interview questions with AI-powered voice calls.",
    icon: <Mic className="size-7 text-red-600" />,
  },
  {
    title: "Chat Practice",
    description: "Get instant feedback and tips with our AI chat interviewer.",
    icon: <MessageCircle className="size-7 text-red-600" />,
  },
  {
    title: "Progress Tracking",
    description: "See your improvement over time with detailed analytics.",
    icon: <TrendingUp className="size-7 text-red-600" />,
  },
  {
    title: "Privacy & Security",
    description: "Your practice sessions are private and secure.",
    icon: <ShieldCheck className="size-7 text-red-600" />,
  },
  {
    title: "24/7 Access",
    description: "Practice anytime, anywhere, on your schedule.",
    icon: <Clock className="size-7 text-red-600" />,
  },
  {
    title: "Instant Results",
    description: "Get actionable feedback right after each session.",
    icon: <Zap className="size-7 text-red-600" />,
  },
];

export default function Features() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-2 text-black">Why Choose InterviewLab?</h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-2xl bg-white">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-gray-100">
                {reason.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-black">{reason.title}</h3>
              <p className="text-gray-600 text-base">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
