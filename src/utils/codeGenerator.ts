import { PricingStrategyConfig } from '../types';

export function generateReactTailwindCode(config: PricingStrategyConfig): string {
  const tiersJson = JSON.stringify(config.tiers, null, 2);
  const currencySymbol = config.currency.symbol;

  return `import React, { useState } from 'react';
import { Check, X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  included: boolean;
  tooltip?: string;
}

interface Tier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualDiscountPercent: number;
  badgeText?: string;
  isPopular?: boolean;
  ctaText: string;
  ctaVariant?: 'primary' | 'secondary' | 'outline';
  features: Feature[];
  hasUsagePricing?: boolean;
  baseUnitsIncluded?: number;
  unitPriceMonthly?: number;
}

const TIERS: Tier[] = ${tiersJson};

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [usageValue, setUsageValue] = useState<number>(${config.usageSlider.defaultValue});

  const currencySymbol = '${currencySymbol}';
  const hasUsage = ${config.usageSlider.enabled};

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          ${config.headline.replace(/"/g, '\\"')}
        </h2>
        <p className="text-base md:text-lg text-slate-600">
          ${config.subheadline.replace(/"/g, '\\"')}
        </p>

        {/* Billing Switcher */}
        <div className="mt-8 inline-flex items-center gap-3 p-1.5 bg-slate-100 rounded-full border border-slate-200">
          <button
            type="button"
            onClick={() => setIsAnnual(false)}
            className={\`px-4 py-2 text-sm font-semibold rounded-full transition-all \${
              !isAnnual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            Monthly billing
          </button>
          <button
            type="button"
            onClick={() => setIsAnnual(true)}
            className={\`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all \${
              isAnnual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            Annual billing
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800">
              Save 20%
            </span>
          </button>
        </div>

        ${
          config.usageSlider.enabled
            ? `{/* Usage Slider */}
        <div className="mt-8 max-w-md mx-auto p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">
              ${config.usageSlider.metricName}:
            </span>
            <span className="text-sm font-bold text-slate-900 tabular-nums">
              {usageValue} ${config.usageSlider.unitLabel}
            </span>
          </div>
          <input
            type="range"
            min={${config.usageSlider.min}}
            max={${config.usageSlider.max}}
            step={${config.usageSlider.step}}
            value={usageValue}
            onChange={(e) => setUsageValue(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>`
            : ''
        }
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(config.tiers.length, 4)} gap-8 items-stretch">
        {TIERS.map((tier) => {
          // Dynamic price calculation
          let effectiveMonthly = tier.monthlyPrice;
          if (hasUsage && tier.hasUsagePricing && tier.unitPriceMonthly && tier.baseUnitsIncluded !== undefined) {
            const extraUnits = Math.max(0, usageValue - tier.baseUnitsIncluded);
            effectiveMonthly += extraUnits * tier.unitPriceMonthly;
          }

          const displayPrice = isAnnual
            ? Math.round(effectiveMonthly * (1 - tier.annualDiscountPercent / 100))
            : Math.round(effectiveMonthly);

          return (
            <div
              key={tier.id}
              className={\`relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition-all \${
                tier.isPopular
                  ? 'border-2 border-indigo-600 bg-white shadow-xl shadow-indigo-100 ring-4 ring-indigo-50/50'
                  : 'border border-slate-200 bg-white hover:border-slate-300 shadow-sm'
              }\`}
            >
              {tier.badgeText && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className={\`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider \${
                    tier.isPopular ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }\`}>
                    {tier.badgeText}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                <p className="mt-2 text-sm text-slate-500 min-h-[40px]">{tier.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 tabular-nums">
                    {currencySymbol}{displayPrice}
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    /month
                  </span>
                </div>
                {isAnnual && tier.monthlyPrice > 0 && (
                  <p className="mt-1 text-xs text-slate-500">
                    Billed annually ({currencySymbol}{displayPrice * 12}/yr)
                  </p>
                )}

                <button
                  type="button"
                  className={\`mt-6 w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 \${
                    tier.isPopular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }\`}
                >
                  {tier.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="my-6 border-t border-slate-100" />

                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                  What's included
                </div>
                <ul className="space-y-3 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature.id} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-slate-700' : 'text-slate-400 line-through'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      ${
        config.guaranteeText
          ? `{/* Guarantee Footer */}
      <div className="mt-12 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>${config.guaranteeText}</span>
      </div>`
          : ''
      }
    </section>
  );
}
`;
}
