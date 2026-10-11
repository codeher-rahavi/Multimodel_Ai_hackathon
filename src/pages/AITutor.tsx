import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Paperclip,
  BookOpen,
  Quote,
  AlertCircle,
  User,
  CornerDownLeft,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { demoChatMessages } from '@/data/demoData';
import type { ChatMessage, Citation } from '@/types';

const suggestedQuestions = [
  'Explain the difference between BFS and DFS',
  'What are the ACID properties in databases?',
  'How does TCP three-way handshake work?',
  'What is a binary search tree?',
];

export function AITutor() {
  const [messages, setMessages] = useState<ChatMessage[]>(demoChatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // DEMO: Simulates an AI response. No real AI is being called.
  const handleSend = (text?: string) => {
    const content = text ?? input.trim();
    if (!content) return;

    const userMsg: ChatMessage = {
      id: `c-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulated AI response with demo citations
    setTimeout(() => {
      const tutorMsg: ChatMessage = {
        id: `c-${Date.now()}-r`,
        role: 'tutor',
        content: `Great question! Here's a conceptual overview:\n\nThis is a **demo response** — the AI tutor backend has not been connected yet. When implemented, this will provide real answers generated from your uploaded study materials, with source citations pointing to specific pages and sections.\n\nIn the meantime, you can explore the sample conversation above to see how citations and formatted answers will appear.`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        citations: [
          {
            id: `cit-${Date.now()}`,
            source: 'Data Structures — Complete Notes.pdf',
            page: 'Page 15',
            snippet: 'This is a simulated citation showing where the answer references your uploaded study material.',
          },
        ],
      };
      setMessages((prev) => [...prev, tutorMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-4 animate-fade-in h-full flex flex-col">
      {/* Demo notice */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200/50 flex-shrink-0">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700">
          <span className="font-medium">Demo Mode:</span> The AI tutor uses simulated responses.
          When connected to a real AI backend, answers will be generated from your uploaded materials with accurate source citations.
        </p>
      </div>

      {/* Chat area */}
      <Card className="flex-1 flex flex-col overflow-hidden min-h-0">
        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">AI Tutor</h3>
              <p className="text-xs text-slate-400">Powered by your study materials</p>
            </div>
          </div>
          <Badge color="green" size="sm" dot>Online</Badge>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-5 min-h-0">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {isTyping && (
            <div className="flex items-start gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-100 rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested questions */}
        {messages.length <= 4 && (
          <div className="px-5 pb-3 flex-shrink-0">
            <p className="text-xs text-slate-400 font-medium mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs text-slate-600 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-slate-100 p-4 flex-shrink-0">
          <div className="flex items-end gap-2 bg-slate-50 rounded-2xl border border-slate-200 p-2 focus-within:border-brand-400 focus-within:bg-white transition-colors">
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask a question about your study materials..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none resize-none py-2 max-h-32"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1 justify-center">
            <CornerDownLeft className="w-3 h-3" /> Press Enter to send · Shift + Enter for new line
          </p>
        </div>
      </Card>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 animate-slide-up ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-slate-200' : 'bg-gradient-to-br from-brand-500 to-brand-700'
      }`}>
        {isUser ? <User className="w-4 h-4 text-slate-500" /> : <Sparkles className="w-4 h-4 text-white" />}
      </div>

      {/* Message content */}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-brand-600 text-white rounded-tr-md'
            : 'bg-slate-100 text-slate-700 rounded-tl-md'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Citations */}
        {message.citations && message.citations.length > 0 && (
          <div className="space-y-2 w-full">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Source Citations
            </p>
            {message.citations.map((citation: Citation) => (
              <div key={citation.id} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 hover:border-brand-300 transition-colors">
                <Quote className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-700">{citation.source}</span>
                    <Badge color="brand" size="sm">{citation.page}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed italic">"{citation.snippet}"</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <span className="text-[10px] text-slate-400 px-1">{message.timestamp}</span>
      </div>
    </div>
  );
}
