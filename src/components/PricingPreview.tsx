import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle, 
  Monitor, 
  Tablet, 
  Smartphone,
  Sliders,
  Table,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PricingStrategyConfig, PricingTier, BillingCycle, PresetTheme } from '../types';

interface PricingPreviewProps {
  config: PricingStrategyConfig;
  onSelectTierCheckout: (tier: PricingTier, calculatedPrice: number, isAnnual: boolean, usageValue: number) => void;
}

export const PricingPreview: React.FC<PricingPreviewProps> = ({
  config,
  onSelectTierCheckout,
}) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  const [usageValue, setUsageValue] = useState<number>(config.usageSlider.defaultValue);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');

  const isAnnual = billingCycle === 'annual';
  const theme = config.theme;

  // Compute maximum discount percentage across tiers for the badge
  const maxDiscount = Math.max(...config.tiers.map((t) => t.annualDiscountPercent), 20);

  // Calculate dynamic price for a tier based on billing cycle & usage slider
  const calculateTierPrice = (tier: PricingTier): { monthlyRate: number; originalMonthly: number; hasUsageAddon: boolean } => {
    let baseMonthly = tier.monthlyPrice;
    let extraUnits = 0;
    let hasUsageAddon = false;

    if (config.usageSlider.enabled && tier.hasUsagePricing && tier.unitPriceMonthly && tier.baseUnitsIncluded !== undefined) {
      extraUnits = Math.max(0, usageValue - tier.baseUnitsIncluded);
      baseMonthly += extraUnits * tier.unitPriceMonthly;
      hasUsageAddon = extraUnits > 0;
    }

    const effectiveMonthly = isAnnual
      ? Math.round(baseMonthly * (1 - tier.annualDiscountPercent / 100))
      : Math.round(baseMonthly);

    return {
      monthlyRate: effectiveMonthly,
      originalMonthly: Math.round(baseMonthly),
      hasUsageAddon,
    };
  };

  // Device container class
  const getDeviceContainerClass = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-[400px] border-x border-slate-300 dark:border-slate-700 shadow-2xl';
      case 'tablet':
        return 'max-w-[820px] border-x border-slate-300 dark:border-slate-700 shadow-xl';
      default:
        return 'max-w-7xl';
    }
  };

  // Theme-specific styles
  const getThemeWrapperStyle = () => {
    switch (theme) {
      case 'dark-mode':
        return 'bg-[#090D16] text-slate-100 selection:bg-cyan-500/30';
      case 'minimalist-light':
        return 'bg-[#FAFAFA] text-neutral-900 selection:bg-neutral-200';
      case 'neo-brutalism':
        return 'bg-[#FFFDF5] text-black selection:bg-yellow-300';
      case 'saas-gradient':
      default:
        return 'bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white dark:from-slate-950 dark:via-indigo-950/10 dark:to-slate-950 text-slate-900 dark:text-slate-100';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto bg-slate-100 dark:bg-slate-950/80">
      {/* Top Preview Controls Bar */}
      <div className="sticky top-0 z-20 px-4 py-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Interactive Live Preview:
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {theme === 'saas-gradient' && 'SaaS Gradient'}
            {theme === 'minimalist-light' && 'Minimalist Light'}
            {theme === 'dark-mode' && 'Dark Mode'}
            {theme === 'neo-brutalism' && 'Neo-brutalism'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle: Cards vs Comparison Matrix */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'matrix'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Matrix</span>
            </button>
          </div>

          {/* Device Switcher */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setDeviceView('desktop')}
              title="Desktop 1440px"
              className={`p-1 rounded-md transition-colors ${
                deviceView === 'desktop'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceView('tablet')}
              title="Tablet 768px"
              className={`p-1 rounded-md transition-colors ${
                deviceView === 'tablet'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              title="Mobile 390px"
              className={`p-1 rounded-md transition-colors ${
                deviceView === 'mobile'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Canvas */}
      <div className="p-4 sm:p-8 flex-1 flex justify-center items-start">
        <div
          className={`w-full transition-all duration-300 rounded-2xl overflow-hidden ${getDeviceContainerClass()} ${getThemeWrapperStyle()} p-6 sm:p-12 shadow-sm border border-slate-200/60 dark:border-slate-800`}
        >
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-block mb-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${
                theme === 'neo-brutalism'
                  ? 'border-2 border-black bg-yellow-300 font-bold shadow-[2px_2px_0px_#000]'
                  : theme === 'dark-mode'
                  ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-800/80'
                  : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60'
              }`}>
                {config.productName} Pricing
              </span>
            </div>

            <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
              theme === 'neo-brutalism' ? 'font-black tracking-normal' : ''
            }`}>
              {config.headline}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {config.subheadline}
            </p>

            {/* Interactive Monthly / Annual Billing Toggle Switch */}
            <div className="mt-8 inline-flex items-center gap-3">
              <div
                className={`p-1.5 rounded-full flex items-center transition-all ${
                  theme === 'neo-brutalism'
                    ? 'border-2 border-black bg-white shadow-[3px_3px_0px_#000]'
                    : theme === 'dark-mode'
                    ? 'bg-slate-900 border border-slate-800'
                    : 'bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/80 dark:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                    !isAnnual
                      ? theme === 'neo-brutalism'
                        ? 'bg-black text-white'
                        : 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Monthly billing
                </button>

                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                    isAnnual
                      ? theme === 'neo-brutalism'
                        ? 'bg-black text-white'
                        : 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>Annual billing</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-transform ${
                      theme === 'neo-brutalism'
                        ? 'bg-emerald-300 text-black border border-black'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                    }`}
                  >
                    Save {maxDiscount}%
                  </span>
                </button>
              </div>
            </div>

            {/* Dynamic Usage Slider Interactive Demonstration */}
            {config.usageSlider.enabled && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-7 max-w-lg mx-auto p-4 sm:p-5 rounded-2xl transition-all ${
                  theme === 'neo-brutalism'
                    ? 'bg-white border-2 border-black shadow-[4px_4px_0px_#000]'
                    : theme === 'dark-mode'
                    ? 'bg-slate-900/90 border border-slate-800 text-slate-200'
                    : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-bold">
                      {config.usageSlider.metricName}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black tabular-nums font-mono text-indigo-600 dark:text-indigo-400">
                      {usageValue}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {config.usageSlider.unitLabel}
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min={config.usageSlider.min}
                  max={config.usageSlider.max}
                  step={config.usageSlider.step}
                  value={usageValue}
                  onChange={(e) => setUsageValue(Number(e.target.value))}
                  className={`w-full cursor-pointer h-2 rounded-lg ${
                    theme === 'neo-brutalism'
                      ? 'accent-black'
                      : 'accent-indigo-600'
                  }`}
                />

                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>{config.usageSlider.min} {config.usageSlider.unitLabel}</span>
                  <span className="text-slate-500">Slide to test live recalculation</span>
                  <span>{config.usageSlider.max} {config.usageSlider.unitLabel}</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* VIEW 1: Live Pricing Cards Grid */}
          {viewMode === 'cards' && (
            <div
              className={`grid grid-cols-1 ${
                deviceView === 'mobile'
                  ? 'grid-cols-1'
                  : deviceView === 'tablet'
                  ? 'md:grid-cols-2'
                  : config.tiers.length === 1
                  ? 'max-w-md mx-auto grid-cols-1'
                  : config.tiers.length === 2
                  ? 'max-w-3xl mx-auto md:grid-cols-2'
                  : config.tiers.length === 3
                  ? 'md:grid-cols-3'
                  : 'md:grid-cols-2 lg:grid-cols-4'
              } gap-6 lg:gap-8 items-stretch`}
            >
              {config.tiers.map((tier) => {
                const { monthlyRate, originalMonthly, hasUsageAddon } = calculateTierPrice(tier);
                const isPopular = tier.isPopular;

                return (
                  <motion.div
                    key={tier.id}
                    layout
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className={`relative flex flex-col justify-between transition-all duration-200 ${
                      theme === 'neo-brutalism'
                        ? isPopular
                          ? 'bg-[#FEF08A] border-3 border-black shadow-[6px_6px_0px_0px_#000] p-6'
                          : 'bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6'
                        : theme === 'dark-mode'
                        ? isPopular
                          ? 'bg-[#101A2E] border-2 border-cyan-400 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/30 rounded-2xl p-6 sm:p-7'
                          : 'bg-[#0E1524] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 sm:p-7'
                        : theme === 'minimalist-light'
                        ? isPopular
                          ? 'bg-neutral-900 text-white border border-neutral-900 shadow-md rounded-xl p-6 sm:p-7'
                          : 'bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl p-6 sm:p-7'
                        : isPopular
                        ? 'bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-500 shadow-xl shadow-indigo-500/15 ring-4 ring-indigo-500/10 rounded-2xl p-6 sm:p-7'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 rounded-2xl p-6 sm:p-7 shadow-xs'
                    }`}
                  >
                    {/* Badge / Highlight Pill */}
                    {tier.badgeText && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span
                          className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 ${
                            theme === 'neo-brutalism'
                              ? 'bg-black text-white border border-black shadow-[2px_2px_0px_#000]'
                              : theme === 'dark-mode'
                              ? isPopular
                                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                                : 'bg-slate-800 text-slate-200'
                              : theme === 'minimalist-light'
                              ? isPopular
                                ? 'bg-white text-neutral-900 border border-neutral-300'
                                : 'bg-neutral-100 text-neutral-800'
                              : isPopular
                              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {isPopular && <Sparkles className="w-3 h-3" />}
                          <span>{tier.badgeText}</span>
                        </span>
                      </div>
                    )}

                    <div>
                      {/* Plan Header */}
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-bold tracking-tight">{tier.name}</h3>
                        {tier.isPopular && theme === 'saas-gradient' && (
                          <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                            Recommended
                          </span>
                        )}
                      </div>

                      <p
                        className={`text-xs mt-1 min-h-[36px] line-clamp-2 ${
                          theme === 'minimalist-light' && isPopular
                            ? 'text-neutral-400'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {tier.description}
                      </p>

                      {/* Price Display */}
                      <div className="mt-5 flex items-baseline gap-1.5">
                        <span className="text-4xl sm:text-5xl font-black tracking-tight tabular-nums font-mono">
                          {config.currency.symbol}{monthlyRate}
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            theme === 'minimalist-light' && isPopular
                              ? 'text-neutral-400'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          /month
                        </span>
                      </div>

                      {/* Billing detail indicator */}
                      <div className="min-h-[22px] mt-1 text-[11px]">
                        {isAnnual && tier.monthlyPrice > 0 ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            Billed annually ({config.currency.symbol}{monthlyRate * 12}/yr)
                          </span>
                        ) : tier.monthlyPrice === 0 ? (
                          <span className="text-slate-400">No payment method required</span>
                        ) : (
                          <span className="text-slate-400">Billed month-to-month</span>
                        )}
                      </div>

                      {/* Dynamic usage addon breakdown tag */}
                      {hasUsageAddon && (
                        <div
                          className={`mt-2 p-2 rounded-lg text-[11px] font-mono flex items-center justify-between ${
                            theme === 'neo-brutalism'
                              ? 'bg-black/5 border border-black/20 text-black'
                              : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50'
                          }`}
                        >
                          <span>Includes {usageValue} {config.usageSlider.unitLabel}</span>
                          <span className="font-bold">+{config.currency.symbol}{monthlyRate - Math.round(tier.monthlyPrice * (isAnnual ? (1 - tier.annualDiscountPercent / 100) : 1))}</span>
                        </div>
                      )}

                      {/* CTA Button */}
                      <button
                        type="button"
                        onClick={() => onSelectTierCheckout(tier, monthlyRate, isAnnual, usageValue)}
                        className={`mt-6 w-full py-2.5 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                          theme === 'neo-brutalism'
                            ? 'bg-black text-white hover:bg-neutral-800 border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
                            : theme === 'dark-mode'
                            ? isPopular
                              ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-extrabold shadow-md shadow-cyan-400/20 rounded-xl'
                              : 'bg-slate-800 text-white hover:bg-slate-700 rounded-xl'
                            : theme === 'minimalist-light'
                            ? isPopular
                              ? 'bg-white text-neutral-900 hover:bg-neutral-100 rounded-lg'
                              : 'bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg'
                            : isPopular
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 rounded-xl'
                            : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-xl'
                        }`}
                      >
                        <span>{tier.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {/* Divider */}
                      <div
                        className={`my-6 border-t ${
                          theme === 'neo-brutalism'
                            ? 'border-black'
                            : theme === 'minimalist-light' && isPopular
                            ? 'border-neutral-800'
                            : 'border-slate-100 dark:border-slate-800'
                        }`}
                      />

                      {/* Features List */}
                      <div>
                        <div
                          className={`text-[11px] font-bold uppercase tracking-wider mb-3 ${
                            theme === 'minimalist-light' && isPopular
                              ? 'text-neutral-400'
                              : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          Features & Entitlements
                        </div>

                        <ul className="space-y-2.5 text-xs">
                          {tier.features.map((feature) => (
                            <li key={feature.id} className="flex items-start gap-2.5">
                              {feature.included ? (
                                <div
                                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                    theme === 'neo-brutalism'
                                      ? 'bg-black text-white'
                                      : theme === 'dark-mode'
                                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                                  }`}
                                >
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </div>
                              ) : (
                                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-slate-100 dark:bg-slate-800 text-slate-400">
                                  <X className="w-2.5 h-2.5 stroke-[2]" />
                                </div>
                              )}

                              <span
                                className={`${
                                  feature.included
                                    ? theme === 'minimalist-light' && isPopular
                                      ? 'text-neutral-200'
                                      : 'text-slate-800 dark:text-slate-200'
                                    : 'text-slate-400 line-through'
                                }`}
                              >
                                {feature.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* VIEW 2: Full Comparison Matrix */}
          {viewMode === 'matrix' && (
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                    <th className="p-4 font-bold text-slate-700 dark:text-slate-300 w-1/3">
                      Features / Tiers
                    </th>
                    {config.tiers.map((t) => (
                      <th
                        key={t.id}
                        className={`p-4 font-bold text-center ${
                          t.isPopular ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30' : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        <div>{t.name}</div>
                        <div className="text-xs font-mono font-normal mt-0.5 text-slate-500">
                          {config.currency.symbol}{calculateTierPrice(t).monthlyRate}/mo
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {/* Extract all unique feature names */}
                  {Array.from(
                    new Set(config.tiers.flatMap((t) => t.features.map((f) => f.name)))
                  ).map((featName) => (
                    <tr key={featName} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-medium text-slate-700 dark:text-slate-300">
                        {featName}
                      </td>
                      {config.tiers.map((t) => {
                        const feat = t.features.find((f) => f.name === featName);
                        const isIncluded = feat ? feat.included : false;
                        return (
                          <td
                            key={t.id}
                            className={`p-3.5 text-center ${
                              t.isPopular ? 'bg-indigo-50/20 dark:bg-indigo-950/10' : ''
                            }`}
                          >
                            {isIncluded ? (
                              <Check className="w-4 h-4 text-emerald-600 inline-block stroke-[3]" />
                            ) : (
                              <X className="w-4 h-4 text-slate-300 inline-block stroke-[2]" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Guarantee / Trust footer */}
          {config.guaranteeText && (
            <div className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{config.guaranteeText}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
