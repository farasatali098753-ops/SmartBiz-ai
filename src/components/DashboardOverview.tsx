import React from 'react';
import {
  FileText,
  Sparkles,
  Receipt,
  TrendingUp,
  Mail,
  Zap,
  Clock,
  CheckCircle2,
  DollarSign,
  ArrowUpRight,
  Plus,
  ArrowRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TabType, ActivityItem } from '../types';
import { SALES_PERFORMANCE, RECENT_ACTIVITIES } from '../data/mockData';

interface DashboardOverviewProps {
  setActiveTab: (tab: TabType) => void;
  onQuickAction: (action: string) => void;
}

const FEATURE_USAGE = [
  { name: 'Document Q&A', value: 38, color: '#6366f1' },
  { name: 'Content Suite', value: 28, color: '#a855f7' },
  { name: 'Invoice OCR', value: 20, color: '#10b981' },
  { name: 'Email Drafts', value: 14, color: '#f59e0b' },
];

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-6">
      {/* Executive Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
            <Zap className="h-3.5 w-3.5 text-amber-300" />
            <span>SmartBiz AI Engine • Operational Status: Peak Performance</span>
          </div>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Welcome back, Alex 👋
          </h1>
          <p className="mt-2 text-sm text-indigo-100/90 leading-relaxed">
            Your automated business agents saved your team <span className="font-bold text-white">142.5 hours</span> this month across document analysis, email replies, and invoice processing.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('doc-chatbot')}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-indigo-900 transition hover:bg-indigo-50 shadow-md"
            >
              <FileText className="h-4 w-4 text-indigo-600" />
              <span>Ask Document AI</span>
            </button>
            <button
              onClick={() => setActiveTab('content-gen')}
              className="flex items-center gap-2 rounded-xl bg-indigo-700/60 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700 border border-indigo-400/30 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Create Campaign Content</span>
            </button>
            <button
              onClick={() => setActiveTab('invoice-ocr')}
              className="flex items-center gap-2 rounded-xl bg-indigo-700/60 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700 border border-indigo-400/30 backdrop-blur-md"
            >
              <Receipt className="h-4 w-4 text-emerald-300" />
              <span>Scan Invoice OCR</span>
            </button>
          </div>
        </div>

        {/* Decorative Background Accents */}
        <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -top-12 h-48 w-48 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Automation Tasks</span>
            <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">1,482</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" /> +24% MoM
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Across RAG, Content, and Email</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Hours Saved</span>
            <div className="rounded-xl bg-purple-50 p-2 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">142.5 hrs</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" /> +18 hrs
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Calculated at $65/hr labor rate</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">OCR Spend Extracted</span>
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">$142,500</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" /> 1,680 bills
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">99.4% OCR extraction precision</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Support Resolution SLA</span>
            <div className="rounded-xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">99.4%</span>
            <span className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              &lt; 14 min avg
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">RAG chatbot self-serve answer rate</p>
        </div>
      </div>

      {/* Main Analytics & Distribution Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue Growth Graph */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Revenue & Automation Growth</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Monthly recurring revenue vs OCR invoices processed</p>
            </div>
            <button
              onClick={() => setActiveTab('sales-analytics')}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-indigo-400 dark:hover:bg-slate-800"
            >
              <span>Full Analytics</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_PERFORMANCE} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`$${value?.toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Task Distribution Pie */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">AI Workload Share</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tasks executed by SmartBiz module</p>
          </div>

          <div className="my-4 h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={FEATURE_USAGE} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                  {FEATURE_USAGE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(v: any) => [`${v}% share`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
            {FEATURE_USAGE.map((f) => (
              <div key={f.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: f.color }} />
                <span className="text-slate-600 dark:text-slate-300 truncate">{f.name}</span>
                <span className="ml-auto font-bold text-slate-900 dark:text-white">{f.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Launchers & Recent Activity Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick Launch Suite */}
        <div className="space-y-3 lg:col-span-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Automated AI Modules</h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={() => setActiveTab('doc-chatbot')}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm">
                  <span>Document RAG Chatbot</span>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600 dark:text-slate-600" />
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Upload PDFs/DOCX and ask questions with exact page citations.
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('content-gen')}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-purple-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-purple-800"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm">
                  <span>Content Creator</span>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-purple-600 dark:text-slate-600" />
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Draft blogs, LinkedIn posts, ads & emails in 7 languages.
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('invoice-ocr')}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <Receipt className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm">
                  <span>Invoice OCR Parser</span>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600 dark:text-slate-600" />
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Extract line-items, tax & vendor totals directly into JSON.
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('email-assistant')}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-amber-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-amber-800"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm">
                  <span>Email Intelligence</span>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-amber-600 dark:text-slate-600" />
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Summarize long customer support emails & draft 3 smart replies.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Live Audit Log Feed */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Workspace Audit Trail</h3>
            <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">Live</span>
          </div>

          <div className="mt-4 space-y-3">
            {RECENT_ACTIVITIES.map((act) => (
              <div key={act.id} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 text-xs font-bold">
                  {act.user.charAt(0)}
                </div>
                <div className="flex-1 text-xs">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{act.user}</p>
                  <p className="text-slate-500 dark:text-slate-400 leading-tight">{act.action}</p>
                  <span className="text-[10px] text-slate-400">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
