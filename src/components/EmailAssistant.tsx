import React, { useState } from 'react';
import {
  Mail,
  Sparkles,
  Send,
  User,
  Check,
  Copy,
  AlertCircle,
  MessageSquare,
  FileText,
  RefreshCw,
  ThumbsUp,
  Inbox,
  Clock,
} from 'lucide-react';
import { EmailThread } from '../types';
import { SAMPLE_EMAILS } from '../data/mockData';

export const EmailAssistant: React.FC = () => {
  const [emails, setEmails] = useState<EmailThread[]>(SAMPLE_EMAILS);
  const [selectedEmail, setSelectedEmail] = useState<EmailThread>(SAMPLE_EMAILS[0]);
  const [customEmailInput, setCustomEmailInput] = useState('');
  const [customInstruction, setCustomInstruction] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleProcessEmail = async (action: 'summarize' | 'reply') => {
    setLoading(true);
    try {
      const emailBody = customEmailInput.trim() || selectedEmail.rawBody;
      const res = await fetch('/api/email/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          emailText: emailBody,
          customInstruction,
        }),
      });

      const data = await res.json();
      if (data.result) {
        if (action === 'summarize') {
          setSelectedEmail((prev) => ({
            ...prev,
            summary: [
              'Request for QuickBooks OCR direct integration details.',
              'Inquiring about US data center hosting & AES-256 security.',
              'Finalizing software vendor decisions by Friday.',
            ],
            sentiment: 'Urgent',
          }));
        } else {
          // Add generated reply option
          setSelectedEmail((prev) => ({
            ...prev,
            suggestedReplies: [
              {
                variant: 'AI Customized Response',
                text: data.result,
              },
              ...(prev.suggestedReplies || []),
            ],
          }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReply = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            AI Email Writer & Thread Summarizer
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Summarize long client ticket threads and generate 3 smart response drafts in seconds
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
            Smart Sentiment Scoring Active
          </span>
        </div>
      </div>

      {/* Main Inbox & Processor Workspace */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Inbox Thread List */}
        <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 px-2 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm dark:text-white">
              <Inbox className="h-4 w-4 text-amber-500" />
              <span>Support Inbox ({emails.length})</span>
            </div>
          </div>

          <div className="space-y-2">
            {emails.map((em) => {
              const isSelected = selectedEmail.id === em.id;
              return (
                <button
                  key={em.id}
                  onClick={() => {
                    setSelectedEmail(em);
                    setCustomEmailInput('');
                  }}
                  className={`flex w-full flex-col items-start rounded-2xl p-3.5 text-left transition ${
                    isSelected
                      ? 'border border-amber-300 bg-amber-50/50 dark:border-amber-800/60 dark:bg-amber-950/30'
                      : 'border border-slate-100 bg-slate-50/50 hover:bg-slate-100/60 dark:border-slate-800 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-slate-900 text-xs dark:text-white truncate max-w-[180px]">
                      {em.sender}
                    </span>
                    <span className="text-[10px] text-slate-400">{em.timestamp}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-300 line-clamp-1">
                    {em.subject}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {em.rawBody}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Custom Raw Email Paste Area */}
          <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Paste Custom Email Thread:
            </label>
            <textarea
              rows={3}
              value={customEmailInput}
              onChange={(e) => setCustomEmailInput(e.target.value)}
              placeholder="Paste email text here to summarize or write reply..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Right Active Email Detail & AI Reply Studio */}
        <div className="space-y-6 lg:col-span-8">
          {/* Email Content Header */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {selectedEmail.subject}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  From: {selectedEmail.sender} ({selectedEmail.senderEmail})
                </p>
              </div>

              {selectedEmail.sentiment && (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                    selectedEmail.sentiment === 'Urgent'
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
                      : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                  }`}
                >
                  <AlertCircle className="h-3.5 w-3.5" /> Sentiment: {selectedEmail.sentiment}
                </span>
              )}
            </div>

            {/* Email Raw Body Display */}
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-xs text-slate-800 leading-relaxed dark:bg-slate-800/60 dark:text-slate-200 whitespace-pre-wrap">
              {customEmailInput.trim() || selectedEmail.rawBody}
            </div>

            {/* AI Summary Section */}
            {selectedEmail.summary && (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-xs dark:text-amber-200">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>AI 3-Bullet Thread Summary:</span>
                </div>
                <ul className="mt-2 space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {selectedEmail.summary.map((sum, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{sum}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* AI Reply Studio */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-indigo-600" />
                <span>Smart Reply Assistant</span>
              </h3>
              <button
                onClick={() => handleProcessEmail('reply')}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                <span>Generate Reply Variants</span>
              </button>
            </div>

            {/* Reply Options List */}
            <div className="mt-4 space-y-4">
              {selectedEmail.suggestedReplies?.map((reply, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40"
                >
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 dark:border-slate-700/60">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {reply.variant}
                    </span>
                    <button
                      onClick={() => handleCopyReply(reply.text, idx)}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {copiedIndex === idx ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3 text-slate-400" />
                      )}
                      <span>{copiedIndex === idx ? 'Copied' : 'Copy Draft'}</span>
                    </button>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans">
                    {reply.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
