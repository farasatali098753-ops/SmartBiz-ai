import React, { useState } from 'react';
import {
  CreditCard,
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  Building,
  ArrowRight,
  X,
  Lock,
} from 'lucide-react';
import { SubscriptionPlan, UserProfile } from '../types';
import { SUBSCRIPTION_PLANS } from '../data/mockData';

interface BillingSubscriptionProps {
  user: UserProfile;
  onUpdatePlan: (newPlan: 'Free' | 'Pro' | 'Enterprise', extraCredits?: number) => void;
}

export const BillingSubscription: React.FC<BillingSubscriptionProps> = ({ user, onUpdatePlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlanForUpgrade, setSelectedPlanForUpgrade] = useState<SubscriptionPlan | null>(null);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');
  const [upgrading, setUpgrading] = useState(false);
  const [purchasingAddon, setPurchasingAddon] = useState(false);

  const creditUsagePercent = Math.round((user.creditsUsed / user.creditsTotal) * 100);

  const handleStripeCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForUpgrade) return;
    setUpgrading(true);

    setTimeout(() => {
      const planName = selectedPlanForUpgrade.id === 'pro' ? 'Pro' : selectedPlanForUpgrade.id === 'enterprise' ? 'Enterprise' : 'Free';
      const credits = selectedPlanForUpgrade.credits;
      onUpdatePlan(planName, credits);
      setUpgrading(false);
      setSelectedPlanForUpgrade(null);
    }, 1200);
  };

  const handleBuyAddon = () => {
    setPurchasingAddon(true);
    setTimeout(() => {
      onUpdatePlan(user.plan, user.creditsTotal + 2500);
      setPurchasingAddon(false);
      alert('Successfully purchased 2,500 extra AI credits!');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Plans & Stripe Billing
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage your AI credit allocation, billing cycle, and workspace seats
          </p>
        </div>

        {/* Monthly / Annual Toggle */}
        <div className="flex items-center gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setIsAnnual(false)}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              !isAnnual ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white' : 'text-slate-500'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              isAnnual ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500'
            }`}
          >
            <span>Annual Billing</span>
            <span className="rounded-full bg-amber-400 px-1.5 py-0.2 text-[9px] font-extrabold text-slate-900">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Current Quota Status Banner */}
      <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent p-6 dark:border-indigo-900/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Current Active Subscription
              </span>
              <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-extrabold text-white">
                {user.plan} Plan
              </span>
            </div>
            <div className="mt-2 text-xl font-black text-slate-900 dark:text-white">
              {user.creditsUsed.toLocaleString()} / {user.creditsTotal.toLocaleString()} Credits Used
            </div>
            <div className="mt-2 h-2.5 w-full max-w-md overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className={`h-full rounded-full transition-all ${
                  creditUsagePercent > 85 ? 'bg-amber-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${creditUsagePercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBuyAddon}
              disabled={purchasingAddon}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Zap className="h-4 w-4 text-amber-500" />
              <span>{purchasingAddon ? 'Processing...' : 'Buy +2,500 Credits ($15)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Plans Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrent = user.plan.toLowerCase() === plan.name.toLowerCase().split(' ')[0];
          const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl border p-6 transition-all ${
                plan.popular
                  ? 'border-indigo-600 bg-white shadow-xl ring-2 ring-indigo-500/20 dark:border-indigo-500 dark:bg-slate-900'
                  : 'border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-[10px] font-extrabold text-white uppercase tracking-wider shadow-md">
                  Most Popular for SaaS
                </div>
              )}

              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">${price}</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {plan.credits.toLocaleString()} AI credits • {plan.seats} Team seats
                </p>

                <div className="my-6 border-t border-slate-100 dark:border-slate-800" />

                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full rounded-2xl bg-slate-100 py-3 text-xs font-bold text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                  >
                    Current Active Plan
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedPlanForUpgrade(plan)}
                    className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold transition shadow-md ${
                      plan.popular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20'
                        : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600'
                    }`}
                  >
                    <span>Upgrade to {plan.name}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stripe Payment Checkout Modal Simulation */}
      {selectedPlanForUpgrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm dark:text-white">
                <CreditCard className="h-5 w-5 text-indigo-600" />
                <span>Stripe Secure Payment</span>
              </div>
              <button
                onClick={() => setSelectedPlanForUpgrade(null)}
                className="rounded-xl p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <div className="flex items-center justify-between font-bold text-slate-900 text-sm dark:text-white">
                <span>{selectedPlanForUpgrade.name} ({isAnnual ? 'Annual' : 'Monthly'})</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-black">
                  ${isAnnual ? selectedPlanForUpgrade.priceAnnual : selectedPlanForUpgrade.priceMonthly} / mo
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Includes {selectedPlanForUpgrade.credits.toLocaleString()} AI credits per month
              </p>
            </div>

            <form onSubmit={handleStripeCheckout} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Card Number
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 pr-10 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Expiration (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    CVC Security Code
                  </label>
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" /> 256-bit Stripe SSL Encryption
                </span>

                <button
                  type="submit"
                  disabled={upgrading}
                  className="rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 disabled:opacity-50"
                >
                  {upgrading ? 'Processing Payment...' : 'Confirm Subscription'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
