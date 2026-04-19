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
      content:
        "Hello! I'm SymptoSphere, your personal health companion.\nPlease describe how you're feeling.\nI'll guide you with follow-up questions and suggest symptoms.",
      type: "text",
    },
  ]);

  const [input, setInput] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [userTurnCount, setUserTurnCount] = useState(0);

  const chatRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

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
      {
        role: "user",
        content: `Checking with: ${syms.join(", ")}`,
      },
      {
        role: "assistant",
        content: "Here are the most probable conditions:",
        type: "results",
        results,
      },
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

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.text,
          type: response.showSymptoms ? "symptoms" : "text",
          suggestedSymptoms: response.showSymptoms
            ? response.symptoms.length > 0
              ? response.symptoms
              : getSuggestedSymptoms(text)
            : undefined,
        },
      ]);
    }, 400);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Card */}
      <div className="w-full max-w-2xl h-[95vh] flex flex-col backdrop-blur-lg bg-white/80 shadow-2xl rounded-2xl overflow-hidden border">

        {/* HEADER */}
        <div className="flex items-center gap-3 px-5 py-4 border-b bg-white/70 backdrop-blur-md">
          <img
           src="/logo.jpg"
           alt="SymptoSphere Logo"
           className="w-8 h-8 rounded-full object-cover"
           />

          <div>
            <h1 className="text-lg font-bold text-blue-900">SymptoSphere</h1>
            <p className="text-xs text-red-400 font-semibold">
              Not a substitute for medical advice
            </p>
          </div>

          <div className="ml-auto w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>

        {/* CHAT AREA */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
          style={{
            backgroundImage:
              "url('/medical-bg.png')", // put image in public folder
            backgroundSize: "contain", 
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundColor: "#e6f7fb",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow-md ${
                  msg.role === "user"
                    ? "bg-[var(--teal-400)] text-white rounded-tr-sm"
                    : "bg-gray-50 border border-gray-200 rounded-tl-sm text-gray-800"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>

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
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="p-4 border-t bg-white/70 backdrop-blur-md flex gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Describe your symptoms..."
            className="flex-1 p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-teal-400 outline-none resize-none"
          />

          <button
            onClick={sendMessage}
            className="px-4 rounded-xl bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-md hover:scale-105 transition"
          >
            ➤
          </button>
        </div>

        {/* FOOTER */}
        <p className="text-center text-sm text-red-400 font-semibold pb-2">
          For educational purposes only. Please Consult a healthcare professional.
        </p>
      </div>
    </div>
  );
}