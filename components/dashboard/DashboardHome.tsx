import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MessageCircle, TrendingUp, Clock, Award, Target } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    title: "Total Interviews",
    value: "24",
    icon: Target,
    description: "Practice sessions completed",
  },
  {
    title: "Average Score",
    value: "8.5/10",
    icon: Award,
    description: "Your performance rating",
  },
  {
    title: "Time Practiced",
    value: "12.5h",
    icon: Clock,
    description: "Total practice time",
  },
  {
    title: "Improvement",
    value: "+23%",
    icon: TrendingUp,
    description: "Score improvement this month",
  },
]

export default function DashboardHome() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-white">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-black">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stat.value}</div>
              <p className="text-xs text-gray-600">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Quick Start</CardTitle>
            <CardDescription className="text-gray-600">Choose your preferred interview practice method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-4 hover:shadow-md transition-shadow bg-white border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mic className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-black">Voice Interview</h3>
                    <p className="text-sm text-gray-600">Practice with AI voice calls</p>
                  </div>
                </div>
                <Link href="/dashboard/voice-interview" className="mt-4 block">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Start Voice Practice</Button>
                </Link>
              </Card>

              <Card className="p-4 hover:shadow-md transition-shadow bg-white border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-black">Chat Interview</h3>
                    <p className="text-sm text-gray-600">Practice with AI chatbot</p>
                  </div>
                </div>
                <Link href="/dashboard/chat-interview" className="mt-4 block">
                  <Button className="w-full bg-transparent" variant="outline">
                    Start Chat Practice
                  </Button>
                </Link>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">Voice Interview - Technical</p>
                  <p className="text-xs text-gray-600">2 hours ago</p>
                </div>
                <div className="text-sm font-medium text-black">9.2/10</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">Chat Interview - Behavioral</p>
                  <p className="text-xs text-gray-600">1 day ago</p>
                </div>
                <div className="text-sm font-medium text-black">8.7/10</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">Voice Interview - Leadership</p>
                  <p className="text-xs text-gray-600">3 days ago</p>
                </div>
                <div className="text-sm font-medium text-black">8.1/10</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
