import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { PricingPreview } from './components/PricingPreview';
import { CodeModal } from './components/CodeModal';
import { CheckoutSimulatorModal } from './components/CheckoutSimulatorModal';
import { Footer } from './components/Footer';
import { PricingStrategyConfig, PresetTheme, Currency, PricingTier } from './types';
import { PRESET_STRATEGIES, CURRENCIES } from './data/presets';

export default function App() {
  const [config, setConfig] = useState<PricingStrategyConfig>(() => {
    // Try restoring from localStorage if saved
    try {
      const saved = localStorage.getItem('pricecraft_config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return PRESET_STRATEGIES['b2b-saas'];
  });

  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [checkoutState, setCheckoutState] = useState<{
    isOpen: boolean;
    tier: PricingTier | null;
    calculatedPrice: number;
    isAnnual: boolean;
    usageValue: number;
  }>({
    isOpen: false,
    tier: null,
    calculatedPrice: 0,
    isAnnual: true,
    usageValue: 5,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pricecraft_config', JSON.stringify(config));
    } catch {
      // Ignore
    }
  }, [config]);

  // Synchronize dark mode class on document element based on theme
  useEffect(() => {
    if (config.theme === 'dark-mode') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [config.theme]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Theme switch handler
  const handleThemeChange = (newTheme: PresetTheme) => {
    setConfig((prev) => ({ ...prev, theme: newTheme }));
    showToast(`Switched theme to ${newTheme.replace('-', ' ')}`);
  };

  // Currency switch handler
  const handleCurrencyChange = (newCurrency: Currency) => {
    setConfig((prev) => ({ ...prev, currency: newCurrency }));
    showToast(`Currency updated to ${newCurrency.code} (${newCurrency.symbol})`);
  };

  // Select Preset Strategy
  const handleSelectPreset = (presetKey: string) => {
    const preset = PRESET_STRATEGIES[presetKey];
    if (preset) {
      setConfig({ ...preset });
      showToast(`Loaded ${preset.productName} preset template`);
    }
  };

  // Reset to default
  const handleReset = () => {
    if (confirm('Reset pricing strategy to default B2B SaaS template?')) {
      setConfig(PRESET_STRATEGIES['b2b-saas']);
      showToast('Reset configuration to default template');
    }
  };

  // Export JSON file
  const handleExportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${config.productName.toLowerCase()}-pricing-strategy.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Exported strategy JSON file');
  };

  // Trigger Import JSON
  const handleImportConfigTrigger = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.tiers && Array.isArray(parsed.tiers)) {
          setConfig(parsed);
          showToast('Strategy configuration imported successfully!');
        } else {
          alert('Invalid pricing configuration file.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Select tier for simulated checkout
  const handleSelectTierCheckout = (
    tier: PricingTier,
    calculatedPrice: number,
    isAnnual: boolean,
    usageValue: number
  ) => {
    setCheckoutState({
      isOpen: true,
      tier,
      calculatedPrice,
      isAnnual,
      usageValue,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/20">
      {/* Hidden File Input for JSON import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json"
        className="hidden"
      />

      {/* Top Header & Toolbar with prominent Saranyo Deyasi attribution */}
      <Header
        theme={config.theme}
        onThemeChange={handleThemeChange}
        currency={config.currency}
        onCurrencyChange={handleCurrencyChange}
        onSelectPreset={handleSelectPreset}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onReset={handleReset}
        onExportConfig={handleExportConfig}
        onImportConfig={handleImportConfigTrigger}
      />

      {/* Main Two-Panel Layout */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Sidebar / Configuration Panel */}
        <ConfigurationPanel
          config={config}
          onChange={setConfig}
        />

        {/* Right Preview & Code Generator Panel */}
        <PricingPreview
          config={config}
          onSelectTierCheckout={handleSelectTierCheckout}
        />
      </main>

      {/* Footer with Creator Attribution */}
      <Footer />

      {/* Code Generator Modal */}
      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        config={config}
      />

      {/* Checkout Simulator Modal */}
      <CheckoutSimulatorModal
        isOpen={checkoutState.isOpen}
        onClose={() => setCheckoutState((prev) => ({ ...prev, isOpen: false }))}
        tier={checkoutState.tier}
        calculatedPrice={checkoutState.calculatedPrice}
        isAnnual={checkoutState.isAnnual}
        usageValue={checkoutState.usageValue}
        currency={config.currency}
        metricName={config.usageSlider.metricName}
        unitLabel={config.usageSlider.unitLabel}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-14 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
