import React from 'react';
import { Layers, Heart, Sparkles, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-4 px-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand info */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white">
            <Layers className="w-3 h-3" />
          </div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">PriceCraft</span>
          <span className="text-slate-400">·</span>
          <span>Micro-SaaS Pricing Strategy Builder</span>
        </div>

        {/* Creator Attribution */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-slate-600 dark:text-slate-400">Created by</span>
            <span className="font-bold text-slate-900 dark:text-white">Saranyo Deyasi</span>
          </div>
        </div>

        {/* Status/Notice */}
        <div className="text-slate-400 text-[11px]">
          Export ready for Next.js, React & Tailwind CSS
        </div>
      </div>
    </footer>
  );
};
