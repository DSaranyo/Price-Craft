import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Star, 
  Check, 
  X, 
  Sliders, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Info,
  Layers,
  FileText,
  DollarSign,
  Percent,
  Tag
} from 'lucide-react';
import { PricingStrategyConfig, PricingTier, PricingFeature, UsageSliderConfig } from '../types';

interface ConfigurationPanelProps {
  config: PricingStrategyConfig;
  onChange: (updater: (prev: PricingStrategyConfig) => PricingStrategyConfig) => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ config, onChange }) => {
  const [activeTab, setActiveTab] = useState<'tiers' | 'features' | 'usage' | 'general'>('tiers');
  const [expandedTierId, setExpandedTierId] = useState<string>(config.tiers[0]?.id || '');
  const [newFeatureText, setNewFeatureText] = useState<{ [tierId: string]: string }>({});

  // Add new Tier
  const handleAddTier = () => {
    const newId = `tier-${Date.now()}`;
    const newTier: PricingTier = {
      id: newId,
      name: 'Growth',
      description: 'Built for scaling organizations that require accelerated velocity.',
      monthlyPrice: 49,
      annualDiscountPercent: 20,
      badgeText: 'New',
      isPopular: false,
      ctaText: 'Start Free Trial',
      ctaVariant: 'secondary',
      hasUsagePricing: false,
      features: [
        { id: `f-${Date.now()}-1`, name: 'All standard platform capabilities', included: true },
        { id: `f-${Date.now()}-2`, name: 'Priority asynchronous support', included: true },
        { id: `f-${Date.now()}-3`, name: 'Dedicated webhook dispatchers', included: true },
        { id: `f-${Date.now()}-4`, name: 'Custom enterprise integration', included: false },
      ],
    };

    onChange((prev) => ({
      ...prev,
      tiers: [...prev.tiers, newTier],
    }));
    setExpandedTierId(newId);
  };

  // Remove Tier
  const handleRemoveTier = (tierId: string) => {
    if (config.tiers.length <= 1) {
      alert('You need at least one pricing tier.');
      return;
    }
    onChange((prev) => ({
      ...prev,
      tiers: prev.tiers.filter((t) => t.id !== tierId),
    }));
    if (expandedTierId === tierId) {
      setExpandedTierId(config.tiers.find((t) => t.id !== tierId)?.id || '');
    }
  };

  // Update Tier Property
  const handleUpdateTier = (tierId: string, updates: Partial<PricingTier>) => {
    onChange((prev) => ({
      ...prev,
      tiers: prev.tiers.map((t) => (t.id === tierId ? { ...t, ...updates } : t)),
    }));
  };

  // Set Featured / Highlighted Tier
  const handleSetPopularTier = (tierId: string) => {
    onChange((prev) => ({
      ...prev,
      tiers: prev.tiers.map((t) => ({
        ...t,
        isPopular: t.id === tierId ? !t.isPopular : false,
      })),
    }));
  };

  // Add Feature to Tier
  const handleAddFeature = (tierId: string) => {
    const text = newFeatureText[tierId]?.trim();
    if (!text) return;

    const newFeature: PricingFeature = {
      id: `feat-${Date.now()}`,
      name: text,
      included: true,
    };

    onChange((prev) => ({
      ...prev,
      tiers: prev.tiers.map((t) =>
        t.id === tierId ? { ...t, features: [...t.features, newFeature] } : t
      ),
    }));

    setNewFeatureText((prev) => ({ ...prev, [tierId]: '' }));
  };

  // Toggle Feature Included
  const handleToggleFeatureIncluded = (tierId: string, featureId: string) => {
    onChange((prev) => ({
      ...prev,
      tiers: prev.tiers.map((t) =>
        t.id === tierId
          ? {
              ...t,
              features: t.features.map((f) =>
                f.id === featureId ? { ...f, included: !f.included } : f
              ),
            }
          : t
      ),
    }));
  };

  // Remove Feature
  const handleRemoveFeature = (tierId: string, featureId: string) => {
    onChange((prev) => ({
      ...prev,
      tiers: prev.tiers.map((t) =>
        t.id === tierId
          ? {
              ...t,
              features: t.features.filter((f) => f.id !== featureId),
            }
          : t
      ),
    }));
  };

  // Propagate feature to all tiers
  const handlePropagateFeature = (featureName: string) => {
    onChange((prev) => ({
      ...prev,
      tiers: prev.tiers.map((t) => {
        const alreadyExists = t.features.some(
          (f) => f.name.toLowerCase() === featureName.toLowerCase()
        );
        if (alreadyExists) return t;
        return {
          ...t,
          features: [
            ...t.features,
            { id: `f-${Date.now()}-${Math.random()}`, name: featureName, included: true },
          ],
        };
      }),
    }));
  };

  // Update Usage Slider Config
  const handleUpdateUsage = (updates: Partial<UsageSliderConfig>) => {
    onChange((prev) => ({
      ...prev,
      usageSlider: { ...prev.usageSlider, ...updates },
    }));
  };

  return (
    <aside className="w-full lg:w-[420px] shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-[calc(100vh-4rem)]">
      {/* Configuration Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-2 gap-1 shrink-0">
        <button
          onClick={() => setActiveTab('tiers')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'tiers'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Tiers ({config.tiers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('usage')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'usage'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Usage Multiplier</span>
        </button>

        <button
          onClick={() => setActiveTab('general')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'general'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Copy & Copywrite</span>
        </button>
      </div>

      {/* Tab Contents - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ================= TAB 1: TIERS & PRICING ================= */}
        {activeTab === 'tiers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pricing Tiers</h3>
                <p className="text-xs text-slate-500">Customize plan names, prices & discounts</p>
              </div>
              <button
                onClick={handleAddTier}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-semibold transition-colors border border-indigo-200/60 dark:border-indigo-800/60"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Tier</span>
              </button>
            </div>

            {/* List of Tiers */}
            <div className="space-y-3">
              {config.tiers.map((tier, idx) => {
                const isExpanded = expandedTierId === tier.id;
                return (
                  <div
                    key={tier.id}
                    className={`rounded-xl border transition-all ${
                      tier.isPopular
                        ? 'border-indigo-500/80 bg-indigo-50/20 dark:bg-indigo-950/10'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                  >
                    {/* Header Row */}
                    <div
                      className="p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
                      onClick={() => setExpandedTierId(isExpanded ? '' : tier.id)}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="truncate">
                          <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                            {tier.name}
                          </span>
                          <span className="ml-2 text-xs text-slate-500 font-mono">
                            {config.currency.symbol}{tier.monthlyPrice}/mo
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                        {/* Highlight / Popular Toggle */}
                        <button
                          type="button"
                          onClick={() => handleSetPopularTier(tier.id)}
                          title={tier.isPopular ? 'Featured Tier (active)' : 'Set as Featured Tier'}
                          className={`p-1.5 rounded-md transition-colors ${
                            tier.isPopular
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                              : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>

                        {/* Delete Tier */}
                        <button
                          type="button"
                          onClick={() => handleRemoveTier(tier.id)}
                          title="Delete tier"
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        {/* Expand/Collapse Chevron */}
                        <button
                          type="button"
                          onClick={() => setExpandedTierId(isExpanded ? '' : tier.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Form Body */}
                    {isExpanded && (
                      <div className="px-3.5 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800/80 space-y-3.5">
                        {/* Plan Name & Badge */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                              Tier Name
                            </label>
                            <input
                              type="text"
                              value={tier.name}
                              onChange={(e) => handleUpdateTier(tier.id, { name: e.target.value })}
                              className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                              Badge Text
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Most Popular"
                              value={tier.badgeText || ''}
                              onChange={(e) => handleUpdateTier(tier.id, { badgeText: e.target.value })}
                              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                        </div>

                        {/* Monthly Price & Annual Discount */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                              Monthly Price ({config.currency.symbol})
                            </label>
                            <div className="relative">
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                                {config.currency.symbol}
                              </span>
                              <input
                                type="number"
                                min={0}
                                value={tier.monthlyPrice}
                                onChange={(e) =>
                                  handleUpdateTier(tier.id, { monthlyPrice: Math.max(0, Number(e.target.value)) })
                                }
                                className="w-full text-xs font-mono pl-7 pr-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                              Annual Discount (%)
                            </label>
                            <div className="relative">
                              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                                %
                              </span>
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={tier.annualDiscountPercent}
                                onChange={(e) =>
                                  handleUpdateTier(tier.id, {
                                    annualDiscountPercent: Math.min(100, Math.max(0, Number(e.target.value))),
                                  })
                                }
                                className="w-full text-xs font-mono pl-2.5 pr-6 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Annual Breakdown Summary */}
                        {tier.monthlyPrice > 0 && tier.annualDiscountPercent > 0 && (
                          <div className="text-[11px] px-2.5 py-1.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-between">
                            <span>Annual effective:</span>
                            <span className="font-mono font-bold">
                              {config.currency.symbol}
                              {Math.round(tier.monthlyPrice * (1 - tier.annualDiscountPercent / 100))}/mo
                              {' '}(saves {config.currency.symbol}
                              {Math.round(tier.monthlyPrice * 12 * (tier.annualDiscountPercent / 100))}/yr)
                            </span>
                          </div>
                        )}

                        {/* Plan Description */}
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                            Plan Description
                          </label>
                          <textarea
                            rows={2}
                            value={tier.description}
                            onChange={(e) => handleUpdateTier(tier.id, { description: e.target.value })}
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                          />
                        </div>

                        {/* CTA Button Text */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                              CTA Button Text
                            </label>
                            <input
                              type="text"
                              value={tier.ctaText}
                              onChange={(e) => handleUpdateTier(tier.id, { ctaText: e.target.value })}
                              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                              CTA Style
                            </label>
                            <select
                              value={tier.ctaVariant || (tier.isPopular ? 'primary' : 'secondary')}
                              onChange={(e) =>
                                handleUpdateTier(tier.id, {
                                  ctaVariant: e.target.value as 'primary' | 'secondary' | 'outline',
                                })
                              }
                              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value="primary">Primary (Filled)</option>
                              <option value="secondary">Secondary (Dark)</option>
                              <option value="outline">Outline (Ghost)</option>
                            </select>
                          </div>
                        </div>

                        {/* Usage / Per-Seat Configuration for this Tier */}
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
                          <label className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                            <span>Enable Usage / Seat Multiplier</span>
                            <input
                              type="checkbox"
                              checked={!!tier.hasUsagePricing}
                              onChange={(e) => handleUpdateTier(tier.id, { hasUsagePricing: e.target.checked })}
                              className="rounded accent-indigo-600"
                            />
                          </label>

                          {tier.hasUsagePricing && (
                            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 dark:border-slate-700">
                              <div>
                                <label className="text-[10px] text-slate-500 block">Base units included</label>
                                <input
                                  type="number"
                                  min={0}
                                  value={tier.baseUnitsIncluded ?? 1}
                                  onChange={(e) =>
                                    handleUpdateTier(tier.id, {
                                      baseUnitsIncluded: Math.max(0, Number(e.target.value)),
                                    })
                                  }
                                  className="w-full text-xs font-mono px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-500 block">
                                  Price / extra unit ({config.currency.symbol})
                                </label>
                                <input
                                  type="number"
                                  min={0}
                                  step={0.5}
                                  value={tier.unitPriceMonthly ?? 5}
                                  onChange={(e) =>
                                    handleUpdateTier(tier.id, {
                                      unitPriceMonthly: Math.max(0, Number(e.target.value)),
                                    })
                                  }
                                  className="w-full text-xs font-mono px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Features for this tier */}
                        <div className="pt-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Features ({tier.features.length})
                            </span>
                            <span className="text-[10px] text-slate-400">Click icon to toggle included</span>
                          </div>

                          {/* Add Feature Input */}
                          <div className="flex gap-1.5 mb-2.5">
                            <input
                              type="text"
                              placeholder="Add a new feature..."
                              value={newFeatureText[tier.id] || ''}
                              onChange={(e) =>
                                setNewFeatureText((prev) => ({ ...prev, [tier.id]: e.target.value }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddFeature(tier.id);
                                }
                              }}
                              className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddFeature(tier.id)}
                              className="px-2.5 py-1.5 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900 rounded-lg text-xs font-semibold shrink-0"
                            >
                              Add
                            </button>
                          </div>

                          {/* Features List */}
                          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                            {tier.features.map((feature) => (
                              <div
                                key={feature.id}
                                className="group flex items-center justify-between gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 text-xs transition-colors"
                              >
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  <button
                                    type="button"
                                    onClick={() => handleToggleFeatureIncluded(tier.id, feature.id)}
                                    title={feature.included ? 'Included (click to exclude)' : 'Excluded (click to include)'}
                                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                                      feature.included
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                                    }`}
                                  >
                                    {feature.included ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[2]" />}
                                  </button>
                                  <input
                                    type="text"
                                    value={feature.name}
                                    onChange={(e) => {
                                      const newName = e.target.value;
                                      handleUpdateTier(tier.id, {
                                        features: tier.features.map((f) =>
                                          f.id === feature.id ? { ...f, name: newName } : f
                                        ),
                                      });
                                    }}
                                    className={`bg-transparent border-0 focus:outline-none focus:ring-0 w-full truncate ${
                                      feature.included
                                        ? 'text-slate-800 dark:text-slate-200'
                                        : 'text-slate-400 line-through'
                                    }`}
                                  />
                                </div>

                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    type="button"
                                    onClick={() => handlePropagateFeature(feature.name)}
                                    title="Add this feature across all tiers"
                                    className="p-1 text-slate-400 hover:text-indigo-600 rounded"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFeature(tier.id, feature.id)}
                                    title="Delete feature"
                                    className="p-1 text-slate-400 hover:text-red-500 rounded"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 2: USAGE SLIDER SETTINGS ================= */}
        {activeTab === 'usage' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Seat / Usage Slider Setup</h3>
              <p className="text-xs text-slate-500">Configure global interactive units and bounds</p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
              <label className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
                <span>Enable Interactive Usage Slider</span>
                <input
                  type="checkbox"
                  checked={config.usageSlider.enabled}
                  onChange={(e) => handleUpdateUsage({ enabled: e.target.checked })}
                  className="w-4 h-4 rounded accent-indigo-600"
                />
              </label>

              {config.usageSlider.enabled ? (
                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                        Metric Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Team Members"
                        value={config.usageSlider.metricName}
                        onChange={(e) => handleUpdateUsage({ metricName: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                        Unit Suffix
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. seats"
                        value={config.usageSlider.unitLabel}
                        onChange={(e) => handleUpdateUsage({ unitLabel: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 block mb-1">Min Value</label>
                      <input
                        type="number"
                        min={0}
                        value={config.usageSlider.min}
                        onChange={(e) => handleUpdateUsage({ min: Number(e.target.value) })}
                        className="w-full text-xs font-mono px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 block mb-1">Max Value</label>
                      <input
                        type="number"
                        min={1}
                        value={config.usageSlider.max}
                        onChange={(e) => handleUpdateUsage({ max: Number(e.target.value) })}
                        className="w-full text-xs font-mono px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 block mb-1">Step Size</label>
                      <input
                        type="number"
                        min={1}
                        value={config.usageSlider.step}
                        onChange={(e) => handleUpdateUsage({ step: Number(e.target.value) })}
                        className="w-full text-xs font-mono px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-[11px] text-indigo-800 dark:text-indigo-300">
                    <p className="font-semibold mb-0.5">How usage multiplier works:</p>
                    <p className="text-slate-600 dark:text-slate-400">
                      On any tier with usage pricing enabled, the total price is calculated as:
                      <br />
                      <code className="font-mono text-indigo-700 dark:text-indigo-300 font-bold">
                        Base + (Units - BaseUnits) × PricePerUnit
                      </code>
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  Usage slider is currently disabled. All pricing will be displayed as static flat rates.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: COPY & HEADERS ================= */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Page Copy & Branding</h3>
              <p className="text-xs text-slate-500">Edit titles, subtitle, and trust elements</p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Product / Brand Name
                </label>
                <input
                  type="text"
                  value={config.productName}
                  onChange={(e) => onChange((prev) => ({ ...prev, productName: e.target.value }))}
                  className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={config.headline}
                  onChange={(e) => onChange((prev) => ({ ...prev, headline: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Subheadline
                </label>
                <textarea
                  rows={2}
                  value={config.subheadline}
                  onChange={(e) => onChange((prev) => ({ ...prev, subheadline: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Annual Billing Incentive Badge
                </label>
                <input
                  type="text"
                  value={config.annualBillingLabel}
                  onChange={(e) => onChange((prev) => ({ ...prev, annualBillingLabel: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Guarantee & Trust Text
                </label>
                <input
                  type="text"
                  value={config.guaranteeText || ''}
                  onChange={(e) => onChange((prev) => ({ ...prev, guaranteeText: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
