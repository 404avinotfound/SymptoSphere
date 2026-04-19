"use client";
import { PredictionResult } from "@/lib/diseaseData";

interface DiseaseResultsProps {
  results: PredictionResult[];
}

const rankConfig = [
  { label: '01', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  { label: '02', color: '#8B95A8', bg: 'rgba(139,149,168,0.08)', border: 'rgba(139,149,168,0.2)' },
  { label: '03', color: '#A06B4A', bg: 'rgba(160,107,74,0.08)', border: 'rgba(160,107,74,0.2)' },
];

export default function DiseaseResults({ results }: DiseaseResultsProps) {
  const top = results[0];

  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{
        fontSize: '11px',
        color: 'var(--accent-teal)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.08em',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <rect x="1" y="1" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1"/>
          <path d="M3 5h4M3 3h2M3 7h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </svg>
        PROBABILITY ANALYSIS — TOP {results.length} MATCHES
      </div>

      {/* Disease cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {results.map((res, idx) => {
          const cfg = rankConfig[idx] || rankConfig[2];
          return (
            <div key={res.name} style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: `1px solid ${cfg.border}`,
              background: 'rgba(13,17,23,0.6)',
            }}>
              {/* Header */}
              <div style={{
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: cfg.bg,
                borderBottom: `1px solid ${cfg.border}`,
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  background: cfg.bg,
                  border: `1px solid ${cfg.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  color: cfg.color,
                  fontWeight: 600,
                  flexShrink: 0,
                }}>
                  {cfg.label}
                </div>

                <span style={{
                  flex: 1,
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.01em',
                }}>
                  {res.name}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '60px',
                    height: '4px',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min(100, res.score)}%`,
                      background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}99)`,
                      borderRadius: '2px',
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                  <span style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    color: cfg.color,
                    minWidth: '36px',
                    textAlign: 'right',
                  }}>
                    {res.score}%
                  </span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '12px 14px' }}>
                <p style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '10px',
                  fontFamily: 'var(--font-display)',
                }}>
                  {res.data.description}
                </p>

                <div style={{
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                  marginBottom: '8px',
                }}>
                  SUGGESTED REMEDIES
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {res.data.remedies.map(r => (
                    <span key={r} style={{
                      padding: '3px 9px',
                      background: 'rgba(0,217,166,0.06)',
                      border: '1px solid rgba(0,217,166,0.15)',
                      borderRadius: '12px',
                      fontSize: '11px',
                      color: 'rgba(0,217,166,0.8)',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Most Likely Diagnosis ── */}
      {top && (
        <div style={{
          marginTop: '16px',
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid rgba(0,217,166,0.3)',
          background: 'linear-gradient(135deg, rgba(0,217,166,0.07) 0%, rgba(0,168,127,0.04) 100%)',
        }}>
          {/* Banner header */}
          <div style={{
            padding: '10px 14px',
            borderBottom: '1px solid rgba(0,217,166,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0,217,166,0.08)',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="7" cy="7" r="5.5" stroke="#00D9A6" strokeWidth="1.2"/>
              <path d="M4.5 7l2 2 3-3" stroke="#00D9A6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{
              fontSize: '11px',
              color: '#00D9A6',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}>
              MOST LIKELY DIAGNOSIS
            </span>
            <span style={{
              marginLeft: 'auto',
              fontSize: '11px',
              color: '#00D9A6',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
            }}>
              {top.score}% MATCH
            </span>
          </div>

          {/* Body */}
          <div style={{ padding: '14px' }}>
            <p style={{
              fontSize: '15px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              marginBottom: '6px',
              letterSpacing: '-0.01em',
            }}>
              You most likely have{' '}
              <span style={{ color: '#00D9A6' }}>{top.name}</span>.
            </p>

            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.6,
              marginBottom: '12px',
            }}>
              {top.data.description}
            </p>

            <div style={{
              fontSize: '10px',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
              marginBottom: '8px',
            }}>
              RECOMMENDED REMEDIES
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {top.data.remedies.map(r => (
                <span key={r} style={{
                  padding: '5px 12px',
                  background: 'rgba(0,217,166,0.1)',
                  border: '1px solid rgba(0,217,166,0.25)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: '#00D9A6',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                }}>
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer warning */}
      <div style={{
        marginTop: '12px',
        padding: '10px 14px',
        background: 'rgba(239,68,68,0.05)',
        border: '1px solid rgba(239,68,68,0.12)',
        borderRadius: '10px',
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
          <path d="M7 1.5L12.5 11H1.5L7 1.5Z" stroke="#EF4444" strokeWidth="1" fill="rgba(239,68,68,0.15)"/>
          <path d="M7 6v2M7 9.5v.5" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <span style={{
          fontSize: '11px',
          color: 'rgba(239,68,68,0.7)',
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.5,
          letterSpacing: '0.02em',
        }}>
          This is an AI estimate, not a medical diagnosis. Results are probabilistic and may be inaccurate. Always consult a qualified healthcare professional.
        </span>
      </div>
    </div>
  );
}
