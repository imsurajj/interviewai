import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, MessageCircle, Calendar, Clock, TrendingUp, Eye } from "lucide-react"

const interviewHistory = [
  {
    id: 1,
    type: "Voice Interview",
    category: "Technical",
    date: "2024-01-15",
    duration: "25 min",
    score: 9.2,
    status: "Completed",
    icon: Mic,
  },
  {
    id: 2,
    type: "Chat Interview",
    category: "Behavioral",
    date: "2024-01-14",
    duration: "18 min",
    score: 8.7,
    status: "Completed",
    icon: MessageCircle,
  },
  {
    id: 3,
    type: "Voice Interview",
    category: "Leadership",
    date: "2024-01-12",
    duration: "22 min",
    score: 8.1,
    status: "Completed",
    icon: Mic,
  },
  {
    id: 4,
    type: "Chat Interview",
    category: "Technical",
    date: "2024-01-10",
    duration: "30 min",
    score: 7.9,
    status: "Completed",
    icon: MessageCircle,
  },
  {
    id: 5,
    type: "Voice Interview",
    category: "General",
    date: "2024-01-08",
    duration: "20 min",
    score: 8.5,
    status: "Completed",
    icon: Mic,
  },
]

export default function InterviewHistory() {
  const getScoreColor = (score: number) => {
    if (score >= 9) return "text-green-600 bg-green-50 border-green-200"
    if (score >= 8) return "text-red-600 bg-red-50 border-red-200"
    if (score >= 7) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  const averageScore = interviewHistory.reduce((sum, interview) => sum + interview.score, 0) / interviewHistory.length

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-white">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-black">Interview History</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Total Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{interviewHistory.length}</div>
            <p className="text-xs text-gray-600">Practice sessions completed</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{averageScore.toFixed(1)}/10</div>
            <p className="text-xs text-gray-600">Overall performance</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Total Time</CardTitle>
            <Clock className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">1h 55m</div>
            <p className="text-xs text-gray-600">Time spent practicing</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-black">Recent Interviews</CardTitle>
          <CardDescription className="text-gray-600">Your interview practice history and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviewHistory.map((interview) => (
              <div
                key={interview.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <interview.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-black">{interview.type}</h3>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        {interview.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{interview.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{interview.duration}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getScoreColor(interview.score)}`}
                  >
                    {interview.score}/10
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-black hover:bg-gray-50 bg-transparent"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
