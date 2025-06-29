"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Volume2, Phone, Loader2, CheckCircle, AlertCircle, Upload, FileText } from "lucide-react"
import { toast } from "sonner"

const countryCodes = [
  { code: "+1", country: "US/CA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
]

export default function VoiceInterview() {
  const [selectedType, setSelectedType] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("+91")
  const [callStatus, setCallStatus] = useState<"idle" | "requesting" | "success" | "error">("idle")
  const [isPlaying, setIsPlaying] = useState(false)
  const [callDetails, setCallDetails] = useState<any>(null)
  const [callRequested, setCallRequested] = useState(false)

  const interviewTypes = [
    { value: "technical", label: "Technical Position" },
    { value: "marketing", label: "Marketing Position" },
    { value: "behavioral", label: "General Position" },
    { value: "leadership", label: "Leadership Position" },
    { value: "general", label: "Entry Level Position" },
  ]

  const sampleQuestions = {
    technical: "What programming languages are you most comfortable with?",
    marketing: "What marketing tools and platforms have you worked with?",
    behavioral: "Tell me about your current role and experience.",
    leadership: "How many people have you managed in your previous roles?",
    general: "Why are you interested in this position?",
  }

  const requestCall = async () => {
    if (!phoneNumber || !selectedType) {
      toast.error("Please fill in all required fields")
      return
    }

    console.log('Starting voice interview call request...')
    console.log('Phone number:', phoneNumber)
    console.log('Selected type:', selectedType)

    setCallStatus("requesting")

    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`
      console.log('Full phone number:', fullPhoneNumber)
      
      const requestBody: any = {
        phoneNumber: fullPhoneNumber,
        interviewType: selectedType,
        userContext: `HR screening call for ${selectedType} position`
      }
      
      console.log('Sending request to backend:', requestBody)
      console.log('Request URL: /api/voice-interview')
      
      const response = await fetch('/api/voice-interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))

      const result = await response.json()
      console.log('Response result:', result)

      if (response.ok && result.success) {
        setCallStatus("success")
        setCallDetails(result)
        setCallRequested(true)
        toast.success(`HR screening call initiated! You'll receive a call at ${fullPhoneNumber} shortly.`)
        
        // Simulate AI speaking the question
        setIsPlaying(true)
        setTimeout(() => setIsPlaying(false), 3000)
      } else {
        setCallStatus("error")
        toast.error(result.error || "Failed to initiate call")
      }
    } catch (error) {
      console.error('Error requesting call:', error)
      setCallStatus("error")
      toast.error("Network error. Please try again.")
    }
  }

  const resetCall = () => {
    setCallStatus("idle")
    setCallDetails(null)
    setCurrentQuestion("")
    setIsPlaying(false)
    setCallRequested(false)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-white">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-black">AI HR Screening Call</h2>
      </div>

      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-black flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span>AI HR Screening Call Setup</span>
          </CardTitle>
          <CardDescription className="text-gray-600">
            Choose your position type and enter your phone number to receive a 5-minute HR screening call
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-black">Position Type</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Select position type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {interviewTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-black">Phone Number</Label>
            <div className="flex space-x-2">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-32 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center space-x-2">
                        <span>{country.flag}</span>
                        <span>{country.code}</span>
                        <span className="text-xs text-gray-500">{country.country}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="tel"
                placeholder="123-456-7890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 bg-white border-gray-300"
                disabled={callStatus === "requesting"}
              />
            </div>
          </div>

          <Button
            onClick={requestCall}
            disabled={!phoneNumber || !selectedType || callRequested || callStatus === "requesting"}
            className={`w-full bg-green-600 hover:bg-green-700 text-white ${callStatus === "requesting" ? "bg-gray-400 hover:bg-gray-400" : ""}`}
          >
            {callStatus === "requesting" ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Initiating AI Call...
              </>
            ) : callRequested ? "Call Requested!" : "Get HR Screening Call"}
          </Button>

          {callStatus === "success" && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">AI Call Initiated Successfully!</span>
              </div>
              <Button onClick={resetCall} variant="outline" className="w-full">
                Request Another Call
              </Button>
            </div>
          )}

          {callStatus === "error" && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Call Initiation Failed</span>
              </div>
              <Button onClick={resetCall} variant="outline" className="w-full">
                Try Again
              </Button>
            </div>
          )}

          {callRequested && (
            <div className="text-center text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
              HR will call you at {countryCode} {phoneNumber} for a 5-minute screening!
            </div>
          )}
        </CardContent>
      </Card>

      {currentQuestion && (
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-black">
              <Volume2 className="h-5 w-5" />
              <span>Sample Screening Question</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-lg text-black">{currentQuestion}</p>
            </div>

            {isPlaying && (
              <div className="mt-4 flex items-center space-x-2 text-blue-600">
                <Volume2 className="h-4 w-4" />
                <span className="text-sm">HR is speaking the question...</span>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-600">
              <p>
                <strong>Note:</strong> This is a 5-minute HR screening call. HR will ask a few basic questions to assess your fit for the position. If suitable, they'll schedule you for a full interview.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {callDetails && (
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Call Details</CardTitle>
            <CardDescription className="text-gray-600">
              Information about your AI interview call
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Call ID:</span>
                <span className="text-sm font-mono">{callDetails.callId || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Phone Number:</span>
                <span className="text-sm">{callDetails.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Interview Type:</span>
                <span className="text-sm capitalize">{selectedType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className="text-sm text-green-600 font-medium">Call Initiated</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-black">Interview Tips</CardTitle>
          <CardDescription className="text-gray-600">
            How to make the most of your AI interview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900">Before the Call</h4>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• Find a quiet environment with good phone signal</li>
                <li>• Have your resume and portfolio ready for reference</li>
                <li>• Prepare some questions to ask the AI interviewer</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900">During the Interview</h4>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• Speak clearly and at a moderate pace</li>
                <li>• Use the STAR method for behavioral questions</li>
                <li>• Provide specific examples from your experience</li>
                <li>• Ask for clarification if needed</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900">After the Call</h4>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• Review your performance and identify areas for improvement</li>
                <li>• Practice similar questions for future interviews</li>
                <li>• Schedule another practice session if needed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
