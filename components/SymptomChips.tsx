"use client";

interface SymptomChipsProps {
  symptoms: string[];
  selected: Set<string>;
  onToggle: (sym: string) => void;
  onPredict: () => void;
  totalSelected: number;
  allSelected: string[];
}

export default function SymptomChips({ symptoms, selected, onToggle, onPredict, totalSelected, allSelected }: SymptomChipsProps) {
  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-1.5 mb-3">
        {symptoms.map(sym => (
          <button
            key={sym}
            onClick={() => onToggle(sym)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all font-mono
              ${selected.has(sym)
                ? "bg-[var(--teal-50)] border-[var(--teal-400)] text-[var(--teal-600)]"
                : "bg-white border-gray-200 text-gray-500 hover:bg-[var(--teal-50)] hover:border-[var(--teal-200)] hover:text-[var(--teal-600)]"}`}
          >
            {selected.has(sym) && <span>✓ </span>}{sym.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {totalSelected > 0 && (
        <p className="text-xs text-gray-500 mb-2">
          <span className="font-medium text-[var(--teal-600)]">{totalSelected} symptom{totalSelected > 1 ? "s" : ""}</span> selected:{" "}
          {allSelected.map(s => s.replace(/_/g, " ")).join(", ")}
        </p>
      )}

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onPredict}
          disabled={totalSelected === 0}
          className="px-4 py-1.5 rounded-lg bg-[var(--teal-400)] text-white text-xs font-medium hover:opacity-85 disabled:opacity-40 transition-opacity"
        >
          Predict diseases
        </button>
        <button
          className="px-4 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs font-medium hover:bg-gray-50 transition-colors"
          onClick={() => {
            const el = document.querySelector("textarea") as HTMLTextAreaElement;
            if (el) { el.focus(); el.placeholder = "Describe any other symptoms..."; }
          }}
        >
          Add more symptoms ↗
        </button>
      </div>
    </div>
  );
}
