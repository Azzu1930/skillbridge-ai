'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { generateAssistantResponse } from '@/lib/ai-engine';
import {
  Bot,
  Send,
  Sparkles,
  User,
  CheckCircle2,
  Sliders,
  Briefcase,
  Target,
  RefreshCw,
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export default function AssistantPage() {
  const { student } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init_1',
      sender: 'assistant',
      text: `Hello ${(student?.name || 'Candidate').split(' ')[0]}! I am your **SkillBridge AI Career Advisor**.

I have synchronized with your **AI Skill Twin** (Current Readiness: **${student.readinessScore}%**, Target: **${student.targetRole}**).

Feel free to ask me anything about your skill gaps, recommended internships, or career simulations, or click any of the suggested questions below!`,
      time: 'Just now',
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const prompt = textToSend || input;
    if (!prompt.trim()) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: prompt,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateAssistantResponse(prompt, student);
      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const samplePrompts = [
    'What should I learn next?',
    'Why is my readiness at 68%?',
    'Which internships should I apply for?',
    'What skills am I missing for backend development?',
    'How can I improve my profile for recruiters?',
  ];

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900">AI Career Advisor</h1>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                  Profile-Grounded
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Connected to {student.name}&apos;s Skill Twin ({student.targetRole} • {student.readinessScore}%)
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              setMessages([
                {
                  id: `rst_${Date.now()}`,
                  sender: 'assistant',
                  text: `Chat reset. Ready to answer contextual career queries based on your Skill Twin.`,
                  time: 'Just now',
                },
              ])
            }
            className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors"
            title="Reset Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Chat History Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                  m.sender === 'user'
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-slate-100 border-slate-200 text-blue-600'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line space-y-1.5">{m.text}</div>
                <div
                  className={`text-[9px] mt-1 text-right font-mono ${
                    m.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-blue-600">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="shrink-0 flex items-center gap-2 overflow-x-auto pb-1">
          {samplePrompts.map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 text-xs text-slate-700 whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{chip}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="shrink-0 flex items-center gap-2 p-2 rounded-2xl bg-white border border-slate-200 shadow-sm"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI Career Advisor (e.g. 'What should I learn next?')..."
            className="flex-1 bg-transparent px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </AppShell>
  );
}
