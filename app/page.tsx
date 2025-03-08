import type { Metadata } from "next"
import SymptomChecker from "@/components/symptom-checker"

export const metadata: Metadata = {
  title: "Typhoid Symptom Checker",
  description: "AI-powered tool to check the probability of typhoid based on symptoms",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <SymptomChecker />
      </div>
    </main>
  )
}

