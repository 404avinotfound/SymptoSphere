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
    <div style={{ marginTop: '14px' }}>
      <div style={{
        fontSize: '11px',
        color: 'var(--accent-teal)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.08em',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1"/>
          <path d="M5 3v2.5L7 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </svg>
        SELECT ALL THAT APPLY
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
        {symptoms.map(sym => {
          const isSelected = selected.has(sym);
          return (
            <button
              key={sym}
              onClick={() => onToggle(sym)}
              style={{
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                border: '1px solid ' + (isSelected ? 'var(--accent-teal)' : 'rgba(255,255,255,0.1)'),
                background: isSelected ? 'rgba(0,217,166,0.12)' : 'rgba(255,255,255,0.03)',
                color: isSelected ? 'var(--accent-teal)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                letterSpacing: '0.02em',
              }}
            >
              {isSelected && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="var(--accent-teal)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
              {sym.replace(/_/g, ' ')}
            </button>
          );
        })}
      </div>

      {totalSelected > 0 && (
        <div style={{
          padding: '8px 12px',
          background: 'rgba(0,217,166,0.05)',
          border: '1px solid rgba(0,217,166,0.15)',
          borderRadius: '8px',
          marginBottom: '12px',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.5,
        }}>
          <span style={{ color: 'var(--accent-teal)', fontWeight: 500 }}>{totalSelected}</span> selected:{' '}
          {allSelected.map(s => s.replace(/_/g, ' ')).join(' · ')}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={onPredict}
          disabled={totalSelected === 0}
          style={{
            padding: '9px 20px',
            borderRadius: '10px',
            background: totalSelected > 0 ? 'linear-gradient(135deg, #00D9A6, #00A87F)' : 'rgba(255,255,255,0.04)',
            border: '1px solid ' + (totalSelected > 0 ? 'transparent' : 'rgba(255,255,255,0.08)'),
            color: totalSelected > 0 ? 'white' : 'var(--text-muted)',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            cursor: totalSelected > 0 ? 'pointer' : 'not-allowed',
            letterSpacing: '0.05em',
            boxShadow: totalSelected > 0 ? '0 4px 14px rgba(0,217,166,0.25)' : 'none',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
            <path d="M4 6h4M6 4l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          RUN ANALYSIS
        </button>

        <button
          style={{
            padding: '9px 16px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--text-secondary)',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            letterSpacing: '0.05em',
            transition: 'all 0.15s',
          }}
          onClick={() => {
            const el = document.querySelector('textarea') as HTMLTextAreaElement;
            if (el) { el.focus(); el.placeholder = 'Describe any additional symptoms...'; }
          }}
        >
          + ADD MORE
        </button>
      </div>
    </div>
  );
}
