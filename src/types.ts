export type BillingCycle = 'monthly' | 'annual';

export type PresetTheme = 'minimalist-light' | 'dark-mode' | 'neo-brutalism' | 'saas-gradient';

export type Currency = {
  code: string;
  symbol: string;
  name: string;
};

export interface PricingFeature {
  id: string;
  name: string;
  included: boolean;
  tooltip?: string;
  highlighted?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualDiscountPercent: number; // e.g. 20 for 20% off
  badgeText?: string;
  isPopular?: boolean;
  ctaText: string;
  ctaVariant?: 'primary' | 'secondary' | 'outline';
  features: PricingFeature[];
  
  // Usage / Seat based calculations
  hasUsagePricing?: boolean;
  baseUnitsIncluded?: number; // e.g. 1 seat included
  unitPriceMonthly?: number; // e.g. $8 per additional seat
}

export interface UsageSliderConfig {
  enabled: boolean;
  metricName: string; // e.g. "Team Members"
  unitLabel: string; // e.g. "seats"
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface PricingStrategyConfig {
  productName: string;
  headline: string;
  subheadline: string;
  tiers: PricingTier[];
  usageSlider: UsageSliderConfig;
  theme: PresetTheme;
  currency: Currency;
  annualBillingLabel: string;
  guaranteeText?: string;
}
