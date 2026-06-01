"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, Printer, ShieldAlert, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ResultsStepProps {
  result: number | null
  onReset: () => void
}

const ResultsStep = ({ result, onReset }: ResultsStepProps) => {
  const getTriageCategory = () => {
    if (result === null) return { category: "Unclassified", level: "Unknown", color: "text-slate-500", bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-100 text-slate-700" }
    if (result < 30) {
      return { 
        category: "Category I - Low Triage", 
        level: "Low Risk", 
        color: "text-emerald-700", 
        bg: "bg-emerald-50/30", 
        border: "border-emerald-100",
        badge: "bg-emerald-50 text-emerald-800 border-emerald-100",
        desc: "Low probability of active Salmonella enterica serovar Typhi infection. Symptoms may relate to standard systemic viral pathogens. Home care and monitoring are advised."
      }
    }
    if (result < 60) {
      return { 
        category: "Category II - Observation Triage", 
        level: "Moderate Risk", 
        color: "text-amber-700", 
        bg: "bg-amber-50/20", 
        border: "border-amber-100",
        badge: "bg-amber-50 text-amber-800 border-amber-100",
        desc: "Moderate clinical correlation with Typhoid Fever. Notable presence of focal symptoms or epidemiological risk. Scheduled clinical evaluation and blood culture cultures are highly recommended."
      }
    }
    return { 
      category: "Category III - Urgent Clinical Triage", 
      level: "High Risk", 
      color: "text-rose-700", 
      bg: "bg-rose-50/25", 
      border: "border-rose-100",
      badge: "bg-rose-50 text-rose-800 border-rose-100",
      desc: "High clinical and epidemiological correlation with Typhoid Fever. Prompt laboratory diagnostics (blood culture, Widal test) and evaluation by a medical officer for antibiotic therapy are strongly indicated."
    }
  }

  const triage = getTriageCategory()
  const score = result !== null ? result : 0

  // Standard medical recommendations based on triage level
  const getRecommendations = () => {
    if (score < 30) {
      return [
        "Monitor oral temperature twice daily. Keep a written log.",
        "Maintain hydration with clean, filtered, or boiled water.",
        "Rest and consume easily digestible, thoroughly cooked foods.",
        "Re-evaluate if symptoms persist past 72 hours or body temperature increases."
      ]
    }
    if (score < 60) {
      return [
        "Schedule a professional medical consultation within 24-48 hours.",
        "Ask your physician about obtaining a blood culture or Typhidot test to confirm/rule out Salmonella enterica.",
        "Strictly avoid self-medicating with broad-spectrum antibiotics, as this can mask bacterial cultures and delay correct diagnosis.",
        "Ensure all drinking water is vigorously boiled and practice meticulous hand hygiene to prevent potential transmission."
      ]
    }
    return [
      "Consult a healthcare professional or visit a diagnostic clinic immediately for professional assessment.",
      "Obtain a blood culture or stool culture test. A blood culture is the diagnostic gold standard for typhoid fever.",
      "Discuss appropriate prescription antimicrobial therapy (e.g., fluoroquinolones, cephalosporins, or azithromycin) with a doctor.",
      "Isolate food preparation tasks and utilize separate utensils. Practice extreme hygiene to protect household members from secondary infection."
    ]
  }

  const recommendations = getRecommendations()

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <div className="py-2 max-w-2xl mx-auto">
      {/* Dynamic CSS block to handle print layouts */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
            font-size: 12px !important;
          }
          .no-print {
            display: none !important;
          }
          .print-card {
            border: 1px solid #e2e8f0 !important;
            box-shadow: none !important;
            padding: 20px !important;
            margin: 0 !important;
          }
          .print-header {
            display: block !important;
            border-bottom: 2px solid #0f172a !important;
            padding-bottom: 10px !important;
            margin-bottom: 20px !important;
          }
          .print-triage-gauge {
            border: 1px solid #cbd5e1 !important;
            background: #f8fafc !important;
            padding: 10px !important;
          }
        }
      `}</style>

      {/* Hidden print header that only shows when the user prints */}
      <div className="hidden print-header text-left">
        <h1 className="text-xl font-bold uppercase tracking-tight">CLINICAL TRIAGE ASSESSMENT REPORT</h1>
        <p className="text-[10px] text-slate-500">Document Generated: {new Date().toLocaleDateString()} | Powered by Computational MLP Edge AI</p>
      </div>

      <div className="print-card space-y-6">
        {/* Triage Overview Block */}
        <div className="text-center mb-6">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${triage.badge} mb-3`}>
            {triage.category}
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Diagnostic Probability Report</h2>
          <p className="text-xs text-slate-400">Assessed Probability Index of Salmonella Enterica serovar Typhi Infection</p>
        </div>

        {/* Matured Linear Risk Gauge */}
        <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 print-triage-gauge space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
            <span>LOW PREVALENCE</span>
            <span>OBSERVATION</span>
            <span>URGENT TRIAGE</span>
          </div>
          
          {/* Continuous Risk Bar */}
          <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
            <div className="w-[30%] h-full bg-emerald-500/80" />
            <div className="w-[30%] h-full bg-amber-500/80" />
            <div className="w-[40%] h-full bg-rose-500/80" />
            
            {/* Pointer Indicator */}
            <motion.div 
              className="absolute top-0 bottom-0 w-1.5 bg-slate-900 border border-white shadow-md rounded-full -ml-0.75"
              initial={{ left: "0%" }}
              animate={{ left: `${score}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-xs text-slate-400 font-medium">Risk Score: <span className="font-bold text-slate-700">{score}%</span></div>
            <div className={`text-sm font-black uppercase tracking-wider ${triage.color}`}>{triage.level}</div>
          </div>
        </div>

        {/* Triage Clinical Analysis Card */}
        <div className="border border-slate-100 rounded-xl p-5 space-y-4 bg-white">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Epidemiological & Symptom Profile</h3>
          
          <div className="text-xs text-slate-600 leading-relaxed pb-3 border-b border-slate-100">
            {triage.desc}
          </div>

          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-bold text-slate-800">Dynamic Risk Recommendations:</h4>
            <ul className="space-y-2.5">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start text-xs text-slate-600 leading-relaxed">
                  <div className="h-5 w-5 rounded bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center font-bold text-[10px] mr-2.5 flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Red Flag Warning Box (Clinical Safety) */}
        {score >= 30 && (
          <Card className="border-rose-200 bg-rose-50/15 border-l-4">
            <CardContent className="p-4 flex items-start space-x-3">
              <ShieldAlert className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider">Urgent Clinical Red Flags</h4>
                <p className="text-[11px] text-rose-800 leading-relaxed">
                  If the patient exhibits any of the following severe systemic symptoms, bypass standard outpatient diagnostics and seek immediate emergency department triage:
                </p>
                <ul className="list-disc pl-4 text-[10px] text-rose-800 font-medium pt-1 space-y-1">
                  <li>Severe, localized, or rigid abdominal pain (indicative of intestinal perforation).</li>
                  <li>Persistent, unmanageable vomiting or severe, bloody diarrhea.</li>
                  <li>Altered mental status, confusion, extreme lethargy, or delirium (&apos;typhoid state&apos;).</li>
                  <li>High body temperature exceeding 40°C (104°F) that is unresponsive to antipyretics.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons (no-print) */}
        <div className="no-print flex flex-col sm:flex-row justify-center gap-3.5 pt-4 border-t border-slate-100">
          <Button variant="outline" onClick={onReset} className="border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center font-semibold">
            <RefreshCw className="mr-2 h-4 w-4" />
            Evaluate New Profile
          </Button>
          
          <Button onClick={handlePrint} className="bg-slate-950 hover:bg-slate-800 text-white font-semibold flex items-center justify-center shadow-sm">
            <Printer className="mr-2 h-4 w-4" />
            Print Triage Report
          </Button>

          <Button 
            variant="ghost"
            className="text-teal-700 hover:text-teal-800 hover:bg-teal-50 border border-transparent hover:border-teal-100 flex items-center justify-center font-semibold"
            onClick={() => typeof window !== "undefined" && window.open("https://www.who.int/news-room/fact-sheets/detail/typhoid", "_blank")}
          >
            WHO Guidelines <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="no-print mt-6 text-center text-[10px] text-slate-400 flex items-center justify-center">
        <AlertCircle className="h-3.5 w-3.5 mr-1.5 text-slate-300" />
        <span>Report is optimized for standard vertical paper print layouts.</span>
      </div>
    </div>
  )
}

export default ResultsStep
