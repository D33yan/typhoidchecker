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

// 4 active symptoms with highly detailed clinical triage definitions
const symptoms = [
  { 
    id: "fever", 
    title: "Gradual High Fever",
    desc: "A persistent, progressively rising body temperature (often described as a 'step-ladder' pattern) that climbs day by day to 39°C - 40°C (102°F - 104°F)." 
  },
  { 
    id: "headache", 
    title: "Severe Frontal Headache",
    desc: "A persistent, throbbing pain primarily concentrated in the frontal region of the head, unresponsive to typical over-the-counter pain medications." 
  },
  { 
    id: "abdominalPain", 
    title: "Abdominal Pain & Gastrointestinal Distress",
    desc: "Sharp or dull abdominal cramps, significant abdominal tenderness, or a severe shift in bowel habits (either constipation or diarrhea)." 
  },
  { 
    id: "weakness", 
    title: "Systemic Weakness & Fatigue",
    desc: "Profound physical exhaustion, lethargy, muscle aches, and complete lack of energy, often making basic movement highly taxing." 
  },
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
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="py-2 max-w-2xl mx-auto">
      {/* Step Header */}
      <div className="flex items-center space-x-2.5 mb-6 border-b border-slate-100 pb-4">
        <div className="p-1.5 rounded bg-teal-50 border border-teal-100 text-teal-600">
          <Thermometer className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Clinical Symptom Intake</h2>
          <p className="text-xs text-slate-500">Phase 2: Physiological Profile Assessment</p>
        </div>
      </div>
      <p className="text-sm text-slate-500 mb-6">Select all symptoms the patient has actively experienced over the past 14 days:</p>

      {/* Structured Checkbox Cards */}
      <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
        {symptoms.map((symptom) => (
          <motion.div
            key={symptom.id}
            className={`flex items-start space-x-4 p-4 rounded-xl border transition-all cursor-pointer select-none bg-white ${
              selectedSymptoms[symptom.id]
                ? "border-teal-500 ring-2 ring-teal-500/10 shadow-sm"
                : "border-slate-100 hover:border-slate-200"
            }`}
            variants={item}
            onClick={() => toggleSymptom(symptom.id)}
          >
            <div className="mt-1 flex-shrink-0">
              <Checkbox
                id={symptom.id}
                checked={selectedSymptoms[symptom.id] || false}
                onCheckedChange={() => toggleSymptom(symptom.id)}
                className="h-4.5 w-4.5 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                onClick={(e) => e.stopPropagation()} // Prevent double triggers
              />
            </div>
            
            <div className="space-y-1 cursor-pointer flex-grow" onClick={(e) => e.stopPropagation()}>
              <Label
                htmlFor={symptom.id}
                className="text-sm font-bold text-slate-800 cursor-pointer block"
                onClick={() => toggleSymptom(symptom.id)}
              >
                {symptom.title}
              </Label>
              <p className="text-xs text-slate-400 leading-relaxed" onClick={() => toggleSymptom(symptom.id)}>
                {symptom.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10 pt-4 border-t border-slate-100">
        <Button variant="outline" onClick={onBack} className="border-slate-200 hover:bg-slate-50 text-slate-600">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} className="bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-sm transition-colors">
          Analyze Profile
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default SymptomsStep
