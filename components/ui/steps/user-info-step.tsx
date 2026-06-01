"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { UserInfo } from "@/components/symptom-checker"
import { ArrowLeft, ArrowRight, ClipboardCheck, HelpCircle } from "lucide-react"

interface UserInfoStepProps {
  userInfo: UserInfo
  setUserInfo: (info: UserInfo) => void
  onNext: () => void
  onBack: () => void
}

const UserInfoStep = ({ userInfo, setUserInfo, onNext, onBack }: UserInfoStepProps) => {
  const handleChange = <K extends keyof UserInfo>(field: K, value: UserInfo[K]) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  return (
    <div className="py-2 max-w-2xl mx-auto">
      {/* Step Header */}
      <div className="flex items-center space-x-2.5 mb-6 border-b border-slate-100 pb-4">
        <div className="p-1.5 rounded bg-teal-50 border border-teal-100 text-teal-600">
          <ClipboardCheck className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Patient Risk Profiler</h2>
          <p className="text-xs text-slate-500">Phase 1: Epidemiological Context & Demographic Factors</p>
        </div>
      </div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Age Selector */}
        <div className="space-y-2">
          <div className="flex items-center space-x-1.5">
            <Label htmlFor="age" className="text-sm font-bold text-slate-800">Patient Age</Label>
            <HelpCircle className="h-3.5 w-3.5 text-slate-400 cursor-help" title="Children under 5 and adults over 65 are statistically prone to severe typhoid complications." />
          </div>
          <Input
            id="age"
            type="number"
            value={userInfo.age || ""}
            onChange={(e) => handleChange("age", Number.parseInt(e.target.value) || 0)}
            placeholder="Enter age (1-100)"
            className="max-w-[200px] border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 text-slate-900 placeholder:text-slate-400"
          />
          <p className="text-xs text-slate-400 leading-normal">
            Age is a vital clinical coefficient. Pediatric patients (<span className="font-semibold text-slate-500">5 years</span>) and geriatric cohorts are highly vulnerable to dehydration and systemic bacterial progression.
          </p>
        </div>

        {/* Travel History Triage Card */}
        <div className="pt-5 border-t border-slate-100 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Epidemiological Risk Indices</h3>

          <div className="flex items-start justify-between p-4 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition-all">
            <div className="space-y-1 max-w-[80%]">
              <Label htmlFor="recent-travel" className="text-sm font-bold text-slate-800 cursor-pointer flex items-center">
                Recent travel to typhoid-endemic regions
              </Label>
              <p className="text-xs text-slate-400 leading-relaxed">
                Refers to travel within the past 14 days to regions with high transmission rates (e.g., South Asia, Southeast Asia, Sub-Saharan Africa, Central/South America) with exposure to local drinking water or unpeeled fruits/vegetables.
              </p>
            </div>
            <Switch
              id="recent-travel"
              checked={userInfo.recentTravel}
              onCheckedChange={(checked) => handleChange("recentTravel", checked)}
              className="mt-1.5 data-[state=checked]:bg-teal-600"
            />
          </div>

          {/* Relapse/History Card */}
          <div className="flex items-start justify-between p-4 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition-all">
            <div className="space-y-1 max-w-[80%]">
              <Label htmlFor="previous-history" className="text-sm font-bold text-slate-800 cursor-pointer flex items-center">
                Previous clinical typhoid diagnosis
              </Label>
              <p className="text-xs text-slate-400 leading-relaxed">
                Establishes relapse vulnerability. Up to <span className="font-semibold text-slate-500">10%</span> of typhoid cases experience a relapse of symptoms due to incomplete antibiotic courses. Chronic biliary tract carriers can also shed bacteria.
              </p>
            </div>
            <Switch
              id="previous-history"
              checked={userInfo.previousHistory}
              onCheckedChange={(checked) => handleChange("previousHistory", checked)}
              className="mt-1.5 data-[state=checked]:bg-teal-600"
            />
          </div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10 pt-4 border-t border-slate-100">
        <Button variant="outline" onClick={onBack} className="border-slate-200 hover:bg-slate-50 text-slate-600">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} disabled={!userInfo.age} className="bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-sm transition-colors">
          Continue to Symptoms
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default UserInfoStep
