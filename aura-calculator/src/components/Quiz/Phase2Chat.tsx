"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Bot, User, Send } from "lucide-react";
import { QuizQuestion } from "@/lib/questions-new";

type ChatMessage = {
  id: string;
  type: "system" | "user" | "typing";
  text: string;
  timestamp: number;
  optionId?: string;
};

type Phase2ChatProps = {
  question: QuizQuestion;
  onAnswer: (questionId: number, optionId: string) => void;
  questionNumber: number;
  totalQuestions: number;
};

// Typing indicator component
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      className="flex items-start gap-3 mb-4"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-green-900/40 border border-green-500/20 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex items-center gap-1">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            className="w-2 h-2 rounded-full bg-green-400"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 rounded-full bg-green-400"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 rounded-full bg-green-400"
          />
        </div>
      </div>
    </motion.div>
  );
}

// Chat message bubble component
function ChatBubble({ message }: { message: ChatMessage; isLatest: boolean }) {
  const isSystem = message.type === "system";
  const isUser = message.type === "user";

  return (
    <motion.div
      initial={{ opacity: 0, x: isSystem ? -20 : 20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`flex items-end gap-3 mb-4 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isSystem 
          ? "bg-gradient-to-br from-green-500 to-emerald-600" 
          : "bg-gradient-to-br from-white/20 to-white/10 border border-white/20"
      }`}>
        {isSystem ? (
          <Bot className="w-4 h-4 text-white" />
        ) : (
          <User className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] ${
        isSystem
          ? "bg-green-900/40 border border-green-500/20 rounded-2xl rounded-tl-sm"
          : "bg-white/10 border border-white/20 rounded-2xl rounded-tr-sm"
      }`}>
        {/* Sender label */}
        <div className={`px-4 pt-2 text-xs font-bold ${
          isSystem ? "text-green-400" : "text-white/60"
        }`}>
          {isSystem ? "SYSTEM" : "YOU"}
        </div>
        
        {/* Message content */}
        <div className="px-4 pb-3 text-white/90 text-sm leading-relaxed">
          {message.text}
        </div>
      </div>
    </motion.div>
  );
}

export function Phase2Chat({ question, onAnswer, questionNumber, totalQuestions }: Phase2ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Show typing indicator, then reveal the question
  useEffect(() => {
    setIsTyping(true);
    setSelectedOption(null);

    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Add typing delay based on question length
    const typingDuration = Math.min(1000 + question.text.length * 15, 2500);
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `system-${question.id}`,
          type: "system",
          text: question.text,
          timestamp: Date.now(),
        }
      ]);
    }, typingDuration);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [question.id]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  const handleOptionSelect = (optionId: string) => {
    if (selectedOption) return; // Prevent double-clicks
    
    setSelectedOption(optionId);
    const selectedOptionData = question.options.find(o => o.id === optionId);
    
    if (selectedOptionData) {
      // Add user message to chat
      setMessages(prev => [
        ...prev,
        {
          id: `user-${question.id}-${optionId}`,
          type: "user",
          text: selectedOptionData.text,
          timestamp: Date.now(),
          optionId,
        }
      ]);
      
      // Trigger the answer after a brief delay for the animation
      setTimeout(() => {
        onAnswer(question.id, optionId);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-green-500/20 bg-green-900/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-green-400">AURA SYSTEM</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400/70">online</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-white/40">
          Q{questionNumber}/{totalQuestions}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{ maxHeight: "calc(100vh - 300px)" }}
      >
        {/* Welcome message (only show on first question) */}
        {questionNumber === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-white/30 py-2 mb-4"
          >
            Chat history is saved. Previous messages scroll up.
          </motion.div>
        )}

        {/* Previous messages */}
        <AnimatePresence>
          {messages.map((msg, index) => (
            <ChatBubble 
              key={msg.id} 
              message={msg} 
              isLatest={index === messages.length - 1}
            />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
      </div>

      {/* Options as Chat Input Buttons */}
      <div className="border-t border-green-500/20 bg-black/50 p-4">
        <div className="text-xs text-green-400/70 mb-3 font-medium">Select your response:</div>
        <div className="grid grid-cols-1 gap-2">
          {question.options.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionSelect(option.id)}
              disabled={selectedOption !== null}
              className={`w-full text-left p-3 rounded-xl border transition-all duration-300 group ${
                selectedOption === option.id
                  ? "border-green-500 bg-green-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  : selectedOption !== null
                    ? "border-white/5 bg-white/5 opacity-50"
                    : "border-green-500/20 hover:border-green-500/40 hover:bg-green-900/30 hover:shadow-[0_0_10px_rgba(16,185,129,0.15)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                  selectedOption === option.id 
                    ? "bg-green-500 text-white" 
                    : "bg-white/5 text-white/50 group-hover:bg-green-500/20 group-hover:text-green-400"
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-sm text-white/90">{option.text}</span>
              </div>
            </motion.button>
          ))}
        </div>
        
        {/* Phase warning */}
        <div className="mt-4 flex items-center gap-2 text-xs text-green-400/50">
          <Send className="w-3 h-3" />
          <span>Response time affects your score. Answer naturally.</span>
        </div>
      </div>
    </div>
  );
}
