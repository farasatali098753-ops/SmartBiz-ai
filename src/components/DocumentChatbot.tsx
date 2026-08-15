import React, { useState } from 'react';
import {
  FileText,
  Send,
  Upload,
  Bot,
  User,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Plus,
  Trash2,
  FileCode,
  AlertCircle,
  HelpCircle,
  Eye,
  X,
  RefreshCw,
} from 'lucide-react';
import { CompanyDocument, ChatMessage } from '../types';
import { INITIAL_DOCUMENTS } from '../data/mockData';

export const DocumentChatbot: React.FC = () => {
  const [documents, setDocuments] = useState<CompanyDocument[]>(INITIAL_DOCUMENTS);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>(['doc-1', 'doc-2', 'doc-3']);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Hello! I am your **SmartBiz Document Assistant**. I have loaded your company policies, SLA agreements, and performance strategy files. How can I assist you today?',
      timestamp: 'Just now',
      citations: ['SmartBiz Employee Handbook & Support SLA 2026.pdf'],
      confidenceScore: 0.98,
      suggestedFollowups: [
        'What is our support SLA response time for Pro users?',
        'What are the encryption standards for document storage?',
        'Summarize our Q2 sales growth highlights',
      ],
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<CompanyDocument | null>(null);
  const [customDocText, setCustomDocText] = useState('');

  const toggleSelectDoc = (id: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const textContent = event.target?.result as string;
      const newDoc: CompanyDocument = {
        id: `custom-${Date.now()}`,
        title: file.name,
        type: file.name.endsWith('.pdf') ? 'PDF' : file.name.endsWith('.docx') ? 'DOCX' : 'TXT',
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Ready',
        contentSnippet: textContent ? textContent.slice(0, 300) : 'Custom document uploaded',
      };

      setDocuments((prev) => [newDoc, ...prev]);
      setSelectedDocIds((prev) => [...prev, newDoc.id]);
      if (textContent) {
        setCustomDocText(textContent);
      }
    };
    reader.readAsText(file);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat/document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          documentIds: selectedDocIds,
          customDocContent: customDocText,
        }),
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.answer || 'No response returned.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations || [],
        confidenceScore: data.confidenceScore || 0.95,
        suggestedFollowups: data.suggestedFollowups || [],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'ai',
          text: 'Sorry, I encountered an issue querying the document backend. Please try again.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Left Sidebar: Document Knowledge Base Management */}
      <div className="w-full shrink-0 space-y-4 lg:w-80">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Knowledge Corpus</h3>
            </div>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              {documents.length} Files
            </span>
          </div>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Select files to include in Gemini RAG context retrieval:
          </p>

          {/* Upload Button */}
          <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 py-3 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100/70 dark:border-indigo-800/60 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Upload className="h-4 w-4" />
            <span>Upload Document (PDF, DOCX, TXT)</span>
            <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Document Checklist */}
          <div className="mt-4 space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {documents.map((doc) => {
              const isChecked = selectedDocIds.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  className={`group flex items-start justify-between rounded-2xl border p-3 transition ${
                    isChecked
                      ? 'border-indigo-300 bg-indigo-50/40 dark:border-indigo-800 dark:bg-indigo-950/30'
                      : 'border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40'
                  }`}
                >
                  <label className="flex cursor-pointer items-start gap-2.5 flex-1 pr-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSelectDoc(doc.id)}
                      className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-semibold text-slate-900 text-xs dark:text-slate-100">
                        <span className="truncate max-w-[160px]">{doc.title}</span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">{doc.type}</span>
                        <span>• {doc.size}</span>
                      </div>
                    </div>
                  </label>

                  <button
                    onClick={() => setViewingDoc(doc)}
                    className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    title="Preview Document Content"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* RAG Context Settings */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>RAG Model Precision</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">Gemini 3.6 Flash</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Vector indexing mode active. Sources are cited with confidence ratings.
          </div>
        </div>
      </div>

      {/* Right Area: Interactive RAG Chatbot Thread */}
      <div className="flex flex-1 flex-col rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 h-[680px]">
        {/* Chat Thread Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Document RAG Assistant</h2>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Grounded on {selectedDocIds.length} Docs
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setMessages([messages[0]])}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-sm">
                  AI
                </div>
              )}

              <div className={`max-w-2xl space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`rounded-2xl p-4 text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'border border-slate-100 bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-100 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Citations & Confidence Score */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-3 border-t border-slate-200/60 pt-2.5 dark:border-slate-700/60">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3 text-indigo-500" />
                          Source Citations:
                        </span>
                        {msg.confidenceScore && (
                          <span className="text-emerald-600 dark:text-emerald-400">
                            Confidence: {Math.round(msg.confidenceScore * 100)}%
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {msg.citations.map((c, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 border border-indigo-100 dark:bg-slate-900 dark:border-slate-700 dark:text-indigo-300"
                          >
                            📄 {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Suggested Followups */}
                {msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedFollowups.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(sug)}
                        className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-2.5 py-1 text-[11px] font-medium text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/80"
                      >
                        💡 {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white text-xs font-bold dark:bg-slate-700">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-xs text-slate-500 dark:text-slate-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white animate-pulse">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800">
                Searching knowledge embeddings & generating response...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="border-t border-slate-100 p-4 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask a question about your uploaded company files..."
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={loading || !inputPrompt.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:opacity-50 shadow-md shadow-indigo-600/20"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Document View Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm dark:text-white">
                <FileText className="h-4 w-4 text-indigo-600" />
                <span>{viewingDoc.title}</span>
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                className="rounded-xl p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-xs text-slate-700 leading-relaxed max-h-80 overflow-y-auto dark:bg-slate-800 dark:text-slate-200">
              {viewingDoc.contentSnippet}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setViewingDoc(null)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white dark:bg-slate-700"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
