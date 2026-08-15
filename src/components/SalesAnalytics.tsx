import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  DollarSign,
  Users,
  Download,
  AlertTriangle,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  FileCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { SALES_PERFORMANCE } from '../data/mockData';

export const SalesAnalytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState('Q2 2026');
  const [loading, setLoading] = useState(false);
  const [aiReport, setAiReport] = useState<string>(`### 📊 Executive AI Performance Report (Q2 2026)

#### Key Highlights:
• **Gross Revenue**: Expanded to **$142,500** (+18.4% MRR expansion), driven primarily by Enterprise SaaS plan upgrades.
• **Efficiency Ratio**: Customer Acquisition Cost (CAC) dropped to **$85**, yielding a healthy **4.2x LTV:CAC ratio**.
• **Subscriber Retention**: Monthly churn rate is at an all-time low of **1.2%**.

#### 🎯 Strategic Recommendations:
1. **Expand AI Document Credits**: 34% of active Pro teams are approaching their monthly credit limit. Introducing automatic credit top-ups could boost MRR by +8%.
2. **Optimize Content Generator**: Blog copy generation accounts for 45% of total API usage. Promote annual billing incentives.
3. **Automate Invoice Syncing**: Integrating direct QuickBooks exporting will unlock the accounting vertical.`);

  const handleGenerateAIReport = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/analytics/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timeframe,
          metrics: {
            grossRevenue: 142500,
            mrrGrowth: 18.4,
            churnRate: 1.2,
            topProduct: 'Pro Automation Plan',
            cac: 85,
          },
        }),
      });
      const data = await res.json();
      if (data.executiveSummary) {
        setAiReport(data.executiveSummary);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            AI Sales & Business Analytics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time financial performance forecasting and executive Gemini business insights
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="Q2 2026">Q2 2026 (Current)</option>
            <option value="Q1 2026">Q1 2026</option>
            <option value="FY 2025">Full Year 2025</option>
          </select>

          <button
            onClick={handleGenerateAIReport}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-amber-300" />}
            <span>Generate Executive AI Report</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Quarterly Gross Revenue</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">$142,500</span>
            <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" /> +18.4%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Target $130,000 surpassed</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">New Business Accounts</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">115</span>
            <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" /> +12% MoM
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Avg LTV: $2,450</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Monthly Subscriber Churn</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">1.2%</span>
            <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowDownRight className="h-3.5 w-3.5" /> -0.4% MoM
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Top 5% SaaS industry benchmark</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Customer Acquisition Cost</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">$85</span>
            <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              4.2x LTV:CAC
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Payback period: 2.1 months</p>
        </div>
      </div>

      {/* Main Charts & Executive Report Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Revenue vs Expense Bar Chart */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-7">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Revenue vs Operational Expense Breakdown</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Monthly comparisons for 2026</p>

          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_PERFORMANCE} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(value: any) => [`$${value?.toLocaleString()}`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="revenue" name="Revenue ($)" fill="#6366f1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses ($)" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Executive Summary Card */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Executive Gemini Summary</h3>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                Score: A+
              </span>
            </div>

            <div className="mt-4 text-xs leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-wrap max-h-[300px] overflow-y-auto">
              {aiReport}
            </div>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
            <button
              onClick={() => {
                const blob = new Blob([aiReport], { type: 'text/markdown' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `smartbiz-sales-report-${timeframe}.md`;
                a.click();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <Download className="h-4 w-4" />
              <span>Download Executive Report (MD)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
