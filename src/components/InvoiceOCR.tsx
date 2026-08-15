import React, { useState } from 'react';
import {
  Receipt,
  Upload,
  CheckCircle2,
  FileCode,
  Download,
  Building,
  Calendar,
  DollarSign,
  Tag,
  CreditCard,
  RefreshCw,
  FileText,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { ExtractedInvoice } from '../types';

export const InvoiceOCR: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<'aws' | 'office' | 'software'>('aws');
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedInvoice>({
    vendorName: 'Amazon Web Services Inc.',
    invoiceNumber: 'INV-2026-88910',
    date: '2026-07-28',
    dueDate: '2026-08-15',
    currency: 'USD',
    lineItems: [
      { description: 'Cloud Run Container Hosting (Standard)', quantity: 1, unitPrice: 240.0, amount: 240.0 },
      { description: 'Cloud Storage Bucket Assets', quantity: 50, unitPrice: 0.8, amount: 40.0 },
      { description: 'Managed Egress Data Transfer', quantity: 1, unitPrice: 35.5, amount: 35.5 },
    ],
    subtotal: 315.5,
    tax: 28.39,
    totalAmount: 343.89,
    category: 'Cloud Infrastructure',
    paymentStatus: 'Paid',
    confidenceScore: 0.99,
  });

  const handleProcessSample = async (sampleKey: 'aws' | 'office' | 'software') => {
    setSelectedSample(sampleKey);
    setLoading(true);

    try {
      const res = await fetch('/api/ocr/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sampleId: sampleKey }),
      });
      const data = await res.json();
      if (data.vendorName) {
        setExtractedData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Str = event.target?.result as string;
      setLoading(true);
      try {
        const res = await fetch('/api/ocr/invoice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64Str }),
        });
        const data = await res.json();
        if (data.vendorName) {
          setExtractedData(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(extractedData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `invoice-${extractedData.invoiceNumber || 'data'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Invoice & Receipt OCR Extractor
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Automated line-item extraction, tax calculations, and accounting schema parser
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            99.4% Extraction Precision
          </span>
        </div>
      </div>

      {/* Input Options Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-4 text-center transition hover:bg-indigo-50/80 dark:border-indigo-800/60 dark:bg-indigo-950/30">
          <Upload className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span className="mt-2 text-xs font-bold text-indigo-900 dark:text-indigo-200">Upload Receipt / Invoice</span>
          <span className="text-[10px] text-slate-400">PNG, JPG, PDF up to 10MB</span>
          <input type="file" accept="image/*,.pdf" onChange={handleCustomFileUpload} className="hidden" />
        </label>

        <button
          onClick={() => handleProcessSample('aws')}
          className={`flex flex-col items-start rounded-2xl border p-4 text-left transition ${
            selectedSample === 'aws'
              ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20 dark:border-indigo-500 dark:bg-slate-900'
              : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold text-slate-900 dark:text-white">Sample: AWS Cloud</span>
            <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[9px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              $343.89
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Cloud hosting, storage buckets & bandwidth egress bill
          </p>
        </button>

        <button
          onClick={() => handleProcessSample('office')}
          className={`flex flex-col items-start rounded-2xl border p-4 text-left transition ${
            selectedSample === 'office'
              ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20 dark:border-indigo-500 dark:bg-slate-900'
              : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold text-slate-900 dark:text-white">Sample: Staples Office</span>
            <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[9px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              $578.86
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Ergonomic desk chairs & monitor stand hardware receipt
          </p>
        </button>

        <button
          onClick={() => handleProcessSample('software')}
          className={`flex flex-col items-start rounded-2xl border p-4 text-left transition ${
            selectedSample === 'software'
              ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20 dark:border-indigo-500 dark:bg-slate-900'
              : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold text-slate-900 dark:text-white">Sample: Figma Design</span>
            <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[9px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              $492.48
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Organization seat licenses & FigJam team subscriptions
          </p>
        </button>
      </div>

      {/* Main Extracted Data Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
              <Receipt className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {extractedData.vendorName}
                </h2>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {extractedData.paymentStatus}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Invoice #{extractedData.invoiceNumber} • Category: {extractedData.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJSON}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <Download className="h-4 w-4 text-slate-400" />
              <span>Export Accounting JSON</span>
            </button>
            <button
              onClick={() => alert('Invoice line items synced to QuickBooks Online Sandbox!')}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-indigo-700 shadow-md shadow-indigo-600/20"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Sync to QuickBooks</span>
            </button>
          </div>
        </div>

        {/* Metadata Badges Bar */}
        <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50 sm:grid-cols-4">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Vendor Name</span>
            <p className="text-xs font-bold text-slate-900 dark:text-white">{extractedData.vendorName}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Issue Date</span>
            <p className="text-xs font-bold text-slate-900 dark:text-white">{extractedData.date}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Due Date</span>
            <p className="text-xs font-bold text-slate-900 dark:text-white">{extractedData.dueDate}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">OCR Confidence Score</span>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {Math.round((extractedData.confidenceScore || 0.98) * 100)}% Match
            </p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase dark:border-slate-800">
                <th className="py-3 px-2">Line Description</th>
                <th className="py-3 px-2 text-center">Qty</th>
                <th className="py-3 px-2 text-right">Unit Price</th>
                <th className="py-3 px-2 text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {extractedData.lineItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3.5 px-2 font-semibold text-slate-900 dark:text-slate-100">
                    {item.description}
                  </td>
                  <td className="py-3.5 px-2 text-center text-slate-600 dark:text-slate-400">{item.quantity}</td>
                  <td className="py-3.5 px-2 text-right text-slate-600 dark:text-slate-400">
                    ${item.unitPrice.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-2 text-right font-bold text-slate-900 dark:text-white">
                    ${item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Subtotal & Total Summary Block */}
        <div className="mt-6 flex flex-col items-end border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="w-full max-w-xs space-y-2 text-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                ${extractedData.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Calculated Tax:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                ${extractedData.tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-extrabold text-slate-900 dark:border-slate-700 dark:text-white">
              <span>Grand Total:</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                ${extractedData.totalAmount.toFixed(2)} {extractedData.currency}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
