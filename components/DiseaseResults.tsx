"use client";
import { PredictionResult } from "@/lib/diseaseData";

interface DiseaseResultsProps {
  results: PredictionResult[];
}

const rankStyles = [
  "bg-[var(--amber-50)] border-[var(--amber-400)] text-[var(--amber-600)]",
  "bg-gray-50 border-gray-200 text-gray-600",
  "bg-[var(--coral-50)] border-[var(--coral-100)] text-[var(--coral-600)]",
];

export default function DiseaseResults({ results }: DiseaseResultsProps) {
  return (
    <div className="mt-3 space-y-2">
      {results.map((res, idx) => (
        <div key={res.name} className="rounded-xl overflow-hidden border border-gray-200">
          <div className="flex items-center gap-2.5 px-3.5 py-2 bg-gray-50 border-b border-gray-200">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-medium border flex-shrink-0 ${rankStyles[idx]}`}>
              {idx + 1}
            </div>
            <span className="text-sm font-medium text-gray-900 flex-1">{res.name}</span>
            <span className="text-xs font-mono font-medium text-[var(--teal-600)]">{res.score}%</span>
            <div className="w-14 h-1 rounded bg-[var(--teal-50)] overflow-hidden flex-shrink-0">
              <div className="h-full bg-[var(--teal-400)] rounded" style={{ width: `${Math.min(100, res.score)}%` }} />
            </div>
          </div>
          <div className="px-3.5 py-2.5 text-xs text-gray-500 leading-relaxed">
            <p>{res.data.description}</p>
            <p className="text-xs font-medium text-gray-700 mt-2 mb-1">Suggested remedies</p>
            <div className="flex flex-wrap gap-1">
              {res.data.remedies.map(r => (
                <span key={r} className="px-2 py-0.5 bg-[var(--green-50)] text-[var(--green-600)] border border-[var(--green-400)] rounded-full text-[11px]">
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="text-xs text-[var(--amber-600)] bg-[var(--amber-50)] border border-[var(--amber-400)] rounded-lg px-3 py-2 mt-2">
        ⚠ This is an AI estimate, not a diagnosis. Please consult a doctor for professional medical advice.
      </div>
    </div>
  );
}
