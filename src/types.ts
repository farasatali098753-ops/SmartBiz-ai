export type TabType =
  | 'overview'
  | 'doc-chatbot'
  | 'content-gen'
  | 'invoice-ocr'
  | 'sales-analytics'
  | 'email-assistant'
  | 'admin-users'
  | 'billing'
  | 'settings';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Member' | 'Viewer';
  avatar: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  creditsUsed: number;
  creditsTotal: number;
}

export interface CompanyDocument {
  id: string;
  title: string;
  type: 'PDF' | 'DOCX' | 'TXT';
  size: string;
  uploadDate: string;
  status: 'Ready' | 'Processing';
  contentSnippet: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citations?: string[];
  confidenceScore?: number;
  suggestedFollowups?: string[];
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface ExtractedInvoice {
  vendorName: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  currency: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  totalAmount: number;
  category: string;
  paymentStatus: 'Paid' | 'Approved' | 'Pending' | 'Overdue';
  confidenceScore: number;
}

export interface SalesDataPoint {
  month: string;
  revenue: number;
  expenses: number;
  newCustomers: number;
  ocrInvoicesProcessed: number;
}

export interface EmailThread {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  timestamp: string;
  rawBody: string;
  sentiment?: 'Positive' | 'Neutral' | 'Urgent';
  summary?: string[];
  actionItems?: string[];
  suggestedReplies?: {
    variant: string;
    text: string;
  }[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Invited';
  lastActive: string;
  avatar: string;
}

export interface SubscriptionPlan {
  id: 'free' | 'pro' | 'enterprise';
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  credits: number;
  seats: number;
  features: string[];
  popular?: boolean;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  time: string;
  type: 'doc' | 'content' | 'invoice' | 'sales' | 'email' | 'user';
}
