"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Stethoscope } from "lucide-react"

interface WelcomeStepProps {
  onNext: () => void
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="flex flex-col items-center text-center py-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 bg-blue-100 p-4 rounded-full"
      >
        <Stethoscope className="h-12 w-12 text-blue-600" />
      </motion.div>

      <motion.h2
        className="text-2xl font-bold mb-4 text-gray-900"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        AI-Powered Typhoid Symptom Checker
      </motion.h2>

      <motion.p
        className="text-gray-600 mb-8 max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Answer a few questions about your symptoms and health history to check your probability of having typhoid fever.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Button onClick={onNext} size="lg" className="bg-blue-600 hover:bg-blue-700">
          Get Started
        </Button>
      </motion.div>

      <motion.p
        className="mt-6 text-xs text-gray-500 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Note: This tool provides an estimate based on your symptoms and is not a substitute for professional medical
        diagnosis. Please consult a healthcare provider for proper evaluation.
      </motion.p>
    </div>
  )
}

export default WelcomeStep

