"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Activity, AlertCircle } from "lucide-react"
import WelcomeStep from "./ui/steps/welcome-step"
import UserInfoStep from "./ui/steps/user-info-step"
import SymptomsStep from "./ui/steps/symptoms-step"
import ProcessingStep from "./ui/steps/processing-step"
import ResultsStep from "./ui/steps/results-step"

export type UserInfo = {
  age: number
  gender: string
  location: string
  recentTravel: boolean
  previousHistory: boolean
}

export type SelectedSymptoms = {
  [key: string]: boolean
}

const SymptomChecker = () => {
  const [step, setStep] = useState(0)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    age: 30,
    gender: "",
    location: "",
    recentTravel: false,
    previousHistory: false,
  })
  const [selectedSymptoms, setSelectedSymptoms] = useState<SelectedSymptoms>({})
  const [result, setResult] = useState<number | null>(null)

  const totalSteps = 5
  const progress = (step / (totalSteps - 1)) * 100

  const handleNext = () => {
    if (step === 3) {
      // Calculate result before showing results screen
      calculateResult()
    }
    setStep((prev) => Math.min(prev + 1, totalSteps - 1))
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0))
  }

  const calculateResult = () => {
    // This is a simplified algorithm to calculate typhoid probability
    // In a real app, this would be replaced with an actual AI model

    let score = 0
    const highRiskSymptoms = ["fever", "headache", "abdominalPain", "weakness"]
    const mediumRiskSymptoms = ["lossOfAppetite", "nausea", "constipation", "rash"]
    const lowRiskSymptoms = ["dryCough", "muscleAches", "chills", "weightLoss"]

    // Count symptoms by risk level
    Object.entries(selectedSymptoms).forEach(([symptom, isSelected]) => {
      if (!isSelected) return

      if (highRiskSymptoms.includes(symptom)) score += 15
      else if (mediumRiskSymptoms.includes(symptom)) score += 10
      else if (lowRiskSymptoms.includes(symptom)) score += 5
    })

    // Add risk factors from user info
    if (userInfo.recentTravel) score += 15
    if (userInfo.previousHistory) score += 20

    // Cap the score at 100
    const finalScore = Math.min(score, 100)
    setResult(finalScore)
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return <WelcomeStep onNext={handleNext} />
      case 1:
        return <UserInfoStep userInfo={userInfo} setUserInfo={setUserInfo} onNext={handleNext} onBack={handleBack} />
      case 2:
        return (
          <SymptomsStep
            selectedSymptoms={selectedSymptoms}
            setSelectedSymptoms={setSelectedSymptoms}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 3:
        return <ProcessingStep onComplete={handleNext} />
      case 4:
        return <ResultsStep result={result} onReset={() => setStep(0)} />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Activity className="h-5 w-5 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Typhoid Symptom Checker</h1>
          </div>
          {step > 0 && step < 4 && (
            <div className="flex items-center text-sm text-gray-500">
              <span>
                Step {step} of {totalSteps - 2}
              </span>
            </div>
          )}
        </div>

        {step > 0 && step < 4 && <Progress value={progress} className="h-2 mb-6" />}
      </div>

      <motion.div
        className="w-full max-w-3xl"
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-none shadow-lg">
          <CardContent className="p-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-6 text-center text-sm text-gray-500 flex items-center">
        <AlertCircle className="h-4 w-4 mr-2" />
        <p>This tool is for informational purposes only and does not replace professional medical advice.</p>
      </div>
    </div>
  )
}

export default SymptomChecker

