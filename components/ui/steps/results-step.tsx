"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ResultsStepProps {
  result: number | null
  onReset: () => void
}

const ResultsStep = ({ result, onReset }: ResultsStepProps) => {
  const getRiskLevel = () => {
    if (result === null) return { level: "Unknown", color: "gray" }
    if (result < 30) return { level: "Low", color: "green" }
    if (result < 60) return { level: "Moderate", color: "yellow" }
    return { level: "High", color: "red" }
  }

  const risk = getRiskLevel()

  const recommendations = [
    "Consult a healthcare provider for proper diagnosis and treatment",
    "Get a blood culture test to confirm typhoid fever",
    "Stay hydrated and rest",
    "Monitor your temperature regularly",
    "Avoid self-medication, especially antibiotics without prescription",
  ]

  return (
    <div className="py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-xl font-semibold mb-6 text-center">Your Typhoid Risk Assessment</h2>

        <div className="flex justify-center mb-8">
          <motion.div
            className="relative w-48 h-48"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={
                    risk.color === "green"
                      ? "#10b981"
                      : risk.color === "yellow"
                        ? "#f59e0b"
                        : risk.color === "red"
                          ? "#ef4444"
                          : "#6b7280"
                  }
                  strokeWidth="10"
                  strokeDasharray="282.7"
                  strokeDashoffset="282.7"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 282.7 }}
                  animate={{
                    strokeDashoffset: 282.7 - (282.7 * (result || 0)) / 100,
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.span
                  className="text-4xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  {result}%
                </motion.span>
                <motion.span
                  className={`text-sm font-medium ${
                    risk.color === "green"
                      ? "text-green-600"
                      : risk.color === "yellow"
                        ? "text-amber-600"
                        : risk.color === "red"
                          ? "text-red-600"
                          : "text-gray-600"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7, duration: 0.5 }}
                >
                  {risk.level} Risk
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="mb-6 border-l-4 bg-blue-50 border-blue-500">
            <CardContent className="p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-900">Important Note</h3>
                  <p className="text-sm text-blue-800">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    This assessment is based on the symptoms you've provided and is not a definitive diagnosis. Typhoid
                    fever requires proper medical diagnosis through blood tests.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 mb-8">
            <h3 className="font-semibold">Recommendations:</h3>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                >
                  <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <span className="text-sm">{rec}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="outline" onClick={onReset} className="flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            Start Over
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => window.open("https://www.who.int/news-room/fact-sheets/detail/typhoid", "_blank")}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Learn More About Typhoid
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default ResultsStep

