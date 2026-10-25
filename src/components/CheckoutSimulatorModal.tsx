import React, { useState } from 'react';
import { X, Check, ShieldCheck, ArrowRight, CreditCard, Sparkles } from 'lucide-react';
import { PricingTier, Currency } from '../types';

interface CheckoutSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: PricingTier | null;
  calculatedPrice: number;
  isAnnual: boolean;
  usageValue: number;
  currency: Currency;
  metricName: string;
  unitLabel: string;
}

export const CheckoutSimulatorModal: React.FC<CheckoutSimulatorModalProps> = ({
  isOpen,
  onClose,
  tier,
  calculatedPrice,
  isAnnual,
  usageValue,
  currency,
  metricName,
  unitLabel,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !tier) return null;

  const handleSimulatePayment = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 text-slate-900 dark:text-slate-100 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-extrabold">Subscription Simulated!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              Your test subscription to the <strong>{tier.name}</strong> plan was simulated successfully. The pricing model works seamlessly!
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                Checkout Preview
              </span>
              {tier.badgeText && (
                <span className="text-[10px] font-semibold text-slate-500">
                  · {tier.badgeText}
                </span>
              )}
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {tier.name} Plan
            </h3>
            <p className="text-xs text-slate-500 mt-1">{tier.description}</p>

            {/* Price breakdown box */}
            <div className="my-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 dark:text-slate-400">Cadence</span>
                <span className="font-semibold">{isAnnual ? 'Annual Billing' : 'Monthly Billing'}</span>
              </div>

              {tier.hasUsagePricing && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-400">
                    {metricName} allocation
                  </span>
                  <span className="font-mono font-medium">
                    {usageValue} {unitLabel}
                  </span>
                </div>
              )}

              {isAnnual && tier.annualDiscountPercent > 0 && (
                <div className="flex justify-between items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Discount Applied</span>
                  <span>{tier.annualDiscountPercent}% OFF</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline">
                <span className="font-bold text-sm">Total Due Today</span>
                <div className="text-right">
                  <span className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                    {currency.symbol}{isAnnual ? calculatedPrice * 12 : calculatedPrice}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {isAnnual ? `(${currency.symbol}${calculatedPrice}/month)` : '/month'}
                  </span>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-2 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Included in this plan:
              </span>
              <ul className="space-y-1.5 text-xs">
                {tier.features.filter((f) => f.included).slice(0, 4).map((f) => (
                  <li key={f.id} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{f.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Simulated Action */}
            <button
              type="button"
              onClick={handleSimulatePayment}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <CreditCard className="w-4 h-4" />
              <span>Simulate Subscription ({currency.symbol}{isAnnual ? calculatedPrice * 12 : calculatedPrice})</span>
            </button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sandbox preview mode · No real charge occurs</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
