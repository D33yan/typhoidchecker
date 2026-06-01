"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShieldAlert, Activity, ClipboardList, BrainCircuit } from "lucide-react"

interface WelcomeStepProps {
  onNext: () => void
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="py-6 max-w-2xl mx-auto">
      {/* Privacy Protocol Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-3 rounded-lg border border-teal-100 bg-teal-50/20 text-teal-800 text-xs flex items-start space-x-2.5"
      >
        <ShieldAlert className="h-4.5 w-4.5 text-teal-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Local Sandbox Triage Protocol:</span> This assessment runs entirely via client-side Edge AI. Your answers are processed strictly in your browser's local memory and are never transmitted, saved, or uploaded to any server.
        </div>
      </motion.div>

      {/* Main Title & Clinical Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center justify-center p-3 rounded-full bg-slate-50 border border-slate-100 mb-4"
        >
          <Activity className="h-8 w-8 text-teal-600" />
        </motion.div>

        <motion.h2
          className="text-2xl font-bold tracking-tight text-slate-900 mb-3"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Clinical Typhoid Risk Assessment
        </motion.h2>

        <motion.p
          className="text-sm text-slate-500 max-w-lg mx-auto"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          Evaluate patient probability of contracting typhoid fever using a trained feedforward neural network model based on WHO diagnostic risk variables.
        </motion.p>
      </div>

      {/* Triage Roadmap */}
      <motion.div
        className="space-y-4 mb-8 bg-slate-50/50 rounded-xl p-5 border border-slate-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Diagnostic Evaluation Phases</h3>
        
        <div className="flex items-start space-x-3.5">
          <div className="h-6 w-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 flex-shrink-0 mt-0.5">
            1
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Epidemiological Profile</h4>
            <p className="text-xs text-slate-500">Intake of patient age, travel to endemic regions, and relapse predisposition.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3.5 pt-3 border-t border-slate-100">
          <div className="h-6 w-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 flex-shrink-0 mt-0.5">
            2
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Symptom Severity Analysis</h4>
            <p className="text-xs text-slate-500">Evaluation of typhoid-specific physiological indicators (Fever, Cramping, Weakness).</p>
          </div>
        </div>

        <div className="flex items-start space-x-3.5 pt-3 border-t border-slate-100">
          <div className="h-6 w-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 flex-shrink-0 mt-0.5">
            3
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-800 flex items-center">
              Edge AI Computational Report
              <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-teal-50 text-teal-700 border border-teal-100">
                <BrainCircuit className="h-2.5 w-2.5 mr-1" /> MLP Model
              </span>
            </h4>
            <p className="text-xs text-slate-500">Real-time local neural network forward-pass analysis, risk banding, and printable doctor report.</p>
          </div>
        </div>
      </motion.div>

      {/* CTA Button & Professional Disclaimer */}
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button onClick={onNext} size="lg" className="w-full sm:w-auto px-10 bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors text-white font-semibold">
          Begin Assessment
        </Button>

        <p className="text-[11px] text-slate-400 text-center leading-relaxed">
          <span className="font-semibold text-slate-500">Disclaimer:</span> This digital simulator operates purely for educational screening based on statistical correlations. It is <span className="underline">not</span> a clinical diagnostic device. Definitive typhoid fever diagnosis requires official blood cultures (Widal/Typhidot tests) performed by certified laboratory technicians.
        </p>
      </motion.div>
    </div>
  )
}

export default WelcomeStep
