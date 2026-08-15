import { CompanyDocument, EmailThread, SalesDataPoint, SubscriptionPlan, TeamMember, ActivityItem } from '../types';

export const INITIAL_USER = {
  id: 'usr-1',
  name: 'Alex Vance',
  email: 'alex.vance@smartbiz.ai',
  role: 'Owner' as const,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  plan: 'Pro' as const,
  creditsUsed: 3740,
  creditsTotal: 5000,
};

export const INITIAL_DOCUMENTS: CompanyDocument[] = [
  {
    id: 'doc-1',
    title: 'SmartBiz Employee Handbook & Support SLA 2026.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadDate: '2026-07-25',
    status: 'Ready',
    contentSnippet: 'Standard support SLA: Response time for Pro customers is within 2 hours. Enterprise 15 min.',
  },
  {
    id: 'doc-2',
    title: 'SmartBiz Enterprise Pricing & SLA Matrix.docx',
    type: 'DOCX',
    size: '1.1 MB',
    uploadDate: '2026-07-22',
    status: 'Ready',
    contentSnippet: 'Subscription tiers overview, token roll-over guidelines, security encryption standards.',
  },
  {
    id: 'doc-3',
    title: 'Q2 Sales & Product Strategy Highlights.txt',
    type: 'TXT',
    size: '340 KB',
    uploadDate: '2026-07-18',
    status: 'Ready',
    contentSnippet: 'Gross revenue growth +34% YoY with 420 active SaaS business accounts. Churn reduced to 1.8%.',
  },
];

export const SALES_PERFORMANCE: SalesDataPoint[] = [
  { month: 'Jan', revenue: 68000, expenses: 32000, newCustomers: 34, ocrInvoicesProcessed: 420 },
  { month: 'Feb', revenue: 74000, expenses: 34000, newCustomers: 41, ocrInvoicesProcessed: 510 },
  { month: 'Mar', revenue: 89000, expenses: 39000, newCustomers: 58, ocrInvoicesProcessed: 680 },
  { month: 'Apr', revenue: 102000, expenses: 42000, newCustomers: 72, ocrInvoicesProcessed: 890 },
  { month: 'May', revenue: 118000, expenses: 48000, newCustomers: 88, ocrInvoicesProcessed: 1120 },
  { month: 'Jun', revenue: 135000, expenses: 51000, newCustomers: 104, ocrInvoicesProcessed: 1450 },
  { month: 'Jul', revenue: 142500, expenses: 54000, newCustomers: 115, ocrInvoicesProcessed: 1680 },
];

export const SAMPLE_EMAILS: EmailThread[] = [
  {
    id: 'em-1',
    sender: 'Sarah Jenkins (VP Ops, TechCorp)',
    senderEmail: 'sarah.j@techcorp.io',
    subject: 'Urgent: QuickBooks API & Invoice OCR Integration Inquiry',
    timestamp: 'Today, 10:14 AM',
    rawBody: `Hi SmartBiz Support Team,

We are currently evaluating SmartBiz AI for our accounting department (approx 800 invoices/month). We need to know if your Invoice OCR endpoint supports direct webhook sync to QuickBooks Online and whether custom expense categories can be assigned automatically.

Also, our legal team requires confirmation on whether uploaded vendor invoices are stored on US servers with AES-256 encryption.

Looking forward to your swift reply as we are finalizing our Q3 software stack by Friday.

Thanks,
Sarah Jenkins`,
    sentiment: 'Urgent',
    summary: [
      'TechCorp evaluating SmartBiz for 800 invoices/month.',
      'Needs confirmation on QuickBooks webhook sync & custom expense categories.',
      'Requests legal data sovereignty confirmation (US AES-256 storage).',
    ],
    actionItems: [
      'Confirm QuickBooks integration capabilities.',
      'Provide SOC2 / US storage encryption policy document.',
      'Offer technical demo session before Friday.',
    ],
    suggestedReplies: [
      {
        variant: 'Solution & Executive Reply',
        text: `Hi Sarah,\n\nThank you for reaching out! Yes, SmartBiz AI provides direct webhook syncing for QuickBooks Online with full custom category mapping rules.\n\nAll client documents are hosted exclusively on US Cloud Run infrastructure with AES-256 encryption at rest and TLS 1.3 in transit. We never train public AI models on your financial data.\n\nI have attached our SOC2 Compliance summary. Would you be open to a brief 15-minute call tomorrow at 2 PM EST to set up your team sandbox?\n\nBest regards,\nAlex Vance | SmartBiz AI`,
      },
      {
        variant: 'Empathetic & Direct',
        text: `Dear Sarah,\n\nWe would be thrilled to support TechCorp's 800 monthly invoices! Our automated OCR parser processes receipts in under 2 seconds with 99%+ accuracy.\n\nI have flagged your account for priority QuickBooks sandbox access. Let me know if tomorrow works for a quick walkthrough.\n\nWarmly,\nAlex Vance`,
      },
    ],
  },
  {
    id: 'em-2',
    sender: 'David Miller (Marketing Lead, Apex Retail)',
    senderEmail: 'dmiller@apexretail.com',
    subject: 'Loving the AI Content Suite - Question on LinkedIn Campaign Tool',
    timestamp: 'Yesterday, 4:30 PM',
    rawBody: `Hey Alex,

Just wanted to give a quick shoutout! The AI Content Generator saved our marketing team over 20 hours last week when drafting our summer ad copy. 

Quick question: Is there a way to save brand voice presets (e.g. "Playful Luxury") so all our team members write with the exact same tone across blog posts and social channels?

Best,
David`,
    sentiment: 'Positive',
    summary: [
      'Apex Retail saved 20+ hours using SmartBiz AI Content Generator.',
      'Wants to set up reusable Brand Voice presets ("Playful Luxury") for team.',
    ],
    actionItems: ['Share Brand Voice guide', 'Demonstrate Pro Plan team presets'],
    suggestedReplies: [
      {
        variant: 'Warm & Educational',
        text: `Hi David,\n\nThat is fantastic to hear! We love seeing team efficiency wins like that.\n\nYes! You can configure Brand Voice presets in your Settings > AI Preferences menu. Once saved, all team members under your Pro workspace can select "Playful Luxury" from the Tone dropdown with one click.\n\nLet me know if you need help configuring it!\n\nBest,\nAlex`,
      },
    ],
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Alex Vance',
    email: 'alex.vance@smartbiz.ai',
    role: 'Owner',
    status: 'Active',
    lastActive: 'Just now',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'tm-2',
    name: 'Marcus Chen',
    email: 'marcus.c@smartbiz.ai',
    role: 'Admin',
    status: 'Active',
    lastActive: '12 mins ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'tm-3',
    name: 'Elena Rostova',
    email: 'elena.r@smartbiz.ai',
    role: 'Editor',
    status: 'Active',
    lastActive: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'tm-4',
    name: 'James Wilson',
    email: 'james.w@partnertech.io',
    role: 'Viewer',
    status: 'Invited',
    lastActive: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Starter',
    priceMonthly: 0,
    priceAnnual: 0,
    credits: 500,
    seats: 1,
    features: [
      '500 AI credits per month',
      '1 User Seat',
      'Basic Document Q&A (max 5MB)',
      'Standard Email Summaries',
      'Community Support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Automation',
    priceMonthly: 49,
    priceAnnual: 39,
    credits: 5000,
    seats: 5,
    popular: true,
    features: [
      '5,000 AI credits per month',
      '5 User Seats included',
      'Unlimited Document Chatbot (RAG)',
      'AI Content Generator Suite',
      'Invoice & Receipt OCR Parser',
      'AI Business Analytics Reports',
      'Saved Brand Voice Presets',
      'Priority 2-hour SLA Support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Growth',
    priceMonthly: 199,
    priceAnnual: 159,
    credits: 50000,
    seats: 25,
    features: [
      '50,000 AI credits per month',
      '25 User Seats included',
      'Custom Fine-Tuned RAG Models',
      'Direct QuickBooks & Xero Sync',
      'Dedicated US Storage Tenant',
      '15-minute SLA Support & Phone',
      'Custom API & Webhooks Access',
      'SOC2 Type II Audit Logs',
    ],
  },
];

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    user: 'Alex Vance',
    action: 'Extracted invoice INV-2026-88910 (AWS) via OCR',
    time: '4 mins ago',
    type: 'invoice',
  },
  {
    id: 'act-2',
    user: 'Marcus Chen',
    action: 'Generated 4 LinkedIn ad posts for Q3 SaaS campaign',
    time: '18 mins ago',
    type: 'content',
  },
  {
    id: 'act-3',
    user: 'Elena Rostova',
    action: 'Asked Document Chatbot about Support SLA guidelines',
    time: '1 hour ago',
    type: 'doc',
  },
  {
    id: 'act-4',
    user: 'Alex Vance',
    action: 'Generated Q2 Executive AI Sales Insights Report',
    time: '3 hours ago',
    type: 'sales',
  },
  {
    id: 'act-5',
    user: 'Marcus Chen',
    action: 'Invited James Wilson (Viewer) to workspace',
    time: '5 hours ago',
    type: 'user',
  },
];
