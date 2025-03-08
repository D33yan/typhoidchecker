"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Brain } from "lucide-react"

interface ProcessingStepProps {
  onComplete: () => void
}

const ProcessingStep = ({ onComplete }: ProcessingStepProps) => {
  useEffect(() => {
    // Simulate AI processing time
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        className="mb-8 bg-blue-100 p-6 rounded-full"
      >
        <Brain className="h-12 w-12 text-blue-600" />
      </motion.div>

      <h2 className="text-xl font-semibold mb-4 text-center">Analyzing Your Symptoms</h2>

      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5 }}
        />
      </div>

      <div className="mt-8 text-center max-w-md">
        <p className="text-gray-600">
          Our AI is analyzing your symptoms and risk factors to determine the probability of typhoid fever.
        </p>
      </div>
    </div>
  )
}

export default ProcessingStep

