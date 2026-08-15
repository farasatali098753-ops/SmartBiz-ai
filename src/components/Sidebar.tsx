import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Receipt,
  TrendingUp,
  Mail,
  Users,
  CreditCard,
  Settings,
  Bot,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  collapsed: boolean;
  setCollapsed: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
}) => {
  const menuItems: { id: TabType; label: string; icon: React.ComponentType<any>; badge?: string }[] = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'doc-chatbot', label: 'Document Chatbot (RAG)', icon: FileText, badge: 'AI' },
    { id: 'content-gen', label: 'Content Generator', icon: Sparkles, badge: 'Hot' },
    { id: 'invoice-ocr', label: 'Invoice OCR Parser', icon: Receipt },
    { id: 'sales-analytics', label: 'Sales & Analytics', icon: TrendingUp },
    { id: 'email-assistant', label: 'Email Intelligence', icon: Mail },
    { id: 'admin-users', label: 'Team & Security', icon: Users },
    { id: 'billing', label: 'Plans & Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      id="main-app-sidebar"
      className={`relative flex flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 ${
        collapsed ? 'w-16 sm:w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4 dark:border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md shadow-indigo-500/20">
            <Bot className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                SmartBiz <span className="text-indigo-600 dark:text-indigo-400">AI</span>
              </span>
              <span className="text-[10px] font-medium text-slate-400">SaaS Automation</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation Menu */}
      <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 dark:bg-indigo-600 dark:text-white'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                }`}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}

              {!collapsed && item.badge && (
                <span
                  className={`ml-auto rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Collapsed view indicator dot */}
              {collapsed && isActive && (
                <span className="absolute right-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-indigo-600" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Upgrade Banner in Sidebar */}
      {!collapsed && (
        <div className="p-3">
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-3.5 dark:border-indigo-900/30 dark:from-indigo-950/40 dark:to-slate-900">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-200">
              <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>Pro Plan Active</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              Enjoying 5,000 monthly credits & RAG document chatbot.
            </p>
            <button
              onClick={() => setActiveTab('billing')}
              className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700 shadow-sm"
            >
              <span>Manage Billing</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Collapse Footer Toggle */}
      <div className="border-t border-slate-100 p-2 dark:border-slate-800">
        <button
          id="sidebar-collapse-toggle"
          onClick={() => setCollapsed((prev) => !prev)}
          className="flex w-full items-center justify-center rounded-xl py-2 text-xs font-medium text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform duration-200 ${collapsed ? '' : 'rotate-180'}`}
          />
        </button>
      </div>
    </aside>
  );
};
