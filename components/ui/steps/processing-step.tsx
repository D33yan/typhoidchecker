"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { BrainCircuit } from "lucide-react"

interface ProcessingStepProps {
  onComplete: () => void
}

const ProcessingStep = ({ onComplete }: ProcessingStepProps) => {
  useEffect(() => {
    // Simulate high-fidelity AI computational processing time
    const timer = setTimeout(() => {
      onComplete()
    }, 2800)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="flex flex-col items-center justify-center py-16 max-w-md mx-auto">
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "easeInOut"
        }}
        className="mb-8 bg-teal-50/60 p-5 rounded-full border border-teal-100 text-teal-600 flex items-center justify-center shadow-sm"
      >
        <BrainCircuit className="h-10 w-10" />
      </motion.div>

      <h2 className="text-lg font-bold text-slate-800 mb-2 text-center">Executing Clinical Inference Engine</h2>
      <p className="text-xs text-slate-400 text-center mb-6 leading-normal">
        Standardizing inputs, calculating Standard Scaler coefficients, and passing patient profile vectors through the neural network feedforward layers...
      </p>

      <div className="w-56 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
        <motion.div
          className="h-full bg-teal-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}

export default ProcessingStep
