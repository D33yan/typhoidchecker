import type { Metadata } from "next"
import SymptomChecker from "@/components/symptom-checker"

export const metadata: Metadata = {
  title: "Clinical Triage - Typhoid Risk Simulator",
  description: "Advanced Edge AI-powered symptom checker and clinical probability estimator for typhoid fever.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SymptomChecker />
      </div>
    </main>
  )
}
