import React, { useState } from 'react';
import {
  Search,
  Moon,
  Sun,
  Bell,
  Globe,
  Sparkles,
  ChevronDown,
  User,
  Settings as SettingsIcon,
  LogOut,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { UserProfile, TabType } from '../types';

interface HeaderProps {
  user: UserProfile;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: string;
  setLanguage: (lang: string) => void;
  onOpenSettings: () => void;
}

const LANGUAGES = [
  { code: 'English', label: 'English (US)' },
  { code: 'Spanish', label: 'Español' },
  { code: 'French', label: 'Français' },
  { code: 'German', label: 'Deutsch' },
  { code: 'Japanese', label: '日本語' },
  { code: 'Chinese', label: '中文' },
  { code: 'Arabic', label: 'العربية' },
];

export const Header: React.FC<HeaderProps> = ({
  user,
  darkMode,
  setDarkMode,
  setActiveTab,
  language,
  setLanguage,
  onOpenSettings,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 'n1',
      title: 'Invoice OCR Complete',
      desc: 'AWS Cloud invoice extracted $343.89 successfully',
      time: '10m ago',
      unread: true,
    },
    {
      id: 'n2',
      title: 'Credit Usage Alert',
      desc: 'Your workspace has reached 74% of monthly AI credits',
      time: '1h ago',
      unread: true,
    },
    {
      id: 'n3',
      title: 'New Member Active',
      desc: 'Elena Rostova logged into the workspace',
      time: '3h ago',
      unread: false,
    },
  ];

  const creditPercentage = Math.round((user.creditsUsed / user.creditsTotal) * 100);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Redirect search query to Document Chatbot
    setActiveTab('doc-chatbot');
  };

  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/95 sm:px-6"
    >
      {/* Left Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative hidden max-w-md flex-1 md:flex">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
        <input
          id="header-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ask SmartBiz AI anything or search features..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:bg-slate-800"
        />
        <div className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-1">
          <kbd className="hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 lg:inline-block">
            ⌘K
          </kbd>
        </div>
      </form>

      {/* Right Control Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Credits Quota Indicator */}
        <button
          id="quota-badge-button"
          onClick={() => setActiveTab('billing')}
          className="group flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50/70 px-3 py-1.5 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-900/40 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/70"
          title="Click to view subscription plan & top up credits"
        >
          <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="hidden sm:inline">AI Credits:</span>
          <span className="font-semibold">
            {user.creditsUsed.toLocaleString()} / {user.creditsTotal.toLocaleString()}
          </span>
          <div className="hidden h-1.5 w-12 overflow-hidden rounded-full bg-indigo-200 dark:bg-indigo-900 sm:block">
            <div
              className={`h-full rounded-full transition-all ${
                creditPercentage > 85 ? 'bg-amber-500' : 'bg-indigo-600 dark:bg-indigo-400'
              }`}
              style={{ width: `${creditPercentage}%` }}
            />
          </div>
        </button>

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            id="language-selector-button"
            onClick={() => {
              setShowLangMenu(!showLangMenu);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            className="flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/70"
          >
            <Globe className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <span className="hidden md:inline">{language}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-800 dark:bg-slate-800">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                AI Output Language
              </div>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                    language === lang.code
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <span>{lang.label}</span>
                  {language === lang.code && <Check className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark / Light Mode Toggle */}
        <button
          id="theme-toggle-button"
          onClick={() => setDarkMode((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/70"
          title={`Switch to ${darkMode ? 'Light' : 'Dark'} Mode`}
        >
          {darkMode ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-slate-600" />
          )}
        </button>

        {/* Notifications Drawer Toggle */}
        <div className="relative">
          <button
            id="notifications-button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowLangMenu(false);
              setShowProfileMenu(false);
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/70"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-800">
              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5 dark:border-slate-700/50">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h4>
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  2 unread
                </span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`rounded-xl p-2.5 text-xs transition ${
                      n.unread
                        ? 'bg-indigo-50/50 dark:bg-indigo-950/30'
                        : 'bg-slate-50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between font-medium text-slate-900 dark:text-slate-100">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            id="user-profile-menu-button"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowLangMenu(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-xl p-1 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="h-8 w-8 rounded-xl object-cover ring-2 ring-indigo-500/20"
            />
            <div className="hidden text-left lg:block">
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">{user.name}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{user.role} • SmartBiz</div>
            </div>
            <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 lg:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-800">
              <div className="border-b border-slate-100 p-3 dark:border-slate-700/50">
                <p className="text-xs font-semibold text-slate-900 dark:text-white">{user.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{user.email}</p>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{user.plan} Plan Active</span>
                </div>
              </div>

              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => {
                    setActiveTab('admin-users');
                    setShowProfileMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/50"
                >
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  <span>Team & Workspace</span>
                </button>
                <button
                  onClick={() => {
                    onOpenSettings();
                    setShowProfileMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/50"
                >
                  <SettingsIcon className="h-3.5 w-3.5 text-slate-400" />
                  <span>Workspace Preferences</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('billing');
                    setShowProfileMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/50"
                >
                  <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Billing & Subscription</span>
                </button>
                <div className="my-1 border-t border-slate-100 dark:border-slate-700/50" />
                <button
                  onClick={() => {
                    alert('Log out simulated. You are logged into SmartBiz AI Demo Workspace.');
                    setShowProfileMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                >
                  <LogOut className="h-3.5 w-3.5 text-rose-500" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
