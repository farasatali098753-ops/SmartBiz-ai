import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { DocumentChatbot } from './components/DocumentChatbot';
import { ContentGenerator } from './components/ContentGenerator';
import { InvoiceOCR } from './components/InvoiceOCR';
import { SalesAnalytics } from './components/SalesAnalytics';
import { EmailAssistant } from './components/EmailAssistant';
import { AdminUserManagement } from './components/AdminUserManagement';
import { BillingSubscription } from './components/BillingSubscription';
import { SettingsModal } from './components/SettingsModal';
import { TabType, UserProfile } from './types';
import { INITIAL_USER } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleUpdatePlan = (newPlan: 'Free' | 'Pro' | 'Enterprise', extraCredits?: number) => {
    setUser((prev) => ({
      ...prev,
      plan: newPlan,
      creditsTotal: extraCredits || (newPlan === 'Enterprise' ? 50000 : newPlan === 'Pro' ? 5000 : 500),
    }));
  };

  return (
    <div className={`min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100 flex flex-col`}>
      {/* Top Navigation Header */}
      <Header
        user={user}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Body Layout with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            if (tab === 'settings') {
              setIsSettingsOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* Content View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {activeTab === 'overview' && (
              <DashboardOverview
                setActiveTab={setActiveTab}
                onQuickAction={(act) => setActiveTab(act as TabType)}
              />
            )}
            {activeTab === 'doc-chatbot' && <DocumentChatbot />}
            {activeTab === 'content-gen' && <ContentGenerator />}
            {activeTab === 'invoice-ocr' && <InvoiceOCR />}
            {activeTab === 'sales-analytics' && <SalesAnalytics />}
            {activeTab === 'email-assistant' && <EmailAssistant />}
            {activeTab === 'admin-users' && <AdminUserManagement />}
            {activeTab === 'billing' && (
              <BillingSubscription user={user} onUpdatePlan={handleUpdatePlan} />
            )}
          </div>
        </main>
      </div>

      {/* Workspace Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
      />
    </div>
  );
}
