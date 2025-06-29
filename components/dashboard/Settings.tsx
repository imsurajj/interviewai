"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Mic, Shield } from "lucide-react"

export default function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [chatEnabled, setChatEnabled] = useState(true)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-white">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-black">Settings</h2>
      </div>

      <div className="grid gap-6">
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-black">
              <User className="h-5 w-5" />
              <span>Profile Settings</span>
            </CardTitle>
            <CardDescription className="text-gray-600">Manage your account information and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-black">
                  First Name
                </Label>
                <Input id="firstName" defaultValue="Demo" className="bg-white border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-black">
                  Last Name
                </Label>
                <Input id="lastName" defaultValue="User" className="bg-white border-gray-300" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="demo@interviewace.com"
                className="bg-white border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-black">
                Current Job Title
              </Label>
              <Input id="jobTitle" placeholder="e.g., Software Engineer" className="bg-white border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label className="text-black">Years of Experience</Label>
              <Select>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="2-5">2-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Profile</Button>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-black">
              <Bell className="h-5 w-5" />
              <span>Notification Settings</span>
            </CardTitle>
            <CardDescription className="text-gray-600">Configure how you want to receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-black">Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive email updates about your interview progress</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-black">Practice Reminders</Label>
                <p className="text-sm text-gray-600">Get reminded to practice regularly</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-black">Performance Updates</Label>
                <p className="text-sm text-gray-600">Receive updates when your scores improve</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-black">
              <Mic className="h-5 w-5" />
              <span>Interview Preferences</span>
            </CardTitle>
            <CardDescription className="text-gray-600">Customize your interview practice experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-black">Voice Interview Mode</Label>
                <p className="text-sm text-gray-600">Enable voice-based interview practice</p>
              </div>
              <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-black">Chat Interview Mode</Label>
                <p className="text-sm text-gray-600">Enable text-based interview practice</p>
              </div>
              <Switch checked={chatEnabled} onCheckedChange={setChatEnabled} />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-black">Preferred Interview Duration</Label>
              <Select>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-black">Difficulty Level</Label>
              <Select>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-black">
              <Shield className="h-5 w-5" />
              <span>Privacy & Security</span>
            </CardTitle>
            <CardDescription className="text-gray-600">Manage your privacy and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-black">
                Current Password
              </Label>
              <Input id="currentPassword" type="password" className="bg-white border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-black">
                New Password
              </Label>
              <Input id="newPassword" type="password" className="bg-white border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-black">
                Confirm New Password
              </Label>
              <Input id="confirmPassword" type="password" className="bg-white border-gray-300" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Update Password</Button>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-black">Data Analytics</Label>
                <p className="text-sm text-gray-600">Allow us to analyze your interview data to improve our AI</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="pt-4">
              <Button variant="destructive">Delete Account</Button>
              <p className="text-sm text-gray-600 mt-2">
                This action cannot be undone. All your interview data will be permanently deleted.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
