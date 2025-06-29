"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Google",
    content:
      "InterviewAce helped me land my dream job at Google. The AI feedback was incredibly detailed and helped me improve my technical communication skills.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "Microsoft",
    content:
      "The voice interview practice was game-changing. I felt so much more confident during my actual interviews after practicing with the AI.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist",
    company: "Netflix",
    content:
      "The analytics and progress tracking features are amazing. I could see exactly where I needed to improve and track my progress over time.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Frontend Developer",
    company: "Meta",
    content:
      "The behavioral interview practice helped me structure my answers better. I got offers from 3 different companies!",
    rating: 5,
  },
  {
    name: "Lisa Wang",
    role: "UX Designer",
    company: "Apple",
    content:
      "Amazing platform! The AI interviewer asks really relevant questions and the feedback is spot-on. Highly recommended!",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "DevOps Engineer",
    company: "Amazon",
    content:
      "Used this for 2 weeks before my interviews. The confidence boost was incredible and I aced all my technical rounds.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of professionals who have improved their interview skills with InterviewAce.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          <div className="flex animate-marquee-slow space-x-8">
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-black">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-black">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
