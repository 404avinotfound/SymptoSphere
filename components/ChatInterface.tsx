"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { predictDiseases, getSuggestedSymptoms, PredictionResult } from "@/lib/diseaseData";
import { getRuleChatResponse } from "@/lib/chatEngine";
import SymptomChips from "./SymptomChips";
import DiseaseResults from "./DiseaseResults";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  type?: "text" | "symptoms" | "results";
  suggestedSymptoms?: string[];
  results?: PredictionResult[];
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello. I'm SymptoSphere your AI health companion.\n\nPlease Describe How You Feel and I'll provide you with some symptoms.\n\n For Example:  'I have a Fever',  'I have a Headache'  etc. ",
      type: "text",
    },
  ]);

  const [input, setInput] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [userTurnCount, setUserTurnCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  // Ref for the last results message so we can scroll to its top
  const lastResultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length <= 1 && !isTyping) return;

    // If the latest assistant message is a results card, scroll to its top
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.type === "results" && lastResultsRef.current) {
      lastResultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, isTyping]);

  const toggleSymptom = useCallback((sym: string) => {
    setSelectedSymptoms((prev) => {
      const next = new Set(prev);
      next.has(sym) ? next.delete(sym) : next.add(sym);
      return next;
    });
  }, []);

  const runPrediction = useCallback(() => {
    if (selectedSymptoms.size === 0) return;
    const syms = [...selectedSymptoms];
    const results = predictDiseases(syms);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: `Analyzing ${syms.length} symptom${syms.length > 1 ? 's' : ''}: ${syms.join(", ")}` },
      { role: "assistant", content: "Analysis complete. Here are the most probable conditions based on your symptom profile:\n\n Please! Consult a Health Professional.", type: "results", results },
    ]);
  }, [selectedSymptoms]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    const response = getRuleChatResponse(text, userTurnCount);
    setUserTurnCount((prev) => prev + 1);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.text,
          type: response.showSymptoms ? "symptoms" : "text",
          suggestedSymptoms: response.showSymptoms
            ? response.symptoms.length > 0 ? response.symptoms : getSuggestedSymptoms(text)
            : undefined,
        },
      ]);
    }, 700);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
      className="grid-bg"
    >

      {/* Ambient glow */}
      <div style={{
        position: 'fixed',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(0,217,166,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{
        width: '100%',
        maxWidth: '720px',
        height: '95vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-deep)',
        border: '1px solid var(--border-dim)',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
      }}>

        {/* HEADER */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(13,17,23,0.8)',
          backdropFilter: 'blur(20px)',
          flexShrink: 0,
        }}>
          <img
            src="/logo.jpg"
            alt="SymptoSphere logo"
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '10px',
              objectFit: 'cover',
              flexShrink: 0,
              boxShadow: '0 0 16px rgba(0,217,166,0.25)',
            }}
          />

          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              SymptoSphere 🌿
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', marginTop: '1px' }}>
              AI HEALTH INTELLIGENCE
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* GitHub link */}
            <a
              href="https://github.com/404avinotfound/SymptoSphere"
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border-dim)',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s',
                flexShrink: 0,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,217,166,0.1)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,217,166,0.35)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-teal)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-dim)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>

            <div className="status-dot" />
            <span style={{ fontSize: '11px', color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>ACTIVE</span>
          </div>
        </div>

        {/* Disclaimer bar */}
        <div style={{
          padding: '6px 1.5rem',
          background: 'rgba(239,68,68,0.06)',
          borderBottom: '1px solid rgba(239,68,68,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
            <path d="M6 1L11 10H1L6 1Z" stroke="#EF4444" strokeWidth="1" fill="rgba(239,68,68,0.2)"/>
            <path d="M6 5v2.5M6 8.5v.5" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: '11px', color: 'rgba(239,68,68,0.8)', fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}>
            FOR EDUCATIONAL PURPOSES ONLY!! NOT A SUBSTITUTE FOR MEDICAL ADVICE. PLEASE CONSULT A DOCTOR.
          </span>
        </div>

        {/* CHAT AREA */}
        <div ref={chatRef} style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          position: 'relative',
        }}>

          {messages.map((msg, i) => {
            const isLatestResults = msg.type === "results" && i === messages.length - 1;
            return (
              <div
                key={i}
                ref={isLatestResults ? lastResultsRef : undefined}
                className="msg-enter"
                style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
              >

                {msg.role === 'assistant' && (
                  <img
                    src="/avatar.png"
                    alt="SymptoSphere avatar"
                    style={{
                      width: '33px',
                      height: '33px',
                      borderRadius: '5px',
                      objectFit: 'cover',
                      flexShrink: 0,
                      marginRight: '10px',
                      alignSelf: 'flex-start',
                      marginTop: '2px',
                      boxShadow: '0 0 12px rgba(0,217,166,0.25)',
                    }}
                  />
                )}

                <div style={{
                  maxWidth: '80%',
                  padding: msg.role === 'user' ? '10px 16px' : '14px 18px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #00A87F, #007A5E)'
                    : 'var(--bg-elevated)',
                  border: msg.role === 'user'
                    ? '1px solid rgba(0,217,166,0.2)'
                    : '1px solid var(--border-dim)',
                  color: msg.role === 'user' ? '#ECFDF5' : 'var(--text-primary)',
                  fontSize: '14px',
                  lineHeight: '1.7',
                  fontFamily: 'var(--font-display)',
                  boxShadow: msg.role === 'user'
                    ? '0 4px 15px rgba(0,168,127,0.2)'
                    : '0 2px 8px rgba(0,0,0,0.2)',
                }}>
                  <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{msg.content}</p>

                  {msg.type === "symptoms" && msg.suggestedSymptoms && (
                    <SymptomChips
                      symptoms={msg.suggestedSymptoms}
                      selected={selectedSymptoms}
                      onToggle={toggleSymptom}
                      onPredict={runPrediction}
                      totalSelected={selectedSymptoms.size}
                      allSelected={[...selectedSymptoms]}
                    />
                  )}

                  {msg.type === "results" && msg.results && (
                    <DiseaseResults results={msg.results} />
                  )}
                </div>

                {msg.role === 'user' && (
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginLeft: '10px',
                    alignSelf: 'flex-start',
                    marginTop: '2px',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500,
                  }}>
                    U
                  </div>
                )}
              </div>
            );
          })}

          {/* Decorative image — visible only on the empty/welcome state */}
          {messages.length <= 1 && !isTyping && (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem 0',
              pointerEvents: 'none',
              userSelect: 'none',
            }}>
              <img
                src="/chat-decor.png"
                alt=""
                style={{
                  width: '400px',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  opacity: 1,
                  filter: 'brightness(1.2) saturate(1.1)',
                }}
              />
            </div>
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="msg-enter">
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #00D9A6, #0A6E56)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 3v8M3 7h8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{
                padding: '12px 18px',
                borderRadius: '4px 16px 16px 16px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-dim)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          )}

          {/* Invisible scroll anchor */}
          <div ref={bottomRef} />
        </div>

        {/* INPUT AREA */}
        <div style={{
          padding: '1rem 1.5rem 1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          background: 'rgba(13,17,23,0.8)',
          backdropFilter: 'blur(20px)',
          flexShrink: 0,
        }}>
          {/* Selected symptoms count */}
          {selectedSymptoms.size > 0 && (
            <div style={{
              marginBottom: '10px',
              padding: '6px 12px',
              background: 'var(--accent-teal-glow)',
              border: '1px solid var(--border-accent)',
              borderRadius: '8px',
              fontSize: '12px',
              color: 'var(--accent-teal)',
              fontFamily: 'var(--font-mono)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/>
                <path d="M4 6l1.5 1.5L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {selectedSymptoms.size} symptom{selectedSymptoms.size > 1 ? 's' : ''} selected
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
              }}
              placeholder="Describe your symptoms..."
              rows={1}
              style={{
                flex: 1,
                padding: '12px 16px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-dim)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                fontFamily: 'var(--font-display)',
                resize: 'none',
                outline: 'none',
                lineHeight: '1.5',
                transition: 'border-color 0.2s',
                minHeight: '46px',
                maxHeight: '120px',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--border-accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-dim)'}
            />

            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: input.trim() ? 'linear-gradient(135deg, #00D9A6, #00A87F)' : 'var(--bg-surface)',
                border: '1px solid ' + (input.trim() ? 'transparent' : 'var(--border-dim)'),
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s',
                boxShadow: input.trim() ? '0 4px 15px rgba(0,217,166,0.3)' : 'none',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9l12-6-6 12V9H3Z" fill={input.trim() ? 'white' : 'var(--text-muted)'} />
              </svg>
            </button>
          </div>

          <div style={{ marginTop: '8px', textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}>
            PRESS ENTER TO SEND · SHIFT+ENTER FOR NEW LINE
          </div>
        </div>
      </div>
    </div>
  );
}
