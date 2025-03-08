"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { SelectedSymptoms } from "@/components/symptom-checker"
import { ArrowLeft, ArrowRight, Thermometer } from "lucide-react"

interface SymptomsStepProps {
  selectedSymptoms: SelectedSymptoms
  setSelectedSymptoms: (symptoms: SelectedSymptoms) => void
  onNext: () => void
  onBack: () => void
}

const symptoms = [
  { id: "fever", label: "Fever (particularly high fever that increases gradually)" },
  { id: "headache", label: "Headache" },
  { id: "weakness", label: "Weakness and fatigue" },
  { id: "muscleAches", label: "Muscle aches" },
  { id: "abdominalPain", label: "Abdominal pain" },
  { id: "lossOfAppetite", label: "Loss of appetite" },
  { id: "nausea", label: "Nausea" },
  { id: "constipation", label: "Constipation or diarrhea" },
  { id: "rash", label: "Rash (rose-colored spots on chest and abdomen)" },
  { id: "dryCough", label: "Dry cough" },
  { id: "chills", label: "Chills" },
  { id: "weightLoss", label: "Weight loss" },
]

const SymptomsStep = ({ selectedSymptoms, setSelectedSymptoms, onNext, onBack }: SymptomsStepProps) => {
  const toggleSymptom = (id: string) => {
    setSelectedSymptoms({
      ...selectedSymptoms,
      [id]: !selectedSymptoms[id],
    })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="py-4">
      <div className="flex items-center mb-6">
        <Thermometer className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Select Your Symptoms</h2>
      </div>

      <p className="text-gray-600 mb-6">Please select all symptoms you've experienced in the past 1-2 weeks:</p>

      <motion.div className="space-y-3" variants={container} initial="hidden" animate="show">
        {symptoms.map((symptom) => (
          <motion.div
            key={symptom.id}
            className="flex items-start space-x-2 p-2 rounded-md hover:bg-gray-50"
            variants={item}
          >
            <Checkbox
              id={symptom.id}
              checked={selectedSymptoms[symptom.id] || false}
              onCheckedChange={() => toggleSymptom(symptom.id)}
            />
            <Label
              htmlFor={symptom.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {symptom.label}
            </Label>
          </motion.div>
        ))}
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

export default SymptomsStep

