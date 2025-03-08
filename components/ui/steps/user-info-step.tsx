"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import type { UserInfo } from "@/components/symptom-checker"
import { ArrowLeft, ArrowRight, User } from "lucide-react"

interface UserInfoStepProps {
  userInfo: UserInfo
  setUserInfo: (info: UserInfo) => void
  onNext: () => void
  onBack: () => void
}

const UserInfoStep = ({ userInfo, setUserInfo, onNext, onBack }: UserInfoStepProps) => {
  const handleChange = <K extends keyof UserInfo>(field: K, value: UserInfo[K]) => {
    setUserInfo({ ...userInfo, [field]: value });
  };
  

  return (
    <div className="py-4">
      <div className="flex items-center mb-6">
        <User className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
      </div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={userInfo.age || ""}
              onChange={(e) => handleChange("age", Number.parseInt(e.target.value) || 0)}
              placeholder="Enter your age"
            />
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              value={userInfo.gender}
              onValueChange={(value) => handleChange("gender", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location (Country/Region)</Label>
          <Input
            id="location"
            value={userInfo.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Enter your location"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="recent-travel">Recent travel to typhoid-endemic areas</Label>
              <p className="text-sm text-gray-500">South Asia, Southeast Asia, Africa, etc.</p>
            </div>
            <Switch
              id="recent-travel"
              checked={userInfo.recentTravel}
              onCheckedChange={(checked) => handleChange("recentTravel", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="previous-history">Previous history of typhoid</Label>
              <p className="text-sm text-gray-500">Have you been diagnosed with typhoid before?</p>
            </div>
            <Switch
              id="previous-history"
              checked={userInfo.previousHistory}
              onCheckedChange={(checked) => handleChange("previousHistory", checked)}
            />
          </div>
        </div>
      </motion.div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default UserInfoStep

