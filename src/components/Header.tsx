import React from 'react';
import { 
  Code2, 
  Sparkles, 
  Layers, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  Palette,
  DollarSign
} from 'lucide-react';
import { PresetTheme, Currency } from '../types';
import { CURRENCIES, PRESET_STRATEGIES } from '../data/presets';

interface HeaderProps {
  theme: PresetTheme;
  onThemeChange: (theme: PresetTheme) => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onSelectPreset: (presetKey: string) => void;
  onOpenCodeModal: () => void;
  onReset: () => void;
  onExportConfig: () => void;
  onImportConfig: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onThemeChange,
  currency,
  onCurrencyChange,
  onSelectPreset,
  onOpenCodeModal,
  onReset,
  onExportConfig,
  onImportConfig,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Creator Attribution */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  PriceCraft
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                  Micro-SaaS
                </span>
              </div>
            </div>
          </div>

          <div className="hidden sm:block h-5 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Prominent Creator Attribution */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
            <span className="text-slate-400 dark:text-slate-500">Created by</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">Saranyo Deyasi</span>
          </div>
        </div>

        {/* Action Controls & Preset Themes */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Preset Strategy Quick-Loader */}
          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Templates:</span>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  onSelectPreset(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled>Load strategy...</option>
              <option value="b2b-saas">B2B SaaS Classic</option>
              <option value="ai-developer">AI & DevTools (Usage)</option>
              <option value="indie-creator">Indie Creator Studio</option>
            </select>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center">
            <select
              value={currency.code}
              onChange={(e) => {
                const found = CURRENCIES.find((c) => c.code === e.target.value);
                if (found) onCurrencyChange(found);
              }}
              className="text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              title="Change Currency"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.symbol} {c.code}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
            <Palette className="w-3.5 h-3.5 text-slate-500 ml-1 hidden lg:block" />
            <select
              value={theme}
              onChange={(e) => onThemeChange(e.target.value as PresetTheme)}
              className="text-xs font-medium bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer pr-1"
              aria-label="Preset Themes"
            >
              <option value="saas-gradient" className="dark:bg-slate-900">SaaS Gradient</option>
              <option value="minimalist-light" className="dark:bg-slate-900">Minimalist Light</option>
              <option value="dark-mode" className="dark:bg-slate-900">Dark Mode</option>
              <option value="neo-brutalism" className="dark:bg-slate-900">Neo-brutalism</option>
            </select>
          </div>

          {/* Copy React + Tailwind Code CTA Button */}
          <button
            onClick={onOpenCodeModal}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm shadow-indigo-500/20"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Copy Code</span>
          </button>

          {/* More options menu / reset */}
          <button
            onClick={onReset}
            title="Reset to default"
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile attribution strip */}
      <div className="sm:hidden px-4 py-1 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-[11px] text-center text-slate-600 dark:text-slate-400">
        Created by <span className="font-semibold text-indigo-600 dark:text-indigo-400">Saranyo Deyasi</span>
      </div>
    </header>
  );
};
