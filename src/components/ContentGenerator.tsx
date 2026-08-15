import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Share2,
  Globe,
  Sliders,
  FileText,
  Mail,
  Megaphone,
  Share,
  Wand2,
  RefreshCw,
  Zap,
} from 'lucide-react';

const CONTENT_TYPES = [
  { id: 'blog', label: 'Blog Article', icon: FileText, desc: 'SEO-optimized longform content' },
  { id: 'social', label: 'LinkedIn & Social', icon: Share2, desc: 'Engaging viral social posts & hashtags' },
  { id: 'ad', label: 'Ad Copy (Google/FB)', icon: Megaphone, desc: 'High-converting ad headlines & CTAs' },
  { id: 'email', label: 'Cold Sales Email', icon: Mail, desc: 'Persuasive outbound outreach campaign' },
];

const TONES = ['Professional', 'Bold & Energetic', 'Persuasive', 'Casual', 'Technical & Authoritative', 'Playful Luxury'];

export const ContentGenerator: React.FC = () => {
  const [selectedType, setSelectedType] = useState('social');
  const [topic, setTopic] = useState('SmartBiz AI SaaS Business Automation Platform');
  const [tone, setTone] = useState('Professional');
  const [targetAudience, setTargetAudience] = useState('B2B Founders & Marketing Operations Leads');
  const [language, setLanguage] = useState('English');
  const [keyPoints, setKeyPoints] = useState('142+ hours saved monthly\nInstant document OCR\nAI Email summarizer');

  const [generatedContent, setGeneratedContent] = useState<string>(`### 🚀 Scaling B2B Operations in 2026: Why Automation is Non-Negotiable

Are your team members spending hours manually extracting receipt totals, drafting client emails, and parsing company SOPs? 

**SmartBiz AI** is engineered specifically for B2B founders and ops leaders to automate routine business tasks with zero friction.

#### 🌟 Key Outcomes:
• **Save 140+ Hours Monthly**: Automated document RAG answers support questions instantly.
• **99.4% OCR Accuracy**: Scan invoices directly into accounting JSON schema.
• **Multi-Language Support**: Reach international clients in 7 languages seamlessly.

👉 **Start your 14-day free trial today: https://smartbiz.ai**

#BusinessAutomation #SaaS #Productivity #AITools #GrowthHacks`);

  const [wordCount, setWordCount] = useState(145);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (customPromptModifier?: string) => {
    setLoading(true);
    try {
      const promptTopic = customPromptModifier
        ? `${topic} (Refinement request: ${customPromptModifier})`
        : topic;

      const res = await fetch('/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: selectedType,
          topic: promptTopic,
          tone,
          targetAudience,
          language,
          keyPoints,
        }),
      });

      const data = await res.json();
      if (data.content) {
        setGeneratedContent(data.content);
        setWordCount(data.wordCount || data.content.split(/\s+/).length);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartbiz-content-${selectedType}.md`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            AI Content Generator Suite
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create blogs, ads, cold emails, and social posts powered by Gemini 3.6 Flash
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
            Brand Voice Presets Enabled
          </span>
        </div>
      </div>

      {/* Content Type Selector Tabs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CONTENT_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 dark:border-indigo-500 dark:bg-indigo-950/40'
                  : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{type.label}</h4>
                <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                  {type.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Form & Preview Workspace */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Form Settings */}
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-3 dark:border-slate-800 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-indigo-600" />
            <span>Campaign Controls</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Product / Topic Title
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. SmartBiz AI Invoice OCR & Customer Support Agent"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Tone of Voice
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {TONES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="English">English (US)</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="French">French (Français)</option>
                <option value="German">German (Deutsch)</option>
                <option value="Japanese">Japanese (日本語)</option>
                <option value="Chinese">Chinese (中文)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Chief Technology Officers, Marketing Leads"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Key Selling Points / USPs
            </label>
            <textarea
              rows={3}
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              placeholder="Enter 2-3 key bullet points..."
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <button
            onClick={() => handleGenerate()}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 text-amber-300" />
            )}
            <span>{loading ? 'Generating with Gemini...' : 'Generate AI Campaign Copy'}</span>
          </button>
        </div>

        {/* Right Preview Output Pane */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-7 h-[580px]">
          {/* Header Controls */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm dark:text-white">Live AI Output</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                {wordCount} words
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export MD</span>
              </button>
            </div>
          </div>

          {/* Generated Text Canvas */}
          <div className="flex-1 overflow-y-auto p-6 font-sans text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap bg-slate-50/50 dark:bg-slate-900/40">
            {generatedContent}
          </div>

          {/* Prompt Refiner Bar */}
          <div className="border-t border-slate-100 p-4 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-b-3xl">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2">
              Quick AI Polishers:
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleGenerate('Make shorter and punchier')}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                ⚡ Make Shorter
              </button>
              <button
                onClick={() => handleGenerate('Add strong call to action at end')}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                🎯 Stronger CTA
              </button>
              <button
                onClick={() => handleGenerate('Include relevant viral hashtags')}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                # Add Hashtags
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
