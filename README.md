# ✦ PriceCraft — Micro-SaaS Pricing Strategy Builder

<p align="center">
  <img src="https://img.shields.io/badge/PriceCraft-Pricing%20Reimagined-7C3AED?style=for-the-badge&logo=target&logoColor=white" alt="PriceCraft" />
  <img src="https://img.shields.io/badge/Micro--SaaS-Builder-111827?style=for-the-badge" alt="Micro-SaaS Builder" />
  <img src="https://img.shields.io/badge/Interactive-Live%20Preview-06B6D4?style=for-the-badge" alt="Live Preview" />
  <img src="https://img.shields.io/badge/Status-Built%20%26%20Verified-16A34A?style=for-the-badge" alt="Built and Verified" />
</p>

<p align="center">
  <strong>Design smarter pricing. Simulate every scenario. Build better pricing experiences.</strong>
</p>

<p align="center">
  A modern, interactive pricing strategy builder that transforms complex pricing decisions into a visual playground. Configure subscription tiers, experiment with discounts, simulate usage-based pricing, compare plans, customize themes, and export reusable React + Tailwind components — all from one unified interface.
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-interactive-playground">Playground</a> •
  <a href="#-technology-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 🚀 Overview

Pricing is more than choosing a number. It involves customer segmentation, feature packaging, usage limits, billing cycles, discounts, and product positioning.

**PriceCraft makes pricing strategy visual, interactive, and configurable.**

Instead of manually editing pricing tables or repeatedly modifying frontend code, build your pricing model through a configuration workspace and see your changes reflected in a live preview.

Whether you're designing a B2B SaaS product, an AI developer tool, or an independent creator platform, PriceCraft provides a flexible environment for exploring pricing possibilities.

### Why PriceCraft?

- 🎛️ **Configure visually** — Create and manage pricing tiers through an interactive sidebar.
- ⚡ **Preview instantly** — See pricing changes reflected in real time.
- 💸 **Experiment with billing** — Explore monthly and annual plans with configurable discounts.
- 📊 **Model usage-based pricing** — Configure usage metrics, allowances, and multipliers.
- 🎨 **Customize everything** — Switch between distinct visual themes and currencies.
- 📱 **Preview responsively** — Simulate desktop, tablet, and mobile viewports.
- 🧩 **Export reusable code** — Copy or download React + Tailwind component code.
- 💾 **Save your strategy** — Import and export pricing configurations in JSON format.

## ✨ Features

### 01. Pricing Tier Management

Create and customize the pricing structure of your product.

- Add, remove, and rename pricing tiers.
- Configure monthly subscription prices.
- Set annual discount percentages.
- Customize individual plan descriptions.
- Add badge text such as `Most Popular` or `Best Value`.
- Highlight a featured plan with a one-click star control.
- Emphasize featured plans using accent borders, glowing effects, and elevated positioning.

### 02. Feature List Manager

Control which features are included in each pricing tier.

- Add features to individual plans.
- Include or exclude features instantly.
- Edit feature names inline.
- Delete features you no longer need.
- Propagate feature changes across all tiers with a single action.

This makes it easier to experiment with feature packaging and differentiate subscription levels.

### 03. Usage-Based Pricing

Build pricing strategies around configurable usage metrics.

- Enable or disable usage-based pricing.
- Define custom metric names, such as `API Requests`, `Team Members`, or `Storage GB`.
- Configure unit suffixes.
- Set minimum values, maximum values, and slider steps.
- Define the base usage included in each tier.
- Configure per-tier usage multipliers.
- Preview how changing usage affects the displayed price.

Usage-based pricing makes PriceCraft suitable for exploring conventional subscription models and metered product experiences.

### 04. Strategy Templates

Start with a predefined pricing structure instead of building everything from scratch.

| Template | Designed For |
|---|---|
| B2B SaaS Classic | Traditional subscription-based business software |
| AI & DevTools | AI platforms, developer tools, and usage-based services |
| Indie Creator Studio | Independent creators and smaller digital products |

Each template provides a starting point that can be customized to fit your product's pricing strategy.

### 05. JSON Import & Export

Keep pricing configurations portable and reusable.

- Export the current strategy as a JSON configuration.
- Import previously saved configurations.
- Reuse pricing models across experiments.
- Save and compare different pricing structures outside the application.

### 06. Dynamic Pricing Preview

The live preview renders pricing cards using the active configuration.

- Responsive pricing-card layouts.
- Dynamic plan names, descriptions, and prices.
- Featured-plan highlighting.
- Configurable plan badges.
- Monthly and annual billing options.
- Live usage adjustments and price breakdowns.

The preview is designed to make the impact of configuration changes immediately visible.

## 🧪 Interactive Playground

### Billing Cycle Simulator

Switch between monthly and annual billing.

- Update displayed prices based on the selected billing cadence.
- Calculate annual discount savings from each tier's configured discount.
- Display a dynamic `Save X%` badge.
- Compare different discount strategies without rebuilding pricing cards.

### Live Usage Slider

Experiment with metered pricing through an interactive range slider.

- Adjust usage in real time.
- Recalculate tiered prices dynamically.
- Account for configured base inclusions and unit multipliers.
- Display transparent usage and price breakdowns.

### Device & Viewport Simulator

Evaluate your pricing interface across multiple viewport sizes.

| Device | Simulated Width |
|---|---:|
| Desktop | 1440px |
| Tablet | 768px |
| Mobile | 390px |

Choose between two layouts:

- **Card Grid** — A familiar pricing-page experience with distinct plan cards.
- **Comparison Matrix** — A structured table for comparing plan features and inclusions.

### Interactive Checkout Simulation

Click a plan's call-to-action to open a simulated checkout breakdown.

The sandbox presents relevant pricing details, including:

- Selected pricing tier.
- Billing cadence.
- Usage allocation.
- Applicable discount savings.
- Price components derived from the active configuration.

> Note: This is a checkout simulation, not a live payment integration. It does not imply that a payment has been processed or a real subscription has been created.

## 🎨 Themes & Customization

PriceCraft includes four preset themes for exploring different visual identities.

| Theme | Design Direction |
|---|---|
| SaaS Gradient | Modern SaaS styling with gradient accents |
| Minimalist Light | Clean surfaces and understated design |
| Dark Mode | Dark surfaces and high-contrast elements |
| Neo-brutalism | Bold borders, tactile controls, and hard offset shadows |

Switch themes instantly to see how the same pricing strategy looks across different design systems.

### 💱 Multi-Currency Formatting

Switch the displayed currency between four supported options.

| Currency | Symbol |
|---|---|
| US Dollar | `$` |
| Australian Dollar | `A$` |
| Indian Rupee | `₹` |
| Japanese Yen | `¥` |

Currency switching provides flexible price formatting for different audiences. It does not imply live exchange-rate conversion.

## 🧩 React + Tailwind Code Export

Turn a pricing configuration into reusable frontend code.

The export workflow allows users to:

1. Open the component export modal.
2. Inspect the generated React + Tailwind component.
3. Copy the code to the clipboard.
4. Download the generated component for reuse.

This bridges the gap between designing a pricing experience and implementing it in another frontend project.

Generated code should be reviewed and tested in its destination application before production use.

## 🖥️ Application Architecture

```text
Price-Craft
│
├── Configuration Workspace
│   ├── Pricing Tier Management
│   ├── Pricing & Discounts
│   ├── Feature List Manager
│   ├── Usage-Based Pricing
│   └── Strategy Templates
│
├── Live Preview Engine
│   ├── Pricing Card Grid
│   ├── Comparison Matrix
│   ├── Billing Cycle Simulator
│   ├── Usage Calculator
│   └── Checkout Simulation
│
├── Customization Toolbar
│   ├── Theme Selector
│   ├── Currency Switcher
│   └── Device Viewport Simulator
│
└── Export System
    ├── JSON Import / Export
    └── React + Tailwind Code Export
```

## 🛠️ Technology Stack

PriceCraft provides React + Tailwind component export functionality. The actual runtime stack should be documented according to the dependencies in the repository.

The following badges are suitable if these technologies are used by the application.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111111" alt="JavaScript" />
  <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" alt="JSON" />
</p>

> Update these badges to match your actual implementation. React and Tailwind are the component export target; their presence in the builder itself should be verified against your project dependencies.

## 🚀 Getting Started

### Prerequisites

For a typical JavaScript-based project, you may need:

- [Node.js](https://nodejs.org/)
- npm or the package manager configured by the repository
- A modern web browser

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/DSaranyo/Price-Craft.git
cd Price-Craft
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

**4. Open the application**

Visit the local development URL displayed in your terminal.

> These commands assume the repository uses npm and defines a `dev` script. Check `package.json` for the exact commands if your setup differs.

## 📸 Screenshots

Showcase the actual application with screenshots of its main workflows.

| Screenshot | Suggested Content |
|---|---|
| Main Dashboard | Configuration sidebar and live pricing preview |
| Tier Configuration | Price, discount, badge, and feature controls |
| Usage-Based Pricing | Usage slider and live price breakdown |
| Theme Gallery | All four preset themes |
| Comparison Matrix | Side-by-side tier comparison |
| Checkout Simulation | Selected plan and billing breakdown |
| Code Export | React + Tailwind export modal |

Suggested repository structure:

```text
docs/
└── images/
    ├── dashboard.png
    ├── tier-configuration.png
    ├── usage-pricing.png
    ├── theme-gallery.png
    ├── comparison-matrix.png
    └── code-export.png
```

Example Markdown:

```markdown
![PriceCraft Dashboard](docs/images/dashboard.png)
```

Replace these examples with real screenshots from your application.

## 🧪 Testing Considerations

Pricing calculations should remain consistent when users change multiple settings.

Recommended test scenarios include:

- Adding, removing, and renaming pricing tiers.
- Calculating annual savings correctly.
- Switching billing cadence without inconsistent price displays.
- Testing usage sliders at minimum, maximum, and intermediate values.
- Validating tier-specific inclusions and multipliers.
- Propagating features without unintended duplicates.
- Importing valid JSON and handling malformed configurations.
- Checking responsive layouts at all viewport presets.
- Verifying currency formatting for all supported currencies.
- Validating the syntax of generated React + Tailwind code.

These are suggested test cases, not claims of automated test coverage.

## 🗺️ Roadmap

### Implemented Features

- [x] Dynamic pricing tier management
- [x] Monthly and annual billing controls
- [x] Configurable annual discounts
- [x] Feature list editing and propagation
- [x] Usage-based pricing controls
- [x] Pricing strategy templates
- [x] JSON configuration import and export
- [x] Live pricing preview
- [x] Featured-plan highlighting
- [x] Four preset themes
- [x] Multi-currency formatting
- [x] Device viewport simulation
- [x] Card Grid and Comparison Matrix layouts
- [x] Checkout simulation
- [x] React + Tailwind code export

### Potential Enhancements

- [ ] Persistent cloud storage for pricing strategies
- [ ] Shareable configuration links
- [ ] Custom theme editor
- [ ] Additional currencies and localization
- [ ] Automated pricing validation and edge-case testing
- [ ] More export formats and component customization
- [ ] Optional integrations with real billing providers

The potential enhancements are future ideas, not existing capabilities.

## 🔒 Reliability & Data Handling

Pricing configurations can contain important business decisions. A robust implementation should:

- Validate imported JSON before applying it.
- Handle invalid or missing pricing values.
- Prevent invalid usage ranges and slider steps.
- Keep simulated checkout clearly separate from real transactions.
- Avoid exposing secrets in exported code or configuration files.
- Document whether configurations are stored locally or transmitted to external services.

## 👨‍💻 Creator

<p align="center">
  <strong>Saranyo Deyasi</strong>
  <br />
  Creator of PriceCraft
  <br /><br />
  <a href="https://github.com/DSaranyo">
    <img src="https://img.shields.io/badge/GitHub-DSaranyo-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub DSaranyo" />
  </a>
</p>

<p align="center">
  <em>Building tools that turn complex product decisions into intuitive experiences.</em>
</p>

## 🤝 Contributing

Suggestions, bug reports, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes.

   ```bash
   git commit -m "feat: describe your change"
   ```

4. Push your branch.

   ```bash
   git push origin feature/your-feature
   ```

5. Open a pull request describing your changes.

## 🐛 Issues & Feedback

Have an idea that could improve PriceCraft?

Open an issue in the repository with a clear description, reproduction steps when applicable, and screenshots to help explain the problem.

**Repository:** [github.com/DSaranyo/Price-Craft](https://github.com/DSaranyo/Price-Craft)

## 📄 License

No license has been specified in the project description.

Add a `LICENSE` file and update this section once you have chosen a license. Until then, do not assume the project is distributed under a particular open-source license.

---

<p align="center">
  <strong>✦ PriceCraft</strong>
  <br />
  <em>Pricing is a strategy. Make it visible.</em>
  <br /><br />
  Created by <strong>Saranyo Deyasi</strong>
  <br /><br />
  <sub>Configure boldly. Experiment intelligently. Build better pricing experiences.</sub>
</p>
